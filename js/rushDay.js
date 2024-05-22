// Fetch the JSON data asynchronously
fetch('data/rushday.json')
  .then(response => response.json())
  .then(data => {
    // Initialize empty arrays to store data for each location
    const lowerManhattanData = [];
    const hellsKitchenData = [];
    const astoriaData = [];

    // Iterate over the JSON data and fill in the arrays
    data.forEach(item => {
      switch (item.store_location) {
        case "Lower Manhattan":
          lowerManhattanData.push(item["total transaksi"]);
          break;
        case "Hell's Kitchen":
          hellsKitchenData.push(item["total transaksi"]);
          break;
        case "Astoria":
          astoriaData.push(item["total transaksi"]);
          break;
        default:
          break;
      }
    });

    // Create the chart using the processed data
    const configrushday = {
      type: 'line',
      data: {
        labels: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        datasets: [
          {
            label: 'Lower Manhattan',
            data: lowerManhattanData,
            backgroundColor: '#ff6b6b',
            borderColor: '#ff6b6b',
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: "Hell's Kitchen",
            data: hellsKitchenData,
            backgroundColor: '#0461b1',
            borderColor: '#0461b1',
            borderWidth: 2,
            tension: 0.1
          },
          {
            label: 'Astoria',
            data: astoriaData,
            backgroundColor: '#ffbb00',
            borderColor: '#ffbb00',
            borderWidth: 2,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Rush Day', // Add the title here
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
            suggestedMin: 9500, // Minimal rentang Y
            suggestedMax: 11000 // Maksimal rentang Y
          }
        }
      }
    };

    // Create the chart
    const rushday = new Chart(
      document.getElementById('rushday'),
      configrushday
    );
  })
  .catch(error => console.error('Error fetching data:', error));
