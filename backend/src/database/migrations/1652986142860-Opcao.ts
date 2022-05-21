import { MigrationInterface, QueryRunner, Table } from "typeorm";

class Opcao1652986142860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "opcao",

        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "enqueteId",
            type: "integer",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "votos",
            type: "integer",
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("opcao");
  }
}

export default Opcao1652986142860;
