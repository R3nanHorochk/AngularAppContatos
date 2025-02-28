import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroContato'
})
export class FiltroContatoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
