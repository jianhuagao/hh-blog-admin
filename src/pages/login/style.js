import styled from "styled-components"

export const PageWarp = styled.div`
  height: 100vh;
  //background: linear-gradient(to right,rgb(75 176 113),rgb(110 198 103));
  background: url(${require("@/assets/img/loginbg.jpg").default}) no-repeat top;
  background-size: cover;
  .right{
    z-index: 1;
    height: 100vh;
    background-color: rgb(255 255 255 / 81%);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    .loginForm{
      padding: 50px;
      height: 80vh;
      width: 100%;
      .loginTitle{
        .loginLink{
          cursor: pointer;
          font-size:small;
          margin-right:20px;
        }
        .active{
          transition:0.5s font-size ease;
          font-size:x-large;
          position: relative;
        }
        .active:before{
          position: absolute;
          bottom:1px;
          content: "";
          height: 5px;
          opacity:0.8;
          width: 100%;
          background-color: #68c066;
        }
        
      }
      .loginBody{
        padding-top: 20px;
        .loginInp{
          border-bottom: 1px #72c866 solid;
        }
        input::-webkit-input-placeholder {
          color:#6b6b6b;
        }
        input::-moz-placeholder{
          color: #6b6b6b;
        }
        input::-ms-input-placeholder {
          color: #6b6b6b;
        }
        .loginButton{
          background-image: linear-gradient(to right,#72c866, #49af72);
          border: none;
          height: 40px;
        }
      }
      
    }
  }
  .source{
    position: fixed;
    bottom: 10px;
    left: 20px;
    width: 51px;
    height: 58px;
    z-index: 0;
    background: url(${require("@/assets/img/binglogo.png").default}) no-repeat top;
  }
`
