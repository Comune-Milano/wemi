import { contextCreationMock } from './utils/context';

afterAll(()=> {
  contextCreationMock.db.$pool.end();
});