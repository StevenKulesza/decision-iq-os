import { css } from 'emotion';
import * as theme from '../theme';

export const pagination = css `
    & .page-link {
        color: ${theme.mediumBlue};
        transition: ease-in-out 0.2s;
    }
    & .page-item.active .page-link {
        background-color: ${theme.mediumBlue};
        border-color: ${theme.mediumBlue};
    }
`;