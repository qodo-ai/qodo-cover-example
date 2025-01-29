/**
 * AdvancedMath.js
 * 
 * Provides advanced mathematical functions including trigonometry,
 * logarithms, statistics, and special functions.
 */

/**
 * Computes the factorial of a non-negative integer.
 * @param {number} n - The number to compute factorial for
 * @returns {number} The factorial of n
 * @throws {Error} If n is negative or not an integer
 */
export function factorial(n) {
    if (!Number.isInteger(n)) {
        throw new Error('Factorial is only defined for integers');
    }
    if (n < 0) {
        throw new Error('Cannot compute factorial of a negative number');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Computes the square root of a non-negative number.
 * @param {number} n - The number to compute square root for
 * @returns {number} The square root of n
 * @throws {Error} If n is negative
 */
export function sqrt(n) {
    if (typeof n !== 'number' || isNaN(n)) {
        throw new Error('Input must be a number');
    }
    if (n < 0) {
        throw new Error('Cannot compute square root of a negative number in real domain');
    }
    return Math.sqrt(n);
}

/**
 * Computes e raised to the power of x.
 * @param {number} x - The exponent
 * @returns {number} e^x
 */
export function exp(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.exp(x);
}

/**
 * Computes the natural logarithm (base e) of a number.
 * @param {number} x - The number to compute logarithm for
 * @returns {number} The natural logarithm of x
 * @throws {Error} If x is negative or zero
 */
export function ln(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    if (x <= 0) {
        throw new Error('Cannot compute natural logarithm of a non-positive number');
    }
    return Math.log(x);
}

/**
 * Computes the logarithm of a number with a specified base.
 * @param {number} x - The number to compute logarithm for
 * @param {number} base - The base of the logarithm (default is 10)
 * @returns {number} The logarithm of x with the specified base
 * @throws {Error} If x is negative or zero, or if base is negative, zero, or 1
 */
export function log(x, base = 10) {
    if (typeof x !== 'number' || isNaN(x) || typeof base !== 'number' || isNaN(base)) {
        throw new Error('Inputs must be numbers');
    }
    if (x <= 0) {
        throw new Error('Cannot compute logarithm of a non-positive number');
    }
    if (base <= 0 || base === 1) {
        throw new Error('Invalid logarithm base');
    }
    return Math.log(x) / Math.log(base);
}

/**
 * Trigonometric and inverse trigonometric functions
 * All angles are in radians
 */

export function sin(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.sin(x);
}

export function cos(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.cos(x);
}

export function tan(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.tan(x);
}

export function asin(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    if (x < -1 || x > 1) {
        throw new Error('arcsine is only defined for inputs between -1 and 1');
    }
    return Math.asin(x);
}

export function acos(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    if (x < -1 || x > 1) {
        throw new Error('arccosine is only defined for inputs between -1 and 1');
    }
    return Math.acos(x);
}

export function atan(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.atan(x);
}

/**
 * Hyperbolic functions
 */

export function sinh(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.sinh(x);
}

export function cosh(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.cosh(x);
}

export function tanh(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.tanh(x);
}

/**
 * Additional utility functions
 */

/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} x - The number to round
 * @param {number} decimals - Number of decimal places (default is 0)
 * @returns {number} The rounded number
 */
export function round(x, decimals = 0) {
    if (typeof x !== 'number' || isNaN(x) || typeof decimals !== 'number' || !Number.isInteger(decimals)) {
        throw new Error('Invalid input: x must be a number and decimals must be an integer');
    }
    const factor = Math.pow(10, decimals);
    return Math.round(x * factor) / factor;
}

/**
 * Calculates the absolute value of a number.
 * @param {number} x - The input number
 * @returns {number} The absolute value of x
 */
export function abs(x) {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error('Input must be a number');
    }
    return Math.abs(x);
}

/**
 * Raises a number to a power.
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @returns {number} base raised to the power of exponent
 */
export function power(base, exponent) {
    if (typeof base !== 'number' || isNaN(base) || typeof exponent !== 'number' || isNaN(exponent)) {
        throw new Error('Both base and exponent must be numbers');
    }
    if (base === 0 && exponent < 0) {
        throw new Error('Cannot raise zero to a negative power');
    }
    return Math.pow(base, exponent);
}

/**
 * Statistical functions
 */

/**
 * Calculates the mean of an array of numbers.
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The arithmetic mean
 */
export function mean(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array of numbers');
    }
    if (!numbers.every(n => typeof n === 'number' && !isNaN(n))) {
        throw new Error('All array elements must be numbers');
    }
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The median value
 */
export function median(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array of numbers');
    }
    if (!numbers.every(n => typeof n === 'number' && !isNaN(n))) {
        throw new Error('All array elements must be numbers');
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

/**
 * Calculates the standard deviation of an array of numbers.
 * @param {number[]} numbers - Array of numbers
 * @param {boolean} population - If true, calculates population standard deviation,
 *                              if false, calculates sample standard deviation (default)
 * @returns {number} The standard deviation
 */
export function standardDeviation(numbers, population = false) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array of numbers');
    }
    if (!numbers.every(n => typeof n === 'number' && !isNaN(n))) {
        throw new Error('All array elements must be numbers');
    }

    const avg = mean(numbers);
    const squareDiffs = numbers.map(n => Math.pow(n - avg, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, num) => sum + num, 0) /
        (population ? numbers.length : numbers.length - 1);

    return Math.sqrt(avgSquareDiff);
}