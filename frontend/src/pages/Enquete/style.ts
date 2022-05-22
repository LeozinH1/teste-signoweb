import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 100px 0;

  display: flex;
  flex-flow: column;
  gap: 30px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 50px 20px;
  }
`;

export const EnqueteHeader = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    flex-flow: column;
  }
`;

export const EnqueteNome = styled.div`
  white-space: pre-wrap;
  overflow-wrap: break-word;
  width: 400px;
  font-size: 1.3rem;
  font-weight: 700;

  @media screen and (max-width: 1200px) {
    width: auto;
  }
`;

export const EnqueteActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 5px;

  > div {
    background: #f1f1f1;
    padding: 10px;
    border-radius: 5px;

    font-size: 0.9rem;
  }
`;

export const OpcoesWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

export const EnqueteOpcao = styled.label`
  padding: 20px;
  border-radius: 5px;
  background: #f1f1f1;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  cursor: pointer;
`;

export const OpcaoNome = styled.div`
  width: 450px;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  @media screen and (max-width: 1200px) {
    width: 350px;
  }
`;

export const OpcaoVoto = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
