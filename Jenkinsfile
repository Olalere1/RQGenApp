pipeline {

  environment {
    dockerimagename = "olalere1webappimage10"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') { // checking your git repo
      steps {
        git 'https://github.com/Olalere1/RQGenApp.git'
      }
    }

    stage('Build image') { //building, naming the image and saving as a variable
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') { //N.B: registry credentials that must have been configured to your jenkins servers
      environment {
               registryCredential = 'dockerhublogin'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) { //N.B: check the validity of the registry URL
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') { //N.B: update the kubeconfigId value when credentials are eventually added to the Jenkins server
      steps {
        script {
          kubernetesDeploy(configs: "service_volume_statefulset.yml", kubeconfigId: "kubernetes")
        }
      }
    }

  }

}