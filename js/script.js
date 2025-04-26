let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  let top = window.scrollY + 1; // Add a small offset to avoid precision issues

  sections.forEach((sec) => {
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    // Check if the scroll position is within the current section
    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove("active"); // Remove active from all links
      });
      document
        .querySelector(`header nav a[href*="${id}"]`)
        ?.classList.add("active"); // Add active to the correct link
    }
  });
};
document.addEventListener('wheel', function (event) {
  event.preventDefault(); // Prevent the default scrolling behavior
  const scrollSpeed = 6; // Adjust this value to control the speed (lower = slower)
  window.scrollBy({
    top: event.deltaY * scrollSpeed, // Multiply the scroll delta by the speed factor
    behavior: 'smooth', // Smooth scrolling effect
  });
}, { passive: false });
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
 // Initialize Socket.IO with explicit URL and options
 const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  reconnectionAttempts: 5
});

const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const userCount = document.getElementById('user-count');

// Debug connection events
socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});
socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
  messages.innerHTML += '<li class="text-red-500 italic py-2">Failed to connect to server. Please try refreshing.</li>';
});

// Prompt for username
let username = prompt('Enter your username:') || 'Anonymous';
socket.emit('user joined', username);
console.log('Emitted user joined:', username);

// Send message
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
      socket.emit('chat message', { username, message });
      console.log('Sent message:', { username, message });
      messageInput.value = '';
  }
});

// Send message on Enter key
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      sendButton.click();
  }
});

// Receive message
socket.on('chat message', ({ username, message }) => {
  console.log('Received message:', { username, message });
  const li = document.createElement('li');
  li.className = 'py-2';
  li.innerHTML = `<strong>${username}:</strong> ${message}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// Update user count
socket.on('user count', (count) => {
  console.log('User count updated:', count);
  userCount.textContent = count;
});

// System message
socket.on('system message', (msg) => {
  console.log('System message:', msg);
  const li = document.createElement('li');
  li.className = 'text-gray-500 italic py-2';
  li.textContent = msg;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});