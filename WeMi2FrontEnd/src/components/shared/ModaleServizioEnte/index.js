/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import Modal from 'components/ui2/Modal';
import Loader from 'components/ui2/Loader';
import PrintArea from 'components/ui2/PrintArea';
import { Row, Column } from 'components/ui/Grid';
import SchedaServizioEnte from 'components/navigation/ServizioOffertoEnte';
import { useUserProfile } from 'hooks/useUserProfile';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import { cercaQualifiche } from 'utils/graphql-mappers/dettagglio-amministrativo-ente';
import { noop } from 'utils/functions/noop';
import {
  getModalData,
  EstraiAllegatiServizioEnte,
  EstraiDescrittoriBenessere,
} from './ModaleServizioEnteGraphQL';
import ServiceCarousel from './partials/serviceCarousel';
import CategoryRating from './partials/categoryrating';
import HeaderSchedaServizio from './partials/modalheader';
import PrintTitle from './partials/printtitle';
import { GreyRow, ServicesRow, WrapperTitleSection, ServiceCarouselModal } from './components.styled';

const EntServiceModal = ({
  open,
  setOpen,
  idEnte,
  idServizioEnte,
  locale = 'it',
  onClose = noop,
}) => {
  const [modalData, fetchData] = useGraphQLRequest(
    null,
    getModalData,
    {},
    false,
    res => {
      const qualificheIdEstere = getObjectValue(res, 'EstraiDettaglioAmministrativoServizioEnte.qualifiche_esterne', []);
      const qualificheIdInterne = getObjectValue(res, 'EstraiDettaglioAmministrativoServizioEnte.qualifiche_interne', []);
      const contenutoPerQualifiche = getObjectValue(res, 'contenutoPerQualifiche', []);
      res.EstraiDettaglioAmministrativoServizioEnte.qualifiche_interne = cercaQualifiche(qualificheIdInterne, contenutoPerQualifiche, locale);
      res.EstraiDettaglioAmministrativoServizioEnte.qualifiche_esterne = cercaQualifiche(qualificheIdEstere, contenutoPerQualifiche, locale);
      return res;
    }
  );

  const [EstraiAllegati, setEstrai] = useGraphQLRequest(
    [],
    EstraiAllegatiServizioEnte,
    { idServizioEnte },
    false,
    response => response.EstraiAllegatiServizioEnte.map(media => ({
      source: media.oj_media,
      id: media.id_media,
    }))
  );

  const [EstraiDescrittori, setDescrittori] = useGraphQLRequest(
    undefined,
    EstraiDescrittoriBenessere,
    { idServizioEnte },
    false,
    response => response.EstraiDescrittoriBenessere
  );


  const EstraiAllegatiLoading = EstraiAllegati.isLoading;
  const EstraiAllegatiPristine = EstraiAllegati.pristine;

  const [userProfile] = useUserProfile();

  React.useEffect(() => {
    if (idServizioEnte && idEnte) {
      fetchData({
        idServizioEnte,
        idEnte,
      });
      setEstrai({
        idServizioEnte,
      });
      setDescrittori({
        idServizioEnte,
      });
    }
  }, [idServizioEnte, idEnte]);

  const txTitoloServizio = getObjectValue(modalData.data, `EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio.${locale}`, '');

  const datiEnte = getObjectValue(modalData.data, 'EstraiDettaglioAmministrativoServizioEnte.ente', '');
  const nomeEnte = getObjectValue(datiEnte, 'nm_ente', '');
  const telefonoEnte = getObjectValue(datiEnte, 'datiEnte.js_primo_contatto.txTelefono', '');
  const logoEnte = getObjectValue(datiEnte, 'datiEnte.media.oj_media', '');

  const sedeEnte = getObjectValue(modalData.data, 'entePK.datiEnte.sedeEnte', []);
  const indirizzo = sedeEnte.length ? `
    ${getObjectValue(sedeEnte[0], 'js_sede.indirizzo.txIndirizzo', '')} – 
    ${getObjectValue(sedeEnte[0], 'js_sede.indirizzo.txCitta', '')}
  ` : '';

  const categoryRating = [
    {
      field: 'corpoMovimento',
      title: 'CORPO E MOVIMENTO',
      stars: getObjectValue(EstraiDescrittori.data, 'nm_descrittore_movimento', 0),
    },
    {
      field: 'relazioni',
      title: 'RELAZIONI',
      stars: getObjectValue(EstraiDescrittori.data, 'nm_descrittore_relazioni', 0),
    },
    {
      field: 'conoscenzaComptenze',
      title: 'CONOSCENZE E COMPETENZE',
      stars: getObjectValue(EstraiDescrittori.data, 'nm_descrittore_competenze', 0),
    },
    {
      field: 'creativitaAbilitaTalenti',
      title: 'CREATIVITÀ, ABILITÀ E TALENTI',
      stars: getObjectValue(EstraiDescrittori.data, 'nm_descrittore_creativita', 0),
    },
    {
      field: 'autoDeterminazione',
      title: 'AUTODETERMINAZIONE',
      stars: getObjectValue(EstraiDescrittori.data, 'nm_descrittore_autodeterm', 0),
    },
  ];

  const isVisibleSection = React.useMemo(() => (
    (categoryRating.reduce((previous, next) => previous + next.stars, 0)) > 0),
    [categoryRating]);

  const isCarouselVisibile = ((!(EstraiAllegati.pristine || EstraiAllegati.isLoading)) && EstraiAllegati.data.length > 0);
  const isLoading = (modalData.pristine || modalData.isLoading)
    || (EstraiAllegati.pristine || EstraiAllegati.isLoading) || (EstraiDescrittori.pristine || EstraiDescrittori.isLoading)
    || !open;

  return (
    <Modal
      customModal
      header={() => <HeaderSchedaServizio txTitoloServizio={txTitoloServizio} nomeEnte={nomeEnte} />}
      desktopBodyPadding="0 0 7.81rem 0"
      padding="0 0 7.81rem 0"
      open={open}
      setOpenModal={() => { setOpen(true); onClose(); }}
      color="primary"
      width="90%"
      positionCloseIcon={{ md: { top: '2.2em', right: '1.3em' } }}
      mobileFullScreen="true"
    >
      {
        !isLoading ?
          (
            <>
              <PrintArea title={<PrintTitle titoloServizio={txTitoloServizio} />} userProfile={userProfile}>
                <Row padding="0" margin="0" alignitems="center">
                  <Column xs="6" padding="0" margin="0" className="onlyPrint">
                    <Text tag="div" weight="bold" value={nomeEnte} />
                    <Text tag="div" value={indirizzo} />
                    <Text tag="div" value={telefonoEnte} />
                  </Column>
                  <Column xs="6" padding="0" margin="0" textAlign="right" className="onlyPrint">
                    <img src={logoEnte} style={{ height: '3.5em', width: 'auto' }} alt="x" />
                  </Column>
                </Row>
              </PrintArea>
              <div>
                {isCarouselVisibile ? (
                  <ServiceCarouselModal
                    loading={EstraiAllegatiLoading || EstraiAllegatiPristine}
                    data={EstraiAllegati.data}
                  />
                )
                  : null}
                <PrintArea title={<PrintTitle titoloServizio={txTitoloServizio} />} userProfile={userProfile}>
                  <Row fluid alignitems="center">
                    <Column xs="6" padding="0" margin="0" className="onlyPrint">
                      <Text tag="div" weight="bold" value={nomeEnte} />
                      <Text tag="div" value={indirizzo} />
                      <Text tag="div" value={telefonoEnte} />
                    </Column>
                    <Column xs="6" padding="0" margin="0" textAlign="right" className="onlyPrint">
                      <img src={logoEnte} style={{ height: '3.5em', width: 'auto' }} />
                    </Column>
                  </Row>
                  {isVisibleSection ? (
                    <GreyRow fluid>
                      <Column xs="12" md="6" lg="6" padding="3.12rem" sizepadding={{ xs: isCarouselVisibile ? '3.33rem 1.66rem 0 1.66rem' : '0 1.66rem 0 1.66rem', sm: isCarouselVisibile ? '3.12rem 4.69rem' : '0 4.69rem 3.12rem 4.69rem' }}>
                        <WrapperTitleSection isCarouselVisibile={isCarouselVisibile}>
                          <BackgroundTitle size={bgTitleSizes.small} label="DIMENSIONI DEL BENESSERE" bgColor="primary" />
                        </WrapperTitleSection>
                        <Row fluid margin="1.5em 0 0 0">
                          <Text
                            value="Per aiutarti nella scelta più adeguata per te, per i tuoi bisogni e desideri trovi qui indicato quanto l'attività agisce sulle differenti aree di benessere."
                            size="f7"
                            wordBreak="break-word"
                            tag="span"
                            color="black"
                          />
                        </Row>
                      </Column>
                      <Column xs="12" md="6" lg="6" padding="3.12rem" sizepadding={{ xs: '3.33rem 1.66rem 3.33rem 1.66rem', sm: isCarouselVisibile ? '3.12rem 4.69rem' : '0 4.69rem 3.12rem 4.69rem', md: isCarouselVisibile ? '3.12rem 4.69rem 3.12rem 0.30rem' : '0 4.69rem 3.12rem 0.30rem', lg: isCarouselVisibile ? '3.12rem 4.69rem 3.12rem 3.30rem' : '0 4.69rem 3.12rem 3.30rem' }}>
                        <CategoryRating categories={categoryRating} />
                      </Column>
                    </GreyRow>
                  )
                    : null}
                  <ServicesRow fluid>
                    <SchedaServizioEnte
                      sectionsContentPrintWidth="66%"
                      servizioErogato={modalData.data}
                      locale={locale}
                      withoutNomeServizio
                    />
                  </ServicesRow>
                </PrintArea>
              </div>
            </>
          )
          : <Loader margin="6em auto" />
      }
    </Modal>
  );
};

EntServiceModal.displayName = 'ModaleServizioEnte';

export default EntServiceModal;
