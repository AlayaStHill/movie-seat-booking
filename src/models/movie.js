class Movie {
  constructor(id, name, price) {
    this.id = id; 
    this.name = name.trim();
    this.price = price;
  }

  get label() {
    return `${this.name} (${this.price} kr)`;
  }
}

export default Movie;
