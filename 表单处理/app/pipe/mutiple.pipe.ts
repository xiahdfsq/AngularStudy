import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mutiple'
})
export class MutiplePipe implements PipeTransform {

  transform(value: number, args?: number): any {
    if(!args){
      return args = 1;
    }
    return value*args
  }
}
