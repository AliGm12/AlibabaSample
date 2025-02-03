const headerNavBtnList = [
    {
        name : "ticket",
        options : ["پرواز داخلی", "پرواز خارجی", "قطار", "اتوبوس"]
    },
    {
        name : "residence",
        options : ["هتل", "ویلا و اقامتگاه"]
    },
    {
        name : "moreOption",
        options : ["علی بابا پلاس", "مجله علی بابا", "بیمه مسافرتی", "سفر اقساطی"]
    }
];
// create pop up menus using JavaScript
headerNavBtnList.forEach(e=>{
    const ul = document.createElement("ul");
    ul.id = `${e.name}List`
    for (let key of e.options){
        const li = document.createElement("li");
        li.classList.add("p-1", "my-1", "px-6", "rounded", "hover:bg-gray-100", "text-nowrap")
        li.innerText = key;
        if(key != e.options[e.options.length - 1]){
            const div = document.createElement("div");
            div.classList.add("w-auto", "h-[1px]", "bg-gray-200");
            ul.append(li, div);
        }else{
            ul.append(li);
        }     
    }
    ul.style.position = "absolute";
    ul.style.top = "130%";
    ul.style.right = "0";
    ul.classList.add("shadow-xl","bg-white","py-1", "px-2", "rounded-md","hidden", "border")
    document.getElementById(`${e.name}`).append(ul)
    
})


let originDest = document.querySelectorAll(".selectableCities");
let originList = document.querySelector(".destination-list");
console.log(originDest);
originDest.forEach(input=>{
    input.addEventListener("click",(e)=>{
        // if(originList.classList.contains("hidden")){
        //     console.log("hi");
        //     originList.style.top = "30px"
        // }
        originList.classList.remove("hidden")
        // let originX = document.getElementById("origin").getBoundingClientRect().x
        if(e.currentTarget.id == "origin"){
            let isUlAvail = Array.from(input.children).filter(child=>child.tagName === "UL");
            if( isUlAvail.length == 0 ){
                input.appendChild(originList)
                console.log(input);
                
            }
            originList.classList.add("top-14")

        }else if(e.currentTarget.id == "destination"){
            input.appendChild(originList)
            // originList.style.top = "52px"
            // originList.style.left = "0"
            // console.log(originList.parentElement.);
            // console.log(input);
            // originList.remove()
        }
        
        // originList.classList.add("transition-all")
        
        if(e.target.tagName == "A"){
            input.firstElementChild.value = e.target.lastElementChild.innerHTML;
            
            
        }  
    })
    input.firstElementChild.addEventListener("input", (e)=>{
        console.log(e.target.value.length);
        
        if(e.target.value != ""){
            input.querySelector(".delete-btn").classList.remove("hidden")
        }else{
            input.querySelector(".delete-btn").classList.add("hidden")
        }
    })
})





// show up the Pop Up Menus when you clicked on the navigator tab!
const headerNavBtn = document.querySelectorAll("#container .nav-header nav div");
headerNavBtn.forEach(e=>{
    if(e.id == "moreOption" || e.id == "residence" || e.id == "ticket"){

        e.addEventListener("click",function (){
            
            const headerNavUls = document.querySelectorAll("#container .nav-header nav ul");
            headerNavUls.forEach(e=>{
        
                if(e.id != this.id + "List"){
                    e.classList.add("hidden")
                }
            })
            
            let list = document.querySelectorAll(`#${this.id}List`);
            
            let listClasses = list[0].className.split(" ")
            if(listClasses.includes("hidden")){
                list[0].classList.remove("hidden")
            }
            if(!listClasses.includes("hidden")){
                list[0].classList.add("hidden")
            } 
            
        })
        
    }
})
// to deselect pop up menus when you click anywhere except menus
document.addEventListener('click', (event) => {
    const headerNavUls = document.querySelectorAll("#container .nav-header nav ul");
    if(!passengerList.contains(event.target) && !passengerInput.contains(event.target)){
        passengerList.classList.add("invisible")
        passengerInput.classList.remove("border-black")
        passengerList.classList.remove("top-14")
        passengerList.classList.remove("transition-all")
        passengerList.classList.add("top-0")
    }
    headerNavUls.forEach(ul => {
      if (!ul.contains(event.target) && 
          event.target.id !== "moreOption" && 
          event.target.id !== "residence" && 
          event.target.id !== "ticket") { 
        ul.classList.add("hidden");
      }  
    });
    if( !originList.contains(event.target) && Array.from(originDest).filter(e=>e.contains(event.target)).length == 0 ){
        originList.classList.add("hidden")
        
    }
    
    
  });
  
