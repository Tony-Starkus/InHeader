import styled from "styled-components";

export const HeaderInStyle = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 55px;
  background: #fff;
  border-bottom: 1px solid #ccc;

  img.logo {
    height: 40px;
    width: auto;
  }

  .incicleheader-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-width: max-content;
  }

  .incicleheader-content.flex-end {
    justify-content: flex-end;
  }

  .incicleheader-inputbutton {
    display: none;
  }

  .incicleheader-inputsearch {
    width: 100% !important;
    color: #747474;

    &::placeholder {
      color: #747474aa !important;
    }
  }

  .incicleheader-modules-label,
  .incicleheader-modules-content.toggle {
    display: none;
  }

  @media only screen and (max-width: 1200px) {
    .incicleheader-inputbox {
      display: none !important;
    }

    .incicleheader-inputbutton {
      display: flex;
    }

    .incicleheader-inputbox.view {
      position: absolute;
      z-index: 5;
      display: flex !important;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 4px 0px;
      box-sizing: border-box;
    }
  }

  @media only screen and (max-width: 1000px) {
    .incicleheader-companies {
      span.MuiChip-label {
        display: none !important;
      }
    }
  }

  @media only screen and (max-width: 800px) {
    .incicleheader-modules-label {
      display: initial;
    }

    .incicleheader-modules-content {
      display: none;
    }

    .incicleheader-modules-content.original {
      display: none;
    }

    .incicleheader-modules-content.toggle.view {
      position: absolute;
      top: calc(100% + 16px);
      left: 8px;
      display: flex !important;
      flex-direction: column;
      justify-content: space-evenly;
      width: calc(100% - (24px));
      padding: 4px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3), 0 0 16px rgba(0, 0, 0, 0.2);

      a.MuiTypography-root {
        position: relative;
        /* width: 100%; */
      }

      /* a.MuiTypography-root:nth-child(n + 2)::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        margin: 0 auto;
        background-color: #ddd !important;
      } */
    }
  }

  @media only screen and (max-width: 600px) {
    .logo {
      width: 100px !important;
    }

    .incicleheader-avatar {
      margin: 0 !important;

      &,
      .MuiAvatar-root {
        width: 28px;
        height: 28px;
        /* padding: 8px; */
        margin: 0 8px !important;
      }
    }
  }
`;
