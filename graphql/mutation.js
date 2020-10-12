import gql from 'graphql-tag'
import fragment from './fragment'

const setInterfaceConfig = gql`
  mutation setInterfaceConfig(
    $name: String!
    $dhcp: Boolean!
    $addresses: [String!]!
    $gateway: String
  ) {
    setInterfaceConfig(
      name: $name
      dhcp: $dhcp
      addresses: $addresses
      gateway: $gateway
    ) {
      ...NetworkInterfaceBasic
    }
  }
  ${fragment.networkInterface}
`

const createRule = gql`
  mutation CreateRule(
    $incomingDestAddress: String!
    $outgoingSourceAddress: String
    $outgoingDestAddress: String!
  ) {
    createRule(
      incomingDestAddress: $incomingDestAddress
      outgoingSourceAddress: $outgoingSourceAddress
      outgoingDestAddress: $outgoingDestAddress
    ) {
      ...NatRuleBasic
    }
  }
  ${fragment.natRule}
`

const deleteRule = gql`
  mutation DeleteRule($dnatLine: Int!, $snatLine: Int) {
    deleteRule(dnatLine: $dnatLine, snatLine: $snatLine) {
      ...NatRuleBasic
    }
  }
  ${fragment.natRule}
`

const deployUpdate = gql`
  mutation DeployUpdate {
    deployUpdate {
      ...DeployUpdateStatusBasic
    }
  }
  ${fragment.deployUpdateStatus}
`

export default {
  createRule,
  deleteRule,
  setInterfaceConfig,
  deployUpdate,
}
