def build() {
    return docker.build("npetersdev/spring-petclinic-angular")
}

def push(app) {
    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
        //app.push("${env.BUILD_NUMBER}")
        app.push("latest")
    }
}

return this