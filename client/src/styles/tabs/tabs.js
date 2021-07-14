import { css } from "emotion"

export const tabs = css`
  &.nav-tabs .nav-link {
    font-size: 16px;

    padding: 0.5rem 1rem 0.5rem 0;

    text-transform: capitalize;

    color: #7a9ca3;
  }

  &.nav-tabs .nav-item.show .nav-link,
  &.nav-tabs .nav-item:hover,
  &.nav-tabs .nav-link.active,
  &.nav-tabs .nav-link.active:hover,
  &.nav-tabs .nav-link:hover {
    font-weight: 500;

    color: #0e3b5d;
    border: 0;
    border-bottom: 2px solid #b2c3cd;
    border-radius: 0;
    background-color: transparent;
  }

  &.nav-tabs {
    margin-bottom: 20px;

    cursor: pointer;

    border-bottom: 0;
  }

  &.nav-tabs .nav-item {
    text-align: left;
  }

  &.nav-tabs .nav-item,
  &.nav-tabs .nav-link,
  &.nav-tabs .nav-item:hover,
  &.nav-tabs .nav-link:hover {
    border: 0;
    border-radius: 0;
  }

  &.nav-tabs .nav-link {
    border-bottom: 2px solid #e8e7e7;
  }
`

export const scrollable = css`
  overflow-y: scroll;
  max-height: 100vh;
`
