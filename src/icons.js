/** @jsx jsx */
import { jsx } from "@emotion/core";

export const Icons = {
  ExpansionArrowSmall: props => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 12L10.5355 8.46447L7 4.92893"
        stroke="#545454"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Component: props => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.58334 12.7917L9.00001 11.0312L14.4167 12.7917"
        stroke="#C8C8FF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2.5V7.91667"
        stroke="#C8C8FF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 6.85944V11.1406C2.5 12.2369 3.20711 13.2811 4.24059 13.6988L7.77615 15.2651C8.53766 15.5783 9.46234 15.5783 10.2238 15.2651L13.7594 13.6988C14.7929 13.2289 15.5 12.2369 15.5 11.1406V6.85944C15.5 5.76305 14.7929 4.71888 13.7594 4.3012L10.2238 2.73494C9.46234 2.42169 8.53766 2.42169 7.77615 2.73494L4.24059 4.3012C3.20711 4.71888 2.5 5.76305 2.5 6.85944Z"
        stroke="#7777FF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.20416 5.45208L7.97083 7.61875C8.62083 7.88958 9.37916 7.88958 10.0292 7.61875L15.0125 5.34375"
        stroke="#7777FF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7.91663V14.9583"
        stroke="#7777FF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  FourDots: () => (
    <svg width="8px" height="8px" viewBox="0 0 8 8">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Artboard" fill="hsl(0,0%,40%)">
          <g id="FourDots">
            <rect id="Rectangle" x="0" y="0" width="2" height="2" rx="1" />
            <rect id="Rectangle" x="6" y="0" width="2" height="2" rx="1" />
            <rect id="Rectangle" x="6" y="6" width="2" height="2" rx="1" />
            <rect id="Rectangle" x="0" y="6" width="2" height="2" rx="1" />
          </g>
        </g>
      </g>
    </svg>
  ),
  ExpansionArrow: {
    Expanded: () => (
      <svg width="11px" height="6px" viewBox="0 0 11 6">
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Artboard-Copy"
            transform="translate(0.000000, -3.000000)"
            stroke="hsl(0,0%,40%)"
          >
            <polyline
              id="Path-2-Copy-2"
              transform="translate(5.500000, 3.500000) rotate(-45.000000) translate(-5.500000, -3.500000) "
              points="2 -1.3142949e-12 2 6.76666667 9 7"
            />
          </g>
        </g>
      </svg>
    ),
    NotExpanded: () => (
      <svg width="6px" height="11px" viewBox="0 0 6 11">
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Artboard-Copy"
            transform="translate(-3.000000, 0.000000)"
            stroke="hsl(0,0%,40%)"
          >
            <polyline
              id="Path-2-Copy-2"
              transform="translate(3.500000, 5.500000) rotate(225.000000) translate(-3.500000, -5.500000) "
              points="-1.06902186e-12 2 -1.06902186e-12 8.76666667 7 9"
            />
          </g>
        </g>
      </svg>
    )
  },
  Minus: () => (
    <svg width="9px" height="3px" viewBox="0 0 9 3">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Inspector-Copy-2"
          transform="translate(-236.000000, -466.000000)"
          fill="hsl(0,0%,40%)"
          fillRule="nonzero"
        >
          <g
            id="PlusButtonIcon-Copy-4"
            transform="translate(231.000000, 458.000000)"
          >
            <polygon
              id="+"
              points="14 8.87011349 14 10.1185372 5 10.1185372 5 8.87011349"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
  Plus: () => (
    <svg width="9px" height="9px" viewBox="0 0 9 9" version="1.1">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Inspector-Copy-2"
          transform="translate(-239.000000, -354.000000)"
          fill="hsl(0,0%,40%)"
          fillRule="nonzero"
        >
          <g
            id="PlusButtonIcon-Copy-6"
            transform="translate(234.000000, 349.000000)"
          >
            <polygon
              id="+"
              points="14 8.87011349 14 10.1185372 10.1298865 10.1185372 10.1298865 14 8.8814628 14 8.8814628 10.1185372 5 10.1185372 5 8.87011349 8.8814628 8.87011349 8.8814628 5 10.1298865 5 10.1298865 8.87011349"
            />
          </g>
        </g>
      </g>
    </svg>
  )
};

const a = Icons.Minus;
