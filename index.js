// console.log("connected");
const loadallproduct = async()=>{
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;

}


const setallmenu = async()=>{
    const data = await loadallproduct();
    // console.log(data);
    const menu = document.getElementById("all-menu");

    const uniquearry = [];
    for (const i of data){
        // console.log(i.category);

        if (uniquearry.indexOf(i.category) ===-1)
        {
            uniquearry.push(i.category)
            const li = document.createElement('li');
            li.innerHTML = `<a>${i.category}</a>`
            menu.appendChild(li);
        }
    }

}
setallmenu();

// loadallproduct();

const searchfield = document.getElementById("search-field");
searchfield.addEventListener("keypress", async(event)=>{
    // console.log(event);
    if (event.key === "Enter"){
        // console.log(event);
        const searchvalue = searchfield.value;
        const allproduct = await loadallproduct();
        // console.log(allproduct);
        const foundproduct = allproduct.filter(product => product.category.includes(searchvalue))
        // console.log(foundproduct);
        const productcontainer = document.getElementById("product-container");
        productcontainer.textContent ="";
        const notfound = document.getElementById("product-container");
        notfound.textContent="";

        if(foundproduct.length === 0){
            // console.log("NOT FOUND");
            notfound.innerHTML = `<h2 class="text-red-400 text-2xl text-center"> Product you find that is not here</h2>`
            return;
        }


        foundproduct.forEach(product => {
            // console.log(product);
            const {category, image, title} =product;



            const div = document.createElement("div");
            div.innerHTML=`<div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src=${image} alt="Shoes" class="h-80 w-full" /> </figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title}</p>
              <div class="card-actions justify-end">
                <label for="my_modal_6" class="btn btn-primary">Show details</label>
              </div>
            </div>
          </div>`
          productcontainer.appendChild(div);
        });
    }
    
})