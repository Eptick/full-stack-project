import { BalValidators } from '@baloise/web-app-validators-angular';

export const RestaurantNameValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(4),
];
export const RestaurantImageValidations = [
  BalValidators.isRequired(),
];

export const ReviewContantValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(20),
];
export const ReviewRatingValidations = [
  BalValidators.isRequired(),
  BalValidators.isMin(1),
  BalValidators.isMax(5),
];
export const ReviewRestaurantValidations = [
  BalValidators.isRequired(),
  BalValidators.isMin(1),
  BalValidators.isMax(5),
];
