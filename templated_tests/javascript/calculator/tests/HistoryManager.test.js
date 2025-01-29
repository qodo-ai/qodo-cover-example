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

    it('should get records by result range', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2 = {
            operationName: 'multiply',
            leftOperand: 4,
            rightOperand: 5,
            result: 20,
        };
        const record3 = {
            operationName: 'subtract',
            leftOperand: 10,
            rightOperand: 3,
            result: 7,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
        historyManager.addRecord(record3);
    
        const rangeResults = historyManager.getRecordsByResultRange(5, 10);
        expect(rangeResults).to.have.lengthOf(2);
        expect(rangeResults).to.deep.include(record1);
        expect(rangeResults).to.deep.include(record3);
    });


    it('should search history by operation name', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2 = {
            operationName: 'multiply',
            leftOperand: 4,
            rightOperand: 5,
            result: 20,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const searchResults = historyManager.searchHistoryByOperationName('add');
        expect(searchResults).to.have.lengthOf(1);
        expect(searchResults[0]).to.deep.equal(record1);
    });


    it('should export history as JSON string', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2 = {
            operationName: 'multiply',
            leftOperand: 4,
            rightOperand: 5,
            result: 20,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const exportedHistory = historyManager.exportHistory();
        expect(exportedHistory).to.equal(JSON.stringify([record1, record2]));
    });


    it('should return last record when history is not empty', () => {
        const record1 = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2 = {
            operationName: 'multiply',
            leftOperand: 4,
            rightOperand: 5,
            result: 20,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.deep.equal(record2);
    });


    it('should throw error for invalid JSON string in importHistory', () => {
        const invalidJsonString = '{"operationName": "add", "leftOperand": 2, "rightOperand": 3, "result": 5';
        expect(() => historyManager.importHistory(invalidJsonString)).to.throw('Failed to import history: Unexpected end of JSON input');
    });


    it('should clear history successfully', () => {
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


    it('should return null when undoing last operation from empty history', () => {
        const undoneRecord = historyManager.undoLastOperation();
        expect(undoneRecord).to.be.null;
    });


    it('should return null when getting last record from empty history', () => {
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.be.null;
    });



});