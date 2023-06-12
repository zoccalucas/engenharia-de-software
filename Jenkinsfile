pipeline {
  agent any

  stages {
    stage('Clone Repository') {
      steps {
        checkout scm
      }
    }

    stage('Setup') {
      steps {
        script {
          sh 'npm install'
        }
      }
    }

    stage('Unit Tests') {
      steps {
        script {
          sh 'npm run test:unit'
        }
      }
    }

    stage('Integration Tests') {
      steps {
        script {
          sh 'npm run test:integration'
        }
      }
    }

    stage('Build and Publish Docker Image') {
      steps {
        script {
          sh 'docker build -t my-docker-image .'
          sh 'docker push my-docker-image'
        }
      }
    }

    stage('Quality Reports') {
      steps {
        script {
          sh 'npm run test:ci'
        }
      }
    }

    stage('Post-Build Notification') {
      steps {
        slackSend (color: '#36a64f', message: 'Build successful!', tokenCredentialId: 'slack-token', channel: '#clean-ts-api')
      }
    }

    stage('Deploy') {
      steps {
        echo "deploy"
      }
    }
  }
}
