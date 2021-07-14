import { css } from "emotion"
import * as theme from '../theme'

export const card = css`
  border: 4px solid ${theme.white};
  border-radius: 0;
  background-color: ${theme.white};
  transition: ease-in-out 0.2s;

  &:hover,
  &:active,
  &:focus {
    border-color:${theme.lightGreen};
  }

  &.selected {
    border-color:${theme.lightGreen};  
  }
`
