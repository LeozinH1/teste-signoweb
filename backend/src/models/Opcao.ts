import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Enquete from "./Enquete";

@Entity("opcao")
class Opcao {
  @PrimaryGeneratedColumn("increment")
  id: Number;

  @Column()
  enqueteId: Number;

  @Column()
  nome: String;

  @Column()
  votos: Number;

  @ManyToOne(() => Enquete, (enquete) => enquete.opcoes, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  enquete: Enquete;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Opcao;
