my $file = $ARGV[0];
open(F, $file); #Opening file
open(F2, ">".$file.".json");
print F2 "{ \"cluster\" : [\n";
# Reading file line by line
$current_line = <F>;
@genes = split("\t",$current_line);
my $i = 0;
my $j = 1;
my $k;
my @json;
my @numClust;
my %valuesClust;

sub uniq {
    return keys %{{ map { $_ => 1 } @_ }};
}

for($i=0;$i<scalar (@genes);$i++) {
	$genes[$i]=~ s/\n//g;
	$json[$i][0] = $genes[$i];
}
while($current_line = <F>) {
	@val = split("\t",$current_line);
	for($i=0;$i<scalar (@genes);$i++) {
		$val[$i]=~ s/\n//g;
		$json[$i][$j] = ($val[$i]);	
	}
	$j++;
}


for($i=0;$i<scalar (@json);$i++) {
	print F2 "{	\"name\": \"".$json[$i][0]."\",	\"numClust\": \"".(scalar(uniq(@{$json[$i]}))-1)."\",	\"values\": [\n";
	for($k=1;$k<$j;$k++){
		if(($k+1)<$j){
			print F2 $json[$i][$k].",\n";
		}
		else{
			print F2 $json[$i][$k]."\n";
		}
	}
	if(($i+1)<scalar (@json)) {
		print F2  "]},\n";
	}
	else {
		print F2  "]}\n";
	}
	
}
print F2 "]\n}\n";
close(F2);



