const safeDollarGames = [
  {
    slug: "lab-rumble",
    title: "Lab Rumble",
    description:
      "A fast-paced 2D projectile brawler where two scientists fight for the last escape ship off a dying Earth. Pick up items around the lab, hurl them at your opponent, and survive the chaos to win.",
    fallbackImage: "./Images/Lab_Rumble_Cover.png",
    owner: "jordanchicksen",
    releaseDate: "2024",
  },
  {
    slug: "fire-keeper-prototype",
    title: "Fire Keeper",
    description:
      "A medieval adventure game where you explore a dark cave with a fading flame. Light campfires, solve puzzles, avoid ghosts, and uncover the world's hidden paths as you fight to keep hope alive.",
    fallbackImage: "./Images/Fire_Keeper_Cover.png",
    owner: "jordanchicksen",
    releaseDate: "2025",
  },
  {
    slug: "arcadia",
    title: "Arcadia",
    description:
      "A fast-paced 2D arcade-style, time-based coin collector game. Master tight controls, dodge obstacles, and grab as many coins as possible to achieve the highest score.",
    fallbackImage: "./Images/Arcadia_Cover.png",
    owner: "rameez-cassim",
    releaseDate: "2025",
  },
  {
    slug: "cozycorners",
    title: "CozyCorners",
    description:
      "An isometric cleaning and decorating game where you turn messy homes into warm, personalized spaces through satisfying cleanup and creative design.",
    fallbackImage: "./Images/CozyCorners_Cover.png",
    owner: "jessica-jardim",
    releaseDate: "2025",
  },
  {
    slug: "desert-skies",
    title: "Desert Skies",
    description:
      "A side-scrolling shoot 'em up where a rebel crew battles powerful corporations. Dodge attacks, defeat enemy waves, and unleash devastating ultimates in a fast-paced, retro-inspired adventure.",
    fallbackImage: "./Images/Desert_Skies_Cover.png",
    owner: "jordanchicksen",
    releaseDate: "2025",
  },
  {
    slug: "escape-room",
    title: "Escape Room",
    description:
      "A puzzle game where you solve challenges, crack codes, and find keys to escape before time runs out.",
    fallbackImage: "./Images/Escape_Room_Cover.png",
    releaseDate: "2025",
  },
  {
    slug: "mage-brothers",
    title: "Mage Brothers",
    description:
      "A 2-player wizard shooter where you cast chaotic spells with surprising side effects. Battle your rival and be the first to 5 kills to claim victory!",
    fallbackImage: "./Images/Mage_Brothers_Cover.png",
    releaseDate: "2025",
  },
  {
    slug: "rogue-slasher",
    title: "Rogue Slasher",
    description:
      "A 3rd-person shooter where you survive waves of enemies, collect rare drops, and craft powerful gear—while the enemies grow stronger with every wave.",
    fallbackImage: "./Images/Rogue_Slasher_Cover.png",
    releaseDate: "2025",
  },
  {
    slug: "sky-isles",
    title: "Sky Isles",
    description:
      "A 3D platformer where you collect gems and coins, solve light puzzles, and explore levels while unlocking fun items along the way.",
    fallbackImage: "./Images/Sky_Isles_Cover.png",
    releaseDate: "2025",
  },
  {
    slug: "space-base",
    title: "Space Base",
    description:
      "An action tower-defense prototype where you defend your central tower from waves of enemies, earn money, and build turrets to survive as long as possible.",
    fallbackImage: "./Images/Space_Base_Cover.png",
    releaseDate: "2025",
  },
  {
    slug: "the-running-man",
    title: "The Running Man",
    description:
      "An endless runner where you dodge obstacles, run on walls, and test your reflexes as the speed keeps increasing.",
    fallbackImage: "./Images/The_Running_Man_Cover.png",
    releaseDate: "2025",
  },
  {
    slug: "three-man-team",
    title: "Three Man Team",
    description:
      "A puzzle platformer where you control three characters with unique abilities—speed, strength, and teleportation—to reach the end of each level.",
    fallbackImage: "./Images/Three_Man_Team_Cover.png",
    releaseDate: "2025",
  },
];

let allGames = [];

