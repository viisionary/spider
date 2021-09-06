export interface Item {
    name: string;
    time: string;
    length: number;
}

export type ItemPayload = Pick<Item, 'name' | 'time'> & {
    length?: Boolean;
};
