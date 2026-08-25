document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       THEME SWITCHER (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                if (theme === 'light') {
                    icon.className = 'fa-solid fa-sun';
                    themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
                } else {
                    icon.className = 'fa-solid fa-moon';
                    themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
                }
            }
        }
        localStorage.setItem('theme', theme);
    }

    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }

    /* ==========================================================================
       CUSTOM CURSOR
       ========================================================================== */
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Add hover effect to interactive elements
        const interactives = document.querySelectorAll('a, button, select, input, textarea, .filter-btn, .indicator');
        interactives.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }

    /* ==========================================================================
       STICKY HEADER
       ========================================================================== */
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       MARQUEE SCROLL TRANSLATION
       ========================================================================== */
    const marqueeSection = document.getElementById('marquee');
    const track1 = document.getElementById('marqueeTrack1');
    const track2 = document.getElementById('marqueeTrack2');
    
    if (marqueeSection && track1 && track2) {
        const row1Images = [
            'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
            'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
            'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
            'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
            'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
            'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
            'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
            'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
            'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
            'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
            'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif'
        ];
        
        const row2Images = [
            'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
            'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
            'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
            'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
            'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
            'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
            'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
            'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
            'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
            'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'
        ];

        function populateTrack(track, images) {
            const tripledImages = [...images, ...images, ...images];
            tripledImages.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Portfolio Project Loop';
                img.className = 'marquee-tile';
                img.loading = 'lazy';
                track.appendChild(img);
            });
        }

        populateTrack(track1, row1Images);
        populateTrack(track2, row2Images);

        window.addEventListener('scroll', () => {
            const sectionRect = marqueeSection.getBoundingClientRect();
            const sectionTop = window.scrollY + sectionRect.top;
            
            if (sectionRect.bottom >= 0 && sectionRect.top <= window.innerHeight) {
                const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
                
                track1.style.transform = `translate3d(${offset - 200}px, 0px, 0px)`;
                track2.style.transform = `translate3d(${-(offset - 200)}px, 0px, 0px)`;
            }
        }, { passive: true });
    }

    /* ==========================================================================
       MOBILE NAV TOGGLE
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('overflow-hidden'); // Prevent body scroll
        });

        // Close mobile nav when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    /* ==========================================================================
       PORTFOLIO FILTERS & SERVICE LINKS
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const serviceLinks = document.querySelectorAll('.service-link, .footer-links a[data-filter]');

    function filterPortfolio(filterValue) {
        // Update active class on filter buttons
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Filter cards
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    }

    // Set up filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            filterPortfolio(filterValue);
        });
    });

    // Set up links inside service cards to filter and scroll to portfolio
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const filterValue = link.getAttribute('data-filter');
            if (filterValue) {
                e.preventDefault();
                filterPortfolio(filterValue);
                
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* ==========================================================================
       CHARACTER SCROLL-REVEAL TEXT ANIMATION
       ========================================================================== */
    const animatedTextEl = document.getElementById('animatedAboutText');
    if (animatedTextEl) {
        const rawText = animatedTextEl.textContent;
        animatedTextEl.textContent = '';
        
        // Wrap each character in a span
        const charSpans = [...rawText].map(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0.2';
            span.style.transition = 'opacity 0.15s ease';
            animatedTextEl.appendChild(span);
            return span;
        });

        window.addEventListener('scroll', () => {
            const rect = animatedTextEl.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Start reveal when element enters 85% of screen height
            // Full reveal when element exits 25% of screen height
            const startRevealY = windowHeight * 0.85;
            const endRevealY = windowHeight * 0.25;
            
            let progress = (startRevealY - rect.top) / (startRevealY - endRevealY);
            progress = Math.max(0, Math.min(1, progress));
            
            const numToReveal = Math.floor(progress * charSpans.length);
            charSpans.forEach((span, index) => {
                if (index < numToReveal) {
                    span.style.opacity = '1';
                } else {
                    span.style.opacity = '0.2';
                }
            });
        }, { passive: true });
    }

    /* ==========================================================================
       INTERSECTION OBSERVER (SCROLL ANIMATIONS & ACTIVE NAV)
       ========================================================================== */
    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a delay if specified
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Navigation Highlight
    const sections = document.querySelectorAll('section[id]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-10% 0px -60% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));

    /* ==========================================================================
       TESTIMONIALS CAROUSEL
       ========================================================================== */
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('#carouselIndicators .indicator');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    let carouselInterval;

    if (slides.length > 0) {
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        indicators.forEach((ind, i) => {
            ind.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
        });

        function startInterval() {
            carouselInterval = setInterval(nextSlide, 6000); // 6s duration
        }

        function resetInterval() {
            clearInterval(carouselInterval);
            startInterval();
        }

        startInterval();
    }

    /* ==========================================================================
       CONTACT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('formName');
            const nameGroup = nameInput.closest('.form-group');
            if (nameInput.value.trim() === '') {
                nameGroup.classList.add('invalid');
                isValid = false;
            } else {
                nameGroup.classList.remove('invalid');
            }
            
            // Email validation
            const emailInput = document.getElementById('formEmail');
            const emailGroup = emailInput.closest('.form-group');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailGroup.classList.add('invalid');
                isValid = false;
            } else {
                emailGroup.classList.remove('invalid');
            }
            
            // Niche selection validation
            const nicheSelect = document.getElementById('formNiche');
            const nicheGroup = nicheSelect.closest('.form-group');
            if (nicheSelect.value === '') {
                nicheGroup.classList.add('invalid');
                isValid = false;
            } else {
                nicheGroup.classList.remove('invalid');
            }

            // Budget validation
            const budgetSelect = document.getElementById('formBudget');
            const budgetGroup = budgetSelect.closest('.form-group');
            if (budgetSelect.value === '') {
                budgetGroup.classList.add('invalid');
                isValid = false;
            } else {
                budgetGroup.classList.remove('invalid');
            }

            // Message validation
            const messageInput = document.getElementById('formMessage');
            const messageGroup = messageInput.closest('.form-group');
            if (messageInput.value.trim() === '') {
                messageGroup.classList.add('invalid');
                isValid = false;
            } else {
                messageGroup.classList.remove('invalid');
            }
            
            // Status container
            const statusMsg = document.getElementById('formStatusMsg');
            const submitBtn = document.getElementById('submitFormBtn');
            
            if (isValid) {
                // Disable button and show loading state
                submitBtn.disabled = true;
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending proposal <i class="fa-solid fa-circle-notch fa-spin" style="margin-left: 8px;"></i>';
                
                // Simulate API call
                setTimeout(() => {
                    statusMsg.className = 'form-status-msg success';
                    statusMsg.textContent = 'Thank you! Your project proposal has been sent. Shubham will be in touch shortly.';
                    
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    // Hide success status message after 8 seconds
                    setTimeout(() => {
                        statusMsg.style.display = 'none';
                    }, 8000);
                }, 1500);
            } else {
                statusMsg.className = 'form-status-msg error';
                statusMsg.textContent = 'Please correct the errors in the fields above.';
                statusMsg.style.display = 'block';
            }
        });

        // Add real-time input change listener to remove errors on edit
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (group.classList.contains('invalid') && input.value.trim() !== '') {
                    group.classList.remove('invalid');
                }
            });
            input.addEventListener('change', () => {
                const group = input.closest('.form-group');
                if (group.classList.contains('invalid') && input.value !== '') {
                    group.classList.remove('invalid');
                }
            });
        });
    }

    /* ==========================================================================
       Q&A AI CHATBOT CONTROLLER & KNOWLEDGE BASE
       ========================================================================== */
    const chatWidget = document.getElementById('chatWidget');
    const chatWidgetToggle = document.getElementById('chatWidgetToggle');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatResetBtn = document.getElementById('chatResetBtn');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatSuggestions = document.getElementById('chatSuggestions');

    if (chatWidget && chatWidgetToggle) {
        // Toggle Chat Modal
        chatWidgetToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('active');
            if (chatWidget.classList.contains('active')) {
                chatInput.focus();
            }
        });

        if (chatCloseBtn) {
            chatCloseBtn.addEventListener('click', () => {
                chatWidget.classList.remove('active');
            });
        }

        // Reset Conversation
        if (chatResetBtn) {
            chatResetBtn.addEventListener('click', () => {
                chatMessages.innerHTML = `
                    <div class="chat-msg bot-msg">
                        <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                        <div class="msg-content">
                            <p>Hi there! 👋 I'm Shubham's AI Assistant. How can I help you scale your business or build your website today?</p>
                        </div>
                    </div>
                `;
            });
        }

        // AI Response Engine
        function generateResponse(query) {
            const lower = query.toLowerCase();

            if (lower.includes('service') || lower.includes('offer') || lower.includes('what do you do') || lower.includes('capability')) {
                return "We offer 4 primary high-impact services:<br><br>" +
                       "1️⃣ <b>SEO, GEO & AEO Optimization</b> (Google Maps & AI Search visibility)<br>" +
                       "2️⃣ <b>AI Ads & UGC Creation</b> (High-converting visual ad assets)<br>" +
                       "3️⃣ <b>Web Design & Development</b> (Bespoke visual platforms)<br>" +
                       "4️⃣ <b>AI Growth & PMS Systems</b> (24/7 AI Voice/SMS Agents & booking tools)";
            }
            else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('rate') || lower.includes('fee') || lower.includes('how much') || lower.includes('package')) {
                return "Our project investment tiers typically range from <b>$5,000 to $25,000+</b> depending on project scope:<br><br>" +
                       "• <b>Custom Websites</b>: Starting from $5,000<br>" +
                       "• <b>AI Growth Systems</b>: $5,000 setup + retainer<br>" +
                       "• <b>Full Growth Retainer</b>: Tailored monthly retainer<br><br>" +
                       "Submit your requirements on our <a href='#contact' onclick='document.getElementById(\"chatWidget\").classList.remove(\"active\")'>Contact Form</a> to get a tailored estimate.";
            }
            else if (lower.includes('ai') || lower.includes('automation') || lower.includes('agent') || lower.includes('voice') || lower.includes('system')) {
                return "Our <b>Autonomous AI Growth & Automation Systems</b> offer:<br><br>" +
                       "• 24/7 AI Voice & SMS Virtual Receptionists<br>" +
                       "• Automated Lead Nurturing & Reactivation<br>" +
                       "• Real-Time Calendar & CRM Syncing<br>" +
                       "• Zero Front-Desk Burnout<br><br>" +
                       "Explore our live platforms in the <a href='#portfolio' onclick='document.getElementById(\"chatWidget\").classList.remove(\"active\")'>Portfolio Section</a>!";
            }
            else if (lower.includes('portfolio') || lower.includes('work') || lower.includes('case study') || lower.includes('example') || lower.includes('project') || lower.includes('clothing') || lower.includes('elysian') || lower.includes('nocturne') || lower.includes('terranova') || lower.includes('restaurant')) {
                return "We have engineered bespoke live platforms across our core niches:<br><br>" +
                       "👗 <a href='elysian_clothing_store.html' target='_blank'><b>Elysian Label</b></a> (Luxury Fashion & E-Commerce Flagship)<br>" +
                       "🍷 <a href='nocturne_bistro.html' target='_blank'><b>Nocturne Bistro</b></a> (Two Michelin-Starred Sensory Gastronomy)<br>" +
                       "🌿 <a href='terranova.html' target='_blank'><b>Terranova</b></a> (Liquid Glass Refraction Experience)<br><br>" +
                       "Click any link above or explore our interactive gallery in the <a href='#portfolio' onclick='document.getElementById(\"chatWidget\").classList.remove(\"active\")'>Work Section</a>!";
            }
            else if (lower.includes('time') || lower.includes('long') || lower.includes('process') || lower.includes('turnaround') || lower.includes('duration') || lower.includes('week')) {
                return "Our proven 4-step creative framework typically takes <b>2 to 4 weeks</b> from initial discovery to final deployment and launch.";
            }
            else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('call') || lower.includes('talk') || lower.includes('book') || lower.includes('start')) {
                return "You can reach Shubham directly at <b>hello@shubham.agency</b> or call <b>+1 (800) 555-0199</b>.<br><br>" +
                       "Ready to launch? Fill out our <a href='#contact' onclick='document.getElementById(\"chatWidget\").classList.remove(\"active\")'>Project Form</a> and we'll respond within 24 hours!";
            }
            else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('greetings')) {
                return "Hello! 👋 Great to meet you. What can I answer for you about our web design services, AI growth systems, or pricing?";
            }
            else {
                return "That's a great question! Shubham can build a tailored solution specifically for your business goals.<br><br>" +
                       "Feel free to submit a quick project inquiry on our <a href='#contact' onclick='document.getElementById(\"chatWidget\").classList.remove(\"active\")'>Contact Form</a> or email us directly at <b>hello@shubham.agency</b>.";
            }
        }

        // Add User Message
        function appendUserMessage(text) {
            const userDiv = document.createElement('div');
            userDiv.className = 'chat-msg user-msg';
            userDiv.innerHTML = `
                <div class="msg-content">
                    <p>${escapeHTML(text)}</p>
                </div>
            `;
            chatMessages.appendChild(userDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Helper to escape HTML user input
        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }

        // Add Bot Message with typing indicator delay
        function appendBotMessage(responseHtml) {
            // Typing Indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-msg bot-msg typing-msg';
            typingDiv.innerHTML = `
                <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="msg-content">
                    <div class="typing-dots"><span></span><span></span><span></span></div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                typingDiv.remove();
                const botDiv = document.createElement('div');
                botDiv.className = 'chat-msg bot-msg';
                botDiv.innerHTML = `
                    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-content">
                        <p>${responseHtml}</p>
                    </div>
                `;
                chatMessages.appendChild(botDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        }

        // Handle Submit
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            appendUserMessage(text);
            chatInput.value = '';

            const reply = generateResponse(text);
            appendBotMessage(reply);
        });

        // Quick Suggestion Chips
        if (chatSuggestions) {
            const chips = chatSuggestions.querySelectorAll('.suggestion-chip');
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const query = chip.getAttribute('data-query');
                    if (query) {
                        appendUserMessage(query);
                        const reply = generateResponse(query);
                        appendBotMessage(reply);
                    }
                });
            });
        }
    }
});
