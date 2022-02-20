


// Choices:
const $hotelElement = document.getElementById('hotel-title');
const $monthElement = document.getElementById('js-month');
const $yearElement = document.getElementById('js-year');
const hotelChoices = new Choices($hotelElement, {
    itemSelectText: '',
});
const monthChoices = new Choices($monthElement, {
    itemSelectText: '',
});
const yearChoices = new Choices($yearElement, {
    itemSelectText: '',
});


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
    nonValidInputsArr.forEach( item => item.tagName.toLowerCase() == 'select' ?  item.parentElement.classList.add("u-non-valid") : item.classList.add("u-non-valid") );
    nonValidFieldSetsArr.forEach( item => item.classList.add("u-non-valid"));
}

const clearErrors = () => {
    const $allNonValidElements = document.getElementsByClassName("u-non-valid");
    Array.from($allNonValidElements).forEach(item => item.classList.remove("u-non-valid"));
}

// const $allRequiredFieldSets


const submitForm = () => {
    // alert("Ödeme Gerçekleşti");
    console.log("ödeme gerçekleşti")
}

const scroll = (element) => {
    element.scrollIntoView({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
    });
}




// Button Events: 

const $couponButton = document.getElementById('js-coupon');

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
            scroll(document.querySelector(".c-progressbar"));
            printHotelInfo(currentTabIndex);
            // CHECK: inputları bi sonraki adım için kaydedecek local storage fonksiyonu çağır
            // CHECK: scroll to top fonskiyonu ekle
        } else {
            //CHECK: hatalı div'e focuslayacak fonksiyonu ekle
            console.log("error")
            showErrors();
            scroll(document.querySelector(".u-non-valid"))
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
        scroll(document.querySelector(".c-progressbar"));
    })
}

document.getElementById('js-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const [currentTab, currentTabIndex] = getCurrentTab(e.target);
    const isValid = checkValidation(currentTab);  
    console.log("isValid", isValid)  
    if(isValid) {
        clearErrors();
        submitForm();
        document.querySelector(".c-form__box").style.display = 'none';
        document.querySelector(".c-success").style.display = 'block';
        scroll(document.querySelector('.c-success'));
        printHotelInfo(currentTabIndex);

        //
    } else {
        console.log("error")
        showErrors();
    }
})

document.getElementById('js-cancel').addEventListener('click', () => {
    openPrompt();
    // emin misiniz diye sor.
    //redirect et.
})

document.getElementById('js-coupon').addEventListener('click', (e) => {
    e.preventDefault();
    if(document.getElementById('coupon').value !== '') {
        alert("kupon kullanıldı!");
    }
})

document.getElementById('coupon').addEventListener('input', (e) => {
    e.target.value !== '' ? $couponButton.disabled = false : $couponButton.disabled = true;   
})

// Credit Card:


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


// Print Hotel Info

let hotelInfo = {
    hotelTitle : "",
    arriveDate: "",
    leaveDate : "",
    adultNumber: "",
    childNumber: "",
    roomType: "",
    view: "",
    printInfo: function(currentTabIndex) {
        document.querySelectorAll(".c-hotel-info__title")[currentTabIndex].innerHTML = hotelInfo.hotelTitle;
        document.querySelectorAll('.arrive-date')[currentTabIndex].innerHTML = hotelInfo.arriveDate;
        document.querySelectorAll('.leave-date')[currentTabIndex].innerHTML = hotelInfo.leaveDate;
        document.querySelectorAll('.adult-number')[currentTabIndex].innerHTML = hotelInfo.adultNumber;
        document.querySelectorAll('.child-number')[currentTabIndex].innerHTML = hotelInfo.childNumber;
        hotelInfo.roomType !== '' && (document.querySelectorAll('.room-type')[currentTabIndex - 1].innerHTML = hotelInfo.roomType);
        hotelInfo.view !== '' && (document.querySelectorAll('.view')[currentTabIndex - 1].innerHTML =  hotelInfo.view);
    }
};

const printHotelInfo = (currentTabIndex) => {
    switch(currentTabIndex) {
        case 0:
          hotelInfo.hotelTitle = document.getElementById("hotel-title").value;
          hotelInfo.arriveDate = document.getElementById("arrive").value;
          hotelInfo.leaveDate = document.getElementById("leave").value;
          hotelInfo.adultNumber = document.getElementById("adult").value;
          hotelInfo.childNumber = document.getElementById("child").value;
          hotelInfo.printInfo(currentTabIndex);
          break;
        case 1:
          hotelInfo.roomType = document.getElementById("js-hotel-form").type.value;
          hotelInfo.view = document.getElementById("js-hotel-form")["view-type"].value;
          hotelInfo.printInfo(currentTabIndex);
          break;
        case 2:
          hotelInfo.printInfo(currentTabIndex);
          break;  
        default:
    }


}

document.getElementById('js-decline').addEventListener('click', () => {
    closePrompt();
})

document.getElementById('js-close').addEventListener('click', () => {
    // alert("hey");
    closePrompt();
})

let isDeclined = false;

document.getElementById('js-confirm').addEventListener('click', () => {
    document.querySelector(".c-prompt__question").style.display = 'none';
    document.querySelector(".c-prompt__decline").style.display = 'block';
    isDeclined = true;
})

const closePrompt = () => {
    document.querySelector(".c-prompt__question").style.display = 'block';
    document.querySelector(".c-prompt__decline").style.display = 'none';
    document.querySelector(".c-prompt").classList.remove("js-open");
    isDeclined && (window.location.href = './index.html');
}

const openPrompt = () => {
    document.querySelector(".c-prompt").classList.add("js-open");
}


// ONUR AKŞAR




