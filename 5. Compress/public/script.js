// JavaScript File lớn để test Compression - Demo Frontend Optimization

/**
 * Demo compression với JavaScript file lớn
 * File này chứa nhiều functions, comments và repetitive code
 * để minh họa hiệu quả của compression
 */

// Global variables để test compression
const COMPRESSION_DEMO_CONFIG = {
    version: '1.0.0',
    author: 'Frontend Optimization Demo',
    description: 'Demo file để test compression với Nginx',
    features: {
        gzip: true,
        brotli: false,
        caching: true,
        minification: false
    },
    statistics: {
        originalSize: 0,
        compressedSize: 0,
        compressionRatio: 0,
        loadTime: 0
    }
};

// Class để quản lý compression demo
class CompressionDemo {
    constructor() {
        this.startTime = performance.now();
        this.originalFileSize = 0;
        this.compressedFileSize = 0;
        this.compressionRatio = 0;
        this.isCompressionEnabled = false;
        
        this.init();
        this.bindEvents();
        this.trackPerformance();
    }
    
    init() {
        console.log('🚀 Khởi tạo Compression Demo');
        console.log('📊 Cấu hình:', COMPRESSION_DEMO_CONFIG);
        
        this.detectCompressionSupport();
        this.measureFileSize();
        // this.displayStatistics();
        this.setupInteractiveFeatures();
    }
    
    detectCompressionSupport() {
        // Kiểm tra support cho các loại compression
        const supportedEncodings = [];
        
        if (this.supportsGzip()) {
            supportedEncodings.push('gzip');
        }
        
        if (this.supportsBrotli()) {
            supportedEncodings.push('brotli');
        }
        
        if (this.supportsDeflate()) {
            supportedEncodings.push('deflate');
        }
        
        console.log('🔍 Supported encodings:', supportedEncodings);
        this.displayEncodingSupport(supportedEncodings);
    }
    
    supportsGzip() {
        // Check if browser supports gzip
        return 'gzip' in window || this.checkAcceptEncoding('gzip');
    }
    
    supportsBrotli() {
        // Check if browser supports brotli
        return 'brotli' in window || this.checkAcceptEncoding('br');
    }
    
    supportsDeflate() {
        // Check if browser supports deflate
        return 'deflate' in window || this.checkAcceptEncoding('deflate');
    }
    
    checkAcceptEncoding(encoding) {
        // Simulate checking Accept-Encoding header
        const userAgent = navigator.userAgent;
        const supportMap = {
            'gzip': true, // Most browsers support gzip
            'br': userAgent.includes('Chrome') || userAgent.includes('Firefox'),
            'deflate': true // Most browsers support deflate
        };
        
        return supportMap[encoding] || false;
    }
    
    measureFileSize() {
        // Simulate measuring file sizes
        fetch(window.location.href)
            .then(response => {
                const contentLength = response.headers.get('content-length');
                const contentEncoding = response.headers.get('content-encoding');
                
                if (contentLength) {
                    this.originalFileSize = parseInt(contentLength);
                }
                
                if (contentEncoding) {
                    this.isCompressionEnabled = true;
                    console.log('✅ Compression detected:', contentEncoding);
                } else {
                    console.log('❌ No compression detected');
                }
                
                this.calculateCompressionRatio();
            })
            .catch(error => {
                console.error('Error measuring file size:', error);
            });
    }
    
    calculateCompressionRatio() {
        if (this.originalFileSize > 0 && this.compressedFileSize > 0) {
            this.compressionRatio = this.originalFileSize / this.compressedFileSize;
        } else {
            // Simulate compression ratio for demo
            this.compressionRatio = this.isCompressionEnabled ? 2.5 : 1.0;
        }
        
        console.log(`📏 Compression ratio: ${this.compressionRatio.toFixed(2)}x`);
    }
    
