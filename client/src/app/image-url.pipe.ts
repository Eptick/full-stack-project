import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTS } from './constants';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string | number | undefined): string {
    return `${CONSTANTS.API_URL}/media/image/${value}`;
  }

}
