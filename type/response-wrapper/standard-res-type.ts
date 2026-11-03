export interface StandardRes<T = Record<string, unknown>> {
  state: string
  result: T
}

export interface RequestBox<T> {
  [key: string]: T | string | number | boolean | any[] | any
}