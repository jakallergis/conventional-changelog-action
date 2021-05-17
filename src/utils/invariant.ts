const NODE_ENV = process.env.NODE_ENV
export type Thing = {[key: string]: any}

export default function invariant<T = Thing>(
  condition: unknown,
  message?: string,
  ...args: string[]
): asserts condition is T {
  if (NODE_ENV !== 'production') {
    if (message === undefined) {
      throw new Error('invariant requires an error message argument')
    }
  }

  if (!condition) {
    let error
    if (message === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings'
      )
    } else {
      let argIndex = 0
      error = new Error(message.replace(/%s/g, () => args[argIndex++]))
      error.name = 'Internal App issue'
    }

    throw error
  }
}
