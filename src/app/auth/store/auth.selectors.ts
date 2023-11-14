import { createFeatureSelector } from '@ngrx/store';
import { User } from '../auth.types';
import { SingleHttpStore } from '@/store/single-http';

export type UserType = SingleHttpStore.DefaultHttpStructure<User>;

export const selectAuthState = createFeatureSelector<UserType>('Auth');

export const UserSelectors = SingleHttpStore.DefaultSelectors(selectAuthState);
