import { BalValidators } from '@baloise/web-app-validators-angular';


// registraton / users
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

// restaurant
export const RestaurantNameValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(4),
  BalValidators.isMaxLength(255),
];
export const RestaurantImageValidations = [
  BalValidators.isRequired(),
];

// review
export const ReviewRestaurantValidations = [
  BalValidators.isRequired(),
];
export const ReviewUserValidations = [
  BalValidators.isRequired(),
];
export const ReviewDateOfVisitValidations = [
  BalValidators.isRequired(),
];
export const ReviewRatingValidations = [
  BalValidators.isRequired(),
  BalValidators.isMin(1),
  BalValidators.isMax(5),
];
export const ReviewContentValidations = [
  BalValidators.isRequired(),
  BalValidators.isMinLength(20),
  BalValidators.isMaxLength(1500),
];
