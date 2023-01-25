FROM node:16-alpine

WORKDIR /app

# Copy and download dependencies
COPY package.json npm-shrinkwrap.json ./
RUN npm install

# Copy the source files into the image
COPY . .

EXPOSE 3000

CMD npm run start

