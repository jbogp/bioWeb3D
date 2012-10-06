<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>
Qui veut gratter un chameau ?
</title>
<script>

//getting screen properties
var winW;
var winH;

if (document.body && document.body.offsetWidth) {
 winW = document.body.offsetWidth;
 winH = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 winW = document.documentElement.offsetWidth;
 winH = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 winW = window.innerWidth;
 winH = window.innerHeight;
}



//Load ALL the images
var cham = new Array();
cham[0] = new Image();
cham[0].src = 'img/cham.png';
cham[1] = new Image();
cham[1].src = 'img/chamb.png';
cham[2] = new Image();
cham[2].src = 'img/chamd.png';
var cham2 = new Array();
cham2[0] = new Image();
cham2[0].src = 'img/cham2.png';
cham2[1] = new Image();
cham2[1].src = 'img/chamb2.png';
cham2[2] = new Image();
cham2[2].src = 'img/chamd2.png';

var nuage = new Array();
nuage[0] =  new Image();
nuage[0].src = 'img/nuage.png';
nuage[1] =  new Image();
nuage[1].src = 'img/nuage2.png';

var ligne = new Image();

var cac = new Image();

var sun = new Image();
ligne.src = 'img/ligne.png';
sun.src = 'img/sun.png';
cac.src = 'img/cac.png';



function loadImages() {
	cham[0].onload = function(){}
	cham[1].onload = function(){}
	cham[2].onload = function(){}
	cham2[0].onload = function(){}
	cham2[1].onload = function(){}
	cham2[2].onload = function(){}
	nuage[0].onload = function(){}
	nuage[1].onload = function(){}
	ligne.onload = function(){}
	sun.onload = function(){}
	cac.onload = function(){}
}

function drawCanvas(c,width,height,img,top,left,imx,imy,six,siy) {

	var canvas = c;
	canvas.style.top = top+'px';
	canvas.style.left = left+'px';
	canvas.height = height;
	canvas.width = width;
	canwidth = width;
	canheight = height;
	var context = canvas.getContext("2d");

	//creating image
	context.drawImage(img,imx,imy,six,siy);
}


function addCanvas(c,img,top,left,imx,imy,six,siy) {
	var canvas = c;
	var context = canvas.getContext("2d");


	//creating image
	context.drawImage(img,imx,imy,six,siy);
}





	// Defining Objects


	//immobile
	function obj_immo(x,y,height,width,canvas) {
		this.height = height;
		this.width = width;
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
				
	}

	//mobile
	function  objet_mobile(x,y,height,width,canvas,speed,freq,nbimages,imgset) {
		this.height = height;
		this.width = width;
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		var images = imgset[0];
		var speed = speed;
		var freq = freq;
		this.currentImage = "";
		this.nbimages = nbimages;
		this.x = x;
		this.y = y;
		this.imageswitch = 0;

		mouseover = function () {
			images = imgset[1];
		}
		mouseout = function () {
			images = imgset[0];
		}

		
		this.canvas.addEventListener("mouseover", mouseover, false);
		this.canvas.addEventListener("mouseout", mouseout, false);


		this.loop = function () {
			var randomnumber=Math.floor(Math.random()*9)+1;
			//backward or forward ?
			if(speed < 0) {
				if(this.x<-this.width)this.x=winW;
			}
			else {
				if(this.x>winW)this.x=-this.width;
			}
			if(globalcount % freq == 0) {
				this.imageswitch =  (this.imageswitch+1)%this.nbimages
			} 
			this.x=this.x+speed;

			//drawing canvas
			if(this.currentImage !== images[this.imageswitch]) {
				this.currentImage = images[this.imageswitch];
				this.canvas.height = this.height;
				this.canvas.width = this.width;
				this.context.drawImage(images[this.imageswitch],0,0,this.width,this.height);
			}

			this.canvas.style.top = this.y+'px';
			this.canvas.style.left = this.x+'px';

		}
		
	}

	function chameau(x,y,height,width,canvas,speed,freq) {
		var images = [cham,cham2];
		this.objet = new objet_mobile(x,y,height,width,canvas,speed,freq,3,images);
	}
	
	function nuages(x,y,height,width,canvas,speed,freq) {
		var images = [nuage,nuage];
		this.objet = new objet_mobile(x,y,height,width,canvas,speed,freq,2,images);
	}


</script>


</head>
<body style="overflow-x: hidden;overflow-y: hidden;background-color:#CBEBFF">
<script>
loadImages();
</script>
<center>
<div style="z-index:10;">
<b>
Ces magnifiques chameaux sont la propriété exclusive d'Aglaé Ivanovna, princesse d'Antioche, ne pas gratter impunément.
</b>
</div>
</center>

