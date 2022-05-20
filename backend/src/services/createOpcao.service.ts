import { getRepository } from "typeorm";
import Opcao from "../models/Opcao";
import Enquete from "../models/Enquete";

interface Request {
  enqueteId: Number;
  nome: String;
}

class CreateOpcaoService {
  public async execute({ enqueteId, nome }: Request): Promise<Opcao | void> {
    const opcaoRepository = getRepository(Opcao);
    const enqueteRepository = getRepository(Enquete);

    const enqueteExists = await enqueteRepository.findOne(Number(enqueteId));

    if (!enqueteExists) {
      return;
    }

    const opcao = await opcaoRepository.save({
      enqueteId,
      nome,
    });

    return opcao;
  }
}

export default CreateOpcaoService;