// used for header navigator to show/hide when document scrolled up/down
  let lastScroll = 0;
document.addEventListener("scroll", ()=>{
    if(scrollY >= 200){
        document.getElementById("header").style.transform = "translateY(-100%)";
    }
    else if(scrollY < 200){
        document.getElementById("header").style.transform = "translateY(0)";
    }
    if(scrollY > lastScroll && scrollY >= 200){
        document.getElementById("header").style.transform = "translateY(-100%)";

        
    }else if (screenY < lastScroll && scrollY >= 200){
        document.getElementById("header").style.transform = "translateY(0)";
    }
    lastScroll = scrollY
    
})

let dropDownBtnContext = [
    {
        tab : "DomesticFlight",
        firstValue : ["یک طرفه", "رفت و برگشت"],
        tabInputs : 
            {
                origin : "مبدا (شهر)",
                dest : "مقصد (شهر)",
                dateGone : "تاریخ رفت",
                dateReturn : "تاریخ برگشت",
                passengers : [
                    "بزرگسال(۱۲ سال به بالا)",
                    "کودک(۲ تا ۱۲ سال)",
                    "نوزاد(۱۰ روز تا ۲ سال)"
                ]
            }
        
    },
    {
        tab : "ForeignFlight",
        firstValue : ["یک طرفه", "رفت و برگشت", "چند مسیره"],
        secondValue : ["اکونومی", "پرمیم اکونومی", "بیزینس", "پرمیوم بیزینس", "فرست", "پرمیوم فرست"],
        tabInputs : 
            {
                origin : "مبدا (شهر، فرودگاه)",
                dest : "مقصد (شهر، فرودگاه)",
                dateGone : "تاریخ رفت",
                dateReturn : "تاریخ برگشت",
                passengers : [
                    "بزرگسال(۱۲ سال به بالا)",
                    "کودک(۲ تا ۱۲ سال)",
                    "نوزاد(۱۰ روز تا ۲ سال)"
                ]
            }
        
    },
    {
        tab : "Train",
        firstValue : ["یک طرفه", "رفت و برگشت"],
        secondValue : ["دربست نمی‌خوام", "دربست می‌خواهم"],
        thirdValue : ["مسافران عادی", "ویژه برادران", "ویژه خواهران"],
        forthValue : ["حمل خودرو نمی‌خواهم", "حمل خودرو می‌خواهم"],
        tabInputs : 
            {
                dest : "مقصد (شهر ، پایانه)",
                dateGone : "تاریخ حرکت"
            }
        
    }
];

// create a line below travel icons in main menu and move it below icon when you clicked on any of them!
document.getElementById("underliner").style.left = "996.03125px";
underliner.style.top = "5.5rem";
underliner.style.width = "75px"
const travelIcons = document.querySelectorAll("#type-of-travel-icons > div");

