import React, { useState } from 'react';
import Text from 'components/ui/Text';
import { parseStringifiedFloat } from 'utils/functions/parseStringifiedFloat';
import { Column, Row } from 'components/ui/Grid';
import Radio from 'components/ui2/RadioGroup/radio';
import Hr from 'components/ui/Hr';
import moment from 'moment';
import Input from 'components/ui2/Input';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { DivContent, CfContainer, DataContainer, IdVoucherContainer, InputContainer, RadioContainer, RemainingImportContainer, ValueContainer, TitleContainer, CenterValueContainer, BottomTitleContainer } from './styled';
import { onChangeInputNumber, onChangeRadio } from './utilities';


const AccordionBody = ({
  dataset,
  qtPersone,
  amount,
  allDisabled,
  setFormFields,
}) => {
  const [step, setStep] = useState('1');

  const calculateStep = (share, maxShare) => {
    const difference = Number((maxShare - Number(share)).toFixed(2));
    const maxShareInt = parseInt(maxShare, 10);
    const differenceMaxShare = Number((maxShare - maxShareInt).toFixed(2));
    let inputStep;
    if (difference >= 0 && difference < 1 && (differenceMaxShare >= difference)) {
      inputStep = '.01';
      setStep(inputStep);
    } else {
      setStep('1');
    }
  };

  return (
    <DivContent>
      {
                dataset.vouchers.map((voucher, index, vouchers) => (
                  <Row fluid key={voucher.code}>
                    <RadioContainer>
                      <Radio
                        key={voucher.code}
                        justifyContent="center"
                        selected={voucher.isActive}
                        disabled={(qtPersone === dataset.numberSelectedVouchers && !voucher.isActive) || allDisabled}
                        checkcolor="primary"
                        onClick={() => {
                          onChangeRadio(
                            voucher,
                            vouchers,
                            setFormFields,
                            amount,
                            dataset,
                               );
                        }}
                      />
                    </RadioContainer>
                    <IdVoucherContainer>
                      <ValueContainer>
                        <Text
                          value={voucher.code}
                          weight="bold"
                          wordBreak="break-word"
                          color="black"
                        />
                      </ValueContainer>
                      <TitleContainer>
                        <Text
                          value="ID VOUCHER"
                          size="f8"
                          tag="strong"
                          color="darkGrey"
                          weight="bold"
                        />
                      </TitleContainer>
                    </IdVoucherContainer>
                    <CfContainer>
                      <ValueContainer>
                        <Text
                          value={voucher.cfAssegnatario}
                          weight="bold"
                          wordBreak="break-word"
                        />
                      </ValueContainer>
                      <TitleContainer>
                        <Text
                          value="CF ASSEGNATARIO"
                          size="f8"
                          tag="strong"
                          color="darkGrey"
                          weight="bold"
                        />
                      </TitleContainer>
                    </CfContainer>
                    <RemainingImportContainer>
                      <CenterValueContainer>
                        <Text
                          value={moneyFormat(voucher.remainingImport, true)}
                          weight="bold"
                          wordBreak="break-word"
                        />
                      </CenterValueContainer>
                      <BottomTitleContainer>
                        <Text
                          value="RESIDUO"
                          size="f8"
                          tag="strong"
                          color="darkGrey"
                          weight="bold"
                        />
                      </BottomTitleContainer>
                    </RemainingImportContainer>
                    <DataContainer>
                      <CenterValueContainer>
                        <Text
                          value={voucher.endValidity ? moment(voucher.endValidity).format('DD/MM/YYYY') : ''}
                          weight="bold"
                        />
                      </CenterValueContainer>
                      <BottomTitleContainer>
                        <Text
                          value="FINE VALIDITÀ"
                          size="f8"
                          tag="strong"
                          wordBreak="break-word"
                          color="darkGrey"
                          weight="bold"
                        />
                      </BottomTitleContainer>
                    </DataContainer>
                    <InputContainer>
                      <Row fluid>
                        <Column xs="12" padding="0">
                          <Input
                            name="quota voucher"
                            onChange={(value) => {
                              onChangeInputNumber(value,
                                voucher,
                                vouchers,
                                setFormFields,
                                amount,
                                dataset,);
                              calculateStep(voucher.voucherShare, voucher.maxShare);
                            }}
                            onKeyDown={(evt) =>
                              ['e', 'E', '+', '-', 'Enter', 'Escape'].includes(evt.key) && evt.preventDefault()
                            }
                            inputValue={Number(voucher.voucherShare.toFixed(2))}
                            padding="2px"
                            borderWidth="1px"
                            bold
                            type="number"
                            id={voucher.code.toString()}
                            step={step}
                            required
                            disabled={(qtPersone === dataset.numberSelectedVouchers && !voucher.isActive) || allDisabled}
                            min={0}
                            max={parseStringifiedFloat(voucher.maxShare) || 0}
                          />
                        </Column>
                        <Column xs="12" padding="0">
                          <Text
                            value="QUOTA VOUCHER"
                            size="f8"
                            tag="strong"
                            color="darkGrey"
                            weight="bold"
                          />
                        </Column>
                      </Row>
                    </InputContainer>
                    {index + 1 !== vouchers.length ?
                      <Hr height="1px" color="darkGrey" width="100%" left="4%" right="4%" top="1em" bottom="1em" />
                      : null }
                  </Row>
                  ))
              }
    </DivContent>
  );
};
AccordionBody.displayName = 'AccordionBody';
export default AccordionBody;
