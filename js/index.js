$("form#data").bind('submit', function (e) {
    var zip = new JSZip();

    e.preventDefault();
    var formData = new FormData(this);
    var apiKey = formData.get("apikey");
          
    var settings = {
      "async": true,
      "url": "https://accredservice.azurewebsites.net/accred/crunch",
      "method": "POST",
      "headers": {
        "apikey": apiKey,
        "cache-control": "no-cache"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": formData
    }
  
    $.ajax(settings)
    .then(zip.loadAsync)
    .then(function(zip) {
        console.log(zip.files);
        window.location = zip;
    });
      
    // $.ajax(settings).done(function (response) {
    //     zip.loadAsync(response)
    //     .then(function callback(zip) {
    //         console.log(zip.files);
    //     });
    // });
});