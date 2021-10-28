FROM node:14.9.0-alpine as frontend

WORKDIR /frontend

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./frontend .

RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=frontend /frontend/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]