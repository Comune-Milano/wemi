/** @format */

import React, { useEffect, useRef } from 'react';
import Text from 'components/ui/Text';

const StepTitle = ({
  title,
}) => {
  const stepTitleRef = useRef();
  // title focus for improved accessibility
  useEffect(() => {
    if (stepTitleRef.current) {
      window.scrollTo(0, stepTitleRef.current.offsetTop);
    }
  }, []);

  return (
    <div ref={stepTitleRef}>
      <Text
        id="stepTitleTCB"
        size="f4"
        tag="h2"
        weight="bold"
        color="black"
        margin="0 0 1.5rem 0"
        value={title}
        tabIndex="-1"
      />
      {/* <Text
        tag="p"
        value={description}
        size="f7"
        margin="0 0 3rem 0"
      /> */}
    </div>
  );
};

StepTitle.displayName = 'StepTitle';

export default StepTitle;
