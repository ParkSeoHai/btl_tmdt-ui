
const loaderElement = document.querySelector('.loader-container');

// Tạo user
async function CreateUser(dataUser) {
    const url = 'https://localhost:44360/api/User/CreateUser'
    const options = {
        method: 'POST',
        body: JSON.stringify(dataUser),
        headers: {
            'content-type': 'application/json'
        }
    }
    // Create user
    await fetch(url, options)
        .then(response => {
            // Check response code 200
            if(response.ok) {
                // Redirect
                window.location.replace(window.location.origin.concat('/views/login-view.html'))
            }
        })
        .catch(error => console.log(error))
}

// Submit form register
function submitFormRegister(event) {
    event.preventDefault()
    const data = validateForm(event.target)
    // Loading
    loaderElement.style.display = 'block';
    CreateUser(data)
}

// Validate form
function validateForm(form) {
    const name = form.querySelector('.name').value
    const email = form.querySelector('.email').value
    const phoneNumber = form.querySelector('.phone-number').value
    const password = form.querySelector('.password').value
    const confirmPassword = form.querySelector('.confirm-password').value

    const user = {
        username: name,
        email: email,
        passwordHash: password,
        phoneNumber: phoneNumber
    }

    return user
}