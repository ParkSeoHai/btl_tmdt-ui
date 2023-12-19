'use strict';

GetProductById();

// Get product by id
async function GetProductById() {
    const productId = window.localStorage.getItem('proId');
    const url = `https://localhost:44360/api/Product/GetProductById/${productId}`;
    const res = await fetch(url);
    const data = await res.json();
    await DisplayProductDetail(data);
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
                    <img src="../assets/img/product-detail-1.webp">
                </div>
                <div class="swiper-slide" tabindex="2">
                    <img src="../assets/img/product-detail-2.webp">
                </div>
                <div class="swiper-slide" tabindex="3">
                    <img src="../assets/img/product-detail-3.webp">
                </div>
                <div class="swiper-slide" tabindex="4">
                    <img src="../assets/img/product-detail-4.webp">
                </div>
                <div class="swiper-slide" tabindex="5">
                    <img src="../assets/img/product-detail-5.webp">
                </div>
                <div class="swiper-slide" tabindex="6">
                    <img src="../assets/img/product-detail-6.webp">
                </div>
                <div class="swiper-slide" tabindex="7">
                    <img src="../assets/img/product-detail-7.webp">
                </div>
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
            <span class="special-price">${product.PriceNew} ₫</span>
            <span class="old-price">
                <span class="text">Giá niêm yết: </span>
                <del>${product.PriceOld} ₫</del>
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
                    <span>Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay)</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-square-fill"></i></span>
                    <span>Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay)</span>
                </p>
                <p>
                    <span class="icon"><i class="bi bi-check-square-fill"></i></span>
                    <span>Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay)</span>
                </p>
            </div>
            <div class="uu_dai">
                <img src="../assets/img/code_dis.gif">
                ƯU ĐÃI
            </div>
        </div>
        <form class="form-product">
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
                    <button type="submit" class="btn btn-outline-add">THÊM VÀO GIỎ HÀNG</button>
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