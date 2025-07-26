// Native Lazy Loading Demo
let lazyLoadingEnabled = true;
let imagesLoaded = 0;
const totalImages = 20;

// DOM elements
const imageGallery = document.getElementById('image-gallery');
const imagesLoadedElement = document.getElementById('images-loaded');
const networkSavedElement = document.getElementById('network-saved');
const lazyStatusElement = document.getElementById('lazy-status');
const toggleTextElement = document.getElementById('toggle-text');
const browserSupportElement = document.getElementById('browser-support-status');

document.addEventListener('DOMContentLoaded', function() {
    checkBrowserSupport();
    generateImages();
    updateStats();
});

function checkBrowserSupport() {
    const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;
    
    if (supportsLazyLoading) {
        browserSupportElement.innerHTML = '✅ Browser của bạn hỗ trợ Native Lazy Loading!';
        browserSupportElement.style.color = '#28a745';
    } else {
        browserSupportElement.innerHTML = '❌ Browser của bạn không hỗ trợ Native Lazy Loading';
        browserSupportElement.style.color = '#dc3545';
    }
}

function generateImages() {
    imageGallery.innerHTML = '';
    imagesLoaded = 0;
    
    for (let i = 1; i <= totalImages; i++) {
        const imageItem = createImageItem(i);
        imageGallery.appendChild(imageItem);
    }
    
    updateStats();
}

function createImageItem(index) {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    
    const img = document.createElement('img');
    img.src = `https://picsum.photos/400/300?random=${index}`;
    img.alt = `Demo Image ${index}`;
    img.loading = lazyLoadingEnabled ? 'lazy' : 'eager';
    
    img.addEventListener('load', function() {
        imagesLoaded++;
        updateStats();
        updateImageStatus(imageItem, 'loaded');
    });
    
    img.addEventListener('error', function() {
        updateImageStatus(imageItem, 'error');
    });
    
    const imageInfo = document.createElement('div');
    imageInfo.className = 'image-info';
    
    const imageTitle = document.createElement('div');
    imageTitle.className = 'image-title';
    imageTitle.textContent = `Ảnh #${index}`;
    
    const imageStatus = document.createElement('span');
    imageStatus.className = 'image-status status-loading';
    imageStatus.textContent = lazyLoadingEnabled ? 'Lazy Loading...' : 'Loading...';
    
    imageInfo.appendChild(imageTitle);
    imageInfo.appendChild(imageStatus);
    
    imageItem.appendChild(img);
    imageItem.appendChild(imageInfo);
    
    return imageItem;
}

function updateImageStatus(imageItem, status) {
    imageItem.getElementsByTagName('img')[0].classList.add('loaded');
    const statusElement = imageItem.querySelector('.image-status');
    
    statusElement.className = `image-status status-${status}`;
    
    switch (status) {
        case 'loaded':
            statusElement.textContent = '✅ Đã load';
            break;
        case 'error':
            statusElement.textContent = '❌ Lỗi load';
            break;
        default:
            statusElement.textContent = 'Loading...';
    }
}

function updateStats() {
    imagesLoadedElement.textContent = imagesLoaded;
    const networkSaved = lazyLoadingEnabled ? (totalImages - imagesLoaded) : 0;
    networkSavedElement.textContent = networkSaved;
    lazyStatusElement.textContent = lazyLoadingEnabled ? 'ON' : 'OFF';
    lazyStatusElement.style.color = lazyLoadingEnabled ? '#28a745' : '#dc3545';
}

function toggleLazyLoading() {
    lazyLoadingEnabled = !lazyLoadingEnabled;
    toggleTextElement.textContent = lazyLoadingEnabled ? 'Tắt Lazy Loading' : 'Bật Lazy Loading';
    generateImages();
}

function reloadPage() {
    window.location.reload();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions for global access
window.toggleLazyLoading = toggleLazyLoading;
window.reloadPage = reloadPage;
window.scrollToTop = scrollToTop;
