import { options } from './options.ts';

export const getValue = (value: string) =>
    value ? options.find((option) => option.value === value) : ''