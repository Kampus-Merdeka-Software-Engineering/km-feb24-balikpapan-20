$(document).ready(function() {
    // Fungsi untuk mengukur lebar teks
    $.fn.textWidth = function() {
        var htmlOrg = $(this).html();
        var htmlCalc = $('<span>' + htmlOrg + '</span>').css({
            "font-size": $(this).css('font-size'),
            "visibility": "hidden",
            "white-space": "nowrap"
        }).appendTo('body');
        var width = htmlCalc.width();
        htmlCalc.remove();
        return width;
    };

    // Inisialisasi DataTable
    $('#listproduct').DataTable({
        "ajax": {
            "url": "assets/data/product.json",
            "dataSrc": ""
        },
        "columns": [
            { "data": "no" },
            { "data": "transaction_date" },
            { "data": "transaction_time" },
            { "data": "transaction_qty" },
            { "data": "store_id" },
            { "data": "store_location" },
            { "data": "product_id" },
            {
                "data": "unit_price",
                "render": function(data, type, row) {
                    return "$" + data;
                }
            },
            { "data": "product_category" },
            { "data": "product_type" },
            { "data": "product_detail" }
        ],
        "scrollY": "400px",
        "scrollX": true,
        "scrollCollapse": true,
        "paging": true,
        "autoWidth": false,
        "fixedHeader": true,
        "fixedColumns": true
    });

    // Fungsi untuk mengatur lebar kolom
    function setColumnWidths() {
        $('#listproduct thead th').each(function() {
            var textWidth = $(this).textWidth();
            $(this).width(textWidth + 100); // Tambahkan padding tambahan jika diperlukan
        });
    }

    // Callback setelah DataTable selesai diinisialisasi
    $('#listproduct').on('init.dt', function() {
        setColumnWidths();
    });
});
