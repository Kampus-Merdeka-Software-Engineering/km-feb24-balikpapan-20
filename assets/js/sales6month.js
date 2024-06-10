fetch("assets/data/sales6month.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const labels = data.map((item) => item.store_location);
    const salesData = data.map((item) => item["sales transaksi"]);

    const datasales6month = {
      labels: labels,
      datasets: [
        {
          label: "Sales Transaksi",
          data: salesData,
          backgroundColor: "#fdd55e",
          borderColor: "#fdd55e",
          borderWidth: 1,
        },
      ],
    };

    const configsales6month = {
      type: "bar",
      data: datasales6month,
      options: {
        responsive: true,
        plugins: {},
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Sales",
            },
          },
          x: {
            title: {
              display: true,
              text: "Store Location",
            },
          },
        },
      },
    };

    const sales6month = new Chart(
      document.getElementById("sales6month"),
      configsales6month
    );
  })
  .catch((error) => {
    console.error("Error fetching the data:", error);
  });
