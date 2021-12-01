import { BalValidators } from '@baloise/web-app-validators-angular';

export const RestaurantNameValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(4),
];
