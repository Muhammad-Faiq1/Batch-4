$(document).ready(function(){
    $('.list .list').click(function(){
       let filter = $(this).attr('data-filter');
        if (filter == 'all'){
            $('#work .item-box').show('400');
        }else{
            $('#work .item-box').not('.'+filter).hide('200');
            $('#work .item-box').filter('.'+filter).show('400');

        }

    
    })
})