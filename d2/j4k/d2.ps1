$src = Get-Content .\d2.input
$count = 0

function Test-DidSort {
    param (
        $array
    )

    if ($array[0] -lt $array[$array.length - 1]) {
        $sortedarray = $array | Sort-Object
    }
    else {
        $sortedarray = $array | Sort-Object -Descending
    }

    for ($i = 0; $i -lt $array.Count; $i++) {
        if ($array[$i] -ne $sortedarray[$i]) {
            return $true
        }
    }
    return $false
}

foreach ($line in $src) {
    $lnumbers = $line.Split(" ") | foreach { [int]$_ }
    $count++
    if (Test-DidSort $lnumbers) {
        #write "skipped because array was sorted"
        $count--
        continue
    }
   
    for ($i = 0; $i -lt $lnumbers.Count - 1; $i++) {
        
        $diff = $lnumbers[$i] - $lnumbers[$i + 1]

        if ($diff -gt 3 -or $diff -lt -3 -or $diff -eq 0) {
            #Write "broke because diff of $($lnumbers[$i]) and $($lnumbers[$i+1]), which is $diff"
            $count--
            break
        }
    }
}
write $count

# part II: better to check every value one by one with and compare with the next one: is it increasing (or changing) or is the difference
# to big or 0? then eliminate this value from the array and check again