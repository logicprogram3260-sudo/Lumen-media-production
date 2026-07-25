/**
 * Trayil Photography - Main JS Script
 * Features: Sticky navbar scroll listener, Scrollspy link highlighters, Portfolio category filtering, Lightbox modal view, Booking form validation
 */

document.addEventListener('DOMContentLoaded', function () {
    // -------------------------------------------------------------
    // 1. Sticky Navbar & Responsive Dropdown Collapse
    // -------------------------------------------------------------
    const navbar = document.querySelector('.navbar-editorial');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check on load
    
    // Auto-close responsive mobile navbar when link is clicked
    const navLinks = document.querySelectorAll('.navbar-editorial .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 2. Custom ScrollSpy (Navbar Active Highlights)
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollPosition = window.pageYOffset + 160; // offset navbar height + extra padding
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.navbar-editorial .nav-link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial check

    // -------------------------------------------------------------
    // 3. Interactive Portfolio Gallery Filtering
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    // Show item with transition
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide item with transition
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // matches transition time
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 4. Lightbox Modal Integration
    // -------------------------------------------------------------
    const lightboxModalEl = document.getElementById('lightboxModal');
    if (lightboxModalEl) {
        const lightboxImg = lightboxModalEl.querySelector('.lightbox-img');
        const lightboxTitle = lightboxModalEl.querySelector('.lightbox-title');
        const lightboxLocation = lightboxModalEl.querySelector('.lightbox-loc');
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        galleryCards.forEach(card => {
            card.addEventListener('click', function () {
                const img = this.querySelector('.gallery-image');
                const title = this.querySelector('.gallery-title').innerText;
                const loc = this.querySelector('.gallery-location').innerText;
                
                // Populate Lightbox Modal
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || title;
                lightboxTitle.innerText = title;
                lightboxLocation.innerText = loc;
                
                // Show Bootstrap Modal
                const modal = new bootstrap.Modal(lightboxModalEl);
                modal.show();
            });
        });
    }

    // -------------------------------------------------------------
    // 5. Booking Form Submission & Validation
    // -------------------------------------------------------------
    const bookingForm = document.getElementById('bookingForm');
    const successAlert = document.getElementById('bookingSuccess');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            // Validate form using HTML5 constraint validation api
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            
            // Form is valid - handle visual loading & submit
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Visual loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending Inquiry...';
            
            // Simulate API request delay
            setTimeout(() => {
                // Show success banner
                if (successAlert) {
                    successAlert.style.display = 'block';
                    successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Reset form fields
                this.reset();
                this.classList.remove('was-validated');
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Auto-hide success message after 8 seconds
                setTimeout(() => {
                    if (successAlert) {
                        successAlert.style.display = 'none';
                    }
                }, 8000);
                
            }, 1800);
        });
    }

});


