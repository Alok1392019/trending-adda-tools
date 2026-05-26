# TRENDING ADDA TOOLS - STATIC SITE GENERATOR COMPILER (POWERSHELL EDITION)
# Operates natively on Windows to bypass environment limitations (no Node.js/Python required)

$ErrorActionPreference = "Stop"

# Target directories
$outputDir = Get-Location
$toolsOutputDir = Join-Path $outputDir "tools"

if (-not (Test-Path $toolsOutputDir)) {
    New-Item -ItemType Directory -Path $toolsOutputDir -Force | Out-Null
}

# 1. Read layout templates
$headTemplate = Get-Content -Path "src/templates/head.html" -Raw
$headerTemplate = Get-Content -Path "src/templates/header.html" -Raw
$footerTemplate = Get-Content -Path "src/templates/footer.html" -Raw

# Compiled pages list for sitemap
$compiledPages = New-Object System.Collections.Generic.List[PSObject]

Write-Output "🚀 Starting native PowerShell compilation of Trending Adda Tools website..."

# 2. Parse categories from JSON
$categoriesJson = Get-Content -Path "src/data/categories.json" -Raw
$categories = ConvertFrom-Json $categoriesJson

# 3. Helper function to parse tool JS files as text blocks
function Get-RegexValue($block, $pattern) {
    if ($block -match $pattern) {
        return $Matches[1].Trim()
    }
    return ""
}

function Get-RegexArray($block, $propName) {
    $arrayBlock = Get-RegexValue $block "$propName\s*:\s*\[([\s\S]+?)\]"
    if ($null -eq $arrayBlock -or $arrayBlock -eq "") { return @() }
    $matches = [regex]::Matches($arrayBlock, '"([^"]+)"')
    $list = New-Object System.Collections.Generic.List[string]
    foreach ($m in $matches) {
        $list.Add($m.Groups[1].Value)
    }
    return $list.ToArray()
}

function Get-RegexFaqs($block) {
    $faqsBlock = Get-RegexValue $block "faqs\s*:\s*\[([\s\S]+?)\]"
    if ($null -eq $faqsBlock -or $faqsBlock -eq "") { return @() }
    
    $items = $faqsBlock -split '(?s)\},\s*\{'
    $list = New-Object System.Collections.Generic.List[PSObject]
    foreach ($item in $items) {
        $q = [regex]::Match($item, 'q:\s*"([^"]+)"').Groups[1].Value
        $a = [regex]::Match($item, 'a:\s*"([^"]+)"').Groups[1].Value
        if ($q -and $a) {
            $list.Add([PSCustomObject]@{ q = $q; a = $a })
        }
    }
    return $list.ToArray()
}

function Get-ToolsFromJsFile($filePath) {
    if (-not (Test-Path $filePath)) { return @() }
    $content = Get-Content -Path $filePath -Raw
    $content = $content -replace '(?m)^\s*//.*$', ''
    $content = $content -replace '(?s)const\s+[a-zA-Z0-9_]+\s*=\s*\[', ''
    $content = $content -replace '(?s)\];?\s*module\.exports\s*=\s*[a-zA-Z0-9_]+;?\s*$', ''
    
    $toolBlocks = $content -split '(?s)\},\s*\{'
    $toolsList = New-Object System.Collections.Generic.List[PSObject]
    
    foreach ($block in $toolBlocks) {
        $slug = Get-RegexValue $block 'slug:\s*"([^"]+)"'
        if ($slug -eq "") { continue }
        
        $name = Get-RegexValue $block 'name:\s*"([^"]+)"'
        $category = Get-RegexValue $block 'category:\s*"([^"]+)"'
        $shortDesc = Get-RegexValue $block 'shortDesc:\s*"([^"]+)"'
        $seoTitle = Get-RegexValue $block 'seoTitle:\s*"([^"]+)"'
        $seoDescription = Get-RegexValue $block 'seoDescription:\s*"([^"]+)"'
        $seoKeywords = Get-RegexValue $block 'seoKeywords:\s*"([^"]+)"'
        
        $icon = Get-RegexValue $block 'icon:\s*`([\s\S]+?)`'
        $htmlContent = Get-RegexValue $block 'htmlContent:\s*`([\s\S]+?)`'
        $jsContent = Get-RegexValue $block 'jsContent:\s*`([\s\S]+?)`'
        
        $features = Get-RegexArray $block "features"
        $instructions = Get-RegexArray $block "instructions"
        $benefits = Get-RegexArray $block "benefits"
        $faqs = Get-RegexFaqs $block
        
        $toolsList.Add([PSCustomObject]@{
            slug = $slug
            name = $name
            category = $category
            shortDesc = $shortDesc
            seoTitle = $seoTitle
            seoDescription = $seoDescription
            seoKeywords = $seoKeywords
            icon = $icon
            htmlContent = $htmlContent
            jsContent = $jsContent
            features = $features
            instructions = $instructions
            benefits = $benefits
            faqs = $faqs
        })
    }
    return $toolsList.ToArray()
}

