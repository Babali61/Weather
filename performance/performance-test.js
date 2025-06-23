import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createMetricsGraph } from './compare-perf-bar-metrics.js';
import { generateChart } from './compare-network-requests-graph.js';
import puppeteer from 'puppeteer';


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
const appUrlReact = 'http://localhost:3000'; // Ajustez selon votre configuration
const appUrlJquery = 'https://babali61.github.io/wealthhealthbefore'; // Retiré le slash final

// Fonction pour créer les dossiers nécessaires
function createRequiredDirectories() {
  const reportsDir = path.join(__dirname, 'performance-reports');
  const imagesDir = path.join(__dirname, 'compare-perf-images');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    console.log('Dossier performance-reports créé');
  }

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('Dossier compare-perf-images créé');
  }
}

async function simulateReactActions(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Activer la capture des requêtes réseau
    await page.setRequestInterception(true);
    const requests = [];
    
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        timestamp: Date.now()
      });
      request.continue();
    });

    // Naviguer vers l'URL
    console.log(`Navigation vers ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Remplir le formulaire
    console.log('Remplissage du formulaire...');
    await page.waitForSelector('#create-employee', { timeout: 60000 });
    
    // Remplir les champs du formulaire
    await page.type('#first-name', 'John');
    await page.type('#last-name', 'Doe');
    
    // Remplir les dates avec React DatePicker
    console.log('Remplissage de la date de naissance...');
    await page.click('#date-of-birth');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.click('.react-datepicker__day--001');
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Remplissage de la date de début...');
    await page.click('#start-date');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.click('.react-datepicker__day--001');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Remplir l'adresse
    await page.type('#street', '123 Main St');
    await page.type('#city', 'Paris');
    await page.type('#zip-code', '75001');
    
    // Sélectionner l'état
    console.log('Sélection de l\'état...');
    await page.click('#state');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sélectionner le département
    console.log('Sélection du département...');
    await page.click('#department');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Soumettre le formulaire
    console.log('Soumission du formulaire...');
    await page.click('.submit-button');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Vérifier la liste des employés
    console.log('Navigation vers la liste des employés...');
    await page.goto(`${url}/employee-list`, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Vérifier que la table est présente
    console.log('Vérification de la table...');
    await page.waitForSelector('.table', { timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Tester la recherche
    console.log('Test de la recherche...');
    await page.type('#search', 'John');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Tester le tri
    console.log('Test du tri...');
    await page.click('th[role="columnheader"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sauvegarder les données des requêtes
    const networkDataPath = path.join(__dirname, 'performance-reports', 'network-requests-react.json');
    fs.writeFileSync(networkDataPath, JSON.stringify(requests, null, 2));
    
    console.log(`Données réseau sauvegardées dans: ${networkDataPath}`);
    
  } catch (error) {
    console.error('Erreur lors de la simulation des actions React:', error);
  } finally {
    await browser.close();
  }
}

async function simulateJQueryActions(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Activer la capture des requêtes réseau
    await page.setRequestInterception(true);
    const requests = [];
    
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        timestamp: Date.now()
      });
      request.continue();
    });

    // Naviguer vers l'URL
    console.log(`Navigation vers ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Remplir le formulaire
    console.log('Remplissage du formulaire...');
    await page.waitForSelector('#create-employee', { timeout: 60000 });
    
    // Remplir les champs du formulaire
    await page.type('#first-name', 'John');
    await page.type('#last-name', 'Doe');
    
    // Remplir les dates
    await page.type('#date-of-birth', '1990-01-01');
    await page.type('#start-date', '2024-01-01');
    
    // Remplir l'adresse
    await page.type('#street', '123 Main St');
    await page.type('#city', 'Paris');
    await page.type('#zip-code', '75001');
    
    // Sélectionner l'état
    console.log('Sélection de l\'état...');
    await page.click('#state-button');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sélectionner le département
    console.log('Sélection du département...');
    await page.click('#department-button');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Soumettre le formulaire
    console.log('Soumission du formulaire...');
    await page.click('button[onclick="saveEmployee()"]');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Vérifier la liste des employés
    console.log('Navigation vers la liste des employés...');
    await page.goto(`${url}/employee-list.html`, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Vérifier que la table est présente
    console.log('Vérification de la table...');
    await page.waitForSelector('#employee-table', { timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Tester la recherche
    console.log('Test de la recherche...');
    await page.type('#employee-table_filter input', 'John');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Tester le tri
    console.log('Test du tri...');
    await page.click('#employee-table th.sorting');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sauvegarder les données des requêtes
    const networkDataPath = path.join(__dirname, 'performance-reports', 'network-requests-jquery.json');
    fs.writeFileSync(networkDataPath, JSON.stringify(requests, null, 2));
    
    console.log(`Données réseau sauvegardées dans: ${networkDataPath}`);
    
  } catch (error) {
    console.error('Erreur lors de la simulation des actions jQuery:', error);
  } finally {
    await browser.close();
  }
}

// Fonction principale pour exécuter tous les tests
async function runAllTests() {
  try {
    // Créer les dossiers nécessaires
    createRequiredDirectories();

    console.log('Démarrage de la simulation React...');
    await simulateReactActions(appUrlReact);
    console.log('Démarrage du test React...');
    await runLighthouse(appUrlReact, 'performance-report-react.json');
    
    console.log('Démarrage de la simulation jQuery...');
    await simulateJQueryActions(appUrlJquery);
    console.log('Démarrage du test jQuery...');
    await runLighthouse(appUrlJquery, 'performance-report-jquery.json');
    
    console.log('Tous les tests sont terminés !');
    
    // Créer le graphique des métriques après les tests
    await runCreateMetricsGraph();
    console.log('Graphique des métriques créé avec succès !');
    await runGenerateChart();
    console.log('Graphique des requêtes réseau généré avec succès !');

  } catch (error) {
    console.error('Erreur lors de l\'exécution des tests:', error);
  }
}

// Fonction pour créer le graphique des métriques
async function runCreateMetricsGraph() {
  try {
    await createMetricsGraph();
  } catch (error) {
    console.error('Erreur lors de la création du graphique:', error);
  }
}

async function runGenerateChart() {
  try {
    await generateChart();
  } catch (error) {
    console.error('Erreur lors de la génération du graphique:', error);
  }
}
// Exécute tous les tests
runAllTests();