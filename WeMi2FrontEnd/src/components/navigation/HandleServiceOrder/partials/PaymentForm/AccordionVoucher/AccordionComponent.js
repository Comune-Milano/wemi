import React, { useEffect, useState } from 'react';
import gestioneVoucher from 'images2/gestione-voucher/IB1.png';
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { setVoucherTimestamp } from 'components/navigation/HandleServiceOrder/graphqlRequests/graphQLRequests';
import AccordionBody from './AccordionBody';
import { Container, ImgContainer, Image, TextContainer } from './styled';


const AccordionVoucherComponent = ({
  vouchers,
  amount,
  idRichiesta,
  allDisabled,
  isFormValid,
  paymentRequestable,
  paymentWithVoucher,
  paymentWithOtherMethod,
  voucherCoverTheAmount,
  qtPersone,
}) => {
  const [isActive, setIsActive] = useState(false);

  const { dataset, setFormFields } = useFormContext();
  const getTimeStamp = useStatelessGraphQLRequest(setVoucherTimestamp);

  useEffect(() => {
    getTimeStamp({ idRichiesta }).then(ris => {
      const jsonTimeStamp = ris.find(element => element.lastUseTimeStamp);
      setFormFields({ vouchers:
        vouchers.map((voucher) => ({
          code: voucher.code,
          cfAssegnatario: voucher.cfMinore,
          endValidity: voucher.endValidity,
          remainingImport: voucher.remainingImport,
          voucherShare: 0,
          maxShare: amount > voucher.remainingImport ? voucher.remainingImport : amount,
          lastUseTimeStamp: jsonTimeStamp.lastUseTimeStamp,
          isActive: false,
          id: voucher.idVoucher,
        })),
        selectedVouchers: [],
        numberSelectedVouchers: 0,
        totalVoucherImport: 0,
      });
    });
  }, [vouchers]);

  if ((!paymentWithVoucher && !voucherCoverTheAmount) && ((isFormValid && paymentRequestable) || paymentWithOtherMethod)) {
    return (
      <></>
    );
  }

  return (
    <>
      <Container
        onClick={() => setIsActive(!isActive)}
        isSelected={isActive}
      >
        <Row fluid>
          <ImgContainer>
            <Image src={gestioneVoucher} />
          </ImgContainer>
          <TextContainer>
            Voucher 0.18
          </TextContainer>
        </Row>
      </Container>
      {isActive && (
      <AccordionBody
        dataset={dataset}
        setFormFields={setFormFields}
        allDisabled={allDisabled}
        amount={amount}
        qtPersone={qtPersone}
      />
  )}
    </>
  );
};


AccordionVoucherComponent.displayName = 'AccordionVoucherComponent';
export default AccordionVoucherComponent;
