import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient(withInterceptors([jwtInterceptor]))],
  bootstrap: [AppComponent], // ✅ Bootstrap avec AppComponent
})
export class AppModule {}
