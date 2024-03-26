export const getSliderFinancialEducation = [
  '',
  `query getSliderFinancialEducation ($id:Int!) {
        getSliderFinancialEducation(id:$id){
        id
        title
        description
        image {
          id
          path
          name
          mime
        }
        version
        progressive
        link
        startDate
        endDate
        code
      }
  }
  `,
  'getSliderFinancialEducation'];
