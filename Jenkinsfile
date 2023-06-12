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
          echo "sh 'npm install'"
        }
      }
    }

    stage('Unit Tests') {
      steps {
        script {
          echo "sh 'npm run test:unit'"
        }
      }
    }

    stage('Integration Tests') {
      steps {
        script {
          echo "sh 'npm run test:integration'"
        }
      }
    }

    stage('Build and Publish Docker Image') {
      steps {
        script {
          echo "sh 'docker build -t my-docker-image .'"
          echo "sh 'docker push my-docker-image'"
        }
      }
    }

    stage('Quality Reports') {
      steps {
        script {
          echo "sh 'npm run test:ci'"
        }
      }
    }

    stage('Post-Build Notification') {
      steps {
        echo "slackSend (color: '#36a64f', message: 'Build successful!', tokenCredentialId: 'slack-token', channel: '#clean-ts-api')"
      }
    }

    stage('Deploy') {
      steps {
        echo "deploy"
      }
    }
  }
}
