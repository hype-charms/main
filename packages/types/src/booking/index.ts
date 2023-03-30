
export class BookingDto {
    id?: string;
    declared_value?: number;
    referrer?: 'API';
    requesting_site?: string;
    tailgate_pickup?: boolean;
    tailgate_delivery?: boolean;
    items?: BookingItemDto[];
    sender?: BookingAddressDto;
    receiver?: BookingAddressDto;
    constructor(partial?: BookingDto) {
        Object.assign(this, partial);
    }
}

export interface BookingItemDto {
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    quantity?: number;
    description?: string;
}

export interface BookingAddressDto {
    address?: string;
    company_name?: string;
    email?: string | null;
    name?: string | null;
    postcode?: string | null;
    phone?: any;
    state?: string;
    suburb?: string;
    type?: string;
    country?: string
}

export interface BookingQuotesResponseDto {
    provider: string;
    id: number;
    booked_at: string;
    booked_by: string;
    created_at: string;
    declared_value: number;
    insured_value: number;
    description: string;
    items: BookingItemDto[];
    label: string;
    quotes: { [key in couriers]: BookingQuoteDto };
    notifications: { email: boolean; sms: boolean };
    pickup_window: [];
    connote: null;
    charged_weight: 0;
    scanned_weight: 0;
    special_instructions: string;
    status: "new";
    updated_at: string;
    pickup_instructions: null;
    tailgate_pickup: false;
    tailgate_delivery: false;
    sender: BookingAddressDto;
    receiver: BookingAddressDto;
}

export type couriers = "allied" | "couriers_please_domestic_priority_signature"
    | "northline" | "tnt_twelve_express" | "aramex"
    | "tnt_road_express" | "tnt_overnight_express"
    | "direct_couriers_regular" | "direct_couriers_express"
    | "direct_couriers_elite" | "sampson_express"
    | "couriers_please_domestic_proirity_authority"

export interface BookingQuoteDto {
    total: number;
    price_insurance_ex: number;
    fee: number;
    applied_gst: number;
    insured_amount: number;
    service: "road";
    transit_time: string;
    pickup_dates: Date[];
    pickup_time: { from: string; to: string };
}