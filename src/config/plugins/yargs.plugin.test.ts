// import { yarg } from './yargs.plugin'

const runCommand = async (args: string []) => {
  process.argv = [ ...process.argv, ...args]

  const { yarg } = await import('./yargs.plugin');

  return yarg
}



describe(' Test args.plugin.ts', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  })

  test('Should return default values', async () => {
    const argv = await runCommand(['-b', '5'])

    expect( argv ).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: 'outputs',
    }));
  });

  test('should return configuration witch custom values', async () => {
    const argv = await runCommand(['-b', '6', '-l', '20', '-s', '-n', 'multiplication-table-example', '-d', 'outputs-example'])

    expect( argv ).toEqual(expect.objectContaining({
      b: 6,
      l: 20,
      s: true,
      n: 'multiplication-table-example',
      d: 'outputs-example',
    }))
  });
});
