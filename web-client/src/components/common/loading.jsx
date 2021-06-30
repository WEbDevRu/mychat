import React from "react";
import styled from "styled-components"
import LoadingIcon from "./../../assets/loading.svg"


const LoadingBlock = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingImg = styled.div`
  width: 30px;
  height: 30px;
  display: block;
  background: url(${LoadingIcon});
  animation: 2s rotationAnim infinite;
  @keyframes rotationAnim{
    from{transform: rotate(0deg)}
    to {transform: rotate(360deg)}
  } 
`




const Loading = (props) =>{
    return (

        <LoadingBlock>
            <LoadingImg />
        </LoadingBlock>

    )
}




export default Loading