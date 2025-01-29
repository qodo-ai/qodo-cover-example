import { expect } from 'chai';
import 'mocha';
import { factorial, sqrt, sin, cos, tan } from '../src/modules/AdvancedMath';

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
    });
});