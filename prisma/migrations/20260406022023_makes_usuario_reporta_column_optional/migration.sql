-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_id_usuario_reporta_fkey";

-- AlterTable
ALTER TABLE "ticket" ALTER COLUMN "id_usuario_reporta" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_usuario_reporta_fkey" FOREIGN KEY ("id_usuario_reporta") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
