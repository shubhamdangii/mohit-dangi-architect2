/* ============================================================
   MOHIT DANGI ARCHITECT — Main JavaScript v2
   Real logo file. Awards page. Smooth scroll animations.
   ============================================================ */

let CONFIG = null;
let PROJECTS = [];
let SERVICES = [];
let AWARDS = [];

const LOGO_PATH = "images/logo/logo.svg";

async function loadJSON(path) {
  try { const r = await fetch(path); return await r.json(); }
  catch (e) { console.error(`Failed: ${path}`, e); return null; }
}

async function loadAllData() {
  const [c, p, s, a] = await Promise.all([
    loadJSON('data/config.json'),
    loadJSON('data/projects.json'),
    loadJSON('data/services.json'),
    loadJSON('data/awards.json'),
  ]);
  CONFIG = c;
  PROJECTS = p?.projects || [];
  SERVICES = s?.services || [];
  AWARDS = a?.awards || [];
}

function injectNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const s = CONFIG.studio;
  const navHTML = `
    <nav class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo" aria-label="${s.name} home">
          <img src="images/logo/logo-full.png" alt="${s.name}" class="nav-logo-full">
        </a>
        <ul class="nav-links" id="nav-links">
          <li><a href="about.html" data-page="about.html">About</a></li>
          <li><a href="architecture.html" data-page="architecture.html">Architecture</a></li>
          <li><a href="interior.html" data-page="interior.html">Interior</a></li>
          <li><a href="landscaping.html" data-page="landscaping.html">Landscaping</a></li>
          <li><a href="master-planning.html" data-page="master-planning.html">Master Planning</a></li>
          <li><a href="services.html" data-page="services.html">Services</a></li>
          <li><a href="awards.html" data-page="awards.html">Awards</a></li>
          <li><a href="contact.html" data-page="contact.html">Contact</a></li>
          <li><button type="button" class="nav-cta" id="nav-cta-mobile" data-open-modal>Get Free Quote</button></li>
        </ul>
        <button type="button" class="nav-cta" id="nav-cta-desktop" data-open-modal>Get Free Quote</button>
        <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.dataset.page === currentPath) link.classList.add('active');
  });

  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    links.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

function injectFooter() {
  const s = CONFIG.studio;
  const c = CONFIG.contact;
  const social = CONFIG.social;
  const socialItems = [
    { name: 'Instagram', url: social.instagram },
    { name: 'Facebook', url: social.facebook },
    { name: 'LinkedIn', url: social.linkedin },
    { name: 'YouTube', url: social.youtube },
    { name: 'Behance', url: social.behance },
    { name: 'Pinterest', url: social.pinterest },
  ].filter(x => x.url && x.url.trim() !== '');

  const socialHTML = socialItems.length > 0
    ? socialItems.map(x => `<li><a href="${x.url}" target="_blank" rel="noopener">${x.name}</a></li>`).join('')
    : '<li><span style="color: rgba(255,255,255,0.4);">Coming soon</span></li>';

  const footerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div>
            <div class="footer-brand-wrap">
              <img src="${LOGO_PATH}" alt="${s.name} logo" class="footer-logo-img">
              <span class="footer-brand">${s.name.split(' Architect')[0]} <em>Architect</em></span>
            </div>
            <p class="footer-tagline">"${s.tagline}"</p>
          </div>
          <div class="footer-col">
            <h4>Work</h4>
            <ul>
              <li><a href="architecture.html">Architecture</a></li>
              <li><a href="interior.html">Interior</a></li>
              <li><a href="landscaping.html">Landscaping</a></li>
              <li><a href="master-planning.html">Master Planning</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Studio</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="awards.html">Awards</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <ul>${socialHTML}</ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} ${s.name}. All rights reserved.</div>
          <div>${c.city}, ${c.state}, ${c.country}</div>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function injectFloatingButtons() {
  const c = CONFIG.contact;
  const whatsappNumber = c.phone1Raw;
  const callNumber = c.phone1;
  const whatsappMessage = encodeURIComponent(`Hi, I came across ${CONFIG.studio.name} website and would like to enquire about a project.`);

  const html = `
    <div class="floating-btns">
      <a href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" target="_blank" rel="noopener" class="float-btn whatsapp" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </a>
      <a href="tel:${callNumber.replace(/\s/g,'')}" class="float-btn call" aria-label="Call us">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
      </a>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

