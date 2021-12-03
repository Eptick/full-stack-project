import { Pipe, PipeTransform } from '@angular/core';

const ROLE_MAP: {[key: string]: string} = {
  ROLE_ADMIN: 'Administrator',
  ROLE_USER: 'User',
}

@Pipe({
  name: 'roleFormat'
})
export class RoleFormatPipe implements PipeTransform {

  transform(value: string[]): string {
    return value.map(elem => ROLE_MAP[elem]).join(", ");
  }

}
