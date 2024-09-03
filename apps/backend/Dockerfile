FROM node:20-alpine

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./prisma ./prisma

RUN npm install --omit=dev

RUN npm run prisma:generate

RUN npm run build



EXPOSE 3000

CMD ["npm", "start"]