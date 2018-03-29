import { Component, OnInit } from '@angular/core';

import { Item } from '../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items: Item[] = [
    { name: 'Sugar' },
    { name: 'Milk' },
    { name: 'Washing Powder' },
    { name: 'Coffee' },
    { name: 'Toilet Roll' },
    { name: 'Bread' },
    { name: 'Beans' },
    { name: 'Apples' },
    { name: 'Sponges' },
    { name: 'Candles' }
  ];

}
