import React, { useState } from "react";

export const FlexRow = props => (
  <div
    css={{
      // ...props.style,
      display: "flex",
      flexDirection: "row",
      justifyContent: 'center',
      border: "1px solid red"
    }}
    {...props}
  />
);

export const FlexColumn = props => (
  <div style={{ display: "flex", flexDirection: "column" }} {...props} />
);

export const SquareButton = props => (
  <button style={{ width: "18px", height: "18px" }} {...props} />
);

export const Grow = props => <div style={{ flexGrow: 1 }} {...props} />;

export const Row = props => <div {...props} />;

export const Subsection = props => (
  <div {...props} css={{ border: "1px solid red" }} />
);
