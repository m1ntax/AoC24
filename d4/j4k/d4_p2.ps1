$src = Get-Content .\d4.input
$matrix = @()
$count = 0

function Find-MAS {
    param (
        $x,
        $y
    )

    if ($x -le 0 -or $x -ge $script:matrix.length - 1 -or $y -le 0 -or $y -ge $script:matrix[$x].length - 1) {
        return $false
    }
    $valid = $true
    switch ($script:matrix[$x - 1][$y - 1]) {
        "M" {
            if ( $script:matrix[$x + 1][$y + 1] -ne "S" ) {
                $valid = $false
            }
        }
        "S" {
            if ( $script:matrix[$x + 1][$y + 1] -ne "M" ) {
                $valid = $false
            }
        }
        Default {
            $valid = $false
        }
    }
    switch ($script:matrix[$x - 1][$y + 1]) {
        "M" {
            if ( $script:matrix[$x + 1][$y - 1] -ne "S" ) {
                $valid = $false
            }
        }
        "S" {
            if ( $script:matrix[$x + 1][$y - 1] -ne "M" ) {
                $valid = $false
            }
        }
        Default {
            $valid = $false
        }
    }
    return $valid
}

#create matrix
foreach ($line in $src) {
    $matrix += , ($line.ToCharArray())
}

for ($x = 0; $x -lt $matrix.Count; $x++) {
    for ($y = 0; $y -lt $matrix[$x].Count; $y++) {
        
        if (($matrix[$x][$y]) -eq "A") {
            $count += Find-MAS $x $y
        } 
    }
}

Write-Host "Part II: Amount of time x-shaped MAS could be found => " $count