function injectConsultationModal() {
  const c = CONFIG.contact;
  const whatsappNumber = c.phone1Raw;

  const modalHTML = `
    <div class="modal-overlay" id="consultation-modal" role="dialog" aria-modal="true" aria-label="Book free consultation">
      <div class="modal-box">
        <button type="button" class="modal-close" id="modal-close" aria-label="Close">×</button>
        <div class="modal-title">Get a free consultation with <em>${CONFIG.studio.name}</em></div>
        <div class="modal-subtitle">Fill in your details — we will get back within 24 hours.</div>
        <form class="modal-form" id="consultation-form">
          <div class="form-field">
            <label for="m-name">Name</label>
            <input type="text" id="m-name" name="name" required>
          </div>
          <div class="form-field">
            <label for="m-phone">Phone</label>
            <input type="tel" id="m-phone" name="phone" required pattern="[0-9+ ]{7,15}">
          </div>
          <div class="form-field">
            <label for="m-service">I am interested in</label>
            <select id="m-service" name="service">
              <option value="General enquiry">General enquiry</option>
              <option value="Architect Consultation">Architect Consultation</option>
              <option value="Floor Plan / Design">Floor Plan / Design</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Vastu Consultancy">Vastu Consultancy</option>
              <option value="Construction Cost Estimate">Construction Cost Estimate</option>
              <option value="Landscaping">Landscaping</option>
              <option value="Master Planning">Master Planning</option>
            </select>
          </div>
          <button type="submit" class="modal-submit">Call me back</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const overlay = document.getElementById('consultation-modal');
  const closeBtn = document.getElementById('modal-close');
  const form = document.getElementById('consultation-form');

  function openModal() { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const toggle = document.getElementById('nav-toggle');
      const links = document.getElementById('nav-links');
      if (toggle && links) {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
      openModal();
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('m-name').value.trim();
    const phone = document.getElementById('m-phone').value.trim();
    const service = document.getElementById('m-service').value;
    const message = `Hi ${CONFIG.studio.name}, I would like a free consultation.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AInterested in: ${encodeURIComponent(service)}`;
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
    form.reset();
    closeModal();
  });
}

function injectQuickServices() {
  const container = document.getElementById('quick-services');
  if (!container) return;
  const c = CONFIG.contact;
  const whatsappNumber = c.phone1Raw;

  const services = [
    { icon: '📐', name: 'Architect Consultation', price: 'Free', msg: 'Hi, I would like to book an Architect Consultation.' },
    { icon: '🏠', name: 'Floor Plan Quote', price: 'Free Quote', msg: 'Hi, I would like a Floor Plan quote for my project.' },
    { icon: '🧭', name: 'Vastu Consultancy', price: 'On Request', msg: 'Hi, I would like to enquire about Vastu Consultancy.' },
    { icon: '🧮', name: 'Cost Estimate', price: 'Free', msg: 'Hi, I would like a Construction Cost Estimate for my project.' },
  ];

  container.innerHTML = `
    <div class="quick-services-header reveal" data-reveal>
      <div class="eyebrow">Quick Services</div>
      <h2>Start your <em>dream project</em>.</h2>
    </div>
    <div class="quick-services-grid">
      ${services.map(s => `
        <a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(s.msg)}" target="_blank" rel="noopener" class="quick-service-tile reveal" data-reveal>
          <div class="quick-service-icon">${s.icon}</div>
          <div class="quick-service-name">${s.name}</div>
          <div class="quick-service-price ${s.price.toLowerCase().includes('free') ? 'free' : ''}">${s.price}</div>
        </a>
      `).join('')}
    </div>
  `;
}

function projectCardHTML(project, spanClass = 'span-6') {
  return `
    <a href="project.html?id=${project.id}" class="project-card ${spanClass} reveal" data-reveal>
      <div class="project-image">
        <img class="project-image-main" src="${project.coverImage}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-info">
        <div class="project-info-left">
          <div class="project-category">${project.categoryLabel}</div>
          <div class="project-title">${project.title}</div>
        </div>
        <div class="project-meta">
          <strong>${project.year}</strong><br>${project.location.split(',')[0]}
        </div>
      </div>
    </a>
  `;
}

function generateSpanPattern(count) {
  const patterns = ['span-7', 'span-5', 'span-5', 'span-7', 'span-7', 'span-5', 'span-5', 'span-7', 'span-7', 'span-5'];
  return Array.from({ length: count }, (_, i) => patterns[i % patterns.length]);
}

function renderHome() {
  const container = document.getElementById('home-projects');
  if (!container) return;
  const featured = PROJECTS.filter(p => p.featured);
  const spans = generateSpanPattern(featured.length);
  container.innerHTML = featured.map((p, i) => projectCardHTML(p, spans[i])).join('');
  const quoteEl = document.getElementById('philosophy-quote');
  const authorEl = document.getElementById('philosophy-author');
  if (quoteEl) {
    const quotes = CONFIG.studio.philosophyQuotes;
    if (quotes && quotes.length) {
      const pick = quotes[Math.floor(Math.random() * quotes.length)];
      quoteEl.textContent = pick.quote;
      if (authorEl) authorEl.textContent = pick.author;
    } else {
      quoteEl.textContent = CONFIG.studio.tagline;
      if (authorEl) authorEl.textContent = CONFIG.studio.taglineAttribution;
    }
  }
}

function renderCategory(category) {
  const container = document.getElementById('category-projects');
  if (!container) return;
  const filtered = PROJECTS.filter(p =>
    p.category === category || (p.secondaryCategories && p.secondaryCategories.includes(category))
  );
  if (filtered.length === 0) {
    container.innerHTML = `<div class="loading">No projects in this category yet. Check back soon.</div>`;
    return;
  }
  const spans = generateSpanPattern(filtered.length);
  container.innerHTML = filtered.map((p, i) => projectCardHTML(p, spans[i])).join('');
}

function renderProjectDetail() {
  const container = document.getElementById('project-content');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  if (!projectId) {
    container.innerHTML = '<div class="loading">No project specified.</div>';
    return;
  }
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) {
    container.innerHTML = '<div class="loading">Project not found.</div>';
    return;
  }
  document.title = `${project.title} — ${CONFIG.studio.name}`;
  const sameCategory = PROJECTS.filter(p => p.category === project.category && p.id !== project.id);
  const nextProject = sameCategory.length > 0 ? sameCategory[0] : PROJECTS.find(p => p.id !== project.id);

  const galleryImages = project.images.slice(1);
  let galleryHTML = '';
  for (let i = 0; i < galleryImages.length; i++) {
    if (i + 1 < galleryImages.length && i % 3 === 0) {
      galleryHTML += `
        <div class="gallery-row-2 reveal" data-reveal>
          <img src="${galleryImages[i]}" alt="${project.title} image" loading="lazy">
          <img src="${galleryImages[i + 1]}" alt="${project.title} image" loading="lazy">
        </div>`;
      i++;
    } else {
      galleryHTML += `<img src="${galleryImages[i]}" alt="${project.title} image" loading="lazy" class="reveal" data-reveal>`;
    }
  }

  container.innerHTML = `
    <div class="project-hero"><img src="${project.coverImage}" alt="${project.title}"></div>
    <div class="project-detail">
      <div class="project-detail-header reveal" data-reveal>
        <div>
          <div class="eyebrow">${project.categoryLabel}</div>
          <h1 class="project-detail-title">${project.title}</h1>
        </div>
        <div class="project-detail-info">
          <p>${project.description}</p>
          <div class="project-specs">
            <div class="project-spec"><div class="project-spec-label">Year</div><div class="project-spec-value">${project.year}</div></div>
            <div class="project-spec"><div class="project-spec-label">Location</div><div class="project-spec-value">${project.location}</div></div>
            <div class="project-spec"><div class="project-spec-label">Type</div><div class="project-spec-value">${project.type}</div></div>
            <div class="project-spec"><div class="project-spec-label">Area</div><div class="project-spec-value">${project.area}</div></div>
            <div class="project-spec"><div class="project-spec-label">Status</div><div class="project-spec-value">${project.status}</div></div>
            <div class="project-spec"><div class="project-spec-label">Category</div><div class="project-spec-value">${project.categoryLabel}</div></div>
          </div>
        </div>
      </div>
      <div class="project-gallery">${galleryHTML}</div>
      ${nextProject ? `
        <a href="project.html?id=${nextProject.id}" class="next-project reveal" data-reveal>
          <div>
            <div class="next-project-label">Next Project</div>
            <div class="next-project-title">${nextProject.title} <em>→</em></div>
          </div>
          <div class="project-meta"><strong>${nextProject.year}</strong> · ${nextProject.categoryLabel}</div>
        </a>` : ''}
    </div>
  `;
}

function renderServices() {
  const container = document.getElementById('services-list');
  if (!container) return;
  container.innerHTML = SERVICES.map((s, i) => `
    <div class="service-row reveal" data-reveal>
      <div class="service-number">${String(i + 1).padStart(2, '0')}.</div>
      <div>
        <div class="service-name">${s.name}</div>
        <div class="service-short">${s.shortDescription}</div>
      </div>
      <div class="service-description">${s.description}</div>
    </div>
  `).join('');
}

function renderAwards() {
  const container = document.getElementById('awards-list');
  if (!container) return;
  if (AWARDS.length === 0) {
    container.innerHTML = '<div class="loading">No awards listed yet.</div>';
    return;
  }
  container.innerHTML = AWARDS.map(award => `
    <div class="award-row reveal" data-reveal>
      <div class="award-year">${award.year}</div>
      <div>
        <div class="award-title">${award.title}</div>
        <div class="award-org">${award.organization}</div>
        <div class="award-desc">${award.description}</div>
      </div>
      <div class="award-project">
        Project
        <strong>${award.project}</strong>
      </div>
    </div>
  `).join('');
}

function renderContact() {
  const container = document.getElementById('contact-content');
  if (!container) return;
  const c = CONFIG.contact;
  const f = CONFIG.inquiry.fields;
  const social = CONFIG.social;
  const phone1Clean = c.phone1.replace(/\s/g, '');
  const phone2Clean = c.phone2.replace(/\s/g, '');
  const socialList = [
    { name: 'Instagram', url: social.instagram },
    { name: 'Facebook', url: social.facebook },
    { name: 'LinkedIn', url: social.linkedin },
  ].filter(x => x.url && x.url.trim() !== '');
  const socialHTML = socialList.map(x => `<a href="${x.url}" target="_blank" rel="noopener">${x.name}</a>`).join('');

  container.innerHTML = `
    <div class="contact-grid">
      <div class="contact-info reveal" data-reveal>
        <h3>Studio</h3>
        <p><a href="https://maps.google.com/?cid=538599289881855612" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${c.addressLine1}<br>${c.addressLine2}<br>${c.city}, ${c.state} — ${c.pincode}<br>${c.country}</a></p>
        <h3>Phone</h3>
        <a href="tel:${phone1Clean}">${c.phone1} (WhatsApp · Call)</a>
        <a href="tel:${phone2Clean}">${c.phone2} (Call)</a>
        <h3>Email</h3>
        <a href="mailto:${c.email}">${c.email}</a>
        <h3>Hours</h3>
        <p>${c.workingHours}</p>
        ${socialHTML ? `<h3>Social</h3>${socialHTML}` : ''}
      </div>
      <form class="contact-form reveal" id="inquiry-form" data-reveal>
        <div class="form-row">
          <div class="form-field">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-field">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone" required>
          </div>
        </div>
        <div class="form-field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        ${f.projectType ? `
        <div class="form-field">
          <label for="projectType">Project Type</label>
          <select id="projectType" name="projectType">
            <option value="">— Select project type —</option>
            <option>Architecture</option>
            <option>Interior Designing</option>
            <option>Exterior Design</option>
            <option>Landscaping</option>
            <option>Master Planning</option>
            <option>3D Modelling &amp; Rendering</option>
            <option>Vaastu Consultancy</option>
            <option>Turnkey Solutions</option>
            <option>Other</option>
          </select>
        </div>` : ''}
        ${f.location ? `
        <div class="form-field">
          <label for="location">Project Location (City)</label>
          <input type="text" id="location" name="location">
        </div>` : ''}
        <div class="form-row">
          ${f.budget ? `
          <div class="form-field">
            <label for="budget">Approx. Budget</label>
            <select id="budget" name="budget">
              <option value="">— Optional —</option>
              <option>Under ₹10 Lakhs</option>
              <option>₹10 – ₹25 Lakhs</option>
              <option>₹25 – ₹50 Lakhs</option>
              <option>₹50 Lakhs – ₹1 Crore</option>
              <option>Above ₹1 Crore</option>
              <option>To be discussed</option>
            </select>
          </div>` : ''}
          ${f.timeline ? `
          <div class="form-field">
            <label for="timeline">Timeline</label>
            <select id="timeline" name="timeline">
              <option value="">— Optional —</option>
              <option>Starting immediately</option>
              <option>Within 3 months</option>
              <option>3 – 6 months</option>
              <option>6 – 12 months</option>
              <option>Just exploring</option>
            </select>
          </div>` : ''}
        </div>
        <div class="form-field">
          <label for="message">Tell us about your project</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn-primary">Send Enquiry →</button>
      </form>
    </div>
    <div class="contact-map reveal" data-reveal>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.651818106408!2d74.62965357844845!3d25.349462167816174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c3a316aae959%3A0x7797d3355af867c!2sMohit%20Dangi%20Architects%20%7C%20Bhilwara%2C%20Rajasthan%20%F0%9F%93%8D!5e0!3m2!1sen!2sus!4v1780118956048!5m2!1sen!2sus" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  `;
  const form = document.getElementById('inquiry-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const whatsappNumber = CONFIG.contact.phone1Raw;
    const name     = (document.getElementById('name')?.value     || '').trim();
    const phone    = (document.getElementById('phone')?.value    || '').trim();
    const email    = (document.getElementById('email')?.value    || '').trim();
    const service  = (document.getElementById('service')?.value  || '').trim();
    const budget   = (document.getElementById('budget')?.value   || '').trim();
    const location = (document.getElementById('location')?.value || '').trim();
    const message  = (document.getElementById('message')?.value  || '').trim();
    const text = `New Enquiry from Website%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      (email    ? `Email: ${encodeURIComponent(email)}%0A`    : '') +
      (service  ? `Service: ${encodeURIComponent(service)}%0A`  : '') +
      (budget   ? `Budget: ${encodeURIComponent(budget)}%0A`   : '') +
      (location ? `Location: ${encodeURIComponent(location)}%0A` : '') +
      (message  ? `%0AMessage: ${encodeURIComponent(message)}` : '');
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    form.reset();
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

function injectMeta() {
  if (!CONFIG) return;
  const seo = CONFIG.seo;
  if (!document.querySelector('meta[name="description"]')) {
    const m = document.createElement('meta');
    m.name = 'description';
    m.content = seo.metaDescription;
    document.head.appendChild(m);
  }
  if (!document.querySelector('meta[name="keywords"]')) {
    const m = document.createElement('meta');
    m.name = 'keywords';
    m.content = seo.keywords.join(', ');
    document.head.appendChild(m);
  }
}



/* ============================================================
   SKETCH SLIDESHOW — replaces hero photo with SVG sketches
   ============================================================ */
const HERO_SKETCHES = [
  // Sketch 1 — Angular pavilion with tower
  `<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" stroke="#1a1614" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="50" y1="320" x2="850" y2="320" stroke-width="1.5"/>
    <polygon points="180,320 180,200 380,200 380,320" stroke-width="1.2"/>
    <polyline points="80,215 180,200 500,155 820,200 850,215" stroke-width="2"/>
    <rect x="380" y="230" width="250" height="90" stroke-width="1.2"/>
    <rect x="620" y="150" width="60" height="170" stroke-width="1.5"/>
    <polyline points="610,150 650,120 690,150" stroke-width="1.8"/>
    <rect x="200" y="225" width="30" height="45" stroke-width="0.8"/>
    <rect x="245" y="225" width="30" height="45" stroke-width="0.8"/>
    <rect x="290" y="225" width="30" height="45" stroke-width="0.8"/>
    <line x1="625" y1="165" x2="675" y2="165" stroke-width="0.5"/><line x1="625" y1="180" x2="675" y2="180" stroke-width="0.5"/><line x1="625" y1="195" x2="675" y2="195" stroke-width="0.5"/><line x1="625" y1="210" x2="675" y2="210" stroke-width="0.5"/>
    <rect x="310" y="265" width="40" height="55" stroke-width="1"/>
    <circle cx="650" cy="138" r="12" stroke-width="1"/>
    <line x1="150" y1="312" x2="150" y2="296" stroke-width="1.2"/><circle cx="150" cy="292" r="4" stroke-width="1"/>
    <line x1="165" y1="313" x2="165" y2="298" stroke-width="1.2"/><circle cx="165" cy="295" r="3.5" stroke-width="1"/>
    <line x1="50" y1="320" x2="150" y2="380" stroke-width="0.6" opacity="0.3"/>
    <line x1="850" y1="320" x2="760" y2="375" stroke-width="0.6" opacity="0.3"/>
  </svg>`,
  // Sketch 2 — Stone arch bridge
  `<svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" stroke="#1a1614" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="50" y1="300" x2="850" y2="300" stroke-width="1" stroke-dasharray="8,4"/>
    <line x1="100" y1="312" x2="500" y2="312" stroke-width="0.6" stroke-dasharray="12,6"/>
    <path d="M 200,300 Q 450,120 700,300" stroke-width="2.5"/>
    <path d="M 240,280 Q 450,145 660,280" stroke-width="1" stroke-dasharray="5,3"/>
    <path d="M 180,300 L 170,220 L 200,190 L 260,183 L 340,178 L 420,172 L 460,170 L 500,172 L 560,177 L 630,186 L 700,200 L 720,220 L 720,300" stroke-width="1.8"/>
    <line x1="290" y1="250" x2="270" y2="265" stroke-width="0.8"/><line x1="370" y1="215" x2="348" y2="228" stroke-width="0.8"/><line x1="450" y1="200" x2="450" y2="214" stroke-width="0.8"/><line x1="530" y1="208" x2="548" y2="220" stroke-width="0.8"/><line x1="600" y1="238" x2="618" y2="250" stroke-width="0.8"/>
    <line x1="300" y1="183" x2="300" y2="168" stroke-width="1.2"/><circle cx="300" cy="165" r="4" stroke-width="1"/>
    <line x1="380" y1="178" x2="380" y2="164" stroke-width="1.2"/><circle cx="380" cy="161" r="3.5" stroke-width="1"/>
    <line x1="600" y1="183" x2="600" y2="169" stroke-width="1.2"/><circle cx="600" cy="166" r="4" stroke-width="1"/>
    <line x1="640" y1="190" x2="640" y2="176" stroke-width="1.2"/><circle cx="640" cy="173" r="3.5" stroke-width="1"/>
    <path d="M 200,300 Q 450,380 700,300" stroke-width="0.8" opacity="0.25" stroke-dasharray="6,4"/>
  </svg>`,
  // Sketch 3 — Curved cultural centre with voids
  `<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" stroke="#1a1614" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="50" y1="340" x2="850" y2="340" stroke-width="1.5"/>
    <path d="M 100,340 C 100,200 200,100 300,80 C 380,65 420,120 400,200 C 385,255 350,295 340,340" stroke-width="2"/>
    <ellipse cx="270" cy="210" rx="55" ry="80" stroke-width="1.8"/>
    <path d="M 560,340 C 550,290 520,240 530,180 C 545,110 600,70 680,80 C 760,90 820,160 820,240 C 820,290 800,330 800,340" stroke-width="2"/>
    <ellipse cx="680" cy="210" rx="55" ry="85" stroke-width="1.8"/>
    <path d="M 340,140 C 380,100 440,80 500,80 C 550,80 570,100 570,140" stroke-width="2"/>
    <line x1="180" y1="340" x2="240" y2="310" stroke-width="1.2"/><line x1="240" y1="310" x2="340" y2="310" stroke-width="1"/>
    <line x1="560" y1="310" x2="660" y2="310" stroke-width="1"/><line x1="660" y1="310" x2="720" y2="340" stroke-width="1.2"/>
    <line x1="150" y1="336" x2="150" y2="319" stroke-width="1.2"/><circle cx="150" cy="316" r="4.5" stroke-width="1"/>
    <line x1="167" y1="337" x2="167" y2="321" stroke-width="1.2"/><circle cx="167" cy="318" r="4" stroke-width="1"/>
    <line x1="440" y1="337" x2="440" y2="320" stroke-width="1.2"/><circle cx="440" cy="317" r="4.5" stroke-width="1"/>
    <line x1="780" y1="335" x2="780" y2="319" stroke-width="1.2"/><circle cx="780" cy="316" r="4" stroke-width="1"/>
    <line x1="80" y1="340" x2="80" y2="280" stroke-width="1.5"/><ellipse cx="80" cy="260" rx="28" ry="22" stroke-width="1.2"/>
    <line x1="112" y1="282" x2="132" y2="262" stroke-width="0.5"/><line x1="122" y1="297" x2="145" y2="274" stroke-width="0.5"/><line x1="132" y1="312" x2="158" y2="288" stroke-width="0.5"/>
  </svg>`,
  // Sketch 4 — Cantilever contemporary house
  `<svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" stroke="#1a1614" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="50" y1="310" x2="850" y2="310" stroke-width="1.5"/>
    <rect x="200" y="230" width="300" height="80" stroke-width="1.5"/>
    <rect x="160" y="158" width="420" height="72" stroke-width="2"/>
    <polyline points="130,158 580,158 580,148 130,148" stroke-width="1.5"/>
    <line x1="220" y1="158" x2="220" y2="230" stroke-width="1.2"/><line x1="300" y1="158" x2="300" y2="230" stroke-width="1.2"/><line x1="400" y1="158" x2="400" y2="230" stroke-width="1.2"/><line x1="480" y1="158" x2="480" y2="230" stroke-width="1.2"/>
    <line x1="175" y1="160" x2="175" y2="228" stroke-width="0.7"/><line x1="195" y1="160" x2="195" y2="228" stroke-width="0.7"/><line x1="240" y1="160" x2="240" y2="228" stroke-width="0.7"/><line x1="260" y1="160" x2="260" y2="228" stroke-width="0.7"/><line x1="320" y1="160" x2="320" y2="228" stroke-width="0.7"/><line x1="345" y1="160" x2="345" y2="228" stroke-width="0.7"/><line x1="420" y1="160" x2="420" y2="228" stroke-width="0.7"/><line x1="445" y1="160" x2="445" y2="228" stroke-width="0.7"/><line x1="500" y1="160" x2="500" y2="228" stroke-width="0.7"/><line x1="525" y1="160" x2="525" y2="228" stroke-width="0.7"/><line x1="550" y1="160" x2="550" y2="228" stroke-width="0.7"/>
    <rect x="320" y="258" width="45" height="52" stroke-width="1"/>
    <rect x="600" y="270" width="180" height="40" stroke-width="1.2"/>
    <line x1="608" y1="283" x2="772" y2="283" stroke-width="0.6" stroke-dasharray="6,3"/><line x1="608" y1="293" x2="772" y2="293" stroke-width="0.6" stroke-dasharray="8,4"/>
    <line x1="810" y1="310" x2="810" y2="242" stroke-width="1.8"/>
    <path d="M 810,242 C 810,232 840,217 848,212" stroke-width="1.2"/><path d="M 810,242 C 810,230 778,216 770,210" stroke-width="1.2"/>
    <line x1="136" y1="306" x2="136" y2="291" stroke-width="1.2"/><circle cx="136" cy="288" r="4" stroke-width="1"/>
    <line x1="150" y1="307" x2="150" y2="293" stroke-width="1.2"/><circle cx="150" cy="290" r="3.5" stroke-width="1"/>
  </svg>`,
  // Sketch 5 — Undulating roof pavilion
  `<svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" stroke="#1a1614" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="50" y1="310" x2="850" y2="310" stroke-width="1.5"/>
    <path d="M 50,310 C 150,310 200,270 300,265 C 380,260 420,275 500,310" stroke-width="1.2"/>
    <path d="M 100,310 C 120,280 150,230 200,200 C 250,170 300,160 370,155 C 440,150 500,165 560,180 C 620,195 680,225 720,270 C 740,290 750,305 760,310" stroke-width="2.5"/>
    <path d="M 130,310 C 155,275 185,235 235,210 C 285,185 335,178 400,175 C 465,172 520,185 580,200 C 635,215 685,248 710,285 C 720,298 728,308 735,310" stroke-width="1.2" stroke-dasharray="5,3"/>
    <line x1="200" y1="200" x2="210" y2="310" stroke-width="1"/><line x1="300" y1="168" x2="305" y2="310" stroke-width="1"/><line x1="400" y1="158" x2="400" y2="310" stroke-width="1"/><line x1="500" y1="165" x2="498" y2="310" stroke-width="1"/><line x1="600" y1="185" x2="595" y2="310" stroke-width="1"/><line x1="700" y1="258" x2="692" y2="310" stroke-width="1"/>
    <ellipse cx="260" cy="255" rx="35" ry="45" stroke-width="1.2"/>
    <ellipse cx="450" cy="235" rx="40" ry="55" stroke-width="1.2"/>
    <ellipse cx="640" cy="255" rx="30" ry="40" stroke-width="1.2"/>
    <line x1="820" y1="310" x2="820" y2="230" stroke-width="1.5"/><ellipse cx="820" cy="215" rx="30" ry="24" stroke-width="1.2"/>
    <line x1="80" y1="307" x2="80" y2="292" stroke-width="1.2"/><circle cx="80" cy="289" r="4.5" stroke-width="1"/>
    <line x1="97" y1="308" x2="97" y2="294" stroke-width="1.2"/><circle cx="97" cy="291" r="4" stroke-width="1"/>
    <line x1="780" y1="307" x2="780" y2="293" stroke-width="1.2"/><circle cx="780" cy="290" r="4" stroke-width="1"/>
    <line x1="156" y1="282" x2="176" y2="266" stroke-width="0.5"/><line x1="166" y1="294" x2="189" y2="277" stroke-width="0.5"/><line x1="176" y1="306" x2="201" y2="289" stroke-width="0.5"/>
  </svg>`
];

const HERO_TITLES = [
  'Recognizing the need is the primary condition for <em>architects and planners</em>.',
  'Architecture begins where <em>engineering ends</em>.',
  'We shape our buildings; thereafter <em>they shape us</em>.',
  'Design is not just what it looks like — design is <em>how it works</em>.',
  'Every great design begins with an even <em>better story</em>.'
];

function initSketchSlideshow() {
  const container = document.getElementById('hero-image');
  const dotsWrap  = document.getElementById('sketch-dots');
  if (!container) return;

  // Build slides
  HERO_SKETCHES.forEach((svg, i) => {
    const slide = document.createElement('div');
    slide.className = 'sketch-slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = svg;
    container.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'sketch-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    if (dotsWrap) dotsWrap.appendChild(dot);
  });

  let cur = 0;
  const slides = container.querySelectorAll('.sketch-slide');
  const dots   = dotsWrap ? dotsWrap.querySelectorAll('.sketch-dot') : [];

  function goTo(n) {
    slides[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = (n + HERO_SKETCHES.length) % HERO_SKETCHES.length;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }

  setInterval(() => goTo(cur + 1), 5000);
}

function initHeroTitleRotation() {
  const el = document.getElementById('hero-title');
  if (!el) return;
  let idx = 1; // start from 2nd title (first is already shown in HTML)
  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.innerHTML = HERO_TITLES[idx % HERO_TITLES.length];
      el.style.opacity = '1';
      idx++;
    }, 700);
  }, 6000);
}

/* Logo width match via JS */
function matchLogoWidth() {
  const nameEl = document.querySelector('.logo-name');
  const subEl  = document.querySelector('.logo-sub');
  if (!nameEl || !subEl) return;
  const nameWidth = nameEl.getBoundingClientRect().width;
  if (nameWidth > 0) {
    subEl.style.letterSpacing = 'normal';
    const subBase = subEl.getBoundingClientRect().width;
    const chars = subEl.textContent.trim().length;
    const gaps = chars - 1;
    if (gaps > 0) {
      const extra = (nameWidth - subBase) / gaps;
      subEl.style.letterSpacing = extra + 'px';
    }
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  await loadAllData();
  if (!CONFIG) return;

  injectMeta();
  injectNav();
  injectFooter();
  injectFloatingButtons();
  injectConsultationModal();

  renderHome();
  injectQuickServices();
  renderProjectDetail();
  renderServices();
  renderAwards();
  renderContact();

  const category = document.body.dataset.category;
  if (category) renderCategory(category);

  requestAnimationFrame(() => {
    initScrollReveal();
    initCounters();
    initSketchSlideshow();
    initHeroTitleRotation();
    matchLogoWidth();
    // Retry after fonts fully load
    setTimeout(matchLogoWidth, 500);
  });
});
