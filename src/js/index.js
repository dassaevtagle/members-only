import '../scss/styles.scss';
import $ from './jquery';

$(function() {
  $('.deletePost').on('click', function(event){
    const id = $(this).attr('data-id');

    $.ajax({
        type:'DELETE',
        url: 'members/delete/' + id,
        success: function(res){
          alert('Deleted!');
        },
        error: function(err){
            console.log(err);
        }
    });
  });
});
