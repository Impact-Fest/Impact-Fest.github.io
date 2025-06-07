document.addEventListener('DOMContentLoaded', function() {
    const speakersContainer = document.getElementById('speakers-container');
    
    // Function to fetch speakers from Firestore
    function fetchSpeakers() {
        speakersContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Cargando conferencistas...</p>
            </div>
        `;
        
        db.collection("speakers").orderBy("order", "asc").get()
            .then((querySnapshot) => {
                speakersContainer.innerHTML = '';
                
                if (querySnapshot.empty) {
                    speakersContainer.innerHTML = `
                        <div class="no-speakers">
                            <p>Próximamente anunciaremos nuestros conferencistas destacados.</p>
                        </div>
                    `;
                    return;
                }
                
                querySnapshot.forEach((doc) => {
                    const speaker = doc.data();
                    addSpeakerToCarousel(speaker);
                });
                
                initCarousel();
            })
            .catch((error) => {
                console.error("Error getting speakers: ", error);
                speakersContainer.innerHTML = `
                    <div class="error-loading">
                        <p>Ocurrió un error al cargar los conferencistas. Por favor intenta nuevamente más tarde.</p>
                    </div>
                `;
            });
    }
    
    // Function to add speaker to carousel
    function addSpeakerToCarousel(speaker) {
        const speakerCard = document.createElement('div');
        speakerCard.className = 'speaker-card';
        speakerCard.setAttribute('data-animate', 'fade-in');
        
        speakerCard.innerHTML = `
            <div class="speaker-image-container">
                <img src="${speaker.imageUrl}" alt="${speaker.name}" class="speaker-image">
            </div>
            <div class="speaker-info">
                <h3 class="speaker-name">${speaker.name}</h3>
                <p class="speaker-title">${speaker.title}</p>
                <p class="speaker-bio">${speaker.bio}</p>
                <div class="speaker-social">
                    ${speaker.linkedin ? `<a href="${speaker.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
                    ${speaker.twitter ? `<a href="${speaker.twitter}" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>` : ''}
                    ${speaker.instagram ? `<a href="${speaker.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>` : ''}
                </div>
            </div>
        `;
        
        speakersContainer.appendChild(speakerCard);
    }
    
    // Function to initialize carousel
    function initCarousel() {
        const carousel = document.querySelector('.carousel-container');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const speakerCards = document.querySelectorAll('.speaker-card');
        let currentIndex = 0;
        
        // Set initial position
        updateCarousel();
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : speakerCards.length - 1;
            updateCarousel();
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < speakerCards.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
        
        // Auto-advance carousel every 5 seconds
        let autoAdvance = setInterval(() => {
            currentIndex = (currentIndex < speakerCards.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
        
        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(() => {
                currentIndex = (currentIndex < speakerCards.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            }, 5000);
        });
        
        // Update carousel position
        function updateCarousel() {
            const cardWidth = speakerCards[0].offsetWidth + 30; // width + gap
            carousel.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        }
        
        // Initialize animations
        initAnimations();
    }
    
    // Initialize animations
    function initAnimations() {
        const animateElements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Fetch speakers when page loads
    fetchSpeakers();
});