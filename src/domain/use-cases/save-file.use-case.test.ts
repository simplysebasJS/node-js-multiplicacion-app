import fs from 'fs';
import { SaveFile } from './save-file.use-case'


describe('SaveFileUseCase', () => {
  const customOptions = {
    base: 4,
    fileContent: 'custom content',
    fileDestination: 'custom-outputs',
    fileName: 'custom-table-name'
  }
  const filePath = `${customOptions.fileDestination}/${customOptions.fileName}-${customOptions.base}.txt`

  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs');
    if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });

    const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
    if ( customOutputFolderExists ) fs.rmSync(customOptions.fileDestination, { recursive: true })
  })
  test('Should save file with default values', () => {
    const saveFile = new SaveFile();
    const options = {
      base: 2,
      fileContent: 'test content',
    }
    const filePath = `outputs/multiplication-table-${options.base}.txt`
    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    
    expect( result ).toBe( true );
    expect( fileExists ).toBe( true );
    expect( fileContent ).toBe( options.fileContent );
  });
  test('Should save file with custom values', () => {
    const saveFile = new SaveFile();
    
    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
    expect( result ).toBe( true );
    expect( fileExists ).toBe( true );
    expect( fileContent ).toBe( customOptions.fileContent );
  });
})