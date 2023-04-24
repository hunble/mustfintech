$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
$session.Cookies.Add((New-Object System.Net.Cookie("TMOSHCooKie", "sR5SsCq/JIG9kDCnB81hijAJAf0bFobB9WKYzX9RsfnqxYkraDFutNfrcrk6cG3zpj1r+h/hhAxVXWwCUYtNE71xrkkINlT2IQEAAAAB", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("membIdSave", "sj24sj", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("TMOSHCooKie", "OZC4jZKch/+YmbmnB81hijAJAf0bFrmM6v5fmTAe21LfdfH5e3JgfOz+NxS2ZyJNSSEvT3a30opmLtJqI6nWn5p1QBYRyTFcPQMAAAAB", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("clientid", "020002249106", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("SESSION", "YjMyMWM0YzctYWJiMC00MWZhLWI0NWUtYzI0YTAzMzAyMDIz", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("JSESSIONID", "KgdvA4hxPZF0vSvbZvVaQExni_iwf6NwxRLc7SXv.ms-report", "/", "cloud.eais.go.kr")))
Invoke-WebRequest -UseBasicParsing -Uri "https://cloud.eais.go.kr/report/RPTCAA02R02" `
-Method "POST" `
-WebSession $session `
-Headers @{
"Accept"="*/*"
  "Accept-Encoding"="gzip, deflate, br"
  "Accept-Language"="en-US,en;q=0.9"
  "Cache-Control"="no-cache"
  "DNT"="1"
  "Origin"="https://cloud.eais.go.kr"
  "Pragma"="no-cache"
  "Referer"="https://cloud.eais.go.kr/report/BCIAAA04V01?param=U2FsdGVkX19ghig5PWV581jy03u%2FrnaKmu5ZYyEO9xK2vIxBaEdKlovPuZJf3Du75ocHsssrhfQmh3JoplQAj%2BX%2FavfgXzzePJDm3N1LB2y74QO8PA925puKslKAj77jMPlIaJD%2BYxFcf6kB%2F9pGoPQ2DnDil%2B%2F5sslr4cGEYPGxJ9K0T1EIDD4egufth8jfYXSg0YkcpGa5gLBpKGyTGvSTfnN9%2FB7BoFViaz59oc7V7eBhUaW5FvFKB8dcnq89yyegEIC1ffeB%2Bngz%2BNsO6KUp1ESFKX3%2ByrMF6KlG05fBRsLbCNLKdQsGQW5kz9B9uLY2le7mBp8AVYKWbu0uya4ad%2BxhtiiedrbRVqQIip8r3CYepHpLMSR3ogtUzqvIzx6b9NuWYNfSr2R97TpOUDnMC3AZ7c01A0tbRSc5dKRPcVTqDP05I2lzVx6tijv%2FM3E%2BYUtJFoxiizLIie8NHk1TRekNOwXci8PSYLqD3epLZnYX0Ic8xFPD2eHt8%2Fj%2F4E%2Bnt2vQ5%2FQDXVrbcFhqSSsPfZj1odwLic615pMsS5t1KO3ZVM9IpaBAPbJo2M7AG090JVsGYvTajKi2uck4F344yGZxVllh%2FL07gzNueM7Vgq4ST3KaL5khUgX6qp6RoshjlVekAkt%2FLUiB%2BC%2Bl4cDY25qLIEQ1TODVesLBnM0RaFekN2hTd4%2Bkg5CKnFDRZY2FXnisa64MyNu9bMqnyA%3D%3D&actionId=BCIAAA04L01"
  "Sec-Fetch-Dest"="empty"
  "Sec-Fetch-Mode"="cors"
  "Sec-Fetch-Site"="same-origin"
  "sec-ch-ua"="`"Chromium`";v=`"112`", `"Google Chrome`";v=`"112`", `"Not:A-Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
} `
-ContentType "application/x-www-form-urlencoded; charset=UTF-8" `
-Body "ClipID=R16&aliveReport=true&uid=c973909afd5034fc093dd9ad4c883eadd&clipUID=c973909afd5034fc093dd9ad4c883eadd&s_time=1682340797959";
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
$session.Cookies.Add((New-Object System.Net.Cookie("TMOSHCooKie", "sR5SsCq/JIG9kDCnB81hijAJAf0bFobB9WKYzX9RsfnqxYkraDFutNfrcrk6cG3zpj1r+h/hhAxVXWwCUYtNE71xrkkINlT2IQEAAAAB", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("membIdSave", "sj24sj", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("TMOSHCooKie", "OZC4jZKch/+YmbmnB81hijAJAf0bFrmM6v5fmTAe21LfdfH5e3JgfOz+NxS2ZyJNSSEvT3a30opmLtJqI6nWn5p1QBYRyTFcPQMAAAAB", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("clientid", "020002249106", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("SESSION", "YjMyMWM0YzctYWJiMC00MWZhLWI0NWUtYzI0YTAzMzAyMDIz", "/", "cloud.eais.go.kr")))
$session.Cookies.Add((New-Object System.Net.Cookie("JSESSIONID", "KgdvA4hxPZF0vSvbZvVaQExni_iwf6NwxRLc7SXv.ms-gateway", "/", "cloud.eais.go.kr")))
Invoke-WebRequest -UseBasicParsing -Uri "https://cloud.eais.go.kr/report/RPTCAA02R02" `
-Method "POST" `
-WebSession $session `
-Headers @{
"Accept"="text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  "Accept-Encoding"="gzip, deflate, br"
  "Accept-Language"="en-US,en;q=0.9"
  "Cache-Control"="no-cache"
  "DNT"="1"
  "Origin"="https://cloud.eais.go.kr"
  "Pragma"="no-cache"
  "Referer"="https://cloud.eais.go.kr/report/BCIAAA04V01?param=U2FsdGVkX19ghig5PWV581jy03u%2FrnaKmu5ZYyEO9xK2vIxBaEdKlovPuZJf3Du75ocHsssrhfQmh3JoplQAj%2BX%2FavfgXzzePJDm3N1LB2y74QO8PA925puKslKAj77jMPlIaJD%2BYxFcf6kB%2F9pGoPQ2DnDil%2B%2F5sslr4cGEYPGxJ9K0T1EIDD4egufth8jfYXSg0YkcpGa5gLBpKGyTGvSTfnN9%2FB7BoFViaz59oc7V7eBhUaW5FvFKB8dcnq89yyegEIC1ffeB%2Bngz%2BNsO6KUp1ESFKX3%2ByrMF6KlG05fBRsLbCNLKdQsGQW5kz9B9uLY2le7mBp8AVYKWbu0uya4ad%2BxhtiiedrbRVqQIip8r3CYepHpLMSR3ogtUzqvIzx6b9NuWYNfSr2R97TpOUDnMC3AZ7c01A0tbRSc5dKRPcVTqDP05I2lzVx6tijv%2FM3E%2BYUtJFoxiizLIie8NHk1TRekNOwXci8PSYLqD3epLZnYX0Ic8xFPD2eHt8%2Fj%2F4E%2Bnt2vQ5%2FQDXVrbcFhqSSsPfZj1odwLic615pMsS5t1KO3ZVM9IpaBAPbJo2M7AG090JVsGYvTajKi2uck4F344yGZxVllh%2FL07gzNueM7Vgq4ST3KaL5khUgX6qp6RoshjlVekAkt%2FLUiB%2BC%2Bl4cDY25qLIEQ1TODVesLBnM0RaFekN2hTd4%2Bkg5CKnFDRZY2FXnisa64MyNu9bMqnyA%3D%3D&actionId=BCIAAA04L01"
  "Sec-Fetch-Dest"="iframe"
  "Sec-Fetch-Mode"="navigate"
  "Sec-Fetch-Site"="same-origin"
  "Sec-Fetch-User"="?1"
  "Upgrade-Insecure-Requests"="1"
  "sec-ch-ua"="`"Chromium`";v=`"112`", `"Google Chrome`";v=`"112`", `"Not:A-Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
} `
-ContentType "application/x-www-form-urlencoded" `
-Body "ClipID=R08&uid=c973909afd5034fc093dd9ad4c883eadd&clipUID=c973909afd5034fc093dd9ad4c883eadd&print=print&isPDFPrintImage=false&path=%2Freport&optionValue=%7B%22drawDashedLineDirectly%22%3Atrue%2C%22startNum%22%3A1%2C%22endNum%22%3A2%7D&isChromePrintFitToPage=false&s_time=1682340800036"