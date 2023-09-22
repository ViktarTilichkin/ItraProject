FROM node:18.17.0-alpine
WORKDIR /app
COPY  . .
RUN npm install -g npmrc
RUN npmrc -c false
RUN npm config set registry https://registry.npmjs.org/
RUN npm i
RUN npm run build
CMD ["npm", "start"]