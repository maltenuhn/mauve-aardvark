export const theme = {
  colors: {
    neutral: "hsl(0,0%,95%)"
  },
  typo: {
    default: { fontFamily: "Inter", fontSize: "11px" }
  },
  layout: {
    rowHeight: {
      xlarge: 31,
      large: 29,
      medium: 27,
      small: 25
    }
  }
};

export const styles = {
  section: {
    backgroundColor: "orange",
    "&:hover": { backgroundColor: "blue" }
  },
  input: {
    borderRadius: "2px",
    border: "1px solid grey",
    outline: "none",
    padding: "2px",
    "&:focus": { border: "1px solid #007Aff" }
  }
};
