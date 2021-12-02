import Restaurant from "./Restaurant";
import User from "./User";

export default class Review {
  id: number;
  rating: number;
  content: string;
  dateOfVisit: number;
  user: User;
  restaurant: Restaurant;
}
export class ReviewDto extends Review {
  restaurantId: number;
  userId: number;
}
