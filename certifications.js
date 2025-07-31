document.addEventListener('DOMContentLoaded', () => {
    function locomotive() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP or ScrollTrigger not loaded. Please check script files.');
            return;
        }
        gsap.registerPlugin(ScrollTrigger);
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true,
        });
        locoScroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy("#main", {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: document.querySelector("#main").style.transform
                ? "transform"
                : "fixed",
        });
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();
    }

    // Attempt to load locomotive with retries
    function tryLocomotive(attempts = 3, delay = 1000) {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            locomotive();
        } else if (attempts > 0) {
            console.warn(`GSAP not loaded, retrying (${attempts} attempts left)...`);
            setTimeout(() => tryLocomotive(attempts - 1, delay), delay);
        } else {
            console.error('Failed to load GSAP after retries. Animations disabled.');
        }
    }

    tryLocomotive();

    const API_URL = 'https://rahul-portfolio-pkbt.onrender.com/api';

    async function fetchCertifications() {
        try {
            const response = await fetch(`${API_URL}/certifications`, {
                cache: 'no-store'
            });
            if (!response.ok) {
                const text = await response.text();
                console.error('Fetch certifications failed:', response.status, text);
                throw new Error(`Failed to fetch certifications: ${response.status}`);
            }
            const certifications = await response.json();
            console.log('Fetched certifications:', certifications.length, certifications);
            const certContainer = document.getElementById('certification-container');
            certContainer.innerHTML = '';
            certifications.forEach((cert, index) => {
                const certHtml = `
                    <div class="cert-card">
                        <div class="cert-image">
                            <img src="${cert.image}" alt="${cert.imageAlt}">
                        </div>
                        <div class="cert-content">
                            <h2 class="cert-title">${cert.title}</h2>
                            <span class="cert-issuer">${cert.issuer}</span>
                            <p class="cert-date">Issued: ${cert.date}</p>
                            <p class="cert-description">${cert.description || 'Certificate of achievement in relevant skills.'}</p>
                            <a href="${cert.link}" class="cert-button">
                                <span>${cert.linkText}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                `;
                certContainer.insertAdjacentHTML('beforeend', certHtml);
            });
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.utils.toArray(".cert-card").forEach((card, index) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            scroller: "#main",
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 1,
                        },
                        opacity: 0,
                        y: 100,
                        scale: 0.9,
                        duration: 1,
                        ease: "power2.out",
                        delay: index * 0.2
                    });
                });
                gsap.from(".cert-heading", {
                    scrollTrigger: {
                        trigger: ".cert-heading",
                        scroller: "#main",
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1,
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1.5,
                    ease: "power2.out",
                });
            } else {
                console.warn('GSAP not loaded, skipping animations.');
            }
        } catch (error) {
            console.error('Error fetching certifications:', error);
        }
    }

    fetchCertifications();
});
