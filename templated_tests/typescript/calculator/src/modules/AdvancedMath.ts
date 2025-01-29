/**
 * AdvancedMath.ts
 *
 * Provides additional math functions (e.g., factorial, sqrt, sin, cos, tan).
 */

export function factorial(n: number): number {
    if (n < 0) {
        throw new Error('Cannot compute factorial of a negative number');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

export function sqrt(n: number): number {
    if (n < 0) {
        throw new Error('Cannot compute square root of a negative number in real domain');
    }
    return Math.sqrt(n);
}

export function sin(n: number): number {
    return Math.sin(n);
}

export function cos(n: number): number {
    return Math.cos(n);
}

export function tan(n: number): number {
    return Math.tan(n);
}

/**
 * Add more advanced operations here as needed.
 * For instance, log(), exp(), etc.
 */