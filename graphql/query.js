import gql from 'graphql-tag'
import fragment from './fragment'

const natRules = gql`
  query NatRules {
    natRules {
      ...NatRuleBasic
    }
  }
  ${fragment.natRule}
`

const networkInterfaceConfigs = gql`
  query NetworkInterfaceConfigs {
    networkInterfaceConfigs {
      ...NetworkInterfaceConfigBasic
    }
  }
  ${fragment.networkInterfaceConfig}
`

const networkInterfaces = gql`
  query NetworkInterfaces {
    networkInterfaces {
      ...NetworkInterfaceBasic
    }
  }
  ${fragment.networkInterface}
`

export default {
  natRules,
  networkInterfaces,
  networkInterfaceConfigs,
}
