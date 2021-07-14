import { css } from 'emotion';

export const bannerGlobalStyles = css `
    position: relative;

    & .banner {
        overflow: hidden;
        border: 1px solid #000;
    }
`;

export const banner300x250 = css`
    width: 300px;
    height: 250px;

    & .banner {
        width: 298px;
        height: 248px;
    }
`;

export const banner160x600 = css `
    width: 160px;
    height: 600px;

    & .banner {
        width: 158px;
        height: 598px;
    }
`;

export const banner300x600 = css `
    width: 300px;
    height: 600px;

    & .banner {
        width: 298px;
        height: 598px;
    }
`;

export const banner728x90 = css `
    width: 728px;
    height: 90px;

    & .banner {
        width: 726px;
        height: 88px;
    }
`;