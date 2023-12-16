pipeline {

  environment {
    dockerimagename = "olalere1/group3image"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/Olalere1/RQGenApp.git'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhublogin'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploy to K8s')
        {
        steps{ 
			withKubeConfig([credentialsId: 'mykubeconfig', serverUrl: 'http://3.228.14.174:8080']) {
                sh 'kubectl apply -f service_volume_statefulset.yml'
            }
		}
    }
      
 }

	post {
		always {
			sh 'docker logout'
		}
	}

}