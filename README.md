# Pasos para ejecutar el proyecto

Requisitos previos:

TENER INSTALADO O INSTALAR Postgres y Docker

En postgres crear la base de datos, nombre (dvp_db) o nombre de su preferencia, editar el archivo .env con las conexiones a su propia base de datos:
DB_NAME=dvp_db
DB_USER=postgres
DB_PASS=1996
DB_PORT=5432

En la base de datos crear las siguientes dos tablas:

1.  CREATE TABLE IF NOT EXISTS public."user"
    (
    id_user integer NOT NULL DEFAULT nextval('users_id_user_seq'::regclass),
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id_user)
    )

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
OWNER to postgres;

2.  CREATE TABLE IF NOT EXISTS public.debt
    (
    id_debt integer NOT NULL DEFAULT nextval('debt_id_dbt_seq'::regclass),
    amount integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    paid_at timestamp without time zone,
    user_id integer NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES public."user" (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
    )

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.debt
OWNER to postgres;

3. Desde una terminal cualquiera ejecuta este comando `docker run -d -p 6379:6379 --name redis-cache redis` para levantar redis.

4. Clonar el repositorio.

5. Dentro del proyecto en la carpeta de client-dvp ejecutar el comando `npm i` para instalar las dependencias. Ejecutar el mismo comando dentro de la carpeta de server-dvp.

6. En la carpeta de client-dvp ejecutar el comando `npm run build` para compilar el proyecto. Ejecutar el mismo comando dentro de la carpeta de server-dvp.

7. En la carpeta de server-dvp ejecutar el comando `npm start` para iniciar el servidor en modo producción. En la carpeta de client-dvp ejecutar el comando `npm run preview` para iniciar el cliente en modo producción.

# Estructura del proyecto

ESTRUCTURA DEL SERVIDOR

src/
├── app.ts
├── server.ts
│
├── config/
│ ├── database.ts # Configuración Sequelize
│ ├── env.ts # Variables de entorno
│ └── redis.ts # Cliente Redis
│
├── database/
│ ├── associations.ts # Relaciones entre modelos
│ └── index.ts # Inicialización DB
│
├── graphql/
│ ├── schema.ts # Schema raíz (merge typeDefs)
│ └── resolver.ts # Resolver raíz (merge resolvers)
│
├── modules/
│ ├── user/
│ │ ├── user.model.ts
│ │ ├── user.service.ts
│ │ ├── user.resolver.ts
│ │ └── user.typeDefs.ts
│ │
│ └── debt/
│ ├── debt.model.ts
│ ├── debt.service.ts
│ ├── debt.resolver.ts
│ └── debt.typeDefs.ts
│
├── shared/
│ ├── errors/
│ │ └── graphql-errors.ts. # Control de errores de GraphQL
│ │
│ └── utils/
│ └── requireAuth.ts. # Controla la sesión del usuario

ESTRUCTURA DEL CLIENTE

src/
├── Router.tsx
├── RootRedirect.tsx
├── App.tsx
│
├── test/
│ ├── handlers.ts # Mock de peticiones graphql
│ ├── renderWithProvider.tsx # Provider para los test
│ └── server.ts # Servidor para los test con vitest
│ └── setup.ts # Inicialización del servidor de los test con vitest
│
├── shared/
│ ├── components # Componentes globales
│ └── constants # Archivo de constante para las rutas
│ └── layouts # Layouts globales
│ └── types # Interfaces de los componentes
│ └── utils # Funciones globales
│
├── modules/
│ ├── debts # Módulo de deudas
│ └── login # Módulo para iniciar sesión
│ └── register # Módulo para registrarse
│
├── hooks/
│ ├── auth # Hook personalizado para la autenticación
│ └── debt # Hook personalizado para las deudas
│ ├── login # Hooks personalizado para el inicio de sesión
│ ├── register # Hook personalizado para el registro de usuarios
│
├── graphql/
│ ├── mutations # Mutaciones de graphql
│ └── resolvers # Querys de graphql
|
├── context/
│ ├── AuthContext # Hook para la sesión del usuario
│ └── AuthProvider # Hook para la sesión del usuario
|
├── apollo/
│ ├── cache # Configuración de la cache de apollo para las querys
│ └── client # Configuración del cliente de apollo
