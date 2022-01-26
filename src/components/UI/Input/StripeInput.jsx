import React, { useRef, useImperativeHandle } from "react";

const StripeInput = ({ component: Component, ref, ...other }) => {
  const elementRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element) => (elementRef.current = element)}
      {...other}
    />
  );
};

export default StripeInput;
