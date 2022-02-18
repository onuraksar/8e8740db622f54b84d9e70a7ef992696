console.log("hello");


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

// const checkIfEmpty  = (input) => {
//     return input.value !== '';
// }

// const checkIfNotSelected = (fieldset) => {
//     // console.log("fieldset", fieldset)
//     return !fieldset.querySelectorAll("input[type=radio]:checked").length <= 0;
// }

const checkIfEmpty  = (input) => {
    return input.value == '';
}

const checkIfNotSelected = (fieldset) => {
    // console.log("fieldset", fieldset)
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



// Events: 

for(let i=0; i < $nextButtons.length; i++) {
    $nextButtons[i].addEventListener("click", (e) => {
        e.preventDefault();
        const [currentTab, currentTabIndex] = getCurrentTab(e.target);
        const $nextTab = currentTab.nextElementSibling;
        const isValid = checkValidation(currentTab);  
        console.log("isValid", isValid)  
        // CHECK: son step'de hata vermesin
        if(isValid) {
            clearErrors();
            currentTab.classList.remove("js-active");
            $nextTab.classList.add("js-active");
            document.getElementsByClassName("c-progressbar__item")[currentTabIndex + 1].classList.add("active")
            // CHECK: inputları bi sonraki adım için kaydedecek fonksiyonu çağır
            //
        } else {
            console.log("error")
            showErrors();
            // CHECK: validasyon mesajlarını göster
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

$submitButton.addEventListener(item => {
    
});

// CHECK: input change olduğunda validasyon-hatasını sil

// CHECK: select'in validsayonunu düzelt

// ONUR AKŞAR




