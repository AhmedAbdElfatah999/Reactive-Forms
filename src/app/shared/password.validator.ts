import { AbstractControl } from '@angular/forms';

//Cross Validation
export function PasswordValidator(control:AbstractControl):{[key:string]:boolean} | null {
       const Password=control.get("Password");
       const ConfirmPassword=control.get("ConfirmPassword");
       if (Password.pristine||ConfirmPassword.pristine) {
         return null;
       }
       return Password  &&  ConfirmPassword  &&  Password.value!=ConfirmPassword.value?{'MissMatch':true}:null;
}
