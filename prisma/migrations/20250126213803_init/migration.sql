-- CreateTable
CREATE TABLE "articulo" (
    "id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "codigo" VARCHAR(64),
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(255),
    "precio_venta" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" TEXT NOT NULL DEFAULT 'NO',

    CONSTRAINT "articulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(255),
    "estado" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" TEXT NOT NULL DEFAULT 'NO',

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "rol" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "tipo_documento" VARCHAR(20),
    "num_documento" VARCHAR(20),
    "direccion" VARCHAR(70),
    "telefono" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" TEXT NOT NULL DEFAULT 'NO',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articulo_nombre_key" ON "articulo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nombre_key" ON "categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_telefono_key" ON "usuario"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "articulo" ADD CONSTRAINT "articulo_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
