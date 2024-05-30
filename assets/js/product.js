    function showTab(tabId) {
            var tabs = document.getElementsByClassName('tab-content');
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }
            document.getElementById(tabId).classList.add('active');
        }

        $(document).ready(function() {
            $('#listproduct').DataTable({
                "ajax": {
                    "url": "assets/data/product.json", // Pastikan jalur menuju file JSON benar
                    "dataSrc": ""
                },
                "columns": [
                    { "data": "id" },
                    { "data": "product" },
                    { "data": "category" },
                    { 
                        "data": "price",
                        "render": function (data, type, row) {
                            return "$" + data; // Menambahkan dollar sign ($) di depan harga
                        }
                    },
                    { "data": "type" },
                    { "data": "store_location" }
                ]
            });
        });
        