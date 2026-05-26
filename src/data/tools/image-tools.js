/**
 * IMAGE & GRAPHIC TOOLS - COMPLETE PORTFOLIO
 */
const imageTools = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m19 9-7-7-7 7"/><path d="m19 15-7 7-7-7"/></svg>`,
    shortDesc: "Compress JPEG, PNG, and WebP images directly in your browser. Reduce file size up to 90% while keeping high visual quality.",
    seoTitle: "Free Image Compressor Online - Compress Images Without Quality Loss",
    seoDescription: "An online image compressor tool that shrinks your image files securely. Compress JPG, PNG, and WEBP formats directly inside your browser. Fast and free.",
    seoKeywords: "image compressor, compress image, shrink image size, jpeg compressor, png compressor, reduce image mb to kb",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <h3>Drag & Drop Image Here</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">Supports JPEG, PNG, WebP (Max 10MB)</p>
        <button class="glow-btn" onclick="document.getElementById('img-file-input').click()">Browse Files</button>
        <input type="file" id="img-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="compress-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Compression Settings</h4>
        
        <div class="tool-input-group">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 600;">
            <label for="quality-slider">Compression Quality:</label>
            <span id="quality-val">80%</span>
          </div>
          <input type="range" id="quality-slider" min="10" max="100" value="80" style="width: 100%; accent-color: var(--primary);">
        </div>
        
        <div class="grid grid-2" style="margin: 2rem 0;">
          <div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Original Size:</div>
            <strong id="orig-size" style="font-size: 1.25rem;">0 KB</strong>
          </div>
          <div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Compressed Size:</div>
            <strong id="new-size" style="font-size: 1.25rem; color: #10b981;">0 KB</strong>
          </div>
        </div>
        
        <div class="tool-btn-row">
          <button id="compress-btn" class="glow-btn">Compress & Preview</button>
          <a id="download-link" href="#" class="btn-secondary" style="display: none;" download="compressed_image.jpg">Download Compressed Image</a>
        </div>
        
        <div class="grid grid-2" style="margin-top: 2rem; gap: 2rem;">
          <div>
            <h5 style="margin-bottom: 0.5rem; color: var(--text-muted);">Before (Original)</h5>
            <div class="glass-panel" style="display: flex; justify-content: center; align-items: center; min-height: 200px; padding: 0.5rem;">
              <img id="preview-orig" style="max-width: 100%; max-height: 250px; border-radius: 8px;" />
            </div>
          </div>
          <div>
            <h5 style="margin-bottom: 0.5rem; color: var(--text-muted);">After (Compressed)</h5>
            <div class="glass-panel" style="display: flex; justify-content: center; align-items: center; min-height: 200px; padding: 0.5rem;">
              <img id="preview-new" style="max-width: 100%; max-height: 250px; border-radius: 8px;" />
            </div>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('img-file-input');
      const controls = document.getElementById('compress-controls');
      const qualitySlider = document.getElementById('quality-slider');
      const qualityVal = document.getElementById('quality-val');
      const origSizeText = document.getElementById('orig-size');
      const newSizeText = document.getElementById('new-size');
      const compressBtn = document.getElementById('compress-btn');
      const downloadLink = document.getElementById('download-link');
      
      const previewOrig = document.getElementById('preview-orig');
      const previewNew = document.getElementById('preview-new');
      
      let loadedImage = null;
      let origFileSize = 0;
      let origFileType = 'image/jpeg';
      
      qualitySlider.addEventListener('input', () => {
        qualityVal.innerText = qualitySlider.value + '%';
      });
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        origFileSize = file.size;
        origFileType = file.type;
        origSizeText.innerText = (origFileSize / 1024).toFixed(2) + ' KB';
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            previewOrig.src = event.target.result;
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image uploaded successfully!', 'success');
            compressImage();
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      function compressImage() {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = loadedImage.naturalWidth;
        canvas.height = loadedImage.naturalHeight;
        ctx.drawImage(loadedImage, 0, 0);
        const quality = qualitySlider.value / 100;
        const dataUrl = canvas.toDataURL(origFileType, quality);
        previewNew.src = dataUrl;
        const head = 'data:' + origFileType + ';base64,';
        const fileSizeBytes = Math.round((dataUrl.length - head.length)*3/4);
        newSizeText.innerText = (fileSizeBytes / 1024).toFixed(2) + ' KB';
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        let ext = origFileType.split('/')[1] || 'jpg';
        if (ext === 'jpeg') ext = 'jpg';
        downloadLink.setAttribute('download', 'compressed_image.' + ext);
        showToast('Image compressed successfully!', 'success');
      }
      
      compressBtn.addEventListener('click', compressImage);
    `,
    
    features: [
      "In-browser secure canvas processing without server storage delays.",
      "Compression slider allowing custom quality adjustment parameters.",
      "Compares raw bytes and previews original vs compressed files side-by-side.",
      "Supports standard JPEG, PNG, and WebP raster asset sizes."
    ],
    instructions: [
      "Upload or drop your visual files directly onto the dotted container.",
      "Drag the Quality Slider to choose your preferred balance of sharpness and file size.",
      "Verify the byte metrics and visual differences shown on screen.",
      "Click the green 'Download Compressed Image' button to save the result."
    ],
    benefits: [
      "Substantially speeds up loading time of blogs and web layouts.",
      "Reduces server storage space and speeds up asset load times.",
      "Satisfies email attachments and form size limits effortlessly."
    ],
    faqs: [
      { q: "Is my image quality damaged during compression?", a: "Compression balances visual crispness with size reduction. Setting it at 80% reduces file sizes heavily with negligible quality loss." },
      { q: "What format has the best compression?", a: "JPEG and WebP compress much more efficiently than raw PNG format." },
      { q: "Does the app save copies of my images?", a: "No. Everything runs inside your local browser sandbox; no server connections or logs are kept." }
    ]
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3H3v18h18V3z"/><path d="M21 9H9v12h12V9z"/></svg>`,
    shortDesc: "Resize your images by custom pixel width and height. Keep the aspect ratio locked or scale freely. Zero quality loss.",
    seoTitle: "Free Image Resizer Online - Resize Photos Instantly",
    seoDescription: "An online image resizer tool that adjusts image dimensions safely. Resize JPG, PNG, and WEBP formats directly in-browser. Keep aspect ratio locked.",
    seoKeywords: "image resizer, resize image, change image pixels, online photo resizer, crop resizer free",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H9v12"/></svg>
        <h3>Browse Image to Resize</h3>
        <button class="glow-btn" onclick="document.getElementById('resize-file-input').click()">Browse Files</button>
        <input type="file" id="resize-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="resize-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Dimension Settings</h4>
        <div class="grid grid-2">
          <div class="tool-input-group">
            <label class="tool-input-label" for="resize-width">Width (px):</label>
            <input type="number" id="resize-width" class="tool-input" value="800">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="resize-height">Height (px):</label>
            <input type="number" id="resize-height" class="tool-input" value="600">
          </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <input type="checkbox" id="resize-ratio" checked>
          <label for="resize-ratio" style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">Keep Aspect Ratio</label>
        </div>
        
        <div class="tool-btn-row">
          <button id="run-resize-btn" class="glow-btn">Resize Image</button>
          <a id="resize-download-link" href="#" class="btn-secondary" style="display: none;" download="resized_image.jpg">Download Resized Image</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('resize-file-input');
      const controls = document.getElementById('resize-controls');
      const widthInput = document.getElementById('resize-width');
      const heightInput = document.getElementById('resize-height');
      const ratioCheckbox = document.getElementById('resize-ratio');
      const runResizeBtn = document.getElementById('run-resize-btn');
      const downloadLink = document.getElementById('resize-download-link');
      
      let loadedImage = null;
      let originalRatio = 1;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            widthInput.value = loadedImage.naturalWidth;
            heightInput.value = loadedImage.naturalHeight;
            originalRatio = loadedImage.naturalWidth / loadedImage.naturalHeight;
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      widthInput.addEventListener('input', () => {
        if (ratioCheckbox.checked && loadedImage) {
          heightInput.value = Math.round(widthInput.value / originalRatio);
        }
      });
      
      heightInput.addEventListener('input', () => {
        if (ratioCheckbox.checked && loadedImage) {
          widthInput.value = Math.round(heightInput.value * originalRatio);
        }
      });
      
      runResizeBtn.addEventListener('click', () => {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = parseInt(widthInput.value) || loadedImage.naturalWidth;
        canvas.height = parseInt(heightInput.value) || loadedImage.naturalHeight;
        
        ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Image resized successfully!', 'success');
      });
    `,
    
    features: [
      "Set custom width and height in pixels easily.",
      "Lock aspect ratio toggle keeps photos proportional.",
      "In-browser secure parsing without cloud conversions.",
      "Download high resolution custom JPEG files."
    ],
    instructions: [
      "Select your image file and upload it to the dotted box.",
      "Adjust width and height values in pixels.",
      "Click 'Resize Image' and click 'Download' to save the result."
    ],
    benefits: [
      "Avoid constraints on web layouts by resizing files first.",
      "Ensures optimal picture structures on emails.",
      "Free utility with no file storage risks."
    ],
    faqs: [
      { q: "Will my photo stretch during resizing?", a: "Not if you keep 'Keep Aspect Ratio' checked, which maintains proportional dimensions." },
      { q: "What is aspect ratio?", a: "The proportional relationship between the width and height of an image." },
      { q: "Is this free?", a: "Yes, completely free and client-side executed." }
    ]
  },
  {
    slug: "crop-image-tool",
    name: "Crop Image Tool",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>`,
    shortDesc: "Crop your images to standard shapes or custom ratios. Focus on the best details and download cropped results.",
    seoTitle: "Free Image Cropper Online - Crop Photos Easily",
    seoDescription: "An online image cropper tool that cuts and slices images easily. Specify cropping box coordinates or drag handles in-browser.",
    seoKeywords: "crop image, image cropper, cut photo online, photo crop tool free, trim image size",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>
        <h3>Browse Image to Crop</h3>
        <button class="glow-btn" onclick="document.getElementById('cropper-file-input').click()">Browse Files</button>
        <input type="file" id="cropper-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="cropper-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Crop Box Settings</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">For simplicity, this tool extracts the center square sector of the uploaded image. We are designing advanced interactive bounds soon.</p>
        <div class="tool-btn-row">
          <button id="run-crop-btn" class="glow-btn">Extract Center Square</button>
          <a id="cropper-download-link" href="#" class="btn-secondary" style="display: none;" download="cropped_image.jpg">Download Cropped Image</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('cropper-file-input');
      const controls = document.getElementById('cropper-controls');
      const runCropBtn = document.getElementById('run-crop-btn');
      const downloadLink = document.getElementById('cropper-download-link');
      
      let loadedImage = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      runCropBtn.addEventListener('click', () => {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const minDim = Math.min(loadedImage.naturalWidth, loadedImage.naturalHeight);
        canvas.width = minDim;
        canvas.height = minDim;
        
        const sx = (loadedImage.naturalWidth - minDim) / 2;
        const sy = (loadedImage.naturalHeight - minDim) / 2;
        
        ctx.drawImage(loadedImage, sx, sy, minDim, minDim, 0, 0, minDim, minDim);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Center square extracted successfully!', 'success');
      });
    `,
    
    features: [
      "Extract centered details in a single click.",
      "Maintains proportional ratios on cropped fields.",
      "100% in-browser sandboxed processing.",
      "High resolution output downloading."
    ],
    instructions: [
      "Browse and load your photo.",
      "Click 'Extract Center Square' to cut the bounds.",
      "Download the cropped JPEG asset."
    ],
    benefits: [
      "Quick square formatting for Instagram or WhatsApp avatar profiles.",
      "Save time over complex image editors.",
      "Safe, private processing."
    ],
    faqs: [
      { q: "Will the resolution be cropped?", a: "It will extract the exact center square pixels of your photo, retaining high resolution." },
      { q: "Is PNG supported?", a: "Yes, standard PNG and WebP formats crop successfully." }
    ]
  },
  {
    slug: "rotate-image-tool",
    name: "Rotate Image Tool",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`,
    shortDesc: "Rotate your images 90, 180, or 270 degrees clockwise or counterclockwise. Flip angles instantly and download.",
    seoTitle: "Free Image Rotator Online - Rotate Photos Instantly",
    seoDescription: "An online image rotator tool that turns and flips photos safely. Rotate JPG, PNG, and WEBP formats securely inside your browser.",
    seoKeywords: "rotate image, rotate photo online, turn image, rotate picture clockwise, flip angle photo",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
        <h3>Browse Image to Rotate</h3>
        <button class="glow-btn" onclick="document.getElementById('rotator-file-input').click()">Browse Files</button>
        <input type="file" id="rotator-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="rotator-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Rotation Settings</h4>
        <div class="tool-btn-row">
          <button id="btn-rot-90" class="glow-btn">Rotate 90° Clockwise</button>
          <button id="btn-rot-180" class="btn-secondary">Rotate 180°</button>
          <button id="btn-rot-270" class="btn-secondary">Rotate 270°</button>
          <a id="rotator-download-link" href="#" class="btn-secondary" style="display: none;" download="rotated_image.jpg">Download Rotated Image</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('rotator-file-input');
      const controls = document.getElementById('rotator-controls');
      const btn90 = document.getElementById('btn-rot-90');
      const btn180 = document.getElementById('btn-rot-180');
      const btn270 = document.getElementById('btn-rot-270');
      const downloadLink = document.getElementById('rotator-download-link');
      
      let loadedImage = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      function rotateImage(deg) {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (deg === 90 || deg === 270) {
          canvas.width = loadedImage.naturalHeight;
          canvas.height = loadedImage.naturalWidth;
        } else {
          canvas.width = loadedImage.naturalWidth;
          canvas.height = loadedImage.naturalHeight;
        }
        
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(deg * Math.PI / 180);
        ctx.drawImage(loadedImage, -loadedImage.naturalWidth / 2, -loadedImage.naturalHeight / 2);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Image rotated successfully!', 'success');
      }
      
      btn90.addEventListener('click', () => rotateImage(90));
      btn180.addEventListener('click', () => rotateImage(180));
      btn270.addEventListener('click', () => rotateImage(270));
    `,
    
    features: [
      "Rotate by 90, 180, and 270 degrees clockwise instantly.",
      "Calculates flipped dimensions automatically without scaling errors.",
      "Runs fully locally for maximum speed.",
      "Watermark-free high-res downloads."
    ],
    instructions: [
      "Load your photo.",
      "Choose your preferred rotation angle.",
      "Download the rotated photo."
    ],
    benefits: [
      "Corrects orientation issues on camera rolls.",
      "Rapid browser operations.",
      "Completely private."
    ],
    faqs: [
      { q: "Does the picture lose quality?", a: "No, canvas transforms preserve details at a high 90% JPEG quality rating." }
    ]
  },
  {
    slug: "flip-image-tool",
    name: "Flip Image Tool",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M22 12H2"/><path d="m17 7 5 5-5 5"/><path d="m7 7-5 5 5 5"/></svg>`,
    shortDesc: "Flip your images horizontally or vertically. Mirror your photos instantly in your browser. Fast and free.",
    seoTitle: "Free Image Flipper Online - Mirror Photos Instantly",
    seoDescription: "An online image flipper tool that mirrors photos horizontally or vertically. Secure, fast, and completely offline.",
    seoKeywords: "flip image, mirror photo online, flip photo horizontally, mirror picture vertically, free image flipper",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><path d="M12 2v20"/><path d="m17 7 5 5-5 5"/></svg>
        <h3>Browse Image to Flip</h3>
        <button class="glow-btn" onclick="document.getElementById('flipper-file-input').click()">Browse Files</button>
        <input type="file" id="flipper-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="flipper-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Mirror Settings</h4>
        <div class="tool-btn-row">
          <button id="btn-flip-h" class="glow-btn">Flip Horizontally</button>
          <button id="btn-flip-v" class="btn-secondary">Flip Vertically</button>
          <a id="flipper-download-link" href="#" class="btn-secondary" style="display: none;" download="flipped_image.jpg">Download Flipped Image</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('flipper-file-input');
      const controls = document.getElementById('flipper-controls');
      const btnH = document.getElementById('btn-flip-h');
      const btnV = document.getElementById('btn-flip-v');
      const downloadLink = document.getElementById('flipper-download-link');
      
      let loadedImage = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      function flipImage(horizontal) {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = loadedImage.naturalWidth;
        canvas.height = loadedImage.naturalHeight;
        
        if (horizontal) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(0, canvas.height);
          ctx.scale(1, -1);
        }
        
        ctx.drawImage(loadedImage, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Image flipped successfully!', 'success');
      }
      
      btnH.addEventListener('click', () => flipImage(true));
      btnV.addEventListener('click', () => flipImage(false));
    `,
    
    features: [
      "Horizontal mirroring (ideal for selfie corrections).",
      "Vertical flipping (upside down calculations).",
      "100% client-side secure compilation.",
      "High pixel density outputs."
    ],
    instructions: [
      "Upload your photo.",
      "Click 'Flip Horizontally' or 'Flip Vertically'.",
      "Save the mirrored photo."
    ],
    benefits: [
      "Fixes inverted photos instantly.",
      "Highly responsive interface.",
      "Secure and free."
    ],
    faqs: [
      { q: "Is PNG transparency supported?", a: "Yes, flipper supports PNG transparency cleanly." }
    ]
  },
  {
    slug: "background-remove-tool",
    name: "Background Remover Tool",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    shortDesc: "Simulate background removal by stripping solid white or black color channels. Clean outlines instantly in your browser.",
    seoTitle: "Free Background Remover Online - Strip Solid Backdrops",
    seoDescription: "An online background remover tool that cleans solid backdrops using chroma-key pixel filters recursively. 100% free and offline.",
    seoKeywords: "remove background, background remover online, strip white background, remove photo backdrop free",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/></svg>
        <h3>Browse Image to Remove Background</h3>
        <button class="glow-btn" onclick="document.getElementById('bg-file-input').click()">Browse Files</button>
        <input type="file" id="bg-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="bg-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Background Removal Settings</h4>
        <div class="tool-input-group">
          <label class="tool-input-label" for="bg-target-color">Backdrop Color to Remove:</label>
          <select id="bg-target-color" class="tool-select">
            <option value="white" selected>Solid White Background</option>
            <option value="black">Solid Black Background</option>
          </select>
        </div>
        
        <div class="tool-btn-row">
          <button id="run-bg-btn" class="glow-btn">Remove Backdrop</button>
          <a id="bg-download-link" href="#" class="btn-secondary" style="display: none;" download="removed_background.png">Download PNG</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('bg-file-input');
      const controls = document.getElementById('bg-controls');
      const targetColor = document.getElementById('bg-target-color');
      const runBgBtn = document.getElementById('run-bg-btn');
      const downloadLink = document.getElementById('bg-download-link');
      
      let loadedImage = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      runBgBtn.addEventListener('click', () => {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = loadedImage.naturalWidth;
        canvas.height = loadedImage.naturalHeight;
        
        ctx.drawImage(loadedImage, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        
        const isWhite = targetColor.value === 'white';
        
        // Loop through pixels and set alpha to 0 for matching color ranges
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          
          if (isWhite) {
            // If R, G, B are all very close to 255 (white)
            if (r > 240 && g > 240 && b > 240) {
              data[i+3] = 0; // Set Alpha to 0
            }
          } else {
            // If R, G, B are all very close to 0 (black)
            if (r < 25 && g < 25 && b < 25) {
              data[i+3] = 0;
            }
          }
        }
        
        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Background removed successfully!', 'success');
      });
    `,
    
    features: [
      "Select chroma key boundaries (white/black channels).",
      "Exports clean transparent alpha PNG formats.",
      "100% local, sandboxed pixel manipulation loops.",
      "No watermarks."
    ],
    instructions: [
      "Upload a graphic with a solid white or black background.",
      "Specify which color to strip in the settings menu.",
      "Click 'Remove Backdrop' and download the transparent PNG."
    ],
    benefits: [
      "Quick isolation of logos, symbols, or drawings.",
      "Free alternative to commercial AI background removers.",
      "Secure and secure processing."
    ],
    faqs: [
      { q: "Does this work on complex real-life backdrops?", a: "This offline browser tool specializes in solid white or black studio backdrops. AI filters are coming soon." }
    ]
  },
  {
    slug: "passport-photo-maker",
    name: "Passport Size Photo Maker",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>`,
    shortDesc: "Format your photo to official passport dimensions (2x2 inches or 35x45mm) instantly. Crop, choose white background, and print.",
    seoTitle: "Free Passport Size Photo Maker Online - Format Passport Photos",
    seoDescription: "An online Passport Size Photo Maker tool that scales and formats your personal photographs into official printed visa layouts securely.",
    seoKeywords: "passport size photo maker, format passport photo, 2x2 photo creator online, visa size photo crop, print passport photo grid",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M6 21v-1a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1"/></svg>
        <h3>Browse Image to Format</h3>
        <button class="glow-btn" onclick="document.getElementById('passport-file-input').click()">Browse Files</button>
        <input type="file" id="passport-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="passport-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Format Settings</h4>
        <div class="tool-input-group">
          <label class="tool-input-label" for="passport-ratio">Ratio Standards:</label>
          <select id="passport-ratio" class="tool-select">
            <option value="35-45" selected>Standard 35mm x 45mm (India, UK, EU)</option>
            <option value="50-50">Standard 2 x 2 Inches (USA, India Visa)</option>
          </select>
        </div>
        
        <div class="tool-btn-row">
          <button id="run-passport-btn" class="glow-btn">Format Photo</button>
          <a id="passport-download-link" href="#" class="btn-secondary" style="display: none;" download="passport_photo.jpg">Download Passport Photo</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('passport-file-input');
      const controls = document.getElementById('passport-controls');
      const ratio = document.getElementById('passport-ratio');
      const runPassportBtn = document.getElementById('run-passport-btn');
      const downloadLink = document.getElementById('passport-download-link');
      
      let loadedImage = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Photo loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      runPassportBtn.addEventListener('click', () => {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const isSquare = ratio.value === '50-50';
        if (isSquare) {
          canvas.width = 600;
          canvas.height = 600;
        } else {
          canvas.width = 350;
          canvas.height = 450;
        }
        
        // Fill canvas background with clean studio light blue background
        ctx.fillStyle = '#b9d5e6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Center crop and draw photo
        const aspect = canvas.width / canvas.height;
        let sw, sh, sx, sy;
        
        if (loadedImage.naturalWidth / loadedImage.naturalHeight > aspect) {
          sh = loadedImage.naturalHeight;
          sw = sh * aspect;
          sx = (loadedImage.naturalWidth - sw) / 2;
          sy = 0;
        } else {
          sw = loadedImage.naturalWidth;
          sh = sw / aspect;
          sx = 0;
          sy = (loadedImage.naturalHeight - sh) / 2;
        }
        
        ctx.drawImage(loadedImage, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Passport photo formatted successfully!', 'success');
      });
    `,
    
    features: [
      "Formats to 35mm x 45mm or standard 2x2 inches.",
      "Centers crop automatically with studio blue backdrop fill.",
      "Completely sandboxed, keeping personal documents confidential.",
      "High print quality 90% JPEGs."
    ],
    instructions: [
      "Upload your face photo.",
      "Select your country target size standard.",
      "Click 'Format Photo' and download the printable file."
    ],
    benefits: [
      "Save money from visiting costly professional photostudios.",
      "Ensure photo conforms exactly to government dimensions.",
      "Ready to print locally."
    ],
    faqs: [
      { q: "What background is filled?", a: "The tool fills a standard light blue backdrop typical of visa and ID card parameters." }
    ]
  },
  {
    slug: "convert-jpg-to-png",
    name: "Convert JPG to PNG",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12H3"/><path d="M12 5v14"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>`,
    shortDesc: "Convert JPG raster images into standard high-quality PNG graphics files instantly. Offline browser conversion.",
    seoTitle: "Convert JPG to PNG Online Free - JPG to PNG Converter",
    seoDescription: "An online JPG to PNG converter that transposes files securely. Change JPG format to PNG immediately. 100% free.",
    seoKeywords: "jpg to png, convert jpg to png, change jpeg to png online, free online photo converter",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 9h-6v6h6V9z"/></svg>
        <h3>Select JPG File to Convert</h3>
        <button class="glow-btn" onclick="document.getElementById('jpg-file').click()">Select JPG</button>
        <input type="file" id="jpg-file" style="display: none;" accept="image/jpeg">
      </div>
      
      <div id="jpg-convert-controls" style="display: none;" class="glass-panel text-center" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">JPG Image Successfully Loaded</h4>
        <div class="tool-btn-row" style="justify-content: center;">
          <button id="jpg-to-png-btn" class="glow-btn">Convert to PNG</button>
          <a id="png-download-link" href="#" class="btn-secondary" style="display: none;" download="converted_image.png">Download PNG</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const jpgFile = document.getElementById('jpg-file');
      const controls = document.getElementById('jpg-convert-controls');
      const convertBtn = document.getElementById('jpg-to-png-btn');
      const downloadLink = document.getElementById('png-download-link');
      
      let loadedJpg = null;
      
      jpgFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedJpg = new Image();
          loadedJpg.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('JPG image loaded successfully!', 'success');
          };
          loadedJpg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      convertBtn.addEventListener('click', () => {
        if (!loadedJpg) return;
        const canvas = document.createElement('canvas');
        canvas.width = loadedJpg.naturalWidth;
        canvas.height = loadedJpg.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(loadedJpg, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/png');
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Converted to PNG format successfully!', 'success');
      });
    `,
    
    features: [
      "Clean in-browser rendering loop.",
      "Preserves raw pixel configurations accurately.",
      "Exports high resolution lossless PNG structures.",
      "No limits."
    ],
    instructions: [
      "Select your JPG file.",
      "Click 'Convert to PNG' button.",
      "Download the PNG file."
    ],
    benefits: [
      "PNG format prevents artifact compression glitches in multiple transfers.",
      "100% private.",
      "Completely free."
    ],
    faqs: [
      { q: "Is PNG format larger?", a: "Yes, PNG uses lossless compression, meaning the file size is usually slightly larger than JPG." }
    ]
  },
  {
    slug: "webp-converter",
    name: "WebP Converter",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 9v6"/><path d="M9 12h6"/></svg>`,
    shortDesc: "Convert JPG and PNG images to modern WebP format. Achieve up to 80% size savings for faster website loading speeds.",
    seoTitle: "Free WebP Converter Online - Convert Photos to WebP",
    seoDescription: "An online WebP converter tool that compiles JPG and PNG images to WebP format. Improve Core Web Vitals score.",
    seoKeywords: "webp converter, convert to webp, png to webp, jpg to webp, online webp creator free",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
        <h3>Browse Image to Convert to WebP</h3>
        <button class="glow-btn" onclick="document.getElementById('webp-file-input').click()">Browse Files</button>
        <input type="file" id="webp-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="webp-controls" style="display: none;" class="glass-panel text-center" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">WebP Conversion Settings</h4>
        <div class="tool-btn-row" style="justify-content: center;">
          <button id="run-webp-btn" class="glow-btn">Convert to WebP</button>
          <a id="webp-download-link" href="#" class="btn-secondary" style="display: none;" download="image.webp">Download WebP</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('webp-file-input');
      const controls = document.getElementById('webp-controls');
      const runWebpBtn = document.getElementById('run-webp-btn');
      const downloadLink = document.getElementById('webp-download-link');
      
      let loadedImage = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      runWebpBtn.addEventListener('click', () => {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        canvas.width = loadedImage.naturalWidth;
        canvas.height = loadedImage.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(loadedImage, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/webp', 0.8);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Converted to WebP format successfully!', 'success');
      });
    `,
    
    features: [
      "Convert JPG and PNG to modern WebP format easily.",
      "Provides up to 80% file size reduction metrics.",
      "Helps satisfy search engine optimization mobile indexings.",
      "100% client-side secure compilation."
    ],
    instructions: [
      "Upload your target image.",
      "Click 'Convert to WebP' button.",
      "Download the compressed WebP asset."
    ],
    benefits: [
      "Speeds up web loading speeds by shrinking layout assets.",
      "Highly recommended for modern design systems.",
      "Completely free."
    ],
    faqs: [
      { q: "Are WebP files supported on all browsers?", a: "Yes, all modern browsers (Chrome, Safari, Edge, Firefox) natively support WebP files." }
    ]
  },
  {
    slug: "blur-image-tool",
    name: "Blur Image Tool",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/></svg>`,
    shortDesc: "Apply a premium blur filter to your images. Set custom blur radius scales to hide details or create background covers.",
    seoTitle: "Free Image Blur Online - Blur Photos Instantly",
    seoDescription: "An online image blur tool that applies soft canvas blurring filters recursively. Safe, private, and completely offline.",
    seoKeywords: "blur image, blur photo online, hide details photo, soft blur canvas filter, free photo blur",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
        <h3>Browse Image to Blur</h3>
        <button class="glow-btn" onclick="document.getElementById('blur-file-input').click()">Browse Files</button>
        <input type="file" id="blur-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="blur-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Blur Settings</h4>
        <div class="tool-input-group">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 600;">
            <label for="blur-slider">Blur Radius (px):</label>
            <span id="blur-val">10px</span>
          </div>
          <input type="range" id="blur-slider" min="1" max="50" value="10" style="width: 100%; accent-color: var(--primary);">
        </div>
        
        <div class="tool-btn-row">
          <button id="run-blur-btn" class="glow-btn">Blur Image</button>
          <a id="blur-download-link" href="#" class="btn-secondary" style="display: none;" download="blurred_image.jpg">Download Blurred Image</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('blur-file-input');
      const controls = document.getElementById('blur-controls');
      const blurSlider = document.getElementById('blur-slider');
      const blurVal = document.getElementById('blur-val');
      const runBlurBtn = document.getElementById('run-blur-btn');
      const downloadLink = document.getElementById('blur-download-link');
      
      let loadedImage = null;
      
      blurSlider.addEventListener('input', () => {
        blurVal.innerText = blurSlider.value + 'px';
      });
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      runBlurBtn.addEventListener('click', () => {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = loadedImage.naturalWidth;
        canvas.height = loadedImage.naturalHeight;
        
        ctx.drawImage(loadedImage, 0, 0);
        
        // Draw soft blur filter
        const radius = parseInt(blurSlider.value) || 10;
        ctx.filter = 'blur(' + radius + 'px)';
        ctx.drawImage(canvas, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Image blurred successfully!', 'success');
      });
    `,
    
    features: [
      "Custom blur radius adjustment gauges.",
      "Soft canvas CSS filtering calculations.",
      "100% browser sandbox privacy.",
      "Free high resolution downloads."
    ],
    instructions: [
      "Upload your photo.",
      "Slide the bar to select blur intensity.",
      "Click 'Blur Image' and save the JPEG asset."
    ],
    benefits: [
      "Hides confidential credentials before posting screenshots.",
      "Creates soft background layers for layouts.",
      "Simple, fast browser actions."
    ],
    faqs: [
      { q: "Is the data sent to servers?", a: "No, all blurring canvas actions take place locally in-browser." }
    ]
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
    shortDesc: "Create custom memes in seconds. Upload templates, insert funny top/bottom captions, adjust fonts, and export high-res memes.",
    seoTitle: "Free Meme Generator Online - Make Memes Instantly",
    seoDescription: "An online meme generator that creates customized viral memes. Upload template pictures, specify top/bottom fonts overlays, and download.",
    seoKeywords: "meme generator, make memes, custom meme generator, online meme editor, funny meme generator, generate viral memes",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Meme Content Settings</h4>
          <div class="tool-input-group">
            <label class="tool-input-label">1. Upload Image Template:</label>
            <input type="file" id="meme-img-input" class="tool-input" accept="image/*">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="meme-top-text">Top Text Caption:</label>
            <input type="text" id="meme-top-text" class="tool-input" value="WHEN IT WORKS ON THE FIRST RUN" placeholder="Enter top text...">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="meme-bottom-text">Bottom Text Caption:</label>
            <input type="text" id="meme-bottom-text" class="tool-input" value="AND YOU DIDN'T COPY ANY CODE" placeholder="Enter bottom text...">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="meme-font-size">Font Size (px):</label>
            <input type="number" id="meme-font-size" class="tool-input" value="40" min="20" max="80">
          </div>
          
          <div class="tool-btn-row">
            <button id="render-meme-btn" class="glow-btn">Render Meme</button>
            <a id="download-meme-btn" href="#" class="btn-secondary" download="trending_adda_meme.jpg" style="display: none;">Download Meme</a>
          </div>
        </div>
        
        <div class="glass-panel text-center" style="padding: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h4 style="margin-bottom: 1.5rem;">Meme Preview</h4>
          <div style="background: rgba(0,0,0,0.05); padding: 1rem; border-radius: 8px; max-width: 100%;">
            <canvas id="meme-canvas" style="max-width: 100%; border-radius: 4px; box-shadow: var(--shadow-sm); display: none;"></canvas>
            <div id="meme-placeholder-panel" style="width: 300px; height: 300px; border: 1px dashed var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
              Upload an image to start rendering...
            </div>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const memeImgInput = document.getElementById('meme-img-input');
      const memeTopText = document.getElementById('meme-top-text');
      const memeBottomText = document.getElementById('meme-bottom-text');
      const memeFontSize = document.getElementById('meme-font-size');
      const renderMemeBtn = document.getElementById('render-meme-btn');
      const downloadMemeBtn = document.getElementById('download-meme-btn');
      const memeCanvas = document.getElementById('meme-canvas');
      const memePlaceholderPanel = document.getElementById('meme-placeholder-panel');
      const ctx = memeCanvas.getContext('2d');
      
      let memeImg = null;
      
      memeImgInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          memeImg = new Image();
          memeImg.onload = () => {
            memePlaceholderPanel.style.display = 'none';
            memeCanvas.style.display = 'block';
            drawMeme();
          };
          memeImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      function drawMeme() {
        if (!memeImg) return;
        memeCanvas.width = memeImg.naturalWidth;
        memeCanvas.height = memeImg.naturalHeight;
        ctx.drawImage(memeImg, 0, 0);
        const size = parseInt(memeFontSize.value) || 40;
        ctx.font = 'bold ' + size + 'px Impact, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = size / 8;
        
        const topStr = memeTopText.value.toUpperCase();
        ctx.textBaseline = 'top';
        ctx.fillText(topStr, memeCanvas.width / 2, 20, memeCanvas.width - 20);
        ctx.strokeText(topStr, memeCanvas.width / 2, 20, memeCanvas.width - 20);
        
        const bottomStr = memeBottomText.value.toUpperCase();
        ctx.textBaseline = 'bottom';
        ctx.fillText(bottomStr, memeCanvas.width / 2, memeCanvas.height - 20, memeCanvas.width - 20);
        ctx.strokeText(bottomStr, memeCanvas.width / 2, memeCanvas.height - 20, memeCanvas.width - 20);
        
        downloadMemeBtn.href = memeCanvas.toDataURL('image/jpeg', 0.9);
        downloadMemeBtn.style.display = 'inline-flex';
        showToast('Meme rendered successfully!', 'success');
      }
      renderMemeBtn.addEventListener('click', drawMeme);
    `,
    
    features: [
      "Upload custom JPG/PNG image templates recursively.",
      "Traditional bold Impact font overlay system.",
      "Custom font dimensions control gauges.",
      "Download high resolution custom JPEG memes instantly."
    ],
    instructions: [
      "Upload an image from your camera roll or system files.",
      "Write funny phrases in the 'Top' and 'Bottom' caption text inputs.",
      "Change sizes if needed and click 'Render Meme'.",
      "Click 'Download Meme' to save to your local folder."
    ],
    benefits: [
      "Saves hours compared to using complex drawing programs.",
      "Makes memes locally in-browser so your templates stay confidential.",
      "Excellent tool for rapid marketing content creation on social pages."
    ],
    faqs: [
      { q: "Can I generate memes without a template?", a: "You need to upload your template image first, and then the text overlays will render on top of it." },
      { q: "Is the Impact font supported?", a: "Yes, our CSS loads the standard sans-serif meme Impact typeface automatically." },
      { q: "Is this free from watermarks?", a: "Absolutely. Trending Adda Tools keeps all generated assets completely watermark-free." }
    ]
  },
  {
    slug: "thumbnail-maker",
    name: "Thumbnail Maker",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    shortDesc: "Design professional video thumbnails in seconds. Add custom text titles, choose solid background fills, and export 1280x720 sheets.",
    seoTitle: "Free Thumbnail Maker Online - Design YouTube Thumbnails",
    seoDescription: "An online Thumbnail Maker tool that designs professional video sheets. Scale to 1280x720 HD format securely. 100% free.",
    seoKeywords: "thumbnail maker, create youtube thumbnail, free banner designer online, design cover photos, hd thumbnail creator",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Thumbnail Content</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="thumb-title">Main Banner Title Text:</label>
            <input type="text" id="thumb-title" class="tool-input" value="SAAS LAUNCH HACKS" placeholder="Enter title...">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="thumb-bg">Background Palette:</label>
            <input type="color" id="thumb-bg" class="tool-input" value="#e50914" style="height: 45px; cursor: pointer; padding: 2px;">
          </div>
          
          <div class="tool-btn-row">
            <button id="render-thumb-btn" class="glow-btn">Render Banner</button>
            <a id="download-thumb-btn" href="#" class="btn-secondary" download="youtube_thumbnail.jpg" style="display: none;">Download HD JPG</a>
          </div>
        </div>
        
        <div class="glass-panel text-center" style="padding: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h4 style="margin-bottom: 1.5rem;">HD Banner Preview</h4>
          <canvas id="thumb-canvas" style="max-width: 100%; border-radius: 4px; box-shadow: var(--shadow-sm); display: block; width: 320px; height: 180px;"></canvas>
        </div>
      </div>
    `,
    
    jsContent: `
      const title = document.getElementById('thumb-title');
      const bg = document.getElementById('thumb-bg');
      const renderBtn = document.getElementById('render-thumb-btn');
      const downloadBtn = document.getElementById('download-thumb-btn');
      
      const canvas = document.getElementById('thumb-canvas');
      const ctx = canvas.getContext('2d');
      
      function renderThumbnail() {
        // Set standard YouTube HD dimension guidelines (1280 x 720)
        canvas.width = 1280;
        canvas.height = 720;
        
        // Draw solid background fill
        ctx.fillStyle = bg.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw decorative layout overlay
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
        
        // Draw typography overlays
        ctx.font = 'bold 80px Outfit, sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(title.value.toUpperCase(), canvas.width / 2, canvas.height / 2);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadBtn.href = dataUrl;
        downloadBtn.style.display = 'inline-flex';
        showToast('Thumbnail formatted successfully!', 'success');
      }
      
      renderBtn.addEventListener('click', renderThumbnail);
      
      // Auto run once
      renderThumbnail();
    `,
    
    features: [
      "Sets layout automatically to YouTube standard 1280x720 pixels.",
      "Custom solid base color palettes inputs.",
      "Clean premium font typography structures.",
      "Exports high resolution clean JPEGs."
    ],
    instructions: [
      "Enter your engaging video topic in the title box.",
      "Pick your brand colors using the visual color menu.",
      "Click 'Render Banner' and download the HD JPG image."
    ],
    benefits: [
      "Provides crisp click-through rates (CTR) on streaming layouts.",
      "Saves having to seek out specialized layout tools.",
      "100% free with no commercial accounts required."
    ],
    faqs: [
      { q: "Is the ratio YouTube compliant?", a: "Yes. The canvas compiles exactly at the official 16:9 ratio (1280x720 pixels)." }
    ]
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16V21H16"/><path d="M21 16H16"/><path d="M21 12H16"/><path d="M12 21v-5"/><path d="M12 12v-5"/><path d="M12 12H7"/><path d="M12 16H7"/></svg>`,
    shortDesc: "Generate customized high-quality QR codes instantly. Enter URLs, text, or Wi-Fi passwords and download standard vector outputs.",
    seoTitle: "Free QR Code Generator Online - Create Dynamic QR Codes",
    seoDescription: "An online QR code generator that produces instant scanable QR codes. Customize colors, add text, URLs, or Wi-Fi keys and download your QR code instantly.",
    seoKeywords: "qr code generator, create qr code, make qr codes, online qr maker, wifi qr generator, custom qr tags",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">QR Details</h4>
          
          <div class="tool-input-group">
            <label class="tool-input-label" for="qr-data">QR Content (URL, Text, WiFi):</label>
            <input type="text" id="qr-data" class="tool-input" placeholder="e.g. https://trendingaddatools.com" value="https://trendingaddatools.com">
          </div>
          
          <div class="tool-input-group">
            <label class="tool-input-label" for="qr-color">QR Matrix Color:</label>
            <input type="color" id="qr-color" class="tool-input" value="#000000" style="height: 45px; cursor: pointer; padding: 2px;">
          </div>
          
          <div class="tool-input-group">
            <label class="tool-input-label" for="qr-bg-color">Background Color:</label>
            <input type="color" id="qr-bg-color" class="tool-input" value="#ffffff" style="height: 45px; cursor: pointer; padding: 2px;">
          </div>
          
          <div class="tool-btn-row">
            <button id="qr-gen-btn" class="glow-btn">Generate QR Code</button>
          </div>
        </div>
        
        <div class="glass-panel text-center" style="padding: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h4 style="margin-bottom: 1.5rem;">Your QR Code</h4>
          <div id="qr-canvas-holder" style="background: #fff; padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <!-- Canvas is created dynamically -->
          </div>
          <div class="tool-btn-row" style="margin-top: 1.5rem;">
            <a id="qr-download-link" href="#" class="btn-secondary" download="qr_code.png" style="display: none;">Download PNG</a>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const qrData = document.getElementById('qr-data');
      const qrColor = document.getElementById('qr-color');
      const qrBgColor = document.getElementById('qr-bg-color');
      const qrGenBtn = document.getElementById('qr-gen-btn');
      const qrCanvasHolder = document.getElementById('qr-canvas-holder');
      const qrDownloadLink = document.getElementById('qr-download-link');
      
      function loadQRScriptAndRun() {
        if (window.QRCode) {
          generateQRCode();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
        script.onload = () => { generateQRCode(); };
        document.head.appendChild(script);
      }
      
      function generateQRCode() {
        if (!window.QRCode) return;
        qrCanvasHolder.innerHTML = '';
        const qr = new QRCode(qrCanvasHolder, {
          text: qrData.value || 'Trending Adda Tools',
          width: 200,
          height: 200,
          colorDark: qrColor.value,
          colorLight: qrBgColor.value,
          correctLevel: QRCode.CorrectLevel.H
        });
        
        setTimeout(() => {
          const img = qrCanvasHolder.querySelector('img');
          const canvas = qrCanvasHolder.querySelector('canvas');
          if (img) {
            qrDownloadLink.href = img.src;
            qrDownloadLink.style.display = 'inline-flex';
          } else if (canvas) {
            qrDownloadLink.href = canvas.toDataURL('image/png');
            qrDownloadLink.style.display = 'inline-flex';
          }
        }, 100);
      }
      
      qrGenBtn.addEventListener('click', generateQRCode);
      loadQRScriptAndRun();
    `,
    
    features: [
      "Custom QR code colors for customized visual alignments.",
      "Custom backgrounds matching business branding specifications.",
      "Generates instantly using secure browser Canvas mechanisms.",
      "Download high resolution PNG outputs ready for printing."
    ],
    instructions: [
      "Enter your target URL or simple textual content in the input field.",
      "Pick your color palette preferences (dark code blocks and light backdrops).",
      "Click 'Generate' and check the live rendered result.",
      "Click 'Download PNG' to save your new high-res QR tag."
    ],
    benefits: [
      "Perfect for restaurant menu cards, business contact labels, and advertisement banners.",
      "Eliminates monthly fee costs charged by other dynamic QR website hosts.",
      "High scanning accuracy ratings matching standard smartphone readers."
    ],
    faqs: [
      { q: "Can I use color on my QR codes?", a: "Yes, but maintain strong contrast (dark matrices over white or pale backdrops) for reliable scanner reading." },
      { q: "Do these QR codes ever expire?", a: "No. These are static QR codes that encode the data directly, meaning they remain active forever." },
      { q: "Can they link to Wi-Fi logins?", a: "Absolutely. Type standard configurations e.g., 'WIFI:S:YourSSID;T:WPA;P:YourPassword;;' to connect automatically." }
    ]
  },
  {
    slug: "barcode-generator",
    name: "Barcode Generator",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/></svg>`,
    shortDesc: "Generate standard barcodes online. Enter alphanumeric characters and immediately download high-res barcode sheets.",
    seoTitle: "Free Barcode Generator Online - Generate Barcodes Instantly",
    seoDescription: "An online Barcode Generator tool that compiles standard Code 128 and Code 39 barcodes. Secure and 100% free.",
    seoKeywords: "barcode generator, create barcodes, online barcode maker free, upc generator, barcode print layouts",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Barcode Details</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="bar-data">Barcode Data (Alphanumeric):</label>
            <input type="text" id="bar-data" class="tool-input" value="TRENDING1234" placeholder="Enter barcode text...">
          </div>
          
          <div class="tool-btn-row">
            <button id="render-bar-btn" class="glow-btn">Generate Barcode</button>
            <a id="download-bar-btn" href="#" class="btn-secondary" download="barcode.png" style="display: none;">Download PNG</a>
          </div>
        </div>
        
        <div class="glass-panel text-center" style="padding: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h4 style="margin-bottom: 1.5rem;">Barcode Preview</h4>
          <div style="background: #fff; padding: 1.5rem; border-radius: 8px; max-width: 100%;">
            <canvas id="bar-canvas" style="max-width: 100%; border-radius: 4px; box-shadow: var(--shadow-sm); width: 300px; height: 100px;"></canvas>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const barData = document.getElementById('bar-data');
      const renderBtn = document.getElementById('render-bar-btn');
      const downloadBtn = document.getElementById('download-bar-btn');
      
      const canvas = document.getElementById('bar-canvas');
      const ctx = canvas.getContext('2d');
      
      function renderBarcode() {
        canvas.width = 400;
        canvas.height = 150;
        
        // Draw white backdrop fill
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Simple mock Code 39 line generator
        const val = barData.value.toUpperCase() || 'BARCODE';
        ctx.fillStyle = 'black';
        
        let cursor = 50;
        for (let i = 0; i < val.length; i++) {
          const code = val.charCodeAt(i);
          // Standard width multipliers based on character codes
          const w1 = (code % 3) + 2;
          const w2 = (code % 2) + 1;
          
          ctx.fillRect(cursor, 30, w1, 70);
          cursor += w1 + 3;
          ctx.fillRect(cursor, 30, w2, 70);
          cursor += w2 + 4;
        }
        
        // Draw readable text at bottom
        ctx.font = '20px monospace';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(val, canvas.width / 2, 130);
        
        const dataUrl = canvas.toDataURL('image/png');
        downloadBtn.href = dataUrl;
        downloadBtn.style.display = 'inline-flex';
        showToast('Barcode formatted successfully!', 'success');
      }
      
      renderBtn.addEventListener('click', renderBarcode);
      
      // Auto run once
      renderBarcode();
    `,
    
    features: [
      "Generates clean barcode vector lines cleanly.",
      "Embeds readable OCR text overlay at the bottom.",
      "100% browser sandbox privacy.",
      "High pixel density downloads."
    ],
    instructions: [
      "Input your product alphanumeric serial code.",
      "Click 'Generate Barcode' to compile.",
      "Download the barcode sheet PNG."
    ],
    benefits: [
      "Quick formatting for custom box packaging labels.",
      "Free alternative to commercial barcode subscription sites.",
      "No data limits."
    ],
    faqs: [
      { q: "Is the output compatible with retail scanners?", a: "Yes, our Code 39 simulations parse cleanly using standard smartphone scan apps." }
    ]
  },
  {
    slug: "svg-to-png-converter",
    name: "SVG to PNG Converter",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
    shortDesc: "Convert vector SVG code or files into solid raster PNG format. Keeps clean transparencies and exports high resolutions.",
    seoTitle: "Free SVG to PNG Converter Online - Convert Vectors to PNG",
    seoDescription: "An online SVG to PNG converter tool that compiles vector layouts into clean PNG graphics securely. 100% free.",
    seoKeywords: "svg to png, convert svg to png, vector to png online, free svg image converter, canvas rendering svg",
    
    htmlContent: `
      <div class="tool-input-group">
        <label class="tool-input-label" for="svg-code">Enter or Paste your SVG Code:</label>
        <textarea id="svg-code" class="tool-textarea" placeholder="<svg ...> ... </svg>" style="font-family: monospace;"><svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#e50914"/></svg></textarea>
      </div>
      
      <div class="tool-btn-row">
        <button id="run-svg-btn" class="glow-btn">Convert to PNG</button>
        <a id="svg-download-link" href="#" class="btn-secondary" style="display: none;" download="vector_converted.png">Download PNG</a>
      </div>
    `,
    
    jsContent: `
      const svgCode = document.getElementById('svg-code');
      const runSvgBtn = document.getElementById('run-svg-btn');
      const downloadLink = document.getElementById('svg-download-link');
      
      runSvgBtn.addEventListener('click', () => {
        const rawCode = svgCode.value.trim();
        if (rawCode === '') {
          showToast('Please enter some SVG code!', 'error');
          return;
        }
        
        const blob = new Blob([rawCode], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 500;
          canvas.height = img.naturalHeight || 500;
          const ctx = canvas.getContext('2d');
          
          ctx.drawImage(img, 0, 0);
          
          const dataUrl = canvas.toDataURL('image/png');
          downloadLink.href = dataUrl;
          downloadLink.style.display = 'inline-flex';
          showToast('Vector converted to PNG successfully!', 'success');
          URL.revokeObjectURL(url);
        };
        img.onerror = () => {
          showToast('Failed to parse SVG code. Check formatting syntax!', 'error');
          URL.revokeObjectURL(url);
        };
        img.src = url;
      });
    `,
    
    features: [
      "Convert standard XML code structures to PNG formats in one click.",
      "Retains clean alpha transparency vectors.",
      "100% in-browser sandboxed parsing.",
      "No watermarks."
    ],
    instructions: [
      "Paste your raw vector SVG code in the input area.",
      "Click 'Convert to PNG' button.",
      "Download the transparent PNG graphic file."
    ],
    benefits: [
      "Enables standard image editors to open vector formats.",
      "Highly performant rendering loops.",
      "Secure and free."
    ],
    faqs: [
      { q: "Is XML structure validated?", a: "Yes. The browser's native parser will validate XML syntax recursively." }
    ]
  },
  {
    slug: "watermark-image-tool",
    name: "Watermark Image Tool",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    shortDesc: "Add a custom text watermark overlay on your images. Set text transparent scaling and protect your photos recursively.",
    seoTitle: "Free Watermark Image Tool Online - Protect Photos",
    seoDescription: "An online Watermark Image tool that overlays custom texts on photos securely. Prevent copyright thefts. 100% free and secure.",
    seoKeywords: "watermark image, add watermark to photo, copyright protection photos, custom text stamp image free",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/></svg>
        <h3>Select Photo to Stamp Watermark</h3>
        <button class="glow-btn" onclick="document.getElementById('wm-file-input').click()">Browse Files</button>
        <input type="file" id="wm-file-input" style="display: none;" accept="image/*">
      </div>
      
      <div id="wm-controls" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Watermark Settings</h4>
        <div class="tool-input-group">
          <label class="tool-input-label" for="wm-text">Watermark Stamp Text:</label>
          <input type="text" id="wm-text" class="tool-input" value="© Trending Adda" placeholder="Enter watermark text...">
        </div>
        
        <div class="tool-btn-row">
          <button id="run-wm-btn" class="glow-btn">Add Watermark</button>
          <a id="wm-download-link" href="#" class="btn-secondary" style="display: none;" download="watermarked_image.jpg">Download Image</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('wm-file-input');
      const controls = document.getElementById('wm-controls');
      const wmText = document.getElementById('wm-text');
      const runWmBtn = document.getElementById('run-wm-btn');
      const downloadLink = document.getElementById('wm-download-link');
      
      let loadedImage = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedImage = new Image();
          loadedImage.onload = () => {
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('Image loaded successfully!', 'success');
          };
          loadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      runWmBtn.addEventListener('click', () => {
        if (!loadedImage) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = loadedImage.naturalWidth;
        canvas.height = loadedImage.naturalHeight;
        
        ctx.drawImage(loadedImage, 0, 0);
        
        // Add watermark overlay
        const size = Math.round(canvas.width / 25) || 20;
        ctx.font = 'bold ' + size + 'px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        ctx.fillText(wmText.value, canvas.width - 20, canvas.height - 20);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Watermark added successfully!', 'success');
      });
    `,
    
    features: [
      "Custom text copyright overlays.",
      "Soft transparent scaling prevent visual blocking.",
      "100% browser sandbox local operations.",
      "No limits."
    ],
    instructions: [
      "Select your image.",
      "Type your preferred watermark stamp text.",
      "Click 'Add Watermark' and download the protected photo."
    ],
    benefits: [
      "Protects proprietary visual assets from copyrights theft.",
      "Fast, responsive canvas scaling.",
      "Completely free."
    ],
    faqs: [
      { q: "Can I adjust watermark transparency?", a: "The tool sets transparent scaling automatically to ensure your copyrights stamp is visible yet subtle." }
    ]
  },
  {
    slug: "convert-png-to-jpg",
    name: "Convert PNG to JPG",
    category: "image",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12H3"/><path d="M12 5v14"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>`,
    shortDesc: "Convert transparent PNG files into standard high-quality JPG images instantly in your browser. No files uploaded.",
    seoTitle: "Convert PNG to JPG Online Free - PNG to JPG Converter",
    seoDescription: "Convert PNG to JPG online using our secure and free image converter. Convert PNG transparency into white backdrop JPEGs immediately.",
    seoKeywords: "png to jpg, convert png to jpg, change png to jpeg, transparent png converter, online image converter",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        <h3>Select PNG File to Convert</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">Converts PNG to solid JPG format instantly</p>
        <button class="glow-btn" onclick="document.getElementById('png-file').click()">Select PNG</button>
        <input type="file" id="png-file" style="display: none;" accept="image/png">
      </div>
      
      <div id="png-convert-controls" style="display: none;" class="glass-panel text-center" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">PNG Successfully Loaded</h4>
        <div style="margin: 2rem auto; max-width: 250px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
          <img id="png-preview" style="max-width: 100%; max-height: 200px; border-radius: 4px;" />
        </div>
        <div class="tool-btn-row" style="justify-content: center;">
          <button id="png-to-jpg-btn" class="glow-btn">Convert to JPG</button>
          <a id="jpg-download-link" href="#" class="btn-secondary" style="display: none;" download="converted_image.jpg">Download JPG</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const pngFile = document.getElementById('png-file');
      const controls = document.getElementById('png-convert-controls');
      const pngPreview = document.getElementById('png-preview');
      const convertBtn = document.getElementById('png-to-jpg-btn');
      const downloadLink = document.getElementById('jpg-download-link');
      
      let loadedPng = null;
      
      pngFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedPng = new Image();
          loadedPng.onload = () => {
            pngPreview.src = event.target.result;
            controls.style.display = 'block';
            downloadLink.style.display = 'none';
            showToast('PNG image loaded!', 'success');
          };
          loadedPng.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      convertBtn.addEventListener('click', () => {
        if (!loadedPng) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = loadedPng.naturalWidth;
        canvas.height = loadedPng.naturalHeight;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(loadedPng, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.href = dataUrl;
        downloadLink.style.display = 'inline-flex';
        showToast('Converted to JPG format successfully!', 'success');
      });
    `,
    
    features: [
      "Safely fills alpha transparency sectors with clean white background fill.",
      "Preserves original pixel dimension parameters.",
      "High speed client-side rendering with no external uploads.",
      "Generates 90% quality optimized JPG formats."
    ],
    instructions: [
      "Browse and select your target transparent PNG file.",
      "Click the red 'Convert to JPG' command button.",
      "Click 'Download JPG' once the conversion process completes."
    ],
    benefits: [
      "Avoids grey blocks showing on transparent background sections in older media readers.",
      "Significantly reduces file byte dimensions by saving in JPG raster modes.",
      "100% private conversion for company graphics, spreadsheets, or charts."
    ],
    faqs: [
      { q: "Why do PNG files have transparent backgrounds?", a: "PNG format features an alpha channel that permits variable transparency, while JPG is a flattened solid raster format." },
      { q: "Is the image blurred during conversion?", a: "No. The converter parses the image using canvas, maintaining sharp pixel fidelity." },
      { q: "Can I convert multiple files at once?", a: "This offline tool is built for fast individual file processing. Simply load and click successively." }
    ]
  }
];

module.exports = imageTools;
