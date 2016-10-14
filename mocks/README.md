# Simple front-end API mocking

Uses Sinon to intercept all calls to XMLHttpRequest for a given url regEx and return static JSON files.

This enables you to mock different scenarios using querystring parameters.

In your browser URL (**not** in your code!), you can specify responses to different API calls like this:

  // causes mocks/loadInfo/GET_alt.json to be returned for GET requests to /api/loadInfo
  ?loadInfo=alt
  
  // causes mocks/loadInfo/GET_401.json to be returned for GET requests to /api/loadInfo AND returns the 401 HTTP code
  ?loadInfo=401
  
  // causes mocks/loadInfo/PUT_500.json to be returned for PUT requests to /api/loadInfo AND returns the 500 HTTP code
  ?loadInfo=PUT$$500