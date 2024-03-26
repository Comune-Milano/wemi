
import yup from 'libs/Form/validation/yup';

export const validationSchema = yup.object()
  .shape({
    candBadante: yup.object()
      .shape({ label: yup.string(), checked: yup.bool() }),
    candColf: yup.object()
      .shape({ label: yup.string(), checked: yup.bool() }),
    candTata: yup.object()
      .shape({ label: yup.string(), checked: yup.bool() }),
  })
  .test(
    'almenoUnaCandidatura',
    null,
    obj => {
      if (obj.candBadante.checked || obj.candTata.checked || obj.candColf.checked) {
        return true;
      }
      return new yup.ValidationError(
        'Devi scegliere almeno un servizio',
        null,
        'checkCandidatura'
      );
    }
  );
