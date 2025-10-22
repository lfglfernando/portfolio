/*================ toggle icon navbar =================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };
}

/*================ scroll sections active link & sticky =================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => links.classList.remove('active'));
      const activeLink = document.querySelector(`header nav a[href*=${id}]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  // sticky header
  let header = document.querySelector('header');
  if (header) header.classList.toggle('sticky', window.scrollY > 100);

  // close mobile menu on scroll
  if (menuIcon && navbar) {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  }
};

/*================ scroll reveal =================*/
if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 1200,   // un poco más rápido
    delay: 120        // un poco más rápido
  });

  ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
  ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
  ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
  ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
}

/*================ typed js =================*/
if (typeof Typed !== 'undefined') {
  const typed = new Typed('.multiple-text', {
    strings: ['Software Engineer', 'Web Developer', 'Software Test Engineer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });
}

/*================ footer meta =================*/
const year = new Date().getFullYear();
const yearEl = document.getElementById('currentyear');
if (yearEl) yearEl.textContent = year;

const lastModified = document.lastModified;
const lastModEl = document.getElementById('lastModified');
if (lastModEl) lastModEl.textContent = `Last Modification: ${lastModified}`;

/* ============================================================
   CERTIFICATES & COURSES
   ============================================================ */

/* ---------- 1) Data sets ---------- */

// Web & Computer Programming (existing)
const wcpCourses = [
  { subject: 'CSE', number: 110, className: 'Introduction to Programming', credits: 2, certificate: 'WCP', description: 'Intro to programming fundamentals: variables, decisions, loops, arrays, I/O.', technology: ['Python'], completed: true },
  { subject: 'WDD', number: 130, className: 'Web Fundamentals', credits: 2, certificate: 'WCP', description: 'Intro to web careers and basic site building.', technology: ['HTML','CSS'], completed: true },
  { subject: 'CSE', number: 111, className: 'Programming with Functions', credits: 2, certificate: 'WCP', description: 'Functions: write, call, debug, test; handle errors.', technology: ['Python'], completed: true },
  { subject: 'CSE', number: 210, className: 'Programming with Classes', credits: 2, certificate: 'WCP', description: 'OOP concepts: classes/objects, encapsulation, inheritance, polymorphism.', technology: ['C#'], completed: true },
  { subject: 'WDD', number: 131, className: 'Dynamic Web Fundamentals', credits: 2, certificate: 'WCP', description: 'JS for events, dynamic content, responsive UX.', technology: ['HTML','CSS','JavaScript'], completed: true },
  { subject: 'WDD', number: 231, className: 'Frontend Web Development I', credits: 2, certificate: 'WCP', description: 'UX, accessibility, performance, basic API usage.', technology: ['HTML','CSS','JavaScript'], completed: true }
];

// Web Development Certificate (upper division)
const wdCourses = [
  { subject: 'CSE', number: 340, className: 'Web Backend Development', credits: 3, certificate: 'WD', description: 'Server-side, APIs, auth, data access.', technology: ['Backend','APIs'], completed: true },
  { subject: 'CSE', number: 341, className: 'Web Services', credits: 3, certificate: 'WD', description: 'HTTP, REST, integration patterns.', technology: ['HTTP','REST'], completed: true },
  { subject: 'WDD', number: 330, className: 'Web Frontend Development II', credits: 3, certificate: 'WD', description: 'Advanced frontend techniques.', technology: ['Frontend'], completed: true },
  { subject: 'WDD', number: 430, className: 'Web Full-Stack Development', credits: 3, certificate: 'WD', description: 'Full-stack integration and deployment.', technology: ['Full-Stack'], completed: true }
];

// Associate of Applied Science (Software Development)
const aasCourses = [
  ...wcpCourses,
  { subject: 'CSE', number: 212, className: 'Programming with Data Structures', credits: 2, certificate: 'AAS', description: 'Lists, stacks, queues, trees, maps.', technology: ['Data Structures'], completed: true },
  ...wdCourses,
  { subject: 'WRIT', number: 101, className: 'Writing in Professional Contexts', credits: 3, certificate: 'AAS', area: 'GEN', description: 'Professional writing skills.', technology: [], completed: true },
  { subject: 'BUS', number: 301, className: 'Advanced Writing in Professional Contexts', credits: 3, certificate: 'AAS', area: 'GEN', description: 'Advanced business communication.', technology: [], completed: true },
  { subject: 'MATH', number: '108X', className: 'Math for the Real World', credits: 3, certificate: 'AAS', area: 'GEN', description: 'Quantitative reasoning.', technology: [], completed: true },
  { subject: 'GS', number: 170, className: 'Career Development', credits: 1, certificate: 'AAS', area: 'GEN', description: 'Career planning and tools.', technology: [], completed: true }
];

// Backwards compatibility with your previous code (uses `courses`)
const courses = wcpCourses;

/* ---------- 2) Rendering helpers ---------- */

function createClassCard(course, containerSel = '.services-container') {
  const container = document.querySelector(containerSel);
  if (!container) return;

  const card = document.createElement('div');
  card.className = 'services-box';
  card.innerHTML = `
    <h3>${course.subject} ${course.number}</h3>
    <p>${course.className}</p>
    <p><strong>${course.credits}</strong> credits</p>
  `;

  card.addEventListener('click', () => displayCourseDetailsIn(containerSel, course));
  container.appendChild(card);
}

function displayCourseDetailsIn(containerSel, course) {
  let dialogSel = 'dialog.course-details';
  if (containerSel.includes('wd-container')) dialogSel = 'dialog.wd-details';
  if (containerSel.includes('aas-container')) dialogSel = 'dialog.aas-details';

  const dlg = document.querySelector(dialogSel);
  if (!dlg) return;

  dlg.innerHTML = `
    <button id="closeModal">❌</button>
    <h1>${course.subject} ${course.number}</h1>
    <h3>${course.className}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    ${course.certificate ? `<p><strong>Certificate:</strong> ${course.certificate}</p>` : ''}
    ${course.description ? `<p><strong>Description:</strong> ${course.description}</p>` : ''}
    ${course.technology && course.technology.length ? `<p><strong>Technology:</strong> ${course.technology.join(', ')}</p>` : ''}
  `;
  dlg.showModal();

  dlg.querySelector('#closeModal').addEventListener('click', () => dlg.close());
  const handleBackdrop = (e) => { if (e.target === dlg) dlg.close(); };
  dlg.addEventListener('click', handleBackdrop, { once: true });
}

function renderCertificateSection(data, containerSel, creditSel) {
  const container = document.querySelector(containerSel);
  if (!container) return;
  container.innerHTML = '';
  data.forEach((c) => createClassCard(c, containerSel));
  const total = data.reduce((t, c) => t + (Number(c.credits) || 0), 0);
  const creditEl = document.querySelector(creditSel);
  if (creditEl) creditEl.textContent = total;
}

const filtersMap = {
  all: (arr) => arr,
  cse: (arr) => arr.filter((c) => String(c.subject).toUpperCase().startsWith('CSE')),
  wdd: (arr) => arr.filter((c) => String(c.subject).toUpperCase().startsWith('WDD')),
  gen: (arr) => arr.filter((c) => (c.area || '').toUpperCase() === 'GEN')
};

function bindFilter(containerSel, filterContainerSel, creditSel, data) {
  const filterBar = document.querySelector(filterContainerSel);
  if (!filterBar) return;

  filterBar.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    const key = event.target.textContent.trim().toLowerCase();
    const result = (filtersMap[key] || filtersMap.all)(data);

    const container = document.querySelector(containerSel);
    if (!container) return;
    container.innerHTML = '';
    result.forEach((c) => createClassCard(c, containerSel));

    const total = result.reduce((t, c) => t + (Number(c.credits) || 0), 0);
    const creditEl = document.querySelector(creditSel);
    if (creditEl) creditEl.textContent = total;
  });
}

/* ---------- 3) INITIAL RENDERING ---------- */

// A) WCP
renderCertificateSection(wcpCourses, '.services-container', '#creditCount');

// Keep legacy filter bar for first section
const firstFilterBar = document.querySelector('.filter-classes');
if (firstFilterBar) {
  firstFilterBar.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    const filter = event.target.textContent.toLowerCase();
    const containerSel = '.services-container';
    const container = document.querySelector(containerSel);
    if (!container) return;
    container.innerHTML = '';

    let filtered = wcpCourses;
    if (filter === 'cse') filtered = wcpCourses.filter((c) => c.subject === 'CSE');
    if (filter === 'wdd') filtered = wcpCourses.filter((c) => c.subject === 'WDD');

    filtered.forEach((c) => createClassCard(c, containerSel));

    const total = filtered.reduce((t, c) => t + (Number(c.credits) || 0), 0);
    const creditEl = document.getElementById('creditCount');
    if (creditEl) creditEl.textContent = total;
  });
}

// B) WD
renderCertificateSection(wdCourses, '.wd-container', '#wdCreditCount');
bindFilter('.wd-container', '.wd-filter', '#wdCreditCount', wdCourses);

// C) AAS
renderCertificateSection(aasCourses, '.aas-container', '#aasCreditCount');
bindFilter('.aas-container', '.aas-filter', '#aasCreditCount', aasCourses);
