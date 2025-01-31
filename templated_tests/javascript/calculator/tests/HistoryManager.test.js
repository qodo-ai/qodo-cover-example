import { expect } from 'chai';
import 'mocha';
import HistoryManager from '../src/modules/HistoryManager.js';

describe('HistoryManager', () => {
    let historyManager;

    beforeEach(() => {
        historyManager = new HistoryManager();
    });

    it('should add a record and retrieve it', () => {
        const record = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        historyManager.addRecord(record);

        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(1);
        expect(allHistory[0]).to.deep.equal(record);
    });

    it('should return correct operation summary', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5
        };
        const record2 = {
            operationName: 'add',
            leftOperand: 4,
            rightOperand: 5,
            result: 9
        };
        const record3 = {
            operationName: 'multiply',
            leftOperand: 2,
            rightOperand: 3,
            result: 6
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
        historyManager.addRecord(record3);
        
        const summary = historyManager.getOperationSummary();
        expect(summary).to.deep.equal({
            add: 2,
            multiply: 1
        });
    });


    it('should throw error for invalid record format in JSON data', () => {
        const invalidJson = JSON.stringify([
            {
                operationName: 'add',
                leftOperand: 'two',
                rightOperand: 3,
                result: 5
            }
        ]);
        expect(() => historyManager.importHistory(invalidJson)).to.throw('Failed to import history: Invalid record format in JSON data.');
    });


    it('should throw error when JSON data is not an array', () => {
        const invalidJson = JSON.stringify({
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5
        });
        expect(() => historyManager.importHistory(invalidJson)).to.throw('Failed to import history: JSON data is not an array of records.');
    });


    it('should import valid JSON data', () => {
        const validJson = JSON.stringify([
            {
                operationName: 'add',
                leftOperand: 2,
                rightOperand: 3,
                result: 5
            },
            {
                operationName: 'multiply',
                leftOperand: 4,
                rightOperand: 5,
                result: 20
            }
        ]);
        historyManager.importHistory(validJson);
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(2);
        expect(allHistory[0]).to.deep.equal({
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5
        });
        expect(allHistory[1]).to.deep.equal({
            operationName: 'multiply',
            leftOperand: 4,
            rightOperand: 5,
            result: 20
        });
    });


    it('should return records within result range', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 1,
            rightOperand: 1,
            result: 2,
        };
        const record2 = {
            operationName: 'multiply',
            leftOperand: 2,
            rightOperand: 3,
            result: 6,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const rangeResult = historyManager.getRecordsByResultRange(1, 5);
        expect(rangeResult).to.have.lengthOf(1);
        expect(rangeResult[0]).to.deep.equal(record1);
    });


    it('should return records matching operation name', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 1,
            rightOperand: 1,
            result: 2,
        };
        const record2 = {
            operationName: 'multiply',
            leftOperand: 2,
            rightOperand: 3,
            result: 6,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const searchResult = historyManager.searchHistoryByOperationName('add');
        expect(searchResult).to.have.lengthOf(1);
        expect(searchResult[0]).to.deep.equal(record1);
    });


    it('should export history as JSON string', () => {
        const record = {
            operationName: 'multiply',
            leftOperand: 4,
            rightOperand: 5,
            result: 20,
        };
        historyManager.addRecord(record);
    
        const exportedHistory = historyManager.exportHistory();
        expect(exportedHistory).to.equal(JSON.stringify([record]));
    });


    it('should return last record when history is not empty', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2 = {
            operationName: 'subtract',
            leftOperand: 5,
            rightOperand: 2,
            result: 3,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.deep.equal(record2);
    });


    it('should clear history', () => {
        const record = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        historyManager.addRecord(record);
        historyManager.clearHistory();
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(0);
    });


    it('should return null for empty history in undoLastOperation', () => {
        const undoneRecord = historyManager.undoLastOperation();
        expect(undoneRecord).to.be.null;
    });


    it('should return null for empty history in getLastRecord', () => {
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.be.null;
    });



});