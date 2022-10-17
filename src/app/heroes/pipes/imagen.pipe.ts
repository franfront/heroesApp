import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interface/heroes.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(value: Heroe): string {



    

    if (!value.id || value.alt_img == '') {
      return '../../../../assets/no-image.png';
    } else if (value.alt_img) {
      return value.alt_img;
    } else {
      return `../../../../assets/heroes/${value.id}.jpg`;
    }
  }
}
