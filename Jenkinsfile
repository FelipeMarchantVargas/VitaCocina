pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mongodb+srv://usuario:contraseña@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        JWT_SECRET = 'tu_secreto_jwt'
        DISPLAY = ''
        XDG_RUNTIME_DIR = '/tmp/runtime-jenkins'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/tu-usuario/tu-repositorio', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    echo 'Installing frontend dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    echo 'Building frontend...'
                    sh 'npm run build'
                }
            }
        }

        stage('Start Servers') {
            parallel {
                stage('Start Frontend Server') {
                    steps {
                        dir('frontend') {
                            echo 'Starting frontend server...'
                            sh 'nohup npm run start &'
                        }
                    }
                }
                stage('Start Backend Server') {
                    steps {
                        dir('backend') {
                            echo 'Starting backend server...'
                            sh 'nohup npm run start &'
                        }
                    }
                }
            }
        }

        stage('Wait for Servers') {
            steps {
                echo 'Waiting for servers to start...'
                sleep 10 // Ajusta el tiempo según sea necesario
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npx cypress run --config-file cypress.config.js --headless --browser electron'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Agrega aquí los comandos necesarios para desplegar tu aplicación
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'pkill -f "npm run start" || true' // Detiene los servidores iniciados
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
