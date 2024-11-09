pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI='mongodb+srv://felipemarchantv:xg42ei2Qorq5ArwF@cluster0.9yy7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        JWT_SECRET='a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2'
        DISPLAY = ''
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

        stage('Test') {
            steps {
                echo 'Running Cypress tests...'
                sh 'npx cypress run --config-file cypress.config.js --headless --browser electron'
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
