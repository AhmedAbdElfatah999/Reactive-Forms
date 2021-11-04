import { AbstractControl,ValidatorFn } from "@angular/forms";

//Custom Validation using Function

export function ForbiddenNameValidator(forbiddenName:RegExp):ValidatorFn{
return (control:AbstractControl): {[key:string]:any} | null=>{
const forbidden=forbiddenName.test(control.value);
return forbidden?{'forbiddenName':{value:control.value}}:null;

};
}
