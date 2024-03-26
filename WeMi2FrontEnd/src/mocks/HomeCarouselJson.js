/** @format */

import slide1 from 'images/homepage/carousel/slide1.png';
import slide2 from 'images/homepage/carousel/slide2.png';
import slide3 from 'images/homepage/carousel/slide3.png';
import slide4 from 'images/homepage/carousel/slide4.png';
import slide5 from 'images/homepage/carousel/slide5.png';

export const CarouselJson = {
  carouselItem: [
    {
      id: 1,
      img: slide1,
      caption: [
        [{ label: "WeMi.", weight: "bold", padding: "0 0.5rem 0 1rem" }, 
        { label: "Il SISTEMA di", weight: "light", padding: "0 0.5rem 0 0" }, 
        { label: "WELFARE di MILANO.", weight: "bold", padding: "0 1rem 0 0" }],
        [{ label: "CONDIVISO E PARTECIPATO:", weight: "light", padding: "0 1rem" }],
        [{ label: "DI TUTTI E PER TUTTI.", weight: "bold", padding: "0 1rem" }]
    ]
    },
    {
      id: 2,
      img: slide2,
      caption: [
        [{ label: "Questo", weight: "bold", padding: "0 0.5rem 0 1rem" }], 
        [{ label: "è", weight: "light", padding: "0 1rem" }], 
        [{ label: "UN ALTRO CAPTION", weight: "bold", padding: "0 1rem" }],
    ]
    },
    {
      id: 3,
      img: slide3,
      caption: [
        [{ label: "Questo", weight: "bold", padding: "0 0.5rem 0 1rem" }], 
        [{ label: "è", weight: "light",padding: "0 1rem" }], 
        [{ label: "UN ALTRO CAPTION ANCORA", weight: "bold", padding: "0 1rem" }],
    ]
    },
    {
      id: 4,
      img: slide4,
      caption: [
        [{ label: "Allora forse", weight: "bold", padding: "0 0.5rem 0 1rem" }], 
        [{ label: "NON", weight: "light", padding: "0 1rem" }], 
        [{ label: "CAPISCI", weight: "bold", padding: "0 1rem" }],
    ]
    },
    {
      id: 5,
      img: slide5,
      caption: [
        [{ label: "Questo", weight: "bold", padding: "0 0.5rem 0 1rem" }], 
        [{ label: "è", weight: "light", padding: "0 1rem" }], 
        [{ label: "UN ALTRO CAPTION!!!", weight: "bold", padding: "0 1rem" }],
    ]
    },
  ],
};
