/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FlexRow, FlexColumn } from "./helpers";
import { SquareButton, Grow, Row } from "./helpers";
import { Subsection } from "./helpers";
import styled from "@emotion/styled";
import { theme, styles } from "./theme";

export const H1 = styled.h1([
  {
    fontSize: "10px",
    fontWeight: 600,
    color: "hsl(0,0%,50%)",
    textTransform: "uppercase",
    letterSpacing: "0.1px"
  }
]);

export const H2 = styled.h2([
  {
    fontSize: "11px",
    color: "hsl(0,0%,20%)",
    fontWeight: 600,
    letterSpacing: "0.1px"
  }
]);

export const H3 = styled.h3([
  {
    fontSize: "10px",
    fontWeight: 500,
    color: "hsl(0,0%,30%)",
    letterSpacing: "0.1px",
    margin: "0px"
  }
]);
