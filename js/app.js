/**
 * Manipulating the DOM exercise.
 * Programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 * 
 * - `navList`: The unordered list element where navigation links will be appended.
 * - `sections`: A NodeList of all section elements on the page.
 */
const navList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * Start Helper Functions
 * 
 * Helper functions perform specific tasks used in the main functions.
 */

/**
 * Build the navigation menu dynamically.
 * 
 * - Iterate over each section element.
 * - Create a list item and anchor for each section.
 * - Append the anchor to the list item and then to the nav list.
 */
const buildNavigationMenu = () => {
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionData = section.getAttribute('data-nav');
        
        // Create a list item for the navigation menu
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#${sectionId}`;
        anchor.textContent = sectionData;
        anchor.classList.add('menu__link');
        
        // Add the anchor to the list item and then to the nav list
        listItem.appendChild(anchor);
        navList.appendChild(listItem);
    });
};

/**
 * Add 'active' class to section when near top of viewport.
 * 
 * - Check the position of each section relative to the viewport.
 * - Add the 'active' class to the section in view and its corresponding navigation item.
 */
const setActiveSection = () => {
    let index = sections.length;
    const scrollY = window.scrollY + 50; // Adjust to start detecting a bit earlier

    // Find the current section in view
    while (--index && scrollY + 50 < sections[index].offsetTop) {}
    
    // Remove 'active' class from all sections and navigation items
    document.querySelectorAll('section').forEach(section => section.classList.remove('your-active-class'));
    document.querySelectorAll('#navbar__list a').forEach(anchor => anchor.classList.remove('active'));
    
    // Add 'active' class to the current section and corresponding navigation item
    const currentSection = sections[index];
    if (currentSection) {
        currentSection.classList.add('your-active-class');
        const id = currentSection.id;
        document.querySelector(`#navbar__list a[href="#${id}"]`)?.classList.add('active');
    }
};

/**
 * Smoothly scroll to the target section when a navigation link is clicked.
 * 
 * - Prevent the default anchor behavior.
 * - Use `scrollIntoView` for smooth scrolling to the target section.
 */
const scrollToSection = (event) => {
    event.preventDefault();
    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 * Main functions handle the primary tasks for this exercise.
 */

/**
 * Initialize the app functionalities.
 */
const initApp = () => {
    buildNavigationMenu();
    
    // Scroll to section on link click
    document.querySelectorAll('#navbar__list a').forEach(anchor => {
        anchor.addEventListener('click', scrollToSection);
    });
    
    // Set sections as active on scroll
    window.addEventListener('scroll', setActiveSection);
    setActiveSection(); // Set initial active section
};

/**
 * End Main Functions
 * Begin Events
 * 
 * Events handle user interactions and triggers for the functions defined above.
 */

/**
 * Build the navigation menu and set up event listeners when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', initApp);
