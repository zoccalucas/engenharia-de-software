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

    stage('Build and Publechoish Docker Image') {
      steps {
        echo 'Build and Publechoish Docker Image'
      }
    }

    stage('Quality Reports') {
      steps {
        script {
         echo "sh 'npm run test:ci'"
        }
      }
    }
  }
}
