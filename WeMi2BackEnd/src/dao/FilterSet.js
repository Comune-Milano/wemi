export default class FilterSet {
  constructor(formatter, filters) {
      if (!filters || typeof filters !== 'object') {
          throw new TypeError('Parameter \'filters\' must be an object.');
      }
      this.formatter = formatter;
      this.filters = filters;
      this.rawType = true;
  }

  toPostgres() {
      const keys = Object.keys(this.filters);
      if (keys.length > 0) {
          const s = keys.map(k => `${this.formatter.name(k)} IN ($[${k}:csv])`).join(' AND ');
          return ' AND ' + this.formatter.format(s, this.filters);
      }
      return '';
  }
}