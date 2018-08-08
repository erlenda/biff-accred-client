var Promise = window.Promise;
if (!Promise) {
    Promise = JSZip.external.Promise;
}

/**
 * Fetch the content and return the associated promise.
 * @param {String} url the url of the content to fetch.
 * @return {Promise} the promise containing the data.
 */
function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

$("form#data").bind('submit', function (e) {
    var zip = new JSZip();

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
        zip.loadAsync(response)
        .then(function callback(zip) {
            console.log(zip.files);
        });
    });
  });