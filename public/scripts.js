// let block = document.querySelector(".block")
// function forEach(arr){
//     arr.forEach(b => {
//         block.insertAdjacentElement('beforeend', 
//         ` <div class="box">
//             <p>${b.name}</p>
//             <img src="${b.image}" alt="">
//             <b>${b.author}</b>
//             <p>year: ${b.year}</p>
//             <b>${b.price}$</b>
//         </div>`
//         )
//     });
// }

fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(data => {
    const block = document.querySelector(".block")
    data.forEach(b => {
      block.insertAdjacentHTML("beforeend", `
        <div class="box">
          <p><b>${b.name}</b></p>
          <img src="${b.image}" alt="book image">
          <p>Author: ${b.author}</p>
          <p>Year: ${b.year}</p>
          <p>Price: ${b.price}$</p>
        </div>
      `)
    })
  })
  .catch(err => {
    console.error("error:", err)
  })
