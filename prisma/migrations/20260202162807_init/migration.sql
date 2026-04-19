-- CreateEnum
CREATE TYPE "Modulo" AS ENUM ('FRONTEND', 'BACKEND', 'API', 'MOBILE', 'BASE_DE_DATOS');

-- CreateEnum
CREATE TYPE "Prioridad" AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'CRITICA');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('PENDIENTE', 'EN_REVISION', 'EN_CORRECCION', 'REABIERTO', 'CERRADO');

-- CreateTable
CREATE TABLE "rol" (
    "id" SERIAL NOT NULL,
    "nombreRol" TEXT NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyecto" (
    "id" SERIAL NOT NULL,
    "nombre_proyecto" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "pasos_reproducir" TEXT NOT NULL,
    "modulo" "Modulo" NOT NULL,
    "prioridad" "Prioridad" NOT NULL DEFAULT 'BAJA',
    "estado" "Estado" NOT NULL DEFAULT 'PENDIENTE',
    "severidad_ia" TEXT,
    "id_proyecto" INTEGER NOT NULL,
    "id_usuario_reporta" INTEGER NOT NULL,
    "id_usuario_asignado" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_ticket" (
    "id" SERIAL NOT NULL,
    "id_ticket" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "estado_nuevo" TEXT NOT NULL,
    "fecha_cambio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historial_ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_usuario_reporta_fkey" FOREIGN KEY ("id_usuario_reporta") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_usuario_asignado_fkey" FOREIGN KEY ("id_usuario_asignado") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_ticket" ADD CONSTRAINT "historial_ticket_id_ticket_fkey" FOREIGN KEY ("id_ticket") REFERENCES "ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_ticket" ADD CONSTRAINT "historial_ticket_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
