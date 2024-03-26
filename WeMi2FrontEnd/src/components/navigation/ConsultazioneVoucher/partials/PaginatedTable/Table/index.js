import React, { Fragment } from 'react';
import iconaVoucher from 'images2/voucher/icona-voucher.png';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui2/FaIcon';
import styled from 'styled-components';
import { TabellaOverflow, RichiestaRow, RowFocus } from './Table.styled';

export const RightRow = styled(Row)`
  justify-content: flex-end;
  `;

const VouchersTable = ({
  listaVoucher,
  setOpenModal,
  findVoucher,
}) => {
  return (
    <Fragment>
      <TabellaOverflow fluid justifycontent="flex-end" margin="0.1em 0" padding="0">
        <Column xs="12" padding="0">
          {listaVoucher.map(voucher => {
            return (
              <RowFocus
                padding="0"
                borderSize="0"
                key={`Voucher-${voucher.idVoucher}`}
              >
                <RichiestaRow
                  justifycontent="space-between"
                  flex
                  alignitems="center"
                  padding="0"
                  onClick={async () => {
                    setOpenModal(true);
                    findVoucher(voucher.idVoucher, 1);
                  }}
                >
                  <Column xs="11" md="11" order={{ xs: 1, md: 1 }} padding="0.6em 0 0.6em 0.1em">
                    <Row fluid>
                      <Column xs="2" md="2" padding="0.4em 0 0 0" order={{ xs: 1, md: 1 }}>
                        <img
                          src={iconaVoucher}
                          width="50em"
                          height="auto"
                          alt="img"
                        />
                      </Column>
                      <Column xs="5" md="2" padding="0 5px 0 10px" order={{ xs: 1, md: 2 }}>
                        <Text
                          tag="strong"
                          value="Codice Voucher"
                          color="darkGrey"
                          weight="bold"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          size="f8"
                        />
                        <br />
                        <Text
                          tag="span"
                          value={voucher.codiceVoucher ? voucher.codiceVoucher : ''}
                          color="black"
                          weight="bold"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          size="f6"
                        />
                      </Column>

                      <Column xs="7" md="4" padding="0 5px 0 0" order={{ xs: 2, md: 4 }}>
                        <Text
                          tag="strong"
                          value="Codice fiscale assegnatario"
                          color="darkGrey"
                          weight="bold"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          marging="0 0 0.5em 0"
                          size="f8"
                        />
                        <br />
                        <Text
                          tag="span"
                          value={voucher.codiceFiscaleAssegnatario ? voucher.codiceFiscaleAssegnatario : ''}
                          color="black"
                          weight="bold"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          marging="0 0 0.5em 0"
                          size="f6"
                        />
                      </Column>

                      <Column xs="5" md="2" padding="0 0 0 5px" order={{ xs: 2, md: 3 }}>
                        <Text
                          tag="strong"
                          value="Data fine validità"
                          color="darkGrey"
                          weight="bold"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          marging="0 0 0.5em 0"
                          size="f8"
                        />
                        <br />
                        <Text
                          tag="span"
                          value={voucher.dataFineValidita ? voucher.dataFineValidita : ''}
                          color="black"
                          weight="bold"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          marging="0 0 0.5em 0"
                          size="f6"
                        />
                      </Column>
                      <Column xs="5" md="2" padding="0 1em 0 5px" order={{ xs: 1, md: 5 }}>
                        <RightRow padding="0">
                          <Text
                            tag="strong"
                            value="Residuo"
                            color="darkGrey"
                            weight="bold"
                            transform="uppercase"
                            letterSpacing="0.05em"
                            marging="0 0 0.5em 0"
                            size="f8"
                          />
                        </RightRow>
                        <RightRow padding="0">
                          <Text
                            tag="span"
                            value={voucher.importoResiduo ? voucher.importoResiduo : ''}
                            color="primary"
                            weight="bold"
                            transform="uppercase"
                            letterSpacing="0.05em"
                            marging="0 0 0.5em 0"
                            size="f6"
                          />
                        </RightRow>
                      </Column>
                    </Row>
                  </Column>
                  <Column xs="1" md="1" padding="0 0 0 1em" order={{ xs: 2, md: 2 }}>
                    <FaIcon
                      onClick={async () => {
                        setOpenModal(true);
                        findVoucher(voucher.idVoucher, 1);
                      }}
                      padding="0"
                      icon="search"
                      color="primary"
                      fontSize="f5"
                    />
                  </Column>
                </RichiestaRow>
              </RowFocus>
            );
          })

          }
        </Column>
      </TabellaOverflow>

    </Fragment>

  );
};

VouchersTable.displayName = 'VouchersTable';

export default VouchersTable;
