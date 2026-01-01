// scripts.js - Interaction logic: smooth scroll, dark mode, resume download, small alerts, reveal on scroll

// Wait for DOM
document.addEventListener('DOMContentLoaded', function(){
  // Fill current year in footer
  const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(mobileBtn && mobileMenu){
    mobileBtn.addEventListener('click', ()=>{
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.setAttribute('aria-hidden', String(expanded));
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a.nav-link').forEach(link=>{
    link.addEventListener('click', (e)=>{
      // Allow anchor behavior for same page but use smooth scroll
      e.preventDefault();
      const href = link.getAttribute('href');
      if(!href || href.charAt(0) !== '#') return;
      const target = document.querySelector(href);
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu if open
        if(mobileMenu && mobileBtn){ mobileBtn.setAttribute('aria-expanded','false'); mobileMenu.setAttribute('aria-hidden','true'); }
      }
    });
  });

  // Dark mode toggle
  const darkToggle = document.getElementById('darkToggle');
  const body = document.body;
  const saved = localStorage.getItem('darkMode');
  if(saved === 'true'){ body.classList.add('dark'); darkToggle.setAttribute('aria-pressed','true'); }
  darkToggle && darkToggle.addEventListener('click', ()=>{
    const isDark = body.classList.toggle('dark');
    darkToggle.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem('darkMode', String(isDark));
  });

  // Resume download (generates a simple text-based resume file and triggers download)
  const resumeBtn = document.getElementById('downloadResume');
  if(resumeBtn){
    resumeBtn.addEventListener('click', ()=>{
      const content = `M.S.F SAHRA\nBiomedical Technology Student\nUniversity: Gampaha Wickramarachchi University of Indigenous Medicine\nEmail: msf.sahra@example.com\nLocation: Sri Lanka\nSkills: Biomedical instrumentation, lab techniques, data analysis, motivational speaker`;
      const blob = new Blob([content], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'M_S_F_SAHRA_Resume.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      alert('Resume downloaded (sample text file). Replace with your real resume file when ready.');
    });
  }

  // Contact button alert
  const contactBtn = document.getElementById('contactBtn');
  contactBtn && contactBtn.addEventListener('click', ()=>{
    alert('Thanks for reaching out! Please send an email to msf.sahra@example.com and I will reply as soon as possible.');
  });

  // Small project alert used by project cards
  window.projectAlert = function(name){ alert(name + ' is a placeholder project — replace with details when ready.'); }

  // Reveal on scroll (intersection observer)
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // Keyboard accessibility: close mobile menu on Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && mobileMenu){ mobileBtn && mobileBtn.setAttribute('aria-expanded','false'); mobileMenu.setAttribute('aria-hidden','true'); }
  });
});
