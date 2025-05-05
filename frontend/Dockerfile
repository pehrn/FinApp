FROM node:alpine AS build

WORKDIR /app

#COPY package*.json ./

COPY . .

RUN npm install && npm run build


#EXPOSE 3000
#
#CMD ["npm", "start"]

# RUN npm run build

# Serve the app with a static server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
