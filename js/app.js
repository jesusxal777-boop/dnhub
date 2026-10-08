// DNHub App - Ready for Supabase integration

const categories = [
  "Amateur", "MILF", "Lesbian", "Anal", "Hardcore",
  "Blonde", "Brunette", "POV", "Threesome", "Fetish"
];

// Sample data (replace later with Supabase)
let videos = [
  { id: 1, title: "Intense Amateur Night", category: "amateur", duration: "12:45", views: "1.2M", thumb: "https://picsum.photos/seed/v1/400/225" },
  { id: 2, title: "MILF Seduction", category: "milf", duration: "18:20", views: "890K", thumb: "https://picsum.photos/seed/v2/400/225" },
  { id: 3, title: "Lesbian Passion", category: "lesbian", duration: "15:10", views: "2.1M", thumb: "https://picsum.photos/seed/v3/400/225" },
  { id: 4, title: "Deep Anal Session", category: "anal", duration: "22:05", views: "1.5M", thumb: "https://picsum.photos/seed/v4/400/225" },
  { id: 5, title: "Hardcore Encounter", category: "hardcore", duration: "19:30", views: "3.4M", thumb: "https://picsum.photos/seed/v5/400/225" },
  { id: 6, title: "Blonde Bombshell", category: "blonde", duration: "14:55", views: "760K", thumb: "https://picsum.photos/seed/v6/400/225" },
  { id: 7, title: "Brunette Desire", category: "brunette", duration: "16:40", views: "980K", thumb: "https://picsum.photos/seed/v7/400/225" },
  { id: 8, title: "POV Experience", category: "pov", duration: "11:15", views: "2.8M", thumb: "https://picsum.photos/seed/v8/400/225" }
];

function renderCategories() {
  const container = document.getElementById("categories");
  container.innerHTML = categories.map(cat => `
    <div class="cat-card" data-cat="${cat.toLowerCase()}">
      <span>${cat}</span>
    </div>
  `).join("");

  document.querySelectorAll(".cat-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.cat;
      filterVideos(cat);
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    });
  });
}

function renderVideos(list = videos) {
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = list.map(v => `
    <div class="video-card" data-id="${v.id}">
      <div class="video-thumb">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy" />
        <span class="duration">${v.duration}</span>
      </div>
      <div class="video-info">
        <h3>${v.title}</h3>
        <div class="video-meta">
          <span>${v.views} views</span>
          <span class="badge">${v.category.toUpperCase()}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function filterVideos(category) {
  if (category === "all") {
    renderVideos(videos);
  } else {
    const filtered = videos.filter(v => v.category === category);
    renderVideos(filtered);
  }
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterVideos(btn.dataset.filter);
  });
});

// Search
document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(q) || v.category.includes(q)
  );
  renderVideos(filtered);
});

// Init
renderCategories();
renderVideos();

/* ======================================================
   SUPABASE INTEGRATION (when ready)
   ======================================================
   1. Create free project at supabase.com
   2. Create table "videos" with columns:
      id (int8), title (text), category (text), duration (text),
      views (text), thumb (text), video_url (text)
   3. Get Project URL + anon public key
   4. Uncomment and fill below:

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://TU-PROJECT.supabase.co'
const SUPABASE_ANON_KEY = 'TU_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function loadFromSupabase() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.error(error)
    return
  }
  videos = data
  renderVideos(videos)
}

loadFromSupabase()
====================================================== */