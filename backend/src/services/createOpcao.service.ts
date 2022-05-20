import { getRepository } from "typeorm";
import Opcao from "../models/Opcao";
import Enquete from "../models/Enquete";
import AppError from "../errors/AppError";

interface Request {
  enqueteId: Number;
  nome: String;
}

class CreateOpcaoService {
  public async execute({ enqueteId, nome }: Request): Promise<Opcao> {
    const opcaoRepository = getRepository(Opcao);
    const enqueteRepository = getRepository(Enquete);

    const enqueteExists = await enqueteRepository.findOne(Number(enqueteId));

    if (!enqueteExists)
      throw new AppError("Não foi possivel localizar a enquete.");

    const opcao = await opcaoRepository.save({
      enqueteId,
      nome,
    });

    return opcao;
  }
}

export default CreateOpcaoService;
