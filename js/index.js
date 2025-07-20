// html elements
var productNameInput=document.getElementById("productNameInput");
var productPriceInput=document.getElementById("productPriceInput");
var productCategoryInput=document.getElementById("productCategoryInput");
var productDescriptionInput=document.getElementById("productDescriptionInput");
var productImageInput=document.getElementById("productImageInput");
var productsContainer=document.getElementById("productsContainer");
var searchInput=document.getElementById("searchInput");
var addbtn=document.getElementById("addbtn");
var updatebtn=document.getElementById("updatebtn");
// var labelll=document.getElementById("lebel");

// variables
var currentIndex;
var nameRegex=/^[A-Z][a-z]{3,}$/;
var categoryRegex=/^[A-Z][a-z]{3,}$/;
var priceRegex=/^([1-9][1-9][0-9]|100)$/;
var descRegex=/^[a-z\s]{25,100}$/

// functions
// if(localStorage.getItem("products")!==null){
//     var productList= JSON.parse(localStorage.getItem("products"));
//         displayAllProducts();

// }
// else{

//     var productList=[]
// }

var productList=JSON.parse(localStorage.getItem("products")) || [];
displayAllProducts();

function addProduct(){
  if(validate(nameRegex,productNameInput)&&validate(categoryRegex,productCategoryInput)&&validate(priceRegex,productPriceInput)&&validate(descRegex,productDescriptionInput))
  {
    var product = {
      name: productNameInput.value,
      category : productCategoryInput.value,
      price : productPriceInput.value,
      description : productDescriptionInput.value,
      image:"./images/"+productImageInput.files[0].name

  }
  productList.push(product);
  localStorage.setItem("products",JSON.stringify(productList))
  displayProduct(productList.length-1);
  // console.log(productList);
  clearData();
  }
  else{
    alert("8lt");
  }
   
}
function clearData(){
  productNameInput.value="",
  productCategoryInput.value="",
  productPriceInput.value="",
  productDescriptionInput.value="",
  productImageInput.value=""

}
function displayAllProducts(){
    for(var i=0;i<productList.length;i++){
        displayProduct(i);
    }
}
function displayProduct(index){
    var productMarkup=` <div class="col-sm-6 col-md-4 col-xl-3">
          <div class="product-card rounded-3 overflow-hidden">
            <img src="${productList[index].image}" class="w-100" alt="product-image">
            <div class="product-info px-3 py-4">
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="h5">${productList[index].name}</h3>
                <span class="h5">${productList[index].price}$</span>
              </div>
              <div class="mb-3">
                <i class="fa-solid fa-tags"></i>
                <span>${productList[index].category}</span>
              </div>
              <p>${productList[index].description}</p>
               <div>
                <button class="btn btn-outline-warning" onclick="kobry(${index})">UPDATE</button>
                <button class="btn btn-outline-danger" onclick="deleteProduct(${index})">DELETE</button>

              </div>
            </div>
          </div>
        </div>`
    productsContainer.innerHTML+=productMarkup;
}

function deleteProduct(index){
  // delete from list
  productList.splice(index,1);
  // update  local storage
  localStorage.setItem("products",JSON.stringify(productList));
  // display
  productsContainer.innerHTML="";
  displayAllProducts();

}

function searchProduct(){
  productsContainer.innerHTML="";
  for(var i=0;i<productList.length;i++){
    if(productList[i].name.includes(searchInput.value)){
      displayProduct(i);
    }
  }
}

function kobry(index){
  // console.log(index);
  currentIndex=index;
  productNameInput.value=productList[index].name;
  productCategoryInput.value=productList[index].category;
  productDescriptionInput.value=productList[index].description;
  productPriceInput.value=productList[index].price;
  // productImageInput.value=productList[index].image;


  updatebtn.classList.remove("d-none");
  addbtn.classList.add('d-none')


}

function updateProduct()
{
  // update
  productList[currentIndex].name=productNameInput.value;
  productList[currentIndex].category=productCategoryInput.value;
  productList[currentIndex].price=productPriceInput.value;
  productList[currentIndex].description=productDescriptionInput.value;

  // save data in localstorage & clear
  localStorage.setItem("products",JSON.stringify(productList));

  clearData();

  // display
  productsContainer.innerHTML="";
  displayAllProducts();


  // change buttons
  updatebtn.classList.add("d-none");
  addbtn.classList.remove("d-none")

  
  // console.log(productList);


}


function validate(regex,productInput){
  if(regex.test(productInput.value)){
    productInput.classList.add("is-valid");
    productInput.classList.remove("is-invalid");
    productInput.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
    // console.log("sa7");
  }
  else{
    // console.log("8lt");
    productInput.classList.remove("is-valid");
    productInput.classList.add("is-invalid");
    productInput.nextElementSibling.nextElementSibling.classList.remove("d-none");
    return false;

  }
  
}
