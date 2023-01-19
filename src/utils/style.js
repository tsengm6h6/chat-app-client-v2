import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
      ${(props) => {
        switch(props.theme.mode) {
          case "dark": 
            return css `
              --bg-color-main: #1D1E23ff;
              --bg-color-darken: #16171Bff;
              --main-color: #FBFBFCff;
              --primary: #F3FB8Aff;
              --secondary: #B785F6ff;
              --warning: #A3DA30ff;
              --danger: #ff758f;
              --toastify-color-light: var(--bg-color-main);
              --toastify-color-dark: var(--bg-color-darken);
              --toastify-color-info: var(--primary);
              --toastify-color-success: var(--secondary);
              --toastify-color-warning: var(--warning);
              --toastify-color-error: var(--danger);
              --toastify-text-color-info: var(--main-color);
              --toastify-text-color-success: var(--main-color);
              --toastify-text-color-warning: var(--main-color);
              --toastify-text-color-error: var(--main-color);
            `;
          default:
            return css `
              --bg-color-main: #FFFFFFff;
              --bg-color-darken: #F6F7FBff;
              --main-color: #3D3D3Fff;
              --primary: #3AA589ff;
              --secondary: #4E416Cff;
              --warning: #E9AD8Fff;
              --danger: #C37E91ff;
              --toastify-color-light: var(--bg-color-main);
              --toastify-color-dark: var(--bg-color-darken);
              --toastify-color-info: var(--secondary);
              --toastify-color-success: var(--primary);
              --toastify-color-warning: var(--warning);
              --toastify-color-error: var(--danger);
              --toastify-text-color-info: var(--main-color);
              --toastify-text-color-success: var(--main-color);
              --toastify-text-color-warning: var(--main-color);
              --toastify-text-color-error: var(--main-color);
            `
        }
    }}
    color: var(--main-color);
    background-color: var(--bg-color-darken);
    
    .Toastify__toast-theme--dark,
    .Toastify__toast-theme--light {
      background: var(--bg-color-main);
      color: var(--main-color);
    }

    .Toastify__toast-theme--colored.Toastify__toast--default {
      background: var(--bg-color-main);
      color: var(--primary);
    }
    .Toastify__toast-theme--colored.Toastify__toast--info {
      background: var(--bg-color-main);
      color: var(--secondary);
    }
    .Toastify__toast-theme--colored.Toastify__toast--success {
      background: var(--bg-color-main);
      color: var(--primary);
    }
    .Toastify__toast-theme--colored.Toastify__toast--warning {
      background: var(--bg-color-main);
      color: var(--waring);
    }
    .Toastify__toast-theme--colored.Toastify__toast--error {
      background: var(--bg-color-main);
      color: var(--danger);
    }

    .Toastify__progress-bar-theme--light {
      background: var(--primary);
    }
    .Toastify__progress-bar-theme--dark {
      background: var(--primary);
    }
    .Toastify__progress-bar--info {
      background: var(--secondary);
    }
    .Toastify__progress-bar--success {
      background: var(--primary);
    }
    .Toastify__progress-bar--warning {
      background: var(--warning);
    }
    .Toastify__progress-bar--error {
      background: var(--danger);
    }
  
  }
`