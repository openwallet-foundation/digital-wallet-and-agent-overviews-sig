import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsShowComponent } from './wallets-show.component';

describe('WalletsShowComponent', () => {
  let component: WalletsShowComponent;
  let fixture: ComponentFixture<WalletsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
