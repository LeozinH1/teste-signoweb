import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import api from "../../services/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Wrapper,
  EnqueteOpcao,
  OpcoesWrapper,
  OpcaoNome,
  EnqueteNome,
  EnqueteActions,
  EnqueteHeader,
  OpcaoVoto,
  InfoWrapper,
} from "./style";

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
  /*
   * Declare Variables
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [enquete, setEnquete] = useState<Enquete>();
  const { enquete_id } = useParams();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [countDown, setCountDown] = useState(0);
  /*
   * React Toastify
   */
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
  /*
   * Load Enquete Data
   */
  useEffect(() => {
    api
      .get(`/enquete/${enquete_id}`)
      .then((res: AxiosResponse) => {
        setEnquete(res.data);

        if (
          new Date(res.data.inicio) < new Date() &&
          new Date(res.data.termino) > new Date()
        ) {
          setBtnDisabled(false);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        navigate("/");
      });
  }, [navigate, enquete_id]);
  /*
   * Create Vote
   */
  const onSubmit = (data: any) => {
    api
      .post(`/enquete/${enquete_id}/${data.opcao}/vote`)
      .then((res: AxiosResponse) => {
        notify("Obrigado por votar!");
        setEnquete(res.data);
      })
      .catch((err: AxiosError) => {
        notifyError(
          "Ocorreu um erro ao enviar seu voto. Por favor, tente novamente."
        );
        console.log(err.response?.data);
      });
  };
  /*
   * Delete Enquete
   */
  const handleDelete = (enquete_id: number) => {
    if (confirmDelete) {
      api
        .delete(`/enquete/${enquete_id}`)
        .then((res: AxiosResponse) => {
          navigate("/");
        })
        .catch((err: AxiosError) => {
          setConfirmDelete(false);
          notifyError(
            "Ocorreu um erro ao apagar a enquete. Por favor, tente novamente."
          );
          console.log(err.response?.data);
        });
    } else {
      setConfirmDelete(true);

      setTimeout(() => {
        setConfirmDelete(false);
      }, 5000);

      let countTmp = 5;
      setCountDown(5);
      const deleteTimer = setInterval(() => {
        countTmp--;
        setCountDown(countTmp);
        if (countTmp < 1) {
          clearInterval(deleteTimer);
        }
      }, 1000);
    }
  };

  return (
    <>
      <ToastContainer />

      <Wrapper>
        <Link to="/">Voltar</Link>

        <EnqueteHeader>
          <EnqueteNome>{enquete?.nome}</EnqueteNome>

          <EnqueteActions>
            <Button onClick={() => handleDelete(Number(enquete_id))}>
              {confirmDelete ? `Confirmar (${countDown})` : "Apagar"}
            </Button>

            <Link to={`/edit/${enquete_id}`}>
              <Button>Editar</Button>
            </Link>
          </EnqueteActions>
        </EnqueteHeader>

        <InfoWrapper>
          <div>
            Inicio:{" "}
            <span>
              {enquete && format(new Date(enquete.inicio), "H:mm - dd/MM/yy")}
            </span>
          </div>

          <div>
            Termino:{" "}
            <span>
              {enquete && format(new Date(enquete.termino), "H:mm - dd/MM/yy")}
            </span>
          </div>

          <div>
            {enquete && new Date(enquete.inicio) > new Date() && "em breve"}

            {enquete && new Date(enquete.termino) < new Date() && "encerrada"}

            {enquete &&
              new Date(enquete.inicio) < new Date() &&
              new Date(enquete.termino) > new Date() &&
              "ativa"}
          </div>
        </InfoWrapper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <OpcoesWrapper>
            {enquete?.opcoes.map((opcao: Opcao) => (
              <EnqueteOpcao key={Number(opcao.id)}>
                <OpcaoNome>{opcao.nome}</OpcaoNome>
                <OpcaoVoto>
                  <span>{String(opcao.votos)} votos</span>

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
                    disabled={btnDisabled}
                  />
                </OpcaoVoto>
              </EnqueteOpcao>
            ))}
          </OpcoesWrapper>
          {errors.opcao && <label role="alert">{errors.opcao.message}</label>}

          <Button disabled={btnDisabled}>Votar</Button>
        </form>
      </Wrapper>
    </>
  );
};

export default PageEnquete;
