import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsListFilterComponent } from './wallets-list-filter.component';

describe('WalletsListFilterComponent', () => {
  let component: WalletsListFilterComponent;
  let fixture: ComponentFixture<WalletsListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsListFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletsListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
