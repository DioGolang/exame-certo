## Description


## Requirements

Settings

1. crie uma arquivo .env: 

```dotenv

DATABASE_URL=
POSTGRES_DB=fatos_saude
POSTGRES_USER=root
POSTGRES_PASSWORD=root
MONGODB_DATABASE=fatos_saude
MONGODB_USER=root
MONGODB_PASSWORD=root
RABBITMQ_DEFAULT_USER=
RABBITMQ_DEFAULT_PASS=
RABBITMQ_QUEUE=
NOTIFICATION_EMAIL_URL=
AUTHORIZATION_URL=
JWT_SECRET=
JWT_EXPIRES_IN=

```
2. crie as pastas na raiz:
- docker/postgres_data
- docker/mongodb_data


## Installation

Necessário ter Node e o docker instalado.

caso não tenha docker, é preciso ter localmente : PostgreSQL e MongoDB 

---

```bash

docker compose up

```

```bash

npm install

```

Running the app
---

```bash

npm run start:dev

```

## License

[MIT licensed](LICENSE).




