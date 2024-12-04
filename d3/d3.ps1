# Part I
((Select-String -path .\d3.input -Pattern "mul\((\d{1,3},\d{1,3})\)" -AllMatches | foreach { $_.matches } | foreach { $_.groups[1].Value }).Replace(",", "*") | Invoke-Expression | foreach { [int]$_ } | measure -sum).sum

# Part II: tricky part was the (?s) single line modifier and the ungreedy/lazy modfier to the * quantifier
(((Get-Content -raw .\d3.input) -replace "(?s)don't\(\).*?do\(\)" | Select-String -Pattern "mul\((\d{1,3},\d{1,3})\)" -AllMatches | foreach { $_.matches } | foreach { $_.groups[1].Value }).Replace(",", "*") | Invoke-Expression | foreach { [int]$_ } | measure -sum).sum