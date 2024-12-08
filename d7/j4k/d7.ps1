$starttime = Get-Date
$src = Get-Content .\d7.input
$testvalue = @()
$numbers = @()
$combinations = @()
$operators = @("+", "*")
$answer = 0

foreach ($line in $src) {
    $testvalue += ($line.split(":")[0] | foreach { [double]$_ })
    $numbers += , ($line.split(":")[1].Replace(":", "").Trim().Split(" ") | foreach { [double]$_ }) 
}

function Test-Equation {
    param (
        $equation,
        $expectedResult
    )
    #Write-Host "Equation: $equation"
    [string]$tempEquation = ""
    [double]$tempResult = 0
    $splitted = $equation.split(" ")
    $tempEquation = $splitted[0..2]
    $tempResult = Invoke-Expression $tempEquation
    $tempEquation = $tempResult

    for ($i = 3; $i -lt $splitted.Length - 1; $i += 2) {
        $tempEquation += $($splitted[$i]) + $($splitted[$i + 1])
        $tempResult = Invoke-Expression $tempEquation
        $tempEquation = $tempResult
        if ($tempResult -gt $expectedResult) {
            return $false
        }
    }

    if ($tempResult -ne $expectedResult) {
        return $false
    }

    return $true
    #Write-Host "Result: $tempResult"
}

function New-Combination {
    param (
        $numberArray
    )

    $script:allCombinations = @()

    function New-CombinationBuild {
        param (
            $currentCombination,
            $idx
        )
        
    
        if ($idx -eq $numberArray.Length) {
            $script:allCombinations += $currentCombination
            
            return
        }

        foreach ($operator in $operators) {
            New-CombinationBuild "$currentCombination $operator $($numberArray[$idx])" ($idx + 1)
        }
    }

    New-CombinationBuild "$($numberArray[0])" 1
    return $allCombinations
}



for ($i = 0; $i -lt $testvalue.Length; $i++) {
    $combinations = New-Combination $numbers[$i]
    
    if ($null -ne $combinations) {
        foreach ($combination in $combinations) {
            if ((Test-Equation $combination $testvalue[$i])) {
                #Write-Host "$($testvalue[$i]) = $combination"
                $answer += $testvalue[$i]
                break
            }
        }
    }
    Write-Progress -Activity "Validating combinations..." -Status (($i / $testvalue.Length) * 100)
}
$endtime = Get-Date
$executiontime = $endtime - $starttime
Write-Host "Execution duration: $($executiontime.Minutes) min $($executiontime.Seconds) sec"
Write-Host "Day 7 Part I Answer: $answer"