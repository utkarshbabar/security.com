// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;

    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon between bars and times (close)
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
        });
    }

    // --- Active Navigation Link ---
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop() || "index.html";
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // --- Update Current Year in Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Scanner Page Logic ---
    const urlInput = document.getElementById('urlInput');
    const scanButton = document.getElementById('scanButton');
    const scanResultDiv = document.getElementById('scanResult');

    if (scanButton && urlInput && scanResultDiv) {
        scanButton.addEventListener('click', () => {
            const urlToScan = urlInput.value.trim();

            // Clear previous results and show loading state
            scanResultDiv.innerHTML = '<div class="spinner mx-auto"></div><p class="mt-2 text-slate-600">Scanning, please wait...</p>';
            scanResultDiv.className = 'mt-10 p-6 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out status-info'; // Reset classes and add info
            scanButton.disabled = true;
            scanButton.classList.add('opacity-50', 'cursor-not-allowed');


            if (!urlToScan) {
                setTimeout(() => { // Simulate some processing
                    scanResultDiv.innerHTML = '<i class="fas fa-exclamation-triangle text-3xl mb-2"></i><p class="font-semibold">Error: Please enter a URL to scan.</p>';
                    scanResultDiv.className = 'mt-10 p-6 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out status-danger';
                    scanButton.disabled = false;
                    scanButton.classList.remove('opacity-50', 'cursor-not-allowed');
                }, 500);
                return;
            }

            // Simulate API call / scan delay
            setTimeout(() => {
                // Simple simulated logic
                const randomNumber = Math.random();
                let resultMessage = '';
                let resultClass = '';
                let resultIcon = '';

                if (urlToScan.includes("phishing-example.com") || urlToScan.includes("malware-site.org")) {
                    resultIcon = '<i class="fas fa-skull-crossbones text-3xl mb-2"></i>';
                    resultMessage = `<p class="font-semibold">Danger! Highly Suspicious URL!</p><p class="text-sm">The URL <strong class="break-all">${urlToScan}</strong> matches known threat patterns. Avoid visiting this site.</p>`;
                    resultClass = 'status-danger';
                } else if (urlToScan.includes("free-stuff-now.net") || urlToScan.includes("click-here-win.info")) {
                    resultIcon = '<i class="fas fa-exclamation-triangle text-3xl mb-2"></i>';
                    resultMessage = `<p class="font-semibold">Warning! Potentially Unsafe URL.</p><p class="text-sm">The URL <strong class="break-all">${urlToScan}</strong> contains suspicious keywords. Proceed with extreme caution.</p>`;
                    resultClass = 'status-warning';
                } else if (randomNumber < 0.2) { // 20% chance of "danger" for other URLs
                    resultIcon = '<i class="fas fa-shield-virus text-3xl mb-2"></i>';
                    resultMessage = `<p class="font-semibold">Threat Detected!</p><p class="text-sm">Our simulated scan found potential issues with <strong class="break-all">${urlToScan}</strong>. It's best to avoid this site.</p>`;
                    resultClass = 'status-danger';
                } else if (randomNumber < 0.5) { // 30% chance of "warning"
                    resultIcon = '<i class="fas fa-question-circle text-3xl mb-2"></i>';
                    resultMessage = `<p class="font-semibold">Caution Advised.</p><p class="text-sm">The URL <strong class="break-all">${urlToScan}</strong> shows some characteristics that warrant caution. Ensure it's a trusted source.</p>`;
                    resultClass = 'status-warning';
                } else { // 50% chance of "safe"
                    resultIcon = '<i class="fas fa-check-circle text-3xl mb-2"></i>';
                    resultMessage = `<p class="font-semibold">URL Appears Safe.</p><p class="text-sm">Our simulated scan of <strong class="break-all">${urlToScan}</strong> did not find any immediate threats.</p>`;
                    resultClass = 'status-safe';
                }

                scanResultDiv.innerHTML = `${resultIcon}${resultMessage}`;
                scanResultDiv.className = `mt-10 p-6 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out ${resultClass}`;
                scanButton.disabled = false;
                scanButton.classList.remove('opacity-50', 'cursor-not-allowed');

            }, 2000 + Math.random() * 1000); // Simulate 2-3 seconds scan time
        });
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contactForm');
    const formSubmissionResultDiv = document.getElementById('formSubmissionResult');
    const submitContactFormButton = document.getElementById('submitContactForm');


    if (contactForm && formSubmissionResultDiv && submitContactFormButton) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            // Simulate form processing
            submitContactFormButton.disabled = true;
            submitContactFormButton.innerHTML = '<div class="spinner mx-auto"></div><span class="ml-2">Sending...</span>';
            submitContactFormButton.classList.add('opacity-50', 'cursor-not-allowed');


            setTimeout(() => {
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                // In a real application, you would send this data to a server.
                // For example: fetch('/api/contact', { method: 'POST', body: formData })

                formSubmissionResultDiv.innerHTML = `
                    <div class="p-4 rounded-md bg-green-100 border border-green-300 text-green-700">
                        <i class="fas fa-check-circle mr-2"></i>Thank you, <strong>${name}</strong>! Your message has been "sent" (simulated). We'll be in touch shortly.
                    </div>`;
                contactForm.reset(); // Clear the form
                
                submitContactFormButton.disabled = false;
                submitContactFormButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
                submitContactFormButton.classList.remove('opacity-50', 'cursor-not-allowed');


                // Optional: Clear message after a few seconds
                setTimeout(() => {
                    formSubmissionResultDiv.innerHTML = '';
                }, 8000);

            }, 1500);
        });
    }

});

