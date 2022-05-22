import styled from "styled-components";
import { Wrapper as Input } from "../../Components/Input/style";

export const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 100px 0;

  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 50px 20px;
  }
`;

export const PageTitle = styled.h1`
  margin: 40px 0;
`;

export const OpcaoItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  ${Input} {
    flex: 1;
    margin: 10px 0;
  }
`;
