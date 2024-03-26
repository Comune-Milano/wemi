import React from 'react';
import Button from 'components/ui2/Button';
import moment from 'moment';

const DownloadButton = ({
  dataCallback,
  idFile,
}) => {
  const creaFile = () => {
    let text = 'Riga;Colonna;Motivo;\n';
    dataCallback.forEach(el => {
      text = text + el.row +';'+el.col+';'+el.motivo+';\n';
    });
    return text;
  };

  const downloadLog = () => {
    let element = document.createElement('a');
    const date = new Date();
    const file = creaFile();
    const filename = "Log Errori Caricamento "+ idFile + " - " + moment(date).format('DD/MM/YYYY');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <Button
        type="button"
        width="30em"
        label="Scarica Log Errori Caricamento"
        color="primary"
        size="f7"
        onClick={() => {
          downloadLog();
        }}
        padding="0.4em 0"
      />
    </>
  );
};

DownloadButton.displayName = 'DownloadButton';

export default DownloadButton;
