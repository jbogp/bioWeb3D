/***************************************************************************
			LABEL MANAGEMENT CLASSES
***************************************************************************/
	var defaultLabel = ["x","x","z","z","y","y"];

	//Defining Label
	function Label2D(text,geometry,vector,size,weight){

		this.vector = vector;
		this.text = text;

		geometry.vertices.push( this.vector );
		//Creating DOM element
		this.DOM = document.createElement( 'div' );
		this.DOM.style.position = 'absolute';
		this.DOM.style.background = '#0000000';
		this.DOM.style.color = '#ffffff';
		this.DOM.style.height = '20px';
		this.DOM.style.width = '50px';
		this.DOM.innerHTML = text;
		//Adding style if defined
		try {
			this.DOM.style.fontSize = size+"px";
			this.DOM.style.fontWeight= weight;
		}
		catch(e){}

		document.body.appendChild(this.DOM);
		

		//Show Label
		this.show = function() {
			this.DOM.style.display = '';
		}

		//Hide Label
		this.hide = function() {
			this.DOM.style.display = 'none';			
		}

		//Positioning Label on page
		this.setPos = function(x,y) {
			this.DOM.style.left = x + 'px';
			this.DOM.style.top = y + 'px';
		}


		//Edit mode for axis Label
		this.enterEditMode = function(event) {
			//unbind dblclick event
			$(event.data.object.DOM).unbind("dblclick");
			//clear div
			$(event.data.object.DOM).empty();
			//add input box
			$(event.data.object.DOM).append('<input class="UI" id="changeLabel" value="test" type="text">');
			//bind dblclick to validate new input
			$(event.data.object.DOM).bind("dblclick", {object : event.data.object} ,function(event) {
				//Get new value
				event.data.object.text = $('#changeLabel').val();
				//Clear div
				$(event.data.object.DOM).empty();
				//Set new text
				$(event.data.object.DOM).text(event.data.object.text);
				//Rebind dbclick event
				$(event.data.object.DOM).bind("dblclick", {object : event.data.object} ,event.data.object.enterEditMode);
				//Restart camera controls
				controlsOn();
;
			});
		}

		//Binding listeners
		$(this.DOM).bind("dblclick", {object : this} ,this.enterEditMode);


		


	}

	//Defining WorldLabelSet
	function WorldLabelSet(world,labelValues){


		//default labels
		if(typeof labelValues == 'undefined') {
			labelValues = defaultLabel;
		}

		this.labelGeometry = new THREE.Geometry();
		this.labelSet = new Array();
		this.projector = new THREE.Projector();
		this.worldLabelgeometry = new THREE.Geometry();
		this.worldLabel = new Label2D(world.id,this.worldLabelgeometry,v(10, 10, 0),20,700);

		
		//Creating 2D labels
		this.labelSet.push(new Label2D(labelValues[0],this.labelGeometry,v(-axisLength, 0, 0)));
		this.labelSet.push(new Label2D(labelValues[1],this.labelGeometry,v(axisLength, 0, 0)));
		this.labelSet.push(new Label2D(labelValues[2],this.labelGeometry,v(0, -axisLength, 0)));
		this.labelSet.push(new Label2D(labelValues[3],this.labelGeometry,v(0, axisLength, 0)));
		this.labelSet.push(new Label2D(labelValues[4],this.labelGeometry,v(0, 0, -axisLength)));
		this.labelSet.push(new Label2D(labelValues[5],this.labelGeometry,v(0, 0, axisLength)));



		//Creating Particle System with labels
		this.particleSystem = new THREE.ParticleSystem(this.labelGeometry,this.labelMaterial);
		world.scene.add(this.particleSystem);
		


		this.vecGeoLabs = new Array();
		
		this.hideAll = function() {
			this.worldLabel.hide();
			for(var i=0;i<this.labelSet.length;i++){
				this.labelSet[i].hide();
			}
		
		}

		this.render = function() {
			var x = new Array();
			var y = new Array();

			//Rendering worldLabel
			this.worldLabel.setPos(10+world.x,winHeight-(world.innerHeight+world.y)+40);

			//Loop on labels 2 by two because we don't want to show the one behind the camera
			for(var i=0;i<6;i=i+2){
				this.vecGeoLabs[i] =  this.projector.projectVector( this.particleSystem.geometry.vertices[i].clone(), world.camera );
				this.vecGeoLabs[i+1] =  this.projector.projectVector( this.particleSystem.geometry.vertices[i+1].clone(), world.camera );
				if(Math.abs(this.vecGeoLabs[i].x) < Math.abs(this.vecGeoLabs[i+1].x)) {
					this.labelSet[i+1].hide();
					this.labelSet[i].show();
				}
				else {
					this.labelSet[i+1].show();
					this.labelSet[i].hide();
				}
				
				//limiting showing labels to scene
				if((this.vecGeoLabs[i].x * (world.innerWidth/2) + (world.innerWidth/2)+world.x) > (world.innerWidth+world.x) || (this.vecGeoLabs[i].x * (world.innerWidth/2) + (world.innerWidth/2)+world.x) < (world.x)) {
					this.labelSet[i].hide();
				}
				if((this.vecGeoLabs[i+1].x * (world.innerWidth/2) + (world.innerWidth/2)+world.x) > (world.innerWidth+world.x) || (this.vecGeoLabs[i+1].x * (world.innerWidth/2) + (world.innerWidth/2)+world.x) < (world.x)) {
					this.labelSet[i+1].hide();
				}

				if((this.vecGeoLabs[i].y* +(world.innerHeight/2) + (world.innerHeight/2)+world.y) > (world.innerHeight+world.y) || (this.vecGeoLabs[i].y * (world.innerHeight/2) + (world.innerHeight/2)+world.y) < (world.y)) {
					this.labelSet[i].hide();
				}
				if((this.vecGeoLabs[i+1].y* +(world.innerHeight/2) + (world.innerHeight/2)+world.y) > (world.innerHeight+world.y) || (this.vecGeoLabs[i+1].y * (world.innerHeight/2) + (world.innerHeight/2)+world.y) < (world.y)) {
					this.labelSet[i+1].hide();
				}
				
				

				//Updating labels positions
				this.labelSet[i].setPos((this.vecGeoLabs[i].x * (world.innerWidth/2) + (world.innerWidth/2)+world.x),
					winHeight-(this.vecGeoLabs[i].y* +(world.innerHeight/2) + (world.innerHeight/2)+world.y));
				this.labelSet[i+1].setPos((this.vecGeoLabs[i+1].x * (world.innerWidth/2) + (world.innerWidth/2)+world.x),
					winHeight-(this.vecGeoLabs[i+1].y* +(world.innerHeight/2) + (world.innerHeight/2)+world.y));
			}
			
		}
		//construct 
		if(!world.visible) {
			this.hideAll();
		}
	}

