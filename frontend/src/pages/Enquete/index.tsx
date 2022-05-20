import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import api from "../../services/api";
import {
  Wrapper,
  EnqueteOpcao,
  OpcoesWrapper,
  OpcaoNome,
  OpcaoVotos,
  EnqueteNome,
  EnqueteInfo,
  EnqueteActions,
} from "./style";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const PageEnquete: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notify = (message: string) => {
    toast(message, {
      position: "top-center",
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-center",
    });
  };

  const [enquete, setEnquete] = useState<Enquete>();
  const { enquete_id } = useParams();
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    api.get(`/enquete/${enquete_id}`).then((res: AxiosResponse) => {
      setEnquete(res.data);

      if (
        new Date(res.data.inicio) < new Date() &&
        new Date(res.data.termino) > new Date()
      ) {
        setBtnDisabled(false);
      }
    });
  });

  const onSubmit = (data: any) => {
    api
      .post(`/enquete/${enquete_id}/${data.opcao}/vote`)
      .then((res: AxiosResponse) => {
        notify("Obrigado por votar!");
      })
      .catch((err: AxiosError) => {
        notifyError(
          "Ocorreu um erro ao enviar seu voto. Por favor, tente novamente."
        );
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />

      <Wrapper>
        <Link to="/">Voltar</Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <EnqueteNome>{enquete?.nome}</EnqueteNome>

          <EnqueteActions>
            <Button>Apagar</Button>
            <Button>Editar</Button>
          </EnqueteActions>
        </div>

        <div>
          <EnqueteInfo>
            Inicio{" "}
            <span>
              {enquete && format(new Date(enquete.inicio), "H:mm - dd/MM/yy")}
            </span>
          </EnqueteInfo>

          <EnqueteInfo>
            Termino{" "}
            <span>
              {enquete && format(new Date(enquete.termino), "H:mm - dd/MM/yy")}
            </span>
          </EnqueteInfo>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <OpcoesWrapper>
            {enquete?.opcoes.map((opcao: Opcao) => (
              <>
                <EnqueteOpcao>
                  <OpcaoNome>{opcao.nome}</OpcaoNome>
                  <OpcaoVotos>{String(opcao.votos)} votos</OpcaoVotos>

                  <input
                    type="radio"
                    {...register("opcao", {
                      required: {
                        value: true,
                        message: "Por favor, escolha uma das alternativas.",
                      },
                    })}
                    value={String(opcao.id)}
                    id={String(opcao.id)}
                  />
                </EnqueteOpcao>
              </>
            ))}
          </OpcoesWrapper>
          {errors.opcao && <label role="alert">{errors.opcao.message}</label>}
          <br />
          <Button disabled={btnDisabled}>Votar</Button>
        </form>
      </Wrapper>
    </>
  );
};

export default PageEnquete;
