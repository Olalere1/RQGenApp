pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials') // Jenkins credentials for Docker Hub
        GIT_REPO_URL = 'https://github.com/Olalere1/RQGenApp.git' // GitHub repository URL
        DOCKERFILE_PATH = 'https://github.com/Olalere1/RQGenApp/blob/main/Dockerfile' // Path to Dockerfile in your GitHub repo
        DOCKER_IMAGE_NAME = 'olalere1 / webappimage10' // Docker Hub image name
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'your-git-credentials', url: 'https://github.com/Olalere1/RQGenApp.git'
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Docker build and push commands
                    withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            def customImage = docker.build(DOCKER_IMAGE_NAME, "--file=${DOCKERFILE_PATH} .")
                            customImage.push()
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Docker image build and push successful!'
        }
        failure {
            echo 'Docker image build or push failed!'
        }
    }
}
