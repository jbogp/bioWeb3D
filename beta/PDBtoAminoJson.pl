
open(F2, ">Singleamino-".$file.".json");
close(F);
open(F, $file);
print F2 "{ \"cluster\" : [\n";
print F2 "{	\"name\": \"Amino Acids\",	\"numClust\": \"".scalar(@aminoTable)."\",	\"labels\": [\n";
for($j=0;$j<scalar(@aminoTable);$j++) {
	if($j<scalar(@aminoTable)-1){
	print F2 "\"".$aminoTable[$j]."\",\n";
	}
	else{
	print F2 "\"".$aminoTable[$j]."\"\n";
	}
}

print F2 "],\n	\"values\": [\n";
$i=0;
my $currentAmin = 0;
my $numAtoms = 0;
my @moyCoord;
while($current_line = <F>) {
	if($current_line =~ /^ATOM\ *\w*\ *\w*\ *(\w*)\ \w*\ *(\w*)\ *([0-9.-]*)\ *([0-9.-]*)\ *([0-9.-]*).* ([A-Z])\ *$/){
		if($currentAmin != $2 && $2 != 1){
			print F2 $amino2{$1}.",\n";
		}
		else {
			print F2 $amino2{$1}."\n";
		}
		$i++;
	}
}
print F2  "]}\n";
print F2 "]\n}\n";
close(F2);

