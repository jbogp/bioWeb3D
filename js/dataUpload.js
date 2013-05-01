function startRead() {  
  // obtain input element through DOM 
  var test=1;
  var file = document.getElementById('newDataSet').files[0];
  if(file){
    consoleMess("Loading dataset...");
    getAsText(file);
  }
}

function getAsText(readFile) {
        
  var reader = new FileReader();
  // Read file into memory as UTF-8      
  reader.readAsText(readFile);
  

  //Lauching appropriate function depending on file type
  if(readFile.name.split('.').pop() == "json") { 
	  // Handle progress, success, and errors
	  reader.onprogress = updateProgress;
	  reader.onload = loadedJSON;
	  reader.onerror = errorHandler;
  }
  else if(readFile.name.split('.').pop() == "xml") {
	  // Handle progress, success, and errors
	  reader.onprogress = updateProgress;
	  reader.onload = loadedXML;
	  reader.onerror = errorHandler;
  }
  else {
	  // Handle progress, success, and errors
	  reader.onprogress = updateProgress;
	  reader.onload = loadedCSV;
	  reader.onerror = errorHandler;
  }
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {
    }
  }
}

function loadedJSON(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;
  try {
	  //Reading Json and creating Object
	  var data = eval('(' + fileString + ')').dataset;
	  var index = datasets.push(new DataSet(data));
	  //Adding dataSet to UI
	  addDataSetUI(index);
	}
  catch(e) {
	  jsonError(e.message);
 	}
      
}

function loadedCSV(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;
  try {
	  //Reading Json and creating Object
	  var data = new Object();
	  data.points = $.csv.toArrays(fileString);
	  var index = datasets.push(new DataSet(data));
	  //Adding dataSet to UI
	  addDataSetUI(index);
	}
  catch(e) {
	  jsonError(e.message);
 	}
      
}


function loadedXML(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;
  try {
	  //Reading xml and creating Object
	  var data = new Object();
	  var xml = $.parseXML(fileString);
	  $xml = $( xml );
    	  data.name =  $xml.find( "name" ).text();
	  data.chain = ($xml.find( "chain" ).text()  === 'true');
	  data.points = new Array();
	  $xml.find("point").each(
		function(i,e) {
			data.points.push([$(e).find("x").text(),$(e).find("y").text(),$(e).find("z").text()]);
		}
	  );
	  var index = datasets.push(new DataSet(data));
	  //Adding dataSet to UI
	  addDataSetUI(index);
	}
  catch(e) {
	  jsonError(e.message);
 	}
      
}


function addDataSetUI(index) {
  //Adding dataset to the UI
	//Create accordion
	$("#accordionData").append("<h3><a href='#'>"+datasets[index-1].name+"</a></h3><div id='worldDataAccordion"+index+"'>");
	$("#worldDataAccordion"+index+"").append("<div id='worldSelectData"+index+"'></div>");
	for(var i=1;i<=worlds.length;i++) {
		$("#worldSelectData"+index+"").append("<h2><a href=\"#\">world "+i+"</a></h2><div id='worldSelectData"+index+"-"+i+"'><select id='worldButtonData"+index+""+i+"'><option class='noaction'>Select Data</option><option class='raw'>Raw Data</option></select></div>");
		$("#worldButtonData"+index+""+i+"").bind("change",{world:i,dataset:index},selectDataHandler);
		if(worlds[i-1].visible && worlds[i-1].empty()) {
			console.log("added DataSet "+index+" to world "+i);
			//Viewing dataset in visible worlds
			worlds[i-1].attachDataSet(datasets[index-1],index-1);
			//selecting correct option in the dropdown list
			$("#worldButtonData"+index+""+i+" option[class='raw']").prop('selected',true).change();
		}


	}
	//create JqueryUI radio button
	$( "#worldSelectData"+index+"" ).accordion({header: "h2", heightStyle: "content"});
	
	//Appening input file to import cluster data
	$("#worldDataAccordion"+index+"").append("<div id='clustAccordion"+index+"'></div>");
	$("#worldDataAccordion"+index+"").append("Add cluster data : <input class='clusterFile' id='clusterFile"+(index-1)+"' type='file'>");
	$("#worldDataAccordion"+index+"").append("</div>");
	$("#accordionData").accordion({ header: "h3" , heightStyle: "content"});
	$("#accordionData").accordion('destroy');
	$("#accordionData").accordion({active: (index-1), header: "h3" , heightStyle: "content"});
	$("#accordion").accordion( "refresh" );
	consoleMess("Loaded dataset \""+datasets[index-1].name+"\" containing "+datasets[index-1].points.length+" points");
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableErr") {
	consoleMess("Could not read this file ? Wrong permissions ?");
  }
}
