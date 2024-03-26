import backofficeTcb from 'resolvers/backofficeTcb/backofficeTcb';
import { contextCreationMock } from '../utils/context';
import { dbKnex } from '../utils/knex';

describe('Check resolvers unit test', () => {
  it('checking resolver InvioEmailPromemoriaDisponibilita', async () => {
    /**
     * Setup for the the test
     */
    const context = contextCreationMock;
    const { Query: { InvioEmailPromemoriaDisponibilita }} = backofficeTcb;

    /**
     *
     * Executing the function
     */

    const result = await InvioEmailPromemoriaDisponibilita({}, {idLavoratore: 4}, context, { });
    /**
     * Comparing the result
     */
    expect(result).toBeTruthy();
  });

});

afterEach(() => {
  const databaseObj = dbKnex;
  /**
   * Delete inserted fixture if needed
   */
  // databaseObj.where().delete();
});