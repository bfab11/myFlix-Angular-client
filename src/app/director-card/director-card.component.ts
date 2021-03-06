import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  constructor(

    /**
     * Uses inject to get director details
    */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
      Birth: number,
      Death: number,
    }
  ) { }

  ngOnInit(): void {
  }

}
