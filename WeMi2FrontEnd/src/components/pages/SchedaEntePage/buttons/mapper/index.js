import { convertObjectToIntervals } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { mapSecondaryOffice } from './secondaryoffices';
import { transformDocuments } from './documents';

export const mapSaveCard = (data) => {
  const dataToMap = Object.assign({}, data);
  return {
    authorizedOperators: dataToMap.operatorsSection ?
      dataToMap.operatorsSection.authorizedOperators : [],
    description: dataToMap.descriptionSection?.description,
    attachments: {
      logo: {
        id: dataToMap.attachmentsSection?.logo?.id,
        name: dataToMap.attachmentsSection?.logo?.name,
        blob: dataToMap.attachmentsSection?.logo?.file,
        mime: dataToMap.attachmentsSection?.logo?.type,
      },
      documents: transformDocuments(dataToMap.attachmentsSection?.documents),
    },
    citizenAvailability: {
      contactAvailability: { calendario: convertObjectToIntervals(dataToMap.citizenAvailabilitySection?.citizenAvailability?.calendario) },
      phoneNumber: dataToMap.citizenAvailabilitySection?.citizenAvailability?.phoneNumber,
      firstContactNote: dataToMap.citizenAvailabilitySection?.citizenAvailability?.firstContactNote,
      email: dataToMap.citizenAvailabilitySection?.citizenAvailability?.email,
    },
    contactPerson: {
      email: dataToMap.contactPersonSection?.contactPerson?.email,
      name: dataToMap.contactPersonSection?.contactPerson?.name,
      phoneNumber: dataToMap.contactPersonSection?.contactPerson?.phoneNumber,
      secondaryEmail: dataToMap.contactPersonSection?.contactPerson?.secondaryEmail,
      secondaryPhoneNumber: dataToMap.contactPersonSection?.contactPerson?.secondaryPhoneNumber,
    },
    primaryOffice: {
      address: dataToMap.primaryOfficeSection?.address,
    },
    secondaryOffices: mapSecondaryOffice(dataToMap.secondaryOfficesSection?.secondaryLocations),
    othersInfo: {
      welfareAvailability: dataToMap.othersInfoSection?.othersInfo?.welfareAvailability,
      volunteerAvailability: dataToMap.othersInfoSection?.othersInfo?.volunteerAvailability,
      webLink: dataToMap.attachmentsSection?.webLink,
      twitterLink: dataToMap.attachmentsSection?.twitterLink,
      instagramLink: dataToMap.attachmentsSection?.instagramLink,
      facebookLink: dataToMap.attachmentsSection?.facebookLink,
      youtubeLink: dataToMap.attachmentsSection?.youtubeLink,
    },
    merchant: dataToMap.merchantSection?.merchant,
    paymentInfo: {
      iban: dataToMap.paymentInfoSection?.paymentInfo?.iban?.trim(),
      accountHolder: dataToMap.paymentInfoSection?.paymentInfo?.accountHolder?.trim(),
      bankName: dataToMap.paymentInfoSection?.paymentInfo?.bankName?.trim(),
      branchDescription: dataToMap.paymentInfoSection?.paymentInfo?.branchDescription?.trim(),
    },
  };
};

export const mapNotes = (data) => {
  const dataToMap = Object.assign({}, data);
  return {
    note2: dataToMap.operatorsSection?.note2 || '',
    note3: dataToMap.descriptionSection?.note3 || '',
    note4: dataToMap.attachmentsSection?.note4 || '',
    note5: dataToMap.primaryOfficeSection?.note5 || '',
    note6: dataToMap.secondaryOfficesSection?.note6 || '',
    note7: dataToMap.contactPersonSection?.note7 || '',
    note8: dataToMap.citizenAvailabilitySection?.note8 || '',
    note9: dataToMap.othersInfoSection?.note9 || '',
    note10: dataToMap.merchantSection?.note10 || '',
    note11: dataToMap.paymentInfoSection?.note11 || '',
  };
};
