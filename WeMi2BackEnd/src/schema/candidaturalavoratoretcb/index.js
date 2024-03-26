/** @format */

import { gql } from 'apollo-server';
import { types } from './typedefs';
import { input } from './inputdefs';
import { mutationsCandidatura } from './mutation';
import { query } from './query';

export default gql`
  ${input},
  ${types},
  ${mutationsCandidatura},
  ${query}
`;