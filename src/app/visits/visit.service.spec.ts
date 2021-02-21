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

import { async, inject, TestBed } from '@angular/core/testing';
import { VisitService } from './visit.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorHandler } from '../error.service';
import { Type } from '@angular/core';
import { Visit } from './visit';
import { Vet } from '../vets/vet';


fdescribe('VisitService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let visitService: VisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [VisitService, HttpErrorHandler]

    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    visitService = TestBed.get(VisitService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should ...', async(inject([HttpTestingController], (visitService: VisitService, http: HttpClient) => {
    expect(visitService).toBeTruthy();
  })));

  fdescribe('VisitSearch', () => {
    let expectedVisits: Visit[];

    beforeEach(() => {
      visitService = TestBed.get(VisitService);
      expectedVisits = [
        { date: '01.01.1999', description: 'A', id: 1, },
        { date: '20.02.2020', description: 'B', id: 2, firstName: 'B' },
      ] as Visit[];
    });

    it('should search visits by key', () => {
      visitService.getVisitsByKey('A').subscribe(
        visits => expect(visits).toEqual(expectedVisits, 'should return expected visits'),
      );

      const req = httpTestingController.expectOne(visitService.entityUrl + '/search/A');
      expect(req.request.method).toEqual('GET');
    });

  });

});
