import React from 'react';
import FinancialEducation from './partials/financialeducation';
import FinancialEducationCarousel from './partials/financialeducationcarousel';
import HowItWorks from './partials/howitworks';
import ServiceContents from './partials/servicecontents';
import HowContact from './partials/howcontact';
import { BodyWrapper } from './components.styled';

const EducazioneFinanziariaNavigation = () => (
  <>
    <FinancialEducationCarousel />
    <BodyWrapper>
      <FinancialEducation />
      <ServiceContents />
      <HowItWorks />
      <HowContact />
    </BodyWrapper>
  </>
  );

EducazioneFinanziariaNavigation.displayName = 'EducazioneFinanziariaNavigation';


export default EducazioneFinanziariaNavigation;
