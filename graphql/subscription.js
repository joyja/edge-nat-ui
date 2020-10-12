import gql from 'graphql-tag'
import fragment from './fragment'

const deployUpdateStatus = gql`
  subscription DeployUpdateStatus {
    deployUpdateStatus {
      ...DeployUpdateStatusBasic
    }
  }
  ${fragment.deployUpdateStatus}
`

export default {
  deployUpdateStatus,
}
