/** @format */

import { put, call } from 'redux-saga/effects';
import { GraphQLClient } from 'services/GraphQLClient/GraphQLClient';
import { getErrorDTO } from 'errors/services/transformers/errorDTOTransformer';
import { GRAPHQL_SUCCESS, WEMI_ERROR } from '../../types/actions';

export function* functionGraphQL(action) {
  try {
    const grapQLClient = new GraphQLClient();
    const result = yield call(grapQLClient.request.bind(grapQLClient, { query: action.graphql }));

    if (result.errors) {
      const errorInformationDTO = getErrorDTO({ graphQLErrors: result.errors });
      yield put({ type: WEMI_ERROR, errorDTO: errorInformationDTO });
    }

    yield put({
      type: GRAPHQL_SUCCESS,
      lista: action.id === '' ? result : [action.id, result],
    });
  } catch (error) {
    const errorInformationDTO = getErrorDTO(error);
    yield put({ type: WEMI_ERROR, errorDTO: errorInformationDTO });
  }
}
