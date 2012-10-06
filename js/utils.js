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
		
		//Create accordion
		$("#accordion").accordion({ header: "h3" });
		
		
		//Bind events 
		$(".UIControl").bind("click", function (event) {
			//Show/hide UI
			$(".UI").fadeToggle('slow');
		});
		
		$("#newDataSet").bind("change", function (event) {
			startRead();
		});
	}


	
	//Render all created worlds
	function renderWorlds () {
		for(var i=0;i<worlds.length;i++) {
			worlds[i].render();
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

 
