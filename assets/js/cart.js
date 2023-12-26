
// Lấy cookieUser
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}

// Kiểm tra cookieUser đã tồn tại chưa
let cookieUser = getCookie('cookieUser');

// Xử lý sự kiện click icon remove product cart
async function HandleRemoveProCart(icon) {
    const cartItem = icon.closest('.cart-item-header');
    const productId = cartItem.querySelector('input[name="cart-quantity"]').dataset.id;

    const url = `https://localhost:44360/api/Cart/RemoveProductCart/${cookieUser.toString()}/${productId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.ok) {
            // Hiển thị lại cart
            await checkCookieUser();
        } else {
            console.error('Error removing product. Status:', response.status);
        }
    } catch (error) {
        console.error('Network error during product remove:', error);
    }
}

// Xử lý sự kiện click quantity product
async function HandleButtonQuantity(action, button) {
    const cartItem = button.closest('.cart-item-header');
    const quantityInput = cartItem.querySelector('input[name="cart-quantity"]');
    const productId = quantityInput.dataset.id;

    if (action === '-') {
        if (quantityInput.value > 1) {
            quantityInput.value--;
            // Thay đổi số lượng sản phẩm trong giỏ hàng trên Server
            const cartRequest = {
                sessionId: cookieUser.toString(),
                productId: productId,
                quantity: Number(quantityInput.value),
            };
            await UpdateCart(cartRequest);
        }
    } else {
        quantityInput.value++;
        // Thay đổi số lượng sản phẩm trong giỏ hàng trên Server
        const cartRequest = {
            sessionId: cookieUser.toString(),
            productId: productId,
            quantity: Number(quantityInput.value),
        };
        await UpdateCart(cartRequest);
    }
}

// Update cart khi thay đổi số lượng sản phẩm trên Server
async function UpdateCart(cartRequest) {
    const url = 'https://localhost:44360/api/Cart/UpdateCart';
    const options = {
        method: 'PUT',
        body: JSON.stringify(cartRequest),
        headers: {
            'content-type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.ok) {
            // Hiển thị lại cart
            await checkCookieUser();
        } else {
            console.error('Error updating cart. Status:', response.status);
        }
    } catch (error) {
        console.error('Network error during cart update:', error);
    }
}

// Hiển thị cart
async function DisplayCart(cartRoot, cartProducts) {
    cartRoot.innerHTML = '';
    let priceSum = 0;   // Tổng tiền
    cartProducts.forEach(product => {
        priceSum += product.Price * product.Quantity;
    });
    const html = `
        <div class="basket-not-empty">
            <div class="title_cart-header">
                <a href="views/shoe-cart.html">Giỏ hàng</a>
            </div>

            <div class="cart_body-header">
                ${
                    cartProducts.map(product => {
                        return `
                        <div class="cart-item-header">
                            <div class="cart-item-header-img">
                                <a href="${product.Name}" data-id="${product.Id}">
                                    <img src="${product.DefaultImage}" alt="${product.Name}">
                                </a>
                            </div>
                            <div class="cart-item-info-header">
                                <div class="cart-item-name-header">
                                    <a href="${product.Name}" data-id="${product.Id}">${product.Name}</a>
                                <div class="icon" onclick="HandleRemoveProCart(this)">
                                    <i class="bi bi-x-circle"></i>
                                </div>
                            </div>
                                <div class="cart-item-name-bottom mt-2 d-flex align-items-center justify-content-between">
                                    <div class="d-flex cart-quantity">
                                        <button type="button" onclick="HandleButtonQuantity('-', this)">-</button>
                                        <input type="text" name="cart-quantity" data-id="${product.Id}" value="${product.Quantity}" min="1">
                                        <button type="button" onclick="HandleButtonQuantity('+', this)" >+</button>
                                    </div>
                                    <div class="cart-price">
                                        <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.Price)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    }).join('')
                }
            </div>
            <div class="cart-bottom-header">
                <div class="cart-bottom-price d-flex justify-content-between">
                    <span>Tổng tiền</span>
                    <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceSum)}</span>
                </div>
                <button type="button" class="btn btn-dathang">Đặt hàng</button>
            </div>
        </div>
    `;
    cartRoot.innerHTML += html;

    // Xử lý sự kiện click product
    const productLinks = document.querySelectorAll('.basket-not-empty .cart-item-header a');
    productLinks.forEach(productLink => {
        productLink.addEventListener('click', function (e) {
            e.preventDefault();
            const proId = productLink.dataset.id;
            localStorage.setItem('proId', proId);
            window.location.href = `/views/productDetail.html`;
        });
    });

    // Xử lý sự kiện click button Đặt hàng
    const btnOrder = document.querySelector('.basket-not-empty .cart-bottom-header .btn-dathang');
    btnOrder.addEventListener('click', function (e) {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if(userId) {
            window.location.href = `/views/thanh-toan.html`;
        } else {
            alert('Bạn cần đăng nhập để đặt hàng');
            window.location.href = `/views/login-view.html`;
        }
    });
}

// 

// Kiem tra cookieUser
async function checkCookieUser() {
    if(cookieUser == '') {
        // Tạo cookieUser
        cookieUser = Math.floor(Math.random() * 10000000000);
        document.cookie = `cookieUser=${cookieUser}`;
    
        const url = 'https://localhost:44360/api/Cart/CreateCart';
        const options = {
            method: 'POST',
            body: JSON.stringify({
                sesstionId: cookieUser.toString()
            }),
            headers: {
                'content-type': 'application/json'
            }
        }
        // Create cart
        await fetch(url, options)
            .then(response => {
                // Check response code 200
                if(!response.ok) {
                    // Xóa cookieUser
                    document.cookie = `cookieUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                }
            })
            .catch(error => {
                // Xóa cookieUser
                document.cookie = `cookieUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                console.log(error);
            })
    } else {
        const cartRoot = document.querySelector('.basket-member');

        const url = `https://localhost:44360/api/Cart/GetProductCart/${cookieUser}`;
        // Get cart
        const res = await fetch(url);
        if(res.ok) {
            const data = await res.json();
            const cartProducts = data.productCartDtos.$values;

                const iconCart = document.querySelector('#header .cart-icon-quantity');
                if(cartProducts.length > 0) {
                    iconCart.innerHTML = `
                        <i class="bi bi-cart-fill"></i>
                        <p>${cartProducts.length}</p>
                    `;

                    await DisplayCart(cartRoot, cartProducts);
                } else {
                    cartRoot.innerHTML = '';
                    iconCart.innerHTML = `
                        <i class="bi bi-cart-fill"></i>
                        <p>${cartProducts.length}</p>
                    `;

                    const html = `
                        <div class="basket-empty">
                            <i class="bi bi-bag-plus"></i>
                            <span>Không có sản phẩm nào trong giỏ hàng của bạn</span>
                        </div>
                    `;
                    cartRoot.innerHTML += html;
                }
        } else {
            // Xóa cookieUser
            document.cookie = `cookieUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        
        // await fetch(url)
        //     .then(response => {
        //         // Check response code 200
        //         console.log(response);
        //         if(!response.ok) {
        //             // Xóa cookieUser
        //             document.cookie = `cookieUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        //         } else {
        //             return response.json();
        //         }
        //     })
        //     .then(async (data) => {
        //         const cartProducts = data.productCartDtos.$values;

        //         const iconCart = document.querySelector('#header .cart-icon-quantity');
        //         if(cartProducts.length > 0) {
        //             iconCart.innerHTML = `
        //                 <i class="bi bi-cart-fill"></i>
        //                 <p>${cartProducts.length}</p>
        //             `;

        //             await DisplayCart(cartRoot, cartProducts);
        //         } else {
        //             cartRoot.innerHTML = '';
        //             iconCart.innerHTML = `
        //                 <i class="bi bi-cart-fill"></i>
        //                 <p>${cartProducts.length}</p>
        //             `;

        //             const html = `
        //                 <div class="basket-empty">
        //                     <i class="bi bi-bag-plus"></i>
        //                     <span>Không có sản phẩm nào trong giỏ hàng của bạn</span>
        //                 </div>
        //             `;
        //             cartRoot.innerHTML += html;
        //         }
        //     })
        //     .catch(error => {
        //         // Xóa cookieUser
        //         document.cookie = `cookieUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        //         console.log(error);
        //     })
    }
}

checkCookieUser();