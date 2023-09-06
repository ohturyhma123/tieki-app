## Instructions on how to install docker on Linux

You can find instructions on how to install docker on wsl2 here: https://dev.solita.fi/2021/12/21/docker-on-wsl2-without-docker-desktop.html

1. Install pre-required packages
```bash
sudo apt update
```
```bash
sudo apt install --no-install-recommends apt-transport-https ca-certificates curl gnupg2
```

2. Configure package repository
```bash
source /etc/os-release
```
```bash
curl -fsSL https://download.docker.com/linux/${ID}/gpg | sudo apt-key add -
```
```bash
echo "deb [arch=amd64] https://download.docker.com/linux/${ID} ${VERSION_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/docker.list
```
```bash
sudo apt update
```

3. Install Docker
```bash
sudo apt install docker-ce docker-ce-cli containerd.io
```

4. Add user to group
```bash
sudo usermod -aG docker $USER
```

5. Configure dockerd
```bash
DOCKER_DIR=/var/run
```
```bash
mkdir -pm o=,ug=rwx "$DOCKER_DIR"
```
```bash
sudo chgrp docker "$DOCKER_DIR"
```
```bash
sudo mkdir /etc/docker
```
```bash
sudo <your_text_editor> /etc/docker/daemon.json
```
You can use e.g. nano for editing daemon.json
```bash
{
   "hosts": ["unix:///var/run/docker.sock"]
}
```

6. Now you’re ready to launch dockerd and see if it works
- Run command
```bash
sudo dockerd
```
If the command ends with “API listen on /var/run/docker.sock”, docker works.
You can perform an additional test by opening a new terminal an running
```bash
docker -H unix:///var/run/docker.sock run --rm hello-world
```