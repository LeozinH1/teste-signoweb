import { getRepository } from "typeorm";
import Enquete from "../models/Enquete";

interface Request {
  nome: String;
  inicio: Date;
  termino: Date;
}

class CreateEnqueteService {
  public async execute({ nome, inicio, termino }: Request): Promise<Enquete> {
    const enqueteRepository = getRepository(Enquete);

    const enquete = await enqueteRepository.save({
      nome,
      inicio,
      termino,
    });

    return enquete;
  }
}

export default CreateEnqueteService;
