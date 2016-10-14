const MockConfig = {
  /** The root path for all API calls (e.g. '/api/') */
  apiPath: '/api/',

  environmentsToMockOn: [
    // 'sometesthost004',
    // 'sometesthost005',
    'localhost'
  ],
  /** A list of endpoints to mock */
  endpoints: [
    { path: 'application' }
  ]
}
export default MockConfig
