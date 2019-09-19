FROM node

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /app
COPY . .
ENV PATH /app/node_modules/.bin:$PATH
RUN npm i

RUN ng test --browsers ChromeHeadless --watch=false

EXPOSE 4200
CMD ng serve --host 0.0.0.0
