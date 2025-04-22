let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    };
  });
};
document.addEventListener('wheel', function (event) {
  event.preventDefault(); // Prevent the default scrolling behavior
  const scrollSpeed = 2; // Adjust this value to control the speed (lower = slower)
  window.scrollBy({
    top: event.deltaY * scrollSpeed, // Multiply the scroll delta by the speed factor
    behavior: 'smooth', // Smooth scrolling effect
  });
}, { passive: false }); // Set passive to false to allow `preventDefault`
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Imphal West, Manipur",
    "Civil Engineering Department"
  ];

  const span = document.querySelector(".container li span");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      charIndex--;
      span.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex++;
      span.textContent = currentText.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => isDeleting = true, 1000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // Loop to next text
    }

    setTimeout(type, isDeleting ? speed / 2 : speed);
  }

  // Start animation
  type();
});
function updateDateTime() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString(); // Format the date
  const formattedTime = now.toLocaleTimeString(); // Format the time
  document.getElementById('datetime').textContent = `Date: ${formattedDate} | Time: ${formattedTime}`;
}

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initialize the date and time on page load
updateDateTime();
document.querySelectorAll('#gallery .slider-wraper .slider-nav a').forEach((nav, index) => {
  nav.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default anchor behavior

    // Get the slider element
    const slider = document.querySelector('#gallery .slider-wraper .slider');

    // Calculate the width of one slide
    const slideWidth = slider.offsetWidth;

    // Scroll to the corresponding slide
    slider.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth' // Smooth scrolling effect
    });
  });
});
var loader=document.getElementById("preloader");
window.addEventListener("load",function(){
  loader.style.display="none";
})