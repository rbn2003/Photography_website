const images = Array.from(document.querySelectorAll(".gallery img"));

if (images.length > 0) {
  // Build the lightbox overlay once and add it to the page
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `
    <button class="lb-close" aria-label="Close">×</button>
    <button class="lb-prev" aria-label="Previous photo">‹</button>
    <img alt="">
    <button class="lb-next" aria-label="Next photo">›</button>
    <p class="lb-count"></p>
  `;
  document.body.appendChild(box);

  const bigImg = box.querySelector("img");
  const count = box.querySelector(".lb-count");
  let current = 0;

  function show(index) {
    current = (index + images.length) % images.length;   // wraps around at both ends
    bigImg.src = images[current].src;
    bigImg.alt = images[current].alt;
    count.textContent = `${current + 1} / ${images.length}`;
  }

  function open(index) {
    show(index);
    box.classList.add("open");
  }

  function close() {
    box.classList.remove("open");
  }

  // Click a thumbnail to open it
  images.forEach((img, i) => img.addEventListener("click", () => open(i)));

  // Buttons
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(current + 1));

  // Click the dark background to close
  box.addEventListener("click", (e) => {
    if (e.target === box) close();
  });

  // Keyboard: Esc closes, arrows navigate
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Swipe on phones
  let startX = 0;
  box.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
  box.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
  });
}