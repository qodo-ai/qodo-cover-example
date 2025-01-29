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

    it('should correctly compute cosine of a number', () => {
        expect(cos(0)).to.equal(1);
    });


    it('should correctly compute sine of a number', () => {
        expect(sin(Math.PI / 2)).to.be.closeTo(1, 0.0001);
    });


    it('should throw error for negative input in sqrt', () => {
        expect(() => sqrt(-4)).to.throw('Cannot compute square root of a negative number in real domain');
    });


    it('should correctly compute square root of a positive number', () => {
        expect(sqrt(9)).to.equal(3);
    });

    });
});