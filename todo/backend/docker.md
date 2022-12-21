# Docker commands

```bash
docker build . --tag=todo-backend
docker run -d --name todo-backend todo-backend
docker compose -it todo-backend bash

docker rm ad2a4cd5d4592f2b2161a2841a8888379e0e3eebfbce87e17ebf9ff27e7212d5
docker rm todo-backend

docker logs todo-backend

docker compose up 
docker compose up -d postgres
docker compose logs postgres
docker compose down
docker compose exec postgres sh
# psql -U postgres
## \d
## \q
# exit
docker compose down -v # REMOVE VOLUMES

```