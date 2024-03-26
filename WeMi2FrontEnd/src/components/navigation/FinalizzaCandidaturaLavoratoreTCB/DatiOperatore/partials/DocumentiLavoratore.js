
import React, { useState, useRef, useEffect } from 'react';
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import TextBoxInputFile from 'components/ui2/InputFile/TextBoxInputFile';
import { fileToBase64 } from 'utils/functions/fileToBase64';
import FaIcon from 'components/ui2/FaIcon';
import { INVALID_TYPE, FILE_LIMIT_EXECEEDED, TOTAL_FILES_SIZE_EXECEEDED } from 'components/ui2/InputFile/utils/errors';
import AnchorLink from 'components/ui/AnchorLink';
import TriggerDownload from 'components/shared/TriggerDownload';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import { EstraiFileLavoratore as EstraiFileLavoratoreQ } from '../../DatiOperatoreGraphQL';
import { ModalFilesSizeExeceeded } from './ModalFilesSizeExeceeded';
import { MAXIMUM_FILE_SIZE, ONE_MB_IN_BYTES } from '../utils/constants';

const StyledText = styled(Text)`
  cursor: pointer;
  &:hover {
    color: 'inherit';
  }
    text-decoration: underline !important;
`;

const DivTitle = styled.div`
  margin:  2em 0 1em 0;
 
`;

const DocumentiLavoratore = ({ idUtenteLav }) => {
  const { dataset, setFormField } = useFormContext();
  const [inputFileName, setInputFileName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [preventDownload, setPreventDownload] = useState(false);
  const documentCountRef = useRef(0);

  const performEstraiAllegatoLavoratore = useStatelessGraphQLRequest(EstraiFileLavoratoreQ);
  const maxAllegati = 10;
  const getDocumentoLavoratore = async (files) => {
    if (dataset.documentiLavoratore.length === maxAllegati) {
      setErrorMessage('Raggiunto il limite massimo di documenti');
      return;
    }
    if (!files) {
      return;
    }
    const file = await fileToBase64(files[0]);
    const fileName = inputFileName || files[0].name;
    if (!dataset.documentiLavoratore.find(doc => doc.fileName === fileName)) {
      const newArr = dataset.documentiLavoratore.slice();
      newArr.push({
        id: `documento-0${documentCountRef.current + 1}`,
        fileName,
        data: file,
        size: files[0].size,
      });
      documentCountRef.current += 1;
      setFormField('documentiLavoratore', newArr);
      setInputFileName('');
    } else setErrorMessage('Nome documento già utilizzato!');
  };

  const handleFileDownload = (file) => performEstraiAllegatoLavoratore(
    {
      idUtenteLav: parseInt(idUtenteLav, 10),
      idAllegato: parseInt(file.id, 10),
    }
  );

  const handleKeyDown = (event, triggerDownload) => {
    if (event.keyCode === keyCodes.ENTER) {
      triggerDownload();
    }
  };

  const openModalSizeExeceeded = React.useCallback((value) => {
    setOpenModal(value);
  }, [setOpenModal]);

  const remainingSpace = React.useMemo(() => {
    const newDocuments = dataset.documentiLavoratore.slice().filter(el => typeof el.id === 'string');
    return ((MAXIMUM_FILE_SIZE - newDocuments.reduce((previous, next) => previous + next.size, 0)) / ONE_MB_IN_BYTES).toFixed(2);
  }, [dataset.documentiLavoratore]);

  useEffect(() => {
    if (dataset.documentiLavoratore.length === maxAllegati) {
      setErrorMessage('Raggiunto il limite massimo di documenti');
    } else {
      setErrorMessage('');
    }
  }, [dataset.documentiLavoratore]);

  return (
    <>
      <DivTitle>
        <Text
          value="Documenti lavoratore"
          size="f7"
          color="primary"
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
        />
        <Text
          value="(massimo 10 allegati)"
          size="f7"
          color="primary"
          weight="bold"
          padding="0 0 0 0.4em"
        />
      </DivTitle>
      <Row fluid alignitems="center">
        <TextBoxInputFile
          label="Nome del documento"
          positionTooltip="right"
          colorTooltip="white"
          id="upload-file"
          onChange={(value) => {
            setErrorMessage('');
            getDocumentoLavoratore(value);
          }}
          onError={(errors) => {
            let errMessage;
            for (const entry of errors) {
              switch (entry) {
                case INVALID_TYPE:
                  errMessage = 'Estensione file non supportata';
                  break;
                case FILE_LIMIT_EXECEEDED:
                  errMessage = 'File troppo grande';
                  break;
                case TOTAL_FILES_SIZE_EXECEEDED:
                  openModalSizeExeceeded(!openModal);
                  break;
                default:
                  errMessage = 'Errore caricamento file';
                  break;
              }
              setErrorMessage(errMessage);
            }
          }}
          error={errorMessage}
          maxDimension={MAXIMUM_FILE_SIZE}
          inputFileName={inputFileName}
          allFiles={dataset.documentiLavoratore.slice().filter(el => typeof el.id === 'string')}
          setInputFileName={setInputFileName}
          icon="plus"
          disabled={dataset.documentiLavoratore.length === maxAllegati}
        />
      </Row>
      {dataset.documentiLavoratore.length ?
        dataset.documentiLavoratore.map((file, index) => (
          <Row fluid margin="1em 0 0" key={file.fileName}>
            <FaIcon
              fontSize="f5"
              icon="trash"
              color="red"
              onClick={() => {
                if (typeof file.id === 'number') {
                  setFormField(
                    'documentiDaEliminare',
                    dataset.documentiDaEliminare.concat(file.id)
                  );
                }
                setFormField(
                  'documentiLavoratore',
                  dataset.documentiLavoratore.filter(el => el.id !== file.id)
                );
              }}
            />
            {
              file.data ? (
                <AnchorLink
                  download={file.data}
                  downloadName={file.fileName}
                  value={file.fileName}
                  padding="0 0 0 1em"
                  weight="bold"
                />
              )
                : (
                  <TriggerDownload
                    dataCallback={() => handleFileDownload(file)}
                    onDownloadStart={() => setPreventDownload(true)}
                    onDownloadDone={() => setPreventDownload(false)}
                    fileName={file.fileName}
                  >
                    {({ triggerClick }) => (

                      <StyledText
                        whitespace="nowrap"
                        weight="bold"
                        value={file.fileName}
                        size="f7"
                        padding="0 0 0 1em"
                        tag="span"
                        onClick={() => { !preventDownload ? triggerClick() : Promise.resolve(); }}
                        onKeyDown={(event) => { !preventDownload ? handleKeyDown(event, triggerClick) : Promise.resolve(); }}
                      />
                    )}
                  </TriggerDownload>
                )}
          </Row>
        ))
        : null}
      <ModalFilesSizeExeceeded
        openModal={openModal}
        setOpenModal={openModalSizeExeceeded}
        remainingSpace={remainingSpace}
      />
    </>
  );
};

DocumentiLavoratore.displayName = 'DocumentiLavoratore';

export default DocumentiLavoratore;
