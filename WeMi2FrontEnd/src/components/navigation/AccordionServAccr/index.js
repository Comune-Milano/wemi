/** @format */

import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { noop } from 'utils/functions/noop';
import {
  Destinatari,
  Ente,
  InformazioniServizio,
  PersonaleEsterno,
  PersonaleInterno,
  Prezzo,
  PrimoContatto,
  SedeErogazione,
  Servizio,
  SostegniEconomici,
  DescrittoriDelBenessere,
  SliderImmagini,
  ButtonSalva,
} from './accordionPartials';

const AccordionServAcc = ({ Form = {}, ReadOnly, estraiDati = noop }) => {
  const [destinatari, setDestinatari] = useState(Form.destinatari);

  const [servizio, setServizio] = useState(Form.servizio);

  const [descrittoriDelBenessere, setDescrittoriDelBenessere] = useState(Form.descrittoriDelBenessere);

  const [sliderImmagini, setSliderImmagini] = useState(Form.sliderImmagini);

  const [sede, setSede] = useState(Form.sede);

  const [sostegni, setSostegni] = useState(Form.sostegni);

  const [personaleInterno, setPersonaleInterno] = useState(Form.personaleInterno);

  const [personaleEsterno, setPersonaleEsterno] = useState(Form.personaleEsterno);

  const [prezzo, setPrezzo] = useState(Form.prezzo);

  const informazioniMemo = React.useMemo(() => (
    <InformazioniServizio Form={Form.informazioni}></InformazioniServizio>
  ), [Form.informazioni]);


  const enteMemo = React.useMemo(() => (
    <Ente Form={Form.ente}></Ente>
  ), [Form.ente]);


  const destinatariMemo = React.useMemo(() => (
    <Destinatari
      Form={destinatari}
      SetForm={setDestinatari}
      Modifica={Form.modifica}
    >
    </Destinatari>
  ), [destinatari]);

  const primoContattoMemo = React.useMemo(() => (
    <PrimoContatto Form={Form.primoContatto}></PrimoContatto>
  ), [Form.primoContatto]);

  const servizioMemo = React.useMemo(() => (
    <Servizio
      Form={servizio}
      SetForm={setServizio}
      Modifica={Form.modifica}
    >
    </Servizio>
  ), [servizio]);

  const descrittoriDelBenessereMemo = React.useMemo(() => (
    <DescrittoriDelBenessere
      Form={descrittoriDelBenessere}
      SetForm={setDescrittoriDelBenessere}
      Modifica={Form.modifica}
    />
  ), [descrittoriDelBenessere]);

  const sliderImmaginiMemo = React.useMemo(() => (
    <SliderImmagini
      Form={sliderImmagini}
      SetForm={setSliderImmagini}
      Modifica={Form.modifica}
    />
  ), [sliderImmagini]);

  const sedeMemo = React.useMemo(() => (
    <SedeErogazione
      Form={sede}
      SetForm={setSede}
      Modifica={Form.modifica}
    >
    </SedeErogazione>
  ), [sede]);

  const sostegniMemo = React.useMemo(() => (
    <SostegniEconomici
      Form={sostegni}
      SetForm={setSostegni}
      Modifica={Form.modifica}
    >
    </SostegniEconomici>
  ), [sostegni]);

  const prezzoMemo = React.useMemo(() => (
    <Prezzo
      Form={prezzo}
      SetForm={setPrezzo}
      Modifica={Form.modifica}
    >
    </Prezzo>
  ), [prezzo]);

  const internoMemo = React.useMemo(() => (
    <PersonaleInterno
      Form={personaleInterno}
      SetForm={setPersonaleInterno}
      Modifica={Form.modifica}
    >
    </PersonaleInterno>
  ), [personaleInterno]);

  const esternoMemo = React.useMemo(() => (
    <PersonaleEsterno
      Form={personaleEsterno}
      SetForm={setPersonaleEsterno}
      Modifica={Form.modifica}
    >
    </PersonaleEsterno>
  ), [personaleEsterno]);

  const subForms = [
    informazioniMemo,
    enteMemo,
    destinatariMemo,
    primoContattoMemo,
    servizioMemo,
    descrittoriDelBenessereMemo,
    sliderImmaginiMemo,
    sedeMemo,
    internoMemo,
    esternoMemo,
    prezzoMemo,
    sostegniMemo,
  ];

  const newForm = {
    ...Form,
    destinatari,
    servizio,
    descrittoriDelBenessere,
    sliderImmagini,
    sede,
    sostegni,
    personaleInterno,
    personaleEsterno,
    prezzo,
  };

  return (
    <Row fluid>
      {
        subForms.map((subform, index) => (
          <Column xs="12" key={`subForms-${index.toString}`}>
            {subform}
          </Column>
        ))
      }
      <ButtonSalva
        StartForm={Form}
        Form={newForm}
        ReadOnly={ReadOnly}
        estraiDati={estraiDati}
      >
      </ButtonSalva>
    </Row>
  );
};

AccordionServAcc.displayName = 'AccordionServAcc';

export default AccordionServAcc;