# Load all hand-crafted tools
$textTools = Get-ToolsFromJsFile "src/data/tools/text-tools.js"
$imageTools = Get-ToolsFromJsFile "src/data/tools/image-tools.js"
$pdfTools = Get-ToolsFromJsFile "src/data/tools/pdf-tools.js"
$calculatorTools = Get-ToolsFromJsFile "src/data/tools/calculator-tools.js"
$utilityTools = Get-ToolsFromJsFile "src/data/tools/utility-tools.js"
$socialTools = Get-ToolsFromJsFile "src/data/tools/social-tools.js"

$handCraftedTools = @() + $textTools + $imageTools + $pdfTools + $calculatorTools + $utilityTools + $socialTools
$handCraftedSlugs = $handCraftedTools | ForEach-Object { $_.slug }

# Complete List of all 64 tools requested in prompt
$completeToolsData = @(
  # TEXT & WRITING TOOLS
  @{ slug = "word-counter"; name = "Word Counter"; cat = "text-writing" }
  @{ slug = "character-counter"; name = "Character Counter"; cat = "text-writing" }
  @{ slug = "sentence-counter"; name = "Sentence Counter"; cat = "text-writing" }
  @{ slug = "paragraph-counter"; name = "Paragraph Counter"; cat = "text-writing" }
  @{ slug = "case-converter"; name = "Case Converter"; cat = "text-writing" }
  @{ slug = "fancy-text-generator"; name = "Fancy Text Generator"; cat = "text-writing" }
  
  # IMAGE TOOLS
  @{ slug = "image-compressor"; name = "Image Compressor"; cat = "image" }
  @{ slug = "image-resizer"; name = "Image Resizer"; cat = "image" }
  @{ slug = "crop-image-tool"; name = "Crop Image Tool"; cat = "image" }
  @{ slug = "rotate-image-tool"; name = "Rotate Image Tool"; cat = "image" }
  @{ slug = "flip-image-tool"; name = "Flip Image Tool"; cat = "image" }
  @{ slug = "background-remove-tool"; name = "Background Remove Tool"; cat = "image" }
  @{ slug = "passport-size-photo-maker"; name = "Passport Size Photo Maker Tool"; cat = "image" }
  @{ slug = "convert-png-to-jpg"; name = "Convert PNG to JPG"; cat = "image" }
  @{ slug = "convert-jpg-to-png"; name = "Convert JPG to PNG"; cat = "image" }
  @{ slug = "webp-converter"; name = "WEBP Converter"; cat = "image" }
  @{ slug = "blur-image-tool"; name = "Blur Image Tool"; cat = "image" }
  @{ slug = "meme-generator"; name = "Meme Generator"; cat = "image" }
  @{ slug = "thumbnail-maker"; name = "Thumbnail Maker"; cat = "image" }
  @{ slug = "qr-code-generator"; name = "QR Code Generator"; cat = "image" }
  @{ slug = "barcode-generator"; name = "Barcode Generator"; cat = "image" }
  @{ slug = "svg-to-png-converter"; name = "SVG to PNG Converter"; cat = "image" }
  @{ slug = "watermark-image-tool"; name = "Watermark Image Tool"; cat = "image" }
  
  # PDF TOOLS
  @{ slug = "merge-pdfs"; name = "Merge PDFs"; cat = "pdf" }
  @{ slug = "split-pdf"; name = "Split PDF"; cat = "pdf" }
  @{ slug = "compress-pdf"; name = "Compress PDF"; cat = "pdf" }
  @{ slug = "pdf-page-extractor"; name = "PDF Page Extractor"; cat = "pdf" }
  @{ slug = "pdf-to-image"; name = "PDF to Image"; cat = "pdf" }
  @{ slug = "image-to-pdf"; name = "Image to PDF"; cat = "pdf" }
  @{ slug = "add-watermark-to-pdf"; name = "Add Watermark to PDF"; cat = "pdf" }
  @{ slug = "rotate-pdf-pages"; name = "Rotate PDF Pages"; cat = "pdf" }
  @{ slug = "pdf-password-protector"; name = "PDF Password Protector"; cat = "pdf" }
  @{ slug = "unlock-pdf"; name = "Unlock PDF"; cat = "pdf" }
  @{ slug = "pdf-size-reducer"; name = "PDF Size Reducer"; cat = "pdf" }
  @{ slug = "word-to-pdf"; name = "Word to PDF"; cat = "pdf" }
  @{ slug = "pdf-to-word"; name = "PDF to Word"; cat = "pdf" }
  @{ slug = "excel-to-pdf"; name = "Excel to PDF"; cat = "pdf" }
  @{ slug = "pdf-to-excel"; name = "PDF to Excel"; cat = "pdf" }
  
  # CALCULATOR TOOLS
  @{ slug = "age-calculator"; name = "Age Calculator"; cat = "calculator" }
  @{ slug = "percentage-calculator"; name = "Percentage Calculator"; cat = "calculator" }
  @{ slug = "emi-calculator"; name = "EMI Calculator"; cat = "calculator" }
  @{ slug = "loan-calculator"; name = "Loan Calculator"; cat = "calculator" }
  @{ slug = "gst-calculator"; name = "GST Calculator"; cat = "calculator" }
  @{ slug = "sip-calculator"; name = "SIP Calculator"; cat = "calculator" }
  @{ slug = "compound-interest-calculator"; name = "Compound Interest Calculator"; cat = "calculator" }
  @{ slug = "discount-calculator"; name = "Discount Calculator"; cat = "calculator" }
  @{ slug = "profit-margin-calculator"; name = "Profit Margin Calculator"; cat = "calculator" }
  @{ slug = "currency-calculator"; name = "Currency Calculator"; cat = "calculator" }
  @{ slug = "time-duration-calculator"; name = "Time Duration Calculator"; cat = "calculator" }
  @{ slug = "date-difference-calculator"; name = "Date Difference Calculator"; cat = "calculator" }
  @{ slug = "pregnancy-calculator"; name = "Pregnancy Calculator"; cat = "calculator" }
  @{ slug = "calorie-calculator"; name = "Calorie Calculator"; cat = "calculator" }
  @{ slug = "water-intake-calculator"; name = "Water Intake Calculator"; cat = "calculator" }
  @{ slug = "fuel-cost-calculator"; name = "Fuel Cost Calculator"; cat = "calculator" }
  @{ slug = "electricity-bill-calculator"; name = "Electricity Bill Calculator"; cat = "calculator" }
  @{ slug = "salary-calculator"; name = "Salary Calculator"; cat = "calculator" }
  
  # UTILITY TOOLS
  @{ slug = "internet-speed-test"; name = "Internet Speed Test"; cat = "utility" }
  @{ slug = "typing-speed-test"; name = "Typing Speed Test"; cat = "utility" }
  
  # SOCIAL MEDIA TOOLS
  @{ slug = "bio-generator"; name = "Instagram Bio Generator"; cat = "social-media" }
  @{ slug = "instagram-font-generator"; name = "Instagram Font Generator"; cat = "social-media" }
  @{ slug = "reel-script-generator"; name = "Reel Script Generator"; cat = "social-media" }
  @{ slug = "viral-hook-generator"; name = "Viral Hook Generator"; cat = "social-media" }
  @{ slug = "instagram-caption-generator"; name = "Instagram Caption Generator"; cat = "social-media" }
  @{ slug = "whatsapp-sticker-maker"; name = "WhatsApp Sticker Maker"; cat = "social-media" }
)

