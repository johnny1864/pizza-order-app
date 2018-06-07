/*eslint-env browser*/

//HELPER FUNCTION
var $ = function (id) {
    'use strict';
    return document.getElementById(id);
};

window.addEventListener('load', function () {
    'use strict';
    
    var addressType = $('inputAddress-type');

    //DISPLAY OTHER INPUT
    addressType.addEventListener('change', function(){
        
        if(addressType.value === 'other'){
            $('inputOther').style.visibility = 'visible';
        }else {
            $('inputOther').style.visibility = 'hidden';
        }
    })

    //DISPLAYS MODAL
    $('order').addEventListener('click', function () {
        $('my-modal').style.display = 'flex';
    });

    //CLOSES MODAL
    $('close').addEventListener('click', function () {
        $('my-modal').style.display = 'none';
    });

    inputValidation();
    $('submit-address').addEventListener('click', function (e) {
    
        var inputs = document.querySelectorAll('#info-form');
        var address = getAddress(inputs);
        
        console.log(inputValidation());
        
        if (inputValidation()) {
            var confirm = window.confirm('Your Adress is ' + address);
            if (confirm){
                storeAddress(inputs);
            }else{
                e.preventDefault();
            }  
        } else {
            e.preventDefault();
        }
    });
});

function getAddress(inputs){
    'use strict';
    var address = [];
    for (var i = 2; i < inputs[0].length; i++){
        address[i] = inputs[0][i].value;
    }
    
    return address.join(' ');
}

//VALIDATES ADDRESS INPUTS 
function validation(inputs) {
    var valid = true;
    for (var i = 0; i < inputs[0].length; i++) {
        if (inputs[0][i].value === '' && inputs[0][i].id !== 'other') {
            //console.log(inputs[i]); 
            inputs[0][i].style.border = '1px solid red';
            valid = false;
        } else {
            inputs[0][i].style.border = '1px solid #16ba4f';
        }
    }
    return valid;
}

//INPUT VALIDATION
function inputValidation(){
    'use strict';
    var nameRegex = /[a-z]/gi;
    var zipRegex = /^\d{5}$/g;
    
    //console.log(zipRegex.test($('inputZip').value));
    return zipRegex.test($('inputZip').value);
}

//STORES ADDRESS TO LOCAL STORAGE
function storeAddress(inputs) {
    var inputArray = [];

    for (var i = 1; i < inputs[0].length; i++) {
        inputArray.push(inputs[0][i].value);
    }

    sessionStorage.setItem('address', JSON.stringify(inputArray));
}
