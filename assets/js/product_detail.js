'use strict';

// Get product by id
async function GetProductById() {
    const productId = window.localStorage.getItem('proId');
    const url = `https://localhost:44360/api/Product/GetProductById/${productId}`;
    const res = await fetch(url);
    const data = await res.json();
    await DisplayBreadcrumbProDetail(data);
    await DisplayProductDetail(data);
    await DisplayDescriptionProDetail(data);
}
// Hiển thị product detail
async function DisplayProductDetail(product) {
    const productDetailRoot = document.querySelector('.layout-product .product-detail-container');
    const html = `
    <div class="product-detail-left col-5">
        <div class="img">
            <img src="${product.DefaultImage}" alt="${product.Name}" class="img-main">
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper d-flex">
                <div class="swiper-slide swiper-slide-thumb-active">
                    <img src="${product.DefaultImage}">
                </div>
                ${product.Images.$values.map(img => `
                    <div class="swiper-slide">
                        <img src="${img.Url}">
                    </div>
                `).join("")}
            </div>
            <div class="swiper-button next">
                <i class="bi bi-chevron-right"></i>
            </div>
            <div class="swiper-button prev">
                <i class="bi bi-chevron-left"></i>
            </div>
        </div>
    </div>
    <div class="product-detail-right col-7">
        <h1 class="title-product">${product.Name}</h1>
        <div class="product-top">
            <span>Mã: </span>
            <span class="code">${product.Id}</span>
        </div>
        <div class="inventory_quantity d-flex align-items-center">
            <span class="mb-break">
                <span class="stock-brand-title">Thương hiệu:</span>
                <a href="#" class="a-vendor">${product.Brand}</a>
            </span>
            <span class="line"></span>
            <span class="mb-break">
                <span class="stock-brand-title">Tình trạng:</span>
                <span class="a-stock">${product.Quantity > 0 ? "Còn hàng" : "Hết hàng"}</span>
            </span>
        </div>
        <div class="price-box">
<<<<<<< HEAD
            <span class="special-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.PriceNew)}</span>
            <span class="price-hidden" style="visibility: hidden;">${product.PriceNew}</span>
=======
            <span class="special-price">${product.PriceNew} </span><span>₫</span>
>>>>>>> 5c2af451ab167abeffcd531fc7c49d5331d135d2
            <span class="old-price">
                <span class="text">Giá niêm yết: </span>
                <del>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.PriceOld)}</del>
            </span>
        </div>
        <div class="pro-discount">
            <div>
                <p class="pt-4">
                    <span class="icon"><i class="bi bi-check-lg"></i></span>
                    <span>Tặng 1 đôi vớ cầu lông VNB (vớ VNB dài nhiều màu hoặc vớ VNB ngắn)</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-lg"></i></span>
                    <span>Sản phẩm cam kết chính hãng</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-lg"></i></span>
                    <span>Thanh toán sau khi kiểm tra và nhận hàng</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-lg"></i></span>
                    <span>Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay)</span>
                </p>
                <p class="pt-4">
                    <span class="icon red"><i class="bi bi-gift-fill"></i></span>
                    <span class="fw-bold">Ưu đãi thêm khi mua sản phẩm tại VNB Premium</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-square-fill"></i></span>
                    <span>Sơn logo mặt vợt miễn phí</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-square-fill"></i></span>
                    <span>Bảo hành lưới đan trong 72 giờ</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-square-fill"></i></span>
                    <span>Thay gen vợt miễn phí trọn đời</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-square-fill"></i></span>
                    <span>Voucher giảm giá cho lần mua hàng tiếp theo</span>
                </p>
            </div>
            <div class="uu_dai">
                <img src="../assets/img/code_dis.gif">
                ƯU ĐÃI
            </div>
        </div>
        <form class="form-product">
            ${
                product.Name.toLowerCase().includes('giày cầu lông') ? `
                    <fieldset class="title">Chọn size:</fieldset>
                    <div class="select-size d-flex gap-2 pt-3">
                        <div class="item">
                            <input type="radio" checked class="btn-check" name="options-base" id="size-36" autocomplete="off">
                            <label class="btn btn-size" for="size-36">36</label>
                        </div>
                        <div class="item">
                            <input type="radio" class="btn-check" name="options-base" id="size-37" autocomplete="off">
                            <label class="btn btn-size" for="size-37">37</label>
                        </div>
                        <div class="item">
                            <input type="radio" class="btn-check" name="options-base" id="size-38" autocomplete="off">
                            <label class="btn btn-size" for="size-38">38</label>
                        </div>
                        <div class="item">
                            <input type="radio" class="btn-check" name="options-base" id="size-39" autocomplete="off">
                            <label class="btn btn-size" for="size-39">39</label>
                        </div>
                        <div class="item">
                            <input type="radio" class="btn-check" name="options-base" id="size-40" autocomplete="off">
                            <label class="btn btn-size" for="size-40">40</label>
                        </div>
                    </div>
                ` : ""
            }
            <div class="d-flex align-items-center mt-3">
                <div class="number-cart">
                    <div class="input_number_product">
                        <button type="button" class="btn-minus rounded-circle"
                                onclick="document.querySelector('.input_number_product input').value--">-</button>
                        <input type="text" value="1" min="1" maxlength="3" minlength="1">
                        <button type="button" class="btn-minus rounded-circle"
                                onclick="document.querySelector('.input_number_product input').value++">+</button>
                    </div>
                </div>
                <div class="btn-add_cart">
                    <button type="button" class="btn btn-outline-add" onclick="HandleAddCart()">
                        THÊM VÀO GIỎ HÀNG
                    </button>
                </div>
            </div>
        </form>
    </div>
    `;
    productDetailRoot.innerHTML = html;

    // Xử lý sự kiện img
    const swiper = document.querySelector(".swiper-wrapper"),
        swiperImgs = swiper.querySelectorAll(".swiper-slide img"),
        imgLeft = document.querySelector(".product-detail-left .img"),
        firstImg = swiper.querySelectorAll(".swiper-slide")[0],
        arrowIcons = document.querySelectorAll(".swiper-container .swiper-button");

    let isDragStart = false, prevPageX, prevScrollLeft;
    let firstImgWidth = firstImg.clientWidth + 6;
    let scrollWidth = swiper.scrollWidth - swiper.clientWidth;

    // Handle click sub img
    swiperImgs.forEach((img, index) => {
        img.addEventListener("click", () => {
            const html = `
                <img src="${img.src}" alt="" class="img-main">
            `;
            imgLeft.innerHTML = html
            handleImgActive(index)
        })
    })

    // Add class active into img
    const handleImgActive = (indexActive) => {
        swiperImgs.forEach((img, index) => {
            if(index === indexActive) {
                img.parentElement.classList.add("swiper-slide-thumb-active")
            } else
                img.parentElement.classList.remove("swiper-slide-thumb-active")
        })
    }

    const showHideIcons = () => {
        // Show hide arrow icon
        arrowIcons[0].style.display = swiper.scrollLeft === scrollWidth ? "none" : "block"
        arrowIcons[1].style.display = swiper.scrollLeft === 0 ? "none" : "block"
    }

    // Event click arrow icon
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            swiper.scrollLeft += icon.className.includes('next') ? firstImgWidth : -firstImgWidth
            setTimeout(() => showHideIcons(), 60)
        })
    })

    const dragStart = (e) => {
        isDragStart = true
        prevPageX = e.pageX
        prevScrollLeft = swiper.scrollLeft
    }

    const dragging = (e) => {
        if(!isDragStart) return
        e.preventDefault()
        swiper.classList.add("dragging")
        let positionDiff = e.pageX - prevPageX
        swiper.scrollLeft = prevScrollLeft - positionDiff
        showHideIcons()
    }

    const dragStop = () => {
        isDragStart = false
        swiper.classList.remove("dragging")
    }

    swiper.addEventListener('mousedown', dragStart);
    swiper.addEventListener('mousemove', dragging);
    swiper.addEventListener('mouseup', dragStop);
    swiper.addEventListener('mouseleave', dragStop);
}

