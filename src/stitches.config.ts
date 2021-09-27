import { createCss } from "@stitches/react";

export const { styled, css, global, keyframes, getCssString, theme } =
  createCss({
    theme: {
      colors: {
        gray400: "gainsboro",
        gray500: "lightgray",
      },
    },
    media: {
      bp1: "(min-width: 480px)",
    },
    utils: {
      marginX: (config) => (value) => ({
        marginLeft: value,
        marginRight: value,
      }),
      marginY: (config) => (value) => ({
        marginTop: value,
        marginBottom: value,
      }),
    },
  });

const colors = {
    purple: '#9b4dca'
}

export { colors };