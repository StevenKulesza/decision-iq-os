import { css } from "emotion"
import * as theme from '../theme'

export const btn = css`
  font-weight: 500;

  text-transform: uppercase;

  border-radius: 6px;

  &.btn-link {
    text-decoration: underline;

    text-transform: uppercase;

    color: ${theme.orange};

    &.secondary {
      color: ${theme.mediumBlue};
    }
    &:hover{
      color: ${theme.navy};
    }
  }

  &.btn-primary {
    color: ${theme.white};

    border-color: ${theme.orange};

    background-color: ${theme.orange};

    &:hover {
      color: ${theme.white};

      border-color: ${theme.orangeHover};

      background-color: ${theme.orangeHover};
    }

    &:focus,
    &.focus {
      -webkit-box-shadow: 0 0 0 0.2rem ${theme.orangeHover};

      box-shadow: 0 0 0 0.2rem ${theme.orangeHover};
    }
  }

  &.btn-secondary {
    color: ${theme.white};

    border-color: ${theme.mediumBlue};

    background-color: ${theme.mediumBlue};

    &:hover {
      color: ${theme.white};

      border-color: ${theme.mediumBlueHover};

      background-color: ${theme.mediumBlueHover};
    }

    &:focus,
    &.focus {
      -webkit-box-shadow: 0 0 0 0.2rem ${theme.mediumBlueHover};

      box-shadow: 0 0 0 0.2rem ${theme.mediumBlueHover};
    }
  }
`
export const buttonAccordian = css `
  &.btn {
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 1rem;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    text-align: left;
    color: ${theme.mediumBlue};
    border-color: ${theme.mediumBlue};
    background: transparent;

    &:hover {
      color: ${theme.mediumBlue};
      background: transparent;
      font-weight: ${theme.fontWeight.large};
    }
    &:focus {
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }
`
