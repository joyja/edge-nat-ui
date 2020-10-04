import gql from 'graphql-tag'
import fragment from './fragment'

const networkInterfaces = gql`
  query NetworkInterfaces {
    networkInterfaces {
      ...NetworkInterfaceBasic
    }
  }
  ${fragment.networkInterface}
`

export default {
  networkInterfaces,
}