    displayStatistics() {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'compression-stats';
        statsContainer.innerHTML = `
            <div class="stats-overlay">
                <h3>📊 Compression Statistics</h3>
                <div class="stat-item">
                    <span class="label">Compression Status:</span>
                    <span class="value ${this.isCompressionEnabled ? 'enabled' : 'disabled'}">
                        ${this.isCompressionEnabled ? '✅ Enabled' : '❌ Disabled'}
                    </span>
                </div>
                <div class="stat-item">
                    <span class="label">Compression Ratio:</span>
                    <span class="value">${this.compressionRatio.toFixed(2)}x</span>
                </div>
                <div class="stat-item">
                    <span class="label">Estimated Savings:</span>
                    <span class="value">${this.calculateSavings()}%</span>
                </div>
                <button class="close-stats" onclick="this.parentElement.style.display='none'">×</button>
            </div>
        `;
        
        // Add styles for stats overlay
        const style = document.createElement('style');
        style.textContent = `
            .compression-stats {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
            }
            
            .stats-overlay {
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #667eea;
                border-radius: 10px;
                padding: 1rem;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
                min-width: 250px;
                backdrop-filter: blur(10px);
            }
            
            .stats-overlay h3 {
                margin: 0 0 1rem 0;
                color: #667eea;
                font-size: 1.1rem;
            }
            
            .stat-item {
                display: flex;
                justify-content: space-between;
                margin: 0.5rem 0;
                font-size: 0.9rem;
            }
            
            .stat-item .label {
                font-weight: 500;
                color: #333;
            }
            
            .stat-item .value {
                font-weight: 600;
            }
            
            .stat-item .value.enabled {
                color: #28a745;
            }
            
            .stat-item .value.disabled {
                color: #dc3545;
            }
            
            .close-stats {
                position: absolute;
                top: 5px;
                right: 8px;
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #999;
            }
            
            .close-stats:hover {
                color: #333;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(statsContainer);
    }
    
    calculateSavings() {
        if (this.compressionRatio > 1) {
            return Math.round((1 - (1 / this.compressionRatio)) * 100);
        }
        return 0;
    }
    
    displayEncodingSupport(encodings) {
        console.log('🔧 Setting up encoding support display');
        
        encodings.forEach(encoding => {
            console.log(`✅ ${encoding.toUpperCase()} compression supported`);
        });
        
        if (encodings.length === 0) {
            console.log('❌ No compression encoding supported');
        }
    }
    
    setupInteractiveFeatures() {
        this.setupSmoothScrolling();
        this.setupButtonAnimations();
        this.setupStatsTracking();
        this.setupPerformanceMonitoring();
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    setupButtonAnimations() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple-animation {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    setupStatsTracking() {
        // Track user interactions
        let clickCount = 0;
        let scrollDepth = 0;
        let timeOnPage = 0;
        
        document.addEventListener('click', () => {
            clickCount++;
            console.log(`👆 Total clicks: ${clickCount}`);
        });
        
        window.addEventListener('scroll', () => {
            const currentScrollDepth = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (currentScrollDepth > scrollDepth) {
                scrollDepth = currentScrollDepth;
                console.log(`📜 Max scroll depth: ${scrollDepth}%`);
            }
        });
        
        setInterval(() => {
            timeOnPage++;
            console.log(`⏱️ Time on page: ${timeOnPage} seconds`);
        }, 1000);
    }
    
    setupPerformanceMonitoring() {
        // Monitor page performance
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`⚡ Page load time: ${loadTime.toFixed(2)}ms`);
            
            // Performance API measurements
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                
                if (navigation) {
                    console.log('📊 Performance Metrics:');
                    console.log(`- DNS Lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`);
                    console.log(`- TCP Connect: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`);
                    console.log(`- Request: ${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms`);
                    console.log(`- Response: ${(navigation.responseEnd - navigation.responseStart).toFixed(2)}ms`);
                    console.log(`- DOM Parse: ${(navigation.domContentLoadedEventEnd - navigation.responseEnd).toFixed(2)}ms`);
                }
            }
        });
    }
    
    bindEvents() {
        // Handle compression test buttons
        document.addEventListener('DOMContentLoaded', () => {
            const testButtons = document.querySelectorAll('.btn');
            
            testButtons.forEach(button => {
                if (button.textContent.includes('Test')) {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.runCompressionTest(button.getAttribute('href'));
                    });
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            console.log(`📐 Window resized: ${window.innerWidth}x${window.innerHeight}`);
        });
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('🙈 Page hidden');
            } else {
                console.log('👀 Page visible');
            }
        });
    }
    
    runCompressionTest(url) {
        console.log(`🧪 Running compression test for: ${url}`);
        
        const startTime = performance.now();
        
        fetch(url, {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br'
            }
        })
        .then(response => {
            const endTime = performance.now();
            const loadTime = endTime - startTime;
            
            console.log(`⏱️ Load time: ${loadTime.toFixed(2)}ms`);
            console.log(`📦 Content-Encoding: ${response.headers.get('content-encoding') || 'none'}`);
            console.log(`📏 Content-Length: ${response.headers.get('content-length') || 'unknown'}`);
            
            this.showTestResults({
                url: url,
                loadTime: loadTime,
                encoding: response.headers.get('content-encoding'),
                size: response.headers.get('content-length')
            });
        })
        .catch(error => {
            console.error('❌ Test failed:', error);
        });
    }
    
    showTestResults(results) {
        const modal = document.createElement('div');
        modal.className = 'test-results-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🧪 Compression Test Results</h3>
                <div class="result-item">
                    <strong>URL:</strong> ${results.url}
                </div>
                <div class="result-item">
                    <strong>Load Time:</strong> ${results.loadTime.toFixed(2)}ms
                </div>
                <div class="result-item">
                    <strong>Encoding:</strong> ${results.encoding || 'None'}
                </div>
                <div class="result-item">
                    <strong>Size:</strong> ${results.size || 'Unknown'} bytes
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .test-results-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
            }
            
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .modal-content h3 {
                margin: 0 0 1rem 0;
                color: #667eea;
            }
            
            .result-item {
                margin: 0.5rem 0;
                padding: 0.5rem;
                background: #f8f9fa;
                border-radius: 5px;
            }
            
            .close-modal {
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 1rem;
            }
        `;
        
        document.head.appendChild(modalStyle);
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            modalStyle.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                modalStyle.remove();
            }
        });
    }
    
    trackPerformance() {
        // Monitor resource loading
        if ('performance' in window && 'PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'resource') {
                        console.log(`📁 Resource loaded: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
}

// Utility functions for compression demo
const CompressionUtils = {
    formatBytes: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    calculateCompressionRatio: function(original, compressed) {
        if (compressed === 0) return 0;
        return (original / compressed).toFixed(2);
    },
    
    generateRandomData: function(size) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < size; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    },
    
    simulateCompression: function(data, algorithm = 'gzip') {
        // Simulate compression by reducing string length
        const compressionRatios = {
            'gzip': 0.3,
            'brotli': 0.25,
            'deflate': 0.35
        };
        
        const ratio = compressionRatios[algorithm] || 0.3;
        const compressedLength = Math.floor(data.length * ratio);
        
        return {
            original: data.length,
            compressed: compressedLength,
            ratio: (data.length / compressedLength).toFixed(2),
            algorithm: algorithm
        };
    }
};

// Additional features for demonstration
const DemoFeatures = {
    showLoadingSpinner: function() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = '🔄 Loading...';
        document.body.appendChild(spinner);
        return spinner;
    },
    
    hideLoadingSpinner: function(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    },
    
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    animateCounter: function(element, start, end, duration = 1000) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
};

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting Compression Demo...');
    
    // Create demo instance
    const demo = new CompressionDemo();
    
    // Log demo information
    console.log('📋 Demo Features:');
    console.log('- Compression detection');
    console.log('- Performance monitoring');
    console.log('- Interactive elements');
    console.log('- Statistics tracking');
    
    // Simulate some data for compression testing
    const testData = CompressionUtils.generateRandomData(10000);
    const compressionTest = CompressionUtils.simulateCompression(testData);
    
    console.log('🧪 Compression Test Results:');
    console.log(`- Original size: ${CompressionUtils.formatBytes(compressionTest.original)}`);
    console.log(`- Compressed size: ${CompressionUtils.formatBytes(compressionTest.compressed)}`);
    console.log(`- Compression ratio: ${compressionTest.ratio}x`);
    console.log(`- Algorithm: ${compressionTest.algorithm}`);
    
    // Add global reference for debugging
    window.CompressionDemo = demo;
    window.CompressionUtils = CompressionUtils;
    window.DemoFeatures = DemoFeatures;
    
    console.log('✅ Compression Demo initialized successfully!');
});

// Performance logging
console.log('📊 Script parsing completed');
console.log(`🕐 Script load time: ${performance.now()}ms`);
