// // When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// // Get the navbar
var navbar = document.getElementById("navbar");

// // Get the offset position of the navbar
var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}








const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


// SOCIAL PANEL JS
 const floating_btn = document.querySelector('.floating-btn');
 const close_btn = document.querySelector('.close-btn');
 const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

 close_btn.addEventListener('click', () => {
 	social_panel_container.classList.remove('visible')
});


// ---------------------------CART---------------------------------------------------------------

let carts = document.querySelectorAll('.add-to-cart')

let products = [
	{
		name :'AND CHILL',
		tag : 'andchill',
		price : 20,
		inCart: 0 , 
	},
	{
		name :'OLDSCHOOL',
		tag : "oldschool",
		price : 20,
		inCart: 0 , 
	},
	{
        name :'ASSC',
		tag : "assc",
		price : 25,
		inCart: 0 , 
	},
    {
        name :'UM OK',
        tag : "UMOK",
        price :14,
        inCart: 0 , 
    },
	{
		name :'ARIES',
		tag : "aries",
		price : 14,
		inCart: 0 , 
	},
	{
		name :'ASSC',
		tag : "assct",
		price : 14,
		inCart: 0 , 
	},
	{
		name :'MAKE MONEY',
		tag : "MAKEMONEY",
		price : 14,
		inCart: 0 , 
	},
	{
		name :'IN.N.OUT',
		tag : "innout",
		price : 14,
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
		<div class="cart-price">${item.price}</div>
		<div class="quantity">
		<ion-icon name="caret-back-circle"></ion-icon>
		<span class="">${item.inCart}</span>
		<ion-icon name="caret-forward-circle"></ion-icon>
		</div>
		`
	})
}
	// productContainer.innerHTML += `
	// <div class="basketTotalContainer">
	// <h4 class="basketTotalTitle">Basket total</h4>
	// <h4 class="basketTotal">${cartCost}KD</h4>
	// </div>
	// `
}
					
onLoadCartNumber()
displayCart()