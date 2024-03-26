export const EstraiSliderEducazioneFinanziaria = [
  '',
  `query EstraiSliderEducazioneFinanziaria ($input:PublishContentSlider!) {
    EstraiSliderEducazioneFinanziaria(params:$input) {
      list {
        id
        title
        description
        image {
          id
          path
          mime
        }
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
  'EstraiSliderEducazioneFinanziaria'];
