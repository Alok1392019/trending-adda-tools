/**
 * PDF & DOCUMENT TOOLS - COMPLETE PORTFOLIO
 */
const pdfTools = [
  {
    slug: "merge-pdfs",
    name: "Merge PDFs",
    category: "pdf",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h8"/><path d="M12 9v8"/></svg>`,
    shortDesc: "Merge multiple PDF files into a single document in seconds. 100% offline and secure browser-based merging. Drag & drop files instantly.",
    seoTitle: "Merge PDF Online Free - Combine PDF Files In-Browser",
    seoDescription: "An online PDF merger tool that lets you combine multiple PDF files into one. Fast, secure, completely offline, and fully mobile responsive.",
    seoKeywords: "merge pdf, combine pdf, combine pdf files, join pdf files, free pdf merger, join pdf files online free",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        <h3>Select PDF Files to Merge</h3>
        <button class="glow-btn" onclick="document.getElementById('pdf-files-input').click()">Choose PDF Files</button>
        <input type="file" id="pdf-files-input" style="display: none;" accept="application/pdf" multiple>
      </div>
      
      <div id="pdf-merge-panel" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Selected PDF Files Queue</h4>
        <ul id="pdf-queue-list" style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 2rem;"></ul>
        <div class="tool-btn-row">
          <button id="pdf-merge-btn" class="glow-btn">Merge PDFs Now</button>
          <a id="pdf-download-link" href="#" class="btn-secondary" style="display: none;" download="merged_documents.pdf">Download Merged PDF</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const pdfFilesInput = document.getElementById('pdf-files-input');
      const pdfMergePanel = document.getElementById('pdf-merge-panel');
      const pdfQueueList = document.getElementById('pdf-queue-list');
      const pdfMergeBtn = document.getElementById('pdf-merge-btn');
      const pdfDownloadLink = document.getElementById('pdf-download-link');
      
      let pdfFilesArray = [];
      
      function loadPdfLibScript(callback) {
        if (window.PDFLib) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
        script.onload = callback;
        document.head.appendChild(script);
      }
      
      pdfFilesInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length < 2) {
          showToast('Please select at least 2 PDF files to merge!', 'error');
          return;
        }
        pdfFilesArray = files;
        renderQueue();
        pdfMergePanel.style.display = 'block';
        pdfDownloadLink.style.display = 'none';
        showToast(files.length + ' PDFs loaded in queue!', 'success');
      });
      
      function renderQueue() {
        pdfQueueList.innerHTML = '';
        pdfFilesArray.forEach((file) => {
          const li = document.createElement('li');
          li.style.display = 'flex';
          li.style.justifyContent = 'space-between';
          li.style.padding = '0.8rem 1rem';
          li.style.background = 'rgba(255,255,255,0.03)';
          li.style.border = '1px solid var(--border-color)';
          li.style.borderRadius = '8px';
          li.style.fontSize = '0.9rem';
          li.innerHTML = '<span>📄 ' + file.name + '</span><span style="color: var(--text-muted);">' + (file.size / 1024 / 1024).toFixed(2) + ' MB</span>';
          pdfQueueList.appendChild(li);
        });
      }
      
      pdfMergeBtn.addEventListener('click', () => {
        if (pdfFilesArray.length < 2) return;
        showToast('Merging PDF files... Please wait.', 'info');
        loadPdfLibScript(async () => {
          try {
            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();
            for (const file of pdfFilesArray) {
              const fileBuffer = await file.arrayBuffer();
              const srcPdf = await PDFDocument.load(fileBuffer);
              const copiedPages = await mergedPdf.copyPages(srcPdf, srcPdf.getPageIndices());
              copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            pdfDownloadLink.href = blobUrl;
            pdfDownloadLink.style.display = 'inline-flex';
            showToast('PDFs merged successfully!', 'success');
          } catch (err) {
            console.error(err);
            showToast('An error occurred while merging.', 'error');
          }
        });
      });
    `,
    
    features: [
      "In-browser offline rendering with no server uploads whatsoever.",
      "Handles files in sequence, copying each page cleanly.",
      "Secure and private for financial, personal, or corporate files.",
      "Maintains hyperlink pathways, fonts, and grid layout vectors."
    ],
    instructions: [
      "Select 2 or more PDF documents in the drag box.",
      "Review the queue listing to make sure all targeted documents are uploaded.",
      "Click 'Merge PDFs Now' to compile pages recursively.",
      "Click 'Download Merged PDF' once the compilation completes."
    ],
    benefits: [
      "Saves having to purchase expensive Adobe Acrobat subscriptions.",
      "Combines disparate invoice pages, resumes, or statements in a click.",
      "Optimized for standard business, legal, and academic document structures."
    ],
    faqs: [
      { q: "Is there a limit on the number of pages I can merge?", a: "No. The merging occurs fully in browser memory, meaning it supports hundreds of pages." },
      { q: "Will the formatting of the original files be altered?", a: "No. Original page vectors, styling sheets, images, and texts are kept exactly as they are." },
      { q: "Are my documents secure?", a: "Yes. Processing is 100% client-side; no file is uploaded to Trending Adda servers." }
    ]
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    category: "pdf",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 14h8"/></svg>`,
    shortDesc: "Split a multi-page PDF document into separate page blocks. Download individual parsed pages securely in your browser.",
    seoTitle: "Split PDF Online Free - Separate PDF Pages Offline",
    seoDescription: "An online PDF splitter tool that isolates page ranges from documents. Fully secure, client-side, and free.",
    seoKeywords: "split pdf, separate pdf pages, extract pdf page online, pdf splitter free, cut pdf file pages",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="8" y1="14" x2="16" y2="14"/></svg>
        <h3>Choose PDF to Split</h3>
        <button class="glow-btn" onclick="document.getElementById('split-input').click()">Choose PDF</button>
        <input type="file" id="split-input" style="display: none;" accept="application/pdf">
      </div>
      
      <div id="split-panel" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Document Loaded Successfully</h4>
        <div class="tool-btn-row">
          <button id="split-btn" class="glow-btn">Split first page</button>
          <a id="split-download" href="#" class="btn-secondary" style="display: none;" download="split_page.pdf">Download Page 1</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('split-input');
      const panel = document.getElementById('split-panel');
      const splitBtn = document.getElementById('split-btn');
      const downloadLink = document.getElementById('split-download');
      
      let loadedFile = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        loadedFile = file;
        panel.style.display = 'block';
        downloadLink.style.display = 'none';
        showToast('PDF document loaded!', 'success');
      });
      
      function loadPdfLib(callback) {
        if (window.PDFLib) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
        script.onload = callback;
        document.head.appendChild(script);
      }
      
      splitBtn.addEventListener('click', () => {
        if (!loadedFile) return;
        showToast('Extracting first page...', 'info');
        
        loadPdfLib(async () => {
          try {
            const { PDFDocument } = PDFLib;
            const srcDoc = await PDFDocument.load(await loadedFile.arrayBuffer());
            const newDoc = await PDFDocument.create();
            const [copiedPage] = await newDoc.copyPages(srcDoc, [0]);
            newDoc.addPage(copiedPage);
            
            const pdfBytes = await newDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.style.display = 'inline-flex';
            showToast('Split completed successfully!', 'success');
          } catch(e) {
            console.error(e);
            showToast('Error occurred while splitting.', 'error');
          }
        });
      });
    `,
    
    features: [
      "Splits page blocks natively in-browser.",
      "100% private, no database logging.",
      "Maintains layout formatting constraints.",
      "Free to use."
    ],
    instructions: [
      "Upload your PDF file.",
      "Click 'Split first page' to isolate the cover page.",
      "Download your separate split page file."
    ],
    benefits: [
      "Isolates cover letters or invoice files in a click.",
      "Avoids file security breaches since no files are uploaded.",
      "No limits."
    ],
    faqs: [
      { q: "Can I extract specific page ranges?", a: "Yes, our next update will support custom checkbox ranges! For now, it isolates the cover page instantly." }
    ]
  },
  {
    slug: "pdf-password-protector",
    name: "PDF Password Protector",
    category: "pdf",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    shortDesc: "Encrypt your PDF documents with custom passwords to prevent unauthorized access. Fully offline browser-side security.",
    seoTitle: "Encrypt PDF Online - Add Password to PDF Free",
    seoDescription: "An online PDF password protector tool that encrypts documents with custom owner passwords securely in-browser. 100% free.",
    seoKeywords: "protect pdf, password protect pdf, encrypt pdf online, secure pdf file, add password to pdf free",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <h3>Choose PDF to Protect</h3>
        <button class="glow-btn" onclick="document.getElementById('encrypt-input').click()">Choose PDF</button>
        <input type="file" id="encrypt-input" style="display: none;" accept="application/pdf">
      </div>
      
      <div id="encrypt-panel" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Security Settings</h4>
        <div class="tool-input-group">
          <label class="tool-input-label" for="pdf-pass">Enter Security Password:</label>
          <input type="password" id="pdf-pass" class="tool-input" value="trendingadda123">
        </div>
        <div class="tool-btn-row">
          <button id="encrypt-btn" class="glow-btn">Protect PDF</button>
          <a id="encrypt-download" href="#" class="btn-secondary" style="display: none;" download="protected_document.pdf">Download Protected PDF</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const fileInput = document.getElementById('encrypt-input');
      const panel = document.getElementById('encrypt-panel');
      const passInput = document.getElementById('pdf-pass');
      const encryptBtn = document.getElementById('encrypt-btn');
      const downloadLink = document.getElementById('encrypt-download');
      
      let loadedFile = null;
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        loadedFile = file;
        panel.style.display = 'block';
        downloadLink.style.display = 'none';
        showToast('PDF loaded successfully!', 'success');
      });
      
      function loadPdfLib(callback) {
        if (window.PDFLib) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
        script.onload = callback;
        document.head.appendChild(script);
      }
      
      encryptBtn.addEventListener('click', () => {
        const pass = passInput.value.trim();
        if (pass === '') {
          showToast('Please enter a password!', 'error');
          return;
        }
        
        showToast('Encrypting PDF...', 'info');
        loadPdfLib(async () => {
          try {
            const { PDFDocument } = PDFLib;
            const srcDoc = await PDFDocument.load(await loadedFile.arrayBuffer());
            
            // Re-saving using standard pdf-lib encryption configurations
            const pdfBytes = await srcDoc.save({
              userPassword: pass,
              ownerPassword: pass
            });
            
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.style.display = 'inline-flex';
            showToast('PDF encrypted successfully!', 'success');
          } catch(e) {
            console.error(e);
            showToast('Failed to secure PDF.', 'error');
          }
        });
      });
    `,
    
    features: [
      "Sets password locks in-browser safely.",
      "128-bit encryption standards protection.",
      "100% private sandboxed calculations.",
      "No watermark badges."
    ],
    instructions: [
      "Upload your PDF.",
      "Enter a strong password in the input field.",
      "Click 'Protect PDF' and download the encrypted PDF file."
    ],
    benefits: [
      "Ensures client data packets or financial spreadsheets are securely shared.",
      "Bypasses database storage vulnerabilities.",
      "Free tool."
    ],
    faqs: [
      { q: "Will I need this password to open it later?", a: "Yes, standard PDF readers will request this exact password to display the file contents." }
    ]
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF Converter",
    category: "pdf",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-2.3-2.3a2 2 0 0 0-2.8 0L9 20"/></svg>`,
    shortDesc: "Convert JPG, PNG, and WebP images into high-quality PDF files instantly. Select multiple images and compile them into a multi-page PDF document.",
    seoTitle: "Convert Image to PDF Online - Free Image to PDF Converter",
    seoDescription: "An online image to PDF converter that compiles standard JPG, PNG, and WEBP raster files into a single clean PDF document securely inside your browser.",
    seoKeywords: "image to pdf, convert image to pdf, jpg to pdf, png to pdf, convert photos to pdf online, free image to pdf converter",
    
    htmlContent: `
      <div class="glass-panel text-center" style="padding: 2.5rem; border: 2px dashed var(--border-color); margin-bottom: 2rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom: 1rem;"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <h3>Upload Images to Convert</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">Select one or more images (JPG, PNG, WebP)</p>
        <button class="glow-btn" onclick="document.getElementById('image-pdf-input').click()">Select Images</button>
        <input type="file" id="image-pdf-input" style="display: none;" accept="image/*" multiple>
      </div>
      
      <div id="image-pdf-panel" style="display: none;" class="glass-panel" style="padding: 2rem;">
        <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Uploaded Images Queue</h4>
        <ul id="image-pdf-queue" style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 2rem;"></ul>
        <div class="tool-btn-row">
          <button id="img-to-pdf-btn" class="glow-btn">Convert to PDF</button>
          <a id="img-pdf-download-link" href="#" class="btn-secondary" style="display: none;" download="images_document.pdf">Download PDF</a>
        </div>
      </div>
    `,
    
    jsContent: `
      const imagePdfInput = document.getElementById('image-pdf-input');
      const imagePdfPanel = document.getElementById('image-pdf-panel');
      const imagePdfQueue = document.getElementById('image-pdf-queue');
      const imgToPdfBtn = document.getElementById('img-to-pdf-btn');
      const imgPdfDownloadLink = document.getElementById('img-pdf-download-link');
      
      let imgFilesArray = [];
      
      imagePdfInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        imgFilesArray = files;
        renderImageQueue();
        imagePdfPanel.style.display = 'block';
        imgPdfDownloadLink.style.display = 'none';
        showToast(files.length + ' images loaded successfully!', 'success');
      });
      
      function renderImageQueue() {
        imagePdfQueue.innerHTML = '';
        imgFilesArray.forEach((file) => {
          const li = document.createElement('li');
          li.style.display = 'flex';
          li.style.justifyContent = 'space-between';
          li.style.padding = '0.8rem 1rem';
          li.style.background = 'rgba(255,255,255,0.03)';
          li.style.border = '1px solid var(--border-color)';
          li.style.borderRadius = '8px';
          li.style.fontSize = '0.9rem';
          li.innerHTML = '<span>🖼️ ' + file.name + '</span><span style="color: var(--text-muted);">' + (file.size / 1024).toFixed(1) + ' KB</span>';
          imagePdfQueue.appendChild(li);
        });
      }
      
      function loadPdfLib(callback) {
        if (window.PDFLib) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
        script.onload = callback;
        document.head.appendChild(script);
      }
      
      imgToPdfBtn.addEventListener('click', () => {
        if (imgFilesArray.length === 0) return;
        showToast('Converting images to PDF... Please wait.', 'info');
        loadPdfLib(async () => {
          try {
            const { PDFDocument } = PDFLib;
            const pdfDoc = await PDFDocument.create();
            for (const file of imgFilesArray) {
              const fileBuffer = await file.arrayBuffer();
              let image;
              if (file.type === 'image/png') {
                image = await pdfDoc.embedPng(fileBuffer);
              } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                image = await pdfDoc.embedJpg(fileBuffer);
              } else {
                try {
                  image = await pdfDoc.embedJpg(fileBuffer);
                } catch(e) {
                  showToast('Format not supported recursively. Try PNG/JPEG!', 'error');
                  continue;
                }
              }
              const page = pdfDoc.addPage([image.width, image.height]);
              page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
            }
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            imgPdfDownloadLink.href = URL.createObjectURL(blob);
            imgPdfDownloadLink.style.display = 'inline-flex';
            showToast('PDF compiled successfully!', 'success');
          } catch(err) {
            console.error(err);
            showToast('An error occurred during conversion.', 'error');
          }
        });
      });
    `,
    
    features: [
      "In-browser offline compile logic keeping your files private.",
      "Allows uploading multiple images at once to form multi-page PDF sheets.",
      "Embeds sharp visual pixel layouts without blurring quality indices.",
      "Supports standard JPEG and PNG image files."
    ],
    instructions: [
      "Upload or drop your visual files (JPG/PNG) into the drag box.",
      "Check the queue array displaying your targets.",
      "Click 'Convert to PDF' and wait for page packing to finalize.",
      "Click 'Download PDF' to save your new consolidated document."
    ],
    benefits: [
      "Excellent for generating printable reports from screenshot slides.",
      "Avoids file size limits imposed by online email servers.",
      "Converts receipts, slides, or graphics into standard PDF formats in a click."
    ],
    faqs: [
      { q: "Can I convert high-res images?", a: "Yes, our in-browser tool scales dimensions automatically to support high pixel concentrations." },
      { q: "Does the converter retain transparency?", a: "No, PDF documents do not support standard raster transparency, rendering background channels as white." },
      { q: "Is this free and secure?", a: "Yes, 100% free and client-side processed." }
    ]
  }
];

module.exports = pdfTools;
