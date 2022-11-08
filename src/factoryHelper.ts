import { AS_SINGLETON_SYMBOL, FactoryFunction } from './declare';

import type { Injector } from './injector';

export function asSingleton<T>(func: FactoryFunction<T>): FactoryFunction<T> {
  let instance: T | undefined;
  const innerFunc: FactoryFunction<T> = (injector: Injector) => {
    if (instance === undefined) {
      instance = func(injector);
    }
    return instance;
  };

  innerFunc[AS_SINGLETON_SYMBOL] = true;

  return innerFunc;
}
