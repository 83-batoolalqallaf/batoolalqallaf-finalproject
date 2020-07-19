let carts = document.querySelectorAll('.add-to-cart')

let products = [
	{
		name :'BLUE DOUNOT',
		tag : 'bluedounet',
		price : 10,
		inCart: 0 , 
	},
	{
		name :'BRADA',
		tag : "brada",
		price : 12,
		inCart: 0 , 
	},
	{
        name :'•TOM & JEERY ',
		tag : "tom",
		price : 18,
		inCart: 0 , 
	},
    {
        name :'STITCH',
        tag : "stitch",
        price :15,
        inCart: 0 , 
    },
	{
		name :'STREGER THINGS',
		tag : "starngerthings",
		price : 10,
		inCart: 0 , 
	},
	{
		name :'PLAYSTATION',
		tag : "playstation",
		price : 18,
		inCart: 0 , 
	},
	{
		name :'BELLI EILISH',
		tag : "belli",
		price : 10,
		inCart: 0 , 
	},
	{
		name :'JUST DO IT LATER ',
		tag : "doitlater",
		price : 18,
		inCart: 0 , 
	},

];

for(let i=0 ; i< carts.length ; i++){
    carts[i].addEventListener('click',() => {
        cartsNumber(products[i])
        totalCost(products[i])
    })
}
function onLoadCartNumber(){
    let productsNumbers = localStorage.getItem("cartsNumber")
if(productsNumbers ){
    document.querySelector('.cart span').textContent = productsNumbers;
}
}

function cartsNumber(product){
    // console.log("product clicked is ", product )
let productsNumbers = localStorage.getItem("cartsNumber",1)
productsNumbers = parseInt(productsNumbers)

if(productsNumbers){
    localStorage.setItem("cartsNumber" , productsNumbers + 1 )
	document.querySelector('.cart span').textContent = productsNumbers + 1   ;
}else{
    localStorage.setItem("cartsNumber" ,1 )
    document.querySelector('.cart span').textContent = 1 ;

}
setItems(product)

}

function setItems(product){
    let CartItems = localStorage.getItem("productsInCart")
    CartItems = JSON.parse(CartItems)

    if(CartItems != null){

        if(CartItems[product.tag] == undefined){
            CartItems={
                ...CartItems,
                [product.tag]:product
            }
        }
        CartItems[product.tag].inCart += 1 ;
    }else{
        product.inCart = 1;
         CartItems= {
            [product.tag]: product
    }
    }
    localStorage.setItem("productsInCart" , JSON.stringify(CartItems))
}

function totalCost(product){
// console.log("The product price is", product.price)
let cartCost = localStorage.getItem("totalCost")
console.log("cost is ",cartCost)
console.log( typeof cartCost)

if(cartCost != null){
	cartCost  = parseInt(cartCost)
	localStorage.setItem("total cost is ", cartCost + product.price )
}else{
	localStorage.setItem("totalCost",product.price)
}
}


function displayCart(){
let CartItems = localStorage.getItem("productsInCart")
CartItems = JSON.parse(CartItems)

let productContainer = document.querySelector(".product")
let cartCost = localStorage.getItem("totalCost")
console.log(CartItems)
if( CartItems  && productContainer){
	productContainer.innerHTML = '';
	Object.values(CartItems).map(item => {
		productContainer.innerHTML += `
		<div class="product">
		<ion-icon name="close-circle"></ion-icon>
	<img src="../images/${item.tag}.png">
		<span>${item.name}</span>
		</div>
		<div class="cart-price">${item.price}KD</div>
		<div class="quantity">
		<ion-icon name="caret-back-circle"></ion-icon>
		<span class="">${item.inCart}</span>
		<ion-icon name="caret-forward-circle"></ion-icon>
		</div>
		`
	})
}
	productContainer.innerHTML += `
	<div class="basketTotalContainer">
	
	<h4 class="basketTotal">${cartCost}KD</h4>
	</div>
	`
}
					
onLoadCartNumber()
displayCart()