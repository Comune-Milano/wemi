export const getSlidersFinancialEducation = [
  '',
  `query getSlidersFinancialEducation ($input:ContentSlider!) {
        getSlidersFinancialEducation(params:$input) {
      list {
        id
        title
        code
        version
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
  'getSlidersFinancialEducation'];
