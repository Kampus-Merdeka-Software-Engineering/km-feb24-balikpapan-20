async function loadJSONAndGenerateRushHourChart() {
  try {
    const response = await fetch("assets/data/rushhour.json");
    const data = await response.json();

    const locations = {};
    data.forEach((item) => {
      if (!locations[item.store_location]) {
        locations[item.store_location] = {
          label: item.store_location,
          data: Array(22).fill(0),
        };
      }

      locations[item.store_location].data[item.hour - 5] =
        item["total transaksi"];
    });

    const colorMap = {
      "Lower Manhattan": "#ff6b6b",
      "Hell's Kitchen": "#0461b1",
      Astoria: "#ffbb00",
    };

    const chartData = {
      labels: Array.from({ length: 17 }, (_, i) => (i + 5).toString()),
      datasets: Object.values(locations).map((location) => ({
        label: location.label,
        data: location.data,
        backgroundColor: colorMap[location.label],
        borderColor: colorMap[location.label],
        borderWidth: 2,
        tension: 0.1,
      })),
    };

    const ctx = document.getElementById("rushhour").getContext("2d");

    const configrushhour = {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        plugins: {},
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: 0,
            suggestedMax: 11000,
            title: {
              display: true,
              text: "Total Transaksi",
            },
          },
          x: {
            title: {
              display: true,
              text: "Hour",
            },
          },
        },
      },
    };

    const rushhour = new Chart(ctx, configrushhour);
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

loadJSONAndGenerateRushHourChart();
