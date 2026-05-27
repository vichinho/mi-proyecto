# Mi Proyecto DevOps con Docker Compose

Aplicación simple en Node.js + Express conectada a PostgreSQL usando Docker Compose.

## Requisitos

- Docker
- Docker Compose

## Estructura del proyecto

```bash
mi-proyecto/
├─ app/
│  ├─ Dockerfile
│  ├─ package.json
│  └─ index.js
├─ docker-compose.yml
├─ .env
└─ README.md
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
POSTGRES_USER=devuser
POSTGRES_PASSWORD=devpass
POSTGRES_DB=devdb
APP_PORT=3000
```

## Levantar el proyecto

Desde la raíz del proyecto ejecuta:

```bash
docker compose up --build
```

Si tu instalación usa la sintaxis antigua:

```bash
docker-compose up --build
```

## Acceso

Abre en el navegador:

```bash
http://localhost:3000
```

Si todo está bien, la aplicación mostrará un mensaje confirmando la conexión a PostgreSQL.

## Comandos útiles

Levantar en segundo plano:

```bash
docker compose up -d
```

Ver logs:

```bash
docker compose logs -f
```

Detener servicios:

```bash
docker compose down
```

Detener y borrar volúmenes:

```bash
docker compose down -v
```

## Qué aprende este proyecto

- Crear una imagen con `Dockerfile`.
- Levantar varios servicios con `docker compose`.
- Usar variables de entorno con `.env`.
- Conectar una app con una base de datos en red interna.
- Persistir datos con volúmenes.

## Notas técnicas

- El servicio `app` se conecta a PostgreSQL usando el nombre del servicio `db` como host.
- PostgreSQL guarda sus datos en un volumen para evitar pérdida de información.
- `depends_on` ayuda a ordenar el inicio de servicios, aunque no garantiza que la base de datos esté lista al 100% antes de que arranque la app.

## Próximos pasos

- Agregar healthchecks.
- Separar ambientes de desarrollo y producción.
- Crear un pipeline de CI/CD con GitHub Actions.
- Agregar pruebas automáticas.