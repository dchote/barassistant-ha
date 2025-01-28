#
# docker build -t barassistant-ha:dev --build-arg API_URL=SITE_URL/bar/api --build-arg API_TOKEN=  --build-arg BAR_ID=1 --build-arg COLLECTION_ID=1 .
# docker run  -p 8080:8080 -it barassistant-ha:dev
#
FROM node:current-alpine3.20 AS build

ARG API_URL
ARG API_TOKEN
ARG BAR_ID=1
ARG COLLECTION_ID=1

WORKDIR /app
COPY package*.json .
COPY . .

RUN echo -e "\
VITE_API_URL=$API_URL \n\
VITE_API_TOKEN=$API_TOKEN \n\
VITE_BAR_ID=$BAR_ID \n\
VITE_COLLECTION_ID=$COLLECTION_ID \
" > .env

RUN yarn install
RUN yarn build


FROM nginx AS prod

COPY --from=build /app/dist /var/www/html

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint

RUN chmod +x /usr/local/bin/entrypoint

EXPOSE 8081

CMD [ "entrypoint" ]