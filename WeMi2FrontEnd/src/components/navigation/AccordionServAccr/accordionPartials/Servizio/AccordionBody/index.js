import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import {
  AltreMansioni,
  DataFine,
  DataInizio,
  Mansioni,
  MunicipiServiti,
  Note,
  PeriodoErogazione,
  ProceduraAttivazione,
  TempoMassimo,
  Descrizione,
  NomeServizio,
  UlterioriInformazioni,
} from './partial';

const ServizioBody = ({ 
  Form, 
  SetForm, 
  Modifica, 
  userProfile 
}) => {

  function UpdateValue(nomeCampo) {
    return (value) => {
      SetForm({
        ...Form,
        [nomeCampo]: value,
      });
    };
  }

  const isAmministratore = checkAdmin(userProfile.datiLogin);
  return (
    <Row padding="0" fluid>
      {/*
            Inibizione del campo descrizione servizio ente issue #145
            <Column xs="12">
                <Descrizione
                    Value={Form.descrizione}
                    UpdateValue={UpdateValue("descrizione")}
                    Modifica = {Modifica}
                ></Descrizione>
            </Column>
            */}
      <Column xs="12">
        <NomeServizio
          value={Form.nomeServizio}
          setForm={UpdateValue('nomeServizio')}
          modifica={Modifica}
        />
      </Column>


      <Column xs="12">
        <MunicipiServiti
          Value={{
            listaCompleta: Form.listaCompletaMunicipi,
            listaSelezionata: Form.listaSelezionataMunicipi,
          }}
          UpdateValue={UpdateValue('listaSelezionataMunicipi')}
          Modifica={Modifica}
        >
        </MunicipiServiti>
      </Column>
      <Column xs="12">
        <Mansioni
          Value={{
            listaCompleta: Form.listaCompletaMansioni,
            listaSelezionata: Form.listaSelezionataMansioni,
            required: !Form.altreMansioni,
          }}
          UpdateValue={UpdateValue('listaSelezionataMansioni')}
          setForm={SetForm}
          form={Form}
          Modifica={Modifica}
        >
        </Mansioni>
      </Column>


      <Column xs="12">
        <AltreMansioni
          Value={{
            value: Form.altreMansioni,
            required: Form.listaSelezionataMansioni.length === 0,
          }}
          UpdateValue={UpdateValue('altreMansioni')}
          Modifica={Modifica}
        >
        </AltreMansioni>
      </Column>


      <Column xs="12">
        <ProceduraAttivazione
          Value={Form.proceduraAttivazione}
          UpdateValue={UpdateValue('proceduraAttivazione')}
          Modifica={Modifica}
        >
        </ProceduraAttivazione>
      </Column>


      <Column xs="12">
        <PeriodoErogazione
          Value={{
            listaCompleta: Form.listaCompletaErogazione,
            listaSelezionata: Form.listaSelezionataErogazione,
          }}
          UpdateValue={UpdateValue('listaSelezionataErogazione')}
          Modifica={Modifica}
        >
        </PeriodoErogazione>
      </Column>


      <Column xs="7">
        <TempoMassimo
          Value={Form.tempoMassimo}
          UpdateValue={UpdateValue('tempoMassimo')}
          Modifica={Modifica}
        >
        </TempoMassimo>
      </Column>
      <Column xs="12">
        <UlterioriInformazioni
          value={Form.ulterioriInformazioni}
          setForm={UpdateValue('ulterioriInformazioni')}
          modifica={Modifica}
        />
      </Column>
      {
        Form.note || isAmministratore ? (
          <Column xs="12">
            <Note
              Value={Form.note}
              UpdateValue={UpdateValue('note')}
              Modifica={Modifica}
            >
            </Note>
          </Column>
        )
          : null
      }
    </Row>
  );
};

ServizioBody.displayName = 'Body servizio';


export default withAuthentication(ServizioBody);
