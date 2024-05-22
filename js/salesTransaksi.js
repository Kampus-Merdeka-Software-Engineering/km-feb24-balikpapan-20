async function loadJSONAndGenerateChart() {
    try {
        const response = await fetch('data/salesTransaksi.json');
        const data = await response.json();

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
                    pointHoverRadius: 0
                },
                {
                    label: 'Sales Transaksi',
                    data: salesTransaksiData,
                    backgroundColor: '#f55f30',
                    borderColor: '#f55f30',
                    borderWidth: 2,
                    yAxisID: 'y1',
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
            ]
        };

        const chartConfig = {
            type: 'line',
            data: chartData,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Sales and Transaction in 6 Months',
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        font: {
                            size: 40
                        }
                    }
                },
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                }
            },
        };

        const myChart = new Chart(ctx, chartConfig);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

loadJSONAndGenerateChart();
