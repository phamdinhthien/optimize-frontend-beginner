// Create a large array of random numbers
function generateData(size) {
    return Array.from({ length: size }, () => Math.random());
}

// Bubble sort implementation (intentionally inefficient)
function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Unoptimized processing function
function processDataUnoptimized(size = 50000) {
    const statusEl = document.getElementById('status');
    const durationEl = document.getElementById('duration');
    const progressEl = document.getElementById('progress-unoptimized');
    const button = document.getElementById('run-unoptimized');

    statusEl.textContent = 'Processing...';
    button.disabled = true;
    progressEl.style.width = '0%';

    const startTime = performance.now();
    
    // Generate and sort data (will block UI)
    const data = generateData(size);
    bubbleSort(data);
    
    const duration = performance.now() - startTime;
    
    // Update UI after processing
    statusEl.textContent = 'Completed';
    durationEl.textContent = `${Math.round(duration)}ms`;
    progressEl.style.width = '100%';
    button.disabled = false;
}

// Add event listener
document.getElementById('run-unoptimized').addEventListener('click', () => {
    processDataUnoptimized();
});
