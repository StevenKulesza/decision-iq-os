// Packages
import { css, injectGlobal } from "emotion"

//= ========================
// Colors
//= ========================//

export const white = `#fff;`

export const black = `#000;`

export const lightGray = `#f1f0f0;`

export const lightGray2 = `#f7f7f7;`

export const mediumGray = `#ccc;`

export const darkGray = `#424141;`

export const lightBlue = `#b2c3cd;`

export const lightBlue2 = `#003b5a4d`;

export const mediumBlue = `#678b9b;`

export const mediumBlueHover = `#5d7f8e`;

export const navy = `#073d5c;`

export const orange = `#f36c32;`

export const orangeHover = `#ff3e00;`

export const yellow = `#f8be15;`

export const lightGreen = `#a0b8a3;`


//= ========================
// Background Colors
//= ========================//

export const lightGray2Bg = `background-color: ${lightGray2};`

//= ========================
// Fonts
//= ========================//

export const fontPrimary = css`"Work Sans", sans-serif;`

//= ========================
// Properties
//= ========================//

export const fontWeight = {
  small: '400',
  medium: '500',
  large: '600'
};

export const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
};

//= ========================
// Mixins
//= ========================//

// set media queries with breakpoint object
export const mq = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    let prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:'
    let suffix = typeof breakpoints[label] === 'string' ? '' : 'px'
    accumulator[label] = cls =>
      css`
        @media (${prefix + breakpoints[label] + suffix}) {
          ${cls};
        }
      `
    return accumulator
  },
  {}
)

//= ========================
// Global Styles
//= ========================//

injectGlobal `
  * {
    box-sizing: border-box;
  }

  body,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  label,
  .form-control,
  table,
  small
  {
      font-family: ${fontPrimary}!important;
      font-weight: ${fontWeight.small};
      color: ${darkGray};
  }

  strong {
    font-family: ${fontPrimary}!important;
    font-weight: ${fontWeight.medium};
    color: ${navy};
  }

  p {
    line-height: 1.1rem;
    font-size: 0.9rem;
    color: ${darkGray};

  }

  h4,
  h5,
  h6 {
    color: ${navy};
  }

  a, 
  .btn-link {
    color: ${navy};
    transition: ease-in-out 0.2s;
  }

  a:hover,
  .btn-link:hover {
    color: inherit;
    text-decoration: none;
  }

  ul {
    padding-left: 20px;
  }

  ul li {
    color: ${darkGray};
    letter-spacing: 0.02rem;
    font-size: 0.9rem;
  }

  img {
    max-width: 100%;
  }

`
