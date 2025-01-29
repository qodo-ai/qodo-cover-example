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

    it('should return correct square root for a positive number', () => {
      expect(sqrt(9)).to.equal(3);
    });


    it('should correctly compute the sine of a number', () => {
      expect(sin(Math.PI / 2)).to.be.closeTo(1, 0.001);
    });


    it('should throw error for base one', () => {
      expect(() => log(10, 1)).to.throw('Invalid logarithm base');
    });


    it('should throw error for zero input', () => {
      expect(() => ln(0)).to.throw('Cannot compute natural logarithm of a non-positive number');
    });


    it('should correctly compute e raised to the power of a positive number', () => {
      expect(exp(2)).to.be.closeTo(7.389, 0.001);
    });


    it('should throw error for non-number input', () => {
      expect(() => sqrt('a')).to.throw('Input must be a number');
    });


    it('should throw error for negative input', () => {
      expect(() => sqrt(-4)).to.throw('Cannot compute square root of a negative number in real domain');
    });


    it('should throw error for non-integer input', () => {
      expect(() => factorial(3.5)).to.throw('Factorial is only defined for integers');
    });

    });


});