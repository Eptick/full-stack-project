import { BalValidators } from '@baloise/web-app-validators-angular';

export const RestaurantNameValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(4),
  BalValidators.isMaxLength(255),
];
export const UsernameValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(4),
  BalValidators.isMaxLength(15),
];
export const PasswordValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(4),
];
export const RolesValidations = [
  BalValidators.isRequired(),
];
export const RestaurantImageValidations = [
  BalValidators.isRequired(),
];
export const ReviewContentValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(20),
  BalValidators.isMaxLength(1500),
];
export const ReviewRatingValidations = [
  BalValidators.isRequired(),
  BalValidators.isMin(1),
  BalValidators.isMax(5),
];
export const ReviewRestaurantValidations = [
  BalValidators.isRequired(),
];
export const ReviewDateOfVisitValidations = [
  BalValidators.isRequired(),
];
export const ReviewUserValidations = [
  BalValidators.isRequired(),
];
