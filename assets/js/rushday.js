fetch("assets/data/rushday.json")
  .then((response) => response.json())
  .then((data) => {
    const lowerManhattanData = [];
    const hellsKitchenData = [];
    const astoriaData = [];

    data.forEach((item) => {
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

    const configrushday = {
      type: "line",
      data: {
        labels: [
          "Minggu",
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
        ],
        datasets: [
          {
            label: "Lower Manhattan",
            data: lowerManhattanData,
            backgroundColor: "#ff6b6b",
            borderColor: "#ff6b6b",
            borderWidth: 2,
            tension: 0.1,
          },
          {
            label: "Hell's Kitchen",
            data: hellsKitchenData,
            backgroundColor: "#0461b1",
            borderColor: "#0461b1",
            borderWidth: 2,
            tension: 0.1,
          },
          {
            label: "Astoria",
            data: astoriaData,
            backgroundColor: "#ffbb00",
            borderColor: "#ffbb00",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {},
        scales: {
          x: {
            title: {
              display: true,
              text: "Day",
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Transaksi",
            },
            beginAtZero: false,
            suggestedMin: 9500,
            suggestedMax: 11000,
          },
        },
      },
    };

    const rushday = new Chart(
      document.getElementById("rushday"),
      configrushday
    );
  })
  .catch((error) => console.error("Error fetching data:", error));
