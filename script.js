// ===== JavaScript Code =====

// DOM Elements
const body = document.body;
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeButtons = document.querySelectorAll('.theme-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const scrollTopBtn = document.getElementById('scrollTop');

// ===== Mobile Navigation Toggle =====
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== Dynamic Theme Switching =====
if (themeButtons.length > 0) {
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all theme buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Remove all theme classes from body
            body.classList.remove('theme-cosmic', 'theme-nebula', 'theme-aurora', 'theme-light', 'dark-theme', 'light-theme', 'vibrant-theme');
            
            // Add selected theme class to body
            if (button.id === 'theme-light' || button.id === 'theme-aurora') {
                body.classList.add('theme-light', 'light-theme');
            } else if (button.id === 'theme-cosmic' || button.id === 'theme-dark') {
                body.classList.add('theme-cosmic', 'dark-theme');
            } else if (button.id === 'theme-nebula' || button.id === 'theme-vibrant') {
                body.classList.add('theme-nebula', 'vibrant-theme');
            }
            
            // Save theme preference to localStorage
            localStorage.setItem('portfolio-theme', button.id);
        });
    });

    // Load saved theme from localStorage (default to light mode)
    let savedTheme = localStorage.getItem('portfolio-theme');
    if (!savedTheme) {
        savedTheme = 'theme-light';
        localStorage.setItem('portfolio-theme', 'theme-light');
    }

    const themeButton = document.getElementById(savedTheme) || document.getElementById('theme-light');
    if (themeButton) {
        themeButton.click();
    }
}

// ===== Portfolio Filtering =====
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animated');
                }
            });
        });
    });
}

// ===== Services Horizontal Scroll Navigation =====
const servicesGrid = document.getElementById('servicesGrid');
const servicesPrevBtn = document.getElementById('servicesPrevBtn');
const servicesNextBtn = document.getElementById('servicesNextBtn');

if (servicesGrid && servicesPrevBtn && servicesNextBtn) {
    servicesPrevBtn.addEventListener('click', () => {
        servicesGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });

    servicesNextBtn.addEventListener('click', () => {
        servicesGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// ===== Contact Form Submission =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // For demo purposes, simulate successful submission
        showFormMessage("Thank you! Your message has been sent. I'll get back to you soon.", 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            if (formMessage) formMessage.style.display = 'none';
        }, 5000);
    });
}

function showFormMessage(text, type) {
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
}

// ===== Header & Scroll Effects =====
window.addEventListener('scroll', () => {
    // Trigger animations on scroll
    animateOnScroll();

    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Show/hide scroll to top button
    if (scrollTopBtn) {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ===== Scroll to Top Functionality =====
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Animate Elements on Scroll =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-text, .skills-container, .portfolio-item, .contact-info, .contact-form, .stat-item, .skill-item, .service-card, .testimonial-card, .resume-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 80;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
            
            // Animate stats counter
            if (element.classList.contains('stat-item')) {
                animateCounter(element);
            }
            
            // Animate skill progress bars
            if (element.classList.contains('skill-item')) {
                animateSkillBar(element);
            }
        }
    });
}

// ===== Animate Stats Counter =====
function animateCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    if (!counter) return;
    const target = parseInt(counter.getAttribute('data-count'));
    const count = parseInt(counter.textContent) || 0;
    
    if (count < target && !counter.classList.contains('counting')) {
        counter.classList.add('counting');
        let start = 0;
        const increment = Math.max(1, target / 100);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                counter.textContent = target;
                clearInterval(timer);
                counter.classList.remove('counting');
            } else {
                counter.textContent = Math.floor(start);
            }
        }, 20);
    }
}

// ===== Animate Skill Progress Bars =====
function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    if (!progressBar) return;
    const width = progressBar.getAttribute('data-width');
    
    if (!progressBar.classList.contains('animated')) {
        progressBar.classList.add('animated');
        setTimeout(() => {
            progressBar.style.width = width + '%';
        }, 300);
    }
}

