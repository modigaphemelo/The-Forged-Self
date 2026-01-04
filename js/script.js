document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.getElementById('sidenav');
    const sidenavToggle = document.getElementById('sidenavToggle');
    const progressBar = document.querySelector('.reading-progress');
    const progressFill = document.querySelector('.reading-progress-fill');

    // Mobile Menu
    if (sidenavToggle && sidenav) {
        const updateMenuState = (isOpen) => {
            if (isOpen) {
                sidenav.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                sidenav.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            const icon = sidenavToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-times', isOpen);
            }
            
            sidenavToggle.setAttribute('aria-expanded', isOpen);
        };

        sidenavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCurrentlyOpen = sidenav.classList.contains('active');
            updateMenuState(!isCurrentlyOpen);
        });

        if (window.innerWidth <= 1024) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    updateMenuState(false);
                });
            });
        }
    }

    // Reading Progress Bar
    if (progressBar && progressFill) {
        let animationFrameId = null;
        let lastScrollY = 0;
        
        const updateProgress = () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            if (Math.abs(scrollPosition - lastScrollY) > 5 || scrollPosition === 0 || scrollPosition >= maxScroll) {
                const progress = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;
                const clampedProgress = Math.min(100, Math.max(0, progress));
                
                progressFill.style.width = `${clampedProgress}%`;
                
                if (scrollPosition > 100) {
                    progressBar.style.opacity = '1';
                    progressBar.style.visibility = 'visible';
                } else {
                    progressBar.style.opacity = '0';
                    progressBar.style.visibility = 'hidden';
                }
                
                lastScrollY = scrollPosition;
            }
            
            animationFrameId = null;
        };

        const handleScroll = () => {
            if (!animationFrameId) {
                animationFrameId = window.requestAnimationFrame(updateProgress);
            }
        };

        updateProgress();
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
    }

    // Escape Key to Close Menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidenav?.classList.contains('active')) {
            const updateMenuState = (isOpen) => {
                if (isOpen) {
                    sidenav.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    sidenav.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                const icon = sidenavToggle?.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars', !isOpen);
                    icon.classList.toggle('fa-times', isOpen);
                }
            };
            updateMenuState(false);
        }
    });

    // Close Menu When Clicking Outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && sidenav?.classList.contains('active')) {
            const isClickInsideSidenav = sidenav.contains(e.target);
            const isClickOnToggle = sidenavToggle?.contains(e.target);
            
            if (!isClickInsideSidenav && !isClickOnToggle) {
                const updateMenuState = (isOpen) => {
                    if (isOpen) {
                        sidenav.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    } else {
                        sidenav.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    const icon = sidenavToggle?.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-bars', !isOpen);
                        icon.classList.toggle('fa-times', isOpen);
                    }
                };
                updateMenuState(false);
            }
        }
    });

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent, #00a8ff);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 168, 255, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    const toggleScrollTop = () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
    };
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop);

    // Add CSS for button hover effect
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn:hover {
            background: var(--accent-light, #80d4ff);
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(0, 168, 255, 0.4);
        }
        
        .scroll-top-btn:active {
            transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
            .scroll-top-btn {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 1.1rem;
            }
        }
        
        @media (max-width: 480px) {
            .scroll-top-btn {
                bottom: 15px;
                right: 15px;
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});
