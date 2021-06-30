import React from "react";
import styled from "styled-components";

const ProfileImg = styled.div`
  display: block;
  width: ${(props) => props.width};
  height:  ${(props) => props.width};
  border-radius: 50%;
  background: #1e98ca;
  margin: auto;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  span{
    color: white;
    font-size: ${(props) => parseInt(props.width)*0.42+"px"};
    text-align: center;
    display: block;
    line-height: ${(props) => props.width};
  }
`


export const Avatar = (props) =>{
    return(
            <ProfileImg {...props}>
                <span>{props.name}</span>
            </ProfileImg>
        )

}