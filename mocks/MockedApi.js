import sinon from 'sinon'
import MockUtils from './MockUtils'
import config from './MockConfig'

export default class MockedApi {
  /**
   * Initialises API mocking
   */
  static init () {
    // use sinon.js to monkey-patch XmlHttpRequest
    if (!MockUtils.shouldMockOnThisEnvironment(config.environmentsToMockOn)) {
      // eslint-disable-next-line no-console
      console.log('mocking disabled for this environment')
      return
    }
    sinon.FakeXMLHttpRequest.useFilters = true
    sinon.FakeXMLHttpRequest.addFilter(function (method, url, async, username, password) {
      // Only intercept endpoints specified in the config
      if (!config.endpoints.some(endpoint => {
        return url.match(new RegExp(config.apiPath + endpoint.path))
      })) {
        // eslint-disable-next-line no-console
        console.log('not mocking ', url)
        return true
      }
    })
    const mockServer = sinon.fakeServer.create({autoRespond: true})
    config.endpoints.forEach(endpoint => {
      mockServer.respondWith(new RegExp(config.apiPath + endpoint.path), MockUtils.getRequestHandler(endpoint.path))
    })
  }
}

