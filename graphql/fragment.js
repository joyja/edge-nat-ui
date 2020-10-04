import gql from 'graphql-tag'

const networkInterface = gql`
  fragment NetworkInterfaceBasic on NetworkInterface {
    id
    name
    mtu
    state
    ipAddresses
  }
`

export default {
  networkInterface,
}
