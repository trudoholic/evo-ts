import {createGlobalStyle} from "styled-components"

export default createGlobalStyle`
    //* {
    //    margin: 0;
    //    padding: 0;
    //    outline: 0;
    //    box-sizing:border-box;
    //    font-family: 'Open Sans', sans-serif; 
    //}
    
    :root {
      --table-color: #044d1c;
      
      font-size: 62.5%;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      font-weight: 400;

      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
      background-color: var(--table-color);

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }

    body {
      margin: 0;
      display: flex;
      place-items: center;
      min-width: 320px;
      min-height: 100vh;
      user-select: none;
      //background-color: #369;
    }

    #root {
      width: 100vw;
      height: 100vh;
      //max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      //background-color: #369;
    }

    h2 {
      color: #369;
      font-size: 1.8rem;
      line-height: 1.1;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      margin: 0.8rem 1.6rem;
      padding: 0.8rem 1.6rem;
      font-size: 1.6rem;
      font-weight: 500;
      font-family: inherit;
      color: #ccc;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      color: #646cff;
      border-color: #646cff;
    }
    //button:focus,
    //button:focus-visible {
    //  outline: 4px auto -webkit-focus-ring-color;
    //}

    details summary {
      color: #ccc;
      cursor: pointer;
      font-size: 1.8rem;
    }
    details[open] summary {
      color: #999;
    }
    details summary > * {
      display: inline;
    }

    @media (prefers-color-scheme: light) {
      :root {
        color: #213547;
        background-color: #ffffff;
      }
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
`