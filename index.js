// URLs
const BASE_URL = "https://webdev.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/movies/"
const IMG_URL = BASE_URL + "/posters/"

// 定義變數
const movies = []

// 查找 DOM 節點
const dataPanel = document.querySelector('#data-panel')

// 函式：渲染電影清單
function renderMovieList(data) {
  let rawHTML = ''

  data.forEach((item) => {
    rawHTML += `
     <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img src="${IMG_URL + item.image}" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer text-muted">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-movie">+</button>
            </div>
          </div>
        </div>
      </div>
    `
  })

  dataPanel.innerHTML = rawHTML
}

// 函式：DOM 跳出 Modal windows
function showMovieModal(id) {
  const movieTitle = document.querySelector('#movie-modal-title')
  const movieImage = document.querySelector('#movie-modal-image')
  const movieDate = document.querySelector('#movie-modal-date')
  const movieDescription = document.querySelector('#movie-modal-description')

  axios.get(INDEX_URL + id)
  .then(response => {
    const data = response.data.results
    
    console.log(data.image)
    movieTitle.innerText = data.title
    movieDate.innerText = 'Release Date: ' + data.release_date
    movieDescription.innerText = data.description
    movieImage.innerHTML = `
     <img src=${IMG_URL +  data.image} alt="movie-poster" class="img-fluid">
    `
  })
}

// dataPanel 監聽器
dataPanel.addEventListener('click', function onPanelClicked(event){
  const eventTarget = event.target
  if (eventTarget.matches('.btn-show-movie')){
    showMovieModal(Number(eventTarget.dataset.id))
  }
})

// 非同步處理獲取電影資料
axios.get(INDEX_URL)
.then(response => {
  movies.push(...response.data.results)
  renderMovieList(movies)
})