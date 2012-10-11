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
		$("#worldSelectData"+index+"").append("<h2><a href=\"#\">world "+i+"</a></h2><div id='worldSelectData"+index+"-"+i+"'><input type=\"checkbox\" class='worldButtonData"+index+"-"+(i)+"' id='worldButtonData"+index+""+i+"' /><label for='worldButtonData"+index+""+i+"'>raw data</label><br /></div>");
		$("#worldButtonData"+index+""+i+"").bind("change",{world:i,dataset:index},function(event){
			// $this will contain a reference to the checkbox
			var $this = $(this);
			if ($this.is(':checked')) {
				//uncheck other non compatible buttons (same world same dataset)
				$(".worldButtonData"+(event.data.dataset)+"-"+(event.data.world)+"").attr("checked",false);
				//check this one though
				$this.attr("checked",true);
				$(".worldButtonData"+(event.data.dataset)+"-"+(event.data.world)+"").button("refresh");
				worlds[event.data.world-1].attachDataSet(datasets[event.data.dataset-1],event.data.dataset-1);
				$this.val(event.data.dataset-1);
				//Clearing the cluster area
				$("#clusters"+(event.data.dataset)+"-"+(event.data.world)+"").empty();
			} else {
				worlds[event.data.world-1].detachDataSet($this.val());
			}
		});
		$('#worldButtonData'+index+''+i+'').button();
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
	
      
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableErr") {
    alert("File format is wrong somehow");
  }
}
