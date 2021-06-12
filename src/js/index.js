import '../scss/styles.scss';
import $ from './jquery';

$(function() {
  $('.deletePost').on('click', function(e){
    e.preventDefault(); 
    const id = $(this).attr('data-id');

    $.ajax({
        type: 'DELETE',
        url: '/members/delete/' + id,
        success: function(res){
          alert('Deleted!' + res._id);
          $(`div[data-id=message_${id}]`).remove();
        },
        error: function(err){
            alert(err.responseText);
        }
    });
  });
});