travelIcons.forEach((icon) => {
    //it will filter the type-of-travel-icons div and show which icons inside of this div have a same class as a dropDownBtnContext obj
    let filteredTravelDesc = [];
    icon.className.split(" ").forEach(e=>{
        let filterArr = dropDownBtnContext.filter(btnContext => btnContext.tab ==e);
        if( filterArr.length != 0 ){
            filteredTravelDesc = filterArr;
        }            
    }) 
    // it will create a descriptionTab for every type-of-travel-icons that has a class in ( filteredTravelDesc array )
    if(filteredTravelDesc.length != 0){
        const domesticFlightTab = document.querySelector(".type-of-travel-desc.DomesticFlight"); 
    
        let tab = document.createElement("div");
        tab.innerHTML = domesticFlightTab.innerHTML;
        tab.classList.add("px-10", "py-6", "type-of-travel-desc", `${filteredTravelDesc[0].tab}`);
        //assign classes to both childs of main div and remove the default classes from them
        tab.firstElementChild.classList.remove("DomesticFlightBtn");
        tab.lastElementChild.classList.remove("DomesticFlightInputs");
        tab.firstElementChild.classList.add(`${filteredTravelDesc[0].tab}Btn`);
        tab.lastElementChild.classList.add(`${filteredTravelDesc[0].tab}Inputs`);
        //remove anything inside first div and create them by JS
        tab.firstElementChild.innerHTML = "";
        for(let key in filteredTravelDesc[0]){
            //to find which one of keys has "Value" at the end then they will assign to the options of select
            if(key.slice(-5) == 'Value'){
                const select = document.createElement("select");
                const selectStyles = ['flex', 'items-center', 'border', 'border-gray-300', 'rounded-2xl', 'px-3', 'py-1', 'text-gray-500', 'text-sm', 'outline-none'];
                select.classList.add(...selectStyles);
                const selectValues = filteredTravelDesc[0][key];
                selectValues.forEach(value=>{
                    const option = document.createElement("option");
                    option.innerHTML = value;
                    option.value = value;
                    select.append(option);
                })
                tab.classList.add("hidden")
                tab.firstElementChild.append(select);
            }  
        }          
        tab.lastElementChild.innerHTML = "";
        let tabInputs = filteredTravelDesc[0].tabInputs;
        
        let originFlag = false;
        // created a loop to find out is there any key = "origin"
        for(let key in tabInputs){
            // destination should always exist but origin not all the time.
            if(key == "origin"){
                //origin and dest inputs
                const origin_dest = document.createElement("div");
                origin_dest.classList.add("flex", "relative", "items-center", "w-[40%]")
                const origin_destinnerHTML = document.querySelector(".DomesticFlightInputs > div").innerHTML;
                origin_dest.innerHTML = origin_destinnerHTML
                tab.lastElementChild.append(origin_dest);
                origin_dest.firstElementChild.children[0].placeholder = tabInputs["origin"]
                origin_dest.lastElementChild.children[0].placeholder = tabInputs["dest"]
                originFlag = true;
            }
        }
        // originFlag indicate that we dont have a key = origin 
        if(originFlag == false){
            //origin input
            const origin = document.createElement("div");
            const origin_destinnerHTML = document.querySelector(".DomesticFlightInputs > div > div").innerHTML;
            origin.innerHTML = origin_destinnerHTML
            origin.firstElementChild.classList.add("border-l", "border-gray-300", "rounded-lg")
            origin.firstElementChild.placeholder = tabInputs["dest"]
            tab.lastElementChild.append(origin);
            // date and search button
            const dateInputDiv = document.createElement("div");
            const dateInnerHTML = document.querySelector(".DomesticFlightInputs div:nth-child(2)").innerHTML
            dateInputDiv.innerHTML = dateInnerHTML;
            dateInputDiv.classList.add("flex", "w-full", "gap-2")
            tab.lastElementChild.append(dateInputDiv);

        }
        if(originFlag == true){
        const dateInputDiv = document.createElement("div");
        const dateInnerHTML = document.querySelector(".DomesticFlightInputs div:nth-child(2)").innerHTML
        dateInputDiv.innerHTML = dateInnerHTML;
        dateInputDiv.classList.add("flex", "w-[60%]", "gap-2")
        tab.lastElementChild.append(dateInputDiv)
        }
        
        //create a list for passenger
        
        const passengerInput = tab.querySelector("#passenger-num")
        const passengerList = tab.querySelector("#passenger-list")

        passengerList.classList.add("invisible");
        passengerInput.placeholder = "1 مسافر";
        passengerInput.classList.add("pr-2")
        passengerInput.addEventListener("click", (e)=>{
            if(passengerList.className.includes("invisible")){
                e.currentTarget.classList.add("border", "border-black")
                passengerList.classList.add("transition-all")
                passengerList.classList.remove("invisible")
                passengerList.classList.add("top-14")
            }
        })

        const addDeleteBtns = passengerList.querySelectorAll("li .add-delete-btn");
        let addDelBtnStack = 
        [
            {
                key : 'بزرگسال',
                value : 1
            },
            {
                key : 'کودک',
                value : 0
            },
            {
                key : 'نوزاد',
                value : 0
            }
        ];
        addDeleteBtns.forEach(addBtn=>{

                addBtn.addEventListener("click", (e) => {
                    let titleName;
                    if(e.currentTarget.innerHTML == 'add'){
                        e.currentTarget.nextElementSibling.innerHTML = +e.currentTarget.nextElementSibling.innerHTML + 1
                        titleName = e.currentTarget.nextElementSibling.parentNode.previousElementSibling.firstElementChild.innerHTML;

                        addDelBtnStack.forEach(el=>{
                            if(el.key == titleName){
                                el.value = +e.currentTarget.nextElementSibling.innerHTML;
                            }

                        })
                    }else{
                        if(e.currentTarget.previousElementSibling.innerHTML != 0){
                            e.currentTarget.previousElementSibling.innerHTML = +e.currentTarget.previousElementSibling.innerHTML - 1
                        }
                        titleName = e.currentTarget.previousElementSibling.parentNode.previousElementSibling.firstElementChild.innerHTML;
                        addDelBtnStack.forEach(el=>{
                            if(el.key == titleName){
                                el.value = +e.currentTarget.previousElementSibling.innerHTML;
                            }

                        })
                        
                    }
                    
                    const sum = addDelBtnStack.reduce((prev,current)=>{
                            return prev + +current.value
                        },0)
                    passengerInput.placeholder = `${sum} مسافر`
                })
        })


        document.addEventListener('click', (event) => {
            if(!passengerList.contains(event.target) && !passengerInput.contains(event.target)){
                passengerList.classList.add("invisible")
                passengerInput.classList.remove("border-black")
                passengerList.classList.remove("top-14")
                passengerList.classList.remove("transition-all")
                passengerList.classList.add("top-0")
            }
          });
        
        document.getElementById("type-of-travel").append(tab);
    }
    
    icon.style.cursor = "pointer";
    icon.addEventListener('click',(e)=>{
        let lowerHeaderImg = document.querySelectorAll(".lower-header-img");
        //move blue line below each icon
        let underliner = document.getElementById("underliner");
        const offsetRight = (window.innerWidth - document.getElementById("main-menu").clientWidth) / 2;
        underliner.style.left = e.currentTarget.getBoundingClientRect().x - offsetRight + 9 + "px";    
        underliner.style.top = "5.5rem";
        underliner.style.width = e.currentTarget.clientWidth + "px";
        travelIcons.forEach(el=>{
            el.classList.remove("text-blue-600")
        })
        e.currentTarget.classList.add("text-blue-600");

        // changing lower-header-img with animation effect
        let currentImgSrc = e.currentTarget.classList[e.currentTarget.classList.length - 2];
        lowerHeaderImg.forEach(img=>{
            if (img.src.includes(currentImgSrc.toLowerCase())) {
                img.classList.add("z-10")
                img.classList.remove("opacity-50")
                img.classList.add("opacity-100")
            }else{

                img.classList.remove("z-10")
                img.classList.remove("opacity-100")
                img.classList.add("opacity-50")
            }
        })
        
    //it will filter the type-of-travel-icons div and show which icons inside of this div have a same class as a dropDownBtnContext obj
        let filteredTravelDesc = [];
        e.currentTarget.className.split(" ").forEach(el=>{
            let filterArr = dropDownBtnContext.filter(btnContext => btnContext.tab ==el);
            if( filterArr.length != 0 ){
                filteredTravelDesc = filterArr;
            }            
        }) 
        if(filteredTravelDesc.length != 0){
            document.querySelectorAll(`#type-of-travel .type-of-travel-desc`).forEach(e=>{
                e.classList.add("hidden")
            })
            document.querySelectorAll(`#type-of-travel .type-of-travel-desc.${filteredTravelDesc[0].tab}`)[0].classList.remove("hidden")
        }
    })
})

