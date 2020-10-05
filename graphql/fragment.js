import gql from 'graphql-tag'

const networkInterfaceConfig = gql`
  fragment NetworkInterfaceConfigBasic on NetworkInterfaceConfig {
    name
    dhcp4
    addresses
    gateway4
  }
`

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
  networkInterfaceConfig,
}
