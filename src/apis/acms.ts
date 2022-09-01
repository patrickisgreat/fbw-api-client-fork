import { NXApi } from '../index';
import { del, get, post, put } from '../utils';

export declare class AcmsMessage {
    id?: string;

    acid?: string;

    aircraftType: string;

    flightNumber: string;

    transmissionDate: Date;

    receptionDate: Date;

    rawData?: string;

    tailNumber: string;

    messageType: string;

    messageSubType?: string;

    faultMessages: FaultMessage[];
}

export declare class AcmsDelResponse {
    raw: {
        fieldCount: number,
        affectedRows: number,
        insertId: number,
        serverStatus: number,
        warningCount: number,
        message: string,
        protocol41: boolean,
        changedRows: number
    };

    affected: number
}

export declare class FaultMessage {
    eventDate: Date;

    ata: string;

    text: string;

    flightPhase: number;

    flightNumber: string;

    tailNumber: string;

    ComStatus: string;

    Direction: string;

    lVarName: string;

    lVarValue: string;

    type: string;

    c2Afect?: boolean;

    identifiers: string;
}

export class Acms {
    // ACMS // test with PostMan or equivalent
    // here we can create a message with a status of queued
    public static async createAcmsMessage(message: AcmsMessage): Promise<AcmsMessage> {
        return post<AcmsMessage>(new URL('/acms-message', NXApi.url), message)
            .then((res: AcmsMessage) => res);
    }

    public static async getAllAcmsMessages(): Promise<AcmsMessage[]> {
        return get<AcmsMessage[]>(new URL('/acms-message', NXApi.url))
            .then((res: AcmsMessage[]) => res);
    }

    // create statuses enum (or relation maybe)
    // statuses:
    public static async getOneAcmsMessage(
        flightNumber: string,
        tailNumber: string,
        status: string = 'New',
        direction: 'Uplink'): Promise<AcmsMessage> {
        return get<AcmsMessage>(new URL(`/acms-message/${flightNumber}/${tailNumber}/${status}/${direction}`, NXApi.url))
            .then((res: AcmsMessage) => res);
    }

    public static async updateAcmsMessage(flightNumber: string, updatedMessage: AcmsMessage): Promise<AcmsMessage> {
        return put<AcmsMessage>(new URL(`/acms-message/${flightNumber}`, NXApi.url), updatedMessage)
            .then((res: AcmsMessage) => res);
    }

    public static async removeAcmsMessage(id: string) {
        return del(new URL(`/acms-message/${id}`, NXApi.url), {})
            .then((res) => res);
    }

    // private static mapMessages(message: AcmsMessage): AcmsMessage {
    //     const msg: AcmsMessages = {
    //         ...message,
    //         createdAt: new Date(message.createdAt),
    //     };

    //     if (message.from) {
    //         msg.from = Telex.mapConnection(message.from);
    //     }

    //     if (message.to) {
    //         msg.to = Telex.mapConnection(message.to);
    //     }

    //     return msg;
    // }

    // TODO: determine whether we will ever need to only set faults and how that should be done
    // // FAULT MESSAGES
    // public static async createFaultMessage(status: AircraftStatus): Promise<TelexConnection> {
    //     return put<TelexConnection>(new URL(/txcxn, NXApi.url), Telex.buildBody(status), { Authorization: Telex.buildToken() })
    //         .then(Telex.mapConnection);
    // }

    // public static async getOneFaultMessage(status: AircraftStatus): Promise<TelexConnection> {
    //     return put<TelexConnection>(new URL(/txcxn, NXApi.url), Telex.buildBody(status), { Authorization: Telex.buildToken() })
    //         .then(Telex.mapConnection);
    // }

    // public static async getAllFaultMessages(status: AircraftStatus): Promise<TelexConnection> {
    //     return put<TelexConnection>(new URL(/txcxn, NXApi.url), Telex.buildBody(status), { Authorization: Telex.buildToken() })
    //         .then(Telex.mapConnection);
    // }

    // public static async updateFaultMessage(status: AircraftStatus): Promise<TelexConnection> {
    //     return put<TelexConnection>(new URL(/txcxn, NXApi.url), Telex.buildBody(status), { Authorization: Telex.buildToken() })
    //         .then(Telex.mapConnection);
    // }

    // public static async removeFaultMessage(status: AircraftStatus): Promise<TelexConnection> {
    //     return put<TelexConnection>(new URL(/txcxn, NXApi.url), Telex.buildBody(status), { Authorization: Telex.buildToken() })
    //         .then(Telex.mapConnection);
    // }
}
