
// Hàm trigger reflow (layout)
function triggerReflow() {
    console.log('=== TRIGGERING REFLOW ===');
    const startTime = performance.now();
    
    const boxes = document.querySelectorAll('.box');
    
    // Đọc layout properties sẽ force reflow
    boxes.forEach((box, index) => {
        const rect = box.getBoundingClientRect();
        console.log(`Box ${index + 1} dimensions:`, {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
        });
        
        // Thay đổi kích thước để trigger layout
        box.style.width = `${200 + Math.random() * 50}px`;
        box.style.height = `${150 + Math.random() * 30}px`;
    });
    
    // Force layout calculation
    document.body.offsetHeight;
    
    const endTime = performance.now();
    console.log(`Reflow completed in: ${(endTime - startTime).toFixed(2)}ms`);
    
    // Reset sau 2 giây
    setTimeout(() => {
        boxes.forEach(box => {
            box.style.width = '200px';
            box.style.height = '150px';
        });
    }, 2000);
}

// Hàm trigger repaint
function triggerRepaint() {
    console.log('=== TRIGGERING REPAINT ===');
    const startTime = performance.now();
    
    const boxes = document.querySelectorAll('.box');
    const colors = [
        'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        'linear-gradient(45deg, #4ecdc4, #44a08d)',
        'linear-gradient(45deg, #a8e6cf, #7fcdcd)',
        'linear-gradient(45deg, #feca57, #ff9ff3)',
        'linear-gradient(45deg, #48dbfb, #0abde3)'
    ];
    
    boxes.forEach(box => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        box.style.background = randomColor;
    });
    
    const endTime = performance.now();
    console.log(`Repaint completed in: ${(endTime - startTime).toFixed(2)}ms`);
    
    // Reset sau 2 giây
    setTimeout(() => {
        document.querySelector('.box-1').style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        document.querySelector('.box-2').style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
        document.querySelector('.box-3').style.background = 'linear-gradient(45deg, #a8e6cf, #7fcdcd)';
    }, 2000);
}

// Hàm thêm element mới
function addElement() {
    console.log('=== ADDING NEW ELEMENT ===');
    const startTime = performance.now();
    
    const container = document.querySelector('.box-container');
    const newBox = document.createElement('div');
    newBox.className = 'box';
    newBox.style.background = 'linear-gradient(45deg, #feca57, #ff9ff3)';
    newBox.textContent = `Box ${container.children.length + 1}`;
    newBox.style.animation = 'slideInUp 0.5s ease-out';
    
    // Thêm element sẽ trigger layout
    container.appendChild(newBox);
    
    const endTime = performance.now();
    console.log(`Element added in: ${(endTime - startTime).toFixed(2)}ms`);
    
    // Xóa sau 3 giây
    setTimeout(() => {
        if (newBox.parentNode) {
            newBox.remove();
        }
    }, 3000);
}
