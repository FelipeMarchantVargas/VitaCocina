pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mongodb+srv://felipemarchantv:xg42ei2Qorq5ArwF@cluster0.9yy7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        JWT_SECRET = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2'
        DISPLAY = ':99' // Necesario para ejecutar Chrome sin un servidor gráfico
        PATH = "$PATH:/usr/local/bin" // Incluye la ruta de ChromeDriver
        XDG_RUNTIME_DIR = '/tmp/runtime-jenkins' // Necesario para Chrome en Jenkins
    }

    stages {
        stage('Setup Xvfb') {
            steps {
                echo 'Setting up Xvfb...'
                sh 'Xvfb :99 -ac &'
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/equipo-6-VC/VitaCocina', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    echo 'Installing frontend dependencies...'
                    sh 'npm install'
                }
                dir('selenium') {
                    echo 'Installing selenium dependencies...'
                    // Asegúrate de instalar selenium-webdriver globalmente para Jenkins
                    sh 'npm install selenium-webdriver --save-dev'
                    sh 'npm install chromedriver --save-dev'
                }
            }
        }

        stage('Build') {
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
                sleep 10 // Ajusta el tiempo si es necesario
            }
        }

        stage('Run Selenium Tests') {
            steps {
                dir('selenium') {
                    echo 'Running Selenium tests...'
                    // Limpia el caché de npm por seguridad
                    sh 'npm cache clean --force'
                    // Ejecuta los tests asegurándote de que se use el entorno configurado
                    sh 'node runner.js'
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
            slackSend(channel: '#proyecto', color: 'good', message: "Build exitoso :)")
        }
        failure {
            echo 'Pipeline failed.'
            slackSend(channel: '#proyecto', color: 'danger', message: "Build fallido :(")
        }
    }
}
