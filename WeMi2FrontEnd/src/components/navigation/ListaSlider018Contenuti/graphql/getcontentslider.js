export const getContentListSlider = [
  '',
  `query getContentListSlider ($input:ContentSlider018!) {
    getContentListSlider(params:$input) {
    list {
      id
      title
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
  'getContentListSlider'];