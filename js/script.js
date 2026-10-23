/**
 * Biodata Mahasiswa - Interactive JavaScript
 * Fitur:
 * 1. Tombol "Sapa Saya" (Salam adaptif waktu & modal dialog)
 * 2. Navigasi Responsif Mobile Menu
 * 3. Animasi Skill Progress Bar (IntersectionObserver)
 * 4. Tombol Floating Back To Top
 */

document.addEventListener('DOMContentLoaded', () => {
  // Pastikan mode selalu bersih di Light Mode (bersihkan cache tema lama jika ada)
  document.documentElement.classList.remove('dark');
  if (localStorage.getItem('theme')) {
    localStorage.removeItem('theme');
  }

  // ==========================================
  // 1. Fitur Tombol "Sapa Saya" (Adaptive Greeting)
  // ==========================================
  const btnGreet = document.getElementById('btn-greet');
  const modalGreet = document.getElementById('greeting-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOk = document.getElementById('modal-ok-btn');
  const greetingTitle = document.getElementById('greeting-title');
  const greetingMessage = document.getElementById('greeting-message');
  const greetingTime = document.getElementById('greeting-time');

  function getGreetingData() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${String(hours).padStart(2, '0')}:${minutes} WIB`;

    let salam = '';
    let icon = '';
    let pesan = '';

    if (hours >= 4 && hours < 11) {
      salam = 'Selamat Pagi!';
      icon = '🌅';
      pesan = 'Semangat memulai hari dengan energi positif dan produktivitas tinggi!';
    } else if (hours >= 11 && hours < 15) {
      salam = 'Selamat Siang!';
      icon = '☀️';
      pesan = 'Jangan lupa istirahat sejenak, makan siang, dan tetap terhidrasi!';
    } else if (hours >= 15 && hours < 18) {
      salam = 'Selamat Sore!';
      icon = '🌇';
      pesan = 'Waktu yang tepat untuk mereview kegiatan hari ini dan bersantai.';
    } else {
      salam = 'Selamat Malam!';
      icon = '🌙';
      pesan = 'Terima kasih sudah mampir berkunjung. Selamat beristirahat atau berkarya!';
    }

    return { salam, icon, pesan, time: currentTimeStr };
  }

  function showGreetingModal() {
    if (!modalGreet) return;
    const { salam, icon, pesan, time } = getGreetingData();

    if (greetingTitle) greetingTitle.innerHTML = `${icon} ${salam}`;
    if (greetingMessage) greetingMessage.textContent = pesan;
    if (greetingTime) greetingTime.textContent = `Waktu saat ini: ${time}`;

    modalGreet.classList.add('active');
    document.body.style.overflow = 'hidden'; // Mencegah scrolling latar belakang
  }

  function closeGreetingModal() {
    if (!modalGreet) return;
    modalGreet.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnGreet) btnGreet.addEventListener('click', showGreetingModal);
  if (modalClose) modalClose.addEventListener('click', closeGreetingModal);
  if (modalOk) modalOk.addEventListener('click', closeGreetingModal);

  // Tutup modal jika klik di luar box
  if (modalGreet) {
    modalGreet.addEventListener('click', (e) => {
      if (e.target === modalGreet) closeGreetingModal();
    });
  }

  // Tutup modal dengan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalGreet && modalGreet.classList.contains('active')) {
      closeGreetingModal();
    }
  });


  // ==========================================
  // 2. Navigasi Responsif Menu Mobile
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }


  // ==========================================
  // 3. Animasi Skill Progress Bar On Load / Scroll
  // ==========================================
  const progressBars = document.querySelectorAll('.skill-bar-fill');
  let hasAnimatedSkills = false;

  function triggerSkillAnimation() {
    if (hasAnimatedSkills) return;
    progressBars.forEach((bar) => {
      const targetPercent = bar.getAttribute('data-percent') || '0';
      bar.style.width = `${targetPercent}%`;
    });
    hasAnimatedSkills = true;
  }

  if ('IntersectionObserver' in window) {
    const skillsSection = document.getElementById('keahlian');
    if (skillsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerSkillAnimation();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(skillsSection);
    } else {
      setTimeout(triggerSkillAnimation, 300);
    }
  } else {
    setTimeout(triggerSkillAnimation, 300);
  }


  // ==========================================
  // 4. Tombol Floating Back To Top
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
