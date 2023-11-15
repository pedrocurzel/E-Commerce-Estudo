import { TestBed } from '@angular/core/testing';

import { ProdutoMountService } from './produto-mount.service';

describe('ProdutoMountService', () => {
  let service: ProdutoMountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoMountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
