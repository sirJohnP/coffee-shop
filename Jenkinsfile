pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Start test Environment') {
            steps {
                script {                    
                    sh '''
                        docker compose -f docker-compose.test.yml down || true
                        docker compose -f docker-compose.test.yml up -d
                    '''
                }
            }
        }

        stage('Run API Tests (Postman)') {
            steps {
                sh 'npm ci'
                sh 'npx newman run postman/coffee-shop-tests.postman_collection.json'
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker compose -f docker-compose.test.yml down -v'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Deploy successful'
        }
        failure {
            echo 'Deploy failed'
        }
        
        always {
            archiveArtifacts artifacts: 'target/surefire-reports/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results.json', allowEmptyArchive: true
        }
    
    }
}