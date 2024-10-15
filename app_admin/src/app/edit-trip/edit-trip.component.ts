import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // Retrieve the stashed tripCode
    const tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn’t find where I stashed the tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:', tripCode);

    // Initialize the form group with form controls
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    });

    // Fetch the trip data based on the tripCode
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        if (value && value.length > 0) {
          this.trip = value[0]; // Assuming the service returns an array
          this.editForm.patchValue(this.trip); // Populate the form with trip data
          this.message = 'Trip: ' + tripCode + ' retrieved successfully';
        } else {
          this.message = 'No Trip Retrieved!';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        this.message = 'Error retrieving trip: ' + error;
        console.log(this.message);
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      // If the form is not valid, return without submitting
      return;
    }

    // Call the updateTrip method from the service
    this.tripDataService.updateTrip(this.editForm.value).subscribe({
      next: (value: any) => {
        console.log('Trip updated successfully:', value);
        this.router.navigate(['']);
      },
      error: (error: any) => {
        this.message = 'Error updating trip: ' + error;
        console.log(this.message);
      }
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }
}
