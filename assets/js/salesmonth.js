let salesMonthChart;
    let jsonData;

    // Langkah 1: Lakukan permintaan untuk file JSON
    fetch('assets/data/salesmonth.json')
      .then(response => response.json())
      .then(data => {
        // Simpan data JSON untuk digunakan kembali saat filter berubah
        jsonData = data;

        // Inisialisasi chart pertama kali
        updateChart();
      });

    // Fungsi untuk memperbarui chart berdasarkan filter yang dipilih
    function updateChart() {
      const selectedLocations = getSelectedLocations();
      const transformedData = transformData(jsonData, selectedLocations);

      if (salesMonthChart) {
        salesMonthChart.destroy();
      }

      // Buat objek konfigurasi grafik dari data yang diubah
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

      // Buat grafik menggunakan objek konfigurasi tersebut
      salesMonthChart = new Chart(document.getElementById('salesmonth'), config);
    }

    // Fungsi untuk mendapatkan lokasi yang dipilih
    function getSelectedLocations() {
      const checkboxes = document.querySelectorAll('input[name="store_location"]:checked');
      return Array.from(checkboxes).map(checkbox => checkbox.value);
    }

    // Event listener untuk checkbox
    document.querySelectorAll('input[name="store_location"]').forEach(checkbox => {
      checkbox.addEventListener('change', updateChart);
    });

    // Fungsi untuk mengubah data JSON menjadi format yang dapat digunakan oleh Chart.js
    function transformData(jsonData, selectedLocations) {
      // Inisialisasi objek dataChart untuk menyimpan data yang diubah
      const dataChart = {
        labels: [],
        datasets: []
      };

      // Objek untuk menyimpan data sales transaksi berdasarkan lokasi toko
      const salesByLocation = {};

      // Loop melalui setiap objek dalam data JSON
      jsonData.forEach(entry => {
        const date = entry.date;
        const location = entry.store_location;
        const sales = entry['sales transaksi'];

        // Jika lokasi tidak dipilih, lewati data ini
        if (!selectedLocations.includes(location)) {
          return;
        }

        // Jika label tanggal belum ada dalam array labels, tambahkan label tersebut
        if (!dataChart.labels.includes(date)) {
          dataChart.labels.push(date);
        }

        // Jika lokasi toko belum ada dalam objek salesByLocation, inisialisasi array kosong
        if (!salesByLocation[location]) {
          salesByLocation[location] = [];
        }

        // Tambahkan data sales transaksi ke array yang sesuai dengan lokasi toko
        salesByLocation[location].push(sales);
      });

      // Definisikan warna dataset sesuai dengan yang ditentukan dalam data
      const colors = ['#ff6b6b', '#0461b1', '#ffbb00'];
      let colorIndex = 0;

      // Loop melalui setiap lokasi toko dan tambahkan dataset ke dataChart
      Object.entries(salesByLocation).forEach(([location, salesData]) => {
        const dataset = {
          label: location,
          data: salesData,
          backgroundColor: colors[colorIndex % colors.length],
          borderColor: colors[colorIndex % colors.length],
          borderWidth: 2,
          tension: 0.1
        };
        colorIndex++;
        dataChart.datasets.push(dataset);
      });

      return dataChart;
    }
