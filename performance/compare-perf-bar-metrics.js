import fs from 'fs';
import QuickChart from 'quickchart-js';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractMetrics(reportPath) {
  const data = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  const audits = data.audits;
  function round2(val) {
    return Math.round(val * 100) / 100;
  }
  return {
    fcp: round2(audits['first-contentful-paint'].numericValue / 1000),
    lcp: round2(audits['largest-contentful-paint'].numericValue / 1000),
    speedIndex: round2(audits['speed-index'].numericValue / 1000),
    tbt: round2(audits['total-blocking-time'].numericValue),
    cls: round2(audits['cumulative-layout-shift'].numericValue),
  };
}

export async function createMetricsGraph() {
  const before = extractMetrics('./performance/performance-reports/performance-report-jquery.json');
  const after = extractMetrics('./performance/performance-reports/performance-report-react.json');  

  const labels = ['FCP (s)', 'LCP (s)', 'Speed Index (s)', 'TBT (ms)', 'CLS'];
  const dataBefore = [before.fcp, before.lcp, before.speedIndex, before.tbt, before.cls];
  const dataAfter = [after.fcp, after.lcp, after.speedIndex, after.tbt, after.cls];

  const chart = new QuickChart();
  chart.setConfig({
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'jQuery',
          data: dataBefore,
          backgroundColor: 'rgba(255,99,132,0.7)',
        },
        {
          label: 'React',
          data: dataAfter,
          backgroundColor: 'rgba(54,162,235,0.7)',
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Comparatif des métriques de performance (jQuery vs React)'
      },
      scales: {
        y: {
          beginAtZero: true
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
  fs.writeFileSync(path.join('./performance/compare-perf-images', 'performance-metrics-bar.png'), Buffer.from(buffer));
  console.log('Graphique des métriques généré : performance-metrics-bar.png');
} 