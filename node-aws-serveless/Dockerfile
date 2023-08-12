# Usar una imagen de Node.js 16 como base
FROM node:16-alpine

# Instalar AWS CLI
RUN apk update && apk add python3 py3-pip && pip3 install --upgrade awscli

# Instalar Serverless Framework
RUN npm install -g serverless

RUN npm install -g serverless-offline

# Crear un directorio de trabajo
WORKDIR /app

# Copiar el contenido de tu directorio local al contenedor en la carpeta /app
COPY ./project-serveless .

# Instalar las dependencias de tu proyecto
RUN npm install

# Configurar las credenciales de AWS
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG REDIS_HOST
ARG REDIS_PORT
ARG PRIVATE_KEY

ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
ENV PRIVATE_KEY=${PRIVATE_KEY}

RUN mkdir /root/.aws
RUN echo "[default]\naws_access_key_id=$AWS_ACCESS_KEY_ID\naws_secret_access_key=$AWS_SECRET_ACCESS_KEY\nregion=$AWS_DEFAULT_REGION" > /root/.aws/credentials

# Puerto opcional (para exponer algún servicio dentro del contenedor, si es necesario)
EXPOSE 3000

# Comando para iniciar el contenedor (mantenerlo ejecutando)
CMD ["npm", "run", "invoke:offline"]
