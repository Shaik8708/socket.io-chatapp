FROM node:14.17.3 as build
 
# set working directory
WORKDIR /app
 
# install and cache app dependencies
COPY package.json ./
RUN npm install
RUN npm install -g @angular/cli@12.0.0
 
# add app
COPY . /app
 
# generate build
RUN ng build
 
FROM nginx:1.16.0-alpine
 
# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html
 
# expose port 80
EXPOSE 80
 
# run nginx
CMD ["nginx", "-g", "daemon off;"]