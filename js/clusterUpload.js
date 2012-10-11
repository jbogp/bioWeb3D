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
	


	//Creating World buttons		
	for(var j=0;j<worlds.length;j++) {

		//iterating on clustering sets
		for(var i=0;i<json.length;i++) {

			clustNum = datasets[datasetId].addClusterSet(new ClusterSet(json[i]));
			$("#worldSelectData"+datasetNum+"-"+(j+1)+"").append("<input type=\"checkbox\" class='worldButtonData"+datasetNum+"-"+(j+1)+"' id='worldButtonData"+datasetNum+"-"+(j+1)+"-"+(i+1)+"' /><label for='worldButtonData"+datasetNum+"-"+(j+1)+"-"+(i+1)+"'>"+datasets[datasetId].clusterSets[clustNum-1].name+"</label>");
			$("#worldButtonData"+datasetNum+"-"+(j+1)+"-"+(i+1)+"").button();
			//Creating the clusters div
			$("#worldButtonData"+datasetNum+"-"+(j+1)+"-"+(i+1)+"").bind("change",{world:j,dataset:datasetNum-1,clusterId:clustNum-1},function(event){
				// $this will contain a reference to the checkbox
				var $this = $(this);
				if ($this.is(':checked')) {
					//uncheck other non compatible buttons (same world same dataset)
					$(".worldButtonData"+(event.data.dataset+1)+"-"+(event.data.world+1)+"").attr("checked",false);
					//check this one though
					$this.attr("checked",true);
					$(".worldButtonData"+(event.data.dataset+1)+"-"+(event.data.world+1)+"").button("refresh");
					worlds[event.data.world].attachDataSet(datasets[event.data.dataset],event.data.dataset,event.data.clusterId);
					$this.val(event.data.dataset);

					//Clearing the cluster area
					$("#clusters"+(event.data.dataset+1)+"-"+(event.data.world+1)+"").empty();
					//Iterating over each cluster
					for(var k=0;k<datasets[event.data.dataset].clusterSets[event.data.clusterId].numClust;k++) {
						var checked = (datasets[event.data.dataset].clusterSets[event.data.clusterId].visible[k]) ? "checked" : "";
						$("#clusters"+(event.data.dataset+1)+"-"+(event.data.world+1)+"").append("<div style='background-color:"+colorsCSS[k]+";padding-left:8px'><input type='checkbox' "+checked+" id='clusters"+(event.data.dataset+1)+"-"+(event.data.world+1)+"-"+(k+1)+"'><label for='clusters"+(event.data.dataset+1)+"-"+(event.data.world+1)+"-"+(k+1)+"'> Cluster "+(k+1)+"</label></div>");
						$("#clusters"+(event.data.dataset+1)+"-"+(event.data.world+1)+"-"+(k+1)+"").bind("change",{world:event.data.world,dataset:event.data.dataset,clusterSet:event.data.clusterId,cluster:k}, function(event) {
							var $this = $(this);
							if ($this.is(':checked')) {
								datasets[event.data.dataset].clusterSets[event.data.clusterSet].visible[event.data.cluster] = true;
							}
							else {
								datasets[event.data.dataset].clusterSets[event.data.clusterSet].visible[event.data.cluster] = false;
							}
							worlds[event.data.world].refreshDataSets();
						});
					}
				} else {
					worlds[event.data.world].detachDataSet($this.val());
				}
			});
		}
		$("#worldSelectData"+datasetNum+"-"+(j+1)+"").append("<div id='clusters"+datasetNum+"-"+(j+1)+"'></div>");
			
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
