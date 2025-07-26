// Generate numbers from 1 to N
function generateData(size) {
    return Array.from({ length: size }, (_, i) => i + 1);
}

// Calculate sum of squares (intentionally inefficient with delays)
function calculateSquares(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        // Add artificial delay to simulate heavy computation
        const start = performance.now();
        while (performance.now() - start < 0.1) {} // 0.1ms delay per item

        sum += arr[i] * arr[i];
    }
    return sum;
}

// Unoptimized processing function
function processDataUnoptimized(size = 50000) {
    const statusEl = document.getElementById('status');
    const durationEl = document.getElementById('duration');
    const progressEl = document.getElementById('progress-unoptimized');
    const button = document.getElementById('run-unoptimized');

    statusEl.textContent = 'Calculating squares...';
    button.disabled = true;
    progressEl.style.width = '0%';

    const startTime = performance.now();
    
    // Calculate sum of squares (will block UI)
    const data = generateData(size);
    const result = calculateSquares(data);
    statusEl.textContent = `Sum: ${result}`;
    
    const duration = performance.now() - startTime;
    
    // Update UI after processing
    durationEl.textContent = `${Math.round(duration)}ms`;
    progressEl.style.width = '100%';
    button.disabled = false;
}

// Add event listener
document.getElementById('run-unoptimized').addEventListener('click', () => {
    processDataUnoptimized();
});