function sendChat() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  const log = document.getElementById('chatLog');

  if (message !== '') {
    // Display user's message
    const userMsg = document.createElement('p');
    userMsg.innerHTML = `<strong>You:</strong> ${message}`;
    log.appendChild(userMsg);

    // Auto-scroll
    log.scrollTop = log.scrollHeight;

    // Simulate bot reply
    const reply = document.createElement('p');
    reply.innerHTML = `<strong>SecureBot:</strong> ${getBotReply(message)}`;
    setTimeout(() => {
      log.appendChild(reply);
      log.scrollTop = log.scrollHeight;
    }, 800);

    input.value = '';
  }
}

function getBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("phishing")) return "Phishing is a scam to steal data. Don't click unknown links.";
  if (input.includes("password")) return "Use a strong password with letters, numbers & symbols.";
  if (input.includes("vpn")) return "A VPN helps secure your internet connection, especially on public Wi-Fi.";
  if (input.includes("scan")) return "Use our Scanner page to check suspicious URLs.";
  if (input.includes("hi")) return "hello User, how can I assist you today?";
  if (input.includes("help")) return "Sure! What do you need help with?";
  if (input.includes("thanks")) return "You're welcome! If you have more questions, just ask.";
  if (input.includes("bye")) return "Goodbye! Stay safe online!";
  if (input.includes("secure")) return "Security is our priority! Always be cautious online.";
  if (input.includes("malware")) return "Malware is malicious software. Always keep your antivirus updated.";
  if (input.includes("ransomware")) return "Ransomware locks your files. Always back up your data.";
  if (input.includes("spyware")) return "Spyware secretly monitors your activities. Use trusted software.";
  if (input.includes("adware")) return "Adware shows unwanted ads. Use ad blockers for a cleaner experience.";
    if (input.includes("firewall")) return "A firewall protects your network. Always keep it enabled.";
    if (input.includes("antivirus")) return "Antivirus software helps detect and remove malware.";
    if (input.includes("update")) return "Always keep your software updated for the latest security patches.";
    if (input.includes("social engineering")) return "Social engineering tricks you into revealing personal info. Be cautious.";
    if (input.includes("data breach")) return "A data breach exposes personal information. Always monitor your accounts.";
    if (input.includes("identity theft")) return "Identity theft is when someone steals your personal info. Always protect your data.";
    if (input.includes("two-factor authentication")) return "2FA adds an extra layer of security. Always enable it when available.";
    if (input.includes("phishing email")) return "Phishing emails often look legitimate. Always verify the sender.";
    if (input.includes("secure password")) return "A secure password is long, unique, and combines letters, numbers, and symbols.";
    if (input.includes("encrypted")) return "Encryption secures your data. Always use encrypted connections.";
    if (input.includes("malicious link")) return "Malicious links can lead to phishing sites. Always verify before clicking.";
    if (input.includes("scam")) return "Scams can take many forms. Always be cautious and verify before acting.";
    if (input.includes("cybersecurity")) return "Cybersecurity protects systems from cyber threats. Always stay informed.";
    if (input.includes("secure browsing")) return "Secure browsing means using HTTPS and avoiding suspicious sites.";
    if (input.includes("online safety")) return "Online safety means being cautious and protecting your personal information.";
    if (input.includes("secure connection")) return "A secure connection uses encryption to protect your data. Always look for HTTPS.";
    if (input.includes("malware scan")) return "A malware scan checks your system for malicious software. Always run regular scans.";
    if (input.includes("data privacy")) return "Data privacy means protecting your personal information. Always be cautious about what you share.";
    if (input.includes("vpn benefits")) return "VPNs provide privacy, security, and access to restricted content.";
    if (input.includes("secure website")) return "A secure website uses HTTPS. Always check for the padlock icon in the address bar.";
    if (input.includes("secure your data")) return "To secure your data, use strong passwords, encryption, and regular backups.";
  return "I'm here to help! Try asking about 'phishing', 'passwords', or 'VPNs'.";
}

