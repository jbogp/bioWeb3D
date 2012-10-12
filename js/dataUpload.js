function startRead() {  
  // obtain input element through DOM 
  
  var file = document.getElementById('newDataSet').files[0];
  if(file){
    getAsText(file);
  }
}

function getAsText(readFile) {
        
  var reader = new FileReader();
  
  // Read file into memory as UTF-8      
  reader.readAsText(readFile);
  
  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;
  //Reading Json and creating Object
  var index = datasets.push(new DataSet());
  datasets[index-1].setPoints(eval('(' + fileString + ')').cell);
  datasets[index-1].loaded = true;
  //Adding dataset to the UI
	//Create accordion
	$("#accordionData").append("<h3><a href='#'>Dataset #"+index+"</a></h3><div id='worldDataAccordion"+index+"'>");
	$("#worldDataAccordion"+index+"").append("<div id='worldSelectData"+index+"'></div>");
	for(var i=1;i<=worlds.length;i++) {
		$("#worldSelectData"+index+"").append("<h2><a href=\"#\">world "+i+"</a></h2><div id='worldSelectData"+index+"-"+i+"'><select id='worldButtonData"+index+""+i+"'><option class='noaction'>Select Data</option><option class='raw'>Raw Data</option></select></div>");
		$("#worldButtonData"+index+""+i+"").bind("change",{world:i,dataset:index},selectDataHandler);
	}
	//create JqueryUI radio button
	$( "#worldSelectData"+index+"" ).accordion({header: "h2", heightStyle: "content"});
	
	//Appening input file to import cluster data
	$("#worldDataAccordion"+index+"").append("<div id='clustAccordion"+index+"'></div>");
	$("#worldDataAccordion"+index+"").append("Add cluster data : <input class='clusterFile' id='clusterFile"+(index-1)+"' type='file'>");
	$("#worldDataAccordion"+index+"").append("</div>");
	$("#accordionData").accordion({ header: "h3" });
	$("#accordionData").accordion('destroy');
	$("#accordionData").accordion({ header: "h3" });
	$("#accordion").accordion( "refresh" );
	consoleMess("Loaded dataset #"+index+" containing "+datasets[index-1].points.length+" points");
	
      
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableErr") {
    alert("File format is wrong somehow");
  }
}
