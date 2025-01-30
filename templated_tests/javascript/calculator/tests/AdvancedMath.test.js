import { expect } from 'chai';
import 'mocha';
import { log } from '../src/modules/AdvancedMath.js';
import { ln } from '../src/modules/AdvancedMath.js';
import { exp } from '../src/modules/AdvancedMath.js';
import { factorial, sqrt, sin, cos, tan } from '../src/modules/AdvancedMath.js';

describe('AdvancedMath Functions', () => {
    describe('factorial', () => {
        it('should return 1 for 0!', () => {
            expect(factorial(0)).to.equal(1);
        });

        it('should correctly compute factorial of a positive number', () => {
            expect(factorial(5)).to.equal(120);
        });

        it('should throw error for negative input', () => {
            expect(() => factorial(-1)).to.throw('Cannot compute factorial of a negative number');
        });

    it('should return correct log value for positive number and valid base', () => {
      expect(log(100, 10)).to.equal(2);
    });


    it('should return correct value for positive exponent in exp', () => {
      expect(exp(1)).to.be.closeTo(Math.E, 0.0001);
    });


    it('should return correct square root for positive number', () => {
      expect(sqrt(4)).to.equal(2);
    });


    it('should return correct value for known input in sin', () => {
        expect(sin(Math.PI / 2)).to.be.closeTo(1, 0.0001);
    });


    it('should throw error for zero base in log', () => {
        expect(() => log(10, 0)).to.throw('Invalid logarithm base');
    });


    it('should throw error for non-number input in sqrt', () => {
        expect(() => sqrt('a')).to.throw('Input must be a number');
    });


    it('should throw error for zero input in ln', () => {
        expect(() => ln(0)).to.throw('Cannot compute natural logarithm of a non-positive number');
    });


    it('should throw error for non-number input in exp', () => {
        expect(() => exp('a')).to.throw('Input must be a number');
    });


    it('should throw error for negative input in sqrt', () => {
        expect(() => sqrt(-4)).to.throw('Cannot compute square root of a negative number in real domain');
    });


    it('should throw error for non-integer input', () => {
        expect(() => factorial(5.5)).to.throw('Factorial is only defined for integers');
    });

    });


});