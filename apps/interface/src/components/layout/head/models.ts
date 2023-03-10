

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