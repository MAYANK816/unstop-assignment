import { Component, OnInit } from '@angular/core';
import { SeatsServiceService } from './seats-service.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  rows: number[][] = [];
  bookedSeats: string[] = [];
  requestedSeats: number = 0;
  SeatForm: FormGroup;
  constructor(
    private seatsService: SeatsServiceService,
    private builder: FormBuilder
  ) {
    this.rows = this.seatsService.getSeatsLayout();
  }
  ngOnInit(): void {
    this.SeatForm = this.builder.group({
      seatNumber: [
        '',
        Validators.required,
        this.ValidateInput(),
      ],
    });
  }
  bookSeats(): void {
    if (this.SeatForm.get('seatNumber').value > 0) {
      this.seatsService.initializeSeats();
      this.bookedSeats = this.seatsService.bookSeats(this.SeatForm.get('seatNumber').value);
      this.rows = this.seatsService.getSeatsLayout(); // Update seat layout after booking
    }
  }
  ValidateInput(){
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
  
      // Simulate an async task (e.g., delay for 500ms)
      return new Observable(observer => {
        setTimeout(() => {
          if (value && /^[1-7]$/.test(value)) {
            observer.next(null); // Valid input
          } else {
            observer.next({ 'invalidNumber': true }); // Invalid input
          }
          observer.complete();
        }, 500); // Simulating async delay
      });
    };
}
restrictInput(event:Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = parseInt(inputElement.value);
  // Check if the value is greater than 7
  if (value>7) {
    event.preventDefault();
    inputElement.value=''
  }
  
}

    
}
