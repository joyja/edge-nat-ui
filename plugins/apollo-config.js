import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import fragmentTypes from '~/fragmentTypes.json'
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: fragmentTypes,
})

export default function (context) {
  let config = {}
  if (process.client) {
    config = {
      httpPrefix: 'http',
      wsPrefix: 'ws',
      hostname: window.location.hostname,
      port: 4000,
      url: '/',
    }
  } else {
    config = {
      httpPrefix: 'http',
      wsPrefix: 'ws',
      hostname: 'localhost',
      port: 4000,
      url: '/',
    }
  }
  const portString = config.port ? `:${config.port}` : ``
  return {
    httpEndpoint: `${config.httpPrefix}://${config.hostname}${portString}${config.url}`,
    wsEndpoint: `${config.wsPrefix}://${config.hostname}${portString}${config.url}`,
    cache: new InMemoryCache({ fragmentMatcher }),
  }
}
