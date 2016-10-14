const MockConfig = {
  /** The root path for all API calls (e.g. '/api/') */
  apiPath: '/cop/',

  environmentsToMockOn: [
    // 'ukvadapp004',
    // 'ukvadapp005',
    'localhost'
  ],
  /** A list of endpoints to mock */
  endpoints: [
    { path: 'application' }
  ]
}
export default MockConfig
