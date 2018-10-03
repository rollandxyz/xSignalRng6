import { TestBed } from '@angular/core/testing';

import { DynamicHubSignalRService } from './dynamic-signal-r.service';

describe('DynamicHubSignalRService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicHubSignalRService = TestBed.get(DynamicHubSignalRService);
    expect(service).toBeTruthy();
  });
});
