import { auth } from "./firebase.js";
import { APP_CONFIG } from "./config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const emailEl = document.getElementById("email");
const logoutBtn = document.getElementById("logout");
const banner = document.getElementById("banner");
const photo = document.getElementById("photo");
const profileText = document.getElementById("profileText");

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./index.html";
});

function safeStr(v) {
  return (v === null || v === undefined) ? "" : String(v);
}

async function loadRoster(email) {
  const url = `${APP_CONFIG.rosterApiUrl}?email=${encodeURIComponent(email)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

onAuthStateChanged(auth, async (user) => {
  if (!user?.email) {
    window.location.href = "./index.html";
    return;
  }

  emailEl.textContent = user.email;

  try {
    const data = await loadRoster(user.email);

    if (!data.ok) {
      profileText.textContent = `Roster error: ${data.error || "Unknown error"}\nEmail: ${user.email}`;
      photo.src = APP_CONFIG.defaultAvatar;
      return;
    }

    const s = data.student;
    const isActive = !!s.isActive;

    // photo fallback
    photo.src = safeStr(s.photoURL) || APP_CONFIG.defaultAvatar;
    photo.onerror = () => (photo.src = APP_CONFIG.defaultAvatar);

    profileText.textContent =
      `Name: ${safeStr(s.name)}\n` +
      `RollNo: ${safeStr(s.rollNo)}\n` +
      `Batch: ${safeStr(s.batch)}\n` +
      `Section: ${safeStr(s.section)}\n` +
      `Email: ${safeStr(s.email)}\n` +
      `HostelType: ${safeStr(s.hostelType)}\n` +
      `Hostel: ${safeStr(s.hostel)}\n` +
      `RoomNo: ${safeStr(s.roomNo)}\n` +
      `Active: ${isActive}`;

    if (!isActive) {
      banner.style.display = "block";
    }
  } catch (err) {
    console.error(err);
    profileText.textContent = "Failed to load roster: " + (err?.message || err);
    photo.src = APP_CONFIG.defaultAvatar;
  }
});
