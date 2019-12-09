import { createGlobalStyle } from "styled-components";

import normalize from './normalize';
import variables from './variables';
import { layout } from './index';

const GlobalStyles = createGlobalStyle`
    ${ normalize }
    ${ variables }

    html,
    body {
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-family: sans-serif;
        font-weight: var(--font-weight-regular);
        font-size: var(--global-font-size);
    }

    body {
        font-size: 1.4rem;

        @media ${layout.md} {
            font-size: 1.6rem;
        }
    }
`;


export default GlobalStyles;