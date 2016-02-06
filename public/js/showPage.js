'use strict';

$(function() {
  $('#images').on('click', 'img', deleteImage);
});

function deleteImage() {
  var $image = $(this);
  var imageId = $image.data('id');
  var albumId = location.pathname.match(/[^/]+$/)[0];
  $.ajax({
    url: `/albums/${albumId}/${imageId}`
    method: "Delete"
  })
  .success(function(data) {
    $image.remove();
    console.log('data', data);
  })
  .fail(function(data) {
    console.log('data', data);
  });
}