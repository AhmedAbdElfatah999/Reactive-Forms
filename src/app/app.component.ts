import { RegistrationService } from './registration.service';
import { FormGroup, FormControl, FormBuilder,Validators,FormArray } from '@angular/forms';
import { Component } from '@angular/core';
import { ForbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reactive-Forms';
  get AlternativeAddress(){
    return this.RegistrationForm.get("AlternativeAddress") as FormArray;
  }
  //Methid TO Add Form Field Dynamically
  AddAlternativeAddress(){

    return this.AlternativeAddress.push(new FormControl(''));
  }
  //Creating Form Using the Form Builder Service

     constructor(private fb:FormBuilder ,private _registrationService:RegistrationService){
          this.RegistrationForm=this.fb.group({
                UserName:['',[Validators.required , Validators.minLength(5),Validators.maxLength[20],ForbiddenNameValidator]],
                Password:['',Validators.pattern['^\d{10}']],
                ConfirmPassword:[''],
                Address:this.fb.group({
                  Country:[''],
                  City:[''],
                  PostalCode:['']
                  })
          });
     }

  RegistrationForm=new FormGroup({
         UserName: new FormControl('',[Validators.required,Validators.minLength(5),ForbiddenNameValidator(/password/)]),
         Password: new FormControl('',Validators.required),
         ConfirmPassword : new FormControl('',Validators.required),
         Address:new FormGroup({
           Country:new FormControl('Egypt',Validators.required),
           City :new FormControl('Giza',Validators.required),
           PostalCode:new FormControl('4422',Validators.required)
         }),
         AlternativeAddress: new FormArray([])

  },{validators:PasswordValidator});

  LaodAPIData(){
     //load Data Using The Set Value Method
     //this.RegistrationForm.patchValue //allowing You Passing a part of the Data
     this.RegistrationForm.setValue({
       UserName:"Jhon Wick",
       Password:'jhon12345',
       ConfirmPassword:"jhon12345",
       Address:{
         Country:"USA",
         City:"New Work",
         PostalCode:"00022"
       },
       AlternativeAddress:"Default"
     });
  }

  onSubmit(){
    //console.log(this.RegistrationForm.value);
    this._registrationService.register(this.RegistrationForm.value)
       .subscribe(
         response=>console.log("successfully Registerd",response),
         error=>console.log("Failed to Registered",error)
       );
  }


}
