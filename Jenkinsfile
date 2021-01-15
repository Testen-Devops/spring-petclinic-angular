pipeline {
    agent any
    stages {
        stage('Build & Push docker image') {
            steps {
                script {
                    def app = docker.build("npetersdev/spring-petclinic-angular")
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        //app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('Run docker image on remote server') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'remote-server-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        def remote = [:]
                        remote.name = 'server'
                        remote.host = 'server.ninopeters.de'
                        remote.user = USERNAME
                        remote.password = PASSWORD
                        remote.allowAnyHosts = true

                        try {
                            sshCommand remote: remote, command: 'docker container stop spring-petclinic-angular'
                        } catch (err) {
                            echo 'docker container not running'
                        } finally {
                            sshCommand remote: remote, command: 'docker pull npetersdev/spring-petclinic-angular:latest'
                            sshCommand remote: remote, command: 'docker run --detach --rm --volume /etc/letsencrypt/live/server.ninopeters.de:/etc/letsencrypt/live/server.ninopeters.de --publish 443:443 --name spring-petclinic-angular npetersdev/spring-petclinic-angular:latest'
                        }
                    }
                }
            }
        }
        stage('Delete unused docker image') {
            steps {
                sh 'docker rmi npetersdev/spring-petclinic-angular:latest'
            }
        }
    }
}
