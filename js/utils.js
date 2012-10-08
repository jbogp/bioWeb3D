/***************************************************************************
			UTILS FUNCTIONS
***************************************************************************/

	//Shorten the vertex function
	function v(x,y,z){ 
		return new THREE.Vector3(x,y,z); 
	}

	//Initializing Three.js renderer
	function initRenderer(width,height) {
		//Creating application Three.js renderer
		renderer = new THREE.WebGLRenderer({ antialias: true });

		//Creating new DOM element
		container = document.createElement('div');
		document.body.appendChild(container);

		//Settin renderer size and adding to the DOM
		renderer.autoClear = false;
		renderer.setSize(width, height );
		container.appendChild( renderer.domElement );
		
		
		//Binding to UI elements so camera won't move while manipulating UI
		$('.UI').live("mouseover",function(event){
			controlsOff();			
		});
		
		
		//Binding to UI elements so camera restarts when exiting UI
		$('.UI').live("mouseout",function(event){
			controlsOn();			
		});
	}
	
	//Initializing UI elements
	function initUI() {
		//Create sliders
		$( "#sliderX" ).slider({
		});
		$( "#sliderY" ).slider({
		});
		$( "#sliderZ" ).slider({
		});
		
		//Create accordions
		$("#accordion").accordion({ header: "h3" });
		$("#worldAccordion").buttonset();
		
		
		//Bind events 
		$(".UIControl").bind("click", function (event) {
			//Show/hide UI
			$(".UI").fadeToggle('slow');
		});
		
		$("#newDataSet").bind("change", function (event) {
			startRead();
		});
		
		$(".checkWorld").bind("change",function (event) {
			var $this = $(this);
			worlds[$this.val()].toggle();
			console.log($this.val());
			numWorlds = $(".checkWorld:checked").length;
			setWorlds();
		});
		
	}
	


	
	//Render all created worlds
	function renderWorlds () {
		for(var i=0;i<worlds.length;i++) {
			if(worlds[i].visible){
				worlds[i].render();
			}
		}
	}
	
	//Different world number options from 1 to 4
	function setWorlds () {
		var coord = new Array();
		var coordNum = 0;
		var i =0;
		if(numWorlds == 1) {
			coord = [[winWidth,winHeight,0,0]];
		}
		else if(numWorlds == 2) {
			coord = [[winWidth,winHeight/2,0,0],[winWidth,winHeight/2,0,winHeight/2]];
		}
		else if(numWorlds == 3) {
			coord = [[winWidth,winHeight/2,0,0],[winWidth/2,winHeight/2,0,winHeight/2],[winWidth/2,winHeight/2,winWidth/2,winHeight/2]];
		}
		else if (numWorlds == 4) {
			coord = [[winWidth/2,winHeight/2,0,0],[winWidth/2,winHeight/2,winWidth/2,0],[winWidth/2,winHeight/2,0,winHeight/2],[winWidth/2,winHeight/2,winWidth/2,winHeight/2]];
		}
		else {
			alert("invalid number of worlds");
		}
		
		while(coordNum < numWorlds) {
			if(worlds[i].visible) {
				console.log(numWorlds);
				worlds[i].changeSize(coord[coordNum][0],coord[coordNum][1],coord[coordNum][2],coord[coordNum][3]);
				coordNum++;
			}
			i++;
		}
	}

	//Cut all controls
	function controlsOff () {

		for(var i=0;i<worlds.length;i++) {
			worlds[i].disableControls();
		}
	}

	//turn on all controls
	function controlsOn () {
		for(var i=0;i<worlds.length;i++) {
			worlds[i].enableControls();
		}
	}


	//Load Data From Json File
	function dataSetFactory(data,jsonFile) {
		$.getJSON(jsonFile,function(json) {
			console.log(json.cell[0][1]);
			data = new DataSet();
			data.set = json.cell;
		});	
	}

 
