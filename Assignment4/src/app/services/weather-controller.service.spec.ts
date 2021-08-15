import { TestBed } from '@angular/core/testing';

import { WeatherControllerService } from './weather-controller.service';

describe('WeatherControllerService', () => {
  let service: WeatherControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
