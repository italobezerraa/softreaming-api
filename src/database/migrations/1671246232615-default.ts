import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671246232615 implements MigrationInterface {
    name = 'default1671246232615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies_categories" ("movieId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_d2b9c9615fffbcf020b901b2006" PRIMARY KEY ("movieId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_db38ddfe4a9d0735a6625c3ad0" ON "movies_categories" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c206e8e9802341cd6cd0714228" ON "movies_categories" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "movies_categories" ADD CONSTRAINT "FK_db38ddfe4a9d0735a6625c3ad0d" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_categories" ADD CONSTRAINT "FK_c206e8e9802341cd6cd07142289" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_categories" DROP CONSTRAINT "FK_c206e8e9802341cd6cd07142289"`);
        await queryRunner.query(`ALTER TABLE "movies_categories" DROP CONSTRAINT "FK_db38ddfe4a9d0735a6625c3ad0d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c206e8e9802341cd6cd0714228"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db38ddfe4a9d0735a6625c3ad0"`);
        await queryRunner.query(`DROP TABLE "movies_categories"`);
    }

}
