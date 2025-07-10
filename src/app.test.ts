// process.argv = ['node','app.ts','-b','10'];
// import './app';
import { ServerApp } from './presentation/server-app';

describe('Test App.ts', () => {
  test('should could Server.run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ['node','app.ts','-b','10','-l','5','-s','-d','test-destination','-n','test-file'];
    await import('./app');
    
    expect( serverRunMock ).toHaveBeenCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-destination'
    })
  });
});