import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  constructor() { }

  public imageObject: Array<object> = [
    {
      image: 'assets/ae86.jpg',
      thumbImage: 'assets/ae86.jpg',
      alt: 'AE86',
      title: 'Toyota AE86'
    },
    {
      image: 'assets/datsun.jpg',
      thumbImage: 'assets/datsun.jpg',
      alt: 'Datsun',
      title: 'Datsun 240z'
    },
    {
      image: 'assets/hakosuka.jpg',
      thumbImage: 'assets/hakosuka.jpg',
      alt: 'Nissan Skyline',
      title: 'Nissan Skyline'
    },
    {
      image: 'assets/silvias13.jpg',
      thumbImage: 'assets/silvias13.jpg',
      alt: 's13',
      title: 'Nissan Silvia s13'
    },
    {
      image: 'assets/skyline31.jpg',
      thumbImage: 'assets/skyline31.jpg',
      alt: 'r31',
      title: 'Nissan Skyline r31'
    },
    {
      image: 'assets/supra.jpg',
      thumbImage: 'assets/supra.jpg',
      alt: 'Supra',
      title: 'Toyota Supra'
    },
    {
      image: 'assets/chaser.jpg',
      thumbImage: 'assets/chaser.jpg',
      alt: 'Chaser',
      title: 'Toyota Chaser'
    },
    {
      image: 'assets/honda_prelude.jpg',
      thumbImage: 'assets/honda_prelude.jpg',
      alt: 'Prelude',
      title: 'Honda Prelude'
    }
  ];

  ngOnInit(): void {
  }

}
