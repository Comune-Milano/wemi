export const getContentServices = [
  '',
  `query getContentServices ($input:ContentService!) {
        getContentServices(params:$input) {
      list {
        id
        title
        catAccreditamento
        version
        code
        state {
          id
          description
        }
        progressive
      }
      total
    }
  }
  `,
  'getContentServices'];
