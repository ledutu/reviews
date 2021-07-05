FROM node:14-alpine
RUN mkdir -p /usr/src/frontend-web
WORKDIR /usr/src/frontend-web
COPY . /usr/src/frontend-web
EXPOSE 3000
CMD [ "npm", "run", "dev" ]