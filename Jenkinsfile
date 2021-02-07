pipeline {
    agent any
    stages {
        stage('run docker-compose for testing') {
            steps {
                echo 'Branch:...' + env.GIT_BRANCH
                sh'npm install'
                    script {
                        try {
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            docker.image('npetersdev/spring-petclinic-rest:test')
                            .withRun('--detach --rm --publish 9966:9966 --name spring-petclinic-rest'){
                            }
                        }
                        } catch (err) {
                            echo 'docker rest-container already running'
                            sh'docker restart spring-petclinic-api-test'
                        } finally {
        
                        }
                    }
                    sleep(time:10,unit:"SECONDS")

                    sh'docker-compose run cypress ./node_modules/.bin/cypress run --config baseUrl=http://127.0.0.1:8080'
                }
            }
        }
            // stage('Delete unused docker image') {
            //     steps {
            //         sh 'docker rmi npetersdev/spring-petclinic-rest:latest'
            //     }

            // }
        }
    

