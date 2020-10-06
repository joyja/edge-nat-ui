<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6"> </v-col>
    </v-row>
    <v-row class="mx-3">
      <v-dialog v-model="showCreateDialog" max-width="500px">
        <v-form>
          <v-card>
            <v-card-title>Add Rule</v-card-title>
            <v-card-text>
              <ne1-diagram
                :eth1-ext-address="eth1ExtAddress"
                :eth1-int-address="eth1IntAddress"
                :eth2-ext-address="eth2ExtAddress"
                :eth2-int-address="eth2IntAddress"
                :incoming-interface="incomingInterface"
              ></ne1-diagram>
              <v-select
                v-model="incomingDestAddress"
                label="Incoming Destination IP"
                :items="incomingAvailableAddresses"
                clearable
              />
              <v-select
                v-model="outgoingSourceAddress"
                label="Outgoing Source IP"
                :items="outgoingAvailableAddresses"
                clearable
              />
              <v-text-field
                v-model="outgoingDestAddress"
                label="Outgoing Destination IP"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn class="flex-grow-1" color="primary">add</v-btn>
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
import ne1Diagram from '../components/Diagram'
import graphql from '../graphql'
export default {
  components: {
    ne1Diagram,
  },
  async asyncData({ app, params }) {
    const provider = app.apolloProvider
    const client = provider.defaultClient
    let error = null
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
      networkInterfaces,
      error,
    }
  },
  data() {
    return {
      incomingDestAddress: null,
      outgoingSourceAddress: null,
      outgoingDestAddress: null,
      showCreateDialog: false,
    }
  },
  computed: {
    eth1ExtAddress() {
      if (this.incomingInterface === 'eth1') {
        return 'any'
      } else if (this.incomingInterface === 'eth2') {
        return this.outgoingDestAddress
          ? this.outgoingDestAddress
          : 'Not Selected'
      } else {
        return 'Not Selected'
      }
    },
    eth1IntAddress() {
      if (this.incomingInterface === 'eth1') {
        return this.incomingDestAddress
          ? this.incomingDestAddress
          : 'Not Selected'
      } else if (this.incomingInterface === 'eth2') {
        return this.outgoingSourceAddress
          ? this.outgoingSourceAddress
          : 'Not Selected'
      } else {
        return 'Not Selected'
      }
    },
    eth2IntAddress() {
      if (this.incomingInterface === 'eth2') {
        return 'any'
      } else if (this.incomingInterface === 'eth1') {
        return this.outgoingDestAddress
          ? this.outgoingDestAddress
          : 'Not Selected'
      } else {
        return 'Not Selected'
      }
    },
    eth2ExtAddress() {
      if (this.incomingInterface === 'eth2') {
        return this.incomingDestAddress
          ? this.incomingDestAddress
          : 'Not Selected'
      } else if (this.incomingInterface === 'eth1') {
        return this.outgoingSourceAddress
          ? this.outgoingSourceAddress
          : 'Not Selected'
      } else {
        return 'Not Selected'
      }
    },
    incomingInterface() {
      const eth1addresses = this.eth1Interface.ipAddresses.map(
        (address) => address.split('/')[0]
      )
      const eth2addresses = this.eth2Interface.ipAddresses.map(
        (address) => address.split('/')[0]
      )
      if (eth1addresses.includes(this.incomingDestAddress)) {
        return 'eth1'
      } else if (eth2addresses.includes(this.incomingDestAddress)) {
        return 'eth2'
      } else {
        return 'unkown'
      }
    },
    eth1Interface() {
      return this.networkInterfaces.find((iface) => {
        return iface.name === 'eth0'
      })
    },
    eth2Interface() {
      return this.networkInterfaces.find((iface) => {
        return iface.name === 'eth1'
      })
    },
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
}
</script>
