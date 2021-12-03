import Review from "./Review";

export interface RestaurantReport {
  highest: Review;
  lowest: Review;
  latest: Review;
}
export default class Restaurant {
  public name: string;
  public id: number;
  public numberOfReviews: number;
  public averageRating: number;
  public image: number;
  public report: RestaurantReport;
  constructor(name: string) {
    this.name = name;
  }
}
