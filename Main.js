// Base path for GitHub Pages
const basePath = "/DIGA3009A_Jessica_Jardim_2720780_Exam_Website/";

window.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (!header || !footer) return;

  const currentPath = window.location.pathname;

  // Determine if we're on homepage or in a subdirectory
  const isHome =
    currentPath.endsWith("/") ||
    currentPath.endsWith("index.html") ||
    currentPath.endsWith(basePath) ||
    currentPath.endsWith(basePath + "index.html");

  let pathPrefix;
  if (isHome) {
    pathPrefix = "./";
  } else {
    pathPrefix = "../";
  }

  // Navbar
  header.innerHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <div class="hamburger" id="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <img src="${pathPrefix}Home/Images/Logo_Nav_White.png" class="nav_logo" alt="SDS logo">
        <ul class="nav-menu" id="nav-menu">
          <li><a href="${pathPrefix}index.html">Home</a></li>
          <li><a href="${pathPrefix}Games/Games.html">Games</a></li>
          <li><a href="${pathPrefix}About_Us/About_Us.html">About Us</a></li>
          <li><a href="${pathPrefix}Team/Team.html">Team</a></li>
          <li><a href="${pathPrefix}Contact_Us/Contact_Us.html">Contact Us</a></li>
        </ul>
      </div>
    </nav>
  `;

  const logo = document.querySelector(".nav_logo");
  if (logo) {
    logo.style.filter = "brightness(0) invert(1)";
  }

  (function () {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-menu a").forEach((a) => {
      const linkFile = a.getAttribute("href").split("/").pop();
      if (
        linkFile === current ||
        (current === "" && linkFile === "index.html")
      ) {
        a.classList.add("active");
        a.style.pointerEvents = "none";
        a.style.opacity = "0.6";
        a.style.cursor = "default";
      }
    });
  })();

  //  Footer
  footer.innerHTML = `
    <nav class="footer-nav">
      <ul>
        <li>
          <a href="https://safe-dollar-studios.itch.io/" target="_blank">
            <img src="${pathPrefix}Home/Images/Itch_Logo_Black.png" alt="Itch black">
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/safedollarstudios" target="_blank">
            <img src="${pathPrefix}Home/Images/Instagram_Logo_Black.png" alt="Instagram black">
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@safedollarstudios" target="_blank">
            <img src="${pathPrefix}Home/Images/TikTok_Logo_Black.png" alt="TikTok black">
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/safe-dollar-studios-047961351/" target="_blank">
            <img src="${pathPrefix}Home/Images/Linkedin_Logo_Black.png" alt="LinkedIn black">
          </a>
        </li>
      </ul>
      <div class="footer-bottom">
        <p>© 2025 Safe Dollar Studio. All Rights Reserved.</p>
      </div>
    </nav>
  `;

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  document.body.classList.toggle("dark-mode", prefersDark.matches);
  prefersDark.addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode", e.matches);
  });
});
