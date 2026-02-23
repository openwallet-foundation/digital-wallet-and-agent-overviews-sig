import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeUri',
  standalone: true,
})
export class EncodeUriPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    // encodeURIComponent doesn't encode () but Angular router treats them as auxiliary route syntax
    return encodeURIComponent(value).replace(/\(/g, '%28').replace(/\)/g, '%29');
  }
}
