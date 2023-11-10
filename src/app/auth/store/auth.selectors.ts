import { createFeatureSelector } from '@ngrx/store';
import { User } from '../auth.types';
import {
  DefaultHttpStructure,
  DefaultSelectors,
} from '../../share/types/store.types';

export type UserType = DefaultHttpStructure<User>;

export const selectAuthState = createFeatureSelector<UserType>('Auth');

export const UserSelectors = DefaultSelectors(selectAuthState);
