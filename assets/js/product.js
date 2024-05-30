$(document).ready(function() {
    // Fungsi untuk mengatur lebar kolom
    function setColumnWidths() {
        $('#listproduct thead th').each(function() {
            var textWidth = $(this).textWidth();
            $(this).width(textWidth + 20); // Tambahkan padding tambahan jika diperlukan
        });
    }

    // Fungsi untuk mengukur lebar teks
    $.fn.textWidth = function() {
        var htmlOrg = $(this).html();
        var htmlCalc = '<span>' + htmlOrg + '</span>';
        $(this).html(htmlCalc);
        var width = $(this).find('span:first').width();
        $(this).html(htmlOrg);
        return width;
    };

    // Panggil fungsi setColumnWidths saat tabel dimuat
    setColumnWidths();

    $('#listproduct').DataTable({
        "ajax": {
            "url": "assets/data/product.json",
            "dataSrc": ""
        },
        "columns": [
            {   
                "data": "id_product",
                "render": function (data, type, row) {
                    return "ID-" + data; // Menambahkan "ID" di depan data id_product
                }
            },
            {   "data": "product" },
            {   "data": "category" },
            { 
                "data": "price",
                "render": function (data, type, row) {
                    return "$" + data;
                }
            },
            { "data": "type" }
        ]
    });
});
