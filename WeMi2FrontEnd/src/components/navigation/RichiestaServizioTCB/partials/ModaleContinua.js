/** @format */

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Hr from 'components/ui/Hr';
import NavLink from 'components/router/NavLink';
import Text from 'components/ui/Text';
import Modal from 'components/ui2/Modal';
import Input from 'components/ui/Input';
import Loader from 'components/ui/Loader';
import Button from 'components/ui/Button';
import { Row, Column } from 'components/ui/Grid';
import { colors, fonts } from 'theme';
import { connect } from 'react-redux';
import { PreventivoLightTCB, AddEnte, resetField, TCBStepper } from 'redux-modules/actions/authActions';
import { getNomeServizioTCB } from 'utils/functions';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const Header = ({ headerValue }) =>
  (<Row direction="column" padding="3em 0 0" justifycontent="center" fluid >
    <Text align="center" value={`Hai richiesto un servizio ${headerValue && headerValue.servizioTCB && headerValue.servizioTCB.tl_valore_testuale[headerValue.locale]}`} size="f6" weight="bold" color="darkGrey" tag="p" />
  </Row>
  );

const ModaleContinua = ({
  servizioTCB,
  TCBStepper,
  locale,
  open,
  setOpen,
  preventivoLightTCB,
  PreventivoLightTCB,
  AddEnte,
  resetField,
  order,
  livelliContrattuali,
}) => {
  return (
    <Modal
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
      open={open}
      openModal={setOpen.bind(this)}
      radius="0px"
      marginTop="12%"
      border={`1px ${colors.primary} solid`}
      bgcolorIcon='blue'
      iconRadius="50%"
      iconHeight="2em"
      iconWidth="2em"
      header={Header}
      headerValue={servizioTCB && { servizioTCB, locale }}
      headerHeight="auto"
      width="45%"
      responsiveWidth="1.8"
      iconcolor="white"
      noBackdropClose>

      <Row fluid padding="0 3em" justifycontent="center">
        <Text align="center" value={`Hai scelto di acquistare il servizio con 
        ${order === 1 ? 'assunzione diretta' : order === 2 ? 'assunzione tramite spazio WeMi' : 'assunzione tramite libretto famiglia'} per ${livelliContrattuali && livelliContrattuali.paga_minima_contrattuale ? `€${moneyFormat(livelliContrattuali.paga_minima_contrattuale)}` : '-Importo non specificato-'}.`}
          size="f7" color="darkGrey" padding="0" />
        <Text tag="p" align="center" color="darkGrey"
          padding="1em 2em 0"
          value="Se vuoi avviare il servizio di ricerca ti sarà richiesto di loggarti e di inserire altre info che ci consentiranno di selezionare il profilo più adatto alle tue esigenze."
          intlFormatter size="f7" />


        <Column xs="4" padding="3em 0">
          <NavLink
            to={order === 1 || order === 3 ? `/configurazionerichiestatcb/${getNomeServizioTCB(servizioTCB.cd_dominio_tcb)}` : order === 2 && servizioTCB ?
            `/c/516/r/${
             servizioTCB.cd_dominio_tcb === 1 ? '999997' :
             servizioTCB.cd_dominio_tcb === 2 ? '999998' :
             servizioTCB.cd_dominio_tcb === 3 ? '999999' : ''}` : ''}
            width="100%">
            <Button  onClick={() => {
              TCBStepper({ tcbStep: 1 });

              PreventivoLightTCB({
              preventivoLightTCB: {
                orario: preventivoLightTCB.orario,
                contract: preventivoLightTCB.contract,
                modalitaAssunzione:
                  order === 1 ? 'assunzione diretta' :
                    order === 2 ? 'assunzione tramite spazio WeMi' :
                      'assunzione tramite libretto famiglia',
                nuova: true,
              }
            }
            );
            if(order === 2) {
              AddEnte(-1)
            }
          }
            } value="Continua" size="f7" />
          </NavLink>

        </Column>


      </Row>

    </Modal>
  )
};

ModaleContinua.displayName = ' ModaleContinua';
const mapStateToProps = (state) => ({
  preventivoLightTCB: state.requestTCB.preventivoLightTCB,
  enti: state.user.enti,
});
const mapDispatchToProps = {
  PreventivoLightTCB,
  AddEnte,
  TCBStepper,
  resetField,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModaleContinua);
