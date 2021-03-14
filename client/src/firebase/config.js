import { firebaseConfig as dev } from './dev';
import { firebaseConfig as prod } from './prod';

export const firebaseConfig = process.env.NODE_ENV === 'production' ? prod : dev;

