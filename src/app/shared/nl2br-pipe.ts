// nl2br.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ standalone: false , name: 'nl2br' })
export class Nl2brPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(/\n/g, '<br>'));
  }
}
