function startReadCluster(element) {  
  // obtain input element through DOM 
  
  var file = document.getElementById(element).files[0];
  if(file){
    getClusterAsText(file,element);
  }
}

function getClusterAsText(readFile,element) {
        
  var reader = new FileReader();
  
  // Read file into memory as UTF-8      
  reader.readAsText(readFile);
  
  // Handle progress, success, and errors
  reader.onprogress = updateClusterProgress;
  reader.onload = function (evt) {
	  // Obtain the read file data    
	  var fileString = evt.target.result;
	  //Reading Json and creating Object
	  alert(element);
  }
  reader.onerror = errorClusterHandler;
}

function updateClusterProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}


function errorClusterHandler(evt) {
  if(evt.target.error.name == "NotReadableErr") {
    alert("File format is wrong somehow");
  }
}
