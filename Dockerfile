FROM nginx:1.23.4
LABEL authors="leonschbbht"
COPY ./dist /usr/share/nginx/html
COPY ./Deployment/nginx/prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 80