import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatsServiceService {
  private rows: number[][] = [];
  private seatCount: number = 80; // Total number of seats in the coach
  private rowCount: number = 12; // Total number of rows

  constructor() { 
    this.initializeSeats();
  }
  
  // Initialize the seats
  public initializeSeats(): void {
    this.rows = Array(this.rowCount)
      .fill(null)
      .map((_, rowIndex) => {
        if (rowIndex === this.rowCount - 1) {
          return [0, 0, 0]; // Last row with only 3 seats
        }
        return [0, 0, 0, 0, 0, 0, 0]; // 7 seats for the rest of the rows
      });
  }

  // Check availability and book seats
  public bookSeats(requestedSeats: number): string[] {
    const bookedSeats: string[] = [];

    // Loop through each row to try and book seats
    for (let i = 0; i < this.rowCount; i++) {
      let availableSeatsInRow = this.rows[i].filter(
        (seat) => seat === 0
      ).length;

      if (availableSeatsInRow >= requestedSeats) {
        // Book seats in this row
        let bookedInRow = 0;
        for (let j = 0; j < this.rows[i].length; j++) {
          if (this.rows[i][j] === 0 && bookedInRow < requestedSeats) {
            this.rows[i][j] = 1; // Mark as booked
            bookedSeats.push(`${j + 1 + 7 * i}`);
            bookedInRow++;
          }
        }
        return bookedSeats; // Exit once the seats are successfully booked
      }
    }

    // If not all requested seats are booked in one row, try booking nearby seats
    let remainingSeats = requestedSeats - bookedSeats.length;

    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.rows[i].length; j++) {
        if (this.rows[i][j] === 0 && remainingSeats > 0) {
          this.rows[i][j] = 1;
          bookedSeats.push(`S - ${j + 1 + 7 * i}`);
          remainingSeats--;
        }
      }
      if (remainingSeats === 0) break;
    }

    return bookedSeats;
  }

  // Get the current seat layout
  public getSeatsLayout(): number[][] {
    return this.rows;
  }
}
