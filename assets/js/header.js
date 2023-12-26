'use strict';

const userId = localStorage.getItem('userId');
if(userId) {
    const accListElement = document.querySelector('#header .acc-list');
    accListElement.innerHTML = `
        <ul>
        <li>
            <a href="/views/user-main-view.html">
                <span>Trang cá nhân</span>
            </a>
        </li>
        <li>
            <a href="/dang-xuat" onclick="dangXuat(event)">
                <span>Đăng xuất</span>
            </a>
        </li>
        </ul>
    `;
}

// Đăng xuất user
function dangXuat(event) {
    event.preventDefault();
    localStorage.removeItem('userId');
    window.location.href = '/';
}

// Fetch categories dữ liệu từ API
async function getCategoriesHeader() {
    const url = 'https://localhost:44360/api/Category/GetAllCategories';
    const res = await fetch(url);
    const data = await res.json();

    await displayCategoryHeader(data);
}

// Hiển thị categories
async function displayCategoryHeader(categories) {
    const bottomHeader = document.querySelector('#header .bottom-header .list-menu-row');
    categories.$values.forEach(category => {
        let col = `
            <div class="col list-menu-member">
                <div class="col-heading">
                    <a class="col-header" href="${category.Name}" data-id="${category.Id}">${category.Name}</a>
                </div>
                <ul class="d-inline list-sub-category">
        `;

        category.Subcategories.$values.forEach(subcategory => {
            const liItem = `
                <li><a href="${subcategory.Name}" data-id="${subcategory.Id}">${subcategory.Name}</a></li>
            `;

            col += liItem;
        });
        col += '</ul></div>';

        bottomHeader.innerHTML += col;
    });

    // Xử lý sự kiện click sub category
    const subCategories = document.querySelectorAll('#header .bottom-header .list-menu-row .list-sub-category li a');
    subCategories.forEach(subCategory => {
        subCategory.addEventListener('click', (e) => {
            e.preventDefault();
            const subCategoryId = e.target.dataset.id;
            localStorage.setItem('subCategoryId', subCategoryId);
            localStorage.removeItem('CategoryId');
            window.location.href = '/views/product-category.html';
        });
    });

    // Xử lý sự kiện click category
    const categoriesHeader = document.querySelectorAll('#header .bottom-header .list-menu-row .col-heading a');
    categoriesHeader.forEach(categoryHeader => {
        categoryHeader.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = e.target.dataset.id;
            localStorage.setItem('CategoryId', categoryId);
            localStorage.removeItem('subCategoryId');
            window.location.href = '/views/product-category.html';
        });
    });
}

getCategoriesHeader();