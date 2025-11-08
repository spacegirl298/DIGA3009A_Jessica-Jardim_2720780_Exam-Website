// Safe Dollar Studios games data with actual Itch.io slugs and owners
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

  // Get year from multiple possible sources, in order of priority
  let year = "2023";
  if (game.published_at) {
    year = new Date(game.published_at).getFullYear();
  } else if (game.releaseDate) {
    year = new Date(game.releaseDate).getFullYear();
  }

  // Use custom owner if provided, otherwise default to safe-dollar-studios
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
// Function to fetch game data from Itch.io API with better error handling
async function fetchGameData(gameSlug) {
  return new Promise((resolve, reject) => {
    // Check if Itch.io API is available
    if (typeof Itch === "undefined") {
      reject(new Error("Itch.io API not loaded"));
      return;
    }

    // Set timeout for API call
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

// Function to load all games with better error handling
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
        // Return fallback data if API fails
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

// Create fallback game data
function createFallbackGameData(game) {
  return {
    ...game,
    published_at: game.releaseDate
      ? new Date(game.releaseDate).toISOString()
      : new Date(2023, Math.floor(Math.random() * 12), 1).toISOString(),
    short_text: game.description,
    cover_url: null, // Force use of fallback image
  };
}
// Function to display games
function displayGames(games) {
  const gamesContainer = document.getElementById("games-container");

  if (!games || games.length === 0) {
    gamesContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No games found matching your search.</p>
      </div>
    `;
    return;
  }

  gamesContainer.innerHTML = games.map((game) => createGameCard(game)).join("");
}

// Function to load demo data as fallback
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

    // Show notification about using demo data
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

// Function to search games
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

// Function to initialize the application
function init() {
  // Add event listeners first for better UX
  document.getElementById("search-btn").addEventListener("click", searchGames);
  document.getElementById("reset-btn").addEventListener("click", () => {
    document.getElementById("search-input").value = "";
    displayGames(allGames);
  });

  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchGames();
    }
  });

  // Load games
  loadGames();

  // Fallback if loading takes too long
  setTimeout(() => {
    const gamesContainer = document.getElementById("games-container");
    if (gamesContainer && gamesContainer.querySelector(".loading")) {
      console.log("Loading taking too long, switching to demo data...");
      loadDemoData();
    }
  }, 7000);
}

// Initialize when DOM is loaded
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

