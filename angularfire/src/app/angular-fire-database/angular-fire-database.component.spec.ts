import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireDatabaseComponent } from './angular-fire-database.component';

describe('AngularFireDatabaseComponent', () => {
  let component: AngularFireDatabaseComponent;
  let fixture: ComponentFixture<AngularFireDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularFireDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