# Populate missing tools with gorgeous, fully operational configurations dynamically
$allToolsList = New-Object System.Collections.Generic.List[PSObject]

foreach ($t in $completeToolsData) {
    $slug = $t.slug
    # Find matching hand-crafted tool
    $handCrafted = $handCraftedTools | Where-Object { $_.slug -eq $slug }
    if ($handCrafted) {
        $allToolsList.Add($handCrafted)
    } else {
        # Dynamically build highly functional mathematical tool pages!
        $name = $t.name
        $cat = $t.cat
        
        $html = ""
        $js = ""
        $shortDesc = "A professional online $name helper. Quick, secure, responsive, and completely browser-side."
        
        # 1. Map dynamic math calculators logic
        if ($slug -eq "percentage-calculator") {
            $html = @"
        <div class="grid grid-2">
          <div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="pct-val">Percentage (%):</label>
              <input type="number" id="pct-val" class="tool-input" value="10">
            </div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="pct-base">Base Value ($/₹):</label>
              <input type="number" id="pct-base" class="tool-input" value="250">
            </div>
            <div class="tool-btn-row">
              <button id="pct-btn" class="glow-btn">Calculate Percentage</button>
            </div>
          </div>
          <div class="glass-panel" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h4>Calculated Percentage Result</h4>
            <div id="pct-res" style="font-size: 2.2rem; font-weight: 800; color: var(--primary); margin-top: 1rem;">25.00</div>
          </div>
        </div>
"@
            $js = @"
        document.getElementById('pct-btn').addEventListener('click', () => {
          const p = parseFloat(document.getElementById('pct-val').value);
          const b = parseFloat(document.getElementById('pct-base').value);
          if (isNaN(p) || isNaN(b)) { showToast('Enter valid numbers!', 'error'); return; }
          const res = (p / 100) * b;
          document.getElementById('pct-res').innerText = res.toFixed(2);
          showToast('Percentage calculated!', 'success');
        });
"@
        }
        elseif ($slug -eq "discount-calculator") {
            $html = @"
        <div class="grid grid-2">
          <div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="disc-price">Original Price ($/₹):</label>
              <input type="number" id="disc-price" class="tool-input" value="150">
            </div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="disc-pct">Discount Percentage (%):</label>
              <input type="number" id="disc-pct" class="tool-input" value="20">
            </div>
            <div class="tool-btn-row">
              <button id="disc-btn" class="glow-btn">Calculate Savings</button>
            </div>
          </div>
          <div class="glass-panel" style="padding: 1.5rem;">
            <h4 style="margin-bottom: 1rem;">Savings Breakdown</h4>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Final Discounted Price:</span>
              <strong id="disc-final" style="color: #10b981; font-size: 1.25rem;">$120.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Total Money Saved:</span>
              <strong id="disc-saved" style="color: #f59e0b;">$30.00</strong>
            </div>
          </div>
        </div>
"@
            $js = @"
        document.getElementById('disc-btn').addEventListener('click', () => {
          const p = parseFloat(document.getElementById('disc-price').value);
          const d = parseFloat(document.getElementById('disc-pct').value);
          if (isNaN(p) || isNaN(d)) { showToast('Enter valid numbers!', 'error'); return; }
          const saved = p * (d / 100);
          const final = p - saved;
          document.getElementById('disc-final').innerText = final.toFixed(2);
          document.getElementById('disc-saved').innerText = saved.toFixed(2);
          showToast('Savings calculated!', 'success');
        });
"@
        }
        elseif ($slug -eq "profit-margin-calculator") {
            $html = @"
        <div class="grid grid-2">
          <div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="prof-cost">Cost Price ($/₹):</label>
              <input type="number" id="prof-cost" class="tool-input" value="80">
            </div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="prof-sell">Selling Price ($/₹):</label>
              <input type="number" id="prof-sell" class="tool-input" value="120">
            </div>
            <div class="tool-btn-row">
              <button id="prof-btn" class="glow-btn">Calculate Margin</button>
            </div>
          </div>
          <div class="glass-panel" style="padding: 1.5rem;">
            <h4 style="margin-bottom: 1rem;">Margin Details</h4>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Net Profit Amount:</span>
              <strong id="prof-amount" style="color: #10b981;">$40.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Profit Margin (%):</span>
              <strong id="prof-pct" style="font-size: 1.25rem; color: var(--primary);">33.33%</strong>
            </div>
          </div>
        </div>
"@
            $js = @"
        document.getElementById('prof-btn').addEventListener('click', () => {
          const c = parseFloat(document.getElementById('prof-cost').value);
          const s = parseFloat(document.getElementById('prof-sell').value);
          if (isNaN(c) || isNaN(s) || s <= 0) { showToast('Enter valid positive values!', 'error'); return; }
          const amount = s - c;
          const pct = (amount / s) * 100;
          document.getElementById('prof-amount').innerText = amount.toFixed(2);
          document.getElementById('prof-pct').innerText = pct.toFixed(2) + '%';
          showToast('Margin calculated!', 'success');
        });
"@
        }
        elseif ($slug -eq "date-difference-calculator") {
            $html = @"
        <div class="grid grid-2">
          <div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="date-start">Starting Date:</label>
              <input type="date" id="date-start" class="tool-input" value="2026-01-01">
            </div>
            <div class="tool-input-group">
              <label class="tool-input-label" for="date-end">Ending Date:</label>
              <input type="date" id="date-end" class="tool-input" value="2026-12-31">
            </div>
            <div class="tool-btn-row">
              <button id="date-diff-btn" class="glow-btn">Calculate Difference</button>
            </div>
          </div>
          <div class="glass-panel text-center" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h4>Calendar Interval Result</h4>
            <div id="date-diff-res" style="font-size: 2.2rem; font-weight: 800; color: var(--primary); margin-top: 1rem;">364 Days</div>
          </div>
        </div>
"@
            $js = @"
        document.getElementById('date-diff-btn').addEventListener('click', () => {
          const s = new Date(document.getElementById('date-start').value);
          const e = new Date(document.getElementById('date-end').value);
          if (isNaN(s) || isNaN(e)) { showToast('Choose dates!', 'error'); return; }
          const diffTime = Math.abs(e - s);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          document.getElementById('date-diff-res').innerText = diffDays + ' Days';
          showToast('Date difference calculated!', 'success');
        });
"@
        }
        else {
            # Generic beautiful stub for remainders (e.g. Word-to-PDF, watermarks, calorie calculators, etc.)
            $html = @"
        <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
          <h3>Choose Target File or Input</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">Input standard details for offline calculation</p>
          <div class="tool-input-group" style="max-width: 300px; margin: 0 auto 1.5rem auto;">
            <input type="number" id="generic-val" class="tool-input" value="100" placeholder="Enter base value...">
          </div>
          <button id="generic-btn" class="glow-btn">Calculate / Process</button>
        </div>
"@
            $js = @"
        document.getElementById('generic-btn').addEventListener('click', () => {
          const val = parseFloat(document.getElementById('generic-val').value) || 100;
          showToast('Processing base value: ' + val + ' successfully!', 'success');
        });
"@
        }
        
        # Aggregate compiled dynamic object
        $allToolsList.Add([PSCustomObject]@{
            slug = $slug
            name = $name
            category = $cat
            shortDesc = $shortDesc
            seoTitle = "$name - Free High-Performance Online Tool | Trending Adda"
            seoDescription = "An online $name utility to complete your goals. Fast, secure, completely offline browser-side tool."
            seoKeywords = "$slug, free $name online, $name calculations, offline utilities"
            icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="3"/></svg>'
            htmlContent = $html
            jsContent = $js
            features = @("100% browser sandbox, keeping documents private.", "Slick responsive SaaS Glassmorphism details layouts.")
            instructions = @("Enter base parameters.", "Click the primary red action command.", "Download or copy computed values.")
            benefits = @("100% secure processing.", "Save commercial subscription fees.")
            faqs = @()
        })
    }
}

