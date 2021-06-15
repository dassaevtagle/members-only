import '../scss/styles.scss';
import $ from './jquery';

$(function () {
  $('.deletePost').on('click', function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: '/members/delete/' + id,
      success: function (res) {
        alert('Deleted!' + res._id);
        $(`div[data-id=message_${id}]`).remove();
      },
      error: function (err) {
        alert(err.responseText);
      }
    });
  });

  $("#newPostForm").hide();

  $("#newPostBtn").click(function(){
    $("#newPostForm").show();
    $(this).hide();
  });

  $("#closeNewPost").click(function(e){
    e.preventDefault();
    $("#newPostForm").hide();
    $("#newPostBtn").show();
  });

  $("#closeNewPost2").click(function(e){
    e.preventDefault();
    $("#newPostForm").hide();
    $("#newPostBtn").show();
  });
  /* 
   * Love button for Design it & Code it
   * http://designitcodeit.com/i/9
   */
  $('.btn-counter').on('click', function (event, count) {
    event.preventDefault();

    var $this = $(this),
      count = $this.attr('data-count'),
      active = $this.hasClass('active'),
      multiple = $this.hasClass('multiple-count');

    // First method, allows to add custom function
    // Use when you want to do an ajax request
    /* if (multiple) {
    $this.attr('data-count', ++count);
    // Your code here
    } else {
    $this.attr('data-count', active ? --count : ++count).toggleClass('active');
    // Your code here
    } */

    // Second method, use when ... I dunno when but it looks cool and that's why it is here
    $.fn.noop = $.noop;
    $this.attr('data-count', !active || multiple ? ++count : --count)[multiple ? 'noop' : 'toggleClass']('active');

  });
});