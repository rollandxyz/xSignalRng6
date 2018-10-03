import { TestBed } from '@angular/core/testing';

import { StockSignalRService } from './stock-signal-r.service';

describe('StockSignalRService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockSignalRService = TestBed.get(StockSignalRService);
    expect(service).toBeTruthy();
  });
});