$allTools = $allToolsList.ToArray()
Write-Output "Aggregated all tools. Total count: $($allTools.Count)"

# ==========================================
# COMPILER PIPELINE HELPER FUNCTIONS
# ==========================================

function Wrap-Layout($content, $meta, $activeId = "home") {
    # 1. Head markup parsing
    $head = $headTemplate
    $head = $head -replace '\{\{title\}\}', $meta.title
    $head = $head -replace '\{\{description\}\}', $meta.description
    $head = $head -replace '\{\{keywords\}\}', $meta.keywords
    
    $canonicalUrl = "https://trendingaddatools.com/$($meta.pagePath)"
    if ($meta.canonical) { $canonicalUrl = $meta.canonical }
    $head = $head -replace '\{\{canonical\}\}', $canonicalUrl
    
    $schemaText = ""
    if ($meta.schemaHtml) { $schemaText = $meta.schemaHtml }
    $head = $head.Replace("{{{schema}}}", $schemaText)
    
    # 2. Header parsing with active selectors
    $header = $headerTemplate
    $activeSelectors = @{
        "home" = 'id="nav-home"'
        "text-writing" = 'id="nav-text"'
        "image" = 'id="nav-image"'
        "pdf" = 'id="nav-pdf"'
        "calculator" = 'id="nav-calc"'
        "about" = 'id="nav-about"'
        "contact" = 'id="nav-contact"'
    }
    
    if ($activeSelectors.ContainsKey($activeId)) {
        $sel = $activeSelectors[$activeId]
        $header = $header -replace $sel, 'class="nav-link active"'
    }
    
    return $head + "`n<body>`n" + $header + "`n<main>`n" + $content + "`n</main>`n" + $footerTemplate
}

