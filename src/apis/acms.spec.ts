import { Acms } from './acms';

describe('ACMS', () => {
    const mockMessage = {
        acid: 'EC-IGK',
        aircraftType: 'A320',
        flightNumber: 'CHUNKY',
        tailNumber: 'N981W',
        transmissionDate: new Date('2019-09-25T09:00:00.000Z'),
        receptionDate: new Date('2019-09-25T09:00:00.000Z'),
        rawData: 'testssssss111',
        messageType: 'CMS',
        messageSubType: 'FM',
        faultMessages: [
            {
                eventDate: new Date('2019-09-25T09:00:00.000Z'),
                ata: '361100',
                text: 'PRESS REG-V 4001HA2 OR SOL 10HA2 OR SENSE LINE',
                source: 'BMC 2',
                flightPhase: 5,
                flightNumber: 'CHUNKY23',
                tailNumber: 'N981W',
                type: 'INTERMITTENT',
                c2Afect: false,
                classNumber: 1,
                identifiers: 'string',
                lVarName: 'A3NX:BRAKES_HOT',
                lVarValue: true,
            },
        ],
    };

    const mockMessageUpdated = {
        acid: 'EC-IGK',
        aircraftType: 'A320',
        flightNumber: 'CHUNKY23',
        tailNumber: 'N981W',
        transmissionDate: new Date('2019-10-26T09:00:00.000Z'),
        receptionDate: new Date('2019-10-25T09:00:00.000Z'),
        rawData: 'N3--9000 FJF L F:: : ::::LLK OOO KK 00 L 00 099 9',
        messageType: 'CMS',
        messageSubType: 'FM',
        faultMessages: [
            {
                eventDate: new Date('2019-09-25T09:00:00.000Z'),
                ata: '361100',
                text: 'UNICORNS IN APU (AGAIN)',
                source: 'BMC 2',
                flightPhase: 5,
                flightNumber: 'CHUNKY23',
                tailNumber: 'N981W',

                type: 'MAGICAL',
                c2Afect: false,
                classNumber: 1,
                identifiers: 'string',
                lVarName: 'A3NX:UNICORNS_DESTROYING_APU',
                lVarValue: true,
            },
        ],
    };

    test('should Create two ACMS Messages', async () => {
        const message1 = await Acms.createAcmsMessage(mockMessage);

        mockMessage.flightNumber = 'CHUNKY1';
        mockMessage.tailNumber = 'NX9231';

        const message2 = await Acms.createAcmsMessage(mockMessage);

        expect(message1.flightNumber).toBe('CHUNKY');
        expect(message2.flightNumber).toBe('CHUNKY1');
        expect(message1.tailNumber).toBe('N981W');
        expect(message2.tailNumber).toBe('NX9231');
    });

    test('should Update an ACMS Message', async () => {
        const res = await Acms.updateAcmsMessage('CHUNKY', mockMessageUpdated);

        expect(res.flightNumber).toBe('CHUNKY23');
    });

    test('should fetch all ACMS Messages', async () => {
        const res = await Acms.getAllAcmsMessages();

        expect(res.length).toBe(2);
    });

    test('should Fetch One an ACMS Message', async () => {
        const res = await Acms.getOneAcmsMessage('CHUNKY23', 'N981W');

        expect(res.tailNumber).toBe('N981W');
    });

    test('should Delete Both ACmS Messages', async () => {
        const msgs = await Acms.getAllAcmsMessages();
        const res1 = await Acms.removeAcmsMessage(msgs[0].id);
        const res2 = await Acms.removeAcmsMessage(msgs[1].id);
        expect(res1.data.affected).toBe(1);
        expect(res2.data.affected).toBe(1);
    });
});
