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
      httpPrefix: process.env.edgenatDeployClientSecure ? 'https' : 'http',
      wsPrefix: process.env.edgenatDeployClientSecure ? 'wss' : 'ws',
      hostname: process.env.edgenatDeployClientHost || window.location.hostname,
      port: process.env.edgenatDeployClientPort || window.location.port,
      url: process.env.edgenatDeployClientUrl || '/api-deploy/',
    }
  } else {
    config = {
      httpPrefix: process.env.edgenatDeployServerSecure ? 'https' : 'http',
      wsPrefix: process.env.edgenatDeployServerSecure ? 'wss' : 'ws',
      hostname: process.env.edgenatDeployServerHost || 'localhost',
      port: process.env.edgenatDeployServerPort || 4001,
      url: process.env.edgenatDeployServerUrl || '/',
    }
  }
  const portString = config.port ? `:${config.port}` : ``
  return {
    httpEndpoint: `${config.httpPrefix}://${config.hostname}${portString}${config.url}`,
    wsEndpoint: `${config.wsPrefix}://${config.hostname}${portString}${config.url}`,
    cache: new InMemoryCache({ fragmentMatcher }),
  }
}