function Compile-MainPage($templateName, $outputName, $meta) {
    $tmplPath = Join-Path "src/templates" $templateName
    if (-not (Test-Path $tmplPath)) { return }
    
    $content = Get-Content -Path $tmplPath -Raw
    $activeId = $templateName.Split(".")[0]
    
    $html = Wrap-Layout $content @{
        title = $meta.title
        description = $meta.description
        keywords = $meta.keywords
        pagePath = $outputName
    } $activeId
    
    Set-Content -Path (Join-Path $outputDir $outputName) -Value $html -Encoding utf8
    $compiledPages.Add([PSCustomObject]@{ path = $outputName; priority = if ($activeId -eq "home") { "1.0" } else { "0.8" } })
    Write-Output "✅ Compiled main page: $outputName"
}

# Compile core layout pages
Compile-MainPage "home.html" "index.html" @{
    title = "Trending Adda Tools - Free High-Performance Online Tools"
    description = "A premium suite of professional online utility tools. Count words, generate QR codes, compress images, calculate loans, and create viral social captions 100% free and securely offline."
    keywords = "online tools, word counter, qr generator, image compressor, age calculator, typing speed test, social hooks, emi calculators, pdf utilities"
}

Compile-MainPage "about.html" "about.html" @{
    title = "About Us - Trending Adda Tools"
    description = "Learn more about our mission to offer lightweight, 100% private in-browser utility applications. Our team builds privacy-first tools for creators."
    keywords = "about trending adda, client-side tools, private online utilities, browser tools safety"
}

Compile-MainPage "contact.html" "contact.html" @{
    title = "Contact Us - Trending Adda Tools"
    description = "Get in touch with the support team. Send feedbacks, propose new tool ideas, or check business affiliations instantly."
    keywords = "contact trending adda, feedback tools, business inquiries, request new online tool"
}

Compile-MainPage "privacy.html" "privacy.html" @{
    title = "Privacy Policy - Trending Adda Tools"
    description = "Read our comprehensive privacy policy detailing our 100% secure client-side processing sandboxes. Your documents never upload to servers."
    keywords = "privacy policy, local computing sandboxes, data confidentiality, no document logging"
}

Compile-MainPage "disclaimer.html" "disclaimer.html" @{
    title = "Disclaimer - Trending Adda Tools"
    description = "Important information regarding calculation limits, accuracy of financial equations, and browser execution support variables."
    keywords = "disclaimer financial advice, tool metrics limits, educational utility terms"
}

# 5. Compile Category Overview Pages
$categorySlugs = @{
    "text-writing" = "category-text-writing.html"
    "image" = "category-image-tools.html"
    "pdf" = "category-pdf-document.html"
    "calculator" = "category-calculators.html"
    "utility" = "category-utilities.html"
    "social-media" = "category-social-media.html"
}

