import fs from 'fs';


export interface SaveFileUseCase {
  execute: ( options: SaveFileOptions ) => boolean
}

export interface SaveFileOptions {
  base: number;
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor(
    /**
     * Repository: StorageRepository
    */
  ){}

  execute({ 
    base,
    fileContent,
    fileName = 'multiplication-table',
    fileDestination = 'outputs'
  }: SaveFileOptions): boolean {
    try {
      fs.mkdirSync(fileDestination, {recursive: true})
      fs.writeFileSync(`${fileDestination}/${fileName}-${base}.txt`, fileContent);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    
  }
}