import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createMetricsGraph } from './compare-perf-bar-metrics.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runLighthouse(url, outputPath) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  // Configuration de Lighthouse
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  try {
    // Exécution de Lighthouse
    const results = await lighthouse(url, options);
    
    // Sauvegarde du rapport
    const reportPath = path.join(__dirname, 'performance-reports', outputPath);
    fs.writeFileSync(reportPath, results.report);
    
    console.log(`Rapport généré avec succès: ${reportPath}`);
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error);
  } finally {
    await chrome.kill();
  }
}

// URL des applications à tester
const appUrlReact = 'http://10.0.0.2:3000'; // Ajustez selon votre configuration
const appUrlJquery = 'https://babali61.github.io/wealthhealthbefore/'; // Ajustez selon votre configuration



// Fonction principale pour exécuter tous les tests
async function runAllTests() {
  try {
    console.log('Démarrage du test React...');
    await runLighthouse(appUrlReact, 'performance-report-react.json');
    
    console.log('Démarrage du test jQuery...');
    await runLighthouse(appUrlJquery, 'performance-report-jquery.json');
    
    console.log('Tous les tests sont terminés !');
    
    // Créer le graphique des métriques après les tests
    await runCreateMetricsGraph();
    
  } catch (error) {
    console.error('Erreur lors de l\'exécution des tests:', error);
  }
}

// Fonction pour créer le graphique des métriques
async function runCreateMetricsGraph() {
  try {
    await createMetricsGraph();
    console.log('Graphique des métriques créé avec succès ! Vous pourrez le trouver dans le dossier performance/compare-perf-images');
  } catch (error) {
    console.error('Erreur lors de la création du graphique:', error);
  }
}

// Exécute tous les tests
runAllTests();