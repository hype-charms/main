export enum Currency {
    AUD = 'AUD',
    USD = 'USD',
    EUR = 'EUR',
    NZD = 'NZD'
}

export interface NotificationReference {
    id?: string,
    text: string
}

export type LayoverPositions = 'middle' | 'bottom-left' | 'bottom-right'

export enum SubState {
    USER_VERIFIED = "exists",
    ALREADY_VERIFIED = "verified",
    NOT_FOUND = "not-found",
}

export type SearchReference = { type: string | undefined, value: string | undefined, id: string | undefined }

export class MetaProps {
    description?: string = 'qljkdwald';
    image?: string;
    title?: string;
    structuredData?: string;
    type?: string;
    constructor(partial: Partial<MetaProps>) {
        Object.assign(this, partial);
    }
}