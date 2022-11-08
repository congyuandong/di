import { asSingleton, Injectable, Injector } from '../../src';

describe('asSingleton related', () => {
  it('提供了 asSingleton 来实现工厂模式的单例', () => {
    const token = 'Token';

    @Injectable()
    class A {}

    const provider = {
      token,
      useFactory: asSingleton(() => new A()),
    };

    const injector = new Injector([provider]);
    const a = injector.get(token);
    const b = injector.get(token);
    expect(a).toBe(b);
  });

  it('support hasInstance method', () => {
    const token = 'Token';

    @Injectable()
    class A {}

    const injector = new Injector([
      {
        token,
        useFactory: asSingleton(() => new A()),
      },
    ]);

    const a = injector.get(token);
    const b = injector.get(token);
    expect(a).toBe(b);
    expect(injector.hasInstance(a)).toBe(true);
    expect(injector.hasInstance(b)).toBe(true);
  });
});
