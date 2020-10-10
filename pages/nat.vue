<template>
  <div>
    <v-row justify="center" align="center">
      <v-col v-for="(rule, index) in natRules" :key="rule.dnatLine">
        <v-dialog
          v-if="natRulesConfig[index]"
          v-model="natRulesConfig[index].showDialog"
          max-width="500px"
        >
          <v-form v-model="natRulesConfig[index].formValid">
            <v-card>
              <v-card-title>Edit Rule</v-card-title>
              <v-card-text>
                <ne1-diagram
                  :eth1name="eth1name"
                  :eth2name="eth2name"
                  :incoming-dest-address="
                    natRulesConfig[index].incomingDestAddress
                  "
                  :outgoing-source-address="
                    natRulesConfig[index].outgoingSourceAddress
                  "
                  :outgoing-dest-address="
                    natRulesConfig[index].outgoingDestAddress
                  "
                  :network-interfaces="networkInterfaces"
                ></ne1-diagram>
                <v-select
                  v-model="natRulesConfig[index].incomingDestAddress"
                  label="Incoming Destination IP"
                  :items="incomingAvailableAddresses"
                  clearable
                  :rules="incomingDestAddressRules"
                />
                <v-select
                  v-model="natRulesConfig[index].outgoingSourceAddress"
                  label="Outgoing Source IP"
                  :items="outgoingAvailableAddresses"
                  clearable
                  :rules="outgoingSourceAddressRules"
                />
                <v-text-field
                  v-model="natRulesConfig[index].outgoingDestAddress"
                  label="Outgoing Destination IP"
                  :rules="outgoingDestAddressRules"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="flex-grow-1"
                  color="primary"
                  :disabled="!natRulesConfig[index].formValid"
                  @click="updateRule()"
                  >edit</v-btn
                >
                <v-btn
                  class="flex-grow-1"
                  color="primary"
                  @click="deleteRule(rule, natRulesConfig[index])"
                  >delete</v-btn
                >
                <v-btn
                  class="flex-grow-1"
                  color="primary"
                  @click="cancelEdit(natRulesConfig[index])"
                  >cancel</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
          <template v-slot:activator="{ on, attrs }">
            <v-card color="blue-grey lighten-4" v-bind="attrs" v-on="on"
              ><v-card-text>
                <v-row class="mr-12 flex-nowrap" no-gutters>
                  <v-col class="text-right">
                    <strong class="text-uppercase pr-3">dest:</strong>
                  </v-col>
                  <v-col>{{ rule.incomingDestAddress }} </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col class="text-center"
                    ><v-icon>mdi-arrow-down</v-icon></v-col
                  >
                </v-row>
                <v-row
                  v-if="rule.outgoingSourceAddress"
                  class="mr-12 flex-nowrap"
                  no-gutters
                >
                  <v-col class="text-right">
                    <strong class="text-uppercase pr-3">src:</strong>
                  </v-col>
                  <v-col>
                    {{ rule.outgoingSourceAddress }}
                  </v-col>
                </v-row>
                <v-row class="mr-12 flex-nowrap" no-gutters>
                  <v-col class="text-right">
                    <strong class="text-uppercase pr-3">dest:</strong>
                  </v-col>
                  <v-col>{{ rule.outgoingDestAddress }}</v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="mx-0">
      <v-dialog v-model="showCreateDialog" max-width="500px">
        <v-form v-model="createValid">
          <v-card>
            <v-card-title>Add Rule</v-card-title>
            <v-card-text>
              <ne1-diagram
                :eth1name="eth1name"
                :eth2name="eth2name"
                :incoming-dest-address="incomingDestAddress"
                :outgoing-source-address="outgoingSourceAddress"
                :outgoing-dest-address="outgoingDestAddress"
                :network-interfaces="networkInterfaces"
              ></ne1-diagram>
              <v-select
                v-model="incomingDestAddress"
                label="Incoming Destination IP"
                :items="incomingAvailableAddresses"
                :rules="incomingDestAddressRules"
                clearable
              />
              <v-select
                v-model="outgoingSourceAddress"
                label="Outgoing Source IP"
                :items="outgoingAvailableAddresses"
                :rules="outgoingSourceAddressRules"
                clearable
              />
              <v-text-field
                v-model="outgoingDestAddress"
                label="Outgoing Destination IP"
                :rules="outgoingDestAddressRules"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="flex-grow-1"
                color="primary"
                :disabled="!createValid"
                @click="createRule()"
                >add</v-btn
              >
              <v-btn
                class="flex-grow-1"
                color="primary"
                @click="showCreateDialog = false"
                >cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" color="primary" block v-on="on"
            ><v-icon left>mdi-plus</v-icon>add rule</v-btn
          >
        </template>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import isIp from 'is-ip'
