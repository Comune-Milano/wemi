
/** @format */

import { ApolloError} from 'apollo-server';
import { PAYMENT_PROVIDER_TOKEN_ERROR } from '../../errors/errors';
import { BraintreeGatewayFactory } from './factory/PaymentProviderFactory';
import { selectIdEnteByRequestId } from './queries/queries';

export default {
  Query: {
      paymentAuthorizationToken: async (parent, args, context) => {
        try {
          const { idRichiestaEnte } = args;
          const { idEnte } = await context.db.one(selectIdEnteByRequestId, { idRichiestaEnte });

          const paymentGateway = await BraintreeGatewayFactory.Create(context, idEnte);
          const response = await paymentGateway.generateToken();

          if (!response.success) {
            throw new Error(JSON.stringify(response));
          }

          return response.clientToken;
        } catch (error) {
          context.logger.error(
            error,
            'Payment provider - Error while generating the client token'
          );

          const { message, code } = PAYMENT_PROVIDER_TOKEN_ERROR;
          throw new ApolloError(
            message,
            code
          );
        }
      },
  },
};