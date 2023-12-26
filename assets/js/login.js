
const loaderElement = document.querySelector('.loader-container');

 async function submitFormLogin(event) {
    event.preventDefault();
    const data = validateForm(event.target);
    // Loading
    loaderElement.style.display = 'block';
    await login(data);
}

// Login form
async function login(data) {
    const url = `https://localhost:44360/api/User/Login/${data.email}/${data.password}`;
    // Login
    await fetch (url)
        .then(response => {
            if(response.ok) {
                response.json().then(data => {
                    // Set local storage userId
                    window.localStorage.setItem("userId", data);
                });
                // Redirect
                window.location.replace(window.location.origin.concat("/"));
                // Display a success toast, with a title
                toastr.success('Đăng nhập thành công', 'Chào mừng bạn đến với Shop');
            } else if (response.status == 404) {
                loaderElement.style.display = 'none';
                const messageError = document.querySelector(".message-error");
                messageError.innerHTML = "Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại";
                // Remove local storage userId
                window.localStorage.removeItem("userId");
            }
        })
        .catch(error => console.log("Error: " + error));
}

// Validate form
function validateForm(form) {
    var email = form.querySelector(".email").value;
    var password = form.querySelector(".password").value;
    var data = {
        email: email,
        password: password
    };

    return data;
}