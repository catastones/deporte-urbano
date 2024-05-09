const ValidateInput = (target) => {
    let validate = true;
    let errorUser = document.querySelector("#user_error");
    let errorPass = document.querySelector("#pass_error");

    if (target.user.value.trim() === '') {
        errorUser.textContent = 'campo requerido';
        validate = false;
    } else { errorUser.textContent = ''; }
    if (target.pass.value.length < 8) {
        errorPass.textContent = 'Ingrese 8 dígitos o más';
        validate = false;
    }
    else { errorPass.textContent = ''; }

    return validate;
}

const submitForm = (event) => {
    event.preventDefault();

    if (ValidateInput(event.target)) {
        console.log('enviar datos a db')
    }

}
/*
// document.getElementById('btn_submit').addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log(event.target)
//     let userInputs = document.querySelectorAll('#user');
//     console.log(userInputs.value)
// });
 /*
let btnSend = document.querySelector("#btn-send");

btnSend.addEventListener('click', function () {
    let firstname = document.querySelector("#firstname");
    let lastname = document.querySelector("#lastname");
    let email = document.querySelector("#email");

    if (firstname.value.trim() === '' && firstname.required) {
        let errorFirstname = document.querySelector("#error-firstname");
        errorFirstname.textContent = 'Debe completar el campo nombre';
        // alert('Error, debe completar el campo nombre');
    }

    if (!lastname.value.trim() && lastname.required) {
        document.querySelector("#error-lastname").textContent = 'Debe completar el campo apellido';
    }

});
* /*/