import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'removeExtension',
})
export class RemoveExtensionPipe implements PipeTransform {
  transform(fileName: string): string {
    const extsToRemove = ['.mp3', '.m4a'];
    const regexPattern = new RegExp(extsToRemove.join('|'), 'gi');
    fileName = fileName.replace(regexPattern, '');
    return fileName;
  }
}
