pipeline {
    agent any
    stages {
        stage('Build & Push docker image') {
            steps {
                script {
                    echo 'Branch:...' + env.GIT_BRANCH
                    //def app = docker.build("npetersdev/spring-petclinic-angular")
                    //docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        //app.push("${env.BUILD_NUMBER}")
                    //    app.push("latest")
                    //}
                }
            }
        }
    // stage('Build & Push docker image') {
    //     steps {
    //         script {
    //             def app = docker.build("npetersdev/spring-petclinic-angular")
    //             docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
    //                 //app.push("${env.BUILD_NUMBER}")
    //                 app.push("latest")
    //             }
    //         }
    //     }
    // }
        stage('Run docker image on remote server A') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'remote_guest_auth', keyFileVariable: 'KEYFILE', passphraseVariable: 'PASSPHRASE', usernameVariable: 'USERNAME')]) {
                        def remote = [:]
                        remote.name = 'server'
                        remote.host = '185.207.106.34'
                        remote.port = 4714
                        remote.allowAnyHosts = true
                        remote.user = USERNAME
                        remote.identityFile = KEYFILE
                        remote.passphrase = PASSPHRASE

                        try {
                            sshCommand remote: remote, command: 'docker container stop spring-petclinic-angular-A'
                        } catch (err) {
                            echo 'docker container not running'
                        } finally {
                           sshCommand remote: remote, command: 'docker pull npetersdev/spring-petclinic-angular:latest'
                           sshCommand remote: remote, command: 'docker run --detach --rm --publish 3000:80 --name spring-petclinic-angular-A npetersdev/spring-petclinic-angular:latest'
                        }
                    }
                }
            }
        }
        // stage('Run docker image on remote server B') {
        //     steps {
        //         script {
        //             withCredentials([sshUserPrivateKey(credentialsId: 'remote_guest_auth', keyFileVariable: 'KEYFILE', passphraseVariable: 'PASSPHRASE', usernameVariable: 'USERNAME')]) {
        //                 def remote = [:]
        //                 remote.name = 'server'
        //                 remote.host = '185.207.106.34'
        //                 remote.port = 4714
        //                 remote.allowAnyHosts = true
        //                 remote.user = USERNAME
        //                 remote.identityFile = KEYFILE
        //                 remote.passphrase = PASSPHRASE

        //                 try {
        //                     sshCommand remote: remote, command: 'docker container stop spring-petclinic-angular-B'
        //                 } catch (err) {
        //                     echo 'docker container not running'
        //                 } finally {
        //                     sshCommand remote: remote, command: 'docker pull npetersdev/spring-petclinic-angular:latest'
        //                     sshCommand remote: remote, command: 'docker run --detach --rm --publish 3001:80 --name spring-petclinic-angular-B npetersdev/spring-petclinic-angular:latest'
        //                 }
        //             }
        //         }
        //     }
        // }
        stage('Delete unused docker image') {
            steps {
                sh 'docker rmi npetersdev/spring-petclinic-angular:latest'
            }

        }
    }

}
