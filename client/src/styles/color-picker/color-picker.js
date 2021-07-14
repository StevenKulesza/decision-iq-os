import { css } from "emotion"

export const color = css `
    width: 18px;
    height: 18px;
    borderRadius: 2px;
    background: pink;
`;

export const swatch = css `
    margin:1px 6px;
    padding: 5px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.2);
    display: inline-block;
    cursor: pointer;
`;

export const popover = css `
    position: absolute;
    zIndex: 2;   
    right: 0;
    bottom: 0;   
`

export const cover = css `
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`