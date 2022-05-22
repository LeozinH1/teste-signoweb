import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  gap: 30px;
  padding: 100px 0;
  width: 600px;
  margin: 0 auto;

  white-space: pre-wrap;
  overflow-wrap: break-word;

  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 50px 20px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.3rem;
`;

export const EnquetesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
