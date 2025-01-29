import { expect } from 'chai';
import 'mocha';
import AdvancedCalculator from '../src/modules/AdvancedCalculator.js';

describe('AdvancedCalculator', () => {
    let calc;

    beforeEach(() => {
        calc = new AdvancedCalculator();
    });

    it('should compute factorial correctly', () => {
        // Press digits "5"
        calc.buttonPressed({ type: 'number', value: '5' });
        expect(calc.onDisplay).to.equal('5');

        // factorial of 5
        const result = calc.factorial();
        expect(result).to.equal(120);
        expect(calc.onDisplay).to.equal('120');
    });

    it('should compute sqrt correctly', () => {
        // Press digits "9"
        calc.buttonPressed({ type: 'number', value: '9' });
        expect(calc.onDisplay).to.equal('9');
    
        // sqrt of 9
        const result = calc.sqrt();
        expect(result).to.equal(3);
        expect(calc.onDisplay).to.equal('3');
    });


    it('should throw an error when no number on display for sqrt', () => {
        expect(() => calc.sqrt()).to.throw('No number on display to compute sqrt');
    });


    it('should throw an error when no number on display for factorial', () => {
        expect(() => calc.factorial()).to.throw('No number on display to compute factorial');
    });



});