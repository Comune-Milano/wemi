/** @format */

import React, { useEffect, useState } from 'react';
import Link from 'components/router/NavLink';
import { Row, Column } from 'components/ui/Grid';
import { setFilter } from 'redux-modules/actions/filterActions';
import { connect } from 'react-redux';
import { AddParameters } from 'redux-modules/actions/goi003Actions';
import { resetField } from 'redux-modules/actions/authActions';
import SchedaPagineMenu from 'components/ui2/SchedaPagineMenu';
import {
  ProfiloOperatoreWeMi, Privacy, ServiziWeMiRichiesti, Voucher
} from './areaPersonaleCittadinoPartials';

const AreaPersonaleCittadino = ({
  Card,
  validitaLavoratore,
  richiesteCount,
  hasVoucher,
}) => {

  const serviziVisibility = (parseInt(richiesteCount, 10) && validitaLavoratore) || !validitaLavoratore;

  const voucherVisibility = hasVoucher.data;

  return (
    <>
      {
      validitaLavoratore ?
        <SchedaPagineMenu
          infoScheda={{
            titoloScheda: {
              text: 'PROFILO OPERATORE WeMi',
              bgColor: 'green'
            }
          }}
        >
          <ProfiloOperatoreWeMi
            card={Card.profiloOperatoreWeMi}
            cv={Card.cv}
          />
        </SchedaPagineMenu>
        :
        null
        }
      {
      voucherVisibility ?
        <Column xs="12" md="12" lg={serviziVisibility ? "4" : "6"} sizepadding={{ xs: "3em 0 1.5em", md: "3em 1.5em 3em 0" }}>
          <SchedaPagineMenu
            infoScheda={{
              titoloScheda: {
                text: 'VOUCHER',
                bgColor: 'purple'
              }
            }}
          >
            <Voucher card={Card.voucher} />
          </SchedaPagineMenu>
        </Column>
        : null}
      {
      serviziVisibility ?
        <Column xs="12" md="12" lg={voucherVisibility ? "4" : "6"} sizepadding={{ xs: "3em 0 1.5em", md: "3em 1.5em 3em 0" }}>
          <SchedaPagineMenu
            infoScheda={{
              titoloScheda: {
                text: 'SERVIZI WeMi RICHIESTI',
                bgColor: 'primary'
              }
            }}
          >
            <ServiziWeMiRichiesti card={Card.serviziWeMiRichiesti} />
          </SchedaPagineMenu>
        </Column>
        : null}
      <Column
        xs="12"
        lg={serviziVisibility || voucherVisibility ? voucherVisibility && serviziVisibility ? "4" : "6" : "12"}
        sizepadding={serviziVisibility || voucherVisibility ? voucherVisibility && serviziVisibility ?
          { xs: "1.5em 0 3em", md: "3em 0 3em 1.5em" } :
          { xs: "1.5em 0 3em", md: "3em 0" } :
          { xs: "1.5em 0 3em", md: "3em 0" }
        }
      >
        <SchedaPagineMenu
          infoScheda={{
            titoloScheda: {
              text: 'PRIVACY',
              bgColor: 'orange',
            }
          }}
        >
          <Privacy
            card={Card.privacy}
            wrapperColumnMd="12"
            wrapperColumnLg={serviziVisibility || voucherVisibility ? "12" : "4"}
            imgWidth={serviziVisibility || voucherVisibility ? "30%" : "50%"}
            imgHeight={serviziVisibility || voucherVisibility ? "30%" : "50%"}
          />
        </SchedaPagineMenu>
      </Column>
    </>
  )
};
const mapDispatchToProps = {
  setFilter,
  AddParameters,
  resetField,
};
function mapStateToProps(state) {
  const { filter, goi003 } = state;
  return {

    filtri: filter.filter,
    goi003: goi003
  };
}

AreaPersonaleCittadino.displayName = 'AreaPersonaleCittadino';


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaPersonaleCittadino);

