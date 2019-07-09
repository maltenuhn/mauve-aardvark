import React, { useState } from "react";
import styled from "@emotion/styled";

export const FlexRow = styled.div({
  display: "flex",
  flexDirection: "row",
  height: "50px",
  border: "2px solid blue"
});

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
