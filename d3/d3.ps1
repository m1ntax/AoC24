((Select-String -path .\d3.input -Pattern "mul\((\d{1,3},\d{1,3})\)" -AllMatches | foreach { $_.matches } | foreach { $_.groups[1].Value }).Replace(",", "*") | Invoke-Expression | foreach { [int]$_ } | measure -sum).sum