<canvas id="canvas" width="0" height="0" style="z-index:0;position:absolute;top:0;left:0"></canvas>
<canvas id="cac1" width="0" height="0" style="z-index:10;position:absolute;top:0;left:0"></canvas>
<canvas id="cac2" width="0" height="0" style="z-index:10;position:absolute;top:0;left:0"></canvas>
<canvas id="cac3" width="0" height="0" style="z-index:10;position:absolute;top:0;left:0"></canvas>
<canvas id="nuage0" width="0" height="0" style="z-index:1;position:absolute;top:0;left:0"></canvas>
<canvas id="nuage1" width="0" height="0" style="z-index:1;position:absolute;top:0;left:0"></canvas>
<canvas id="nuage2" width="0" height="0" style="z-index:1;position:absolute;top:0;left:0"></canvas>
<canvas id="nuage3" width="0" height="0" style="z-index:1;position:absolute;top:0;left:0"></canvas>

<canvas id="canvas1" width="0" height="0" style="z-index:11;position:absolute;top:0;left:0"></canvas>


<canvas id="canvas2" width="0" height="0" style="z-index:4;position:absolute;top:0;left:0"></canvas>


<canvas id="canvas3" width="0" height="0" style="z-index:2;position:absolute;top:0;left:0"></canvas>


<canvas id="canvas4" width="0" height="0" style="z-index:1;position:absolute;top:0;left:0"></canvas>


<canvas id="canvas5" width="0" height="0" style="z-index:3;position:absolute;top:0;left:0"></canvas>


<script>

	var globalcount = 0;

	//Initializing background and fix objects

	
	drawCanvas(document.getElementById('canvas'),winW,winH,ligne,0,0,0,winH/2,winW,winH/2);
		
	addCanvas(document.getElementById('canvas'),sun,0,0,winW-250,20,230,200);

	var cac1w = Math.floor(Math.random()*50)+100;
	var cac1h = Math.floor(Math.random()*250)+150;
	var cac1x = Math.floor(Math.random()*((winW)-50));
	var cac1y = (winH-cac1h)+Math.floor(Math.random()*20);
	drawCanvas(document.getElementById('cac1'),cac1w,cac1h,cac,cac1y,cac1x,0,0,cac1w,cac1h);

	var cac2w = Math.floor(Math.random()*50)+100;
	var cac2h = Math.floor(Math.random()*250)+150;	
	var cac2x = Math.floor(Math.random()*((winW)-50));
	var cac2y = (winH-cac2h)+Math.floor(Math.random()*20);
	drawCanvas(document.getElementById('cac2'),cac2w,cac2h,cac,cac2y,cac2x,0,0,cac2w,cac2h);

	var cac3w = Math.floor(Math.random()*50)+100;
	var cac3h = Math.floor(Math.random()*250)+150;
	var cac3x = Math.floor(Math.random()*((winW)-50));
	var cac3y = (winH-cac3h);
	drawCanvas(document.getElementById('cac3'),cac3w,cac3h,cac,cac3y,cac3x,0,0,cac3w,cac3h);



	
	//creating nuages
	
	var nuag = new Array();
	nuag[0] = new nuages(0,70,50,200,document.getElementById("nuage0"),0.3,200);
	nuag[1] = new nuages(50,20,140,200,document.getElementById("nuage1"),0.3,270);
	nuag[2] = new nuages(30,10,110,200,document.getElementById("nuage2"),0.3,300);
	nuag[3] = new nuages(10,0,120,200,document.getElementById("nuage3"),0.3,400);


	//creating chameaux

	var c1 = document.getElementById('canvas1');
	var c2 = document.getElementById('canvas2');
	var c3 = document.getElementById('canvas3');
	var c4 = document.getElementById('canvas4');
	var c5 = document.getElementById('canvas5');


	var chameaux = new Array();
	chameaux[0] = new chameau(0,(winH)-320,350,300,c1,-2,15);
	chameaux[1] = new chameau(winW-79,(winH/2)+Math.floor(Math.random()*((winH/2)-220)),222,200,c2,-1.5,10);
	chameaux[2] = new chameau(winW,(winH/2)+Math.floor(Math.random()*((winH/2)-200)),200,150,c3,-2.5,11);
	chameaux[3] = new chameau(32,(winH/2)+10,110,100,c4,-1,9);
	chameaux[4] = new chameau(150,(winH/2)+Math.floor(Math.random()*((winH/2)-200)),200,170,c5,-2.1,8);




	//Principal program loop
	setInterval(function() {
			globalcount++;
			//starting chameaux
			for(i=0;i<chameaux.length;i++){
				chameaux[i].objet.loop();
			}

			for(i=0;i<nuag.length;i++){
				nuag[i].objet.loop();
			}
	},50);
</script>
</body>
</html>
