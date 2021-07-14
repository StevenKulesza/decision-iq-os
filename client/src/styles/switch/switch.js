import { css } from "emotion"
import * as theme from '../theme'

export const switchOn = css`background-color: ${theme.orange};`

export const switchOff = css`background-color: ${theme.lightBlue};`

export const slider = css`
  position: absolute;

  cursor: pointer;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

  background: ${theme.white};

  border: 1px solid ${theme.lightBlue};

  -webkit-transition: 0.4s;

  transition: 0.4s;

  overflow: hidden;

  input:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + &:before {
    -webkit-transform: translateX(98%);

    -ms-transform: translateX(98%);

    transform: translateX(98%);
  }

  &.round {
    border-radius: 5px;
  }

  &.round:before {
    border-radius: 5px;
  }
`

export const switchSlider = css`
  position: relative;

  display: inline-block;

  width: 100%;

  height: 34px;

  font-size: 12px;

  transition: ease-in-out 0.2s;

  & input {
    display: none;
  }

  & .instruction {
    left: 4px;

    top: 2px;

    bottom: 2px;

    border-radius: 5px;
  }
  & .switch-label {
    line-height: 34px;

    &.text-dark:hover {
      transition: ease-in-out 0.2s;
      background-color: ${theme.mediumGray}
    }
    &.text-light:hover {
      transition: ease-in-out 0.2s;
      background-color: ${theme.orangeHover}
    }
  }
`

export const onOffSwitch = css `
  position: relative;
  width: 76px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  & .onoffswitch-checkbox {
    display: none;
  }
  & .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: none;
    border-radius: 10px;
  }
  & .onoffswitch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  & .onoffswitch-inner:before,
  & .onoffswitch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 36px;
    padding: 0;
    line-height: 38px;
    font-size: 11px;
    color: white;
    font-family: ${theme.fontPrimary};
    box-sizing: border-box;
  }
  & .onoffswitch-inner:before {
    content: "ON";
    padding-left: 10px;
    background-color: #ffffff;
    color: ${theme.orange};
  }
  & .onoffswitch-inner:after {
    content: "OFF";
    padding-right: 10px;
    background-color: #ffffff;
    color: ${theme.lightBlue};
    text-align: right;
  }
  & .onoffswitch-switch {
    display: block;
    width: 30px;
    margin: 1px;
    background: ${theme.lightBlue};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    border: 2px solid white;
    border-radius: 10px;
    transition: all 0.3s ease-in 0s;
  }

  & .onoffswitch-switch i, 
  & .onoffswitch-switch svg {
      color: white;
      padding: 7px 10px;
      font-size: 18px;
  }

  & .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
      margin-left: 0;
  }
  & .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
      right: 0px;
      background-color: ${theme.orange};
  }
`

