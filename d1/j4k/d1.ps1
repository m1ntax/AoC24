$src = Get-Content .\d1.input

$left = @()
$right = @()
$count = 0
$simscore = 0

foreach ($line in $src) {
    $left += (($line -split "\s{1,}")[0])
    $right += (($line -split "\s{1,}")[1])
}

$left = $left | sort
$right = $right | sort

for ($i = 0; $i -lt $left.Count; $i++) {
    $count += [math]::Abs($left[$i] - $right[$i])
}

write "Answer to part I: $count"

for ($i = 0; $i -lt $left.Count; $i++) {
    $cur = $left[$i]
    $tmpscore = 0

    for ($n = 0; $n -lt $right.Count; $n++) {
        if ($cur -eq $right[$n]) {
            $tmpscore ++
            $simscore += $cur
        }
    }

}

write "Answer to part II: $simscore"