import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Wrapper, PageTitle, EnquetesHeader } from "./style";
import EnqueteItem from "../../Components/EnqueteItem";
import { Link } from "react-router-dom";

interface Opcao {
  id: Number;
  enqueteId: Number;
  nome: String;
  votos: Number;
  created_at: Date;
  updated_at: Date;
}

interface Enquete {
  id: Number;
  nome: String;
  inicio: Date;
  termino: Date;
  created_at: Date;
  updated_at: Date;
  opcoes: Opcao[];
}

const PageHome: React.FC = () => {
  /*
   * Declare Variables
   */
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);
  /*
   * Load Enquetes
   */
  useEffect(() => {
    api.get("/enquete").then((res: AxiosResponse) => {
      setEnquetes(res.data);
    });
  });

  return (
    <>
      <Wrapper>
        <EnquetesHeader>
          <PageTitle>todas as enquetes</PageTitle>
          <Link to="/create">+ Nova Enquete</Link>
        </EnquetesHeader>
        {enquetes
          ? enquetes.map((enquete: Enquete) => (
              <EnqueteItem enquete={enquete} key={String(enquete.id)} />
            ))
          : "Nenhuma enquete foi encontrada."}
      </Wrapper>
    </>
  );
};

export default PageHome;
