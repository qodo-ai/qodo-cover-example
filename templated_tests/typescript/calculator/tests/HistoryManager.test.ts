import { expect } from 'chai';
import 'mocha';
import HistoryManager, { HistoryRecord } from '../src/modules/HistoryManager';

describe('HistoryManager', () => {
    let historyManager: HistoryManager;

    beforeEach(() => {
        historyManager = new HistoryManager();
    });

    it('should add a record and retrieve it', () => {
        const record: HistoryRecord = {
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


});