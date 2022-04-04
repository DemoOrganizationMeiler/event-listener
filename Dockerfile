FROM node:12

EXPOSE 3000

RUN sed -i -e 's/^root::/root:!:/' /etc/shadow
RUN addgroup --gid 1001 github
RUN adduser --uid 1001 --ingroup github github --home /github
RUN chown -R github:github $HOME

WORKDIR /github
RUN chmod a+rwx /github

COPY --chown=github package.json ./package.json
COPY --chown=github api ./api
COPY --chown=github rules ./rules
COPY --chown=github util ./util
COPY --chown=github service.js ./service.js
COPY --chown=github handler.alt.js ./handler.js


USER github

RUN npm install

CMD ["node","handler.js"]


