pipeline {
    agent any
    stages {
        stage('run docker-compose for testing') {
            steps {
                echo 'Branch:...' + env.GIT_BRANCH
                    sleep(time:10,unit:"SECONDS")
                    
                    echo 'Get a Coffee --> this will take way too long'
                    sh'docker ps'
                    sh'docker-compose up --build --force-recreate --detach'
                    sh'docker-compose run --rm cypress npx cypress run --config baseUrl=http://127.0.0.1:8080'
                    sh'docker-compose down --force'
                }
            }
        }
            // stage('Delete unused docker image') {
            //     steps {
            //         sh 'docker rmi npetersdev/spring-petclinic-rest:latest'
            //     }

            // }
        }
    

