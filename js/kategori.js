// Fetch the JSON data
fetch('data/kategori.json')
    .then(response => response.json())
    .then(data => {
        // Process the JSON data
        const labels = data.map(item => item.product_category);
        const salestransData = data.map(item => item['sales transaksi']);

        // Create the chart configuration
        const datakategori = {
            labels: labels,
            datasets: [{
                label: 'Sales Transaksi',
                data: salestransData,
                backgroundColor: '#00acc2',
                borderColor: '#00acc2',
                borderWidth: 1
            }]
        };

        const configkategori = {
            type: 'bar',
            data: datakategori,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Top Category Product by Sales',
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        font: {
                            size: 10
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        // Create the chart
        const kategori = new Chart(
            document.getElementById('kategori'),
            configkategori
        );
    })
    .catch(error => console.error('Error loading JSON data:', error));
