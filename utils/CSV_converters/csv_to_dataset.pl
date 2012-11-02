#Checking the arguments
if(scalar(@ARGV) <3) {
	print "Not enough arguments, the command format is : \nperl csv_to_dataset.pl [csv file] [dataset name (without space)] [Chain parameter : true if the points should be linked, false otherwise]";
}
else {

	my $file = $ARGV[0];
	my $name = $ARGV[1];
	my $chain = $ARGV[2];
	my $i=0;

	if (-e $file) {
		
		#reading chain
		if($chain  eq "true") {
			$chain = "true";
		}
		else {
			$chain = "false";
		}
		open(F, $file); #Opening file
		open(F2, ">".$file.".json");
		print("Creating result file : ".$file.".json");
		print F2 "{ \"dataset\" : {\n";
		print F2 "\t\"name\" : \"".$name."\",\n";
		print F2 "\t\"chain\" : ".$chain.",\n";
		print F2 "\t\"points\" : [\n";
		# Reading file line by line
		while($current_line = <F>) {
			@val = split("\t",$current_line);
			if($i != 0) {
				print F2 ",\n";
			}

			print F2 "\t\t[\n";
			print F2 "\t\t\t".$val[0].",\n";
			print F2 "\t\t\t".$val[1].",\n";
			print F2 "\t\t\t".$val[2]."\n";
			print F2 "\t\t]";
			if($i == 0) {
				print F2 "\n";
			}
			$i++;
		}
		print F2 "\n\t]\n}\n}";
	}
	else {
		print("Error, input file doesn't exist");
	}
}