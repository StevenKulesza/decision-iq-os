import { css } from "emotion"
import * as theme from '../theme'

export const footer = css`
  line-height: 60px; /* Vertically center the text there */

  /*position: absolute;*/
  /*bottom: 0;*/

  width: 100%;
  height: 120px; /* Set the fixed height of the footer here */
  padding: 2em 1em;

  color: ${theme.darkGray};
  background-color: ${theme.lightGray};
`
