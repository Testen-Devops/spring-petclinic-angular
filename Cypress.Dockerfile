ARG DOCKER_HUB="docker.io"

# base image
FROM cypress/included:latest 



# copy cypress files and folders

COPY . /workspace/

# set working directory
WORKDIR /workspace/

# install cypress
RUN npm i @cypress/webpack-preprocessor 
RUN npm i ts-loader
RUN npm install
RUN npm install cypress

# confirm the cypress install
RUN npx cypress verify

        