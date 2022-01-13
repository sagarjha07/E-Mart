class ApiFeatures {
	constructor(query, querystr) {
		this.query = query;
		this.querystr = querystr;
	}
	search() {
		const keyword = this.querystr.keyword
			? {
					name: {
						$regex: this.querystr.keyword,
						$options: "i",
					},
			  }
			: {};

		this.query = this.query.find({ ...keyword });
		return this;
	}

	filter() {
		const querycopy = { ...this.querystr };
		const removeFields = ["keyword", "page", "limit"];

		removeFields.forEach((key) => delete querycopy[key]);

		//filter for price and rating
		let queryStr = JSON.stringify(querycopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	pagination(resultPerPage) {
		const currentPage = this.querystr.page*1 || 1;
		const skip = (currentPage - 1) * resultPerPage;

		this.query = this.query.limit(resultPerPage).skip(skip);
		return this;
	}
}

module.exports = ApiFeatures;
