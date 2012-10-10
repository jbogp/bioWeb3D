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
		$("#contentClustAccordion"+datasetNum+"-"+clustNum+"").append("<div style='display:inline' class='worldSelectButton' id='buttonsClustAccordion"+datasetNum+"-"+clustNum+"'></div>");
		//Creating World buttons		
		for(var j=0;j<worlds.length;j++) {
			$("#buttonsClustAccordion"+datasetNum+"-"+clustNum+"").append("<input type='checkbox' class='worldSelect"+(datasetNum-1)+"-"+j+"' id='worldSelectClustAccordion"+datasetNum+"-"+clustNum+"-"+j+"' /><label for='worldSelectClustAccordion"+datasetNum+"-"+clustNum+"-"+j+"'>world "+(j+1)+"</label>");
			$("#worldSelectClustAccordion"+datasetNum+"-"+clustNum+"-"+j+"").bind("change",{world:j,dataset:datasetNum-1,clusterId:clustNum-1},function(event){
				// $this will contain a reference to the checkbox
				var $this = $(this);
				if ($this.is(':checked')) {
					//uncheck other non compatible buttons (same world same dataset)
					console.log($this.prop("checked",true).length);
					$(".worldSelect"+(event.data.dataset)+"-"+(event.data.world)+"").attr("checked",false);
					//check this one though
					$this.attr("checked",true);
					$('.worldSelectButton').buttonset("refresh");
					worlds[event.data.world].attachDataSet(datasets[event.data.dataset],event.data.dataset,event.data.clusterId);
					$this.val(event.data.dataset);
				} else {
					worlds[event.data.world].detachDataSet($this.val());
				}
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
