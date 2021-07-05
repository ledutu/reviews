FROM node:14-alpine
RUN mkdir -p /usr/src/backend-api
WORKDIR /usr/src/backend-api
COPY . /usr/src/backend-api
EXPOSE 4000
CMD [ "npm", "run", "dev" ]