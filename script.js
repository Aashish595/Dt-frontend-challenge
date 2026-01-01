import { data } from "./data.js";


const hero = document.getElementById("hero");
const dashboard = document.getElementById("dashboard");

/* ================= TASK ================= */
const task = data.tasks[0];

const sidebar = document.getElementById("sidebar");
const sidebarContent = document.getElementById("sidebarContent");
const toggleBtn = document.getElementById("sidebarToggle");

/* ================= SIDEBAR ITEMS ================= */
sidebarContent.innerHTML = task.assets
  .map(
    (asset) => `
      <div class="sidebar-item">
        <span>${asset.asset_title}</span>
      </div>
    `
  )
  .join("");

/* ================= TOGGLE ================= */
let isOpen = false;

toggleBtn.addEventListener("click", () => {
  isOpen = !isOpen;

  sidebar.classList.toggle("expanded", isOpen);
  sidebar.classList.toggle("collapsed", !isOpen);

  toggleBtn.src = isOpen
    ? "assets/close.png"
    : "assets/open.png";
});

/* ================= HERO ================= */
const videoAsset = task.assets.find((a) => a.asset_content_type === "video");

hero.innerHTML = `
  <div class="hero-header">
    <h1>${videoAsset.asset_title}</h1>
    <button class="submit-btn">Submit task</button>
  </div>

  <div class="hero-description">
    <h3>${task.task_title}</h3>
    <p>${task.task_description}</p>
  </div>
`;

/* ================= DASHBOARD ================= */
task.assets.forEach((asset) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-header">${asset.asset_title}</div>
    <div class="card-body">
     <div class="card-desc">
  <strong>Description:</strong>
  <span>${asset.asset_description}</span>
</div>


      ${renderAsset(asset)}
    </div>
  `;

  dashboard.appendChild(card);
});

/* ================= RENDERER ================= */
function renderAsset(asset) {
  switch (asset.asset_content_type) {
    case "video":
      return `<iframe src="${asset.asset_content}" allowfullscreen></iframe>`;

    case "threadbuilder":
      return `
        <h4>Thread A</h4>

        <div class="thread-row">
          <input placeholder="Sub thread 1" />
          <input placeholder="Sub interpretation 1" />
        </div>

        <div class="thread-actions">
           <button class="icon-btn">
    <img src="assets/group.png" alt="idea" />
  </button>

          <select><option>Select Category</option></select>
          <select><option>Select Process</option></select>
        </div>

        <button class="sub-btn">+ Sub-thread</button>
        <textarea placeholder="Summary for Thread A"></textarea>
      `;

    case "article":
      return `
        <input placeholder="Title" />
        <textarea placeholder="Write your article here..."></textarea>
      `;

    case "4sa":
      return `
        <div class="four-sa">
          ${asset.asset_content
            .map(
              (item) => `
                <div class="four-sa-block">
                  <h4>${item.title}</h4>
                  <p>${item.description}</p>
                </div>
              `
            )
            .join("")}
        </div>
      `;

    default:
      return `<p>Unsupported asset</p>`;
  }
}