const passengerInput = document.querySelector("#passenger-num")
const passengerList = document.querySelector("#passenger-list")
passengerList.classList.add("invisible")
passengerInput.placeholder = "1 مسافر";
passengerInput.classList.add("pr-2")
passengerInput.addEventListener("click", (e)=>{
    if(passengerList.className.includes("invisible")){
        e.currentTarget.classList.add("border", "border-black")
        passengerList.classList.add("transition-all")
        passengerList.classList.remove("invisible")
        passengerList.classList.add("top-14")
    }
})


const addDeleteBtns = passengerList.querySelectorAll("li .add-delete-btn");
let addDelBtnStack = 
[
    {
        key : 'بزرگسال',
        value : 1
    },
    {
        key : 'کودک',
        value : 0
    },
    {
        key : 'نوزاد',
        value : 0
    }
];
addDeleteBtns.forEach(addBtn=>{
    if(addBtn.innerHTML == "remove"){
        if(addBtn.previousElementSibling.innerHTML == 0){
        }
            
        }
        addBtn.addEventListener("click", (e) => {

            let titleName;
            if(e.currentTarget.innerHTML == 'add'){
                e.currentTarget.nextElementSibling.innerHTML = +e.currentTarget.nextElementSibling.innerHTML + 1
                titleName = e.currentTarget.nextElementSibling.parentNode.previousElementSibling.firstElementChild.innerHTML;

                addDelBtnStack.forEach(el=>{
                    if(el.key == titleName){
                        el.value = +e.currentTarget.nextElementSibling.innerHTML;
                    }

                })
            }else{
                if(e.currentTarget.previousElementSibling.innerHTML != 0){
                    e.currentTarget.previousElementSibling.innerHTML = +e.currentTarget.previousElementSibling.innerHTML - 1
                }else{
                    e.currentTarget.style.cursor = "not-allowed"
                }
                titleName = e.currentTarget.previousElementSibling.parentNode.previousElementSibling.firstElementChild.innerHTML;
                addDelBtnStack.forEach(el=>{
                    if(el.key == titleName){
                        el.value = +e.currentTarget.previousElementSibling.innerHTML;
                    }

                })
                
            }
        const sum = addDelBtnStack.reduce((prev,current)=>{
                return prev + +current.value
            },0)
        passengerInput.placeholder = `${sum} مسافر`


        })
})



