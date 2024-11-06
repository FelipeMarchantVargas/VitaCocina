pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/equipo-6-VC/VitaCocina', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            echo 'Installing frontend dependencies...'
                            sh 'npm install'
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('backend') {
                            echo 'Installing backend dependencies...'
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Frontend Build') {
                    steps {
                        dir('frontend') {
                            echo 'Building frontend...'
                            sh 'npm run build'
                        }
                    }
                }
                stage('Backend Build') {
                    steps {
                        dir('backend') {
                            echo 'Building backend...'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Test') {
            steps {
                dir('cypress') {
                    echo 'Running Cypress tests...'
                    sh 'npm install'  // Instala Cypress si no está instalado
                    sh 'npx cypress run'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Aquí puedes agregar los comandos necesarios para desplegar tu aplicación
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
