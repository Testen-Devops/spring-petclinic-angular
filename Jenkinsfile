pipeline {
    agent any
    stages {
        stage('run docker-compose for testing') {
            when {
                anyOf { branch 'develop'; }
            }
            steps {
                echo 'Branch:...' + env.GIT_BRANCH              
                echo 'Get a Coffee --> this will take way too long'
                sh'docker ps'
                sh'docker-compose up --build --abort-on-container-exit'
                sh'docker-compose down --rmi all'
            }
        }
        stage('Build & Push docker image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    def prod = load "jobs/production.groovy"
                    def app = prod.build()
                    prod.push(app)
                }
            }
        }
        stage('Run docker image on remote server A') {
            when {
                branch 'master'
            }
            steps {
                script {
                    def prod = load "jobs/production.groovy"
                    prod.run('spring-petclinic-angular-A', 3000)
                }
            }
        }
        stage ('Wait') {
            when {
                branch 'master'
            }
            steps {
                echo 'Waiting for container A to start up'
                sleep 30 // seconds
            }
        }
        stage('Run docker image on remote server B') {
            when {
                branch 'master'
            }
            steps {
                script {
                    def prod = load "jobs/production.groovy"
                    prod.run('spring-petclinic-angular-B', 3001)
                }
            }
        }
        stage('Delete unused docker image') {
            when {
                branch 'master'
            }
            steps {
                sh 'docker rmi npetersdev/spring-petclinic-angular:latest'
            }
        }
    }
}
