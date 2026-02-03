// Mobile Menu Toggle with Scroll Lock
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const btnValuation = document.querySelector('.btn-valuation');
    const body = document.body;
    let scrollPosition = 0;
    
    function openMenu() {
        // Store scroll position before locking
        scrollPosition = window.pageYOffset;
        
        mobileMenuToggle.classList.add('active');
        navLinks.classList.add('active');
        if (btnValuation) {
            btnValuation.classList.add('active');
        }
        
        // Lock body scroll
        body.classList.add('menu-open');
        body.style.top = `-${scrollPosition}px`;
    }
    
    function closeMenu() {
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (btnValuation) {
            btnValuation.classList.remove('active');
        }
        
        // Unlock body scroll and restore position
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on a nav link
        const navLinkItems = document.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking on valuation button
        if (btnValuation) {
            btnValuation.addEventListener('click', () => {
                closeMenu();
            });
        }

        // Close menu on window resize (if switching to desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    const upArrow = '<svg viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.24264 1.8856L0.942813 5.18547L0 4.24267L4.24264 0L8.48531 4.24267L7.54251 5.18547L4.24264 1.8856Z" fill="white"/></svg>';
    const downArrow = '<svg viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.24264 4.11437L7.54251 0.814499L8.48531 1.7573L4.24264 5.99997L0 1.7573L0.942813 0.814499L4.24264 4.11437Z" fill="#2a363a"/></svg>';
    
    // Initialize arrows on page load
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        if (toggle) {
            if (item.classList.contains('active')) {
                toggle.innerHTML = upArrow;
            } else {
                toggle.innerHTML = downArrow;
            }
        }
    });
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const faqToggle = i.querySelector('.faq-toggle');
                    if (faqToggle) {
                        faqToggle.innerHTML = downArrow;
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    if (toggle) {
                        toggle.innerHTML = upArrow;
                    }
                }
            });
        }
    });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Property Search Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Homepage Filter - Redirect to Listings with query params
    const homeSearchBtn = document.getElementById('home-search-btn');
    const homeFilterPayment = document.getElementById('home-filter-payment');
    const homeFilterLocation = document.getElementById('home-filter-location');
    const homeFilterType = document.getElementById('home-filter-type');
    const homeFilterBedrooms = document.getElementById('home-filter-bedrooms');
    const homeFilterPrice = document.getElementById('home-filter-price');
    
    if (homeSearchBtn) {
        homeSearchBtn.addEventListener('click', function() {
            const params = new URLSearchParams();
            
            if (homeFilterPayment && homeFilterPayment.value !== 'all') {
                params.set('payment', homeFilterPayment.value);
            }
            if (homeFilterLocation && homeFilterLocation.value !== 'all') {
                params.set('location', homeFilterLocation.value);
            }
            if (homeFilterType && homeFilterType.value !== 'all') {
                params.set('type', homeFilterType.value);
            }
            if (homeFilterBedrooms && homeFilterBedrooms.value !== 'all') {
                params.set('bedrooms', homeFilterBedrooms.value);
            }
            if (homeFilterPrice && homeFilterPrice.value !== 'all') {
                params.set('price', homeFilterPrice.value);
            }
            
            const queryString = params.toString();
            const url = queryString ? `listings.html?${queryString}` : 'listings.html';
            window.location.href = url;
        });
    }
    
    // Listings Page Filter
    const searchBtn = document.getElementById('search-btn');
    const filterPayment = document.getElementById('filter-payment');
    const filterLocation = document.getElementById('filter-location');
    const filterType = document.getElementById('filter-type');
    const filterBedrooms = document.getElementById('filter-bedrooms');
    const filterPrice = document.getElementById('filter-price');
    const filterStatus = document.getElementById('filter-status');
    const propertyCards = document.querySelectorAll('.property-listing-card');
    const noResults = document.getElementById('no-results');
    
    // Only run listings filter logic on listings page
    if (!searchBtn || !propertyCards.length) return;
    
    // Read URL parameters and set filter values
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('payment') && filterPayment) {
        filterPayment.value = urlParams.get('payment');
    }
    if (urlParams.has('location') && filterLocation) {
        filterLocation.value = urlParams.get('location');
    }
    if (urlParams.has('type') && filterType) {
        filterType.value = urlParams.get('type');
    }
    if (urlParams.has('bedrooms') && filterBedrooms) {
        filterBedrooms.value = urlParams.get('bedrooms');
    }
    if (urlParams.has('price') && filterPrice) {
        filterPrice.value = urlParams.get('price');
    }
    if (urlParams.has('status') && filterStatus) {
        filterStatus.value = urlParams.get('status');
    }
    
    function filterProperties() {
        const payment = filterPayment ? filterPayment.value : 'all';
        const location = filterLocation ? filterLocation.value : 'all';
        const type = filterType ? filterType.value : 'all';
        const bedrooms = filterBedrooms ? filterBedrooms.value : 'all';
        const maxPrice = filterPrice ? filterPrice.value : 'all';
        const status = filterStatus ? filterStatus.value : 'all';
        
        let visibleCount = 0;
        
        propertyCards.forEach(card => {
            const cardPayment = card.dataset.payment;
            const cardLocation = card.dataset.location;
            const cardType = card.dataset.type;
            const cardBedrooms = parseInt(card.dataset.bedrooms);
            const cardPrice = parseInt(card.dataset.price);
            const cardStatus = card.dataset.status;
            
            let show = true;
            
            // Payment filter
            if (payment !== 'all' && cardPayment !== payment) {
                show = false;
            }
            
            // Location filter
            if (location !== 'all' && cardLocation !== location) {
                show = false;
            }
            
            // Property Type filter
            if (type !== 'all' && cardType !== type) {
                show = false;
            }
            
            // Bedrooms filter (minimum bedrooms)
            if (bedrooms !== 'all' && cardBedrooms < parseInt(bedrooms)) {
                show = false;
            }
            
            // Price filter (maximum price)
            if (maxPrice !== 'all' && cardPrice > parseInt(maxPrice)) {
                show = false;
            }
            
            // Status filter (available/sold)
            if (status !== 'all' && cardStatus !== status) {
                show = false;
            }
            
            // Show or hide card
            if (show) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }
    
    // Apply filters if URL has parameters (from homepage search)
    if (window.location.search) {
        filterProperties();
    }
    
    // Search button click
    searchBtn.addEventListener('click', filterProperties);
    
    // Also filter on dropdown change
    const filters = [filterPayment, filterLocation, filterType, filterBedrooms, filterPrice, filterStatus];
    filters.forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterProperties);
        }
    });
});

