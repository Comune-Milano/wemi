
import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'theme';
import { useSwipeable } from 'react-swipeable';
import styles from './Carousel.module.css';
import { useCarousel } from './useCarousel';
import { keyCodes } from '../utils/constants/keyCodes';

const StyledDot = styled.span`
  background-color: ${colors.grey};
  ${({ dotActive }) => dotActive && css`background-color: ${colors.darkGrey}`}
`;

const DivCarousel = styled.div`
      letter-spacing: 0.05em;
      padding: 0 0.05em;
`;

/**
 * A carousel component.
 */
export const Carousel = ({
  onSlideChange,
  currentSlideIndex,
  cyclic,
  autoPlay,
  marginDots,
  autoPlayInterval,
  slidesLength,
  description,
  showDots,
  children,
}) => {
  // Tells if the slider container has actually the focus.
  const hasFocus = useRef(false);

  // A ref to the element acting as wrapper of the carousel.
  const wrapperRef = useRef();

  // The handlers of swipe.
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      moveToNextSlide();
    },
    onSwipedRight: () => {
      moveToPrevSlide();
    },
  });

  /**
   * The API from the carousel hook.
   */
  const {
    moveToNextSlide,
    moveToPrevSlide,
    setAutoplayTimeout,
    clearAutoplayTimeout,
    isAutoplayActive,
  } = useCarousel(
    onSlideChange,
    currentSlideIndex,
    slidesLength,
    cyclic,
    autoPlay,
    autoPlayInterval,
  );

  /**
   * Clears the timeout associated with the slider autoplay.
   */
  const resetAutoplay = () => {
    clearAutoplayTimeout();
  };

  /**
   * Sets the autoplay timeout.
   */
  const setAutoplay = () => {
    if (!hasFocus.current) {
      setAutoplayTimeout();
    }
  };

  /**
   * Handles arrow key press.
   * @param {*} event
   */
  const handleArrowKeyPress = event => {
    if (event.keyCode === keyCodes.LEFT_ARROW) {
      moveToPrevSlide();
    } else if (event.keyCode === keyCodes.RIGHT_ARROW) {
      moveToNextSlide();
    } else {
      return false;
    }
  };

  /**
   * Handles the mouse-down event on the left arrow.
   * @param {*} event
   */
  const handleKeyDownOnLeftArrow = event => {
    if (event.keyCode === keyCodes.ENTER ||
        event.keyCode === keyCodes.SPACE
    ) {
      moveToPrevSlide();
    }
  };

  /**
   * Handles the mouse-down event on the right arrow.
   * @param {*} event
   */
  const handleKeyDownOnRightArrow = event => {
    if (event.keyCode === keyCodes.ENTER ||
        event.keyCode === keyCodes.SPACE
    ) {
      moveToNextSlide();
    }
  };

  /**
   * The mouse enter handler.
   */
  const onMouseEnter = () => {
    resetAutoplay();
  };

  /**
   * The mouse leave handler.
   */
  const onMouseLeave = () => {
    if (hasFocus.current) {
      return;
    }
    setAutoplay();
  };

  /**
   * The handler for the on-focus event on the slider container.
   */
  const onContainerFocus = () => {
    hasFocus.current = true;
    resetAutoplay();
  };

  /**
   * The handler for the on-focus event on the slider container.
   */
  const onContainerBlur = () => {
    hasFocus.current = false;
    setAutoplay();
  };

  /**
   * Setup work when the component is mounted.
   */
  useEffect(() => {
    if (!hasFocus.current) {
      setAutoplay();
    }

    // Cleanup.
    return () => {
      resetAutoplay();
    };
  }, [currentSlideIndex]);

  return (
    <DivCarousel
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label={description}
      className={styles.slideshowContainer}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onContainerFocus}
      onBlur={onContainerBlur}
      onKeyDown={handleArrowKeyPress}
      ref={wrapperRef}
      {...swipeHandlers}
    >
      {/* Next and previous buttons */}
      {
        slidesLength > 1 ? (
          <>
            <div
              aria-label="Immagine precedente"
              aria-controls="elementi-del-carousel"
              role="button"
              tabIndex={0}
              className={styles.arrowLeft}
              onKeyDown={handleKeyDownOnLeftArrow}
              onClick={moveToPrevSlide}
            >
              <div
                tabIndex={-1}
                className={`${styles.arrowContainer} ${styles.arrowContainerLeft}`}
              >
                <i
                  className={`${styles.arrow} ${styles.arrowLeft}`}
                  style={{ borderColor: colors.darkGrey }}
                />
              </div>
            </div>
            <div
              aria-label="Immagine successiva"
              aria-controls="elementi-carousel"
              role="button"
              tabIndex={0}
              className={styles.arrowRight}
              onKeyDown={handleKeyDownOnRightArrow}
              onClick={moveToNextSlide}
            >
              <div
                tabIndex={-1}
                className={`${styles.arrowContainer} ${styles.arrowContainerRight}`}
              >
                <i
                  className={`${styles.arrow} ${styles.arrowRight}`}
                  style={{ borderColor: colors.darkGrey }}
                />
              </div>
            </div>
          </>
        ) : null
      }
      {/* Children */}
      <div
        id="elementi-carousel"
        aria-live={isAutoplayActive ? 'polite' : 'off'}
        className={styles.slidesWrapper}
      >
        {children}
      </div>
      {/* The dots/circles */}
      {
        (showDots && slidesLength > 1) ? (
          <div className={marginDots ? styles.dotsFixedTexts : styles.dots}>
            {
              Array.from(Array(slidesLength)).map((_, index) =>
                (
                  <StyledDot
                    key={`dot_${index}`}
                    className={styles.dot}
                    dotActive={index === currentSlideIndex}
                  />
                ))
            }
          </div>
        ) : null
      }
    </DivCarousel>
  );
};

Carousel.displayName = 'Carousel';
