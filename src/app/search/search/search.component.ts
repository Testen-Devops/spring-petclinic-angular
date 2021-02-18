import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'app/owners/owner.service';
import { ActivatedRoute } from '@angular/router';
import { VisitService } from 'app/visits/visit.service';
import { PetService } from 'app/pets/pet.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input: string;

  results: Result[] = [
    {
      name: "penner",
      type: "owner"
  },
  {
    name: "penner2",
    type: "pet"
  }
  ]


  constructor(private ownerService: OwnerService, private visitService: VisitService,
    private petService: PetService, private actRoute: ActivatedRoute) {
    this.input = this.actRoute.snapshot.params.input;
   }


  ngOnInit() {
    this.ownerService.getOwnerByName(this.input).subscribe(owners => {
      const type = "owner";
      for (let i = 0; i < owners.length; i++) {
        let name = owners[i].firstName + owners[i].lastName;
        let result = new Result(name, type);
        this.results.push(result);
      }
    });

    this.petService.getPetsByName(this.input).subscribe(pets => {
      const type = "pets";
      for (let i = 0; i < pets.length; i++) {
        let name = pets[i].name;
        let result = new Result(name, type);
        this.results.push(result);
      }
    });


    // TO DO: Visits von den eingeholten owner/pets über ID holen?
  }

}

export class Result {
  constructor(name: string, type: string) {}
}
