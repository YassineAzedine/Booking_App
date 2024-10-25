class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    (this.mongooseQuery = mongooseQuery), (this.queryString = queryString);
  }
  filter() {
    const queryStringobj = { ...this.queryString };
    const excludesFiels = ["page", "sort", "limit", "fields"];
    excludesFiels.forEach((field) => delete queryStringobj[field]);
    //Aply filtration using [gte , gt , lte , lt ]
    let queryStr = JSON.stringify(queryStringobj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString?.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString?.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  search(Room) {
    if (this.queryString.keyword) {
      console.log(this.queryString.keyword);
      
      const query = {
        title: { $regex: this.queryString.keyword, $options: "i" },
      };

      this.mongooseQuery =  Room.find(query);
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString?.page * 1 || 1;
    const limit = this.queryString?.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
}
module.exports = ApiFeatures;