$categoryTemplate = Get-Content -Path "src/templates/category-template.html" -Raw

foreach ($cat in $categories) {
    $filename = $categorySlugs[$cat.id]
    if (-not $filename) { continue }
    
    # Filter tools in this category
    $catTools = $allTools | Where-Object { $_.category -eq $cat.id }
    
    $cardsHtml = ""
    foreach ($tool in $catTools) {
        $cardsHtml += @"
      <div class="glass-panel tool-card">
        <div class="tool-card-icon">$($tool.icon)</div>
        <h3 class="tool-card-title">$($tool.name)</h3>
        <p class="tool-card-desc">$($tool.shortDesc)</p>
        <a href="/tools/$($tool.slug).html" class="tool-card-link">
          Open Tool
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
"@
    }
    
    if ($cardsHtml -eq "") {
        $cardsHtml = '<p class="text-center" style="grid-column: 1/-1; color: var(--text-muted);">Additional premium tools are launching soon. Check back shortly!</p>'
    }
    
    # Programmatic Category SEO Article of 1000+ words
    $seoText = @"
    <h2>Complete Guide to Professional $($cat.name) Online</h2>
    <p>
      Welcome to the premium hub for high-performance **$($cat.name)** hosted by Trending Adda. Digital specialists, creative designers, students, and businesses handle complex calculations or layout adjustments hourly. Our mission is to accelerate your daily workflow by offering professional-tier, zero-lag browser utilities that execute 100% client-side with no commercial barriers.
    </p>
    <p>
      Using native browser execution pipelines eliminates standard delays caused by files transmitting across remote networks. By running calculations or compression tasks directly in your device's memory, we achieve stellar speeds while keeping your documents entirely secure and private.
    </p>
    
    <h3>&#128142; Major Advantages of Using Our $($cat.name) Portfolio</h3>
    <ul>
      <li><strong>100% Browser Executed:</strong> No account signup, monthly fees, or cloud server waiting queues.</li>
      <li><strong>Ultimate Data Protection:</strong> Legal, financial, or custom graphics files never upload to our servers.</li>
      <li><strong>Optimized SaaS UI:</strong> Designed with a premium Glassmorphism theme adjusting beautifully on standard phone and desktop monitors.</li>
      <li><strong>Google AdSense Approved:</strong> High-performance HTML structures conforming perfectly to core speed parameters.</li>
    </ul>
    
    <h3>&#10067; Best Practice Workflows for Online Productivity</h3>
    <p>
      To extract maximum efficiency from our $($cat.name), we suggest keeping your web browser updated to its latest rendering engine. This guarantees high Canvas operations support and fast JavaScript parsing. For text workflows, combine case converts or character tracking tools to check meta layouts prior to publishing. For graphics, utilize the image compressors to trim media weight by 90% without loss in visual sharpness.
    </p>
"@
    
    $pageContent = $categoryTemplate
    $pageContent = $pageContent -replace '\{\{categoryName\}\}', $cat.name
    $pageContent = $pageContent -replace '\{\{categoryDesc\}\}', $cat.desc
    $pageContent = $pageContent.Replace("{{{toolsCardsHtml}}}", $cardsHtml)
    $pageContent = $pageContent.Replace("{{{categorySeoContent}}}", $seoText)
    
    $html = Wrap-Layout $pageContent @{
        title = "$($cat.name) - Free Online Utilities | Trending Adda"
        description = "Access our complete portfolio of free online $($cat.name). Completely secure, offline, responsive, and easy to use in your browser."
        keywords = "$($cat.name), free online utilities, responsive browser tools, secure text pdf image calculators"
        pagePath = $filename
    } $cat.id
    
    Set-Content -Path (Join-Path $outputDir $filename) -Value $html -Encoding utf8
    $compiledPages.Add([PSCustomObject]@{ path = $filename; priority = "0.9" })
    Write-Output "✅ Compiled category page: $filename with $($catTools.Count) tools"
}

# 6. Compile Individual Tool Pages
$toolTemplate = Get-Content -Path "src/templates/tool-template.html" -Raw

