
import braintree from 'braintree';

/**
 * The Braintree gateway.
 */
class BraintreeGateway {
  /**
   * The constructor of the class
   * @param {*} merchantId the merchant id
   * @param {*} publicKey the public key
   * @param {*} privateKey the private key
   */
  constructor(merchantId, publicKey, privateKey) {
    this.gateway = braintree.connect({
      environment: braintree.Environment[process.env.BRAINTREE_ENVIRONMENT],
      merchantId,
      publicKey,
      privateKey,
    });
  }
  
  /**
   * Generates a client token.
   * @param {object} requestOptions the request options
   * @returns {object} the return of the generate
   */
  generateToken(requestOptions = {}) {
    return this.gateway.clientToken.generate(requestOptions);
  }

  /**
   * Performs a sale transaction.
   * @param {object} transactionPayload the payload for transaction
   * @returns {object} the return of the sale
   */
  performSaleTransaction(transactionPayload) {
    const { amount, paymentMethodNonce: { nonce, deviceData } } = transactionPayload;
    return this.gateway.transaction.sale({
      amount,
      options: {
        threeDSecure: {
          required: true,
        },
      },
      paymentMethodNonce: nonce,
      deviceData,
    });
  }
};

/**
 * The BraintreeGateway factory.
 */
export class BraintreeGatewayFactory {
  /**
   * Creates an instance of the payment provider (braintree)
   * connected to the provided company (a.k.a. "ente" :D).
   * @param {*} dbContext the context of the db
   * @param {*} idEnte the id of institution
   * @returns {BraintreeGateway} the braintree gateway
   */
  static async Create(dbContext, idEnte) {
    // TODO: Double check with PM dates ("dt_inizio_val" and "dt_fine_val") format
    const braintreeCredentialsQuery = `
      SELECT 
        id_ente as "idEnte",
        id_merchant as "idMerchant",
        id_private_key as "idPrivateKey",
        id_public_key as "idPublicKey",
        dt_inizio_val as "dataInizioValidita",
        dt_fine_val as "dataFineValidita"
      FROM ${dbContext.tabelle.merchant}
      WHERE id_ente = ${idEnte} AND
        current_date >= dt_inizio_val AND
        (
          dt_fine_val IS NULL OR
          current_date <= dt_fine_val
        );
    `;

    const credentials = await dbContext.db.one(braintreeCredentialsQuery);
    const {
      idMerchant,
      idPrivateKey,
      idPublicKey,
    } = credentials;

    return new BraintreeGateway(
      idMerchant,
      idPublicKey,
      idPrivateKey,
    );
  }
}