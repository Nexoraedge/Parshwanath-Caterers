// Menu Category Switching
document.addEventListener('DOMContentLoaded', () => {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    // Function to switch menu categories
    function switchCategory(categoryId) {
        // Hide all categories
        menuCategories.forEach(category => {
            category.classList.remove('active');
        });

        // Remove active class from all tabs
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected category
        const selectedCategory = document.getElementById(categoryId);
        const selectedTab = document.querySelector(`[data-category="${categoryId}"]`);

        if (selectedCategory) {
            selectedCategory.classList.add('active');
        }
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }

    // Add click event listeners to category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            switchCategory(category);
        });
    });

    // Additional menu items data
    const menuItems = {
        appetizers: [
            {
                name: "Classic Bruschetta",
                description: "Fresh tomatoes, basil, and garlic on toasted bread",
                price: "$12",
                image: "https://images.unsplash.com/photo-1541014741259-de529411b96a"
            },
            {
                name: "Shrimp Cocktail",
                description: "Fresh jumbo shrimp with cocktail sauce",
                price: "$16",
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641"
            }
        ],
        mainCourse: [
            {
                name: "Grilled Atlantic Salmon",
                description: "With herb butter sauce and seasonal vegetables",
                price: "$28",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947"
            },
            {
                name: "Filet Mignon",
                description: "8oz prime cut with red wine reduction",
                price: "$34",
                image: "https://images.unsplash.com/photo-1558030006-450675393462"
            }
        ],
        desserts: [
            {
                name: "Dark Chocolate Cake",
                description: "Rich chocolate layers with ganache",
                price: "$15",
                image: "https://images.unsplash.com/photo-1551024506-0bccd828d307"
            },
            {
                name: "Crème Brûlée",
                description: "Classic French custard with caramelized sugar",
                price: "$12",
                image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc"
            }
        ],
        beverages: [
            {
                name: "Signature Cocktails",
                description: "Crafted by our expert mixologists",
                price: "$14",
                image: "https://images.unsplash.com/photo-1544145945-f90425340c7e"
            },
            {
                name: "Wine Selection",
                description: "Curated wine list from around the world",
                price: "Varies",
                image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
            }
        ]
    };

    // Function to populate menu items
    function populateMenuItems() {
        Object.keys(menuItems).forEach(category => {
            const categoryContainer = document.getElementById(category);
            if (!categoryContainer) return;

            const menuGrid = categoryContainer.querySelector('.menu-grid');
            if (!menuGrid) return;

            menuItems[category].forEach(item => {
                const menuItemHTML = `
                    <div class="menu-item" data-aos="fade-up">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <span class="price">${item.price}</span>
                        </div>
                    </div>
                `;
                menuGrid.innerHTML += menuItemHTML;
            });
        });
    }

    // Initialize the menu
    populateMenuItems();
});

// Menu Book Page Flipping
document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    function updateBook() {
        const rotation = -currentPage * 180; // Calculate rotation based on current page
        book.style.transform = `rotateY(${rotation}deg)`;
    }

    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentPage < (pages.length / 2) - 1) { // Adjust for two pages
            currentPage++;
            updateBook();
        }
    });

    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateBook();
        }
    });
});
