import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import {
  email,
  form,
  FormField,
  required,
  submit,
} from "@angular/forms/signals";
import { RegistrationData } from "./registration.model";

@Component({
  selector: "app-registration",
  imports: [FormField, CommonModule],
  templateUrl: "./registration.html",
  styleUrl: "./registration.css",
})
export class Registration {
  readonly model = signal<RegistrationData>({
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  readonly registrationForm = form(this.model, (schema) => {
    required(schema.email, { message: "Email is required" });
    email(schema.email, { message: "Enter a valid email address" });

    required(schema.password, { message: "Password is required" });
    required(schema.confirmPassword, {
      message: "Please confirm your password",
    });

    required(schema.acceptedTerms, {
      message: "You must accept the terms to continue",
    });
  });

  async onSubmit(event?: Event) {
    event?.preventDefault();

    await submit(this.registrationForm, (value) => {
      console.log(value());
      // Mock Server Call
      return Promise.resolve([
        {
          kind: "EmailAlreadyExists",
          field: this.registrationForm.email,
          error: { kind: "server", message: "Email already taken" },
        },
      ]);
    });
  }
}
