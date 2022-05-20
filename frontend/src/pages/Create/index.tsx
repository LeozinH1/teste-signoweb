import React from "react";
import api from "../../services/api";
import { Wrapper, PageTitle } from "./style";
import { Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const PageCreate: React.FC = () => {
  /*
   * Declare Variables
   */
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "enquete.opcoes",
  });
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
   * Create Enquete
   */
  const onSubmit = (data: any) => {
    if (fields.length >= 3) {
      api
        .post("/enquete", {
          nome: data.enquete.nome,
          inicio: data.enquete.inicio,
          termino: data.enquete.termino,
          opcoes: data.enquete.opcoes,
        })
        .then((res: AxiosResponse) => {
          notify("Enquete criada com sucesso");
        })
        .catch((err: AxiosError) => {
          console.log(err);
          notifyError("Ocorreu um erro ao criar a enquete.");
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

        <PageTitle>Criar Enquete</PageTitle>

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
              type="date"
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
              type="date"
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
            <div>({fields.length}/20)</div>
            <Button
              onClick={(e) => addOpcao(e)}
              disabled={fields.length >= 20 ? true : false}
            >
              Adicionar Opção
            </Button>
            {fields.map((field, index) => (
              <>
                <div key={field.id}>
                  <Input
                    type="text"
                    {...register(`enquete.opcoes.${index}.nome`, {
                      required: true,
                    })}
                  />

                  <Button onClick={(e) => removeOpcao(e, index)}>X</Button>
                </div>
              </>
            ))}
          </div>

          <Button>Criar</Button>
        </form>
      </Wrapper>
    </>
  );
};

export default PageCreate;
