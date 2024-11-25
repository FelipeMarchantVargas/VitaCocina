pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mongodb+srv://felipemarchantv:xg42ei2Qorq5ArwF@cluster0.9yy7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        JWT_SECRET = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2'
        DISPLAY = ':99' // Configuración para entorno gráfico virtual
        XDG_RUNTIME_DIR = '/tmp/runtime-jenkins'
    }

    stages {
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
                    sh 'npm install'
                }
            }
        }

        stage('Install ChromeDriver') {
            steps {
                echo 'Installing ChromeDriver...'
                sh '''
                    CHROMEDRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE)
                    wget -N https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip
                    unzip chromedriver_linux64.zip -d /usr/local/bin/
                    chmod +x /usr/local/bin/chromedriver
                    rm chromedriver_linux64.zip
                '''
                echo 'ChromeDriver installed successfully.'
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

        stage('Test') {
            steps {
                echo 'Running Cypress tests...'
                sh 'npx cypress run --config-file cypress.config.js --headless --browser electron'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo 'Setting up virtual display for Selenium tests...'
                sh 'Xvfb :99 -screen 0 1024x768x24 &' // Crea un entorno gráfico virtual para pruebas de Selenium
                dir('selenium') {
                    echo 'Running Selenium tests...'
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
