Bio3D an HTML5 visualization tool for biological datasets
=========================================================
##What does it do ?
This sort of things :
![Plateynereis dumerilii's brain](http://www.ebi.ac.uk/~jbpettit/bioWeb3D/paper/fig1.png "Plateynereis dumerilii's brain")
![Main carbon chain of a bacterial pentameric ligand-gated ion channel (protein)](http://www.ebi.ac.uk/~jbpettit/bioWeb3D/paper/Supp_fig2.png "Main carbon chain of a bacterial pentameric ligand-gated ion channel (protein)")
And much more !

##Test it live now
Test the [application running](http://geekcafe.fr/bio3D/index.html?dataset=beta/2XDF.pdb.json&cluster=beta/Amino-2XDF.pdb.json#) online to view a cool looking protein in 3D.

## Motivation
Visualisation is a key feature in the analysis of large biological datasets, especially when analysing organized structures with distinct sub-clusters (Rubel _et al._, 2010). This is particularly important when analysing 3-Dimensional (3D) datasets, which is becoming more and more common. While various visualisation tools have been developed, they have typically been available via a locally installed piece of software such as Arena3D \citep{Pavlopoulos _et al._,2008},  3D Genome Tuner \citep{Wang _et al._,2009}, the Allen Brain Atlas \citep{Lein _et al._,2007} or Cytoscape \citep{Shannon _et al._,2003}. Other 3D visualisation tools have been built online and are accessible through the browser directly, such as AstexViewer \citep{Hartshorn _et al._,2002}, which is utilised by the Protein Databank Europe via a Java Applet. More recently, visualisation tools developed using HTML5/WebGL capabilities have been described, although they have focused on very specific applications, such as analysing radiology data  \citep{Dinesh _et al._,2012}. However, no tool has allowed biologists to view their own 3D data directly online in an easy, fast, secure and interactive way. Using webGL and the JavaScript 3D library [Three.js](https://github.com/mrdoob/three.js/), bioWeb3D aims to be a simple, generic, tool for visualising such data.
