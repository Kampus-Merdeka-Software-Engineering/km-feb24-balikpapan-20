let salesMonthChart;
let jsonData;

fetch("assets/data/salesmonth.json")
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    updateChart();
  });

document.getElementById("bulan").addEventListener("change", updateChart);

function updateChart() {
  const selectedLocations = getSelectedLocations();
  const selectedMonth = document.getElementById("bulan").value;
  const transformedData = transformData(
    jsonData,
    selectedLocations,
    selectedMonth
  );

  if (salesMonthChart) {
    salesMonthChart.destroy();
  }

  const config = {
    type: "bar",
    data: transformedData,
    options: {
      responsive: true,
      plugins: {},
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Sales Transaksi",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    },
  };

  salesMonthChart = new Chart(document.getElementById("salesmonth"), config);
}

function getSelectedLocations() {
  const checkboxes = document.querySelectorAll(
    'input[name="store_location"]:checked'
  );
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

document
  .querySelectorAll('input[name="store_location"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", updateChart);
  });

function transformData(jsonData, selectedLocations, selectedMonth) {
  const dataChart = {
    labels: [],
    datasets: [],
  };

  const locationColors = {
    "Lower Manhattan": "#ff6b6b",
    "Hell's Kitchen": "#0461b1",
    Astoria: "#ffbb00",
  };

  const salesByLocation = {};

  const filteredData = jsonData.filter((entry) => {
    const date = new Date(entry.date);
    const month = date.getMonth() + 1;
    const location = entry.store_location;
    return (
      month === parseInt(selectedMonth) && selectedLocations.includes(location)
    );
  });

  filteredData.forEach((entry) => {
    const date = entry.date;
    const location = entry.store_location;
    const sales = entry["sales transaksi"];

    if (!dataChart.labels.includes(date)) {
      dataChart.labels.push(date);
    }

    if (!salesByLocation[location]) {
      salesByLocation[location] = [];
    }
    salesByLocation[location].push(sales);
  });

  Object.keys(salesByLocation).forEach((location) => {
    const dataset = {
      label: location,
      data: salesByLocation[location],
      backgroundColor: locationColors[location],
      borderColor: locationColors[location],
      borderWidth: 2,
      tension: 0.1,
    };
    dataChart.datasets.push(dataset);
  });

  return dataChart;
}
