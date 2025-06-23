import fs from 'fs';
import path from 'path';
import QuickChart from 'quickchart-js';

const reportJqueryPath = path.join('./performance/performance-reports/performance-report-jquery.json');
const reportReactPath = path.join('./performance/performance-reports/performance-report-react.json');
const outputImagePath = path.join('./performance/compare-perf-images/network-requests-bar.png');

function getNetworkRequestsStats(data) {
  const items = data.audits['network-requests']?.details?.items || [];
  let total = items.length;
  let js = 0, css = 0, img = 0, other = 0;
  let totalBytes = 0;
  items.forEach(req => {
    const url = req.url || '';
    const mime = req.mimeType || '';
    totalBytes += req.transferSize || 0;
    if (mime.includes('javascript') || url.endsWith('.js')) js++;
    else if (mime.includes('css') || url.endsWith('.css')) css++;
    else if (mime.startsWith('image/') || url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) img++;
    else other++;
  });
  return {
    total,
    js,
    css,
    img,
    other,
    totalBytes: Math.round(totalBytes / 1024) // en Ko
  };
}

async function generateChart() {
  try {
    // Lecture des fichiers de rapport
    const jqueryData = JSON.parse(fs.readFileSync(reportJqueryPath, 'utf-8'));
    const reactData = JSON.parse(fs.readFileSync(reportReactPath, 'utf-8'));

    const statsJquery = getNetworkRequestsStats(jqueryData);
    const statsReact = getNetworkRequestsStats(reactData);

    const labels = ['Total', 'JS', 'CSS', 'Images', 'Autres', 'Poids total (Ko)'];
    const dataJquery = [statsJquery.total, statsJquery.js, statsJquery.css, statsJquery.img, statsJquery.other, statsJquery.totalBytes];
    const dataReact = [statsReact.total, statsReact.js, statsReact.css, statsReact.img, statsReact.other, statsReact.totalBytes];

    const chart = new QuickChart();
    chart.setConfig({
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'jQuery',
            data: dataJquery,
            backgroundColor: 'rgba(255,99,132,0.7)',
          },
          {
            label: 'React',
            data: dataReact,
            backgroundColor: 'rgba(54,162,235,0.7)',
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Comparatif des requêtes réseau (jQuery vs React)'
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: '#333',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    });

    const chartUrl = chart.getUrl();
    const response = await fetch(chartUrl);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputImagePath, Buffer.from(buffer));
    console.log('Graphique généré :', outputImagePath);
  } catch (error) {
    console.error('Erreur lors de la génération du graphique:', error);
    throw error;
  }
}
export { generateChart };
