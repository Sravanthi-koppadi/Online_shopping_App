//elements references
const productcontainer=document.getElementById("online-shopping-container");
const productrow=document.getElementById("product-row");
const cardcontainer=document.getElementById("cardcontainer");
const feedback=document.getElementById("feedback");
const clearcart=document.getElementById("clearcart");
const sortbyprice=document.getElementById("sortbyprice");

// default products

const products=[{
    id:1,
    name1:"Laptop",
    price:50000,
},
{
    id:2,
    name1:"Phone",
    price:20000,
},{
    id:3,
    name1:"Tablet",
    price:5000,
},{
    id:4,
    name1:"Smartwatch",
    price:1000,
},
{
    id:5,
    name1:"Headphones",
    price:500,
},
];
const cart=[];
//reset the timer
let timer;

clearcart.addEventListener('click',clearfromcart);

sortbyprice.addEventListener('click',sortcart);

function rendorproductdetails(){
    products.forEach(function(product){
//     const productbox=`<div class="product-row">
//     <p>${value.name1} :- Rs.${value.price}</p>
//     <button>Add to cart </button>
//     </div>`;
//     productcontainer.insertAdjacentHTML("beforeend",productbox);
// });


const {id,name1, price}=product;
const divelement=document.createElement("div");
divelement.className="product-row";
divelement.innerHTML=` <p>${name1} :- Rs.${price}</p>
<button onclick="addtoCart(${id})">Add to cart </button>
`;
productrow.appendChild(divelement);
});
}

function rendorcart(){
    cardcontainer.innerHTML="";
    cart.forEach(function(product){
        const{id,name1,price}=product;
        
  const carditem=`<div class="product-row" ><p>${name1}-Rs.${price}</p><button onclick="removefromcart(${id})">remove</button></div>`;
  cardcontainer.insertAdjacentHTML("beforeend",carditem);

    });
    // let totalprice=0;
    console.log(cart);
    // for(let i=0;i<cart.length;i++){
    //     totalprice=totalprice+cart[i].price
    // }

    const totalprice=cart.reduce(function(acc,curproduct){
        return acc+curproduct.price;
    },0);

    document.getElementById("totalprice").textContent=`Rs. ${totalprice}`;
      
}
//listeners

function clearfromcart(){
cart.length=0;
    rendorcart();
    updateuserfeedback('cart is cleared',"succes");
}

function sortcart(){
    cart.sort(function(item1,item2){
        return item1.price-item2.price;
});
rendorcart();
}
// const test=document.getElementById("testing");
// test.addEventListener('click',function(){
//     console.log(divelement);
// })
//add to cart
function addtoCart(id){
  console.log("add to cart ",id);
  const isincart=cart.some(function(product){
    return product.id===id;
  });
  if(isincart){
    const productToAdd=products.find(function(product){
        return product.id===id;
    }); 
    updateuserfeedback(`${productToAdd.name1} already added to the cart`,"error");
    // feedback.style.backgroundColor="red";
    return;
  }
  const productToAdd=products.find(function(product){
    return product.id===id;
  }) ; 
  console.log(productToAdd);
  cart.push(productToAdd);
  console.log(cart);
  rendorcart();

  //reuse
  updateuserfeedback(`${productToAdd.name1} is added to the cart`,"succes");
}
  
function removefromcart(id){
    const product1=cart.find((product)=>product.id===id);
    console.log(id);
    const updatedcart=cart.filter(function(product){
        return product.id!==id;
    });
    cart.length = 0;
    updatedcart.forEach(function(product){
        cart.push(product);
    });
    console.log(cart);
    // REMOVE THE LINE WITH product.name HERE
    rendorcart();
    
    const removedProduct = products.find(function(product){
        return product.id === id;
    });
    updateuserfeedback(`${removedProduct.name1} removed from cart`, "error");
}

function updateuserfeedback(msg,type){
    clearTimeout(timer);
    feedback.style.display="block";
    //succes green error red
    if(type==="succes"){
        feedback.style.backgroundColor="green";
    }
    if(type==="error"){
        feedback.style.backgroundColor="red"
    }
feedback.textContent=msg;

timer=setTimeout(function(){
    feedback.style.display="none";
},3000); 
}

//rendoring product details
rendorproductdetails();