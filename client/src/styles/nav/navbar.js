import { css } from "emotion"
import * as theme from '../theme'

export const navbar = css`
  z-index: 100;
`

export const navbarLogo = css`
  width: 24px;
  max-width: 24px;
`

export const navbarDark = css`
  background: ${theme.lightGray};
`

export const navBarLink = css`
  font-family: ${theme.fontPrimary};
  font-weight: ${theme.fontWeight.small};
  text-decoration: underline;
  text-transform: uppercase;
  color: ${theme.orange};
  &:hover {
    color: ${theme.orange};
  };

  ${theme.mq.medium(css`
    padding-right: 1rem;
    padding-left: 1rem;
  `)};
`

export const navbarBrand = css`
  color: ${theme.navy};
  &:hover {
    color: ${theme.navy};
  }
`

export const navbarFixedTop = css `
  z-index: 1030;
  top: 0;
  right: 0;
  left: 0;
`
