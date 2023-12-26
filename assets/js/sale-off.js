
// Get product sales
async function GetProductSales() {
    const url = `https://localhost:44360/api/Product/GetProductSales`;
    const response = await fetch(url);
    const data = await response.json();
    await ShowSaleOff(data.$values);
}

// Hiển thị sản phẩm khuyến mãi
async function ShowSaleOff(products) {
    const htmlRoot = document.querySelector('.product-sale-container');
    products.forEach(product => {
        const html = `
            <div class="col-6 col-md-3">
                <div class="item_product_main">
                <div class="product-thumbnail">
                    <a class="product_overlay pro-sale-link" data-id="${product.Id}" href="${product.Name}" title="${product.Name}"></a>
                    <a class="image_thumb pro-sale-link" data-id="${product.Id}" href="${product.Name}" title="${product.Name}">
                        <img width="300" height="300" class="lazyload loaded" src="${product.DefaultImage}" data-was-processed="true">
                    </a>
                    <span class="smart">Giảm ${product.Discount}%</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">
                        <a href="${product.Name}" data-id="${product.Id}" class="pro-sale-link" title="${product.Name}">${product.Name}</a>
                    </h3>
                    <div class="price-box">
                        <span class="price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.PriceNew)}</span>
                        <span class="compare-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.PriceOld)}</span>
                    </div>
                </div>
                </div>
            </div>
        `;

        htmlRoot.innerHTML += html;
    });

    const productLinks = document.querySelectorAll('.product-sale-container .pro-sale-link');
    productLinks.forEach(productLink => {
        productLink.addEventListener('click', function(e) {
            e.preventDefault();
            const proId = productLink.dataset.id;
            localStorage.setItem('proId', proId);
            window.location.href = `/views/productDetail.html`;
        });
    });
}

GetProductSales();