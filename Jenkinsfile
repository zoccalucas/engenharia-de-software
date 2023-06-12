pipeline {
  agent any

  stages {
    stage('Clone Repository') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
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
        echo 'Build and Publish Docker Image'
      }
    }

    stage('Quality Reports') {
      steps {
        script {
          sh 'npm run test:ci'
        }
      }
    }
  }
}
