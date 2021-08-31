import { Query, Document } from "mongoose";

class QueryManager<T> {
  query: Query<T[], Document<T>, {}>;
  queryStr: any;
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    //@TODO handle search available range rooms
    const queryCopy = { ...this.queryStr };
    const removeNonFilteringFields = ["page"];
    removeNonFilteringFields.forEach((el) => delete queryCopy[el]);
    let filterQuery = {};
    const fieldsLength = Object.keys(queryCopy).length;

    for (let i = 0; i < fieldsLength; i++) {
      let queryStr = JSON.stringify(Object.keys(queryCopy)[i]);
      const filterField = queryStr.substring(1, queryStr.indexOf("["));

      if (filterField.length > 1) {
        const fieldValue = Object.values(queryCopy)[0];

        const filterOperator = queryStr.substring(
          queryStr.indexOf("[") + 1,
          queryStr.indexOf("]")
        );

        filterQuery = {
          ...filterQuery,
          [filterField]: { [`$${filterOperator}`]: fieldValue },
        };
      } else {
        filterQuery = {
          ...filterQuery,
          [Object.keys(queryCopy)[i]]: Object.values(queryCopy)[i],
        };
      }
    }

    this.query = this.query.find(filterQuery);
    return this;
  }

  pagination(pageSize) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = pageSize * (currentPage - 1);

    this.query = this.query.limit(pageSize).skip(skip);
    return this;
  }
}

export default QueryManager;
