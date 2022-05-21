import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Wrapper, PageTitle, OpcaoItem } from "./style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import ButtonSecondary from "../../Components/ButtonSecondary";

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

const PageEdit: React.FC = () => {
  /*
   * Declare Variables
   */
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "enquete.opcoes",
  });

  const { enquete_id } = useParams();

  /*
   * Load Enquete Data
   */
  useEffect(() => {
    api
      .get(`/enquete/${enquete_id}`)
      .then((res: AxiosResponse) => {
        setValue("enquete.nome", res.data.nome);
        setValue("enquete.inicio", res.data.inicio.replace("Z", ""));
        setValue("enquete.termino", res.data.termino.replace("Z", ""));
        setValue("enquete.opcoes", res.data.opcoes);
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        navigate("/");
      });
  }, [navigate, enquete_id]);
  /*
   * Add Opção
   */
  const addOpcao = (e: any) => {
    e.preventDefault();

    if (fields.length < 20) {
      append({});
    }
  };
  /*
   * Remove Opção
   */
  const removeOpcao = (e: any, index: number) => {
    e.preventDefault();

    remove(index);
  };
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
   * Update Enquete
   */
  const onSubmit = (data: any) => {
    if (fields.length >= 3) {
      api
        .post(`/enquete/${enquete_id}/update`, {
          nome: data.enquete.nome,
          inicio: data.enquete.inicio,
          termino: data.enquete.termino,
          opcoes: data.enquete.opcoes,
        })
        .then((res: AxiosResponse) => {
          notify("Enquete atualizada com sucesso");
        })
        .catch((err: AxiosError) => {
          console.log(err);
          notifyError("Ocorreu um erro ao atualizar a enquete.");
        });
    } else {
      notifyError(
        "Você precisa adicionar no minimo 3 opções para esta enquete."
      );
    }
  };

  return (
    <>
      <ToastContainer />

      <Wrapper>
        <Link to="/">Voltar</Link>

        <PageTitle>Editar Enquete</PageTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nome</label>
            <Input
              type="text"
              {...register("enquete.nome", {
                required: {
                  value: true,
                  message: "Este campo é obrigatório.",
                },
              })}
              hasError={errors.enquete && errors.enquete.nome}
            />

            {errors.enquete && errors.enquete.nome && (
              <label role="alert">{errors.enquete.nome.message}</label>
            )}
          </div>

          <div>
            <label>Inicio</label>
            <Input
              type="datetime-local"
              {...register("enquete.inicio", {
                required: {
                  value: true,
                  message: "Este campo é obrigatório.",
                },
              })}
              hasError={errors.enquete && errors.enquete.inicio}
            />
            {errors.enquete && errors.enquete.inicio && (
              <label role="alert">{errors.enquete.inicio.message}</label>
            )}
          </div>

          <div>
            <label>Terminio</label>
            <Input
              type="datetime-local"
              {...register("enquete.termino", {
                required: {
                  value: true,
                  message: "Este campo é obrigatório.",
                },
              })}
              hasError={errors.enquete && errors.enquete.termino}
            />
            {errors.enquete && errors.enquete.termino && (
              <label role="alert">{errors.enquete.termino.message}</label>
            )}
          </div>

          <div>
            <ButtonSecondary
              onClick={(e) => addOpcao(e)}
              disabled={fields.length >= 20 ? true : false}
            >
              Adicionar Opção ({fields.length}/20)
            </ButtonSecondary>
            {fields.map((field, index) => (
              <>
                <OpcaoItem key={field.id}>
                  <Input
                    type="text"
                    {...register(`enquete.opcoes.${index}.nome`, {
                      required: true,
                    })}
                  />

                  <ButtonSecondary onClick={(e) => removeOpcao(e, index)}>
                    X
                  </ButtonSecondary>
                </OpcaoItem>
              </>
            ))}
          </div>

          <Button>Salvar</Button>
        </form>
      </Wrapper>
    </>
  );
};

export default PageEdit;