// ===== Update Active Nav Link Based on Scroll =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== Dynamic Auto-Typing Effect for Rotating Skills =====
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const skills = [
        "Modern Web Solutions",
        "AI & Machine Learning",
        "React & Full-Stack Apps",
        "Flutter Mobile Apps",
        "Shopify & TikTok Stores",
        "Python & Cloud Systems",
        "Scalable SQL Architectures"
    ];

    let currentSkillIndex = 0;
    let currentCharIndex = skills[0].length;
    let isDeleting = true;

    function typeLoop() {
        const currentWord = skills[currentSkillIndex];

        if (isDeleting) {
            currentCharIndex--;
            typingElement.textContent = currentWord.substring(0, currentCharIndex);
        } else {
            currentCharIndex++;
            typingElement.textContent = currentWord.substring(0, currentCharIndex);
        }

        let speed = isDeleting ? 45 : 85;

        // When skill is fully typed
        if (!isDeleting && currentCharIndex === currentWord.length) {
            speed = 2000; // Pause to let viewer read
            isDeleting = true;
        } 
        // When skill is fully deleted
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentSkillIndex = (currentSkillIndex + 1) % skills.length;
            speed = 350; // Pause briefly before starting next skill
        }

        setTimeout(typeLoop, speed);
    }

    // Initial pause before cycling first displayed skill
    setTimeout(typeLoop, 2000);
}

// ===== Initialize Floating Elements Animation =====
function initFloatingElements() {
    const floatElements = document.querySelectorAll('.float-element');
    
    floatElements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 6 + Math.random() * 2;
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
    });
}

// ===== Certificate Modal Logic =====
function openCertModal(imageSrc, altText, verifyUrl) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certImage');
    const caption = document.getElementById('certCaption');
    
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modalImg.alt = altText || 'Certificate';
        
        if (caption) {
            if (verifyUrl) {
                caption.innerHTML = `<span>${altText || 'Certificate'}</span> <a href="${verifyUrl}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Verify Certificate</a>`;
            } else {
                caption.innerHTML = `<span>${altText || 'Certificate'}</span>`;
            }
        }
        
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside certificate content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('certModal');
    if (modal && event.target === modal) {
        closeCertModal();
    }
});

// Close modal on Escape key press
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCertModal();
    }
});

// ===== Initialize Everything on DOM Load =====
window.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    animateOnScroll();
    initTypingEffect();
    initFloatingElements();
    initCodeShowcase();
    
    // Animate portfolio items on load
    portfolioItems.forEach(item => {
        item.classList.add('animated');
    });
    
    // Set current year in footer
    const copyrightP = document.querySelector('.copyright p');
    if (copyrightP) {
        copyrightP.innerHTML = `&copy; ${new Date().getFullYear()} Farman Ali. All Rights Reserved.`;
    }

    // Competencies tabs
    const compTabs = document.querySelectorAll('.comp-tab');
    const compCards = document.querySelectorAll('.comp-card');

    if (compTabs.length > 0) {
        compTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                compTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const filterValue = tab.getAttribute('data-tab');
                
                compCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        compCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }



    // Scroll Reveal Animations with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    const animatableElements = document.querySelectorAll('.about-text, .skills-container, .portfolio-item, .contact-info, .contact-form, .stat-item, .skill-item');

    if ('IntersectionObserver' in window) {
        const revealCallback = function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Animate any animatable children inside the revealed section
                    const children = entry.target.querySelectorAll('.about-text, .skills-container, .portfolio-item, .contact-info, .contact-form, .stat-item, .skill-item');
                    children.forEach(child => {
                        child.classList.add('animated');
                        if (child.classList.contains('stat-item')) animateCounter(child);
                        if (child.classList.contains('skill-item')) animateSkillBar(child);
                    });
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));

        // Also observe individual elements for high reliability
        const itemObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    if (entry.target.classList.contains('stat-item')) animateCounter(entry.target);
                    if (entry.target.classList.contains('skill-item')) animateSkillBar(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        animatableElements.forEach(el => itemObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
        animatableElements.forEach(el => el.classList.add('animated'));
    }

    // Run animate on initial load
    setTimeout(animateOnScroll, 100);
});