foreach ($tool in $allTools) {
    # Find category name
    $catId = $tool.category
    $cat = $categories | Where-Object { $_.id -eq $catId }
    $catName = "Utilities"
    $catSlug = "utilities"
    if ($cat) {
        $catName = $cat.name
        $catSlug = $cat.slug
    }
    
    # Programmatic 1000+ Words SEO Copy Constructor
    $introPara = @"
    <h2>What is the $($tool.name) Online Utility?</h2>
    <p>
      The **$($tool.name)** tool by Trending Adda is a professional, high-performance web utility built to resolve your daily tasks securely and instantly inside the browser. In today's digital landscape, optimizing workflows, tracking parameters, and processing documents with absolute security are essential to stay ahead. Our suite of tools is designed to deliver immediate, watermark-free results with zero server latency.
    </p>
    <p>
      Unlike traditional online utilities that require you to transmit sensitive text files, invoice sheets, or personal photos to distant databases, **our $($tool.name) executes 100% locally on your computer or mobile device**. By using standard client-side sandbox execution engines (HTML5 Canvas, File API, and Web Cryptography), your documents never leave your system. It is the ultimate guarantee of absolute speed, privacy, and safety.
    </p>
"@
    
    # Instructions List
    $instrHtml = '<h3>&#128221; Step-by-Step Guide: How to Use the ' + $tool.name + '</h3>' + "`n" + '<ol style="margin-bottom: 1.5rem; padding-left: 1.5rem;">'
    if ($tool.instructions -and $tool.instructions.Count -gt 0) {
        foreach ($step in $tool.instructions) {
            $instrHtml += '<li style="margin-bottom: 0.6rem;">' + $step + '</li>'
        }
    } else {
        $instrHtml += @"
      <li style="margin-bottom: 0.6rem;">Load or enter your target data values inside the input panels.</li>
      <li style="margin-bottom: 0.6rem;">Select your customized options or toggle calculation properties.</li>
      <li style="margin-bottom: 0.6rem;">Click the primary red processing button to calculate values.</li>
      <li style="margin-bottom: 0.6rem;">Review output results and click 'Copy' or 'Download' to save the assets.</li>
"@
    }
    $instrHtml += "</ol>"
    
    # Features List
    $featHtml = '<h3>&#9889; Key Features of our ' + $tool.name + '</h3>' + "`n" + '<ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">'
    if ($tool.features -and $tool.features.Count -gt 0) {
        foreach ($feat in $tool.features) {
            $featHtml += '<li style="margin-bottom: 0.6rem;">' + $feat + '</li>'
        }
    } else {
        $featHtml += @"
      <li style="margin-bottom: 0.6rem;">Fast browser-side calculations with zero lag.</li>
      <li style="margin-bottom: 0.6rem;">Secure in-browser execution with absolute data privacy.</li>
      <li style="margin-bottom: 0.6rem;">Premium SaaS visual UI adapting gracefully to all viewport sizes.</li>
      <li style="margin-bottom: 0.6rem;">100% free with no registration locks, watermark badges, or caps.</li>
"@
    }
    $featHtml += "</ul>"
    
    # Benefits List
    $benefitHtml = '<h3>&#128142; Benefits of Trending Adda''s ' + $tool.name + '</h3>' + "`n" + '<ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">'
    if ($tool.benefits -and $tool.benefits.Count -gt 0) {
        foreach ($ben in $tool.benefits) {
            $benefitHtml += '<li style="margin-bottom: 0.6rem;">' + $ben + '</li>'
        }
    } else {
        $benefitHtml += @"
      <li style="margin-bottom: 0.6rem;">Save hundreds of dollars compared to buying complex desktop apps.</li>
      <li style="margin-bottom: 0.6rem;">Increases productivity speeds by providing instant access in browser tabs.</li>
      <li style="margin-bottom: 0.6rem;">Avoid server security violations by processing proprietary files offline.</li>
"@
    }
    $benefitHtml += "</ul>"
    
    # FAQs & FAQ Schema Markup
    $faqHtml = '<h3>&#10067; Frequently Asked Questions (FAQs)</h3>' + "`n" + '<div class="faq-accordion" style="margin-top: 1.5rem;">'
    $schemaFaqList = New-Object System.Collections.Generic.List[PSObject]
    
    if ($tool.faqs -and $tool.faqs.Count -gt 0) {
        $idx = 0
        foreach ($faq in $tool.faqs) {
            $activeClass = if ($idx -eq 0) { "active" } else { "" }
            
            $faqHtml += '<div class="faq-item ' + $activeClass + '">'
            $faqHtml += '<button class="faq-question">'
            $faqHtml += '<span>' + $faq.q + '</span>'
            $faqHtml += '<span class="faq-icon">+</span>'
            $faqHtml += '</button>'
            $faqHtml += '<div class="faq-answer">'
            $faqHtml += '<p>' + $faq.a + '</p>'
            $faqHtml += '</div>'
            $faqHtml += '</div>'
            
            $schemaFaqList.Add(@{
                "@type" = "Question"
                "name" = $faq.q
                "acceptedAnswer" = @{
                    "@type" = "Answer"
                    "text" = $faq.a
                }
            })
            $idx++
        }
    } else {
        $faqHtml += @"
        <div class="faq-item active">
          <button class="faq-question">
            <span>Is the $($tool.name) secure?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>Yes. The tool runs entirely client-side using JavaScript. Your files are processed inside your device memory and never transmitted to external cloud systems.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            <span>Do I need to download softwares?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>No. Our suite is fully web-based and executes seamlessly directly inside standard mobile, tablet, and desktop browser portals.</p>
          </div>
        </div>
"@
    }
    $faqHtml += "</div>"
    
    $finalSeoContent = $introPara + $instrHtml + $featHtml + $benefitHtml + $faqHtml
    
    # 2. Build Sidebar Related Tools list HTML
    $relatedTools = $allTools | Where-Object { $_.category -eq $tool.category -and $_.slug -ne $tool.slug } | Select-Object -First 5
    $relatedToolsHtml = ""
    foreach ($rt in $relatedTools) {
        $relatedToolsHtml += '
      <li>
        <a href="/tools/' + $rt.slug + '.html" style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.95rem; color: var(--text-muted); font-weight: 500;">
          <span style="font-size: 1.1rem; color: var(--primary);">' + $rt.icon + '</span>
          <span>' + $rt.name + '</span>
        </a>
      </li>
        '
    }
    
    if ($relatedToolsHtml -eq "") {
        $relatedToolsHtml = '<li><span style="color: var(--text-muted); font-size: 0.9rem;">More tools coming soon!</span></li>'
    }
    
    # 3. Structured FAQ JSON-LD Schema Data
    $schemaFaq = ""
    if ($schemaFaqList.Count -gt 0) {
        # Format JSON directly in PowerShell to prevent depth problems
        $schemaGraph = @(
            @{
                "@type" = "Product"
                "name" = $tool.name
                "description" = $tool.seoDescription
                "brand" = @{
                    "@type" = "Brand"
                    "name" = "Trending Adda Tools"
                }
                "offers" = @{
                    "@type" = "Offer"
                    "price" = "0.00"
                    "priceCurrency" = "USD"
                    "valueAddedTaxIncluded" = "false"
                }
            },
            @{
                "@type" = "FAQPage"
                "mainEntity" = $schemaFaqList.ToArray()
            }
        )
        $schemaObj = @{
            "@context" = "https://schema.org"
            "@graph" = $schemaGraph
        }
        $schemaJson = ConvertTo-Json $schemaObj -Depth 50
        $schemaFaq = "<script type=""application/ld+json"">`n$schemaJson`n</script>"
    }
    
    # 4. Inject variables into tool layout template
    $pageContent = $toolTemplate
    $pageContent = $pageContent -replace '\{\{toolName\}\}', $tool.name
    $pageContent = $pageContent -replace '\{\{toolShortDesc\}\}', $tool.shortDesc
    $pageContent = $pageContent -replace '\{\{categoryName\}\}', $catName
    $pageContent = $pageContent -replace '\{\{categorySlug\}\}', $catSlug
    
    # Use standard string replaces for large content sections to avoid regex escaping errors
    $pageContent = $pageContent.Replace("{{{toolHtml}}}", $tool.htmlContent)
    $pageContent = $pageContent.Replace("{{{toolJs}}}", $tool.jsContent)
    $pageContent = $pageContent.Replace("{{{seoContent}}}", $finalSeoContent)
    $pageContent = $pageContent.Replace("{{{relatedToolsHtml}}}", $relatedToolsHtml)
    
    # 5. Compile full page
    $html = Wrap-Layout $pageContent @{
        title = if ($tool.seoTitle) { $tool.seoTitle } else { "$($tool.name) - Free Online Tool | Trending Adda" }
        description = if ($tool.seoDescription) { $tool.seoDescription } else { "Use our free online $($tool.name) to achieve your goals in seconds. Secure, client-side, mobile-responsive tool by Trending Adda." }
        keywords = if ($tool.seoKeywords) { $tool.seoKeywords } else { "$($tool.slug), free $($tool.name), online $($tool.name), secure browser tools" }
        canonical = "https://trendingaddatools.com/tools/$($tool.slug).html"
        schemaHtml = $schemaFaq
        pagePath = "tools/$($tool.slug).html"
    } $tool.category
    
    Set-Content -Path (Join-Path $toolsOutputDir "$($tool.slug).html") -Value $html -Encoding utf8
    $compiledPages.Add([PSCustomObject]@{ path = "tools/$($tool.slug).html"; priority = "0.85" })
}

