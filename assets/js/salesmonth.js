let salesMonthChart;
let jsonData;

fetch('assets/data/salesmonth.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    updateChart();
  });

document.getElementById('bulan').addEventListener('change', updateChart); // Tambahkan event listener untuk filter bulan

function updateChart() {
  const selectedLocations = getSelectedLocations();
  const selectedMonth = document.getElementById('bulan').value; // Dapatkan bulan yang dipilih
  const transformedData = transformData(jsonData, selectedLocations, selectedMonth);

  if (salesMonthChart) {
    salesMonthChart.destroy();
  }

  const config = {
    type: 'bar',
    data: transformedData,
    options: {
      responsive: true,
      plugins: {},
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Sales Transaksi'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        }
      }
    }
  };

  salesMonthChart = new Chart(document.getElementById('salesmonth'), config);
}

function getSelectedLocations() {
  const checkboxes = document.querySelectorAll('input[name="store_location"]:checked');
  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

document.querySelectorAll('input[name="store_location"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateChart);
});

function transformData(jsonData, selectedLocations, selectedMonth) {
  const dataChart = {
    labels: [],
    datasets: []
  };

  const locationColors = {
    'Lower Manhattan': '#ff6b6b',
    "Hell's Kitchen": '#0461b1',
    'Astoria': '#ffbb00'
  };

  const salesByLocation = {};

  // Filter data berdasarkan bulan dan lokasi yang dipilih
  const filteredData = jsonData.filter(entry => {
    const date = new Date(entry.date);
    const month = date.getMonth() + 1; // Bulan dimulai dari 0 (Januari) hingga 11 (Desember)
    const location = entry.store_location;
    return month === parseInt(selectedMonth) && selectedLocations.includes(location);
  });

  // Loop melalui data yang difilter
  filteredData.forEach(entry => {
    const date = entry.date;
    const location = entry.store_location;
    const sales = entry['sales transaksi'];

    // Tambahkan tanggal ke labels jika belum ada
    if (!dataChart.labels.includes(date)) {
      dataChart.labels.push(date);
    }

    // Tambahkan data penjualan ke setiap lokasi
    if (!salesByLocation[location]) {
      salesByLocation[location] = [];
    }
    salesByLocation[location].push(sales);
  });

  // Loop melalui setiap lokasi dan tambahkan dataset ke dataChart
  Object.keys(salesByLocation).forEach(location => {
    const dataset = {
      label: location,
      data: salesByLocation[location],
      backgroundColor: locationColors[location],
      borderColor: locationColors[location],
      borderWidth: 2,
      tension: 0.1
    };
    dataChart.datasets.push(dataset);
  });

  return dataChart;
}
