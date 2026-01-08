import type { MachineSrc, StateMachine as S } from '@zag-js/core'

export interface UseMachineOptions<TContext extends Record<string, any>> {
  context?: TContext
}

class TypeSafeContext<TContext extends Record<string, any>> {
  private data: Map<keyof TContext, any>

  constructor(initialData?: TContext) {
    this.data = new Map(Object.entries(initialData || {}) as any)
  }

  get<K extends keyof TContext>(key: K): TContext[K] {
    return this.data.get(key)
  }

  set<K extends keyof TContext>(key: K, value: TContext[K]): void {
    this.data.set(key, value)
  }
}

export interface SimpleService<TContext extends Record<string, any>> {
  context: TypeSafeContext<TContext>
  send(event: any): void
}

export function useMachine<
  TContext extends Record<string, any>,
  TState extends S.StateSchema = any,
>(
  machine: MachineSrc<TContext, TState>,
  options?: UseMachineOptions<TContext>,
): SimpleService<TContext> {
  const context = new TypeSafeContext<TContext>(options?.context)

  return {
    context,
    send: (event: any) => {
      // Simplified send implementation for now
      // In a full implementation, this would integrate with Zag.js state machine
    },
  }
}
