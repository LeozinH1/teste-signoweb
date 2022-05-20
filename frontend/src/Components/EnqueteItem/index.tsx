import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Wrapper, EnqueteNome, EnqueteFooter } from "./style";

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

interface EnqueteItemProps {
  enquete: Enquete;
}

const EnqueteItem: React.FC<EnqueteItemProps> = ({
  enquete,
}: EnqueteItemProps) => (
  <Wrapper>
    <Link to={`/enquete/${enquete.id}`}>
      <EnqueteNome>{enquete.nome}</EnqueteNome>

      <EnqueteFooter>
        <span>{format(new Date(enquete.inicio), "H:mm - dd/MM/yy")}</span>
        <span>{format(new Date(enquete.termino), "H:mm - dd/MM/yy")}</span>
      </EnqueteFooter>
    </Link>
  </Wrapper>
);

export default EnqueteItem;
