
import React, { useContext } from 'react';

/**
 * Connect a context to a component by mapping the
 * context value to a set of component props.
 * @param {*} context
 * @param {*} mapContextToProps The function used for the mapping.
 */
const connectContext = (context, mapContextToProps) =>
  WrappedComponent =>
    /* eslint-disable react/display-name */
    props => {
      const ctx = useContext(context);
      const propsFromContext = mapContextToProps(ctx);
      return <WrappedComponent {...propsFromContext} {...props} />;
    };


export default connectContext;
