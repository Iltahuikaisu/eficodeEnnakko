FROM node:lts-alpine3.9
COPY . .
RUN yarn install
RUN yarn run build
RUN cp -r build /backend/
EXPOSE 3001
CMD ["node","backend/www.js"]
