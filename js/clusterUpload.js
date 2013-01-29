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
		if(e.message == "ParticleSystem error") {
			consoleMess("Error while loading data :"+e.message);
		}
		else {
			jsonError(e.message);
		}
	}


  }
  reader.onerror = errorClusterHandler;
}


function addClusterUI (datasetId,datasetNum,json) {
	var select = false;
	try {
		//Creating World buttons		
		for(var j=0;j<worlds.length;j++) {
			//select = false

			//iterating on clustering sets
			for(var i=0;i<json.length;i++) {

				clustNum = datasets[datasetId].addClusterSet(new ClusterSet(json[i]));
				//Loading first cluster set in visible worlds showing raw data of this dataset or if world is visible and empty
				if(i == 0) {
					if((worlds[j].isRaw(datasetId) || worlds[j].empty()) && worlds[j].visible && select == false) {
						//attaching clusterset to world
						worlds[j].attachDataSet(datasets[datasetId],datasetId,clustNum-1);
						select = true;
					}
				}
			
				
				$("#worldButtonData"+datasetNum+""+(j+1)+"").append("<option class='clust' value='"+clustNum+"'>"+datasets[datasetId].clusterSets[clustNum-1].name+"</option>");

				
				//Creating the clusters div
				$("#worldSelectData"+datasetNum+"-"+(j+1)+"").append("<div id='clusters"+datasetNum+"-"+(j+1)+"'></div>");
				//updating dropdown menu if creation went well
				if(i == 0) {
					if(select) {
						//Selecting correct option in dropdownlist
						$("#worldButtonData"+datasetNum+""+(j+1)+" option[value='"+clustNum+"']").prop('selected',true);
						$("#worldButtonData"+datasetNum+""+(j+1)+"").change()
					}				
				}
			}

				
		}
		consoleMess("Loaded "+json.length+" cluster sets for dataset \""+datasets[datasetId].name+"\"");
		$('#clustAccordion'+datasetNum+'').accordion({ header: "h3" , heightStyle: "content"});
		$('#clustAccordion'+datasetNum+'').accordion( "refresh" );
		$("#accordionData").accordion( "refresh" );
		$("#accordion").accordion( "refresh" );
	}
	catch(e) {}
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
