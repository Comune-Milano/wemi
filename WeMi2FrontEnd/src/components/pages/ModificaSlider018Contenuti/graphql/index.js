export const getContentSlider = [
  '',
  `query getContentSlider ($id:Int!) {
    getContentSlider(id:$id){
        id
        title
        subtitle
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
  'getContentSlider'];
