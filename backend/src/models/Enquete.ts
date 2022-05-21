import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import Opcao from "./Opcao";

@Entity("enquete")
class Enquete {
  @PrimaryGeneratedColumn("increment")
  id: Number;

  @Column()
  nome: String;

  @Column()
  inicio: Date;

  @Column()
  termino: Date;

  @OneToMany(() => Opcao, (opcao) => opcao.enquete)
  opcoes: Opcao[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Enquete;
