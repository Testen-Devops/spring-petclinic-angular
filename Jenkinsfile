pipeline {
    agent {
        docker {
        image 'cypress/base:10'
        }
    }
    stage('Build FE & BE for Testing') {
        steps {
            script {
                def app = docker.build("npetersdev/spring-petclinic-angular")
                echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
                sh'docker run --detach --rm --publish 80:80 --publish 443:443 --name spring-petclinic-angular npetersdev/spring-petclinic-angular'
                def app = docker.build("npetersdev/spring-petclinic-rest")
                sh 'docker run --detach --rm --publish 9966:9966 --name spring-petclinic-rest npetersdev/spring-petclinic-rest'

                sh 'npm ci'
                sh 'npm run cy:verify'
                }
            }
        }

    stage('start local server') {
      steps {
        // start local server in the background
        // we will shut it down in "post" command block
        sh 'nohup npm run start:ci &'
      }
    }

    stage('test e2e') {
        environment {
            // we will be recording test results and video on Cypress dashboard
            // to record we need to set an environment variable
            // we can load the record key variable from credentials store
            // see https://jenkins.io/doc/book/using/using-credentials/
            // CYPRESS_RECORD_KEY = credentials('cypress-example-kitchensink-record-key')
            // because parallel steps share the workspace they might race to delete
            // screenshots and videos folders. Tell Cypress not to delete these folders
            // CYPRESS_trashAssetsBeforeRuns = 'false'
      }

      steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npm run e2e:record:parallel"
          }

    }

        stage('Build & Push docker image') {
            steps {
                script {
                    echo 'Branch:...' + env.GIT_BRANCH
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
                            sshCommand remote: remote, command: 'docker run --detach --rm --publish 80:80 --publish 443:443 --name spring-petclinic-angular npetersdev/spring-petclinic-angular:latest'
                        }
                    }
                }
            }
        }
        stage('Delete unused docker image') {
            steps {
                sh 'docker rmi npetersdev/spring-petclinic-angular:latest'
            }

            always {
                echo 'Stopping local server'
                sh 'pkill -f http-server'
            }
        }
    }
}
