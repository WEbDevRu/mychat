import React, {useRef, useState} from "react";
import styled from "styled-components";

const ClickToCopyBlock = styled.div`

`

const ClickToCopyRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`
const ClickToCopyInput = styled.input`
  border: 0px;
  appearance: none;
  border-radius: 0px;
  outline: none;
  margin-bottom: 10px;
  margin-top: 10px;
;
`
const ClickToCopyButton = styled.button`
  color: #8c8c8c;
  font-size: 13px;
  line-height: 13px;
  height: 13px;
  border-radius: 0;
  min-width: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover{
    color: #8c8c8c;
    text-decoration: underline;
  }
`

const CopiedBadge = styled.p`
line-height: 13px;
  margin-left: 10px;
`


export const ClickToCopy = (props) => {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    let copyToClipboard = (e) =>{
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('copied');
        setTimeout(()=>{setCopySuccess('')}, 3000)
    };



    return(
        <ClickToCopyBlock>

            <ClickToCopyInput onClick={(e)=>{e.target.select()}} ref={textAreaRef} value={props.value} />
            <ClickToCopyRow>
                <ClickToCopyButton primary onClick={copyToClipboard}>Click to copy</ClickToCopyButton>
                {copySuccess === 'copied' ? <CopiedBadge>Copied</CopiedBadge> : ''}
            </ClickToCopyRow>


        </ClickToCopyBlock>
    )
}
