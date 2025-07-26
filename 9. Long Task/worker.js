// Web Worker implementation of bubble sort
function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        // Report progress every iteration
        if (i % 1000 === 0) {
            // self.postMessage({
            //     type: 'progress',
            //     progress: (i / len) * 100
            // });
        }
    }
    return arr;
}

// Handle messages from main thread
self.addEventListener('message', (e) => {
    if (e.data.type === 'start') {
        const { data } = e.data;
        const startTime = performance.now();
        
        // Sort the data
        const sortedData = bubbleSort(data);
        const duration = performance.now() - startTime;

        // Send back the result
        self.postMessage({
            type: 'complete',
            duration,
            result: sortedData
        });
    }
});
