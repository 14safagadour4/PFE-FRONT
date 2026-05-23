import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  loading = signal(false);
  errorMsg = signal('');

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // ── Ki déjà logged in → redirect direct ──────────
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    this.auth.login(this.form.value as any).subscribe({
      next: (r) => {
        this.loading.set(false);
        if (r.success) this.router.navigate(['/admin/dashboard']);
        else this.errorMsg.set(r.message);
      },
      error: (e) => {
        this.loading.set(false);
        this.errorMsg.set(e.error?.message ?? 'Email ou mot de passe incorrect.');
      },
    });
  }
}
