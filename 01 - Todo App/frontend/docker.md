# Docker commands

```bash
docker build . --tag=todo-frontend
docker run -it todo-frontend bash # cant use in alpine

docker run -p 3001:3000 todo-frontend 
docker run -p 3001:3000 -d todo-frontend 
docker run -p 3000:3000 -d --name frontend todo-frontend

docker ps
docker images

docker ps | grep -i "node"

docker stop [id container | container name]
```

