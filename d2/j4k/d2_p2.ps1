$src = Get-Content .\d2.input
$count = 0

function Test-Level {
    param (
        $levelarray
    )

    $mode = $levelarray[0] -lt $levelarray[$levelarray.Length - 1] ? "incr" : "decr"

    for ($i = 0; $i -lt $levelarray.Count - 1; $i++) {
        $currentnumber = $levelarray[$i]
        $nextnumber = $levelarray[$i + 1]

        $diff = [math]::Abs($currentnumber - $nextnumber)
        if ($mode -eq "incr") {
            if ($diff -notin 1..3 -or $currentnumber -ge $nextnumber) {
                return $false
            }

        }
        elseif ($mode -eq "decr") {
            if ($diff -notin 1..3 -or $currentnumber -le $nextnumber) {
                return $false
            }
        }   
    }
    return $true   
}

foreach ($line in $src) {
    $lnumbers = $line.Split(" ") | foreach { [int]$_ }

    if (!(Test-Level $lnumbers)) {
        for ($n = 0; $n -lt $lnumbers.Count; $n++) {
            switch ($n) {
                0 { $temparray = $lnumbers[1..($lnumbers.Length - 1)] }
                ($lnumbers.Count - 1) { $temparray = $lnumbers[0..($n - 1)] }
                Default { $temparray = $lnumbers[0..($n - 1)] + $lnumbers[($n + 1)..($lnumbers.Length - 1)] }
            }
            if (Test-Level $temparray) {
                write "good alternative: $temparray"
                $count++
                break
            }

        }
        $count--
    }
    $count++
}
write $count