import { convertFasceOrarieToObj } from 'components/ui2/WeekCalendarTimePicker/utils/converter';

export const parseCitizenAvailabilitySection = (response) => {
  if (!response) {
    return {};
  }

  return {
    citizenAvailability: {
      email: response.citizenAvailability?.email,
      phoneNumber: response.citizenAvailability?.phoneNumber,
      firstContactNote: response.firstContactNote,
      calendario: convertFasceOrarieToObj(response.citizenAvailability?.contactAvailability?.calendario),
    },
    note8: response.note8,
  };
};
