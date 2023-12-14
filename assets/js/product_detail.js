
const swiper = document.querySelector(".swiper-wrapper"),
    swiperImgs = swiper.querySelectorAll(".swiper-slide img"),
    imgLeft = document.querySelector(".product-detail-left .img"),
    firstImg = swiper.querySelectorAll(".swiper-slide")[0],
    arrowIcons = document.querySelectorAll(".swiper-container .swiper-button")

let isDragStart = false, prevPageX, prevScrollLeft
let firstImgWidth = firstImg.clientWidth + 6
let scrollWidth = swiper.scrollWidth - swiper.clientWidth

// Handle click sub img
swiperImgs.forEach((img, index) => {
    img.addEventListener("click", () => {
        console.log(img.src)
        const html = `
            <img src="${img.src}" alt="" class="img-main">
        `;
        console.log(html)
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

swiper.addEventListener('mousedown', dragStart)
swiper.addEventListener('mousemove', dragging)
swiper.addEventListener('mouseup', dragStop)
swiper.addEventListener('mouseleave', dragStop)
