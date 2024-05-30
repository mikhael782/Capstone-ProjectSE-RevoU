// let menuList = document.getElementById("menuList")
// menuList.style.maxHeight = "0px";

// function toggleMenu(){
//     if(menuList.style.maxHeight == "0px")
//     {
//         menuList.style.maxHeight = "300px";
//     }
//     else{
//         menuList.style.maxHeight = "0px";
//     }
// }

// Select all <a> elements inside the navbar
const navLinks = document.querySelectorAll('nav a');

// Loop through each <a> element and add click event listener
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default behavior of <a> element
        
        const targetId = link.getAttribute('href'); // Get the target ID from href attribute
        const targetElement = document.querySelector(targetId); // Find the target element by ID
        
        if (targetElement) {
            // Scroll to the target element smoothly
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// menu toggle
const menu = document.getElementById('menu-label');
const sidebar = document.getElementsByClassName('sidebar')[0];

menu.addEventListener('click', function(){
  sidebar.classList.toggle('hide');
  console.log('ok');
})