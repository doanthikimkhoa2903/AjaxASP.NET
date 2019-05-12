
$(document).ready(function () {
    _getAll();
});


function _getAll() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';

            function ToJavaScriptDate(value) {
                var pattern = /Date\(([^)]+)\)/;
                var results = pattern.exec(value);
                var dt = new Date(parseFloat(results[1]));
                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
            }

            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.RowID + '</td>';
                html += '<td>' + item.Stt + '</td>';
                html += '<td>' + item.ID + '</td>';
                html += '<td>' + ToJavaScriptDate(item.ProcessDate) + '</td>'; //ToJavaScriptDate(item.ProcessDate)
                html += '<td>' + item.Digit + '</td>';
                html += '<td>' + item.TenKH + '</td>';
                html += '<td>' + item.CMND + '</td>';
                html += '<td>' + item.Company + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.Address + '</td>';
                html += '<td>' + item.CarKind + '</td>';
                html += '<td>' + item.IDPart + '</td>';
                html += '<td>' + ToJavaScriptDate(item.DateStart) + '</td>'; //ToJavaScriptDate(item.DateStart)
                html += '<td>' + ToJavaScriptDate(item.DateEnd) + '</td>'; //ToJavaScriptDate(item.DateEnd)
                html += '<td>' + item.Note + '</td>';
                html += '<td>' + item.Amount + '</td>';
                html += '<td>' + item.ChargesAmount + '</td>';
                html += '<td>' + item.Status + '</td>';
                html += '<td>' + item.Account + '</td>';
                html += '<td>' + item.Images + '</td>';
                html += '<td>' + ToJavaScriptDate(item.DayUnLimit) + '</td>'; //ToJavaScriptDate(item.DayUnLimit)
                html += '<td><a href="#" onclick="return _getById(' + item.ID + ')">Edit</a> | <a href="#" onclick="return _delete(' + item.ID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('#list tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    return false;
}

function _getById(id) {
    $.ajax({
        url: '/Home/Get/' + id,
        // data: JSON.stringify(dto),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            function ToJavaScriptDate(value) {
                var pattern = /Date\(([^)]+)\)/;
                var results = pattern.exec(value);
                var dt = new Date(parseFloat(results[1]));
                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
            }

            $('#RowID').val(result.RowID);
            $('#Stt').val(result.Stt);
            $('#ID').val(result.ID);
            $('#ProcessDate').val(ToJavaScriptDate(result.ProcessDate));
            $('#Digit').val(result.Digit);
            $('#TenKH').val(result.TenKH);
            $('#CMND').val(result.CMND);
            $('#Company').val(result.Company);
            $('#Email').val(result.Email);
            $('#Address').val(result.Address);
            $('#CarKind').val(result.CarKind);
            $('#IDPart').val(result.IDPart);
            $('#DateStart').val(ToJavaScriptDate(result.DateStart));
            $('#DateEnd').val(ToJavaScriptDate(result.DateEnd));
            $('#Note').val(result.Note);
            $('#Amount').val(result.Amount);
            $('#ChargesAmount').val(result.ChargesAmount);
            $('#Status').val(result.Status);
            $('#Account').val(result.Account);
            $('#Images').val(result.Images);
            $('#DayUnLimit').val(ToJavaScriptDate(result.DayUnLimit));
                  
                 
               
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function _add() {
    var obj = {
        Stt: $('#Stt').val(),
        ID: $('#ID').val(),
        ProcessDate: $('#ProcessDate').val(),
        Digit: $('#Digit').val(),
        TenKH: $('#TenKH').val(),
        CMND: $('#CMND').val(),
        Company: $('#Company').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        CarKind: $('#CarKind').val(),
        IDPart: $('#IDPart').val(),
        DateStart: $('#DateStart').val(),
        DateEnd: $('#DateEnd').val(),
        Note: $('#Note').val(),
        Amount: $('#Amount').val(),
        ChargesAmount: $('#ChargesAmount').val(),
        Status: $('#Status').val(),
        Account: $('#Account').val(),
        Images: $('#Images').val(),
        DayUnLimit: $('#DayUnLimit').val(),
    }
    $.ajax({
        url: '/Home/Create',
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            _getAll();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function _edit() {
    var obj = {
        RowID:$('#RowID').val(),
        Stt: $('#Stt').val(),
        ID: $('#ID').val(),
        ProcessDate: $('#ProcessDate').val(),
        Digit: $('#Digit').val(),
        TenKH: $('#TenKH').val(),
        CMND: $('#CMND').val(),
        Company: $('#Company').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        CarKind: $('#CarKind').val(),
        IDPart: $('#IDPart').val(),
        DateStart: $('#DateStart').val(),
        DateEnd: $('#DateEnd').val(),
        Note: $('#Note').val(),
        Amount: $('#Amount').val(),
        ChargesAmount: $('#ChargesAmount').val(),
        Status: $('#Status').val(),
        Account: $('#Account').val(),
        Images: $('#Images').val(),
        DayUnLimit: $('#DayUnLimit').val(),
    }
    $.ajax({
        url: '/Home/Update',
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            _getAll();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function _delete(id) {
    var cf = confirm('Are you sure want to permanently delete this row?');
    if (cf) {
        $.ajax({
            url: '/Home/Delete/' + id,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                _getAll();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
