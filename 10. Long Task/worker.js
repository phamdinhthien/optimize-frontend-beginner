// Web Worker implementation of square calculation
function calculateSquares(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        // Add artificial delay to simulate heavy computation
        const start = performance.now();
        while (performance.now() - start < 0.1) {} // 0.1ms delay per item

        sum += arr[i] * arr[i];

        // Report progress every 100 items
        if (i % 100 === 0) {
            self.postMessage({
                type: 'progress',
                progress: (i / arr.length) * 100
            });
        }
    }
    return sum;
}

// Handle messages from main thread
self.addEventListener('message', (e) => {
    if (e.data.type === 'start') {
        const { data } = e.data;
        const startTime = performance.now();
        
        // Calculate sum of squares
        const result = calculateSquares(data);
        const duration = performance.now() - startTime;

        // Send back the result
        self.postMessage({
            type: 'complete',
            duration,
            result
        });
    }
});
