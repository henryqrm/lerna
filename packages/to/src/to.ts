interface ToOptions {}

interface ToOptionsPromise extends ToOptions {
  repeat?: number
  timeout?: number
}

const getOptionsPromise = (options: ToOptions[]): ToOptionsPromise => {
  return options[0]
}

const to = <T>(
  resolveType: Promise<T> | T | Function,
  ...args: ToOptions[]
): Promise<[Error | undefined, T]> => {
  const _args = args ? args : []
  if (resolveType instanceof Promise) {
    const options = getOptionsPromise(_args)
    return resolveType
      .then<[undefined, T]>((data: T) => [undefined, data])
      .catch<[Error, any]>((err: Error) => [err, undefined as any])
  }

  if (resolveType instanceof Function) {
    try {
      const data = resolveType()
      return Promise.resolve<[undefined, T]>([undefined, data])
    } catch (err) {
      return Promise.resolve<[Error, any]>([err, undefined as any])
    }
  }

  return Promise.resolve<[undefined, T]>([undefined, resolveType])
}

export default to