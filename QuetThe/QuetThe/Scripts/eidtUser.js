var user = {
    init: function () {
        user.registerEvents();
    },
    registerEvents: function () {
        //$('.btn-active').off('click').on('click', function (e) {
        //    e.preventDefault();
        //    var btn = $(this);
        //    var id = btn.data('id');
        //    $.ajax({
        //        url: "/User/ChangeStatus",
        //        data: { id: id },
        //        dataType: "json",
        //        type:"POST",
        //        success: function (response) {
        //            if (response.status == 1) {
        //                btn.text('Kích hoạt');
        //            }
        //            else {
        //                btn.text('Đóng');
        //            }
        //        }

        //    })
        //});

        $('.btnCatThe').off('click').on('click', function (e) {
            e.preventDefault();
            var btn = $(this);
            var id = btn.data('id');
            
            $.ajax({
                url: "/User/CatThe",
                data: { id: id },
                dataType: "json",
                type: "POST",
                success: function (response) {
                }

            })
        });

        $('.btnChuyenThe').off('click').on('click', function (e) {
            e.preventDefault();
            var btn = $(this);
            var id = btn.data('id');
            var idrow = '.type_' + id;
            $.ajax({
                url: "/User/ChuyenThe",
                data: { id: id },
                dataType: "json",
                type: "POST",
                success: function (response) {
                    $(idrow).text(response.type);
                }

            })
        });

        $('.btnSuaten').off('click').on('click', function (e) {
            e.preventDefault();
            var btn = $(this);
            var id = btn.data('id');            
            var idrow = '.txtName_' + id;
            var value = $(idrow)[0].value;
            $.ajax({
                url: "/User/SuaTen",
                data: { id: id, name: value },
                dataType: "json",
                type: "POST",
                success: function (response) {

                }

            })
        });       
        
    }
}
user.init();