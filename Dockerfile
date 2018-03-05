FROM node:9.5.0

LABEL maintainer="QuynhHP <hophuongquynh92@gmail.com>"

RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
RUN npm install --verbose
ENV NODE_PATH=/app/node_modules

COPY . /app/

#CMD node /app/bin/www
