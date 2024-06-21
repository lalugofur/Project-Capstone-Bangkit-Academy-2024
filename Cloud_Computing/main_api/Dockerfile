# Gunakan base image node versi 18
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json untuk menginstall dependencies
COPY package*.json ./

# Install dependencies menggunakan npm
RUN npm install

# Copy seluruh source code ke dalam container
COPY . .

# Set environment variables yang diperlukan
ENV PORT=3000
ENV BUCKET_NAME=pawpal
ENV SERVICE_ACCOUNT_KEY=iam.json
ENV PROJECT_ID=capstone-pawpal88
ENV DATABASE_URL=https://cat-breed-a70db-default-rtdb.asia-southeast1.firebasedatabase.app
ENV FIREBASE_SERVICE_ACCOUNT_KEY=key.json
ENV ML_API_URL=http://127.0.0.1:3000/classify
ENV FIREBASE_API_KEY=AIzaSyAPNSSma03HNFSjey_FeSLep7bFeB-ci4g

# Command untuk menjalankan aplikasi (server.js)
CMD ["node", "./src/server.js"]
