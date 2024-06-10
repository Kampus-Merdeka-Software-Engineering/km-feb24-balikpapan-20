fetch("assets/data/topproduct.json")
  .then((response) => response.json())
  .then((data) => {
    const categories = data.slice(0, 8).map((item) => item["category"]);
    const productDetails = data
      .slice(0, 8)
      .map((item) => item["product detail"]);
    const sales = data.slice(0, 8).map((item) => item["Sales"]);
    const transactionQtys = data
      .slice(0, 8)
      .map((item) => item["transaction_qty"]);

    const labels = data
      .slice(0, 8)
      .map((item) => `${item["category"]} - ${item["product detail"]}`);

    const ctx = document.getElementById("topproduct").getContext("2d");
    const topproduct = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sales",
            data: sales.map((sale) => (sale / 1000).toFixed(1)),
            backgroundColor: "#ff8f00",
            borderColor: "#ff8f00",
            borderWidth: 1,
          },
          {
            label: "Transactions",
            data: transactionQtys.map((qty) => (qty / 1000).toFixed(1)),
            backgroundColor: "#5c6bc0",
            borderColor: "#5c6bc0",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Value in thousands (rb)",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return (
                  tooltipItem.dataset.label + ": " + tooltipItem.raw + " rb"
                );
              },
            },
          },
          datalabels: {
            display: true,
            color: "black",
            anchor: "end",
            align: "end",
            formatter: function (value) {
              return value + " rb";
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  });
