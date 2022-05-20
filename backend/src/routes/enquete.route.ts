import { Router } from "express";
import { getRepository } from "typeorm";
import Enquete from "../models/Enquete";
import Opcao from "../models/Opcao";
import CreateEnqueteService from "../services/createEnquete.service";
import CreateOpcaoService from "../services/createOpcao.service";

const enqueteRouter = Router();

// Create Enquete

enqueteRouter.post("/", async (request, response) => {
  const { nome, inicio, termino, opcoes } = request.body;

  if (opcoes.length < 3) {
    return response.status(500).json({
      status: "error",
      message: "Você precisa inserir no minimo 3 opções para esta alternativa.",
    });
  }

  // Create Enquete
  const createEnqueteService = new CreateEnqueteService();
  const createEnquete = await createEnqueteService.execute({
    nome,
    inicio,
    termino,
  });

  // Create Opcoes
  const createOpcaoService = new CreateOpcaoService();
  opcoes.map(async (opcao: any) => {
    await createOpcaoService.execute({
      enqueteId: createEnquete.id,
      nome: opcao.nome,
    });
  });

  return response.status(201).json(createEnquete);
});

// Create Opção

enqueteRouter.post("/:enqueteId/opcao", async (request, response) => {
  const { nome } = request.body;
  const { enqueteId } = request.params;

  const createOpcaoService = new CreateOpcaoService();

  const createOpcao = await createOpcaoService.execute({
    enqueteId: Number(enqueteId),
    nome,
  });

  return response.status(201).json(createOpcao);
});

// Get Enquetes

enqueteRouter.get("/", async (request, response) => {
  const enqueteRepository = getRepository(Enquete);

  const enquetes = await enqueteRepository.find();

  return response.status(200).json(enquetes);
});

// Get Enquete

enqueteRouter.get("/:enquete_id", async (request, response) => {
  const { enquete_id } = request.params;
  const enqueteRepository = getRepository(Enquete);

  const enquete = await enqueteRepository.findOne(enquete_id);

  if (!enquete) {
    return response.status(404).json({
      status: "error",
      message: "Não foi possivel localizar esta enquete.",
    });
  }

  return response.status(200).json(enquete);
});

// Create Vote

enqueteRouter.post("/:enquete_id/:opcao_id/vote", async (request, response) => {
  const enqueteRepository = getRepository(Enquete);
  const opcaoRepository = getRepository(Opcao);
  const { enquete_id, opcao_id } = request.params;

  const enquete = await enqueteRepository.findOne(enquete_id);
  if (!enquete) {
    return response.status(404).json({
      status: "error",
      message: "Não foi possivel localizar esta enquete.",
    });
  }

  const opcao = await opcaoRepository.findOne(opcao_id);
  if (!opcao) {
    return response.status(404).json({
      status: "error",
      message: "Não foi possivel localizar esta opção.",
    });
  }

  await opcaoRepository.increment(opcao, "votos", 1);

  return response.status(200).json({});
});

// Delete Enquete

enqueteRouter.delete("/:enquete_id", async (request, response) => {
  const enqueteRepository = getRepository(Enquete);

  const { enquete_id } = request.params;

  const enquete = await enqueteRepository.findOne(enquete_id);
  if (!enquete) {
    return response.status(404).json({
      status: "error",
      message: "Não foi possivel localizar esta enquete.",
    });
  }

  await enqueteRepository.remove(enquete);

  return response.status(200).json({});
});

export default enqueteRouter;
