
const getApi = fetch('https://fakestoreapi.com/products');
let container = document.querySelector('.container');
getApi.then((res) => res.json()).then((profile) => {
    profile.map((el) => {
        container.innerHTML += `<div class="card" id="${el.id}">
            <img src="${el.image}">
            <h1>${el.category}</h1>
            <h2>₹${el.price}</h2>
            <p>rating ${el.rating.rate} out of 5</p>
            <h4 class="title">${el.title}</h4>
            <div class="view">
            <button class="viewDetails">view details</button>
            <button class="addCart">add to cart</button>
            </div>            
        </div>`
    });

    let count = 0;
    let viewDetails = document.querySelectorAll('.viewDetails');
    let addCart = document.querySelectorAll('.addCart');
    let cartCount = document.querySelector('.cartCount');
    viewDetails.forEach((el) => {
        el.onclick = function () {
            this.parentElement.parentElement.children[4].classList.toggle('add');
        }
    });

    addCart.forEach((el) => {
        el.onclick = function () {
            count += 1;
            cartCount.innerHTML = count;
            el.disabled = true;
            let cardimage = this.parentElement.parentElement.children[0].src;
            let cardRating = this.parentElement.parentElement.children[3].innerHTML;
            let cardPrice = this.parentElement.parentElement.children[2].innerHTML;


            let sidebar = document.querySelector('.sidebar');
            sidebar.innerHTML += `<div class="cartSection">
                    <img src="${cardimage}">
                    <div class="cardElem">
                        <p class="cardRating">${cardRating}</p>
                        <p class="cardPrice">price <span></span><span>${cardPrice}</span></p>
                        <div class="addMore">
                            <button class="minus">–</button>
                            <div class=""><input value="1"></div>
                            <button class="plus">+</button>
                        </div>
                    </div>
            </div>`;

            // plus icons js
            
            let plus = document.querySelectorAll('.plus');            

            plus.forEach((el) => {
                el.onclick = function () {  
                                   
                    let inputParent = this.parentElement;
                    let input = inputParent.querySelector('input');
                    let inputChild = Number(input.value);
                    // console.log(inputChild)
                    let priceSpan = input.value = inputChild+1;
                    // console.log(priceSpan)   
                    let span = this.parentElement.parentElement;
                    let spanPrice = span.querySelectorAll('span');
                    let priceMult = Number(spanPrice[1].innerHTML.replace("₹","")) * priceSpan;
                    spanPrice[0].innerHTML = "₹"+priceMult.toFixed(2);
                    spanPrice[1].style.display = 'none';   
                    let check = this.parentElement.children[1].children[0];
                    console.log(check.value)
                    if(check.value == 1){
                        this.parentElement.children[0].disabled = true;                       
                    }else{
                        this.parentElement.children[0].disabled = false;                        
                    }               

                }
            });

            let minus = document.querySelectorAll('.minus');  
            
            minus.forEach((el) => {
                if(el.parentElement.children[1].children[0].value <= 1){
                    el.disabled = true;
                }
                el.onclick = function () {  
                                                      
                    let inputParent = this.parentElement;
                    let input = inputParent.querySelector('input');
                    let inputChild = Number(input.value);
                    // console.log(inputChild)
                    let priceSpan = input.value = inputChild-1;
                    // console.log(priceSpan)   
                    let span = this.parentElement.parentElement;
                    let spanPrice = span.querySelectorAll('span');
                    let priceMult = Number(spanPrice[1].innerHTML.replace("₹","")) * priceSpan;
                    spanPrice[0].innerHTML = "₹"+priceMult.toFixed(2);
                    spanPrice[1].style.display = 'none';  
                    
                    let check = this.parentElement.children[1].children[0];
                    console.log(check.value)
                    if(check.value == 1){
                        this.parentElement.children[0].disabled = true;                       
                    }else{
                        this.parentElement.children[0].disabled = false;                        
                    } 

                }
            });          

        }
    });

    // cart js
    let cart = document.querySelector('.cart');
    let pContainer = document.querySelector('.pContainer');
    cart.onclick = function () {
        pContainer.classList.toggle('showCart');
        document.body.classList.toggle('bodyP');
    }

    // filter js
    let a = document.querySelectorAll('.navContainer ul li a');

    a.forEach((el)=>{
        el.onclick = function(e){
            let currTarget = e.target.innerHTML;
            let card = document.querySelectorAll('.card');
            card.forEach((el)=>{
                let cardEl = el.querySelectorAll('h1')
                cardEl.forEach((elem)=>{
                    if(elem.innerHTML == currTarget){
                        elem.parentElement.style.display = 'flex';
                    }else if(currTarget == "All"){
                        elem.parentElement.style.display = 'flex';
                    }
                    else{
                        elem.parentElement.style.display = 'none';
                    }
                })
            })
        }
    });

    // search functionality
    let searchInp = document.querySelector('.hdForm form input');
    let notFound = document.querySelector('.notFound');
    
    searchInp.oninput = function(){
        let tr = true;
        let se = this.value;
        console.log(se)
        let card = document.querySelectorAll('.card');
        card.forEach((el)=>{
            let ele = el;
            let h1 = el.querySelectorAll('h1');
            h1.forEach((e)=>{
                if(e.innerHTML.includes(se)){
                    ele.style.display = 'flex';
                    tr = false;
                }else{
                    ele.style.display = 'none'; 
                }
            });
        })

        console.log(tr)
        if(tr){
            notFound.style.display = 'flex';
        }else{
            notFound.style.display = 'none';
        }
    }

});






// ----------------------------------------filter one more method---------------------------------------------

    // a[1].onclick = function(){
    //     let card = document.querySelectorAll('.card');
    //     card.forEach((el)=>{
    //         if(el.children[1].innerHTML == "men's clothing" ){
    //             el.style.display = 'flex';
    //         }else{
    //             el.style.display = 'none';
    //         }               
    //     });
    // }

    // a[2].onclick = function(){
    //     let card = document.querySelectorAll('.card');
    //     card.forEach((el)=>{
    //         if(el.children[1].innerHTML == "jewelery" ){
    //             el.style.display = 'flex';
    //         }else{
    //             el.style.display = 'none';
    //         }               
    //     });
    // }

    // a[3].onclick = function(){
    //     let card = document.querySelectorAll('.card');
    //     card.forEach((el)=>{
    //         if(el.children[1].innerHTML == "electronics" ){
    //             el.style.display = 'flex';
    //         }else{
    //             el.style.display = 'none';
    //         }               
    //     });
    // }

    // a[4].onclick = function(){
    //     let card = document.querySelectorAll('.card');
    //     card.forEach((el)=>{
    //         if(el.children[1].innerHTML == "women's clothing" ){
    //             el.style.display = 'flex';
    //         }else{
    //             el.style.display = 'none';
    //         }               
    //     });
    // }

    // a[0].onclick = function(){
    //     let card = document.querySelectorAll('.card');
    //     card.forEach((el)=>{
    //         el.style.display = 'flex';          
    //     });
    // }   



