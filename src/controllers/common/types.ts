import * as Hapi from '@hapi/hapi';

export type Decorate<T> = Hapi.Request & Readonly<T>;