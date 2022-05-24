import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Wrapper, PageTitle, EnquetesHeader } from "./style";
import EnqueteItem from "../../Components/EnqueteItem";
import { Link } from "react-router-dom";
import Select from "../../Components/Select";

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
  const [enquetesFiltered, setEnquetesFiltered] = useState<Enquete[]>([]);
  const [filterType, setFilterType] = useState("all");
  /*
   * Load Enquetes
   */
  useEffect(() => {
    api.get("/enquete").then((res: AxiosResponse) => {
      setEnquetes(res.data);
    });
  });
  /*
   * Filter Enquetes
   */
  const filterChanged = (e: any) => {
    setFilterType(e.target.value);

    switch (e.target.value) {
      case "all":
        setEnquetesFiltered([]);
        break;

      case "end":
        setEnquetesFiltered(
          enquetes.filter((enquete) => new Date(enquete.termino) < new Date())
        );

        break;

      case "active":
        setEnquetesFiltered(
          enquetes.filter(
            (enquete) =>
              new Date(enquete.termino) > new Date() &&
              new Date(enquete.inicio) < new Date()
          )
        );
        break;

      case "soon":
        setEnquetesFiltered(
          enquetes.filter((enquete) => new Date(enquete.inicio) > new Date())
        );
        break;
    }
  };

  return (
    <>
      <Wrapper>
        <EnquetesHeader>
          <PageTitle>TODAS AS ENQUETES</PageTitle>
          <Link to="/create">+ Nova Enquete</Link>
        </EnquetesHeader>

        <Select onChange={(e) => filterChanged(e)}>
          <option value="all">todas</option>
          <option value="end">encerradas</option>
          <option value="active">ativas</option>
          <option value="soon">em breve</option>
        </Select>

        {filterType === "all"
          ? enquetes.map((enquete: Enquete) => (
              <EnqueteItem enquete={enquete} key={String(enquete.id)} />
            ))
          : enquetesFiltered.map((enquete: Enquete) => (
              <EnqueteItem enquete={enquete} key={String(enquete.id)} />
            ))}
      </Wrapper>
    </>
  );
};

export default PageHome;
