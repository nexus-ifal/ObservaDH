import { DefaultError, UseMutationOptions } from "@tanstack/react-query";

export type MutationVariables<
	TParams = void,
	TPayload = void,
> = (TParams extends void ? { params?: never } : { params: TParams }) &
	(TPayload extends void ? { payload?: never } : { payload: TPayload });

export interface MutationCallbackOptions {
	onCompleted?: <T = unknown>(data?: T) => void;
	onError?: (error: Error) => void;
}

export const mutationOptions = <
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown,
>(
	options: UseMutationOptions<TData, TError, TVariables, TContext> &
		Required<
			Pick<
				UseMutationOptions<TData, TError, TVariables, TContext>,
				"mutationKey"
			>
		>
): UseMutationOptions<TData, TError, TVariables, TContext> => options;