const swiper = new Swiper('.swiper', {
    slidesPerView : 2,
    // effect: 'creative',
    // creativeEffect: {
    //   prev: {
    //     // will set `translateZ(-400px)` on previous slides
    //     translate: [0, 0, -400],
    //   },
    //   next: {
    //     // will set `translateX(100%)` on next slides
    //     translate: ['100%', 0, 0],
    //   },
    // },
    
    autoplay: {
        delay: 5000,
      },
    speed:400,
    spaceBetween: 20,
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    pagination: {
        el: '.swiper-pagination', // Enables pagination
        clickable: true, // Allows clicking on pagination bullets
      },
      navigation: false, // Disables navigation buttons
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  

const extendableDivs = document.querySelectorAll(".extendable");

const exDiv = document.querySelector(".extendable-div");
extendableDivs.forEach(exDiv=>{
    exDiv.addEventListener("click", ()=>{
        const svg = exDiv.querySelector("svg:nth-child(2)")
        const hiddenP = exDiv.lastElementChild
        if( hiddenP.classList.contains("max-h-0")){
            svg.classList.add("rotate-0")
            hiddenP.classList.remove("max-h-0")
            hiddenP.classList.add("max-h-[400px]")
            hiddenP.classList.remove("overflow-hidden")
            hiddenP.classList.add("pt-5")
        }else{
            svg.classList.remove("rotate-0")
            hiddenP.classList.remove("max-h-[400px]")
            hiddenP.classList.add("max-h-0")
            hiddenP.classList.remove("pt-5")
            hiddenP.classList.add("overflow-hidden")
        }
    })
})