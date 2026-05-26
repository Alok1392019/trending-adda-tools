/**
 * TEXT & WRITING TOOLS
 */
const textTools = [
  {
    slug: "word-counter",
    name: "Word Counter",
    category: "text-writing",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    shortDesc: "Count words, characters, sentences, and paragraphs in real-time. Analyze reading time and character density instantly.",
    seoTitle: "Free Online Word Counter - Count Words & Characters Live",
    seoDescription: "An online Word Counter tool that analyzes character length, sentences, paragraphs, letters, spaces, and estimated reading time. 100% free and mobile-friendly.",
    seoKeywords: "word counter, character counter, check length of text, count words, online text counter, reading time counter",
    
    // HTML layout for the tool
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="word-input">Enter or Paste your Text below:</label>
        <textarea id="word-input" class="tool-textarea" placeholder="Start typing or paste your content here..."></textarea>
      </div>
      
      <div class="tool-btn-row">
        <button id="clear-btn" class="btn-secondary">Clear Text</button>
        <button id="demo-btn" class="btn-secondary">Load Sample Text</button>
      </div>
      
      <div class="grid grid-4" style="margin-top: 2rem;">
        <div class="glass-panel text-center" style="padding: 1.25rem;">
          <div id="count-words" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Words</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.25rem;">
          <div id="count-chars" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Characters</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.25rem;">
          <div id="count-sentences" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Sentences</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.25rem;">
          <div id="count-paragraphs" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Paragraphs</div>
        </div>
      </div>
      
      <div class="grid grid-2" style="margin-top: 1.5rem;">
        <div class="glass-panel" style="padding: 1.5rem;">
          <h4 style="margin-bottom: 1rem; font-size: 1.1rem; color: var(--primary);">Reading & Speaking Statistics</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.95rem;">
            <span>Estimated Reading Time:</span>
            <strong id="read-time">0 min</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.95rem;">
            <span>Estimated Speaking Time:</span>
            <strong id="speak-time">0 min</strong>
          </div>
        </div>
        <div class="glass-panel" style="padding: 1.5rem;">
          <h4 style="margin-bottom: 1rem; font-size: 1.1rem; color: var(--primary);">Character Breakdown</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.95rem;">
            <span>Letters (A-Z, a-z):</span>
            <strong id="letters-count">0</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.95rem;">
            <span>Spaces & Punctuation:</span>
            <strong id="spaces-count">0</strong>
          </div>
        </div>
      </div>
    `,

    // JavaScript logic for the tool
    jsContent: `
      const wordInput = document.getElementById('word-input');
      const countWords = document.getElementById('count-words');
      const countChars = document.getElementById('count-chars');
      const countSentences = document.getElementById('count-sentences');
      const countParagraphs = document.getElementById('count-paragraphs');
      const readTime = document.getElementById('read-time');
      const speakTime = document.getElementById('speak-time');
      const lettersCount = document.getElementById('letters-count');
      const spacesCount = document.getElementById('spaces-count');
      const clearBtn = document.getElementById('clear-btn');
      const demoBtn = document.getElementById('demo-btn');
      
      function updateStats() {
        const text = wordInput.value;
        
        // Characters
        countChars.innerText = text.length;
        
        // Words (split by spaces/whitespace, filtering empty items)
        const words = text.trim() === '' ? [] : text.trim().split(/\\s+/);
        countWords.innerText = words.length;
        
        // Sentences
        const sentences = text.trim() === '' ? [] : text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        countSentences.innerText = sentences.length;
        
        // Paragraphs
        const paragraphs = text.trim() === '' ? [] : text.split(/\\n+/).filter(p => p.trim().length > 0);
        countParagraphs.innerText = paragraphs.length;
        
        // Reading/Speaking Time (approx 200 WPM for reading, 130 WPM for speaking)
        const readMins = Math.ceil(words.length / 200);
        const speakMins = Math.ceil(words.length / 130);
        readTime.innerText = words.length > 0 ? \`\${readMins} min\${readMins > 1 ? 's' : ''}\` : '0 min';
        speakTime.innerText = words.length > 0 ? \`\${speakMins} min\${speakMins > 1 ? 's' : ''}\` : '0 min';
        
        // Letter/Space count
        const letters = text.match(/[a-zA-Z]/g) || [];
        lettersCount.innerText = letters.length;
        spacesCount.innerText = text.length - letters.length;
      }
      
      wordInput.addEventListener('input', updateStats);
      
      clearBtn.addEventListener('click', () => {
        wordInput.value = '';
        updateStats();
        showToast('Text cleared!', 'info');
      });
      
      demoBtn.addEventListener('click', () => {
        wordInput.value = "Trending Adda Tools is a collection of professional, lightweight online utility web tools. Our objective is to assist content creators, developers, designers, bloggers, and daily web users to optimize their workflow and productivity without installing software. All tools run 100% locally inside the web browser to guarantee maximum security, speed, and privacy.";
        updateStats();
        showToast('Sample text loaded!', 'success');
      });
    `,
    
    // Explicit keywords and contents for programmatic 1000+ words SEO text generator
    features: [
      "Real-time, live statistics counting as you type or paste.",
      "Identifies word count, character count, sentence structure, and paragraph markers.",
      "Calculates estimated reading time and speaking times in minutes.",
      "Analyzes exact letter distributions vs white spaces and punctuation counts.",
      "100% private: all computing is done in your browser; text is never sent to servers.",
      "Optimized for standard mobile, tablet, laptop, and desktop screen layout views."
    ],
    instructions: [
      "Type directly into the large writing canvas textbox, or copy text from Word, Google Docs, or PDF files.",
      "Watch the numerical charts update in real-time, displaying overall words, letters, sentences, and paragraphs.",
      "Scroll down to see dynamic estimates of reading speeds and structural breakdown analysis.",
      "Click 'Clear Text' to wipe the inputs or click 'Load Sample Text' to test the processing engine."
    ],
    benefits: [
      "Essential for bloggers optimizing post lengths for SEO (recommended 1000 to 2000 words).",
      "Crucial for students adhering to essay limits, resume writers adjusting copy, and copywriters fitting ad banners.",
      "Speeds up workflow as there is no installation, signup, or premium subscription fees."
    ],
    faqs: [
      { q: "Is my pasted text secure on Trending Adda Tools?", a: "Yes. Our Word Counter runs entirely in your web browser using HTML5 Local JavaScript. Your text remains on your device and is never uploaded to any server." },
      { q: "How are sentences calculated?", a: "Sentences are counted using standard end punctuation marks (period, question mark, exclamation mark) that are followed by spaces." },
      { q: "Can I use it on my mobile phone?", a: "Absolutely. Our website is built with a premium responsive SaaS design system that adapts perfectly to iOS, Android, and tablets." }
    ]
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    category: "text-writing",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M3 12h18"/><circle cx="12" cy="12" r="9"/></svg>`,
    shortDesc: "Count characters in your text with or without spaces, suitable for Twitter/X character limits, SEO meta descriptions, and more.",
    seoTitle: "Free Character Counter Online - Character Limit Checker",
    seoDescription: "An online character counter that tracks character lengths with and without spaces in real-time. Ideal for Twitter/X, SEO titles, meta descriptions, and SMS constraints.",
    seoKeywords: "character counter, count characters, twitter character checker, letters counter, online letter checker, sms length checker",
    
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="char-input">Enter your Text below:</label>
        <textarea id="char-input" class="tool-textarea" placeholder="Paste or type text to count characters..."></textarea>
      </div>
      
      <div class="tool-btn-row">
        <button id="clear-btn" class="btn-secondary">Clear Text</button>
        <button id="test-sms-btn" class="btn-secondary">SMS Test</button>
        <button id="test-tweet-btn" class="btn-secondary">Tweet Test</button>
      </div>
      
      <div class="grid grid-3" style="margin-top: 2rem;">
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="chars-with-spaces" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-top: 0.5rem;">Characters (With Spaces)</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="chars-no-spaces" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-top: 0.5rem;">Characters (No Spaces)</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="words-total" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-top: 0.5rem;">Total Words</div>
        </div>
      </div>
      
      <div class="glass-panel" style="padding: 1.5rem; margin-top: 1.5rem;">
        <h4 style="margin-bottom: 1.25rem; font-size: 1.1rem; color: var(--primary);">Popular Social Platform Limit Checkers</h4>
        
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.4rem;">
            <span>Twitter/X Post (280 Max):</span>
            <strong id="tweet-progress-text">0 / 280</strong>
          </div>
          <div style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="tweet-bar" style="background: var(--primary); height: 100%; width: 0%; transition: width 0.2s ease;"></div>
          </div>
        </div>
        
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.4rem;">
            <span>SMS Message (160 standard character block):</span>
            <strong id="sms-progress-text">0 / 160 (1 segment)</strong>
          </div>
          <div style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="sms-bar" style="background: #3b82f6; height: 100%; width: 0%; transition: width 0.2s ease;"></div>
          </div>
        </div>
        
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.4rem;">
            <span>Google SEO Description (160 Recommended Max):</span>
            <strong id="seo-progress-text">0 / 160</strong>
          </div>
          <div style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="seo-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.2s ease;"></div>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const charInput = document.getElementById('char-input');
      const charsWithSpaces = document.getElementById('chars-with-spaces');
      const charsNoSpaces = document.getElementById('chars-no-spaces');
      const wordsTotal = document.getElementById('words-total');
      
      const tweetProgressText = document.getElementById('tweet-progress-text');
      const tweetBar = document.getElementById('tweet-bar');
      const smsProgressText = document.getElementById('sms-progress-text');
      const smsBar = document.getElementById('sms-bar');
      const seoProgressText = document.getElementById('seo-progress-text');
      const seoBar = document.getElementById('seo-bar');
      
      const clearBtn = document.getElementById('clear-btn');
      const testSmsBtn = document.getElementById('test-sms-btn');
      const testTweetBtn = document.getElementById('test-tweet-btn');
      
      function updateStats() {
        const text = charInput.value;
        const totalLen = text.length;
        const noSpacesLen = text.replace(/\\s/g, '').length;
        const words = text.trim() === '' ? [] : text.trim().split(/\\s+/);
        
        charsWithSpaces.innerText = totalLen;
        charsNoSpaces.innerText = noSpacesLen;
        wordsTotal.innerText = words.length;
        
        // Tweet Progress (280 limit)
        const tweetPct = Math.min((totalLen / 280) * 100, 100);
        tweetBar.style.width = tweetPct + '%';
        tweetBar.style.backgroundColor = totalLen > 280 ? '#ef4444' : 'var(--primary)';
        tweetProgressText.innerText = \`\${totalLen} / 280\`;
        
        // SMS Progress (160 blocks)
        const smsSegments = Math.ceil(totalLen / 160) || 1;
        const smsLimit = smsSegments * 160;
        const smsPct = ((totalLen % 160) / 160) * 100 || (totalLen > 0 ? 100 : 0);
        smsBar.style.width = smsPct + '%';
        smsProgressText.innerText = \`\${totalLen} / \${smsLimit} (\${smsSegments} segment\${smsSegments > 1 ? 's' : ''})\`;
        
        // SEO Meta Description Progress (160 limit)
        const seoPct = Math.min((totalLen / 160) * 100, 100);
        seoBar.style.width = seoPct + '%';
        seoBar.style.backgroundColor = totalLen > 160 ? '#f59e0b' : '#10b981';
        seoProgressText.innerText = \`\${totalLen} / 160\`;
      }
      
      charInput.addEventListener('input', updateStats);
      
      clearBtn.addEventListener('click', () => {
        charInput.value = '';
        updateStats();
        showToast('Text cleared!', 'info');
      });
      
      testSmsBtn.addEventListener('click', () => {
        charInput.value = "Hey there! This is a standard mobile SMS message content length. I am checking the processing segments of the Trending Adda character tracking application.";
        updateStats();
        showToast('SMS template loaded!', 'success');
      });
      
      testTweetBtn.addEventListener('click', () => {
        charInput.value = "Stunning new updates are rolling out on Trending Adda Tools! 🚀 Experience zero lag, glassmorphic visual excellence, offline browser processing, and over 50+ professional tools that will supercharge your productivity. Try them out today! #Productivity #WebTools #SaaS";
        updateStats();
        showToast('Tweet template loaded!', 'success');
      });
    `,
    
    features: [
      "Tracks characters with spaces and excludes spaces separately.",
      "Visual social platform gauges indicating limits for Twitter, SMS, and Google SEO metrics.",
      "Calculates SMS segment packets automatically for efficient copy-planning.",
      "Simple one-click templates to load preview contexts easily."
    ],
    instructions: [
      "Enter your character sequences in the interactive textarea block.",
      "Compare character parameters in the dedicated display panels instantly.",
      "Check the social platforms progress bars to make sure your texts fit character metrics.",
      "Trigger copy or cleaning options directly via the control layout."
    ],
    benefits: [
      "Ensures social posts don't get truncated by checking limits pre-posting.",
      "Avoid excess text-message charges by tracking the 160-character boundary limits.",
      "Saves time during meta descriptions creation for online marketing agencies."
    ],
    faqs: [
      { q: "What is the Twitter/X character limit?", a: "The standard Twitter/X character limit is 280 characters for free accounts." },
      { q: "Do standard spaces count as characters?", a: "Yes, standard spaces, tabs, and line breaks are recorded in standard character counts." },
      { q: "Why does the SMS gauge show segments?", a: "Standard mobile carrier SMS messages have a cap of 160 characters per packet. Anything beyond that divides into multiple segments." }
    ]
  },
  {
    slug: "sentence-counter",
    name: "Sentence Counter",
    category: "text-writing",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M10 20v-8"/><rect width="8" height="8" x="2" y="4" rx="2"/></svg>`,
    shortDesc: "Extract and count the exact number of sentences in your content with ease. Understand sentence lengths and write better content.",
    seoTitle: "Online Sentence Counter - Free Text Sentence Analyzer",
    seoDescription: "An online sentence counter that measures sentences, average sentence lengths, and keyword densities instantly in-browser. 100% free and mobile-friendly.",
    seoKeywords: "sentence counter, count sentences, sentence checker, check total sentences, online sentence statistics",
    
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="sentence-input">Enter your content text below:</label>
        <textarea id="sentence-input" class="tool-textarea" placeholder="Paste your text here to count sentences..."></textarea>
      </div>
      
      <div class="tool-btn-row">
        <button id="clear-btn" class="btn-secondary">Clear</button>
        <button id="demo-btn" class="btn-secondary">Load Sample Content</button>
      </div>
      
      <div class="grid grid-3" style="margin-top: 2rem;">
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="sentence-count" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Sentences</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="avg-words" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0.0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Avg. Words / Sentence</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="avg-chars" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0.0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Avg. Chars / Sentence</div>
        </div>
      </div>
    `,
    
    jsContent: `
      const sentenceInput = document.getElementById('sentence-input');
      const sentenceCount = document.getElementById('sentence-count');
      const avgWords = document.getElementById('avg-words');
      const avgChars = document.getElementById('avg-chars');
      const clearBtn = document.getElementById('clear-btn');
      const demoBtn = document.getElementById('demo-btn');
      
      function analyzeSentences() {
        const text = sentenceInput.value.trim();
        if (text === '') {
          sentenceCount.innerText = '0';
          avgWords.innerText = '0.0';
          avgChars.innerText = '0.0';
          return;
        }
        
        // Regex to split by sentence endings followed by space or end of text
        const sentences = text.split(/[.!?]+(?:\\s|$)/).filter(s => s.trim().length > 0);
        const totalSentences = sentences.length;
        sentenceCount.innerText = totalSentences;
        
        const words = text.split(/\\s+/).filter(w => w.length > 0);
        const totalWords = words.length;
        
        const totalChars = text.length;
        
        if (totalSentences > 0) {
          avgWords.innerText = (totalWords / totalSentences).toFixed(1);
          avgChars.innerText = (totalChars / totalSentences).toFixed(1);
        } else {
          avgWords.innerText = '0.0';
          avgChars.innerText = '0.0';
        }
      }
      
      sentenceInput.addEventListener('input', analyzeSentences);
      
      clearBtn.addEventListener('click', () => {
        sentenceInput.value = '';
        analyzeSentences();
        showToast('Text cleared!', 'info');
      });
      
      demoBtn.addEventListener('click', () => {
        sentenceInput.value = "Writing content requires high precision. Keeping sentences concise increases readability! Do you want your readers to stay engaged? If so, always test structural metrics with online tools. Have fun creating incredible posts.";
        analyzeSentences();
        showToast('Sample paragraphs loaded!', 'success');
      });
    `,
    
    features: [
      "Splits content by terminal punctuation indicators automatically.",
      "Calculates average word spacing ratios per sentence.",
      "Calculates average character concentrations per segment.",
      "Slick layout displaying readability metrics instantly."
    ],
    instructions: [
      "Paste your paragraphs inside the provided text-block container.",
      "Let the calculator process standard sentence boundaries.",
      "Track average structural lengths to ensure high readability standards."
    ],
    benefits: [
      "Helps improve readability scores (like Flesch-Kincaid) by highlighting sentence lengths.",
      "Increases translation efficiency by planning shorter phrases.",
      "Saves manual counting efforts for content auditors."
    ],
    faqs: [
      { q: "What punctuations qualify as sentence endings?", a: "Standard periods (.), exclamation marks (!), and question marks (?) qualify as endings." },
      { q: "Why is sentence length important?", a: "Shorter sentences (15-20 words average) are vastly easier for standard readers to digest." },
      { q: "Does this support multi-line structures?", a: "Yes, the tool splits and evaluates across paragraph lines flawlessly." }
    ]
  },
  {
    slug: "paragraph-counter",
    name: "Paragraph Counter",
    category: "text-writing",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h8"/></svg>`,
    shortDesc: "Count paragraphs in your articles and manuscripts. Maintain perfect readability and structural density for web and print publishing.",
    seoTitle: "Online Paragraph Counter - Free Text Structure Analyzer",
    seoDescription: "An online paragraph counter that splits and calculates your text paragraphs, average words, and character structures in real-time. Completely private.",
    seoKeywords: "paragraph counter, count paragraphs, text structures checker, paragraph analysis, check online articles structure",
    
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="paragraph-input">Enter your paragraphs below:</label>
        <textarea id="paragraph-input" class="tool-textarea" placeholder="Paste text here to evaluate paragraphs..."></textarea>
      </div>
      
      <div class="tool-btn-row">
        <button id="clear-btn" class="btn-secondary">Clear</button>
        <button id="demo-btn" class="btn-secondary">Load Sample Text</button>
      </div>
      
      <div class="grid grid-3" style="margin-top: 2rem;">
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="para-count" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Paragraphs</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="avg-para-words" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0.0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Avg. Words / Paragraph</div>
        </div>
        <div class="glass-panel text-center" style="padding: 1.5rem;">
          <div id="avg-para-chars" style="font-size: 2.2rem; font-weight: 800; color: var(--primary);">0.0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Avg. Chars / Paragraph</div>
        </div>
      </div>
    `,
    
    jsContent: `
      const paragraphInput = document.getElementById('paragraph-input');
      const paraCount = document.getElementById('para-count');
      const avgParaWords = document.getElementById('avg-para-words');
      const avgParaChars = document.getElementById('avg-para-chars');
      const clearBtn = document.getElementById('clear-btn');
      const demoBtn = document.getElementById('demo-btn');
      
      function analyzeParagraphs() {
        const text = paragraphInput.value.trim();
        if (text === '') {
          paraCount.innerText = '0';
          avgParaWords.innerText = '0.0';
          avgParaChars.innerText = '0.0';
          return;
        }
        
        // Split by single or multiple carriage returns
        const paras = text.split(/\\n+/).filter(p => p.trim().length > 0);
        const totalParas = paras.length;
        paraCount.innerText = totalParas;
        
        const words = text.split(/\\s+/).filter(w => w.length > 0);
        const totalWords = words.length;
        const totalChars = text.length;
        
        if (totalParas > 0) {
          avgParaWords.innerText = (totalWords / totalParas).toFixed(1);
          avgParaChars.innerText = (totalChars / totalParas).toFixed(1);
        } else {
          avgParaWords.innerText = '0.0';
          avgParaChars.innerText = '0.0';
        }
      }
      
      paragraphInput.addEventListener('input', analyzeParagraphs);
      
      clearBtn.addEventListener('click', () => {
        paragraphInput.value = '';
        analyzeParagraphs();
        showToast('Text cleared!', 'info');
      });
      
      demoBtn.addEventListener('click', () => {
        paragraphInput.value = "First paragraph: Welcome to the Trending Adda tools interface! We create top-tier browser solutions.\\n\\nSecond paragraph: Keeping layout blocks separated by empty carriage lines provides highly-readable articles that rank well on search engines like Google.\\n\\nThird paragraph: Let's start crafting modern blogs now!";
        analyzeParagraphs();
        showToast('Sample layout loaded!', 'success');
      });
    `,
    
    features: [
      "Splits content by line breaks or carriage return blocks.",
      "Estimates paragraphs and readability concentration graphs.",
      "No file transfers: processes fully within the browser tab environment."
    ],
    instructions: [
      "Paste your documents into the large writing container.",
      "Check total paragraphs highlighted on the main grid displays.",
      "Maintain 3-4 sentence structures per paragraph for optimal readability."
    ],
    benefits: [
      "Highly useful for content designers working with copy templates.",
      "Perfect for academic writers formatting thesis chapters.",
      "Optimized for standard search engine indexing readability structures."
    ],
    faqs: [
      { q: "How are paragraphs split?", a: "They are split by line breaks or carriage returns (\\n or \\r\\n)." },
      { q: "What is the recommended paragraph size for blogs?", a: "For websites, short paragraphs of 2 to 3 sentences (under 80 words) are highly recommended." },
      { q: "Is there any limit to the text length?", a: "No, our JS script processes millions of words instantly without limitations." }
    ]
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    category: "text-writing",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4-9 4 9"/><path d="M4 14h6"/><path d="M15 11v6a2 2 0 0 0 4 0v-6"/><path d="M15 14h4"/><path d="M15 8h4"/></svg>`,
    shortDesc: "Change text cases instantly. Convert to UPPERCASE, lowercase, Sentence case, Capitalize Case, Title Case, or alternating case.",
    seoTitle: "Case Converter Online - Free Text Case Changer",
    seoDescription: "An online case converter that changes text cases immediately. Toggle upper, lower, sentence, capitalized, alternating, or title case. Free with one-click copy.",
    seoKeywords: "case converter, change text case, uppercase, lowercase, sentence case, title case, transform text",
    
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="case-input">Enter your Text below:</label>
        <textarea id="case-input" class="tool-textarea" placeholder="Paste your text here to convert cases..."></textarea>
      </div>
      
      <div class="tool-btn-row">
        <button id="upper-btn" class="glow-btn">UPPER CASE</button>
        <button id="lower-btn" class="btn-secondary">lower case</button>
        <button id="sentence-btn" class="btn-secondary">Sentence case</button>
        <button id="capitalized-btn" class="btn-secondary">Capitalized Case</button>
        <button id="title-btn" class="btn-secondary">Title Case</button>
        <button id="alt-btn" class="btn-secondary">aLtErNaTiNg CaSe</button>
        <button id="clear-btn" class="btn-secondary" style="border-color: #ef4444; color: #ef4444;">Clear</button>
      </div>
      
      <div class="tool-output-box">
        <div class="tool-output-title">Converted Output</div>
        <button class="copy-btn" data-target="case-input">Copy</button>
        <div id="case-output-placeholder" class="tool-output-content" style="font-family: inherit;">Your converted text will appear here as you click the buttons above...</div>
      </div>
    `,
    
    jsContent: `
      const caseInput = document.getElementById('case-input');
      const caseOutputPlaceholder = document.getElementById('case-output-placeholder');
      
      const upperBtn = document.getElementById('upper-btn');
      const lowerBtn = document.getElementById('lower-btn');
      const sentenceBtn = document.getElementById('sentence-btn');
      const capitalizedBtn = document.getElementById('capitalized-btn');
      const titleBtn = document.getElementById('title-btn');
      const altBtn = document.getElementById('alt-btn');
      const clearBtn = document.getElementById('clear-btn');
      
      function updateOutput(text) {
        if(text === '') {
          caseOutputPlaceholder.innerText = 'Your converted text will appear here as you click the buttons above...';
          return;
        }
        caseOutputPlaceholder.innerText = text;
        // Also keep input in sync for easy consecutive edits
        caseInput.value = text;
      }
      
      upperBtn.addEventListener('click', () => {
        const text = caseInput.value.toUpperCase();
        updateOutput(text);
        showToast('Converted to UPPERCASE!', 'success');
      });
      
      lowerBtn.addEventListener('click', () => {
        const text = caseInput.value.toLowerCase();
        updateOutput(text);
        showToast('Converted to lowercase!', 'success');
      });
      
      sentenceBtn.addEventListener('click', () => {
        let text = caseInput.value.toLowerCase();
        // Capitalize first letter of every sentence
        text = text.replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
        updateOutput(text);
        showToast('Converted to Sentence case!', 'success');
      });
      
      capitalizedBtn.addEventListener('click', () => {
        let text = caseInput.value.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        updateOutput(text);
        showToast('Converted to Capitalized Case!', 'success');
      });
      
      titleBtn.addEventListener('click', () => {
        const minorWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'in', 'at', 'to', 'by', 'of', 'for', 'with'];
        let text = caseInput.value.toLowerCase().split(' ').map((w, idx) => {
          if (idx !== 0 && minorWords.includes(w)) return w;
          return w.charAt(0).toUpperCase() + w.slice(1);
        }).join(' ');
        updateOutput(text);
        showToast('Converted to Title Case!', 'success');
      });
      
      altBtn.addEventListener('click', () => {
        const chars = caseInput.value.split('');
        const converted = chars.map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
        updateOutput(converted);
        showToast('Converted to alternating case!', 'success');
      });
      
      clearBtn.addEventListener('click', () => {
        caseInput.value = '';
        updateOutput('');
        showToast('Input cleared!', 'info');
      });
    `,
    
    features: [
      "Convert text cases in one click without page reloads.",
      "Handles 6 different popular writing case methodologies.",
      "Automatic Title Case minor words exclusion logic.",
      "Copy button integrated with browser clipboard API triggers."
    ],
    instructions: [
      "Paste your text directly into the large conversion box.",
      "Click on your desired case modifier (UPPERCASE, lowercase, Title, Alternating, etc.).",
      "Click 'Copy' to save the output text block immediately."
    ],
    benefits: [
      "Eliminates the annoyance of re-typing sentences written in accidental caps lock.",
      "Ensures blog and video titles follow official styling formatting layouts.",
      "Highly useful for database cleaning, Excel formats, and programming variables."
    ],
    faqs: [
      { q: "What is Sentence Case?", a: "It capitalizes only the first letter of each sentence, keeping the remaining letters in lowercase." },
      { q: "What is Title Case?", a: "Title Case capitalizes all words except minor conjunctions, prepositions, and articles (e.g., 'and', 'the', 'with')." },
      { q: "Is there an alternating case?", a: "Yes, our alternating case converter switches characters between lower and upper case recursively for stylized texts." }
    ]
  },
  {
    slug: "fancy-text-generator",
    name: "Fancy Text Generator",
    category: "text-writing",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/></svg>`,
    shortDesc: "Generate fancy unicode fonts for Instagram bio profile displays, Twitter posts, WhatsApp chats, and game tags instantly.",
    seoTitle: "Fancy Text Generator - Stylish Font Changer Online",
    seoDescription: "An online fancy text generator that converts normal text into beautiful, stylish unicode fonts. Ideal for Instagram bios, Facebook posts, and WhatsApp status.",
    seoKeywords: "fancy text generator, stylish font changer, cool unicode fonts, copy and paste fonts, instagram fonts",
    
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="fancy-input">Enter text to make it fancy:</label>
        <input type="text" id="fancy-input" class="tool-input" placeholder="Type something cool here..." value="Trending Adda Tools">
      </div>
      
      <div class="tool-btn-row">
        <button id="fancy-clear" class="btn-secondary">Clear</button>
      </div>
      
      <div id="fancy-list" class="grid grid-2" style="margin-top: 2rem;">
        <!-- Generated fonts appear here dynamically -->
      </div>
    `,
    
    jsContent: `
      const fancyInput = document.getElementById('fancy-input');
      const fancyClear = document.getElementById('fancy-clear');
      const fancyList = document.getElementById('fancy-list');
      
      // Font map definitions
      const fontMaps = {
        bubble: {
          a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ',
          n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ',
          A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ',
          N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ',
          '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
        },
        squared: {
          a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄿', h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼',
          n: '🄽', o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄', v: '🅅', w: '🅆', x: '🅇', y: '🅈', z: '🅉',
          A: '🄰', B: '🄱', C: '🄲', D: '🄳', E: '🄴', F: '🄵', G: '🄿', H: '🄷', I: '🄸', J: '🄹', K: '🄺', L: '🄻', M: '🄼',
          N: '🄽', O: '🄾', P: '🄿', Q: '🅀', R: '🅁', S: '🅂', T: '🅃', U: '🅄', V: '🅅', W: '🅆', X: '🅇', Y: '🅈', Z: '🅉'
        },
        script: {
          a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶',
          n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃',
          A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕', G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛', M: '𝓜',
          N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡', S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧', Y: '𝓨', Z: '𝓩'
        },
        fraktur: {
          a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪',
          n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷',
          A: '𝔄', B: '𝔅', C: '𝔍', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: '𝔋', I: '𝔌', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐',
          N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: '𝔕', S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ'
        },
        monospace: {
          a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖',
          n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
          A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼',
          N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉'
        },
        inverted: {
          a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ',
          n: 'uu', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
          A: '∀', B: '𐐒', C: 'Ɔ', D: '◖', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W',
          N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z'
        }
      };
      
      const styleNames = {
        bubble: 'Bubble Outline Fonts',
        squared: 'Squared Box Fonts',
        script: 'Beautiful Cursive Font',
        fraktur: 'Classic Fraktur Gothic',
        monospace: 'Modern Monospace Code',
        inverted: 'Inverted Upside Down'
      };
      
      function generateFonts() {
        const text = fancyInput.value;
        fancyList.innerHTML = '';
        
        if (text === '') return;
        
        Object.keys(fontMaps).forEach(style => {
          const map = fontMaps[style];
          const fancyText = text.split('').map(c => map[c] || c).join('');
          
          const cardId = \`fancy-op-\${style}\`;
          
          const panel = document.createElement('div');
          panel.className = 'glass-panel';
          panel.style.padding = '1.25rem';
          panel.style.position = 'relative';
          
          panel.innerHTML = \`
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">\${styleNames[style]}</div>
            <textarea id="\${cardId}" readonly style="width: 100%; border: none; background: transparent; font-size: 1.25rem; font-weight: 600; color: var(--text-main); outline: none; resize: none; height: 40px; font-family: inherit;">\${fancyText}</textarea>
            <button class="copy-btn" data-target="\${cardId}">Copy</button>
          \`;
          
          fancyList.appendChild(panel);
        });
        
        // Trigger lighting trails update
        initHoverEffects();
      }
      
      fancyInput.addEventListener('input', generateFonts);
      fancyClear.addEventListener('click', () => {
        fancyInput.value = '';
        generateFonts();
        showToast('Input cleared!', 'info');
      });
      
      // Run once on load
      generateFonts();
    `,
    
    features: [
      "Translates normal letters into standard unicode font symbols.",
      "6 stylized fonts (cursive, bubble, gothic, monospace, flipped).",
      "Dynamic responsive list updating live with instant copier clips.",
      "100% compatible with popular socials like TikTok, Instagram, and bio sheets."
    ],
    instructions: [
      "Type your favorite handle name inside the input textbox.",
      "Choose from the generated visual list blocks of fancy styled fonts.",
      "Click 'Copy' beside your chosen font style to immediately copy it to your clipboard."
    ],
    benefits: [
      "Saves having to seek out specialized fonts or HTML symbol blocks manually.",
      "Provides engaging posts that trigger higher viewer attention and retention.",
      "Ideal for gaming usernames in Fortnite, PUBG, Free Fire, and Minecraft tags."
    ],
    faqs: [
      { q: "How do fancy unicode fonts work?", a: "They utilize specific Unicode characters from advanced glyph tables that look like styled standard alphabet letters." },
      { q: "Will these fonts work on Instagram?", a: "Yes. Almost all modern social media apps support Unicode glyph structures natively in descriptions and posts." },
      { q: "Are there special characters included?", a: "Yes, numbers and standard letters are converted seamlessly while symbols are preserved." }
    ]
  }
];

module.exports = textTools;
