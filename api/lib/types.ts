export type Json =
  | string
  | number
  | boolean
  | {
    [key: string]: Json;
  }
  | Json[]
  | null;
