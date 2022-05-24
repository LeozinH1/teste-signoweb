import styled from "styled-components";

export const Wrapper = styled.div``;

export const ButtonStyle = styled.button`
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  border: none;
  font-size: 0.9rem;
  background: var(--primary-color);
  color: #fff;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: var(--secondary-color);
  }

  &:disabled {
    background: #959595;
  }
`;
