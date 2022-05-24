import styled from "styled-components";

export const Wrapper = styled.div``;

export const ButtonStyle = styled.button`
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  border: none;
  font-size: 0.9rem;
  background: #f3f3f3;
  color: #000;
  transition: 0.2s;

  &:hover {
    background: #e8e8e8;
  }

  &:disabled {
    background: #959595;
  }
`;
