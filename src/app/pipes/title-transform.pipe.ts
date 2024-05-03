import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleTransform'
})
export class TitleTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    let newstring:string;
    if(value.length > 40){
      const shortString = value.substring(0, 40);
      newstring = shortString + '...'
    }else{
      newstring = value
    }
    return newstring;
  }

}