// Xử lý thêm vào giỏ hàng
async function HandleAddCart() {
    const sessionId = document.cookie.split('; ').find(row => row.startsWith('cookieUser')).split('=')[1];
    const productId = document.querySelector('.product-detail-right .product-top .code').textContent;
    const quantity = document.querySelector('.product-detail-right .input_number_product input').value;
    const price = document.querySelector('.product-detail-right .price-box .price-hidden').textContent;
    
    const cartInfo = {
        SessionId: sessionId.toString(),
        ProductId: productId,
        Quantity: Number(quantity),
        Price: Number(price)
    };

    // Gửi request lên server
    await AddProductCart(cartInfo);
}

// Add product cart
async function AddProductCart(cartRequest) {
    const url = 'https://localhost:44360/api/Cart/AddProductCart';
    const options = {
        method: 'POST',
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
            toastr.success('Thêm vào giỏ hàng thành công');
        } else {
            console.error('Error updating cart. Status:', response.status);
        }
    } catch (error) {
        console.error('Network error during cart update:', error);
    }
}

// Hiển thị description product
async function DisplayDescriptionProDetail(product) {
    const descriptionRoot = document.querySelector('.layout-product .mota-product .content');
    const html = product.Description ? product.Description : 
        `
            <h2>1. Giới thiệu ${product.Name}</h2>
            <p>
                <a href="#">${product.Name}</a>
                chính hãng là dòng mới nhất mới được ra mắt trong năm 2023 với những đặc điểm 
                kế thừa sự TOÀN DIỆN của đàn anh SHB 65 trước đó. 
            </p>
            <p>Phần trên của giày được trang trí với họa tiết logo được ép nổi, tạo nên sự sang trọng 
                cho người sử dụng. Lớp da tổng hợp kết hợp với lỗ thoáng khí trên lớp vải mesh giúp giữ 
                cho đôi chân luôn thoải mái và thông thoáng, đặc biệt là trong điều kiện thời tiết khô 
                nóng khi phải hoạt động liên tục trên sân trong thời gian dài.
            </p>
            <img src="${product.DefaultImage}" alt="">
            <p>
                lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium, adipisci aliquam asperiores atque autem beatae
                commodi consequatur cumque cupiditate delectus doloremque
                doloribus ducimus ea earum eius eligendi eos error est
                exercitationem explicabo fugiat fugit hic id illum impedit
                incidunt ipsa ipsum iure laboriosam laborum libero magnam
            </p>
            <p>
                - Thương hiệu: ${product.Brand}
            </p>
            <h2>2. Công nghệ và các ưu điểm nổi bật trên giày cầu lông Yonex Cascade Drive 2 - Đen chính hãng</h2>
            <p><b>- POWER CUSHION:</b> Một vật liệu nhẹ, hấp thụ tác động được phát triển độc lập bởi Yonex, nhanh chóng trở lại 
                hình dạng ban đầu sau khi chịu lực tác động, chuyển đổi năng lượng tác động đó thành năng lượng cung cấp 
                cho các chuyển động tiếp theo để thực hiện các bước chân nhanh và nhẹ.
            </p>
        `;
    descriptionRoot.innerHTML = html;
}

