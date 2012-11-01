my $file = $ARGV[0];
my $name = $ARGV[1];
open(F, $file); #Opening file
open(F2, ">".$file.".json");
print F2 "{ \"dataset\" : {\n";
print F2 "\t\"name\" : \"".$name."\",\n";
print F2 "\t\"points\" : [\n";
# Reading file line by line
while($current_line = <F>) {
	@val = split(" ",$current_line);
	print F2 "\t\t[\n";
	print F2 "\t\t\t".$val[0].",\n";
	print F2 "\t\t\t".$val[1].",\n";
	print F2 "\t\t\t".$val[2]."\n";
	print F2 "\t\t],\n";
}
print F2 "\t]\n}\n}";
