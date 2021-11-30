export default class Restaurant {
  public name: string;
  public id: number;
  public numberOfReviews: number;
  public averageRating: number;
  constructor(name: string) {
    this.name = name;
  }
}
