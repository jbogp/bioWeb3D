/***************************************************************************
						Three.js Materials
***************************************************************************/
//Defining set of colors to be used 
var colors = ["0xE3E4FA","0xB7CEEC","0xAFDCEC","0x92C7C7","0x79BAEC","0x57E964","0x348781","0xC6AEC7","0xC38EC7","0xF778A1","0x7D2252","0xD462FF","0x4E387E","0x2B3856"];
var colorsCSS = ["#E3E4FA","#B7CEEC","#AFDCEC","#92C7C7","#79BAEC","#57E964","#348781","#C6AEC7","#C38EC7","#F778A1","#7D2252","#D462FF","#4E387E","#2B3856"];
	
//Creating LabelMaterial
var labelMaterial =  new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	size: 10.0,
	opacity:0.05,
	blending: THREE.NormalBlending,
	transparent: true
});


//Dataset Materials
var dataSetMaterial =  new THREE.ParticleBasicMaterial({
	color: 0xffffff,
	size: 5.0,
	opacity:0.2,
	blending: THREE.NormalBlending,
	transparent: true
});

//Materials for clusters	
var clustMaterials = new Array();
for(var i=0;i<colors.length;i++) {
	
	clustMaterials[i] =  new THREE.ParticleBasicMaterial({
	color: colors[i],
	size: 10,
	opacity:0.5,
	blending: THREE.NoBlending,
	transparent: true
  });
}
