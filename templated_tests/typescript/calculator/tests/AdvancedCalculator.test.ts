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

    it('should retrieve correct history after operations', () => {
        // Perform factorial of 5
        calc.buttonPressed({ type: 'number', value: '5' });
        calc.factorial();
    
        // Perform sqrt of 9
        calc.buttonPressed({ type: 'number', value: '9' });
        calc.sqrt();
    
        const history = calc.getHistory();
        expect(history).to.have.lengthOf(2);
        expect(history[0].operationName).to.equal('factorial');
        expect(history[1].operationName).to.equal('sqrt');
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


    it('should throw an error when sqrt is called without a number on display', () => {
        expect(() => calc.sqrt()).to.throw('No number on display to compute sqrt');
    });


    it('should throw an error when factorial is called without a number on display', () => {
        expect(() => calc.factorial()).to.throw('No number on display to compute factorial');
    });



});