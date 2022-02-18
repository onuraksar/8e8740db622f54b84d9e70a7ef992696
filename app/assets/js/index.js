


// Choices:
const $hotelElement = document.getElementById('js-choose-hotel');
const $monthElement = document.getElementById('js-month');
const $yearElement = document.getElementById('js-year');
const hotelChoices = new Choices($hotelElement);
const monthChoices = new Choices($monthElement);
const yearChoices = new Choices($yearElement);


//Calendar:

const $arriveInput = document.getElementById("arrive");
const $leaveInput = document.getElementById("leave");

const dateTransformer = (dateObject) => {
    const year = dateObject.getFullYear().toString();
    const month = (dateObject.getMonth() + 1).toString().length < 2 ? '0' + (dateObject.getMonth() + 1).toString() : (dateObject.getMonth() + 1).toString();
    const day = dateObject.getDate().toString().length < 2 ? '0' +  dateObject.getDate().toString() :  dateObject.getDate().toString();
    return `${year}-${month}-${day}`;
}
const today = new Date();
$arriveInput.min = dateTransformer(today);

$arriveInput.addEventListener("change", (e) => {
    let arriveDate = e.target.valueAsDate; 
    arriveDate.setDate(arriveDate.getDate() + 1);
    $leaveInput.valueAsDate = arriveDate;
    $leaveInput.min = dateTransformer(arriveDate);
    $leaveInput.disabled = false;

});


// Validation:

const $nextButtons = document.getElementsByClassName('js-next');
const $prevButtons = document.getElementsByClassName('js-prev');
const $submitButton = document.getElementsByClassName('js-submit');

let nonValidInputsArr = [];
let nonValidFieldSetsArr = [];

const checkValidation = (currentTab) => {
    const $allRequiredInputs = currentTab.querySelectorAll("[required]:not(fieldset)");
    const $allRequiredFieldSets = currentTab.querySelectorAll("fieldset[required]");
    nonValidInputsArr = Array.from($allRequiredInputs).filter(checkIfEmpty)
    nonValidFieldSetsArr = Array.from($allRequiredFieldSets).filter(checkIfNotSelected)
    return (nonValidInputsArr.length > 0 || nonValidFieldSetsArr.length > 0 ? false : true )

    // return Array.from($allRequiredInputs).every(checkIfEmpty) && Array.from($allRequiredFieldSets).every(checkIfNotSelected);
    // true, false için etkisiz eleman
    
}

const checkIfEmpty  = (input) => {
    return input.value == '';
}

const checkIfNotSelected = (fieldset) => {
    return fieldset.querySelectorAll("input[type=radio]:checked").length == 0;
}

const getCurrentTab = (element) => {
    const $allSteps = document.getElementsByClassName('c-form__tab');
    const $currentTab = Array.from($allSteps).filter( (item, index) => {
        return item.contains(element);
    });
    const currentTabIndex = Array.from($allSteps).indexOf($currentTab[0])
    return [$currentTab[0], currentTabIndex];
}

const showErrors = () => {
    nonValidInputsArr.forEach( item => item.classList.add("u-non-valid"));
    nonValidFieldSetsArr.forEach( item => item.classList.add("u-non-valid"));
}

const clearErrors = () => {
    const $allNonValidElements = document.getElementsByClassName("u-non-valid");

    Array.from($allNonValidElements).forEach(item => item.classList.remove("u-non-valid"));
}

const submitForm = () => {
    alert("Ödeme Gerçekleşti");
}



// Button Events: 

for(let i=0; i < $nextButtons.length; i++) {
    $nextButtons[i].addEventListener("click", (e) => {
        e.preventDefault();
        const [currentTab, currentTabIndex] = getCurrentTab(e.target);
        const $nextTab = currentTab.nextElementSibling;
        const isValid = checkValidation(currentTab);  
        console.log("isValid", isValid)  
        if(isValid) {
            clearErrors();
            currentTab.classList.remove("js-active");
            $nextTab.classList.add("js-active");
            document.getElementsByClassName("c-progressbar__item")[currentTabIndex + 1].classList.add("active")
            // CHECK: inputları bi sonraki adım için kaydedecek local storage fonksiyonu çağır
            // CHECK: scroll to top fonskiyonu ekle
        } else {
            //CHECK: hatalı div'e focuslayacak fonksiyonu ekle
            console.log("error")
            showErrors();
        }
    })
}

for(let i=0; i < $prevButtons.length; i++) {
    $prevButtons[i].addEventListener("click", (e) => {
        e.preventDefault();
        const [currentTab, currentTabIndex] = getCurrentTab(e.target);
        const $prevTab = currentTab.previousElementSibling;
        currentTab.classList.remove("js-active");
        $prevTab.classList.add("js-active");
        document.getElementsByClassName("c-progressbar__item")[currentTabIndex].classList.remove("active")
    })
}

document.getElementById('js-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const [currentTab, currentTabIndex] = getCurrentTab(e.target);
    const isValid = checkValidation(currentTab);  
    console.log("isValid", isValid)  
    if(isValid) {
        clearErrors();
        currentTab.classList.remove("js-active");
        submitForm();
        //
    } else {
        console.log("error")
        showErrors();
    }
})



// Credit Card:

const $cdCN = document.getElementById('js-customerName')
const $cdNo = document.getElementById('js-card-number');
const $cdMonth = document.getElementById('js-month');
const $cdYear = document.getElementById('js-year');
const $cdCVV = document.getElementById('js-cvv');

const $allCreditCardInput = document.querySelectorAll("[data-match]")

for(let i=0; i < $allCreditCardInput.length; i++) {
    ['change', 'input'].forEach(evt => {
        $allCreditCardInput[i].addEventListener(evt, (e) => {
            const matchingKey = e.target.getAttribute("data-match");
            document.querySelector(`[data-card = ${matchingKey}]`).innerHTML = e.target.value;
        })
    })

}

$cdCVV.addEventListener("focus", () => {
    document.querySelector(".c-credit-card__back").classList.add("active")
    document.querySelector(".c-credit-card__front").classList.remove("active")

})
$cdCVV.addEventListener("focusout", () => {
    document.querySelector(".c-credit-card__back").classList.remove("active")
    document.querySelector(".c-credit-card__front").classList.add("active")

})







// ONUR AKŞAR




