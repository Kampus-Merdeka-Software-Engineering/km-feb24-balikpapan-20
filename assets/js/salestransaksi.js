let originalData = null;
let chart = null;

async function loadJSONAndGenerateChart() {
    try {
        const response = await fetch('assets/data/salestrans.json');
        const data = await response.json();
        originalData = data;
        return data;
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

async function generateChart(data) {
    const dateLabels = data.map(item => item.Tanggal);
    const totalTransaksiData = data.map(item => parseInt(item['Total Transaksi']));
    const salesTransaksiData = data.map(item => parseInt(item['Sales Transaksi']));

    const ctx = document.getElementById('salestransaksi').getContext('2d');

    const chartData = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Total Transaksi',
                data: totalTransaksiData,
                backgroundColor: '#9430af',
                borderColor: '#9430af',
                borderWidth: 2,
                yAxisID: 'y',
                pointRadius: 0,
                pointHoverRadius: 0,
                hidden: false
            },
            {
                label: 'Sales Transaksi',
                data: salesTransaksiData,
                backgroundColor: '#f55f30',
                borderColor: '#f55f30',
                borderWidth: 2,
                yAxisID: 'y1',
                pointRadius: 0,
                pointHoverRadius: 0,
                hidden: false
            },
        ]
    };

    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            plugins: {},
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Transaction Date'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Total Transaksi'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Sales Transaksi'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            }
        },
    };

    return new Chart(ctx, chartConfig);
}

async function filterDataByDate() {
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert("Please select valid start and end dates.");
        return;
    }

    const data = await loadJSONAndGenerateChart();

    const filteredData = data.filter(item => {
        const itemDate = new Date(item.Tanggal);
        return itemDate >= startDate && itemDate <= endDate;
    });

    updateChartData(filteredData);
}

async function clearFilter() {
    updateChartData(originalData);

    // Mengosongkan nilai input tanggal
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
}

function updateChartData(data) {
    const totalTransaksiCheckbox = document.getElementById('totalTransaksiCheckbox');
    const salesTransaksiCheckbox = document.getElementById('salesTransaksiCheckbox');

    chart.data.labels = data.map(item => item.Tanggal);
    chart.data.datasets[0].data = totalTransaksiCheckbox.checked ? data.map(item => parseInt(item['Total Transaksi'])) : [];
    chart.data.datasets[1].data = salesTransaksiCheckbox.checked ? data.map(item => parseInt(item['Sales Transaksi'])) : [];
    chart.update();
}

(async () => {
    const data = await loadJSONAndGenerateChart();
    chart = await generateChart(data);

    const filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', filterDataByDate);

    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', clearFilter);

    const totalTransaksiCheckbox = document.getElementById('totalTransaksiCheckbox');
    const salesTransaksiCheckbox = document.getElementById('salesTransaksiCheckbox');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    totalTransaksiCheckbox.addEventListener('change', () => {
        if (startDateInput.value || endDateInput.value) {
            filterDataByDate();
        } else {
            updateChartData(originalData);
        }
    });

    salesTransaksiCheckbox.addEventListener('change', () => {
        if (startDateInput.value || endDateInput.value) {
            filterDataByDate();
        } else {
            updateChartData(originalData);
        }
    });
})();
