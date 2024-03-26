import * as yup from 'yup';
import { REQUIRED_ERROR } from './constants';

yup.setLocale({
  mixed: {
    required: REQUIRED_ERROR,
  },
});

export default yup;
