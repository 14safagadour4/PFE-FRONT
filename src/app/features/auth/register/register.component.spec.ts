import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

function passwordsMatch(ctrl: AbstractControl): ValidationErrors | null {
  const pw = ctrl.get('password')?.value;
  const cpw = ctrl.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  loading = signal(false);
  errorMsg = signal('');

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    secretKey: ['', Validators.required],
  }, { validators: passwordsMatch });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    const { confirmPassword, ...req } = this.form.value as any;

    this.auth.register(req).subscribe({
      next: r => {
        this.loading.set(false);
        if (r.success) this.router.navigate(['/dashboard']);
        else this.errorMsg.set(r.message);
      },
      error: e => {
        this.loading.set(false);
        this.errorMsg.set(e.error?.message ?? 'Erreur serveur.');
      }
    });
  }
}