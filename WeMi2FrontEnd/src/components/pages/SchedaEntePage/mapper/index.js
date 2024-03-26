import { parseInformationSection } from './information';
import { parseAuthorizedOperatorsSection } from './operators';
import { parseDescriptionSection } from './description';
import { parseAttachmentsSection } from './attachments';
import { parsePrimaryOfficeSection } from './primaryoffice';
import { parseSecondaryOfficesSection } from './secondaryoffices';
import { parseContactPersonSection } from './contactperson';
import { parseCitizenAvailabilitySection } from './citizenavailability';
import { parseOthersInfoSection } from './othersinfo';
import { parsePaymentInfoSection } from './payment';

export const mapperService = (response) => {
  if (!response) {
    return {};
  }
  const informationSection = parseInformationSection(response.institutionInformationSection);
  const operatorsSection = parseAuthorizedOperatorsSection(response.authorizedOperatorsSection);
  const descriptionSection = parseDescriptionSection(response.descriptionSection);
  const attachmentsSection = parseAttachmentsSection(response.attachmentsSection);
  const primaryOfficeSection = parsePrimaryOfficeSection(response.principalLocationSection);
  const secondaryOfficesSection = parseSecondaryOfficesSection(response.secondaryLocationSection);
  const contactPersonSection = parseContactPersonSection(response.contactPersonSection);
  const citizenAvailabilitySection = parseCitizenAvailabilitySection(response.citizenAvailabilitySection);
  const othersInfoSection = parseOthersInfoSection(response.othersInfoSection);
  const merchantSection = parseOthersInfoSection(response.merchantSection);
  const paymentInfoSection = parsePaymentInfoSection(response.paymentInfoSection);

  return ({
    stateCode: informationSection.stateCode,
    institutionSection: informationSection,
    operatorsSection,
    descriptionSection,
    attachmentsSection,
    primaryOfficeSection,
    secondaryOfficesSection,
    contactPersonSection,
    citizenAvailabilitySection,
    othersInfoSection,
    merchantSection,
    paymentInfoSection,
  });
};
