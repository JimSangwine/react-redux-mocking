export default class MockUtils {
  /**
   * Looks in the querystring for the window for a mock override (e.g. ?some/path=mockName)
   * @param {string} path
   * @returns {*}
   */
  static getMockOverride (path) {
    const href = (typeof window !== 'undefined') ? window.location.href : ''
    const reg = new RegExp('[?&]' + path + '=([^&#]*)', 'i')
    const string = reg.exec(href)
    if (!string) {
      return {
        mock: 'ok',
        method: 'GET'
      }
    }

    if (string[1].indexOf('$$') !== -1) {
      const parts = string[1].split('$$')
      return {
        mock: parts[1],
        method: parts[0]
      }
    }

    return {
      mock: string[1],
      method: 'GET'
    }
  }

  /**
   * Generates a request handler for a given path
   * @param {string} _path
   * @returns {requestHandler}
   */
  static getRequestHandler (_path) {
    const path = _path
    const mockOverride = this.getMockOverride(path)
    let httpCode = parseInt(mockOverride.mock, 10)
    if (isNaN(httpCode)) {
      httpCode = 200
    }

    return function requestHandler (xhr) {
      const method = xhr.method
      const doOverride = (method === mockOverride.method)
      const filename = './' + path + '/' +
       [method, (doOverride ? mockOverride.mock : 'ok')].join('_') +
       '.json'
      // eslint-disable-next-line global-require
      const json = require(filename)
      // eslint-disable-next-line no-console
      console.log('mock: ', filename, ' ', method)
      xhr.respond(doOverride ? httpCode : 200, { 'Content-Type': 'application/json' }, JSON.stringify(json))
    }
  }

  /**
   * Determines whether to mock on the current environment or not
   * @param  {Array.<string>} environmentsToMock
   * @return {boolean}
   */
  static shouldMockOnThisEnvironment (environmentsToMock) {
    const href = (typeof window !== 'undefined') ? window.location.href : ''
    return environmentsToMock.some(environment => {
      return href.match(new RegExp(environment))
    })
  }
}
