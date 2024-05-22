fetch('data/sales6month.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    // Process the data to extract labels and sales values
    const labels = data.map(item => item.store_location);
    const salesData = data.map(item => item['sales transaksi']);
    
    // Chart data and configuration
    const datasales6month = {
        labels: labels,
        datasets: [{
            label: 'Sales Transaksi',
            data: salesData,
            backgroundColor: '#fdd55e',
            borderColor: '#fdd55e',
            borderWidth: 1
        }]
    };

    const configsales6month = {
        type: 'bar',
        data: datasales6month,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Total Sales by 6 Month',
                    padding: {
                        top: 10,
                        bottom: 10
                    },
                    font: {
                        size: 40
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
    const sales6month = new Chart(
        document.getElementById('sales6month'),
        configsales6month
    );
})
.catch(error => {
    console.error('Error fetching the data:', error);
});
