// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// search box
const business = [
  {name : "Hoodies.ku"},
  {name : "Hoodies_station"},
  {name : "Js_hoodies"},
  {name : "Mamaroro.kw"},
  {name : "Khosh.kw"},
  {name : "Crystalsaraf"},
  {name : "Trend.it.kw"},
  {name :"Delightfulbite"},
  {name : "Weknots"},
];

const list = document.getElementById("list");

function setList(group){
  clearList();
  for(const busines of group){
    const item = document.createElement("li")
    item.classList.add("list-group-item");
    const text = document.createTextNode(busines.name);
    item.appendChild(text);
    list.appendChild(item)
  }if(group.length === 0 ){
    setNoReasult();
  }
};

function clearList(){

};

function setNoReasult(){
  const item = document.createElement("li")
  item.classList.add("list-group-item");
  const text = document.createTextNode("No Result Found");
  item.appendChild(text);
  list.appendChild(item)
};

function getRelevancy(value ,searchTerm){
  if(value  === searchTerm){
    return 2; 
  } else if (value.startWith(searchTerm)){
    return 1 ; 
  }else if (value.includes(searchTerm)){
    return 0 ; 
  }
}

const searchInput = document.getElementById("search")

searchInput.addEventListener('input', (event) => {
  let value = event.target.value;
  if(value && value.trim().length  > 0 ){
      value = value.trim().toLowerCase();
      setList(business.filter(busines => {
        return busines.name.includes(value);

      }).sort((businesA , businesB) => {
        return getRelevancy(businesB.name , value) - getRelevancy(businesA.name , value);
      }));
  }else {
    clearList();
  }
})



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













function changeTab(ref){
  try {
  if(ref.getAttribute("data-tab") == "login"){
    document.getElementById("form-body").classList.remove('active');
    ref.parentNode.classList.remove('signup');
  } else {
    document.getElementById("form-body").classList.add('active');
    ref.parentNode.classList.add('signup');
  }
  } catch(msg){
    console.log(msg);
  }
}