const $ = (s, c=document)=>c.querySelector(s);
const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

const header = $('.site-header');
const offsetTop = el => el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 6;
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href').slice(1);
    const target=document.getElementById(id);
    if(!target) return;
    e.preventDefault();
    window.scrollTo({ top: offsetTop(target), behavior: 'smooth' });
  });
});


const toggleBtn = $('.menu-toggle');
const nav = toggleBtn ? document.getElementById(toggleBtn.getAttribute('aria-controls')) : null;
if(toggleBtn && nav){
  nav.hidden = true;
  toggleBtn.addEventListener('click', ()=>{
    const open = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
    document.body.classList.toggle('no-scroll', !open);
  });
  document.addEventListener('click', (e)=>{
    if(!nav.hidden && !nav.contains(e.target) && e.target!==toggleBtn){
      toggleBtn.click();
    }
  });
}

const reveals = $$('.reveal');
if('IntersectionObserver' in window && reveals.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -5% 0px' });
  reveals.forEach(el=>io.observe(el));
}


{
  const musicScroll = document.querySelector('.music-scroll');

  musicScroll.addEventListener('wheel', function (e) {
    // if we can still scroll inside the list, prevent page scroll
    const atTop = musicScroll.scrollTop === 0;
    const atBottom = musicScroll.scrollHeight - musicScroll.clientHeight === musicScroll.scrollTop;

    if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
      e.stopPropagation();
      // let the list handle scrolling only
    }
  }, { passive: true });
}


//WhatsApp Chat Widget

// Add this at the end of your script2.js file

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Submission*%0A%0A` +
                               `*Name:* ${name}%0A` +
                               `*Email:* ${email}%0A` +
                               `*Message:* ${message}`;
        
        // Your WhatsApp number (include country code without + or spaces)
        const phoneNumber = '919220037676'; 
        
        // Open WhatsApp in new tab
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Form will still submit to Web3Forms for email
    });
}


// THEME TOGGLE (dark / light)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.classList.add('light-theme');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light-theme');
    themeToggle.querySelector('.theme-icon').textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (!scrollTopBtn) return;
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
