$src = Get-Content .\d4.input
$matrix = @()
$searchstring = "XMAS"
$count = 0

$directions = @{
    "up" = (-1, 0)
    "dn" = (1, 0)
    "le" = (0, -1)
    "ri" = (0, 1)
    "ul" = (-1, -1)
    "ur" = (-1, 1)
    "dl" = (1, -1)
    "dr" = (1, 1)
}

function Find-Chars {
    param (
        $x,
        $y,
        $chars
    )

    $charamount = $chars.Length
    $matchcount = 0

    foreach ($dir in $directions.Keys) {
        $hit = $true
        for ($i = 1; $i -le $charamount; $i++) {
            $linenr = $x + ($script:directions[$dir][0] * $i)
            $charnr = $y + ($script:directions[$dir][1] * $i)
            $expectedmatch = $chars[$i - 1]
            
            if ($linenr -lt 0 -or $charnr -gt $script:matrix[$x].length -or $charnr -lt 0 -or $linenr -ge $script:matrix.length) {
                $hit = $false
                break
            }
            $effectivematch = $script:matrix[$linenr][$charnr]
            if ( $effectivematch -ne $expectedmatch ) {
                $hit = $false
                break
            }
        }
        if ($hit) {
            $matchcount++
        }

    }
    return $matchcount
}

foreach ($line in $src) {
    $matrix += , ($line.ToCharArray())
}

for ($x = 0; $x -lt $matrix.Count; $x++) {
    for ($y = 0; $y -lt $matrix[$x].Count; $y++) {
        
        if (($matrix[$x][$y]) -eq $searchstring[0]) {
            $count += Find-Chars $x $y $searchstring[1..($searchstring.Length - 1)]  
        }
    }
}

Write-Host "Part I: Amount of time XMAS could be found => " $count
