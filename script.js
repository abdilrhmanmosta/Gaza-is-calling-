document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Show/hide payment method details
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment details
            paymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show selected payment details
            const selectedMethod = this.id;
            const detailsElement = document.getElementById(`${selectedMethod}-details`);
            
            if (detailsElement) {
                detailsElement.style.display = 'block';
            }
        });
    });
    
    // Initialize with PayPal selected
    document.getElementById('paypal').checked = true;
    
    // Form validation for donation form
    const donationForm = document.querySelector('.donation-form');
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = document.getElementById('amount').value;
            const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
            
            if (!amount || amount <= 0) {
                alert('الرجاء إدخال مبلغ تبرع صحيح');
                return;
            }
            
            // Here you would typically send the data to your server
            // For demonstration, we'll just show a thank you message
            alert(`شكراً لتبرعك بمبلغ ${amount}$ عن طريق ${paymentMethod}`);
            
            // Reset form
            this.reset();
            document.getElementById('paypal').checked = true;
            paymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('الرجاء إدخال بريدك الإلكتروني');
                return;
            }
            
            // Here you would typically send the email to your server
            alert('شكراً لاشتراكك في نشرتنا البريدية!');
            this.reset();
        });
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !subject || !message) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Here you would typically send the data to your server
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            this.reset();
        });
    }
    
    // Animate stats counter
    const statItems = document.querySelectorAll('.stat-item h3');
    
    if (statItems.length > 0) {
        const animateCounters = () => {
            statItems.forEach(item => {
                const target = parseInt(item.textContent.replace(/[+,]/g, ''));
                const suffix = item.textContent.match(/[+,]/g) ? item.textContent.match(/[+,]/g)[0] : '';
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = () => {
                    current += step;
                    if (current < target) {
                        item.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(counter);
                    } else {
                        item.textContent = target + suffix;
                    }
                };
                
                counter();
            });
        };
        
        // Only animate when stats are in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.stats').forEach(stats => {
            observer.observe(stats);
        });
    }
});