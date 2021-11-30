export default class Review {
  id: number;
  rating: number;
  content: string;
  user: number;
  restaurant: number;
  constructor(
    content: string,
    rating: number,
    user: number,
    restaurant: number) {
      this.content = content;
      this.rating = rating;
      this.user = user;
      this.restaurant = restaurant;
  }
}