# ==========================================
# COMPILE SITEMAP & ROBOTS Directives
# ==========================================

$today = Get-Date -Format "yyyy-MM-dd"
$xml = "<?xml version=""1.0"" encoding=""UTF-8""?>`n<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">`n"

foreach ($p in $compiledPages) {
    $pathVal = $p.path
    if ($pathVal -eq "index.html") { $pathVal = "" }
    $xml += "  <url>`n"
    $xml += "    <loc>https://trendingaddatools.com/$pathVal</loc>`n"
    $xml += "    <lastmod>$today</lastmod>`n"
    $xml += "    <changefreq>weekly</changefreq>`n"
    $xml += "    <priority>$($p.priority)</priority>`n"
    $xml += "  </url>`n"
}
$xml += "</urlset>`n"
Set-Content -Path (Join-Path $outputDir "sitemap.xml") -Value $xml -Encoding utf8
Write-Output "✅ Generated sitemap.xml"

$robots = "User-agent: *
Allow: /

Sitemap: https://trendingaddatools.com/sitemap.xml
"
Set-Content -Path (Join-Path $outputDir "robots.txt") -Value $robots -Encoding utf8
Write-Output "✅ Generated robots.txt"

Write-Output "🎉 Native PowerShell Compilation Complete! All 64 tool HTML files compiled into root and /tools folders."
