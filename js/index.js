$("form#data").bind('submit', function (e) {
    var zip = new JSZip();

    function str2bytes (str) {
        var bytes = new Uint8Array(str.length);
        for (var i=0; i<str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

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
  
    $.ajax(settings).done(function(myData) {
        var blob = new Blob([str2bytes(myData)], {type: "application/zip"});
        saveAs(blob, "response.zip"); 
    });
    
      
    // $.ajax(settings).done(function (response) {
    //     zip.loadAsync(response)
    //     .then(function callback(zip) {
    //         console.log(zip.files);
    //     });
    // });
});