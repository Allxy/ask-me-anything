FROM node:16 as frontend-build
WORKDIR /usr/src/
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:16 AS backend-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install && ENVIRONMENT=production npm run build
RUN ls

FROM node:16
WORKDIR /root/
COPY --from=frontend-build /usr/src/frontend/build ./frontend/build
COPY --from=backend-build /usr/src/backend/build .
RUN ls

EXPOSE 80