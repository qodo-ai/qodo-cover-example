import { expect } from 'chai';
import 'mocha';
import AdvancedCalculator from '../src/modules/AdvancedCalculator';

describe('AdvancedCalculator', () => {
    let calc: AdvancedCalculator;

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


});