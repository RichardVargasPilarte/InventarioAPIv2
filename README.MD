# Sistema de Inventario - API

Esta API es un sistema de inventario construido con Node.js, Prisma ORM y PostgreSQL, que utiliza `docker-compose` para la configuración y creación de contenedores. Proporciona un conjunto de endpoints para la gestión de artículos, categorías, usuarios.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Tecnologías Utilizadas](#tecnolog%C3%ADas-utilizadas)
- [Instalación](#instalaci%C3%B3n)
- [Configuración](#configuraci%C3%B3n)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos de Datos](#modelos-de-datos)
- [Endpoints](#endpoints)

---

## Requisitos Previos

Antes de iniciar, asegúrate de tener instalados los siguientes requisitos en tu máquina:

- [Node.js](https://nodejs.org/) (v22 o superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Un editor de código como [Visual Studio Code](https://code.visualstudio.com/)

---

## Tecnologías Utilizadas

- **Node.js**: Framework principal para el desarrollo de la API.
- **Prisma ORM**: Gestión de la base de datos y consultas ORM.
- **PostgreSQL**: Base de datos relacional para almacenar los datos del sistema.
- **Docker Compose**: Declaración de servicios para PostgreSQL y la API.

---

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/RichardVargasPilarte/InventarioAPIv2
   
   cd InventarioAPIv2
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:** Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```env
   PORT=3000

   POSTGRES_HOST=127.0.0.1
   POSTGRES_PORT=5498
   POSTGRES_USER=userPosgreSQL
   POSTGRES_PASSWORD=userPassword
   POSTGRES_DB=DB_Name

   DATABASE_URL="postgresql://userPosgreSQL:userPassword@127.0.0.1:5498/DB_Name?schema=public"

   JWT_SECRET=firma de tokens
   JWT_EXPIRES_IN=12h tiempo de valides de los tokens
   ```

4. **Levanta los contenedores con Docker Compose:**

   ```bash
   docker-compose up -d
   ```

5. **Realiza las migraciones en la base de datos:**

   ```bash
   npx prisma migrate dev
   ```

6. **Inicia el servidor:**

   ```bash
   npm run dev
   ```

---

## Configuración

El proyecto utiliza `docker-compose.yml` para configurar y levantar los servicios necesarios. Un ejemplo básico del archivo:

```yaml
version: '3.8'
services:
  db:
    image: postgres:14
    container_name: postgres_inventario
    restart: always
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    env_file:
      - ./.env

volumes:
  postgres_data:
    driver: local
```

---

## Uso

La API expone varios endpoints para manejar las operaciones CRUD del sistema de inventario. Algunos ejemplos incluyen:

- **Artículos**:
  - `GET /api/articulo`: Listar todos los artículos.
  - `POST /api/articulo`: Crear un nuevo artículo.
- **Categorías**:
  - `GET /api/categoria`: Listar todas las categorías.
  - `POST /api/categoria`: Crear una nueva categoría.

Consulta la [documentación de endpoints](#endpoints) para más detalles.

---

## Estructura del Proyecto

La estructura básica del proyecto es la siguiente:

```plaintext
sistema-inventario-api/
├── prisma/
│   ├── schema.prisma       # Definición del esquema de la base de datos
├── src/
│   ├── Controllers/        # Lógica de controladores
│   ├── Middlewares/        # Validaciones y autorizaciones
│   ├── Routes/             # Definición de rutas
│   ├── Helpers/            # Funciones de utilidad
│   ├── index.js              # Configuración principal del servidor
├── .env                    # Variables de entorno
├── docker-compose.yml      # Configuración de servicios con Docker Compose
├── README.md               # Documentación
```

---

## Modelos de Datos

El esquema de Prisma para los modelos del sistema incluye:

```prisma
model Articulo {
  id           String   @id @default(uuid()) 
  categoria_id String
  categoria    Categoria @relation(fields: [categoria_id], references: [id])
  codigo       String?   @db.VarChar(64)
  nombre       String    @unique @db.VarChar(50)
  descripcion  String?   @db.VarChar(255)
  precio_venta Float
  stock        Int
  estado       Int       @default(1)
  createdAt    DateTime  @default(now())
  eliminado    String    @default("NO")

  @@map("articulo")
}

model Categoria {
  id          String   @id @default(uuid())
  nombre      String   @unique @db.VarChar(50)
  descripcion String?  @db.VarChar(255)
  estado      Int      @default(1)
  createdAt   DateTime @default(now())
  eliminado   String    @default("NO")

  @@map("categoria")
  articulos   Articulo[] // Relación inversa con Articulo
}

model Usuario {
  id              String   @id @default(uuid()) 
  rol             String   @db.VarChar(30)
  nombre          String   @db.VarChar(50)
  username        String   @unique @db.VarChar(30)
  tipo_documento  String?  @db.VarChar(20)
  num_documento   String?  @db.VarChar(20)
  direccion       String?  @db.VarChar(70)
  telefono        String   @unique @db.VarChar(20)
  email           String   @unique @db.VarChar(50)
  password        String   @db.VarChar(64)
  estado          Int      @default(1)
  createdAt       DateTime @default(now())
  eliminado       String   @default("NO")

  @@map("usuario")
}
```
---