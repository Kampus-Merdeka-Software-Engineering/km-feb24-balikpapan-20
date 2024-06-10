$(document).ready(function () {
  $.ajax({
    url: "assets/data/product.json",
    dataType: "json",
    success: function (data) {
      $("#datatable").DataTable({
        data: data,
        columns: [
          { data: "no" },
          { data: "transaction_date" },
          { data: "transaction_time" },
          { data: "transaction_qty" },
          { data: "store_id" },
          { data: "store_location" },
          { data: "product_id" },
          {
            data: "unit_price",
            render: function (data, type, row) {
              return "$" + data;
            },
          },
          { data: "product_category" },
          { data: "product_type" },
          { data: "product_detail" },
        ],
        paging: true,
        pageLength: 10,
        autoWidth: false,
        fixedColumns: true,
        responsive: true,
      });
    },
  });
});
