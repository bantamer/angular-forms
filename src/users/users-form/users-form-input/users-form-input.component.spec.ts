import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFormTextInputComponent } from './users-form-input.component';

@Component({
  template: `
    <form [formGroup]="form">
      <app-user-form-text-input
        [controlName]="'firstName'"
        [label]="'First Name'"
        [placeholder]="'Enter your name'"
        [control]="form.get('firstName')"
      />
    </form>
  `,
  standalone: true,
  imports: [UsersFormTextInputComponent, ReactiveFormsModule],
})
class TestHostComponent {
  form = new FormGroup({
    firstName: new FormControl(''),
  });
}

describe(UsersFormTextInputComponent.name, () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render input with correct placeholder', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Enter your name');
  });
});
