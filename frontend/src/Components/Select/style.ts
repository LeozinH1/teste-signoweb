import styled from "styled-components";

export const SelectStyle = styled.select`
  width: 100%;
  font-size: 13px;

  background-color: #fff;
  border: none;
  padding: 20px;
  color: #000;
  transition: 0.2s;
  border-radius: 4px;
  padding-right: 50px;
  border: 1px solid #d1d1d1;
  cursor: pointer;

  &:focus {
    border: 1px solid var(--primary-color);
  }
`;
