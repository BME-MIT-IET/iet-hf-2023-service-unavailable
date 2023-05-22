FROM node:19

# Mappa kiválasztása
WORKDIR /usr/src/app

# Alkalamzás függőségek (package.json + package.lock.json)
COPY package*.json ./

# Függőségek telepítése
RUN npm install

# Forrásfájlok átmásolása
COPY . .

# Port megadása
EXPOSE 3000

# Szerver indítása
CMD npm run start