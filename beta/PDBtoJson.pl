my $file = $ARGV[0];
my $name = $ARGV[1];
my %amino;
my %amino2;
my @aminoTable;
my %atom;
my %atom2;
my @atomTable;
my $i=0;
my $k=0;
my $len = 0;
open(F, $file); #Opening file
open(F2, ">".$file.".json");
print F2 "{ \"dataset\" : {\n";
print F2 "\t\"name\" : \"".$name."\",\n";
print F2 "\t\"points\" : [\n";
# Reading file line by line
while($current_line = <F>) {
	if($current_line =~ /^ATOM\ *\w*\ *\w*\ *(\w*)\ \w*\ *\w*\ *([0-9.-]*)\ *([0-9.-]*)\ *([0-9.-]*).* ([A-Z])\ *$/){
		if($len > 0) {
			print F2 ",\n";
		}

		print F2 "\t\t[\n";
		print F2 "\t\t\t".$2.",\n";
		print F2 "\t\t\t".$3.",\n";
		print F2 "\t\t\t".$4."\n";
		print F2 "\t\t]\n";
		#registering amino acid
		if($amino{$1} != 1) {
			$amino{$1} = 1;			
			$amino2{$1} = ($i+1);
			$aminoTable[$i] = $1;
			$i++;
		}
		#registering atoms
		if($atom{$5} != 1) {
			$atom{$5} = 1;			
			$atom2{$5} = ($k+1);
			$atomTable[$k] = $5;
			$k++;
		}
	$len++;
	}

}
print F2 "\t]\n}\n}";
close(F2);
open(F2, ">Amino-".$file.".json");
close(F);
open(F, $file);
print F2 "{ \"cluster\" : [\n";
print F2 "{	\"name\": \"Atoms in Amino Acids\",	\"numClust\": \"".scalar(@aminoTable)."\",	\"labels\": [\n";
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
while($current_line = <F>) {
	if($current_line =~ /^ATOM\ *\w*\ *\w*\ *(\w*)\ \w*\ *\w*\ *([0-9.-]*)\ *([0-9.-]*)\ *([0-9.-]*).* ([A-Z])\ *$/){
		if($i<$len-1){
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


open(F2, ">Atoms-".$file.".json");
close(F);
open(F, $file);
print F2 "{ \"cluster\" : [\n";
print F2 "{	\"name\": \"Atoms\",	\"numClust\": \"".scalar(@atomTable)."\",	\"labels\": [\n";
for($j=0;$j<scalar(@atomTable);$j++) {
	if($j<scalar(@atomTable)-1){
	print F2 "\"".$atomTable[$j]."\",\n";
	}
	else{
	print F2 "\"".$atomTable[$j]."\"\n";
	}
}

print F2 "],\n	\"values\": [\n";
$i=0;
while($current_line = <F>) {
	if($current_line =~ /^ATOM\ *\w*\ *\w*\ *(\w*)\ \w*\ *\w*\ *([0-9.-]*)\ *([0-9.-]*)\ *([0-9.-]*).* ([A-Z])\ *$/){
		if($i<$len-1){
			print F2 $atom2{$5}.",\n";
		}
		else {
			print F2 $atom2{$5}."\n";
		}
		$i++;
	}
}
print F2  "]}\n";
print F2 "]\n}\n";
close(F2);

