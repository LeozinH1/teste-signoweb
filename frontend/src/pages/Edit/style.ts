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

export const EnqueteNome = styled.h1`
  margin: 40px 0;
`;

export const EnqueteOpcao = styled.div`
  padding: 20px;
  border-radius: 5px;
  background: #f1f1f1;

  display: flex;
  gap: 20px;
  align-items: center;
`;

export const OpcoesWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

export const OpcaoNome = styled.div`
  flex: 1;
`;

export const PageTitle = styled.h1`
  margin: 40px 0;
`;

export const OpcaoVotos = styled.div``;
export const EnqueteInicio = styled.div``;
export const EnqueteTermino = styled.div``;

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
