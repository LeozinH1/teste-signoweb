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
import { Link, useParams, useNavigate } from "react-router-dom";
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <EnqueteNome>{enquete?.nome}</EnqueteNome>

          <EnqueteActions>
            <Button onClick={() => handleDelete(Number(enquete_id))}>
              {confirmDelete ? `Confirmar (${countDown})` : "Apagar"}
            </Button>

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
              <EnqueteOpcao key={Number(opcao.id)}>
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
