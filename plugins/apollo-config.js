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
      httpPrefix: process.env.edgenatClientSecure ? 'https' : 'http',
      wsPrefix: process.env.edgenatClientSecure ? 'wss' : 'ws',
      hostname: process.env.edgenatClientHost || window.location.hostname,
      port: process.env.edgenatClientPort || window.location.port,
      url: process.env.edgenatClientUrl || '/api/',
    }
  } else {
    config = {
      httpPrefix: process.env.edgenatServerSecure ? 'https' : 'http',
      wsPrefix: process.env.edgenatServerSecure ? 'wss' : 'ws',
      hostname: process.env.edgenatServerHost || 'localhost',
      port: process.env.edgenatServerPort || 4000,
      url: process.env.edgenatServerUrl || '/',
    }
  }
  const portString = config.port ? `:${config.port}` : ``
  return {
    httpEndpoint: `${config.httpPrefix}://${config.hostname}${portString}${config.url}`,
    wsEndpoint: `${config.wsPrefix}://${config.hostname}${portString}${config.url}`,
    cache: new InMemoryCache({ fragmentMatcher }),
  }
}
