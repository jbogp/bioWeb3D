<!DOCTYPE html>
<!-- saved from url=(0060)http://mrdoob.github.com/three.js/examples/canvas_lines.html -->
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>three.js canvas - lines - random</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				background-color: #000000;
				margin: 0px;
				overflow: hidden;
			}

			a {
				color:#0078ff;
			}
		</style>
	</head>
	<body>
	<div id="UI">
		<div class="session" style="position:absolute;left:0px;top:0px;;width:100%;height:30px;border:1px solid #000;background:#fff;padding-top:5px;opacity:0.6;filter:alpha(opacity=60);">
			<div id="current" style="display:inline">Viewing : <b>Platynereis brain in-situ dataset</b></div>
			<div style="float:right;display:inline" id="login"><a href="">Manage my datasets</a>&nbsp;&nbsp;&nbsp;<a href="">Logout</a></div>
		</div>
		<div class="controls" style="position:absolute;right:0px;top:36px;;width:300px;border:1px solid #000;background:#fff;opacity:0.6;filter:alpha(opacity=60);">
			<div class="coefs" style="padding:10px !important;">
				Axis Coefficients :</br>
				Antero-posterior axis<div id="sliderX"></div>
				Dorso-versal axis<div id="sliderY"></div>
				Latero-medial axis<div id="sliderZ"></div>
				


			</div>


			<div class="methods">
				Clustering Method :</br>
				<input type="radio" name="meth" checked onClick="loadSet(this.value)" value=0>Test</br>
				<input type="radio" name="meth" onClick="loadSet(this.value)" value=1>15 Clust</br>
				

				</select>
			</div>
			<div class="clusters" style="margin-top:10px">Display clusters :</br></div>
		</div>
	</div>
		<script>
		var cell = new Array();
		var clustData = new Array();
		var nbcubes=34343;

		for (var j = 0; j < nbcubes; j++) {
			cell[j] = new Array();
		}

		for(var i=0;i<nbcubes;i++){
			clustData[i] = new Array();
		}
		</script>
		
		<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.23.custom.css" rel="Stylesheet" />	
		<script src="js/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.23.custom.min.js"></script>
		
		
		<script src="build/Three.js"></script>
		<script src="rawData3um.js"></SCRIPT>
		<script src="beta0Rand.js"></SCRIPT>
		<script src="15Clustbeta0Rand.js"></SCRIPT>
		

		<script>
			var mouseX = 0, mouseY = 0,

			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,

			SEPARATION = 200,
			AMOUNTX = 10,
			AMOUNTY = 10,

			camera, camera2, scene, controls, renderer, particleSystem=new Array(),method=0,nbclust=15,geometry = new Array(),material = new Array(),axisLabels = new Array();
			var colors = ["","0xFFFFFF","0xE3E4FA","0xB7CEEC","0xAFDCEC","0x92C7C7","0x79BAEC","0x57E964","0x348781","0xC6AEC7","0xC38EC7","0xF778A1","0x7D2252","0xD462FF","0x4E387E","0x2B3856"];
			var colorsCSS = ["","#FFFFFF","#E3E4FA","#B7CEEC","#AFDCEC","#92C7C7","#79BAEC","#57E964","#348781","#C6AEC7","#C38EC7","#F778A1","#7D2252","#D462FF","#4E387E","#2B3856"];
			var visible = [true,true,true,true,true,true,true,true,true,true];
			var inviMat;
			var labels  = new Array();
			var vectorAxis = new Array();
			var projector = new THREE.Projector();
			var geometry2 = new THREE.Geometry();
			var particleSystemAxis;
			var vecGeoLabs = new Array();
			var normCoef = [1,1,0.5];
		</script>
		<script src="Bio3D-1.0.js"></SCRIPT>
		<script>
			init();
			animate();
		</script><div></div>
		
	

</body></html>
