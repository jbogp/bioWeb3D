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
	//Reading Json and creating Object
	var json = eval('(' + fileString + ')').cluster;
	
	//iterating on clustering sets
	for(var i=0;i<json.length;i++) {
		clustNum = datasets[datasetId].addClusterSet(new ClusterSet(json[i]));
		$('#clustAccordion'+datasetNum+'').append("<h3><a href=\"#\">Cluster set "+(clustNum)+"</a></h3><div id='contentClustAccordion"+datasetNum+"-"+clustNum+"'></div>");
		$("#contentClustAccordion"+datasetNum+"-"+clustNum+"").append("<div style='display:inline' id='buttonsClustAccordion"+datasetNum+"-"+clustNum+"'></div>");
		//Creating World buttons		
		for(var j=0;j<worlds.length;j++) {
			$("#buttonsClustAccordion"+datasetNum+"-"+clustNum+"").append("<input type='checkbox' id='worldSelectClustAccordion"+datasetNum+"-"+clustNum+"-"+j+"' /><label for='worldSelectClustAccordion"+datasetNum+"-"+clustNum+"-"+j+"'>world "+j+"</label>");
			$("#worldSelectClustAccordion"+datasetNum+"-"+clustNum+"-"+j+"").bind("change",{world:j,dataset:datasetId,clusterId:clustNum-1},function(event){
				console.log("world"+event.data.world+" dataset"+event.data.dataset+" cluster"+event.data.clusterId);
			});
		}
		$( "#buttonsClustAccordion"+datasetNum+"-"+clustNum+"" ).buttonset();
		//Iterating over each cluster
		for(var j=0;j<datasets[datasetId].clusterSets[clustNum-1].numClust;j++) {
			$("#contentClustAccordion"+datasetNum+"-"+clustNum+"").append("<div style='background-color:"+colorsCSS[j]+"'> Cluster "+j+"</div>");
		}
			
	}
	$('#clustAccordion'+datasetNum+'').accordion({ header: "h3" });
	$('#clustAccordion'+datasetNum+'').accordion( "refresh" );
	$("#accordionData").accordion( "refresh" );
	$("#accordion").accordion( "refresh" );

	  
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
