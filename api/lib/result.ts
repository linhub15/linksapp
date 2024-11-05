/**
 * Returns Errors as values instead of throwing them.
 */

export type Result<T> = OkResult<T> | ErrorResult;

export type OkResult<T> = {
  ok: true;
  value: T;
};

export type ErrorResult = {
  ok: false;
  error: Error;
};

export async function tryFn<T>(fn: () => Promise<T>): Promise<Result<T>>;
export async function tryFn<T>(fn: () => T): Promise<Result<T>>;
export async function tryFn<T>(fn: () => T | Promise<T>): Promise<Result<T>> {
  try {
    const result = await fn();
    return ok(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      return err<T>(error.message);
    }
    return err<T>("A non-Error was caught");
  }
}

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function err<T>(message: string, options?: ErrorOptions): Result<T> {
  const error = new Error(message, options);
  return { ok: false, error };
}
