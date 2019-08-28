echo "Digite o nome da Versão: "
read VERSION
docker build -t docker.io/devmarcelo/cloud-assistent:$VERSION . --no-cache
docker push docker.io/devmarcelo/cloud-assistent:$VERSION