pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.47.2-jammy'
      args '-u root:root'
    }
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install deps') {
      steps {
        sh '''
          npm ci
          npx playwright install --with-deps
        '''
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npx playwright test'
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'results/**/*.xml'
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
      }
    }
  }
}