/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import { Component, OnInit } from "@angular/core";
import { Visit } from "../visit";
import { VisitService } from "../visit.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PetService } from "../../pets/pet.service";
import { Pet } from "../../pets/pet";
import { PetType } from "../../pettypes/pettype";
import { Owner } from "../../owners/owner";

import * as moment from "moment";
import { VetService } from "app/vets/vet.service";
import { Vet } from "app/vets/vet";

@Component({
  selector: "app-visit-add",
  templateUrl: "./visit-add.component.html",
  styleUrls: ["./visit-add.component.css"],
})
export class VisitAddComponent implements OnInit {
  visit: Visit;
  currentPet: Pet;
  currentOwner: Owner;
  currentPetType: PetType;
  vetList: Vet[];
  addedSuccess = false;
  errorMessage: string;

  constructor(
    private visitService: VisitService,
    private petService: PetService,
    private vetService: VetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.visit = {} as Visit;
    this.currentPet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentPetType = {} as PetType;
    this.vetList = [];
  }

  ngOnInit() {
    console.log(this.route.parent);
    const petId = this.route.snapshot.params.id;
    this.petService.getPetById(petId).subscribe(
      (response) => {
        this.currentPet = response;
        this.visit.pet = this.currentPet;
        this.currentPetType = this.currentPet.type;
        this.currentOwner = this.currentPet.owner;
      },
      (error) => (this.errorMessage = error as any)
    );
    this.vetService.getVets().subscribe((response) => {
      this.vetList = response;
    });
  }

  onSubmit(visit: Visit) {
    console.log(visit);

    visit.id = null;
    const that = this;

    // format output from datepicker to short string yyyy/mm/dd format
    visit.date = moment(visit.date).format("YYYY/MM/DD");

    this.visitService.addVisit(visit).subscribe(
      (newVisit) => {
        this.visit = newVisit;
        this.addedSuccess = true;
        that.gotoOwnerDetail();
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  gotoOwnerDetail() {
    this.router.navigate(["/owners", this.currentOwner.id]);
  }
}
