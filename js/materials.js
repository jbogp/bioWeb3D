/***************************************************************************
						Three.js Materials
***************************************************************************/
//Defining set of colors to be used 
var colors = [0xFFFFFF,0xEC2626,0xAFDCEC,0x92C7C7,0x79BAEC,0x1919FF,0x57E964,0x348781,0x001F00,0xC6AEC7,0xC38EC7,0xF778A1,0x7D2252,0xD462FF,0x4E387E,0x2B3856,0xFFEEA6,0xFFFF99,0xFFD633,0x99991F,0x4C4526,0xFFFFFF,0xEC2626,0xAFDCEC,0x92C7C7,0x79BAEC,0x1919FF,0x57E964,0x348781,0x001F00,0xC6AEC7,0xC38EC7,0xF778A1,0x7D2252,0xD462FF,0x4E387E,0x2B3856,0xFFEEA6,0xFFFF99,0xFFD633,0x99991F,0x4C4526];
var colorsCSS = ["#FFFFFF","#EC2626","#AFDCEC","#92C7C7","#79BAEC","#1919FF","#57E964","#348781","#001F00","#C6AEC7","#C38EC7","#F778A1","#7D2252","#D462FF","#4E387E","#2B3856","#FFEEA6","#FFFF99","#FFD633","#99991F","#4C4526","#FFFFFF","#EC2626","#AFDCEC","#92C7C7","#79BAEC","#1919FF","#57E964","#348781","#001F00","#C6AEC7","#C38EC7","#F778A1","#7D2252","#D462FF","#4E387E","#2B3856","#FFEEA6","#FFFF99","#FFD633","#99991F","#4C4526"];
	
//Creating LabelMaterial
var labelMaterial =  new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	size: 2.0,
	opacity:0.05,
	blending: THREE.NormalBlending,
	transparent: true
});




