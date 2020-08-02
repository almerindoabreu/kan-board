import styled from "styled-components"

export const ListContainer = styled.div`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;
  opacity: ${props => props.done ? 0.6 : 1};
  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }
  ul {
    margin-top: 30px;
  }
`;

export const ListHeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
`

export const ListHeaderTitle = styled.h2`
    font-weight: 500;
    font-size: 16px;
    padding: 0 10px;
`

export const ListheaderButton = styled.button`
    width: 42px;
    height: 42px;
    border-radius: 18px;
    background: #3b5bfd;
    border: 0;
    cursor: pointer;
`
