(function() {
  var percent = 0;
})();

$('#download').click(function() {
    var that = this;
    /*var page_url = 'http://wap.moblin.com/winner/Download.aspx?token=EBCD08B6M5D57M45EEM865DL629FABD48922';*/
    var page_url = 'https://moblincontentstore.blob.core.windows.net/friskies/progressbar/wetransfer-eb7c49.zip';
    

    var req = new XMLHttpRequest();
    
    req.open("GET", page_url, true);
    req.setRequestHeader("Content-Type","application/zip");
    req.addEventListener("progress", function (evt) {
        if(evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100;
            $('.precent').html(percentComplete);
            
            setProgress('.c100', (percentComplete));
        }
    }, false);

    req.responseType = "blob";
    
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var filename = $(that).data('filename');
            console.log($(that));
            if (typeof window.chrome !== 'undefined') {
                console.log('chrome - ' + filename);
                // Chrome version
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(req.response);
                link.download = filename;
                link.click();
            } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                console.log('ms - ' + filename);
                // IE version
                var blob = new Blob([req.response], { type: 'application/force-download' });
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // Firefox version
                console.log('ff - ' + filename);
                var file = new File([req.response], filename, { type: 'application/force-download' });
                window.open(URL.createObjectURL(file));
            }
        }
    };
    req.send();
});


function setProgress(elem, percent) {
    $(elem).find('span').html(parseInt(percent) + '%');
    $(elem).attr('class', 'c100 p' + parseInt(percent));
}
