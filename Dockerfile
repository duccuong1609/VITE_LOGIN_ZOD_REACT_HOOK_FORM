# Stage 1: Build app với Node
FROM node:20-alpine AS builder

# Set workdir
WORKDIR /app

# Copy package.json và lock file (nếu có) trước để cache dependency
COPY package*.json ./
COPY pnpm-lock.yaml* ./
COPY yarn.lock* ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build production
RUN npm run build

# Stage 2: Dùng Nginx để serve app
FROM nginx:alpine

# Copy file build sang Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config nếu cần (giúp React Router không bị 404 khi F5)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
