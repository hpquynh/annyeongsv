$(document).ready(function() {
    $('#formAdd').on('submit', function(e) {

        e.preventDefault();
        var $this = $(this);
        var input1 = $('#inputLang1').val();
       var input2 = $('#inputLang2').val();

        if((input1 === '') || (input2 === '')) {
            alert('Add new word before submitting');
        }
        else
        {
            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                success: function(html) {
                    if (html["status"] == "ok") {
                        addItem(html['lang'].lang, html['lang']._id);
                    }else{
                        console.log(html["status"]);
                    }
                }
            });
        }
    });
});
function addItem(value, id) {
    var list = $('#list');

    $("input").val('');
    var newli = '<li id="'+id+'" class="mt-10 clearfix">'+
        '<div class="pull-left">'+
        '<div>'+value.en+'</div>'+
        '<div>'+value.kr+'</div>'+
        '</div>'+
        '<button id="btn-'+id+'" class="btn btn-danger pull-right" onClick="deleteItem(this.id)">Delete</button>'+
        '</li>';
    list.append(newli);

}
function deleteItem(uuid) {
    var id = uuid.substring(4);
    $.ajax({
        url: '/word/' + id,
        type: 'DELETE',
        success: function(html) {
            console.log(html["status"]);
            if (html["status"] == "ok") {
                var item = $('li#' + html["id"]);
                item.remove();
            }else{
                console.log('err');
            }

        }
    });
}