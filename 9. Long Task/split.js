// Create a large array of random numbers (shared function)
function generateData(size) {
    return Array.from({ length: size }, () => Math.random());
}

// Web Worker Version
class WorkerVersion {
    constructor() {
        this.worker = new Worker('worker.js');
        this.setupWorker();
    }

    setupWorker() {
        this.worker.onmessage = (e) => {
            if (e.data.type === 'progress') {
                document.getElementById('progress-worker').style.width = `${e.data.progress}%`;
            } else if (e.data.type === 'complete') {
                this.onComplete(e.data.duration);
            }
        };
    }

    process(size = 50000) {
        const statusEl = document.getElementById('status');
        const progressEl = document.getElementById('progress-worker');
        const button = document.getElementById('run-worker');

        statusEl.textContent = 'Processing in Worker...';
        button.disabled = true;
        progressEl.style.width = '0%';

        const data = generateData(size);
        this.worker.postMessage({
            type: 'start',
            data
        });
    }

    onComplete(duration) {
        const statusEl = document.getElementById('status');
        const durationEl = document.getElementById('duration');
        const progressEl = document.getElementById('progress-worker');
        const button = document.getElementById('run-worker');

        statusEl.textContent = 'Worker Completed';
        durationEl.textContent = `${Math.round(duration)}ms`;
        progressEl.style.width = '100%';
        button.disabled = false;
    }
}

// Task Splitting Version
class SplitVersion {
    constructor() {
        this.chunkSize = 1000; // Process 1000 items at a time
        this.data = [];
        this.currentIndex = 0;
        this.startTime = 0;
    }

    process(size = 50000) {
        const statusEl = document.getElementById('status');
        const button = document.getElementById('run-split');
        const progressEl = document.getElementById('progress-split');

        statusEl.textContent = 'Processing in Chunks...';
        button.disabled = true;
        progressEl.style.width = '0%';

        this.data = generateData(size);
        this.currentIndex = 0;
        this.startTime = performance.now();

        // Schedule the first chunk
        requestAnimationFrame(() => this.processChunk());
    }

    processChunk() {
        const endIndex = Math.min(this.currentIndex + this.chunkSize, this.data.length);
        const chunk = this.data.slice(this.currentIndex, endIndex);

        // Process this chunk
        this.sortChunk(chunk, this.currentIndex);
        
        // Update progress
        const progress = (endIndex / this.data.length) * 100;
        document.getElementById('progress-split').style.width = `${progress}%`;

        // Move to next chunk or complete
        this.currentIndex = endIndex;
        if (this.currentIndex < this.data.length) {
            // Schedule next chunk with requestAnimationFrame to allow UI updates
            requestAnimationFrame(() => this.processChunk());
        } else {
            this.onComplete();
        }
    }

    sortChunk(chunk, startIndex) {
        // Sort the chunk
        for (let i = 0; i < chunk.length; i++) {
            for (let j = 0; j < chunk.length - i - 1; j++) {
                if (chunk[j] > chunk[j + 1]) {
                    [chunk[j], chunk[j + 1]] = [chunk[j + 1], chunk[j]];
                }
            }
        }
        
        // Put sorted chunk back into main array
        for (let i = 0; i < chunk.length; i++) {
            this.data[startIndex + i] = chunk[i];
        }
    }

    onComplete() {
        const duration = performance.now() - this.startTime;
        const statusEl = document.getElementById('status');
        const durationEl = document.getElementById('duration');
        const button = document.getElementById('run-split');

        statusEl.textContent = 'Split Tasks Completed';
        durationEl.textContent = `${Math.round(duration)}ms`;
        button.disabled = false;
    }
}

// Initialize and add event listeners
const workerVersion = new WorkerVersion();
const splitVersion = new SplitVersion();

document.getElementById('run-worker').addEventListener('click', () => {
    workerVersion.process();
});

document.getElementById('run-split').addEventListener('click', () => {
    splitVersion.process();
});
