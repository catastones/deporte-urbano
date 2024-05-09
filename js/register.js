const ValidateInput = (target) => {
    let validate = true;

    let errorName = document.querySelector("#name_error");
    let errorlastname = document.querySelector("#lastname_error");

    let errorUser = document.querySelector("#user_error");
    let errorPass = document.querySelector("#pass_error");
    let errorPass2 = document.querySelector("#pass2_error");
    if (target.name.value.trim() === '') {
        errorName.textContent = 'campo requerido';
        validate = false;
    } else { errorName.textContent = ''; }
    if (target.lastname.value.trim() === '') {
        errorlastname.textContent = 'campo requerido';
        validate = false;
    } else { errorlastname.textContent = ''; }

    if (target.user.value.trim() === '') {
        errorUser.textContent = 'campo requerido';
        validate = false;
    } else { errorUser.textContent = ''; }
    if (target.pass.value.length < 8) {
        errorPass.textContent = 'Ingrese 8 dígitos o más';
        validate = false;
    }
    else {
        errorPass.textContent = '';
        if (target.pass2.value != target.pass.value) {
            pass2_error.textContent = 'Las contraseñas no coiciden'
            validate = false;
        }
        else { pass2_error.textContent = ''; }
    }


    return validate;
}

const submitForm = (event) => {
    event.preventDefault();
    if (ValidateInput(event.target)) {
        console.log('enviar datos a db')
    }
}