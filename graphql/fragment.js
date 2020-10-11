import gql from 'graphql-tag'

const natRule = gql`
  fragment NatRuleBasic on NatRule {
    snatLine
    dnatLine
    incomingDestAddress
    outgoingSourceAddress
    outgoingDestAddress
  }
`

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
    alias
    mtu
    state
    ipAddresses
    macAddress
  }
`

export default {
  natRule,
  networkInterface,
  networkInterfaceConfig,
}
