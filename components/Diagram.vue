<template>
  <div>
    <ne1-diagram-to-left
      v-if="incomingInterface === 'eth1'"
      :incoming-dest-address="incomingDestAddress"
      :outgoing-source-address="outgoingSourceAddress"
      :outgoing-dest-address="outgoingDestAddress"
    />
    <ne1-diagram-to-right
      v-else
      :incoming-dest-address="incomingDestAddress"
      :outgoing-source-address="outgoingSourceAddress"
      :outgoing-dest-address="outgoingDestAddress"
    />
  </div>
</template>

<script>
import DiagramToLeft from './DiagramToLeft'
import DiagramToRight from './DiagramToRight'

export default {
  components: {
    ne1DiagramToLeft: DiagramToLeft,
    ne1DiagramToRight: DiagramToRight,
  },
  props: {
    eth1name: {
      type: String,
      required: true,
    },
    eth2name: {
      type: String,
      required: true,
    },
    networkInterfaces: {
      type: Array,
      required: true,
    },
    incomingDestAddress: {
      required: true,
      validator: (prop) =>
        typeof prop === 'string' || prop === null || prop === undefined,
    },
    outgoingSourceAddress: {
      required: true,
      validator: (prop) =>
        typeof prop === 'string' || prop === null || prop === undefined,
    },
    outgoingDestAddress: {
      required: true,
      validator: (prop) =>
        typeof prop === 'string' || prop === null || prop === undefined,
    },
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
        return iface.name === this.eth1name
      })
    },
    eth2Interface() {
      return this.networkInterfaces.find((iface) => {
        return iface.name === this.eth2name
      })
    },
  },
}
</script>
