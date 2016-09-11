import sinon from 'sinon';
import MockUtils from './MockUtils';
import config from './MockConfig';

export default class ApiClient {
  /**
   * Initialises API mocking
   */
  static init() {
    // use sinon.js to monkey-patch XmlHttpRequest
    const mockServer = sinon.fakeServer.create({autoRespond: true});
    config.endpoints.forEach(endpoint => {
      mockServer.respondWith(new RegExp(config.apiPath + endpoint.path), MockUtils.getRequestHandler(endpoint.path));
    });
  }
}
