import { Component, OnInit } from "@angular/core";
import { OwnerService } from "app/owners/owner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { VisitService } from "app/visits/visit.service";
import { PetService } from "app/pets/pet.service";
import { Owner } from "app/owners/owner";
import { Visit } from "app/visits/visit";
import { Pet } from "app/pets/pet";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  input: string;
  err: boolean = false;
  foundOwners: Owner[] = [];
  foundPets: Pet[] = [];
  foundVisits: Visit[] = [];

  constructor(
    private ownerService: OwnerService,
    private visitService: VisitService,
    private petService: PetService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.input = this.actRoute.snapshot.params.input;
  }

  ngOnInit() {
    let ownErr = false;
    this.ownerService.getOwnerByKey(this.input).subscribe(
      (owners) => {
        // const type = "Owner";
        // for (let i = 0; i < owners.length; i++) {
        //   let name = owners[i].firstName + " " + owners[i].lastName;
        //   //let result = new Result(name, type, "", owners[i].id);
        //   this.results.push(result);
        // }
        this.foundOwners = owners;
      },
      (error) => {
        console.log("ERR: No Owners found");
        ownErr = true;
        if (ownErr && petErr && visitErr) {
          this.err = true;
        }
      }
    );

    let petErr = false;
    this.petService.getPetsByKey(this.input).subscribe(
      (pets) => {
        // const type = "Pet";
        // for (let i = 0; i < pets.length; i++) {
        //   let name = pets[i].name + ", " + pets[i].type.name;
        //   let result = new Result(
        //     name,
        //     type,
        //     pets[i].type.name,
        //     pets[i].owner.id
        //   );
        //   this.results.push(result);
        // }
        this.foundPets = pets;
      },
      (error) => {
        console.log("ERR: No Pets found");
        petErr = true;
        if (ownErr && petErr && visitErr) {
          this.err = true;
        }
      }
    );

    let visitErr = false;
    this.visitService.getVisitsByKey(this.input).subscribe(
      (visits) => {
        // const type = "Visit";
        // for (let i = 0; i < visits.length; i++) {
        //   let name = visits[i].pet.name;
        //   let result = new Result(
        //     name,
        //     type,
        //     visits[i].description,
        //     visits[i].pet.owner.id
        //   );
        //   this.results.push(result);
        // }
        this.foundVisits = visits;
      },
      (error) => {
        console.log("ERR: No Visits found");
        visitErr = true;
        if (ownErr && petErr && visitErr) {
          this.err = true;
        }
      }
    );
  }
}

// export class Result {
//   constructor(private name: string, private type: string, private description: string, private id: number) {
//   }
// }
