FROM node:lts-alpine3.9
COPY --chown=node:node backend .
RUN yarn install
COPY --chown=node:node build ./build
EXPOSE 3001
CMD ["www.js"]
