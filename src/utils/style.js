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
              --dander: #C37E91ff;
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
            `
        }
    }}
    color: var(--main-color);
    background-color: var(--bg-color-main);
  }
`