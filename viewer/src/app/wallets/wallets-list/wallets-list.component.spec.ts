import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsListComponent } from './wallets-list.component';

describe('WalletsListComponent', () => {
  let component: WalletsListComponent;
  let fixture: ComponentFixture<WalletsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
