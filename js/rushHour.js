async function loadJSONAndGenerateRushHourChart() {
    try {
        const response = await fetch('data/rushhour.json');
        const data = await response.json();

        const locations = {};
        data.forEach(item => {
            if (!locations[item.store_location]) {
                locations[item.store_location] = {
                    label: item.store_location,
                    data: Array(22).fill(0) // Membuat array dengan panjang 21 (dari jam 6 hingga jam 20)
                };
            }
            // Menyesuaikan data untuk dimulai dari jam 6
            locations[item.store_location].data[item.hour - 5] = item['total transaksi'];
        });

        // Daftar warna yang cocok dengan warna sebelumnya
        const colorMap = {
            "Lower Manhattan": '#ff6b6b',
            "Hell's Kitchen": '#0461b1',
            "Astoria": '#ffbb00'
        };

        const chartData = {
            labels: Array.from({ length: 17}, (_, i) => (i + 5).toString()), // Mulai dari jam 6 hingga jam 20
            datasets: Object.values(locations).map(location => ({
                label: location.label,
                data: location.data,
                backgroundColor: colorMap[location.label], // Menggunakan warna yang sesuai dengan lokasi
                borderColor: colorMap[location.label], // Menggunakan warna yang sesuai dengan lokasi
                borderWidth: 2,
                tension: 0.1
            }))
        };

        const ctx = document.getElementById('rushhour').getContext('2d');

        const configrushhour = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Rush Hour',
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
                        beginAtZero: false,
                        suggestedMin: 0,
                        suggestedMax: 11000
                    }
                }
            }
        };

        const rushhour = new Chart(ctx, configrushhour);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

loadJSONAndGenerateRushHourChart();
