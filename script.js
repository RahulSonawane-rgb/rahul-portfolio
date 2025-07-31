document.addEventListener('DOMContentLoaded', () => {
  function locomotive() {
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
  locomotive();

  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
      ./charector/male0001.png
      ./charector/male0002.png
      ./charector/male0003.png
      ./charector/male0004.png
      ./charector/male0005.png
      ./charector/male0006.png
      ./charector/male0007.png
      ./charector/male0008.png
      ./charector/male0009.png
      ./charector/male0010.png
      ./charector/male0011.png
      ./charector/male0012.png
      ./charector/male0013.png
      ./charector/male0014.png
      ./charector/male0015.png
      ./charector/male0016.png
      ./charector/male0017.png
      ./charector/male0018.png
      ./charector/male0019.png
      ./charector/male0020.png
      ./charector/male0021.png
      ./charector/male0022.png
      ./charector/male0023.png
      ./charector/male0024.png
      ./charector/male0025.png
      ./charector/male0026.png
      ./charector/male0027.png
      ./charector/male0028.png
      ./charector/male0029.png
      ./charector/male0030.png
      ./charector/male0031.png
      ./charector/male0032.png
      ./charector/male0033.png
      ./charector/male0034.png
      ./charector/male0035.png
      ./charector/male0036.png
      ./charector/male0037.png
      ./charector/male0038.png
      ./charector/male0039.png
      ./charector/male0040.png
      ./charector/male0041.png
      ./charector/male0042.png
      ./charector/male0043.png
      ./charector/male0044.png
      ./charector/male0045.png
      ./charector/male0046.png
      ./charector/male0047.png
      ./charector/male0048.png
      ./charector/male0049.png
      ./charector/male0050.png
      ./charector/male0051.png
      ./charector/male0052.png
      ./charector/male0053.png
      ./charector/male0054.png
      ./charector/male0055.png
      ./charector/male0056.png
      ./charector/male0057.png
      ./charector/male0058.png
      ./charector/male0059.png
      ./charector/male0060.png
      ./charector/male0061.png
      ./charector/male0062.png
      ./charector/male0063.png
      ./charector/male0064.png
      ./charector/male0065.png
      ./charector/male0066.png
      ./charector/male0067.png
      ./charector/male0068.png
      ./charector/male0069.png
      ./charector/male0070.png
      ./charector/male0071.png
      ./charector/male0072.png
      ./charector/male0073.png
      ./charector/male0074.png
      ./charector/male0075.png
      ./charector/male0076.png
      ./charector/male0077.png
      ./charector/male0078.png
      ./charector/male0079.png
      ./charector/male0080.png
      ./charector/male0081.png
      ./charector/male0082.png
      ./charector/male0083.png
      ./charector/male0084.png
      ./charector/male0085.png
      ./charector/male0086.png
      ./charector/male0087.png
      ./charector/male0088.png
      ./charector/male0089.png
      ./charector/male0090.png
      ./charector/male0091.png
      ./charector/male0092.png
      ./charector/male0093.png
      ./charector/male0094.png
      ./charector/male0095.png
      ./charector/male0096.png
      ./charector/male0097.png
      ./charector/male0098.png
      ./charector/male0099.png
      ./charector/male0100.png
      ./charector/male0101.png
      ./charector/male0102.png
      ./charector/male0103.png
      ./charector/male0104.png
      ./charector/male0105.png
      ./charector/male0106.png
      ./charector/male0107.png
      ./charector/male0108.png
      ./charector/male0109.png
      ./charector/male0110.png
      ./charector/male0111.png
      ./charector/male0112.png
      ./charector/male0113.png
      ./charector/male0114.png
      ./charector/male0115.png
      ./charector/male0116.png
      ./charector/male0117.png
      ./charector/male0118.png
      ./charector/male0119.png
      ./charector/male0120.png
      ./charector/male0121.png
      ./charector/male0122.png
      ./charector/male0123.png
      ./charector/male0124.png
      ./charector/male0125.png
      ./charector/male0126.png
      ./charector/male0127.png
      ./charector/male0128.png
      ./charector/male0129.png
      ./charector/male0130.png
      ./charector/male0131.png
      ./charector/male0132.png
      ./charector/male0133.png
      ./charector/male0134.png
      ./charector/male0135.png
      ./charector/male0136.png
      ./charector/male0137.png
      ./charector/male0138.png
      ./charector/male0139.png
      ./charector/male0140.png
      ./charector/male0141.png
      ./charector/male0142.png
      ./charector/male0143.png
      ./charector/male0144.png
      ./charector/male0145.png
      ./charector/male0146.png
      ./charector/male0147.png
      ./charector/male0148.png
      ./charector/male0149.png
      ./charector/male0150.png
      ./charector/male0151.png
      ./charector/male0152.png
      ./charector/male0153.png
      ./charector/male0154.png
      ./charector/male0155.png
      ./charector/male0156.png
      ./charector/male0157.png
      ./charector/male0158.png
      ./charector/male0159.png
      ./charector/male0160.png
      ./charector/male0161.png
      ./charector/male0162.png
      ./charector/male0163.png
      ./charector/male0164.png
      ./charector/male0165.png
      ./charector/male0166.png
      ./charector/male0167.png
      ./charector/male0168.png
      ./charector/male0169.png
      ./charector/male0170.png
      ./charector/male0171.png
      ./charector/male0172.png
      ./charector/male0173.png
      ./charector/male0174.png
      ./charector/male0175.png
      ./charector/male0176.png
      ./charector/male0177.png
      ./charector/male0178.png
      ./charector/male0179.png
      ./charector/male0180.png
      ./charector/male0181.png
      ./charector/male0182.png
      ./charector/male0183.png
      ./charector/male0184.png
      ./charector/male0185.png
      ./charector/male0186.png
      ./charector/male0187.png
      ./charector/male0188.png
      ./charector/male0189.png
      ./charector/male0190.png
      ./charector/male0191.png
      ./charector/male0192.png
      ./charector/male0193.png
      ./charector/male0194.png
      ./charector/male0195.png
      ./charector/male0196.png
      ./charector/male0197.png
      ./charector/male0198.png
      ./charector/male0199.png
      ./charector/male0200.png
      ./charector/male0201.png
      ./charector/male0202.png
      ./charector/male0203.png
      ./charector/male0204.png
      ./charector/male0205.png
      ./charector/male0206.png
      ./charector/male0207.png
      ./charector/male0208.png
      ./charector/male0209.png
      ./charector/male0210.png
      ./charector/male0211.png
      ./charector/male0212.png
      ./charector/male0213.png
      ./charector/male0214.png
      ./charector/male0215.png
      ./charector/male0216.png
      ./charector/male0217.png
      ./charector/male0218.png
      ./charector/male0219.png
      ./charector/male0220.png
      ./charector/male0221.png
      ./charector/male0222.png
      ./charector/male0223.png
      ./charector/male0224.png
      ./charector/male0225.png
      ./charector/male0226.png
      ./charector/male0227.png
      ./charector/male0228.png
      ./charector/male0229.png
      ./charector/male0230.png
      ./charector/male0231.png
      ./charector/male0232.png
      ./charector/male0233.png
      ./charector/male0234.png
      ./charector/male0235.png
      ./charector/male0236.png
      ./charector/male0237.png
      ./charector/male0238.png
      ./charector/male0239.png
      ./charector/male0240.png
      ./charector/male0241.png
      ./charector/male0242.png
      ./charector/male0243.png
      ./charector/male0244.png
      ./charector/male0245.png
      ./charector/male0246.png
      ./charector/male0247.png
      ./charector/male0248.png
      ./charector/male0249.png
      ./charector/male0250.png
      ./charector/male0251.png
      ./charector/male0252.png
      ./charector/male0253.png
      ./charector/male0254.png
      ./charector/male0255.png
      ./charector/male0256.png
      ./charector/male0257.png
      ./charector/male0258.png
      ./charector/male0259.png
      ./charector/male0260.png
      ./charector/male0261.png
      ./charector/male0262.png
      ./charector/male0263.png
      ./charector/male0264.png
      ./charector/male0265.png
      ./charector/male0266.png
      ./charector/male0267.png
      ./charector/male0268.png
      ./charector/male0269.png
      ./charector/male0270.png
      ./charector/male0271.png
      ./charector/male0272.png
      ./charector/male0273.png
      ./charector/male0274.png
      ./charector/male0275.png
      ./charector/male0276.png
      ./charector/male0277.png
      ./charector/male0278.png
      ./charector/male0279.png
      ./charector/male0280.png
      ./charector/male0281.png
      ./charector/male0282.png
      ./charector/male0283.png
      ./charector/male0284.png
      ./charector/male0285.png
      ./charector/male0286.png
      ./charector/male0287.png
      ./charector/male0288.png
      ./charector/male0289.png
      ./charector/male0290.png
      ./charector/male0291.png
      ./charector/male0292.png
      ./charector/male0293.png
      ./charector/male0294.png
      ./charector/male0295.png
      ./charector/male0296.png
      ./charector/male0297.png
      ./charector/male0298.png
      ./charector/male0299.png
      ./charector/male0300.png

  `;
    return data.split("\n")[index];
  } 

const frameCount = 300;
  const images = [];
  const imageSeq = { frame: 1 };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page>canvas`,
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: `#main`,
    start: `top`,
    end: `485.3% top`,
  });

  gsap.to("#page1", {
    scrollTrigger: {
      trigger: `#page1`,
      start: `top top`,
      end: `bottom top`,
      pin: true,
      scroller: `#main`
    }
  });

  gsap.to("#page2", {
    scrollTrigger: {
      trigger: `#page2`,
      start: `top top`,
      end: `bottom top`,
      pin: true,
      scroller: `#main`
    }
  });

  gsap.to("#page3", {
    scrollTrigger: {
      trigger: "#page>canvas",
      scroller: `#main`,
      start: `top top`,
      end: `600% top`,
    }
  });

  gsap.from("#Greating", {
    scrollTrigger: {
      trigger: "#Greating",
      start: "top 90%",
      end: "top 40%",
      scrub: 1,
      scroller: "#main",
    },
    opacity: -2,
    y: 50,
    scale: 0.8,
    duration: 1.5,
    ease: "power2.out",
  });

  gsap.from("#page1 #right-text", {
    scrollTrigger: {
      trigger: "#page1 #right-text",
      start: "top 30%",
      end: "top 15%",
      scrub: 1,
      scroller: "#main",
    },
    opacity: 0,
    x: -500,
    duration: 2,
    ease: "power2.out",
  });

  gsap.from("#page1 #left-text", {
    scrollTrigger: {
      trigger: "#page1 #left-text",
      start: "top 60%",
      end: "top 45%",
      scrub: 1,
      scroller: "#main",
    },
    opacity: 0,
    x: 500,
    duration: 2,
    ease: "power2.out",
  });

  gsap.to("#page2 #text1", {
    scrollTrigger: {
      trigger: "#page2 #text1",
      start: "top 0%",
      scrub: 1,
      scroller: "#main",
    },
    opacity: 0,
    x: -500,
    ease: "power2.out",
  });

  gsap.fromTo("#page2 #text2", {
    opacity: 0,
    x: 500,
    scale: 0.5,
    filter: "blur(20px)"
  }, {
    scrollTrigger: {
      trigger: "#page2 #text2",
      start: "top 0%",
      end: "top -20%",
      scrub: 1,
      scroller: "#main",
    },
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 2,
    ease: "elastic.out(1.2, 0.5)",
    transformOrigin: "center center",
    stagger: {
      amount: 0.8,
      from: "random"
    }
  });

  gsap.fromTo("#page3 #text3", {
    opacity: 0,
    y: 100,
    scale: 0.5,
  }, {
    scrollTrigger: {
      trigger: "#page3 #text3",
      start: "top 90%",
      end: "top 50%",
      scrub: 1,
      scroller: "#main",
    },
    opacity: 1,
    y: 0,
    scale: 1,
    ease: "power2.out",
  });

  gsap.fromTo("#page3 .social", {
    opacity: 0,
    y: 150,
    scale: 0
  }, {
    scrollTrigger: {
      trigger: "#page3 .social",
      start: "top 85%",
      end: "top 55%",
      scrub: 2,
      scroller: "#main",
    },
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: {
      each: 0.2,
      from: "random"
    },
    duration: 2,
    ease: "elastic.out(1.2, 0.3)",
    yoyo: true,
    transformOrigin: "center center"
  });

  gsap.utils.toArray("#page3 .social").forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    });

    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  var path = "M -50 100 Q 1000 100 2000 100";
  var finalPath = "M -50 100 Q 1000 100 2000 100";

  var string = document.querySelector("#string");

  string.addEventListener("mousemove", function (dets) {
    const rect = string.getBoundingClientRect();
    const relativeX = dets.clientX - rect.left;
    const relativeY = dets.clientY - rect.top;

    const amplifiedY = relativeY * 1.25;

    path = `M -50 100 Q ${relativeX} ${amplifiedY} 2000 100`;
    gsap.to("svg path", {
      attr: { d: path },
      duration: 0.3,
      ease: "power3.out",
    });
  });

  string.addEventListener("mouseleave", function () {
    gsap.to("svg path", {
      attr: { d: finalPath },
      duration: 0.8,
      ease: "elastic.out(1, 0.2)",
    });
  });

  const API_URL = 'https://rahul-portfolio-pkbt.onrender.com/api';

  async function fetchProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        cache: 'no-store'
      });
      const projects = await response.json();
      console.log('Fetched projects:', projects.length, projects);
      const projectContainer = document.getElementById('project-container');
      projectContainer.innerHTML = '';
      projects.forEach((project, index) => {
        const projectHtml = `
          <div class="section section-${index + 1}">
            <div class="headline heading-${index + 1}">${project.headline}</div>
            <section class="section-content">
              <div class="container">
                <div class="row">
                  <div class="col section-content">
                    <span class="section-subtitle">${project.subtitle}</span>
                    <h2 class="section-title">${project.title}</h2>
                    <p class="section-text">${project.description}</p>
                    <a href="${project.link}" class="cta-button">
                      <span>${project.linkText}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                  <div class="col section-image">
                    <img src="${project.image}" alt="${project.imageAlt}">
                  </div>
                </div>
              </div>
            </section>
          </div>
        `;
        projectContainer.insertAdjacentHTML('beforeend', projectHtml);
      });
      console.log('Rendered sections:', document.querySelectorAll('#page4 .container .section').length);
      const scrollDistance = (projects.length - 1) * 100;
      gsap.to("#page4 .container .section", {
        scrollTrigger: {
          trigger: "#page4 .container",
          scroller: `#main`,
          start: `top 0%`,
          end: `top -${scrollDistance}%`,
          scrub: 2,
          pin: true,
        },
        transform: `translateX(-${scrollDistance}%)`,
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  window.submitContact = async function() {
    console.log('submitContact called'); // Debug: Confirm function runs
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    const status = document.getElementById('contact-status');

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all fields.';
      status.style.color = 'red';
      status.style.display = 'block';
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      console.log('Response status:', response.status); // Debug: Log status
      if (!response.ok) {
        const text = await response.text();
        console.error('Non-JSON response:', text); // Debug: Log raw response
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      status.textContent = 'Message sent successfully!';
      status.style.color = 'green';
      status.style.display = 'block';
      document.getElementById('contact-name').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('contact-message').value = '';
    } catch (error) {
      console.error('Contact submission error:', error.message);
      status.textContent = error.message.includes('404')
        ? 'Contact service unavailable. Please try again later.'
        : 'Error sending message. Please try again.';
      status.style.color = 'red';
      status.style.display = 'block';
    }
  }

  fetchProjects();
  async function fetchCertifications() {
      try {
          const response = await fetch(`${API_URL}/certifications`, {
              cache: 'no-store'
          });
          const certifications = await response.json();
          console.log('Fetched certifications:', certifications.length, certifications);
          const certContainer = document.getElementById('certification-container');
          certContainer.innerHTML = '';
          certifications.forEach((cert, index) => {
              const certHtml = `
                  <div class="section section-${index + 1}">
                      <div class="headline heading-${index + 1}">${cert.title}</div>
                      <section class="section-content">
                          <div class="container">
                              <div class="row">
                                  <div class="col section-content">
                                      <span class="section-subtitle">${cert.issuer}</span>
                                      <h2 class="section-title">${cert.title}</h2>
                                      <p class="section-text">Issued on: ${cert.date}<br>${cert.description || 'Certificate of achievement in relevant skills.'}</p>
                                      <a href="${cert.link}" class="cta-button">
                                          <span>${cert.linkText}</span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <path d="M5 12h14M12 5l7 7-7 7"/>
                                          </svg>
                                      </a>
                                  </div>
                                  <div class="col section-image">
                                      <img src="${cert.image}" alt="${cert.imageAlt}">
                                  </div>
                              </div>
                          </div>
                      </section>
                  </div>
              `;
              certContainer.insertAdjacentHTML('beforeend', certHtml);
          });
      } catch (error) {
          console.error('Error fetching certifications:', error);
      }
  }

  fetchCertifications();
});
