export type RemoteData<TError, TSuccess> = Initialized | Pending | Failure<TError> | Success<TSuccess>;

export class Initialized {
  readonly kind = "initialized";
}

export class Pending {
  readonly kind = "pending";
}

export class Failure<TError> {
  readonly kind = "failure";

  constructor(public error: TError) {
  }
}

export class Success<TSuccess> {
  readonly kind = "success";

  constructor(public data: TSuccess) {
  }
}

export function fold<TResult, TError, TSuccess>(
  initialized: () => TResult,
  pending: () => TResult,
  failure: (error: TError) => TResult,
  success: (data: TSuccess) => TResult,
  state: RemoteData<TError, TSuccess>): TResult {
    switch (state.kind) {
      case "initialized":
        return initialized();
      case "pending":
        return pending();
      case "failure":
        return failure(state.error);
      case "success":
        return success(state.data);
      default:
        return state as never; // exhaustive TypeScript switch: https://github.com/basarat/typescript-book/blob/master/docs/types/discriminated-unions.md#switch
  };
}

export function map<TSuccessMapped, TError, TSuccess>(
    successMap: (data: TSuccess) => TSuccessMapped,
    state: RemoteData<TError, TSuccess>): RemoteData<TError, TSuccessMapped> {
      switch (state.kind) {
        case "success":
          return new Success(successMap(state.data));
        default:
          return state;
      }
  }
