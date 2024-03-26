import React, { useState } from 'react';

import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import ModaleRecensioni from 'components/shared/ModaleRating';
import ModaleSchedaEnte from 'components/shared/ModaleSchedaEnte';
import ModaleServizioEnte from 'components/shared/ModaleServizioEnte';
import CardEnte from './CardEnte';
import { ColonnaEnte } from './GrigliaEnti.styled';

const GrigliaEnti = ({
  header,
  enti,
  entiSelezionati,
  toggleEnte,
  removeEnte,
  filtri,
}) => {
  const [modalePrezziData, setModalePrezziData] = useState({
    open: false,
    idServizioRiferimento: null,
    idEnte: null,
  });

  const [modaleRecensioniData, setModaleRecensioniData] = useState({
    open: false,
    idServizioRiferimento: null,
    idEnte: null,
  });

  const [modaleServizioEnteData, setModaleServizioEnteData] = useState({
    open: false,
    idServizioRiferimento: null,
    idEnte: null,
  });

  const [modaleSchedaEnteData, setModaleSchedaEnteData] = useState({
    open: false,
    idEnte: null,
  });

  const closeModaleSchedaEnte = () => {
    setModaleSchedaEnteData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModaleSchedaEnte = (idEnte) => (
    () => {
      setModaleSchedaEnteData({
        idEnte,
        open: true,
      });
    }
  );

  const closeModalePrezzi = () => {
    setModalePrezziData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModalePrezzi = (idServizioRiferimento, idEnte) => (
    () => {
      setModalePrezziData({
        idServizioRiferimento,
        idEnte,
        open: true,
      });
    }
  );

  const closeModaleRecensioni = () => {
    setModaleRecensioniData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModaleRecensioni = (idServizioRiferimento, idEnte) => (
    () => {
      setModaleRecensioniData({
        idServizioRiferimento,
        idEnte,
        open: true,
      });
    }
  );

  const closeModaleServizioEnte = () => {
    setModaleServizioEnteData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModaleServizioEnte = (idServizioRiferimento, idEnte) => (
    () => {
      setModaleServizioEnteData({
        idServizioRiferimento,
        idEnte,
        open: true,
      });
    }
  );

  return (
    <>
      {header}
      <Row fluid flex justifycontent="flex-start">
        {
          enti.length > 0 ?
            enti.map((ente) => (
              <ColonnaEnte xs="12" lg="12" margin="0" key={ente.idServizioEnte}>
                <CardEnte
                  isSelected={entiSelezionati.some(el => el.idServizioEnte === ente.idServizioEnte)}
                  ente={ente}
                  openModalePrezzi={openModalePrezzi(ente.idServizioEnte, ente.idEnte)}
                  openModaleRecensioni={openModaleRecensioni(ente.idServizioEnte, ente.idEnte)}
                  openModaleSchedaEnte={openModaleSchedaEnte(ente.idEnte)}
                  openModaleServizioEnte={openModaleServizioEnte(ente.idServizioEnte, ente.idEnte)}
                  toggleEnte={() => toggleEnte(ente)}
                  removeEnte={() => removeEnte(ente)}
                  quantita={filtri}
                />
              </ColonnaEnte>
            ))
            :
            (
              <Text value="Nessun risultato" intlFormatter size="f6" />
            )
        }
      </Row>
      <ModaleRecensioni
        idEnte={modaleRecensioniData.idEnte}
        idServizioRiferimento={modaleRecensioniData.idServizioRiferimento}
        open={modaleRecensioniData.open}
        setOpen={closeModaleRecensioni}
      />
      <ModaleServizioEnte
        idEnte={modaleServizioEnteData.idEnte}
        idServizioEnte={modaleServizioEnteData.idServizioRiferimento}
        open={modaleServizioEnteData.open}
        setOpen={closeModaleServizioEnte}
      />
      <ModaleSchedaEnte
        idEnte={modaleSchedaEnteData.idEnte}
        open={modaleSchedaEnteData.open}
        setOpen={closeModaleSchedaEnte}
      />
    </>
  );
};

GrigliaEnti.displayName = 'Griglia degli enti';

export default React.memo(GrigliaEnti);
