/**
 * SOCIAL MEDIA GENERATORS - COMPLETE PORTFOLIO
 */
const socialTools = [
  {
    slug: "bio-generator",
    name: "Instagram Bio Generator",
    category: "social-media",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    shortDesc: "Generate stylish, engaging, and professional Instagram bio profiles in seconds. Stand out from the crowd and attract followers.",
    seoTitle: "Free Instagram Bio Generator - Creative Profile Bio Ideas",
    seoDescription: "An online Instagram Bio Generator that helps you create engaging profile descriptions. Choose themes (business, funny, aesthetic) and copy instantly.",
    seoKeywords: "instagram bio generator, bio maker online, creative bio ideas, profile description maker, custom instagram profiles",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Profile Particulars</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="bio-niche">Your Niche/Keywords (e.g. Travel, Coding, Artist):</label>
            <input type="text" id="bio-niche" class="tool-input" value="Travel & Photography" placeholder="Enter keywords...">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="bio-tone">Bio Vibe Tone:</label>
            <select id="bio-tone" class="tool-select">
              <option value="aesthetic">Aesthetic & Clean</option>
              <option value="professional">Professional / Business</option>
              <option value="funny">Humorous & Witty</option>
              <option value="minimalist">Minimalist / Short</option>
            </select>
          </div>
          <div class="tool-btn-row">
            <button id="generate-bio-btn" class="glow-btn">Generate Bios</button>
          </div>
        </div>
        
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Creative Bio Options</h4>
          <div id="bio-results-holder" style="display: flex; flex-direction: column; gap: 1.25rem;"></div>
        </div>
      </div>
    `,
    
    jsContent: `
      const bioNiche = document.getElementById('bio-niche');
      const bioTone = document.getElementById('bio-tone');
      const generateBioBtn = document.getElementById('generate-bio-btn');
      const bioResultsHolder = document.getElementById('bio-results-holder');
      
      const bioTemplates = {
        aesthetic: [
          "✨ {niche} Lover\\n🎨 Creating visual stories\\n📍 Wandering where the wifi is weak\\n📩 Collabs: DM me!",
          "🌿 Chasing light and {niche}\\n💫 Dream big. Work hard. Stay humble.\\n✨ Capturing moments in frames\\n👇 Journey updates:",
          "🌙 Living my best {niche} life\\n🪐 Collecting memories, not things\\n🔮 Pure vibes & cozy corners\\n⚡️ Tap here to connect:"
        ],
        professional: [
          "💼 Specialist in {niche}\\n📈 Helping creators achieve massive scale\\n🚀 Founder of Trending Adda\\n🎙️ Speaker & Consultant\\n👇 Work with me:",
          "🎯 Focus: {niche} & Design\\n🔥 5+ Years of Industry Experience\\n📊 Delivering results & high conversion\\n📥 Business: info@niche.com",
          "🌟 Passionate about {niche}\\n🛠️ Creating solutions for modern businesses\\n🌐 Check out my portfolio details:"
        ],
        funny: [
          "🐒 Professional {niche} enthusiast\\n🍕 Powered by pizza and anxiety\\n🤷‍♂️ I have no idea what I am doing, but it looks good\\n👇 Click at your own risk:",
          "👽 Official member of {niche} club\\n☕ 90% caffeine, 10% coding\\n🛌 Sleeping is my Olympic sport\\n🕸️ My portal:",
          "🦄 {niche} is my passion, sleep is my priority\\n🤖 Beep boop, this is an automated profile\\n👇 Don't click this link:"
        ],
        minimalist: [
          "✨ {niche}\\n⚡️ Less talk, more action\\n🪐 Studio vibes\\n👇",
          "🍃 Simple life & {niche}\\n☁️ Floating in frames\\n🔗",
          "⚡️ {niche} curator\\n💡 Innovation lives here\\n🌐"
        ]
      };
      
      function generateBios() {
        const niche = bioNiche.value.trim() || 'Aesthetics';
        const tone = bioTone.value;
        const templates = bioTemplates[tone] || bioTemplates.aesthetic;
        bioResultsHolder.innerHTML = '';
        
        templates.forEach((tmpl, index) => {
          const bioText = tmpl.replace(/{niche}/g, niche);
          const cardId = 'bio-op-' + index;
          const wrapper = document.createElement('div');
          wrapper.className = 'glass-panel';
          wrapper.style.padding = '1rem';
          wrapper.style.position = 'relative';
          wrapper.style.background = 'rgba(255,255,255,0.02)';
          
          wrapper.innerHTML = '<pre id="' + cardId + '" style="font-family: inherit; font-size: 0.95rem; white-space: pre-wrap; margin-right: 50px; line-height: 1.6; font-weight: 500; color: var(--text-main);">' + bioText + '</pre><button class="copy-btn" data-target="' + cardId + '" style="top: 10px; right: 10px;">Copy</button>';
          bioResultsHolder.appendChild(wrapper);
        });
        showToast('Generated creative bios!', 'success');
      }
      generateBioBtn.addEventListener('click', generateBios);
      generateBios();
    `,
    
    features: [
      "Select vibes matching Aesthetic, Funny, Corporate, or Minimalist standards.",
      "Custom niche variables injection, optimizing details on the fly.",
      "Instant copy controls saving design layouts."
    ],
    instructions: [
      "Type your target niche keyword in the input block.",
      "Select your vibe category in the menu.",
      "Click 'Generate Bios' to produce multiple tailored layouts.",
      "Click 'Copy' beside the template you love to import it directly to Instagram."
    ],
    benefits: [
      "Helps increase follower counts by structuring bios beautifully.",
      "Provides rapid ideas for multiple profiles."
    ],
    faqs: [
      { q: "How long should an Instagram bio be?", a: "Instagram bios have a maximum character limit of 150 characters, including spaces." }
    ]
  },
  {
    slug: "instagram-font-generator",
    name: "Instagram Font Generator",
    category: "social-media",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
    shortDesc: "Generate beautiful styled unicode fonts for your Instagram bios and captions in one click. Fully compatible with social apps.",
    seoTitle: "Free Instagram Font Generator - Cool Fonts Copy & Paste",
    seoDescription: "An online Instagram Font Generator that compiles stylish normal text into cool unicode symbols instantly. Copy and paste safely.",
    seoKeywords: "instagram font generator, cool fonts for instagram bio, copy paste social fonts, cursive font generator",
    
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="insta-font-input">Enter text to convert:</label>
        <input type="text" id="insta-font-input" class="tool-input" value="Insta Style Hacks">
      </div>
      <div id="insta-font-results" class="grid grid-2" style="margin-top: 2rem;"></div>
    `,
    
    jsContent: `
      const input = document.getElementById('insta-font-input');
      const results = document.getElementById('insta-font-results');
      
      const glyphs = {
        bubble: {
          a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ',
          n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ',
          A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ',
          N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ'
        },
        script: {
          a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶',
          n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃',
          A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕', G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛', M: '𝓜',
          N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡', S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧', Y: '𝓨', Z: '𝓩'
        }
      };
      
      function renderFonts() {
        const text = input.value;
        results.innerHTML = '';
        if (text === '') return;
        
        Object.keys(glyphs).forEach(style => {
          const map = glyphs[style];
          const fancyText = text.split('').map(c => map[c] || c).join('');
          const cardId = 'insta-op-' + style;
          
          const panel = document.createElement('div');
          panel.className = 'glass-panel';
          panel.style.padding = '1.25rem';
          panel.style.position = 'relative';
          
          panel.innerHTML = '<div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">' + style + ' font</div><textarea id="' + cardId + '" readonly style="width: 100%; border: none; background: transparent; font-size: 1.25rem; font-weight: 600; color: var(--text-main); outline: none; resize: none; height: 40px; font-family: inherit;">' + fancyText + '</textarea><button class="copy-btn" data-target="' + cardId + '">Copy</button>';
          results.appendChild(panel);
        });
      }
      input.addEventListener('input', renderFonts);
      renderFonts();
    `,
    
    features: [
      "Translates normal text to social-friendly unicode blocks.",
      "100% compatible with bios, status sheets, and posts."
    ],
    instructions: [
      "Type standard letters in the text panel.",
      "Copy your favorite fancy styled font."
    ],
    benefits: [
      "Provides rapid aesthetics fonts in under a second."
    ],
    faqs: [
      { q: "Is the custom font supported everywhere?", a: "Yes, almost all modern systems support unicode glyph parameters natively." }
    ]
  },
  {
    slug: "reel-script-generator",
    name: "Reel Script Generator",
    category: "social-media",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="3" rx="2"/><path d="M12 18v3"/><path d="M9 21h6"/></svg>`,
    shortDesc: "Generate highly engaging, fully formatted 60s Reel and TikTok video scripts. Specify topics and get hooks, body details, and CTAs.",
    seoTitle: "Free Reel Script Generator - Video Script Maker Online",
    seoDescription: "An online Reel Script Generator that compiles 60-second video outlines. Choose your topics and copy formatted scene guides instantly.",
    seoKeywords: "reel script generator, tiktok script maker, youtube shorts script creator, short video scripts, creative video outline",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Video Script Variables</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="reel-topic">Video Topic / Secret:</label>
            <input type="text" id="reel-topic" class="tool-input" value="How to scale productivity to 10x" placeholder="Enter video topic...">
          </div>
          <div class="tool-btn-row">
            <button id="generate-script-btn" class="glow-btn">Generate Video Script</button>
          </div>
        </div>
        
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Your Script Outline</h4>
          <div id="script-results-holder" style="display: flex; flex-direction: column; gap: 1.25rem;"></div>
        </div>
      </div>
    `,
    
    jsContent: `
      const topic = document.getElementById('reel-topic');
      const generateBtn = document.getElementById('generate-script-btn');
      const holder = document.getElementById('script-results-holder');
      
      function generateScript() {
        const val = topic.value.trim() || 'Aesthetic Lifestyles';
        holder.innerHTML = '';
        
        const scriptText = "[0-5s: THE HOOK]\\n" +
          "🎬 Visual: Point at camera with a fast subtitle zoom!\\n" +
          "🗣️ Speak: \\\"Stop doing standard hacks. If you want to master {topic}, this is the secret...\\\"\\n\\n" +
          "[5-30s: THE BODY]\\n" +
          "🎬 Visual: Show screen or switch angle. Point at 3 bullet tips!\\n" +
          "🗣️ Speak: \\\"Tip 1: Isolate tasks first. Tip 2: Lock browser-side tools. Tip 3: Schedule short breaks.\\\"\\n\\n" +
          "[30-45s: THE REVEAL]\\n" +
          "🎬 Visual: Slow nod, smiling layout.\\n" +
          "🗣️ Speak: \\\"Trending Adda Tools makes this 100% free and offline.\\\"\\n\\n" +
          "[45-60s: CALL TO ACTION]\\n" +
          "🎬 Visual: Point downwards!\\n" +
          "🗣️ Speak: \\\"Go test the link in my bio. Follow for daily productivity secrets!\\\"";
          
        const formatted = scriptText.replace(/{topic}/g, val);
        const cardId = 'script-op-0';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'glass-panel';
        wrapper.style.padding = '1rem';
        wrapper.style.position = 'relative';
        
        wrapper.innerHTML = '<pre id="' + cardId + '" style="font-family: inherit; font-size: 0.95rem; white-space: pre-wrap; margin-right: 50px; line-height: 1.6; color: var(--text-main); font-weight: 500;">' + formatted + '</pre><button class="copy-btn" data-target="' + cardId + '" style="top: 10px; right: 10px;">Copy</button>';
        holder.appendChild(wrapper);
        showToast('Video Script compiled successfully!', 'success');
      }
      
      generateBtn.addEventListener('click', generateScript);
      generateScript();
    `,
    
    features: [
      "Provides structured time-coded video sections (hook, body, CTA).",
      "Includes specific screen direction cues for visual indicators.",
      "100% browser sandbox offline compilation."
    ],
    instructions: [
      "Input your short video niche or secret topic.",
      "Click 'Generate Video Script' and copy the outlines."
    ],
    benefits: [
      "Saves hours of scriptwriting frustrations.",
      "Ensures high pacing structures matching standard algorithm retention metrics."
    ],
    faqs: [
      { q: "Is the script formatted for TikTok?", a: "Yes. Cues scale perfectly across Reels, Shorts, and TikTok video outlines." }
    ]
  },
  {
    slug: "viral-hook-generator",
    name: "Viral Hook Generator",
    category: "social-media",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/></svg>`,
    shortDesc: "Generate attention-grabbing hooks for TikToks, YouTube Shorts, and Reels. Keep viewers watching and trigger massive algorithmic reach.",
    seoTitle: "Free Viral Hook Generator - Short Video Hook Maker",
    seoDescription: "An online Hook Generator that helps you create engaging video openers. Choose from controversy, curiosity, or value styles.",
    seoKeywords: "viral hook generator, tiktok hook maker, youtube shorts hooks, video hooks generator, social hooks maker",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Video Hook Variables</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="hook-topic">Video Topic (e.g. Coding Secrets, Cooking Tips):</label>
            <input type="text" id="hook-topic" class="tool-input" value="Making Money Online">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="hook-type">Hook Strategy Category:</label>
            <select id="hook-type" class="tool-select">
              <option value="curiosity">Curiosity & Mystery</option>
              <option value="controversy">Bold / Controversy</option>
              <option value="value">Value & Education</option>
            </select>
          </div>
          <div class="tool-btn-row">
            <button id="generate-hooks-btn" class="glow-btn">Generate Video Hooks</button>
          </div>
        </div>
        
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Suggested Hooks</h4>
          <div id="hook-results-holder" style="display: flex; flex-direction: column; gap: 1.25rem;"></div>
        </div>
      </div>
    `,
    
    jsContent: `
      const hookTopic = document.getElementById('hook-topic');
      const hookType = document.getElementById('hook-type');
      const generateHooksBtn = document.getElementById('generate-hooks-btn');
      const hookResultsHolder = document.getElementById('hook-results-holder');
      
      const hookTemplates = {
        curiosity: [
          "❌ Stop scrolling if you want to know the truth about {topic}...",
          "⚠️ Most creators won't tell you this secret about {topic}!",
          "🤫 This one simple hack changed how I view {topic} forever..."
        ],
        controversy: [
          "🔥 I am going to get hate for this, but standard advice about {topic} is totally wrong!",
          "🤦‍♂️ 99% of people fail at {topic} because they do this...",
          "🛑 Please stop spending money on {topic} courses. Here's why..."
        ],
        value: [
          "💡 Here are 3 simple steps to master {topic} in under 60 seconds:",
          "📈 If you are trying to scale your {topic}, check out this tool:",
          "🚀 Free resource guide: How to kickstart your {topic} journey today!"
        ]
      };
      
      function generateHooks() {
        const topic = hookTopic.value.trim() || 'Social Media Growth';
        const type = hookType.value;
        const templates = hookTemplates[type] || hookTemplates.curiosity;
        hookResultsHolder.innerHTML = '';
        
        templates.forEach((tmpl, index) => {
          const hookText = tmpl.replace(/{topic}/g, topic);
          const cardId = 'hook-op-' + index;
          const wrapper = document.createElement('div');
          wrapper.className = 'glass-panel';
          wrapper.style.padding = '1rem';
          wrapper.style.position = 'relative';
          wrapper.style.background = 'rgba(255,255,255,0.02)';
          
          wrapper.innerHTML = '<pre id="' + cardId + '" style="font-family: inherit; font-size: 0.95rem; white-space: pre-wrap; margin-right: 50px; line-height: 1.6; font-weight: 500; color: var(--text-main);">' + hookText + '</pre><button class="copy-btn" data-target="' + cardId + '" style="top: 10px; right: 10px;">Copy</button>';
          hookResultsHolder.appendChild(wrapper);
        });
        showToast('Generated hooks successfully!', 'success');
      }
      generateHooksBtn.addEventListener('click', generateHooks);
      generateHooks();
    `,
    
    features: [
      "Curiosity, controversy, or value hook options.",
      "Optimized for high retention click-through thresholds."
    ],
    instructions: [
      "Enter your short video topic in the topic textbox.",
      "Select your viral marketing angle.",
      "Click 'Generate Hooks' and copy the opener."
    ],
    benefits: [
      "Drastically improves standard 3-second viewer retention scores."
    ],
    faqs: [
      { q: "What is a hook?", a: "A hook is the initial 2-3 seconds of a video aimed at keeping viewers from scrolling away." }
    ]
  },
  {
    slug: "instagram-caption-generator",
    name: "Instagram Caption Generator",
    category: "social-media",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    shortDesc: "Generate highly engaging, relevant captions for your Instagram posts in seconds. Simply enter keywords and select your tone.",
    seoTitle: "Free Instagram Caption Generator - Creative Video Captions",
    seoDescription: "An online Instagram Caption Generator that produces viral captions and hashtags in a click. Free with one-click copy.",
    seoKeywords: "instagram caption generator, generate instagram captions, creative caption maker online, post subtitles generator",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Caption Details</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="cap-topic">Post Topic (e.g. Sunny day, Launching new app):</label>
            <input type="text" id="cap-topic" class="tool-input" value="Launching a new website" placeholder="Enter post topic...">
          </div>
          <div class="tool-btn-row">
            <button id="generate-cap-btn" class="glow-btn">Generate Captions</button>
          </div>
        </div>
        
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Suggested Captions</h4>
          <div id="cap-results-holder" style="display: flex; flex-direction: column; gap: 1.25rem;"></div>
        </div>
      </div>
    `,
    
    jsContent: `
      const topic = document.getElementById('cap-topic');
      const generateBtn = document.getElementById('generate-cap-btn');
      const holder = document.getElementById('cap-results-holder');
      
      const templates = [
        "✨ Big moves only! Today, we are officially {topic} 🚀. Grateful for the journey and excited for what's next. Tap link in bio to explore! #LaunchDay #NewBeginnings #SaaS #Growth",
        "🎯 The dream is free, the hustle is sold separately. Here's a sneak peek at us {topic} 🔥. What do you think? Let me know in the comments below! #Motivation #Startup #Hustle #DailyCoding",
        "🪐 Floating in ideas and finally {topic} ☁️. Less talk, more action. Let's make this week count! #Vibes #Aesthetic #VisualStories #Lifestyle"
      ];
      
      function generateCaptions() {
        const val = topic.value.trim() || 'Aesthetics';
        holder.innerHTML = '';
        
        templates.forEach((tmpl, index) => {
          const capText = tmpl.replace(/{topic}/g, val);
          const cardId = 'cap-op-' + index;
          const wrapper = document.createElement('div');
          wrapper.className = 'glass-panel';
          wrapper.style.padding = '1rem';
          wrapper.style.position = 'relative';
          
          wrapper.innerHTML = '<pre id="' + cardId + '" style="font-family: inherit; font-size: 0.95rem; white-space: pre-wrap; margin-right: 50px; line-height: 1.6; color: var(--text-main); font-weight: 500;">' + capText + '</pre><button class="copy-btn" data-target="' + cardId + '" style="top: 10px; right: 10px;">Copy</button>';
          holder.appendChild(wrapper);
        });
        showToast('Generated captions successfully!', 'success');
      }
      
      generateBtn.addEventListener('click', generateCaptions);
      generateCaptions();
    `,
    
    features: [
      "Custom topic variable injections.",
      "Includes highly relevant popular hashtags tags.",
      "100% browser sandbox local generation."
    ],
    instructions: [
      "Input your image description or video topic.",
      "Click 'Generate Captions' and review suggestions."
    ],
    benefits: [
      "Improves post interactions using standard prompt triggers.",
      "Saves writer's block frustrations."
    ],
    faqs: [
      { q: "Do these captions work on TikTok?", a: "Yes. Engaging captions drive comments across all short-form social media frameworks." }
    ]
  },
  {
    slug: "whatsapp-sticker-maker",
    name: "WhatsApp Sticker Maker",
    category: "social-media",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    shortDesc: "Create standard outlines on your photos to format them as WhatsApp stickers. Add clean thick white borders in your browser.",
    seoTitle: "Free WhatsApp Sticker Maker Online - Create Custom Sticker Outlines",
    seoDescription: "An online WhatsApp Sticker Maker that formats images with thick white sticker borders. Secure, client-side, and 100% free.",
    seoKeywords: "whatsapp sticker maker, create custom stickers online, add sticker border to png photo, free sticker outlines generator",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/></svg>
        <h3>Select PNG Graphic with Transparent Background</h3>
        <button class="glow-btn" onclick="document.getElementById('sticker-file').click()">Select PNG File</button>
        <input type="file" id="sticker-file" style="display: none;" accept="image/png">
      </div>
      
      <div id="sticker-controls" style="display: none;" class="glass-panel text-center" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Sticker successfully loaded</h4>
        <div class="tool-btn-row" style="justify-content: center;">
          <button id="run-sticker-btn" class="glow-btn">Add Sticker Border</button>
          <a id="sticker-download-link" href="#" class="btn-secondary" style="display: none;" download="whatsapp_sticker.png">Download PNG Sticker</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('sticker-file');
      const controls = document.getElementById('sticker-controls');
      const runBtn = document.getElementById('run-sticker-btn');
      const downloadLink = document.getElementById('sticker-download-link');
      
      let loadedImg = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImg = new Image();
          loadedImg.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('PNG sticker loaded successfully!', 'success');
          };
          loadedImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      runBtn.addEventListener('click', () => {
        if (!loadedImg) return;
        const canvas = document.createElement('canvas');
        canvas.width = loadedImg.naturalWidth + 40;
        canvas.height = loadedImg.naturalHeight + 40;
        const ctx = canvas.getContext('2d');
        
        // Simulating thick sticker border by drawing slightly offset blurred white shadows in-canvas
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.drawImage(loadedImg, 20, 20);
        ctx.drawImage(loadedImg, 20, 20); // Repeating overlays sharpens shadow outline boundary
        
        const dataUrl = canvas.toDataURL('image/png');
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Border added successfully!', 'success');
      });
    `,
    
    features: [
      "Adds thick white offset shadows creating realistic stickers.",
      "100% browser sandbox secure parsing.",
      "Exports transparent PNG formats cleanly."
    ],
    instructions: [
      "Select a transparent background PNG file.",
      "Click 'Add Sticker Border' to render.",
      "Download the sticker PNG graphic."
    ],
    benefits: [
      "Quick WhatsApp sticker borders creator.",
      "Saves having to use heavy photo tools."
    ],
    faqs: [
      { q: "Do I need transparent backgrounds?", a: "Yes, transparent PNG files provide the cleanest sticker outlines." }
    ]
  }
];

module.exports = socialTools;
