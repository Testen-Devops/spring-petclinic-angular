import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'app/owners/owner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input: string;

  results = [
    {
      name: "penner",
      type: "owner"
  },
  {
    name: "penner2",
    type: "pet"
  }
  ]
  constructor(private ownerService: OwnerService, private actRoute: ActivatedRoute) {
    this.input = this.actRoute.snapshot.params.input;
   }

  ngOnInit() {
    this.ownerService.getOwnerById('1').subscribe(owner => {
      console.log(owner)
    });
  }

}
