document.addEventListener('DOMContentLoaded', () => {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.item-overlay h3').textContent;

            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Instagram Feed Simulation
    const instagramGrid = document.querySelector('.instagram-grid');
    const instagramPosts = [
        {
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033',
            likes: 234,
            comments: 12
        },
        {
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
            likes: 156,
            comments: 8
        },
        {
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d',
            likes: 342,
            comments: 15
        },
        {
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
            likes: 198,
            comments: 10
        },
        {
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
            likes: 267,
            comments: 14
        },
        {
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
            likes: 423,
            comments: 21
        }
    ];

    if (instagramGrid) {
        instagramPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post';
            postElement.innerHTML = `
                <img src="${post.image}" alt="Instagram Post">
                <div class="post-overlay">
                    <div class="post-stats">
                        <span><i class="fas fa-heart"></i> ${post.likes}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments}</span>
                    </div>
                </div>
            `;
            instagramGrid.appendChild(postElement);
        });
    }

    // Lazy loading for gallery images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
