import styled from "styled-components";

export const Wrapper = styled.div``;

export const ButtonStyle = styled.button`
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  border: none;
  font-size: 0.9rem;
  background: #da1a2c;
  color: #fff;

  &:hover {
    filter: grayscale(0.3);
  }

  &:disabled {
    background: #959595;
  }
`;