// ===== Clean Code Interactive Showcase Engine =====
function initCodeShowcase() {
    const vscTabs = document.querySelectorAll('.vsc-tab');
    const vscPanes = document.querySelectorAll('.vsc-code-pane');
    const vscPath = document.getElementById('vscPath');
    const vscActiveFile = document.getElementById('vscActiveFile');
    const vscGutter = document.getElementById('vscGutter');
    const runCodeBtn = document.getElementById('runCodeBtn');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const vscTerminalOutput = document.getElementById('vscTerminalOutput');
    const vscTermStatus = document.getElementById('vscTermStatus');
    const vscToast = document.getElementById('vscToast');
    const vscToastText = document.getElementById('vscToastText');

    if (!vscTabs.length || !vscPanes.length) return;

    // Dynamically calculate and render line numbers
    function updateLineNumbers(pane) {
        if (!vscGutter || !pane) return;
        const pre = pane.querySelector('pre');
        if (!pre) return;
        const lines = pre.innerText.split('\n').length;
        let gutterHtml = '';
        for (let i = 1; i <= lines; i++) {
            gutterHtml += `<div>${i}</div>`;
        }
        vscGutter.innerHTML = gutterHtml;
    }

    // Set initial line numbers
    const initialPane = document.querySelector('.vsc-code-pane.active');
    if (initialPane) updateLineNumbers(initialPane);

    // Tab Switching Logic
    vscTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            vscTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const lang = tab.getAttribute('data-lang');
            const file = tab.getAttribute('data-file');
            const path = tab.getAttribute('data-path');

            if (vscPath) vscPath.textContent = path;
            if (vscActiveFile) vscActiveFile.innerHTML = `<i class="fas fa-file-code"></i> ${file}`;

            vscPanes.forEach(pane => {
                if (pane.id === `pane-${lang}`) {
                    pane.classList.add('active');
                    updateLineNumbers(pane);
                } else {
                    pane.classList.remove('active');
                }
            });

            // Reset terminal prompt
            if (vscTermStatus) {
                vscTermStatus.innerHTML = `<span class="status-dot"></span> Engine Ready &bull; ${file}`;
            }
        });
    });

    // Copy to Clipboard Logic
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const activePane = document.querySelector('.vsc-code-pane.active');
            if (!activePane) return;
            const codeToCopy = activePane.getAttribute('data-code') || activePane.innerText;

            const copySuccess = () => {
                copyCodeBtn.classList.add('copied');
                copyCodeBtn.innerHTML = '<i class="fas fa-check"></i>';
                showToast('Clean code snippet copied to clipboard!');

                setTimeout(() => {
                    copyCodeBtn.classList.remove('copied');
                    copyCodeBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(codeToCopy).then(copySuccess).catch(() => {
                    fallbackCopy(codeToCopy, copySuccess);
                });
            } else {
                fallbackCopy(codeToCopy, copySuccess);
            }
        });
    }

    function fallbackCopy(text, callback) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            if (callback) callback();
        } catch (e) {
            showToast('Code copied to clipboard!');
        }
        document.body.removeChild(textarea);
    }

    function showToast(msg) {
        if (!vscToast) return;
        if (vscToastText) vscToastText.textContent = msg;
        vscToast.classList.add('show');
        setTimeout(() => {
            vscToast.classList.remove('show');
        }, 3000);
    }

    // Live Execution Simulation Logic
    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', () => {
            const activeTab = document.querySelector('.vsc-tab.active');
            const lang = activeTab ? activeTab.getAttribute('data-lang') : 'flutter';
            const file = activeTab ? activeTab.getAttribute('data-file') : 'product_repository.dart';

            runCodeBtn.classList.add('running');
            runCodeBtn.innerHTML = '<i class="fas fa-spinner"></i> <span>Compiling...</span>';

            if (vscTermStatus) {
                vscTermStatus.innerHTML = '<span class="status-dot" style="background:#ffbd2e;box-shadow:0 0 6px #ffbd2e;"></span> Compiling Architecture in Sandbox...';
            }

            if (vscTerminalOutput) {
                vscTerminalOutput.innerHTML = `
                    <div class="term-log">
                        <span class="term-tag tag-engine">SYSTEM</span>
                        <span class="term-msg">Starting execution sandbox for <strong>${file}</strong>...</span>
                    </div>
                `;
            }

            const logsByLang = {
                flutter: [
                    { tag: 'tag-exec', label: 'DART-VM', msg: 'Analyzing contract `IProductRepository` & type annotations...' },
                    { tag: 'tag-info', label: 'CACHE', msg: 'Local storage LRU cache initialized. Max capacity: 50MB.' },
                    { tag: 'tag-exec', label: 'NETWORK', msg: 'Simulated API fetch: 200 OK (Roundtrip Latency: 28ms).' },
                    { tag: 'tag-pass', label: 'TESTS', msg: '14/14 Unit tests passed. 0 warnings, 0 memory leaks.' },
                    { tag: 'tag-engine', label: 'STATUS', msg: 'Clean Architecture State Pipeline is 100% Operational!', highlight: true }
                ],
                react: [
                    { tag: 'tag-exec', label: 'REACT-HOOK', msg: 'Compiling `useArchitectureEngine` hook lifecycle...' },
                    { tag: 'tag-info', label: 'MEMO', msg: 'useCallback dependency graph verified with stable references.' },
                    { tag: 'tag-exec', label: 'ASYNC', msg: 'Dispatched async promise pipeline. Response received in 34ms.' },
                    { tag: 'tag-pass', label: 'BENCHMARK', msg: 'Render cost: 0.8ms (60 FPS fluid lifecycle maintained).' },
                    { tag: 'tag-engine', label: 'STATUS', msg: 'Reactive state synchronization verified successfully!', highlight: true }
                ],
                firebase: [
                    { tag: 'tag-exec', label: 'FIRESTORE', msg: 'Opening atomic ACID transaction stream...' },
                    { tag: 'tag-info', label: 'SECURITY', msg: 'Security rules evaluation: Customer profile verified.' },
                    { tag: 'tag-exec', label: 'MUTATION', msg: 'Inventory decremented safely & order #ORD-84920 committed.' },
                    { tag: 'tag-pass', label: 'ATOMIC', msg: 'Transaction write confirmed (Total execution: 41ms).' },
                    { tag: 'tag-engine', label: 'STATUS', msg: 'Atomic transaction passed without data race conditions!', highlight: true }
                ],
                python: [
                    { tag: 'tag-exec', label: 'UVICORN', msg: 'FastAPI async loop listening on port 8000 (ASGI workers: 4).' },
                    { tag: 'tag-info', label: 'PIPELINE', msg: 'Tokenizing input string (128 vectors generated in 3.2ms).' },
                    { tag: 'tag-exec', label: 'INFERENCE', msg: 'Tensor flow forward pass executed (Confidence: 99.4%).' },
                    { tag: 'tag-pass', label: 'LATENCY', msg: 'End-to-end response dispatched in 19.8ms.' },
                    { tag: 'tag-engine', label: 'STATUS', msg: 'Python AI Microservice ready for high-concurrency load!', highlight: true }
                ]
            };

            const logs = logsByLang[lang] || logsByLang.flutter;

            logs.forEach((logItem, index) => {
                setTimeout(() => {
                    if (vscTerminalOutput) {
                        const logRow = document.createElement('div');
                        logRow.className = 'term-log';
                        logRow.innerHTML = `
                            <span class="term-tag ${logItem.tag}">${logItem.label}</span>
                            <span class="term-msg ${logItem.highlight ? 'highlight' : ''}">${logItem.msg}</span>
                        `;
                        vscTerminalOutput.appendChild(logRow);
                        vscTerminalOutput.scrollTop = vscTerminalOutput.scrollHeight;
                    }

                    if (index === logs.length - 1) {
                        runCodeBtn.classList.remove('running');
                        runCodeBtn.innerHTML = '<i class="fas fa-play"></i> <span>Run Code</span>';
                        if (vscTermStatus) {
                            vscTermStatus.innerHTML = '<span class="status-dot"></span> Execution Complete &bull; All Tests Passed';
                        }
                    }
                }, (index + 1) * 320);
            });
        });
    }
}