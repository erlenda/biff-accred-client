$("form#data").bind('submit', function (e) {
    //$("form#data").submit(function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var apiKey = formData.get("apikey");
    //form.append("filename", "Persons.xlsx");
      
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
  
    $.ajax(settings).done(function (response) {
      JSZip.loadAsync(response)
      .then(function callback(zip) {
          console.log(zip.files);
      });
    });
  });