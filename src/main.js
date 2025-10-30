import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.createElement("div");
loader.className = "loader";
document.body.appendChild(loader);
const loadMoreBtn = document.querySelector(".load-more");
loadMoreBtn.style.display = "none";

const PIXABAY_API_KEY = "52959692-31d35c92f7dfbf79895bf5e4e";
let page = 1;
let currentQuery = "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query.",
      position: "bottomRight",
    });
    return;
  }

  currentQuery = query;
  page = 1;
  gallery.innerHTML = "";
  loadMoreBtn.style.display = "none";
  loader.textContent = "Loading images, please wait...";
  loader.style.display = "block";

  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: PIXABAY_API_KEY,
        q: currentQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    if (response.data.hits.length === 0) {
      iziToast.info({
        title: "Info",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "bottomRight",
      });
    } else {
      renderGallery(response.data.hits);
      const lightbox = new SimpleLightbox(".gallery a");
      lightbox.refresh();
      if (response.data.totalHits > 40) {
        loadMoreBtn.style.display = "block";
      }
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "bottomRight",
    });
  } finally {
    loader.style.display = "none";
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page++;
  loader.textContent = "Loading more images, please wait...";
  loader.style.display = "block";

  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: PIXABAY_API_KEY,
        q: currentQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    renderGallery(response.data.hits);
    const lightbox = new SimpleLightbox(".gallery a");
    lightbox.refresh();
    smoothScroll();

    const totalHits = response.data.totalHits;
    const totalPages = Math.ceil(totalHits / 40);

    if (page >= totalPages) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "bottomRight",
      });
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "bottomRight",
    });
  } finally {
    loader.style.display = "none";
  }
});

function renderGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <ul class="info">
          <li class="info-item"><b>Likes</b> ${likes}</li>
          <li class="info-item"><b>Views</b> ${views}</li>
          <li class="info-item"><b>Comments</b> ${comments}</li>
          <li class="info-item"><b>Downloads</b> ${downloads}</li>
        </ul>
      </a>
    `
    )
    .join("");
  gallery.insertAdjacentHTML("beforeend", markup);
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
