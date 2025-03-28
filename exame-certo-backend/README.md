## Description


## Requirements

Settings

1. crie uma arquivo .env: 

```dotenv

# Banco de dados PostgreSQL
POSTGRES_DB=your_database
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password

# MongoDB
MONGODB_URI=your_mongodb_uri
MONGODB_DATABASE=your_database
MONGODB_USER=your_user
MONGODB_PASSWORD=your_password
MONGODB_ROOT_PASSWORD=your_secret

# RabbitMQ
RABBITMQ_HOST=localhost
RABBITMQ_URI=amqp://your_user:your_password@localhost:5672
RABBITMQ_DEFAULT_USER=your_user
RABBITMQ_DEFAULT_PASS=your_password
RABBITMQ_PORT=5672
RABBITMQ_QUEUE=notifications_queue

#REDIS
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600


```
2. crie as pastas na raiz:
- .docker/postgres_data
- .docker/rabbitmq_data
- .docker/mongodb_data
- .docker/redis_data

Conceda as permissões nas pastas antes de prosseguir(Linux):  
```bash

sudo chmod -R 775 ./.docker/postgres_data; sudo chmod -R 775 ./.docker/rabbitmq_data; sudo chmod -R 775 ./.docker/mongodb_data; sudo chmod -R 775 ./.docker/redis_data; sudo chown -R 1001:1001 ./.docker/postgres_data; sudo chown -R 1001:1001 ./.docker/rabbitmq_data; sudo chown -R 1001:1001 ./.docker/mongodb_data; sudo chown -R 1001:1001 ./.docker/redis_data


```

## Installation

Necessário ter Node.js e o docker instalado.

caso não tenha docker, é preciso ter localmente : PostgreSQL, MongoDB, Redis e RabbitMQ.

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




