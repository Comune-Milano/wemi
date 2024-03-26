
import { useRef, useState } from 'react';

/**
 * A generic carousel component.
 */
export const useCarousel = (
  onSlideChange,
  currentSlideIndex,
  slidesLength,
  cyclic,
  autoPlay,
  autoPlayInterval = 5000,
) => {
  // A reference to the id of autoplay timeout.
  const autoPlayTimeoutRef = useRef();

  // Tells whether the slider autoplay is actually active or not.
  const [hasAutoplay, setHasAutoplay] = useState(false);

  /**
   * Emits an event to change the current displayed slide.
   */
  const changeSlide = slideNumber => {
    clearAutoplayTimeout();
    onSlideChange(slideNumber);
  };

  /**
   * Moves to the next slide.
   */
  const moveToNextSlide = () => {
    if (currentSlideIndex === (slidesLength - 1) && !cyclic) {
      return;
    }
    // Normalizes the new index and emits it to the consumer.
    changeSlide((currentSlideIndex + 1) % slidesLength);
  };

  /**
   * Moves to the previous slide.
   */
  const moveToPrevSlide = () => {
    if (currentSlideIndex <= 0 && !cyclic) {
      return;
    }
    // Normalizes the new index and emits it to the consumer.
    changeSlide((currentSlideIndex - 1 + slidesLength) % slidesLength);
  };

  /**
   * Clears the timeout associated with the slider autoplay.
   */
  const clearAutoplayTimeout = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);

      autoPlayTimeoutRef.current = undefined;
      setHasAutoplay(false);
    }
  };

  /**
   * Sets the autoplay timeout.
   */
  const setAutoplayTimeout = () => {
    // Setup the slider autoplay.
    if (autoPlay && slidesLength > 1) {
      const timeoutID = setTimeout(
        () => moveToNextSlide(),
        autoPlayInterval
      );
      autoPlayTimeoutRef.current = timeoutID;
      setHasAutoplay(true);
    }
  };

  // Exposes the component API to its children.
  return {
    changeSlide,
    moveToNextSlide,
    moveToPrevSlide,
    setAutoplayTimeout,
    clearAutoplayTimeout,
    isAutoplayActive: hasAutoplay,
  };
};
