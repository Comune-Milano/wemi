/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import Modal from 'components/ui/Modal';
import Loader from 'components/ui/Loader';
import FaIcon from 'components/ui/FaIcon';
import Icon from 'components/ui/Icon';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import SchedaEnte from 'components/navigation/SchedaEnte';

const Header = ({ headerValue, loaded }) => {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (headerValue && update !== headerValue.datiEnte.media.oj_media) {
      setUpdate(headerValue);
    }
  }, [headerValue, loaded === 1]);

  return (
    <Row fluid flex direction="column">
      <div id="schedaEnte1" style={{ width: '100%', height: 'auto' }}>

        <Row fluid justifycontent="flex-start" padding="0" alignitems="center">
          {(headerValue && (headerValue.datiEnte.media) || loaded === 1) ?
            <Icon src={headerValue.datiEnte.media.oj_media} width="100px" height="100px" /> :
            <Loader width="auto" size="2em" margin="0 0.5em 0 0" />
          }
          <Text
            padding="0 0 0 0.5em"
            transform="uppercase"
            letterSpacing="0.05em"
            value={headerValue && headerValue.nm_ente}
            size="f1"
            color="darkGrey"
          />
        </Row>
        <Row fluid padding="0 0 2em">
          <Column xs="12" md="9" lg="8" padding="0.5em 0 1em">
            {headerValue && headerValue.entePK && headerValue.entePK.datiEnte.sedeEnte[0] && headerValue.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo &&
              (
                <>
                  {headerValue.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo.txIndirizzo &&
                    (
                      <Text
                        value={headerValue.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo.txIndirizzo}
                        size="f7"
                        color="darkGrey"
                        padding="0 .4em 0 0"
                      />
                    )
                  }
                  {headerValue.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo.txCap &&
                    (
                      <Text
                        value={headerValue.entePK.datiEnte.sedeEnte[0].js_sede.indirizzo.txCap}
                        size="f7"
                        color="darkGrey"
                        padding="0 .5em 0 0"
                      />
                    )
                  }

                  <Text
                    value={`- ${headerValue.datiEnte.sedeEnte[0].js_sede.indirizzo.txCitta}`}
                    size="f7"
                    color="darkGrey"
                    padding="0 2em 0 0"
                  />
                </>
              )
            }
            {
              headerValue &&
              headerValue.datiEnte.js_referente &&
              headerValue.datiEnte.js_referente.txTelefono && (
                <span style={{ display: 'inline-block' }}>
                  <FaIcon
                    display="inline-block"
                    transform="rotate(90deg)"
                    icon="\f095"
                    fontSize="f7"
                    pointer
                    noShadow
                    color="primary"
                    padding=".4em 0 .4em .6em"
                    height="1.7em"
                    width="1.7em"
                  />
                  <Text value={`+ ${headerValue && headerValue.datiEnte.js_referente.txTelefono}`} size="f7" color="darkGrey" padding="0 2em 0 0" />
                </span>
              )
            }
          </Column>

        </Row>
        <Row fluid justifycontent="flex-end">

        </Row>
      </div>
    </Row>
  )
};

Header.displayName = 'SchedaEnteModal - Header';


const SchedaEnteModal = ({ open, openModal, ente, enteDati, loaded, locale }) => {

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update !== ente) {
      setUpdate(ente);
    }
  }, [ente !== update, ente && ente.datiEnte, loaded === 2])


  return (
    <Modal
      phone
      open={open}
      openModal={openModal}
      marginTop="2%"
      border={`1px ${colors.primary} solid`}
      radius="0"
      bgcolorIcon="blue"
      iconRadius="50%"
      printIcon
      printIconColor="blue"
      printBgcolorIcon="white"
      printElements={['schedaEnte1', 'schedaEnte2', 'schedaEnte3']}
      printImage1={ente && ente.entePK ? ente.entePK.datiEnte.media.oj_media : null}
      iconHeight="2em"
      iconWidth="2em"
      maxHeight="auto"
      header={Header}
      responsiveWidth="1"
      headerValue={ente && ente.entePK ? ente.entePK : undefined}
      headerHeight="5em"
      width="80%"
      iconcolor="white"
    >
      <Row fluid margin="0">
        <iframe id="ifmcontentstoprint" style={{ height: '0px', border: 'none', width: '0px', position: 'absolute' }}>
        </iframe>
        <Column xs={12} padding="1em 0" justify-content="center">
          {ente && ente.entePK && <SchedaEnte ente={ente.entePK} enteDati={enteDati} locale={locale} />}
        </Column>
      </Row>

    </Modal>
  )
};

SchedaEnteModal.displayName = 'SchedaEnteModal';

const mapStoreToProps = store => ({
  ente: store.graphql.entePK,
  enteDati: store.graphql.enteDatiPK,
  locale: store.locale,
  loaded: store.graphql,
});
export default connect(mapStoreToProps)(SchedaEnteModal);
