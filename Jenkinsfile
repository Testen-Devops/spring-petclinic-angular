pipeline {
    agent any
    stages {
        stage('run docker-compose for testing') {
            steps {
                echo 'Branch:...' + env.GIT_BRANCH
                    script {
                        try {
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            docker.image('npetersdev/spring-petclinic-rest:latest')
                            
                            sh'docker create --rm --publish 9966:9966 --name spring-petclinic-rest npetersdev/spring-petclinic-rest:latest'
                            sh'docker ps'
                        }
                        } catch (err) {
                            echo 'docker rest-container already running'
                            sh'docker restart spring-petclinic-rest'
                        } finally {
        
                        }
                    }
                    sleep(time:10,unit:"SECONDS")
                    
                    sh'docker-compose build --no-cache'
                    sh'docker-compose run --rm cypress npx cypress run --config baseUrl=http://127.0.0.1:8080'
                }
            }
        }
            // stage('Delete unused docker image') {
            //     steps {
            //         sh 'docker rmi npetersdev/spring-petclinic-rest:latest'
            //     }

            // }
        }
    

