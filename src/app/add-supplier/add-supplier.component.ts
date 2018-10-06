import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Supplier} from '../supplier';
import { SupplierService} from '../services/SupplierService/supplier.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);

  name: String;
  mail: String;
  mobile: String;
  address: String;
  supplier: Supplier;

  //loading the constructor

  constructor(private supplierService: SupplierService, public snackBar: MatSnackBar) {
    this.name = '';
    this.address = '';
    this.mobile = '';
    this.mail = '';
    this.supplier = {
      id: 1,
      address: '',
      email: '',
      name: '',
      phone: ''
    };

  }

  //implementations of the fucntions
  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
    });
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getMobileErrorMessage() {
    return this.phone.hasError('required') ? 'You must enter a value' :
      this.phone.hasError('pattern') ? 'Not a valid phone number' :
        '';
  }

  addSup(): void{
    if(this.supplier.address !== '' && this.supplier.phone !== '' && !this.email.invalid && !this.phone.invalid){
      this.supplierService.addSupplier(this.supplier).subscribe(data => {
        console.log(data);
        this.openSnackBar('Supplier details saved');
        this.supplier = {
          id: 1,
          address: '',
          email: '',
          name: '',
          phone: ''
        };
      });
    } else {
      console.log(this.supplier);
      this.openSnackBar('Please enter all the details correctly');
    }
  }

  ngOnInit() {
  }

}
