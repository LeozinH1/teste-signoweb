import styled from "styled-components";

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

export const EnqueteOpcao = styled.label`
  padding: 20px;
  border-radius: 5px;
  background: #f1f1f1;

  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
`;

export const OpcoesWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;
export const OpcaoNome = styled.div`
  flex: 1;
`;
export const OpcaoVotos = styled.div``;

export const EnqueteInfo = styled.div`
  font-size: 0.9rem;

  span {
    font-weight: 700;
  }
`;

export const EnqueteActions = styled.div`
  display: flex;
  gap: 10px;
`;
