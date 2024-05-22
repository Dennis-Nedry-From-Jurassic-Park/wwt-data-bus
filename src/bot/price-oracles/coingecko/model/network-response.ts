export interface NetworkResponse {
    data: Network[];
    links: {
        first: string | null,
        prev: string | null,
        next: string | null,
        last: string | null
    }
}

export interface Network {
    id: string;
    type: string;
    attributes: NetworkAttributes;
}

export interface NetworkAttributes {
    name: string;
}