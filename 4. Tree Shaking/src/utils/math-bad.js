/**
 * Phép cộng - ĐƯỢC SỬ DỤNG
 */
function add(a, b) {
    console.log(`Thực hiện phép cộng: ${a} + ${b}`);
    return a + b;
}

/**
 * Phép trừ - KHÔNG ĐƯỢC SỬ DỤNG
 */
function subtract(a, b) {
    console.log(`Thực hiện phép trừ: ${a} - ${b}`);
    return a - b;
}

/**
 * Phép nhân - ĐƯỢC SỬ DỤNG
 */
function multiply(a, b) {
    console.log(`Thực hiện phép nhân: ${a} × ${b}`);
    return a * b;
}

/**
 * Phép chia - KHÔNG ĐƯỢC SỬ DỤNG
 */
function divide(a, b) {
    console.log(`Thực hiện phép chia: ${a} ÷ ${b}`);
    if (b === 0) {
        throw new Error('Không thể chia cho 0');
    }
    return a / b;
}

/**
 * Phép lũy thừa - KHÔNG ĐƯỢC SỬ DỤNG
 */
function power(a, b) {
    console.log(`Thực hiện phép lũy thừa: ${a} ^ ${b}`);
    return Math.pow(a, b);
}

/**
 * Căn bậc hai - KHÔNG ĐƯỢC SỬ DỤNG
 */
function sqrt(a) {
    console.log(`Thực hiện căn bậc hai: √${a}`);
    if (a < 0) {
        throw new Error('Không thể tính căn bậc hai của số âm');
    }
    return Math.sqrt(a);
}

/**
 * Giai thừa - KHÔNG ĐƯỢC SỬ DỤNG
 */
function factorial(n) {
    console.log(`Thực hiện giai thừa: ${n}!`);
    if (n < 0) {
        throw new Error('Giai thừa không xác định cho số âm');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

/**
 * Ước chung lớn nhất - KHÔNG ĐƯỢC SỬ DỤNG
 */
function gcd(a, b) {
    console.log(`Tìm ước chung lớn nhất của ${a} và ${b}`);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Bội chung nhỏ nhất - KHÔNG ĐƯỢC SỬ DỤNG
 */
function lcm(a, b) {
    console.log(`Tìm bội chung nhỏ nhất của ${a} và ${b}`);
    return (a * b) / gcd(a, b);
}

/**
 * Kiểm tra số nguyên tố - KHÔNG ĐƯỢC SỬ DỤNG
 */
function isPrime(n) {
    console.log(`Kiểm tra ${n} có phải số nguyên tố không`);
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

/**
 * Tính tổng các chữ số - KHÔNG ĐƯỢC SỬ DỤNG
 */
function digitSum(n) {
    console.log(`Tính tổng các chữ số của ${n}`);
    return n.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

/**
 * Đảo ngược số - KHÔNG ĐƯỢC SỬ DỤNG
 */
function reverseNumber(n) {
    console.log(`Đảo ngược số ${n}`);
    return parseInt(n.toString().split('').reverse().join(''));
}

/**
 * Tính phần trăm - KHÔNG ĐƯỢC SỬ DỤNG
 */
function percentage(value, total) {
    console.log(`Tính phần trăm: ${value} trong ${total}`);
    return (value / total) * 100;
}

/**
 * Làm tròn đến n chữ số thập phân - KHÔNG ĐƯỢC SỬ DỤNG
 */
function roundTo(number, decimals) {
    console.log(`Làm tròn ${number} đến ${decimals} chữ số thập phân`);
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Tính trung bình cộng - KHÔNG ĐƯỢC SỬ DỤNG
 */
function average(numbers) {
    console.log(`Tính trung bình cộng của [${numbers.join(', ')}]`);
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Export tất cả hàm để có thể import theo cách khác
export default {
    add,
    subtract,
    multiply,
    divide,
    power,
    sqrt,
    factorial,
    gcd,
    lcm,
    isPrime,
    digitSum,
    reverseNumber,
    percentage,
    roundTo,
    average
};
