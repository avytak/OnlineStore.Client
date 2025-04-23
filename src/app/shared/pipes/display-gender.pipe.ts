import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '@shared/enums/gender.enum';

@Pipe({
  name: 'displayGender'
})
export class DisplayGenderPipe implements PipeTransform {

  transform(title: string, activeGender: Gender | null): boolean {
    const lowerTitle = title.toLowerCase();

    return (
      activeGender === null ||
      !lowerTitle.includes('category') ||
      (activeGender === Gender.Her && lowerTitle.startsWith('women')) ||
      (activeGender === Gender.Him && lowerTitle.startsWith('men'))
    );
  }
}
