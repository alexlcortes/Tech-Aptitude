
// Code used to upload a file.
$('#uploadButton').click(function(){

//$('#upload-input').on('change', function(){
 //var files = $(this).get(0).files;
 var files = $('#upload-input').get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
      }
    });

    $('#uploaded').html("<p id='fileUpload'>File was uploaded!</p>");

  } else {
    $('#uploaded').html("<p id='fileEmpty'>Choose a file to upload!</p>");
  }

});




$('#submit1, #submit2').click(function () {
    if (this.id == 'submit1') {
        alert('Submit 1 clicked');
    }
    else if (this.id == 'submit1') {
        alert('Submit 2 clicked');
    }
});