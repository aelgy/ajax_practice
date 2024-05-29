const list = document.querySelector('#list')
const url = 'https://fakestoreapi.com/products'
let a = [];

function loadProduct() {
  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(json => {
      a = json;
      if (list.firstElementChild) {
        list.innerHTML = '';
      } else {
        render();
      }
    })
    .catch(error => {
      const itemId = document.querySelector('#id');
      const errorMessage = document.createElement('div')
      errorMessage.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>抱歉，請稍後重新嘗試。</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      itemId.append(errorMessage)
    })
}

function render() {
  let str = "";
  a.forEach((item) => {
    str += `
        <li class="col-md-4 col-lg-3 mb-3">
          <div class="card text-bg-light h-100">
            <img class="object-fit-contain h-50" src="${item.image}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title flex-grow-1 mt-5">${item.title}</h5>
              <div class="container">
                <div class="row">
                  <button id="detail" class="btn btn-primary col-5" data-id="${item.id}">Details</button>
                  <div class="col"></div>
                  <button id="delete" class="btn btn-danger col-5" data-id="${item.id}">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </li>
    `;
  })
  list.innerHTML = str;
}


const btn = document.querySelector('#btn');
btn.onclick = loadProduct;

// show Alert function
function showAlert(id) {
  fetch(url + "/" + id)
    .then(res => {
      return res.json()
    })
    .then(json => {
      a = json;
      alert(a.id);
      alert(a.category);
      alert(a.description);
    })
}

// listen to data panel
list.addEventListener('click', event => {
  if (event.target.matches('.btn-primary')) {
    showAlert(event.target.dataset.id)
  };
  if (event.target.matches('.btn-danger')) {
    // 刪掉整條 li
    const li = event.target.closest("li");
    list.removeChild(li);
  };
})
