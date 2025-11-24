import { createListings } from './items.js';
import { createNutritionalFilters } from './filter.js';

// Store all menu items globally for search
let allMenuItems = [];

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results-container');
    
    if (!resultsContainer) return;
    
    if (!searchTerm) {
      // Show all items when search is empty
      resultsContainer.innerHTML = '';
      createListings(allMenuItems);
      return;
    }
    
    // Filter items by search term
    const filteredItems = allMenuItems.filter(item => 
      item.ITEM && item.ITEM.toLowerCase().includes(searchTerm)
    );
    
    // Display filtered results
    resultsContainer.innerHTML = '';
    if (filteredItems.length === 0) {
      resultsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">No items found matching your search.</p>';
    } else {
      createListings(filteredItems);
    }
  });
}

// Fetch McDonald's menu data and create listings
// Connected to your MongoDB database via Vercel backend
fetch('https://menu-ke1ptsw0p-jesse-vieiras-projects.vercel.app/data')
  .then(response => response.json())
  .then(menuItems => {
    console.log('McDonald\'s Menu Items:', menuItems);
    console.log('Total items:', menuItems.length);
    
    // Store items globally
    allMenuItems = menuItems;
    
    // Log categories for debugging
    const categories = [...new Set(menuItems.map(item => item.CATEGORY))];
    console.log('Available categories:', categories);
    
    // Create category listings
    createListings(menuItems);
    
    // Create nutritional filters
    createNutritionalFilters(menuItems);
    
    // Setup search functionality
    setupSearch();
  })
  .catch(error => {
    console.error('Error fetching menu data:', error);
    document.querySelector('main').innerHTML = '<p>Error loading menu data. Please try again later.</p>';
  });

  
