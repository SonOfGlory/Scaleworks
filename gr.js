// TODO: Missing CoffeeScript 2
// Begin of demo on FILESTACK
//<![CDATA[
  window.addEventListener('DOMContentLoaded', VanillaRunOnDomReady = function() {
  const yourAPIKey = "AkNBoRSpvSU2hZtcW1OE7z";
  // Set up the picker
  const client = filestack.init(yourAPIKey); //yourAPIKey
  const options = {
    fromSources: ['local_file_system', 'url', 'imagesearch'],
    onUploadDone: updateForm,
    maxFiles: 5,
    uploadInBackground: false,
  };
  const picker = client.picker(options);

  // Get references to the DOM elements

  const form = document.getElementById("pick-form");
  const fileInput = document.getElementById("fileupload");
  const pickerTrack = document.getElementById("picker");

  // Add our event listeners

  pickerTrack.addEventListener("click", function(e) {
    e.preventDefault();
    picker.open();
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Submitting: " + fileInput.value);
  });

  // Helper to overwrite the field input value

  function updateForm(result) {
    var fileData = result.filesUploaded
    var i
    for (var i=0; i<fileData.length; i++) {
      const fileData = result.filesUploaded[i];
      fileInput.value = fileData.url;
      var mainCont = document.getElementById("mainCont");

      let container 
      let thumbnailDiv
      // If file is resizable image, resize and embed it as a thumbnail preview
      if (
        ["jpeg", "png", "gif", "jpg"].indexOf(
          fileData.mimetype.split("/")[1]
        ) !== -1
      ) {
        container = document.createElement("div");
        container.classList.add("row");
        const link = document.createElement("a");
        thumbnailDiv = document.createElement("div");
        thumbnailDiv.classList.add("col");
        link.setAttribute("href", `${fileData.url}`);

        const thumbnail = new Image();
        thumbnail.id = "thumbnail";
        thumbnail.src = client.transform(fileData.handle, {
          resize: {
            width: 50
          }
        });
        thumbnailDiv.appendChild(link);
        link.appendChild(thumbnail);
        link.setAttribute("target", "_blank");

        }
      // If file is DOC type, generate a thumbnail preview. However this feature requires a paid plan.
      else if (
        ["PDF", "PPT", "doc"].indexOf(
          fileData.mimetype.split("/")[1]
        ) !== -1
      ) {
        container = document.createElement("div");
        container.classList.add("row");
        const link = document.createElement("a");
        thumbnailDiv = document.createElement("div");
        thumbnailDiv.classList.add("col");
        link.setAttribute("href", `${fileData.url}`);
    
        const thumbnail = document.getElementById("thumbnail") || new Image();
        thumbnail.id = "thumbnail";
        thumbnail.src = client.preview(fileData.handle, {id: "thumbnail"});
        link.appendChild(thumbnail);
        thumbnailDiv.appendChild(link);
        link.appendChild(thumbnail);
        link.setAttribute("target", "_blank");
        }
        
      // Some ugly DOM code to show some data.

      const name = document.createTextNode("Selected: " + fileData.filename);
      const url = document.createElement("a");
      url.href = fileData.url;
      url.appendChild(document.createTextNode(fileData.url));

      const nameBox = document.createElement("div");
      nameBox.classList.add("col");

      container.appendChild(thumbnailDiv)
      container.appendChild(nameBox)


      const urlBox = document.createElement("div");
      urlBox.classList.add("col");
    
      nameBox.appendChild(name);
      urlBox.appendChild(document.createTextNode("Uploaded to: "));
      urlBox.appendChild(url);

      container.appendChild(urlBox)
      mainCont.appendChild(container)

    }
  }
});
// End of expample function there https://jsfiddle.net/aj2edh1c/?utm_source=website&utm_medium=embed&utm_campaign=aj2edh1c&fbclid=IwAR2ZSVgG2NBJRU-ABPIdymisuAF1cuErFu6ms7BbqzeTPRVIrFbcyxnpTYI
var alreadyrunflag = 0;

if (document.addEventListener) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      alreadyrunflag = 1;
      VanillaRunOnDomReady();
    },
    false
  );
} else if (document.all && !window.opera) {
  document.write(
    '<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"></script>'
  );
  var contentloadtag = document.getElementById("contentloadtag");
  contentloadtag.onreadystatechange = function() {
    if (this.readyState == "complete") {
      alreadyrunflag = 1;
      VanillaRunOnDomReady();
    }
  };
}

// tell the embed parent frame the height of the content
if (window.parent && window.parent.parent) {
  window.parent.parent.postMessage(
    [
      "resultsFrame",
      {
        height: document.body.getBoundingClientRect().height,
        slug: "aj2edh1c"
      }
    ],
    "*"
  );
}

// always overwrite window.name, in case users try to set it manually
window.name = "result";

//]]>
