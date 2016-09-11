export default class MockUtils {
  static getMockOverride(path) {
    const href = (typeof window !== 'undefined') ? window.location.href : '';
    const reg = new RegExp('[?&]' + path + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    if (!string) {
      return {
        mock: 'ok',
        method: 'GET'
      };
    }
    if (string[1].indexOf('$$') !== -1) {
      const parts = string[1].split('$$');
      return {
        mock: parts[1],
        method: parts[0]
      };
    }
    return {
      mock: string[1],
      method: 'GET'
    };
  }

  static getRequestHandler(_path) {
    const path = _path;
    const mockOverride = this.getMockOverride(path);

    return function requestHandler(xhr) {
      const method = xhr.method;
      const filename = './' + path + '/' +
                       [method, ((method === mockOverride.method) ? mockOverride.mock : 'ok')].join('_') +
                       '.json';

      const json = require(filename);
      console.log(path, filename, json);

      xhr.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(json));
    };
  }
}
