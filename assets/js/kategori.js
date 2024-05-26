// Fetch the JSON data
fetch('assets/data/kategori.json')
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
                plugins: {},
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Sales Transaksi' // Label untuk sumbu Y
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Kategori Produk' // Label untuk sumbu X
                        }
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
