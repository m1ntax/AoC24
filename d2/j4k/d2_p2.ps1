$src = Get-Content .\d2.input
$count = 0

# function returns true if all levels are safe and false otherwise
function Test-Level {
    param (
        $mode,
        $currentnumber,
        $nextnumber
    )
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
    return $true
}

foreach ($line in $src) {
    $lnumbers = $line.Split(" ") | foreach { [int]$_ }
    $mode = $lnumbers[0] -lt $lnumbers[$lnumbers.Length - 1] ? "incr" : "decr"
    $count++
    $errorcount = 0

    for ($i = 0; $i -lt $lnumbers.Count - 1; $i++) {
        $current = $lnumbers[$i]
        $next = $lnumbers[$i + 1]
        

        if (!(Test-Level $mode $current $next)) {
            $errorcount++
            if ($errorcount -le 1) {
                if (!(Test-Level $mode $lnumbers[$i - 1] $next)) {
                    $count--
                    break
                }
                else {
                    #$i++
                    continue
                }
            }
            else {
                $count--
                break
            }
        }
    }


}

write $count