import ne1Diagram from '../components/Diagram'
import graphql from '../graphql'
export default {
  components: {
    ne1Diagram,
  },
  async asyncData({ app, params, env }) {
    const provider = app.apolloProvider
    const client = provider.defaultClient
    let error = null
    const natRules = await client
      .query({
        query: graphql.query.natRules,
      })
      .then(({ data: { natRules } }) => {
        return natRules
      })
      .catch((e) => {
        error = e
      })
    const networkInterfaces = await client
      .query({
        query: graphql.query.networkInterfaces,
      })
      .then(({ data: { networkInterfaces } }) => {
        return networkInterfaces
      })
      .catch((e) => {
        error = e
      })
    return {
      natRules,
      natRulesConfig: natRules.map((rule) => {
        return {
          ...rule,
          showDialog: false,
          formValid: false,
        }
      }),
      networkInterfaces,
      error,
      eth1name: env.eth1name,
      eth2name: env.eth2name,
    }
  },
  data() {
    return {
      createValid: false,
      incomingDestAddress: null,
      incomingDestAddressRules: [
        (v) => !!v || 'Incoming destination address is required.',
      ],
      outgoingSourceAddress: null,
      outgoingSourceAddressRules: [],
      outgoingDestAddress: null,
      outgoingDestAddressRules: [
        (v) => !!v || 'Outgoing destination address is required',
        (v) =>
          isIp.v4(v) ||
          'Outgoing destination address must be a valid IP Address.',
      ],
      showCreateDialog: false,
    }
  },
  computed: {
    incomingAvailableAddresses() {
      return [].concat.apply(
        [],
        this.networkInterfaces
          .map((iface) => {
            return iface.ipAddresses.map((address) => {
              return address.split('/')[0]
            })
          })
          .filter((addresses) => {
            return !addresses.includes(this.outgoingSourceAddress)
          })
      )
    },
    outgoingAvailableAddresses() {
      return [].concat.apply(
        [],
        this.networkInterfaces
          .map((iface) => {
            return iface.ipAddresses.map((address) => {
              return address.split('/')[0]
            })
          })
          .filter((addresses) => {
            return !addresses.includes(this.incomingDestAddress)
          })
      )
    },
  },
  methods: {
    cancelEdit(config) {
      this.natRulesConfig = this.natRules.map((rule) => {
        return {
          ...rule,
          showDialog: false,
          formValid: false,
        }
      })
    },
    async createRule() {
      await this.$apollo.mutate({
        mutation: graphql.mutation.createRule,
        variables: {
          incomingDestAddress: this.incomingDestAddress,
          outgoingSourceAddress: this.outgoingSourceAddress,
          outgoingDestAddress: this.outgoingDestAddress,
        },
      })
      await this.$apollo.queries.natRules.refetch()
      this.natRulesConfig = this.natRules.map((rule) => {
        return {
          ...rule,
          showDialog: false,
        }
      })
    },
    async deleteRule(rule, config) {
      await this.$apollo.mutate({
        mutation: graphql.mutation.deleteRule,
        variables: {
          dnatLine: rule.dnatLine,
          snatLine: rule.snatLine,
        },
      })
      await this.$apollo.queries.natRules.refetch()
      this.natRulesConfig = this.natRules.map((rule) => {
        return {
          ...rule,
          showDialog: false,
          formValid: false,
        }
      })
    },
  },
  apollo: {
    natRules: {
      query: graphql.query.natRules,
    },
    networkInterfaces: {
      query: graphql.query.networkInterfaces,
    },
  },
}
</script>
