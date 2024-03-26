import { ApolloError } from 'apollo-server';
import { UNAUTHENTICATED } from '../../errors/authorization';
import { verifyUser } from 'utility/user/verifyuser';

/**
 * Function to validate if a user is authenticated
 * @returns {Function} the function to authenticate user
 */
export default () => next => async (root, args, context, info) => {
  const { req } = context;

  const { session } = req;
    
  try{
    verifyUser(session.user);
    return next(root, args, context, info);
  }
  catch(error){
    throw new ApolloError(UNAUTHENTICATED.message, UNAUTHENTICATED.code);
  }
};