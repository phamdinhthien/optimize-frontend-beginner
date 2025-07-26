// Intersection Observer Lazy Loading Demo
let lazyLoadingEnabled = true;
let imagesLoaded = 0;
const totalImages = 20;
let observer = null;
let observerConfig = {
    rootMargin: '50px',
    threshold: 0
};


// DOM elements
const imageGallery = document.getElementById('image-gallery');
const imagesLoadedElement = document.getElementById('images-loaded');
const networkSavedElement = document.getElementById('network-saved');
const lazyStatusElement = document.getElementById('lazy-status');
const toggleTextElement = document.getElementById('toggle-text');
const browserSupportElement = document.getElementById('browser-support-status');
const rootMarginSelect = document.getElementById('root-margin');
const thresholdSelect = document.getElementById('threshold');

document.addEventListener('DOMContentLoaded', function() {
    checkBrowserSupport();
    initializeObserver();
    generateImages();
    updateStats();
});

function checkBrowserSupport() {
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    if (supportsIntersectionObserver) {
        browserSupportElement.innerHTML = '✅ Browser của bạn hỗ trợ Intersection Observer!';
        browserSupportElement.style.color = '#28a745';
    } else {
        browserSupportElement.innerHTML = '❌ Browser của bạn không hỗ trợ Intersection Observer';
        browserSupportElement.style.color = '#dc3545';
    }
}

function initializeObserver() {
    if (!('IntersectionObserver' in window)) {
        lazyLoadingEnabled = false;
        toggleTextElement.textContent = 'Lazy Loading không khả dụng';
        lazyStatusElement.textContent = 'OFF';
        lazyStatusElement.style.color = '#dc3545';
        return;
    }

    if (observer) {
        observer.disconnect();
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, observerConfig);
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
    imageItem.dataset.index = index;    
    
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.innerHTML = `<span>🖼️ Ảnh #${index}</span>`;
    placeholder.dataset.src = `https://picsum.photos/400/300?random=${index}&t=${Date.now()}`;
    placeholder.dataset.index = index;
    
    const img = document.createElement('img');
    img.alt = `Demo Image ${index}`;
    img.style.display = 'none';
    
    const imageInfo = document.createElement('div');
    imageInfo.className = 'image-info';
    
    const imageTitle = document.createElement('div');
    imageTitle.className = 'image-title';
    imageTitle.textContent = `Ảnh #${index}`;
    
    const imageStatus = document.createElement('span');
    imageStatus.className = 'image-status status-loading';
    imageStatus.textContent = lazyLoadingEnabled ? 'Chờ vào viewport...' : 'Loading...';
    
    imageInfo.appendChild(imageTitle);
    imageInfo.appendChild(imageStatus);
    
    imageItem.appendChild(placeholder);
    imageItem.appendChild(img);
    imageItem.appendChild(imageInfo);
    
    if (lazyLoadingEnabled && observer) {
        observer.observe(placeholder);
    } else if (!lazyLoadingEnabled) {
        loadImage(placeholder);
    }
    
    return imageItem;
}

function loadImage(placeholder) {
    const imageItem = placeholder.parentElement;
    const img = imageItem.querySelector('img');
    updateImageStatus(imageItem, 'loading');
    
    const tempImg = new Image();

    tempImg.src = placeholder.dataset.src;
    
    tempImg.onload = function() {
        img.src = tempImg.src;
        img.style.display = 'block';
        placeholder.remove();
        imagesLoaded++;
        updateStats();
        updateImageStatus(imageItem, 'loaded');
    };
    
    tempImg.onerror = function() {
        updateImageStatus(imageItem, 'error');
    };
}

function updateImageStatus(imageItem, status) {
    const statusElement = imageItem.querySelector('.image-status');
    statusElement.className = `image-status status-${status}`;
    
    switch (status) {
        case 'loading':
            statusElement.textContent = '⏳ Đang load...';
            break;
        case 'loaded':
            statusElement.textContent = '✅ Đã load';
            break;
        case 'error':
            statusElement.textContent = '❌ Lỗi load';
            break;
        default:
            statusElement.textContent = 'Chờ vào viewport...';
    }
}

function updateStats() {
    imagesLoadedElement.textContent = imagesLoaded;
    const networkSaved = totalImages - imagesLoaded;
    networkSavedElement.textContent = networkSaved;
    lazyStatusElement.textContent = lazyLoadingEnabled ? 'ON' : 'OFF';
    lazyStatusElement.style.color = lazyLoadingEnabled ? '#28a745' : '#dc3545';
}

function toggleLazyLoading() {
    lazyLoadingEnabled = !lazyLoadingEnabled;
    toggleTextElement.textContent = lazyLoadingEnabled ? 'Tắt Lazy Loading' : 'Bật Lazy Loading';
    
    if (observer) {
        observer.disconnect();
    }
    
    if (lazyLoadingEnabled) {
        initializeObserver();
    }
    
    generateImages();
}

function updateObserverConfig() {
    observerConfig.rootMargin = rootMarginSelect.value;
    observerConfig.threshold = parseFloat(thresholdSelect.value);
    
    if (lazyLoadingEnabled) {
        initializeObserver();
        generateImages();
    }
}

function loadAllImages() {
    const allPlaceholders = imageGallery.querySelectorAll('.placeholder');
    allPlaceholders.forEach(placeholder => {
        if (observer) {
            observer.unobserve(placeholder);
        }
        const imageItem = placeholder.parentElement;
        const img = imageItem.querySelector('img');
        if (img && img.style.display === 'none') {
            loadImage(placeholder);
        }
    });
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
window.updateObserverConfig = updateObserverConfig;
window.loadAllImages = loadAllImages;
window.reloadPage = reloadPage;
window.scrollToTop = scrollToTop;

window.addEventListener('beforeunload', function() {
    if (observer) {
        observer.disconnect();
    }
});
