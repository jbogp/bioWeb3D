			//NORMALIZE TO get the picture centered on 0
			function normalize(limit) {
						var max = new Array();
						max[0]=0;max[1]=0;max[2]=0;
							//finding maximums
							for (var i = 0; i < nbcubes; i++) {
								if(cell[i][0] > max[0]) {
									max[0] = cell[i][0];
								}
								if(cell[i][1] > max[1]) {
									max[1] = cell[i][1];
								}
								if(cell[i][2] > max[2]) {
									max[2] = cell[i][2];
								}
							}
							
							for (var i = 0; i < nbcubes; i++) {
								for(var j = 0; j < 3; j++) {
										cell[i][j] = ((cell[i][j]/max[j])*(limit*2)-limit)*normCoef[j];
								}
							}
			}
			
			
			
			function loadSet(set){
			
				var particles, particle,check;
				//removing current set
				for(var i=1;i<=nbclust;i++) {
					scene.remove(particleSystem[i]);
					geometry[i] = new THREE.Geometry();
				}
				$('.clusters').empty();
				$('.clusters').append("Display clusters :</br>");
				
				method = set;


				for (var i = 0; i < nbcubes; i++) {
						var pX =  cell[i][0],
						pY =  cell[i][1],
						pZ =  cell[i][2],
						particle = new THREE.Vector3(pX, pY, pZ);

						geometry[clustData[set][i]].vertices.push( particle );
				}

				
				
				// create the particle systems
				for(var i=1;i<=nbclust;i++) {
				

						
						particleSystem[i] = new THREE.ParticleSystem(geometry[i],material[i]);
						
						if(visible[i]) {
							check = "checked";
							particleSystem[i].visible=true;
						}
						else{
							check = "";
							particleSystem[i].visible=false;
						}
						
						//adding the controls to the page 
						$('.clusters').append("<div class='clustcheck' style='background-color:"+colorsCSS[i]+"'><input type='checkbox' onClick='toggleCluster("+i+")' "+check+"> Cluster "+i+"</div>");
						scene.add(particleSystem[i]);
				}
					

			}
			
			
			function toggleCluster(id){
				if(visible[id]) {
					//particleSystem[id].visible=false;
					particleSystem[id].material=inviMat;
					visible[id] = false;
				}
				else{
					particleSystem[id].material=material[id];
					visible[id] = true;
				}
					
			}
			
			
			
			$(function() {
				$( "#sliderX" ).slider({
				});
				$( "#sliderY" ).slider({
				});
				$( "#sliderZ" ).slider({
				});

			});

			function init() {

				var container, separation = 100, amountX = 50, amountY = 50;
				container = document.createElement('div');
				document.body.appendChild(container);

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
				camera.position.z = 600;
				camera.position.x = 600;
				camera.position.y = 600;
				
				
				camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
				camera2.position.z = 600;
				camera2.position.x = 600;
				camera2.position.y = 600;

				scene = new THREE.Scene();
				scene2 = new THREE.Scene();

				scene.add( camera );
				scene2.add( camera2 );
				controls = new THREE.TrackballControls( camera );
				

				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				// particles

				var PI2 = Math.PI * 2;


				//creating invisible material
				inviMat =  new THREE.ParticleBasicMaterial({
				    color: 0xffffff,
					size: 10.0,
					opacity:0.05,
					blending: THREE.NormalBlending,
					transparent: true
				  });


				//starting from 1 because no cluster 0
				for(var i=1;i<=nbclust;i++) {
					
					material[i] =  new THREE.ParticleBasicMaterial({
				    color: colors[i],
					size: 10,
					opacity:0.5,
					//map: THREE.ImageUtils.loadTexture(
					//  "images/particle.png"
					//),
					blending: THREE.NoBlending,
					transparent: true
				  });
				}
			
			normalize(400);
			loadSet(0);

			//draw axis
			
			function addLabel(texte){
				var text = document.createElement( 'div' );
				text.style.position = 'absolute';
				text.style.background = '#0000000';
				text.style.color = '#ffffff';
				text.style.height = '20px';
				text.style.width = '50px';
				text.innerHTML = texte;
				document.body.appendChild(text);
				return text;
			}
			
			labels[0] = addLabel("lateral");
			labels[1] = addLabel("medial");
			labels[2] = addLabel("versal");
			labels[3] = addLabel("dorsal");
			labels[4] = addLabel("anterior");
			labels[5] = addLabel("posterior");
			debugaxis(4200);

				
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'keydown', onDocumentKeyDown, false );
				document.addEventListener( 'keyup', onDocumentKeyUp, false );
				document.getElementById('UI').addEventListener('mouseover',onDivOver,false);
				document.getElementById('UI').addEventListener('mouseout',onDivOut,false);
			}

			//
			var MouseDown = false;
			var KeyDown = false;
			var dir = 0;
			var pivotx,pivoty;
			pivotz = mouseX;
			pivotx = mouseX;
			pivoty = mouseY;


			var debugaxis = function(axisLength){
			    //Shorten the vertex function
			    function v(x,y,z){ 
				    return new THREE.Vector3(x,y,z); 
			    }
				
				
			    //Create axis (point1, point2, colour)
			    function createAxis(p1, p2, color){
				    var line, lineGeometry = new THREE.Geometry(),
				    lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
				    lineGeometry.vertices.push(p1, p2);
				    line = new THREE.Line(lineGeometry, lineMat);
				    scene.add(line);
					scene2.add(line);
			    }
				geometry2.vertices.push( v(-axisLength, 0, 0) );
				geometry2.vertices.push( v(axisLength, 0, 0) );
				geometry2.vertices.push( v(0, -axisLength, 0) );
				geometry2.vertices.push( v(0, axisLength, 0) );
				geometry2.vertices.push( v(0, 0, -axisLength) );
				geometry2.vertices.push( v(0, 0, axisLength) );
				

				particleSystemAxis = new THREE.ParticleSystem(geometry2,inviMat);
				scene.add(particleSystemAxis);
				
			    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFFFFFF);
			    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0xFFFFFF);
			    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0xFFFFFF);
			};


			function onDivOver(event) {
				controls.enabled = false;
			}
			
			
			function onDivOut(event) {
				controls.enabled = true;
			}

			function onDocumentMouseMove(event) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentMouseUp(event) {
					MouseDown = false;
					pivotz = mouseX;
			}

			function onDocumentMouseDown(event) {
				pivotz = mouseX;
				MouseDown = true;
			}
			
			function onDocumentKeyDown(e) {
				var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
				var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
				if (unicode==38){
					dir = 1;
				}
				else if (unicode==40){
					dir = 2;
				}
				if(dir !== 0){
					KeyDown = true;
				}
				
			}
			
			function onDocumentKeyUp(event) {
				if(KeyDown){
					KeyDown = false;
					dir=0;
				}
			}

			function onDocumentTouchStart( event ) {
					if ( event.touches.length > 1 ) {

						event.preventDefault();

						mouseX = event.touches[ 0 ].pageX - windowHalfX;
						mouseY = event.touches[ 0 ].pageY - windowHalfY;

					}
			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

					controls.update();
				if(KeyDown){
				
					if (dir == 1){
						camera.fov = camera.fov-1;
						camera.updateProjectionMatrix();
					}
					else if (dir ==2){
						camera.fov = camera.fov+1;
						camera.updateProjectionMatrix();
					}
					
				}
				//change camera only if not manipulating the controls
				var i;
				for(i=0;i<6;i=i+2){
					
					vecGeoLabs[i] =  projector.projectVector( particleSystemAxis.geometry.vertices[i].clone(), camera );
					vecGeoLabs[i+1] =  projector.projectVector( particleSystemAxis.geometry.vertices[i+1].clone(), camera );
					if(Math.abs(vecGeoLabs[i].x) < Math.abs(vecGeoLabs[i+1].x)) {
						labels[i+1].style.display = 'none';
						labels[i].style.display = '';
					}
					else {
						labels[i+1].style.display = '';
						labels[i].style.display = 'none';
					}
					labels[i].style.left = (vecGeoLabs[i].x * (renderer.domElement.width/2) + (renderer.domElement.width/2)) + 'px';
					labels[i].style.top = (vecGeoLabs[i].y* -(renderer.domElement.height/2) + (renderer.domElement.height/2)) + 'px';
					labels[i+1].style.left = (vecGeoLabs[i+1].x * (renderer.domElement.width/2) + (renderer.domElement.width/2)) + 'px';
					labels[i+1].style.top = (vecGeoLabs[i+1].y* -(renderer.domElement.height/2) + (renderer.domElement.height/2)) + 'px';
				}
				

				renderer.render( scene, camera );
				renderer.render( scene2, camera2 );

			}
