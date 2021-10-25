FROM node:17.0.1

# Create app directory
WORKDIR src

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "nodemon", "--legacy-watch", "--require", "dotenv/config", "./src/pika-bot.js" ]
