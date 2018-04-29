import { Item } from './item';

export class List {
    _id: string;
    isowner: boolean;
    name: string;
    items: Item[];
    members: [{
        userid: string;
    }]
}
