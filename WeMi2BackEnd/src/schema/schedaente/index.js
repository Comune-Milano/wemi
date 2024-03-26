
import { gql } from 'apollo-server';
import { types } from './typedefs';
import { input } from './inputdefs';
import { mutations } from './mutation';
import { query } from './query';

export default gql`
  ${input}
  ${types}
  ${query}
  ${mutations}
`;