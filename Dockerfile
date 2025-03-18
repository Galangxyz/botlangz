# Gunakan image Node.js
FROM node:18-alpine

# Set direktori kerja dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy semua file ke dalam container
COPY . .

# Expose port Railway
EXPOSE 3000

# Gunakan environment variable dari Railway
ENV PORT=3000

# Jalankan server saat container dimulai
CMD ["node", "server.js"]
