

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