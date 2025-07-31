const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentImages = []; // filtered images
let currentIndex = 0;

// 💡 Function to update currentImages based on visible cards
function updateVisibleImages() {
  currentImages = Array.from(
    gallery.querySelectorAll(".image-card")
  )
    .filter(card => card.style.display !== "none")
    .map(card => card.querySelector("img"));
}

// 💡 On image click, open lightbox with that image
gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    updateVisibleImages(); // update based on current view
    currentIndex = currentImages.indexOf(e.target);

    if (currentIndex !== -1) {
      lightboxImg.src = e.target.src;
      lightbox.classList.remove("hidden");
    }
  }
});

// 💡 Close the lightbox
function closeLightbox() {
  lightbox.classList.add("hidden");
}

// 💡 Navigate within current image set
function changeImage(direction) {
  if (!currentImages.length) return;

  currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

// 💡 Filter images by category
function filterImages(category) {
  const cards = document.querySelectorAll(".image-card");

  cards.forEach(card => {
    const show = category === "all" || card.classList.contains(category);
    card.style.display = show ? "block" : "none";
  });

  updateVisibleImages(); // update list immediately when filter changes
}
