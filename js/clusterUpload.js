function startReadCluster(element) {  
  // obtain input element through DOM 
  var file = document.getElementById(element).files[0];
  if(file){
    getClusterAsText(file,element.charAt(element.length-1));
  }
}

function getClusterAsText(readFile,datasetId) {
        
  var reader = new FileReader();

  var datasetNum = parseInt(datasetId)+1;
  var clustNum;
  
  // Read file into memory as UTF-8      
  reader.readAsText(readFile);
  // Handle progress, success, and errors
  reader.onprogress = updateClusterProgress;
  reader.onload = function (evt) {
	// Obtain the read file data    
	var fileString = evt.target.result;
	try {
		//Reading Json and creating Object
		var json = eval('(' + fileString + ')').information;
		addClusterUI(datasetId,datasetNum,json);
	}
	catch(e) {
		jsonError(e.message);
	}
  }
  reader.onerror = errorClusterHandler;
}


function addClusterUI (datasetId,datasetNum,json) {
	//Creating World buttons		
	for(var j=0;j<worlds.length;j++) {

		//iterating on clustering sets
		for(var i=0;i<json.length;i++) {

			clustNum = datasets[datasetId].addClusterSet(new ClusterSet(json[i]));
			$("#worldButtonData"+datasetNum+""+(j+1)+"").append("<option class='clust' value='"+clustNum+"'>"+datasets[datasetId].clusterSets[clustNum-1].name+"</option>");

			
			//Creating the clusters div
			$("#worldSelectData"+datasetNum+"-"+(j+1)+"").append("<div id='clusters"+datasetNum+"-"+(j+1)+"'></div>");
			//Loading first cluster set in visible worlds showing raw data of this dataset or if world is visible and empty
			if(i == 0) {
				if(worlds[j].isRaw(datasetId) || (worlds[j].visible && worlds[j].empty())) {
					//attaching clusterset to world
					worlds[j].attachDataSet(datasets[datasetId],datasetId,clustNum-1);
					//Selecting correct option in dropdownlist
					$("#worldButtonData"+datasetNum+""+(j+1)+" option[value='"+clustNum+"']").prop('selected',true);
					$("#worldButtonData"+datasetNum+""+(j+1)+"").change()
				}				
			}
		}

			
	}
	consoleMess("Loaded "+json.length+" cluster sets for dataset "+datasetNum);
	$('#clustAccordion'+datasetNum+'').accordion({ header: "h3" , heightStyle: "content"});
	$('#clustAccordion'+datasetNum+'').accordion( "refresh" );
	$("#accordionData").accordion( "refresh" );
	$("#accordion").accordion( "refresh" );
}

function updateClusterProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {

    }
  }
}


function errorClusterHandler(evt) {
  if(evt.target.error.name == "NotReadableErr") {
    alert("File format is wrong somehow");
  }
}
