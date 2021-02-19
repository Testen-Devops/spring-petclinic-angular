pipeline {
    agent any
    stages {
        stage('run docker-compose for testing') {
            steps {
                echo 'Branch:...' + env.GIT_BRANCH
                    sleep(time:10,unit:"SECONDS")
                    
                    echo 'Get a Coffee --> this will take way too long'
                    sh'docker ps'
                    sh'docker-compose up --build --abort-on-container-exit'
                    sh'docker-compose down --rmi all'
                }
            }
        }
        }
    