function createGameCard(game) {
  const imageUrl = game.cover_url || game.fallbackImage;
  const description =
    game.short_text || game.description || "No description available.";

  let year = "2023";
  if (game.published_at) {
    year = new Date(game.published_at).getFullYear();
  } else if (game.releaseDate) {
    year = new Date(game.releaseDate).getFullYear();
  }

  const owner = game.owner || "safe-dollar-studios";
  const itchUrl = `https://${owner}.itch.io/${game.slug}`;

  return `
    <div class="game-card" data-title="${game.title.toLowerCase()}">
      <img src="${imageUrl}" alt="${
    game.title
  }" class="game-image" onerror="this.src='${
    game.fallbackImage
  }'; this.onerror=null;">
      <div class="game-content">
        <h3 class="game-title">${game.title}</h3>
        <div class="game-meta">
          <span><i class="fas fa-calendar"></i> ${year}</span>
        </div>
        <p class="game-description">${description}</p>
        <div class="game-buttons">
          <a href="${itchUrl}" target="_blank" class="game-link">
            <i class="fab fa-itch-io"></i> View on Itch.io
          </a>
          <a href="${game.title.replace(
            /\s+/g,
            "_"
          )}.html" class="game-link game-link-secondary">
            <i class="fas fa-info-circle"></i> More Info
          </a>
        </div>
      </div>
    </div>
  `;
}

async function fetchGameData(gameSlug) {
  return new Promise((resolve, reject) => {
    if (typeof Itch === "undefined") {
      reject(new Error("Itch.io API not loaded"));
      return;
    }

    const timeout = setTimeout(() => {
      reject(new Error("API timeout"));
    }, 3000);

    Itch.getGameData({
      user: "safe-dollar-studios",
      game: gameSlug,
      onComplete: function (data) {
        clearTimeout(timeout);
        if (data && data.title) {
          resolve(data);
        } else {
          reject(new Error(`No data found for ${gameSlug}`));
        }
      },
      onError: function (error) {
        clearTimeout(timeout);
        reject(error);
      },
    });
  });
}

function setupGSAPAnimations() {
  const masterTL = gsap.timeline();

  masterTL.fromTo(
    ".entry-title",
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  );

  masterTL.fromTo(
    ".search-controls",
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
    "-=0.5"
  );

  setupFloatingOrbs();

  setupMotionPath();

  setupScrollAnimations();

  return masterTL;
}

function setupFloatingOrbs() {
  gsap.to("#orb1", {
    motionPath: {
      path: [
        { x: 100, y: 100 },
        { x: 300, y: 50 },
        { x: 500, y: 150 },
        { x: 300, y: 250 },
        { x: 100, y: 100 },
      ],
      curviness: 1.5,
    },
    duration: 25,
    repeat: -1,
    ease: "sine.inOut",
    opacity: 0.6,
    scale: 1.2,
  });

  gsap.to("#orb2", {
    motionPath: {
      path: [
        { x: window.innerWidth - 150, y: 200 },
        { x: window.innerWidth - 300, y: 100 },
        { x: window.innerWidth - 150, y: 200 },
        { x: window.innerWidth - 300, y: 300 },
        { x: window.innerWidth - 150, y: 200 },
      ],
    },
    duration: 20,
    repeat: -1,
    ease: "power1.inOut",
    opacity: 0.4,
    scale: 0.8,
    delay: 5,
  });

  gsap.to("#orb3", {
    motionPath: {
      path: [
        { x: 200, y: window.innerHeight - 100 },
        { x: 400, y: window.innerHeight - 50 },
        { x: 300, y: window.innerHeight - 200 },
        { x: 150, y: window.innerHeight - 150 },
        { x: 200, y: window.innerHeight - 100 },
      ],
      curviness: 2,
    },
    duration: 30,
    repeat: -1,
    ease: "sine.inOut",
    opacity: 0.3,
    scale: 1.5,
    delay: 10,
  });
}

function setupMotionPath() {
  const motionPathElement = document.getElementById("motionPathElement");

  if (window.innerWidth > 768) {
    motionPathElement.style.display = "block";

    gsap.to(motionPathElement, {
      motionPath: {
        path: [
          { x: 50, y: 100 },
          { x: 200, y: 50 },
          { x: 400, y: 150 },
          { x: 600, y: 80 },
          { x: 800, y: 200 },
          { x: 1000, y: 100 },
          { x: 1200, y: 250 },
        ],
        curviness: 1.8,
        autoRotate: true,
      },
      scale: 1.5,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      opacity: 0.7,
    });
  }
}