// Hiển thị breadcrumb
async function DisplayBreadcrumbProDetail(product) {
    const breadcrumbRoot = document.querySelector('.section-breadcrumb .breadcrumb-main');
    const html = `
        <li class="breadcrumb-item"><a href="/index.html">Trang chủ</a></li>
        <li class="breadcrumb-item active" aria-current="page">${product.Name}</li>
    `;
    breadcrumbRoot.innerHTML = html;
}

// Get shop address
async function GetShopAddressProDetail() {
    const url = 'https://localhost:44360/api/ShopAddress/GetAllShopAddress';
    const res = await fetch(url);
    const data = await res.json();
    await DisplayShopAddressProDetail(data.$values);
}
// Hiển thị shop address
async function DisplayShopAddressProDetail(shopAddress) {
    const shopAddressRoot = document.querySelector('.layout-product .details-pro .list-cn');
    shopAddress.forEach(address => {
        const html = `
            <li class="item">${address.Title}</li>
        `;
        shopAddressRoot.innerHTML += html;
    });
}

// Get category
async function GetCategoriesProDetail() {
    const url = 'https://localhost:44360/api/Category/GetAllCategories';
    const res = await fetch(url);
    const data = await res.json();
    await DisplayCategoryProDetail(data.$values);
}

// Hiển thị category product
async function DisplayCategoryProDetail(categories) {
    const categoryRoot = document.querySelector('.layout-product .details-pro .nav-list');
    categories.forEach(category => {
        const html = `
            <li class="nav-item nav-item-lv1">
                <div class="nav-lv1">
                    <a href="${category.Name}" data-id="${category.Id}">${category.Name}</a>
                    <i class="bi bi-plus-lg icon icon-animation"></i>
                </div>
                ${
                    category.Subcategories.$values.length > 0 ? `
                        <ul class="menu_down nav-lv2">
                        ${
                            category.Subcategories.$values.map(subCategory => `
                                <li class="nav-item">
                                    <a href="${subCategory.Name}" data-id="${subCategory.Id}">${subCategory.Name}</a>
                                </li>
                            `).join("")
                        }
                        </ul>
                    ` : ""
                }
            </li>
        `;
        categoryRoot.innerHTML += html;
    });

    // Xử lý các sự kiện category
    // Select all icon mở menu down
    const iconOpenMenuDowns = document.querySelectorAll('.nav-category .nav-item-lv1 .icon');
    // Select all nav item
    const navItems = document.querySelectorAll('.nav-category .nav-item-lv1');
    navItems.forEach(item => {
        // Kiểm tra xem có menu down hay không
        const menuDown = item.querySelector('.menu_down');
        // Nếu không có menu down thì ẩn icon
        if(!menuDown) {
            item.querySelector('.icon').style.display = 'none';
        }
    })
    iconOpenMenuDowns.forEach(icon => {
        // Thêm sự kiện click vào icon
        icon.addEventListener('click', function () {
            // Lấy ra thẻ cha
            const parentTag = icon.parentNode;
            const menuDown = parentTag.parentNode.querySelector('.menu_down');
            if(menuDown) {
                // Kiểm tra xem menu down có đang mở hay không
                const isOpen = parentTag.classList.contains('openMenuDown');
                if(isOpen) {
                    // Đóng menu down
                    menuDown.style.display = 'none';
                    parentTag.classList.remove('openMenuDown');

                    /* Animation icon */
                    // this.classList.remove('icon-animation__close')
                    this.style.animation = "rotateIconNavClose 0.2s ease-in-out";

                    // Thay đổi icon
                    this.classList.remove('bi-dash-lg');
                    this.classList.add('bi-plus-lg');

                } else {
                    // Mở menu down
                    menuDown.style.display = 'block';
                    parentTag.classList.add('openMenuDown');

                    /* Animation icon */
                    // this.classList.add('icon-animation__open')
                    this.style.animation = "rotateIconNavOpen 0.2s ease-in-out";

                    // Thay đổi icon
                    this.classList.remove('bi-plus-lg');
                    this.classList.add('bi-dash-lg');
                }
            }
        })
    })
}

GetProductById();
GetShopAddressProDetail();
GetCategoriesProDetail();
