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
		//Detecting json, xml or CSV
		if(readFile.name.split('.').pop() == "json") { 
			//Reading Json and creating Object
			var json = eval('(' + fileString + ')').information;
			addClusterUI(datasetId,datasetNum,json);
		}
		else if(readFile.name.split('.').pop() == "xml") { 
			//Reading xml and creating Object
			var xml = $.parseXML(fileString);
			$xml = $( xml );
			var data = new Object();
			data.information = new Array();
			//Iterating on sets
			$xml.find("set").each(function(i,e) {
				//creating set object
				var thisSet = new Object();
				thisSet.name = $(e).find("name").text();
				thisSet.numClass = parseInt($(e).find("numClass").text());
				thisSet.labels = new Array();
				//iterating on labels if any (and enough)
				if($(e).find("label").length >= thisSet.numClass) {
					$(e).find("label").each(function(j,el) {			
						thisSet.labels.push($(el).text());
					});
				}
				else {
					for(i=0;i<thisSet.numClass;i++){
						thisSet.labels.push("Cluster "+(i+1));
					}
				}
				thisSet.values = new Array();
				//iterating on points
				$(e).find("value").each(function(j,el) {			
					thisSet.values.push(parseInt($(el).text()));
				});
				//Pushing set in the data object
				data.information.push(thisSet);
				
			});
			//Rendering cluster set in UI and visualization
			addClusterUI(datasetId,datasetNum,data.information);
		}
		else {
			//Reading CSV and creating Object
			var csv = new Object();
			csv.information = new Array();
			var information = $.csv.toArrays(fileString);

			//Building structure
			for(var j=0;j<information[0].length;j++) {
				csv.information[j] = new Object();
				csv.information[j].values = new Array();
			}

			for(var j=0;j<information[0].length;j++) {
				var clustSeen = new Array(); //Seen classes to count them
				for(var i=0;i<information.length;i++){
					csv.information[j].values[i] = Number(information[i][j]);
					//checking if element already seen
					if(clustSeen.indexOf(Number(information[i][j])) <= -1) {
						clustSeen.push(Number(information[i][j]));
					}
				}
				csv.information[j].numClass = clustSeen.length;
				csv.information[j].name = "Information set "+(j+1);

			}
			addClusterUI(datasetId,datasetNum,csv.information);			
		}
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
	var thisOneSelected = false;
	try {

		//iterating on clustering sets
		for(var i=0;i<json.length;i++) {

			clustNum = datasets[datasetId].addClusterSet(new ClusterSet(json[i]));
			select = false;

			//Creating World buttons		
			for(var j=0;j<worlds.length;j++) {
				thisOneSelected = false;


				//Loading first cluster set in visible worlds showing raw data of this dataset or if world is visible and empty
				if(i == 0) {
					if((worlds[j].isRaw(datasetId) || worlds[j].empty()) && worlds[j].visible && !select) {
						console.log("added information layer "+clustNum+" to world "+j);
						//attaching clusterset to world
						worlds[j].attachDataSet(datasets[datasetId],datasetId,clustNum-1);
						select = true;
						thisOneSelected = true;
					}
				}
		
			
				$("#worldButtonData"+datasetNum+""+(j+1)+"").append("<option class='clust' value='"+clustNum+"'>"+datasets[datasetId].clusterSets[clustNum-1].name+"</option>");

			
				//Creating the clusters div
				$("#worldSelectData"+datasetNum+"-"+(j+1)+"").append("<div id='clusters"+datasetNum+"-"+(j+1)+"'></div>");
				//updating dropdown menu if creation went well
				if(i == 0) {
					if(thisOneSelected) {
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
