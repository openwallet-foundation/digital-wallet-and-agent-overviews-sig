import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsAddComponent } from './wallets-add.component';

describe('WalletsAddComponent', () => {
  let component: WalletsAddComponent;
  let fixture: ComponentFixture<WalletsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
