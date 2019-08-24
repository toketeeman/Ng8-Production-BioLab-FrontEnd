FROM node as builderbase
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
     && apt-get install -y chromium
ENV CHROME_BIN=chromium

FROM builderbase as builder
WORKDIR /app
COPY . .
RUN npm i
ENV PATH=/app/node_modules/.bin:$PATH
RUN ng build

#TODO - try to get unit tests working headless in docker
# FROM builder as tester
# ENV CHROME_BIN=chromium
# RUN ng test --watch=false --browsers=ChromeHeadless

FROM nginx
COPY --from=builder /app/dist/protein-expression-front-end /usr/share/nginx/html
EXPOSE 80
