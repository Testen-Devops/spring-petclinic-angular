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

/* tslint:disable:no-unused-variable */


/**
 * @author Vitaliy Fedoriv
 */

import {async, inject, TestBed} from '@angular/core/testing';
import {PetService} from './pet.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import { HttpErrorHandler } from 'app/error.service';
import { Type } from "@angular/core";
import { Pet } from './pet';


fdescribe('PetService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let petService: PetService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [PetService,HttpErrorHandler]
    });
    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(
      HttpTestingController as Type<HttpTestingController>
    );
      petService = TestBed.get(PetService);
    });

    // id: number;
    // name: string;
    // birthDate: string;
    // type: PetType;
    // owner: Owner;
    // visits: Visit[];

    let expectedPets: Pet[];
    beforeEach(() => {
      petService = TestBed.get(PetService);
      expectedPets = [
        { id: 1, name: "A",birthDate:"09/08/1994" },
        { id: 2, name: "A 2",birthDate:"23/08/2000" },
        { id: 3, name: "A 4",birthDate:"23/08/2000" },
      ] as Pet[];
    });

    it("should return pets by key", () => {
      petService
        .getPetsByKey('A')
        .subscribe(
          (owners) =>
            expect(owners).toEqual(
              expectedPets,
              "should return expected pets"
            ),
          fail
        );

      // OwnerService should have made one request to GET owners from expected URL
      const req = httpTestingController.expectOne(petService.entityUrl + '/search/A');
      expect(req.request.method).toEqual("GET");

      // Respond with the mock owners
      req.flush(expectedPets);
    });
  });

