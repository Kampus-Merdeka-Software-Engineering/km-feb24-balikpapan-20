   $(document).ready(function() {
    $('#listproduct').DataTable({
        "ajax": {
            "url": "assets/data/product.json",
            "dataSrc": ""
        },
        "columns": [
            {   
                "data": "id_product",
                "render": function (data, type, row) {
                    return "ID " + data; // Menambahkan "ID" di depan data id_product
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

        
