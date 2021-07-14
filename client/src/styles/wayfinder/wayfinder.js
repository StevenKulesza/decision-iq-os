import { css } from "emotion"
import * as theme from '../theme'

export const stepsForm2 = css`
  display: table;
  width: 100%;
  position: relative;
  font-size: 40px;

  & .steps-row-2 {
    display: table-row;
  }

  & .steps-row-2:before {
    top: 38%;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 2px;
    background-color: ${theme.lightBlue};
  }

  & .steps-row-2 .steps-step-2 {
    display: table-cell;
    text-align: center;
    position: relative;
    background-color: ${theme.lightGray2}!important;
  }

  & .steps-row-2 .steps-step-2 p {
    margin-top: 0.5rem;
  }

  & .steps-row-2 .steps-step-2 .btn-circle-2 {
    color:  ${theme.lightBlue} !important;
    padding: 20px 20px 10px 4px;
  }

  & .steps-row-2 .steps-step-2 .label-wayfinder {
    font-size: 15px;
    font-weight: 500;
    line-height: 15px;
  }

  & .steps-row-2 .steps-step-2 .label-step {
    font-size: 10px;
    line-height: 10px;
  }

  & .steps-row-2 .steps-step-2 .btn-circle-2:hover {
    color: ${theme.navy} !important;
  }

  & .steps-row-2 .steps-step-2 .btn-circle-2.active {
    color: ${theme.orange} !important;
  }
`
