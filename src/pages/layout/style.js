import styled from "styled-components"

export const LayoutWrap = styled.div`
  .header{
    background-image: linear-gradient(to right,#72c866, #49af72);
    color:white;
    height:auto;
    padding:0px 25px;
  }
  .sider{
    background-color:white;
    height:100vh;
  }
  .content{
    background-color:white;
    box-shadow: inset 0 8px 16px 0 rgba(28,31,33,.1); 
  }
  .ant-layout-sider-zero-width-trigger{
    background-color: white !important;
    box-shadow: 3px 6px 20px 0px rgb(28 31 33 / 10%);
    color:#9c9696;
    top:56px;
  }
`
