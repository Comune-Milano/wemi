import municipioAllResolver from 'resolvers/municipio/municipio';
import { contextCreationMock } from '../utils/context';
import { dbKnex } from '../utils/knex';
import { fixtureMunicipio } from '../fixtures/municipio.fixture';

describe('Check resolvers unit test', () => {
  it('checking resolver municipioAll', async () => {
    /**
     * Setup for the the test
     */
    const context = contextCreationMock;
    const { Query: { municipioAll }} = municipioAllResolver;

    /**
     *
     * Executing the function
     */

    const result = await municipioAll({}, {}, context, { });
    /**
     * Comparing the result
     */
    expect(result).toBeTruthy();
    expect(result).toEqual(fixtureMunicipio);

  });

});

afterEach(() => {
  const databaseObj = dbKnex;
  /**
   * Delete inserted fixture if needed
   */
  // databaseObj.where().delete();
});