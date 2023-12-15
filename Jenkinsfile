pipeline {
  environment {
    imagename = "olalere1/webappimage10"
    registryCredential = 'dockerhublogin'
    DOCKERFILE_PATH = 'https://github.com/Olalere1/RQGenApp/blob/main/Dockerfile'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git([url: 'https://github.com/Olalere1/RQGenApp.git', branch: 'main', credentialsId: 'github-details-again'])

      }
    }
    stage('Building image') {
      steps{
        script {
          //dockerImage = docker.build 'https://github.com/Olalere1/RQGenApp/blob/main/Dockerfile'
            dockerImage = docker.build("${env.imagename}:latest", "${env.DOCKERFILE_PATH}")
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("$BUILD_NUMBER")
             dockerImage.push('latest')
          }
        }
      }
    }
    stage('Deploy to K8s') {
      steps{
        script {
          sh "sed -i 's,TEST_IMAGE_NAME,olalere1/webappimage10:$BUILD_NUMBER,' service_volume_statefulset.yml"
          sh "cat service_volume_statefulset.yml"
          sh "kubectl --kubeconfig=/Users/ola/.kube/config get pods"
          sh "kubectl --kubeconfig=/Users/ola/.kube/config apply -f service_volume_statefulset.yml"
        }
      }
    }
    
    
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $imagename:$BUILD_NUMBER"
         sh "docker rmi $imagename:latest"

      }
    }
  }
}