// School Checker Form
document.addEventListener('DOMContentLoaded', function() {
    const schoolSearchForm = document.getElementById('schoolSearchForm');
    const postcodeInput = document.getElementById('postcodeInput');
    const schoolSearchMsg = document.getElementById('schoolSearchMsg');
    
    if (schoolSearchForm) {
        schoolSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const postcode = postcodeInput.value.trim();
            if (!postcode) return;
            
            // UK Government school search URL
            const url = `https://get-information-schools.service.gov.uk/Search?SearchType=Location&LocationSearchModel.Text=${encodeURIComponent(postcode)}`;
            
            // Try to open in new window
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            
            // Handle popup blocked scenario
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                if (schoolSearchMsg) {
                    schoolSearchMsg.innerHTML = `Popup was blocked. <a href="${url}" target="_blank" rel="noopener noreferrer">Click here to search for schools</a>`;
                    schoolSearchMsg.classList.add('visible');
                }
            }
        });
    }
});

// Valuation Modal Popup
document.addEventListener('DOMContentLoaded', function() {
    const valuationModal = document.getElementById('valuationModal');
    const valuationBtns = document.querySelectorAll('.btn-valuation');
    const modalClose = document.querySelector('.valuation-modal-close');
    const modalOverlay = document.querySelector('.valuation-modal-overlay');
    const valuationForm = document.getElementById('valuationForm');
    
    // Open modal when clicking Book a Valuation button
    valuationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (valuationModal) {
                valuationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functions
    function closeModal() {
        if (valuationModal) {
            valuationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Close on X button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && valuationModal && valuationModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle valuation form submission
    if (valuationForm) {
        valuationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(valuationForm);
            const submitBtn = valuationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            fetch('https://formsubmit.co/ajax/navjot.singh@5rv.digital', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you! Your valuation request has been submitted. We will contact you soon.');
                    closeModal();
                    valuationForm.reset();
                } else {
                    alert('There was an error submitting the form. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Newsletter Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('.newsletter-input');
            const submitBtn = form.querySelector('.newsletter-btn');
            const originalText = submitBtn.textContent;
            
            if (!emailInput.value) return;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData();
            formData.append('email', emailInput.value);
            formData.append('_subject', 'New Newsletter Subscription - Halle Properties');
            
            fetch('https://formsubmit.co/ajax/navjot.singh@5rv.digital', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                } else {
                    alert('There was an error subscribing. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error subscribing. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    });
});

// Contact Form Submission (for AJAX handling)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            fetch('https://formsubmit.co/ajax/navjot.singh@5rv.digital', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Blog Pagination
document.addEventListener('DOMContentLoaded', function() {
    const paginationBtns = document.querySelectorAll('.blog-pagination .pagination-btn');
    const blogPages = document.querySelectorAll('.blog-page');
    
    if (paginationBtns.length === 0 || blogPages.length === 0) return;
    
    let currentPage = 1;
    const totalPages = blogPages.length;
    let isTransitioning = false;
    
    function showPage(pageNum) {
        if (isTransitioning || pageNum === currentPage) return;
        isTransitioning = true;
        
        const currentPageEl = document.querySelector(`.blog-page[data-page="${currentPage}"]`);
        const targetPageEl = document.querySelector(`.blog-page[data-page="${pageNum}"]`);
        
        if (!targetPageEl) {
            isTransitioning = false;
            return;
        }
        
        // Fade out current page
        if (currentPageEl) {
            currentPageEl.classList.add('fade-out');
        }
        
        // After fade out, switch pages
        setTimeout(() => {
            // Hide current page
            if (currentPageEl) {
                currentPageEl.classList.add('hidden');
                currentPageEl.classList.remove('fade-out');
            }
            
            // Show target page (initially faded out)
            targetPageEl.classList.remove('hidden');
            targetPageEl.classList.add('fade-out');
            
            // Force reflow to ensure transition works
            targetPageEl.offsetHeight;
            
            // Fade in target page
            targetPageEl.classList.remove('fade-out');
            
            // Update button states
            paginationBtns.forEach(btn => {
                btn.classList.remove('active');
                const btnPage = btn.getAttribute('data-page');
                if (btnPage && parseInt(btnPage) === pageNum) {
                    btn.classList.add('active');
                }
            });
            
            currentPage = pageNum;
            
            // Scroll to top of blog section
            const blogSection = document.querySelector('.blog-cards-section');
            if (blogSection) {
                blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Reset transitioning flag after fade in completes
            setTimeout(() => {
                isTransitioning = false;
            }, 400);
        }, 400);
    }
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const pageNum = this.getAttribute('data-page');
            
            if (action === 'next') {
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            } else if (pageNum) {
                showPage(parseInt(pageNum));
            }
        });
    });
});
