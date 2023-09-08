## How to start docker compose

1. Make sure you have docker and docker compose plugin. [install plugin](https://docs.docker.com/compose/install/linux/)

2. Go to the project root and to build and start the containers, run the following command
```bash
docker compose up
```
This command will build the Docker image using the Dockerfile and then start the containerized app.


3. Once the containers are up and running, you can access the app in your web browser at http://172.20.0.2:5173/

4. To stop the containers, press Ctrl+C in the terminal where docker-compose up is running, and then run the following command to remove the containers
```bash
docker compose down
```
