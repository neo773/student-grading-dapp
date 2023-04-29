import { env } from 'custom-env'

typeof process.env.NODE_ENV === 'undefined' 
||
process.env.NODE_ENV === 'development' ? env('development') : env('production')