function setupScrollAnimations() {
  gsap.utils.toArray(".game-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        y: 100,
        opacity: 0,
        rotationY: 15,
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      }
    );
  });

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      gsap.to(".search-controls", {
        scale: 1.02,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    });

    searchInput.addEventListener("blur", () => {
      gsap.to(".search-controls", {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
}

function animateGameCardsSequentially() {
  const cards = gsap.utils.toArray(".game-card");

  const cardTimeline = gsap.timeline({
    defaults: { duration: 0.6, ease: "power2.out" },
  });

  cards.forEach((card, index) => {
    cardTimeline.fromTo(
      card,
      {
        y: 50,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        delay: index * 0.1,
      },
      index * 0.05
    );
  });

  return cardTimeline;
}

function setupGameCardHoverAnimations() {
  const cards = document.querySelectorAll(".game-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out",
      });

      const image = card.querySelector(".game-image");
      gsap.to(image, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      const image = card.querySelector(".game-image");
      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
}

async function loadGames() {
  const gamesContainer = document.getElementById("games-container");

  try {
    gamesContainer.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>Loading games from Safe Dollar Studios...</p>
      </div>
    `;

    const gamePromises = safeDollarGames.map(async (game) => {
      try {
        const apiData = await fetchGameData(game.slug);
        return {
          ...game,
          ...apiData,
        };
      } catch (error) {
        console.warn(`Failed to fetch data for ${game.slug}:`, error.message);

        return createFallbackGameData(game);
      }
    });

    allGames = await Promise.all(gamePromises);
    displayGames(allGames);
  } catch (error) {
    console.error("Error loading games:", error);
    loadDemoData();
  }
}

function createFallbackGameData(game) {
  return {
    ...game,
    published_at: game.releaseDate
      ? new Date(game.releaseDate).toISOString()
      : new Date(2023, Math.floor(Math.random() * 12), 1).toISOString(),
    short_text: game.description,
    cover_url: null,
  };
}

function displayGames(games) {
  const gamesContainer = document.getElementById("games-container");

  if (!games || games.length === 0) {
    gamesContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No games found matching your search.</p>
      </div>
    `;

    gsap.fromTo(
      ".no-results",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
    return;
  }

  gamesContainer.innerHTML = games.map((game) => createGameCard(game)).join("");

  setTimeout(() => {
    animateGameCardsSequentially();
    setupGameCardHoverAnimations();
  }, 100);
}

function loadDemoData() {
  const gamesContainer = document.getElementById("games-container");

  gamesContainer.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading demo data...</p>
    </div>
  `;

  setTimeout(() => {
    allGames = safeDollarGames.map((game, index) =>
      createFallbackGameData(game)
    );
    displayGames(allGames);

    const notification = document.createElement("div");
    notification.className = "error";
    notification.style.marginBottom = "20px";
    notification.innerHTML = `
      <i class="fas fa-info-circle"></i>
      <p>Showing demo data. Itch.io API may be unavailable.</p>
    `;
    gamesContainer.insertBefore(notification, gamesContainer.firstChild);
  }, 1000);
}

function searchGames() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (!searchTerm) {
    displayGames(allGames);
    return;
  }

  const filteredGames = allGames.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm) ||
      (game.short_text && game.short_text.toLowerCase().includes(searchTerm))
  );

  displayGames(filteredGames);
}

function init() {
  document.getElementById("search-btn").addEventListener("click", searchGames);
  document.getElementById("reset-btn").addEventListener("click", () => {
    document.getElementById("search-input").value = "";
    displayGames(allGames);

    gsap.to(".games-grid", {
      scale: 1.02,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  });

  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchGames();

      gsap.to("#search-btn", {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  });

  const masterTimeline = setupGSAPAnimations();

  loadGames();

  setTimeout(() => {
    const gamesContainer = document.getElementById("games-container");
    if (gamesContainer && gamesContainer.querySelector(".loading")) {
      console.log("Loading taking too long, switching to demo data...");
      loadDemoData();
    }
  }, 7000);
}

window.addEventListener("resize", () => {
  const motionPathElement = document.getElementById("motionPathElement");
  if (window.innerWidth <= 768) {
    motionPathElement.style.display = "none";
    gsap.killTweensOf(motionPathElement);
  } else {
    motionPathElement.style.display = "block";
    setupMotionPath();
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Back to top button
const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.pageYOffset > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
