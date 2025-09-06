pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.47.2-jammy'
      args '-u root:root'
    }
  }

  options {
    skipDefaultCheckout(true)
    timestamps()
  }

  stages {
    stage('Checkout (manual)') {
      steps {
        sh '''
          rm -rf src
          git clone --depth=1 https://github.com/islamsyahakil/playwright-demoblaze.git src
          ls -la src
        '''
      }
    }

    // 🔹 Stage baru: Diagnose specs
    stage('Diagnose specs') {
      steps {
        sh '''
          echo "== list beberapa file di root repo =="
          ls -la src | sed -n '1,120p'

          echo "== cari file test/spec =="
          find src -type f \\( -name "*spec.*" -o -name "*test.*" \\) -print | sed -n '1,200p'

          echo "== cek config playwright =="
          test -f src/playwright.config.ts && echo "playwright.config.ts ada" || echo "playwright.config.ts TIDAK ADA"
        '''
      }
    }

    stage('Install deps') {
      steps {
        dir('src') {
          sh '''
            npm ci
            npx playwright install --with-deps
          '''
        }
      }
    }

    stage('Run Tests') {
      steps {
        dir('src') {
          sh 'npx playwright test'
        }
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'src/results/**/*.xml'
          archiveArtifacts artifacts: 'src/playwright-report/**', allowEmptyArchive: true
        }
      }
    }
  }
}
