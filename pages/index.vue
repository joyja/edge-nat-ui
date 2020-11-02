<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="pt-5" color="blue-grey lighten-5">
        <v-img
          class="mx-5"
          aspect-ratio="4.3"
          lazy-src="/gnat-hardware.png"
          src="/gnat-hardware.png"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="black"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-text>
          <v-card
            v-for="(iface, index) in networkInterfacesComplete"
            :key="iface.id"
            :class="index > 0 ? 'mt-3' : null"
            flat
          >
            <v-list two-line dense>
              <v-list-item>
                <v-list-item-content class="text-uppercase">
                  <v-list-item-title class="headline pt-1">{{
                    iface.alias
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="d-flex justify-space-between"
                    ><div><strong>mac: </strong>{{ iface.macAddress }}</div>
                    <div>
                      <strong> mtu: </strong>{{ iface.mtu }}
                    </div></v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon
                    :color="iface.state !== 'UP' ? 'orange' : 'primary'"
                    v-text="getStatusIcon(iface.state)"
                  ></v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-card-text
              v-if="iface.ipAddresses && iface.ipAddresses.length > 0"
              class="pt-0"
            >
              <v-card flat>
                <v-list class="blue-grey lighten-4" dense>
                  <v-list-item
                    v-for="address in iface.ipAddresses"
                    :key="address"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{
                        getIPAddressText(address)
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        getSubnetMaskText(address)
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
            <v-card-actions class="mx-4 pt-0 px-0 pb-4">
              <v-dialog
                v-if="configs[iface.config]"
                v-model="configs[iface.config].showDialog"
                max-width="500px"
              >
                <v-form v-model="updateConfigurationValid">
                  <v-card>
                    <v-card-title>{{ iface.name }} Configuration</v-card-title>
                    <v-card-text>
                      <v-checkbox
                        v-model="configs[iface.config].dhcp4"
                        label="DHCP"
                      ></v-checkbox>
                      <v-expand-transition>
                        <div v-if="!configs[iface.config].dhcp4">
                          <v-card
                            color="blue-grey lighten-4"
                            flat
                            dense
                            class="mb-3 pb-3"
                          >
                            <v-list two-line dense color="blue-grey lighten-4">
                              <v-subheader>Addresses</v-subheader>
                              <v-scroll-y-transition group>
                                <v-list-item
                                  v-for="(address, addressIndex) in configs[
                                    iface.config
                                  ].addresses"
                                  :key="addressIndex"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{
                                      getIPAddressText(address)
                                    }}</v-list-item-title>
                                    <v-list-item-subtitle>{{
                                      getSubnetMaskText(address)
                                    }}</v-list-item-subtitle>
                                  </v-list-item-content>
                                  <v-list-item-action>
                                    <v-btn
                                      color="primary"
                                      icon
                                      @click="
                                        configs[iface.config].addresses.splice(
                                          addressIndex,
                                          1
                                        )
                                      "
                                      ><v-icon>mdi-delete</v-icon></v-btn
                                    >
                                  </v-list-item-action>
                                </v-list-item>
                              </v-scroll-y-transition>
                            </v-list>
                            <v-form v-model="addIPAddressValid">
                              <v-slide-y-transition mode="out-in">
                                <v-card-actions
                                  v-if="showAddIPAddress"
                                  key="addIPAddressForm"
                                  class="pb-0 pt-1 px-3 d-flex align-center"
                                >
                                  <v-text-field
                                    v-model="configs[iface.config].addAddress"
                                    class="flex-grow-1 mr-3"
                                    label="New Address"
                                    dense
                                    :rules="ipAddressRules"
                                  ></v-text-field>
                                  <v-autocomplete
                                    v-model="
                                      configs[iface.config].addAddressSubnetMask
                                    "
                                    class="flex-grow-1 mr-3"
                                    :items="subnetMasks"
                                    dense
                                    :rules="subnetMaskRules"
                                    label="Subnet Mask"
                                  ></v-autocomplete>
                                  <v-btn
                                    :dark="addIPAddressValid"
                                    fab
                                    x-small
                                    color="primary"
                                    elevation="1"
                                    :disabled="!addIPAddressValid"
                                    @click="addIPAddress(iface.config)"
                                    ><v-icon dark>mdi-plus</v-icon></v-btn
                                  >
                                  <v-btn
                                    color="primary"
                                    elevation="1"
                                    dark
                                    fab
                                    x-small
                                    @click="showAddIPAddress = false"
                                    ><v-icon dark>mdi-close</v-icon></v-btn
                                  >
                                </v-card-actions>
                                <v-card-actions
                                  v-else
                                  key="addIPAddressButton"
                                  class="mx-3"
                                >
                                  <v-btn
                                    block
                                    color="primary"
                                    @click="showAddIPAddress = true"
                                    ><v-icon left>mdi-plus</v-icon>Add ip
                                    address</v-btn
                                  >
                                </v-card-actions>
                              </v-slide-y-transition>
                            </v-form>
                          </v-card>
                          <v-text-field
                            v-model="configs[iface.config].gateway4"
                            label="Gateway"
                            :rules="gatewayRules"
                          />
                        </div>
                      </v-expand-transition>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        class="flex-grow-1"
                        color="primary"
                        :disabled="!updateConfigurationValid"
                        @click="setInterfaceConfig(iface.config)"
                        >apply</v-btn
                      >
                      <v-btn
                        class="flex-grow-1"
                        color="primary"
                        @click="cancelConfig(iface.config)"
                        >cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-form>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" color="primary" block v-on="on"
                    ><v-icon left>mdi-pencil</v-icon>edit</v-btn
                  >
                </template>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import isIp from 'is-ip'
import graphql from '~/graphql'

export default {
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
    const networkInterfaceConfigs = await client
      .query({
        query: graphql.query.networkInterfaceConfigs,
      })
      .then(({ data: { networkInterfaceConfigs } }) => {
        return networkInterfaceConfigs
      })
      .catch((e) => {
        error = e
      })
    return {
      networkInterfaces,
      networkInterfaceConfigs,
      configs: networkInterfaceConfigs.map((config) => {
        return {
          ...config,
          addresses: config.addresses ? config.addresses : [],
          showDialog: false,
          addAddress: '',
        }
      }),
      error,
    }
  },
  data() {
    return {
      networkInterfaces: [],
      networkInterfaceConfigs: [],
      configs: [],
      error: null,
      gatewayRules: [
        (v) =>
          v ? isIp(v) || 'Must enter a valid IP address or nothing.' : true,
      ],
      updateConfigurationValid: false,
      ipAddressRules: [(v) => isIp(v) || 'Must enter a valid IP address.'],
      subnetMaskRules: [(v) => !!v || 'Must select a valid subnet.'],
      showAddIPAddress: false,
      addIPAddressValid: false,
      subnetMasks: [
        {
          text: '/30 255.255.255.252',
          value: '/30',
        },
        {
          text: '/29 255.255.255.248',
          value: '/29',
        },
        {
          text: '/28 255.255.255.240',
          value: '/28',
        },
        {
          text: '/27 255.255.255.224',
          value: '/27',
        },
        {
          text: '/26 255.255.255.192',
          value: '/26',
        },
        {
          text: '/25 255.255.255.128',
          value: '/25',
        },
        {
          text: '/24 255.255.255.0',
          value: '/24',
        },
        {
          text: '/23 255.255.254.0',
          value: '/23',
        },
        {
          text: '/22 255.255.252.0',
          value: '/22',
        },
        {
          text: '/21 255.255.248.0',
          value: '/21',
        },
        {
          text: '/20 255.255.240.0',
          value: '/20',
        },
        {
          text: '/19 255.255.224.0',
          value: '/19',
        },
        {
          text: '/18 255.255.192.0',
          value: '/18',
        },
        {
          text: '/17 255.255.128.0',
          value: '/17',
        },
        {
          text: '/16 255.255.0.0',
          value: '/16',
        },
        {
          text: '/15 255.254.0.0',
          value: '/15',
        },
        {
          text: '/14 255.252.0.0',
          value: '/14',
        },
        {
          text: '/13 255.248.0.0',
          value: '/13',
        },
        {
          text: '/12 255.240.0.0',
          value: '/12',
        },
        {
          text: '/11 255.224.0.0',
          value: '/11',
        },
        {
          text: '/10 255.192.0.0',
          value: '/10',
        },
        {
          text: '/9 255.128.0.0',
          value: '/9',
        },
        {
          text: '/8 255.0.0.0',
          value: '/8',
        },
      ],
    }
  },
  computed: {
    networkInterfacesComplete() {
      return this.networkInterfaces.map((iface) => {
        return {
          ...iface,
          config: this.networkInterfaceConfigs.findIndex((ifaceConfig) => {
            return ifaceConfig.name === iface.name
          }),
        }
      })
    },
  },
  methods: {
    getAddressText(address) {
      const parts = address.split('/')
      const ipAddress = parts[0]
      const cidr = parts[1]
      const subnetMask = this.subnetMasks.find((mask) => {
        return mask.value === `/${cidr}`
      })
      return `${ipAddress}${subnetMask.text}`
    },
    getIPAddressText(address) {
      return address.split('/')[0]
    },
    getSubnetMaskText(address) {
      const cidr = address.split('/')[1]
      return this.subnetMasks.find((mask) => {
        return mask.value === `/${cidr}`
      }).text
    },
    addIPAddress(index) {
      this.configs[index].addresses.push(
        `${this.configs[index].addAddress}${this.configs[index].addAddressSubnetMask}`
      )
    },
    getStatusIcon(status) {
      if (status === 'UP') {
        return 'mdi-lan-check'
      } else {
        return 'mdi-lan-disconnect'
      }
    },
    cancelConfig(configIndex) {
      Object.keys(this.configs[configIndex]).forEach((key) => {
        if (key !== 'addresses') {
          this.configs[configIndex][key] = this.networkInterfaceConfigs[
            configIndex
          ][key]
        } else if (this.networkInterfaceConfigs[configIndex].addresses) {
          this.configs[configIndex].addresses = [
            ...this.networkInterfaceConfigs[configIndex].addresses,
          ]
        } else {
          this.configs[configIndex].addresses = null
        }
      })
      this.configs[configIndex].showDialog = false
    },
    async setInterfaceConfig(configIndex) {
      await this.$apollo.mutate({
        mutation: graphql.mutation.setInterfaceConfig,
        variables: {
          name: this.configs[configIndex].name,
          dhcp: this.configs[configIndex].dhcp4,
          gateway: this.configs[configIndex].gateway4,
          addresses: this.configs[configIndex].addresses,
        },
      })
      await this.$apollo.queries.networkInterfaces.refetch()
      await this.$apollo.queries.networkInterfaceConfigs.refetch()
      this.configs = this.networkInterfaceConfigs.map((config) => {
        return {
          ...config,
          addresses: config.addresses ? config.addresses : [],
          showDialog: false,
          addAddress: '',
        }
      })
    },
  },
  apollo: {
    networkInterfaces: {
      query: graphql.query.networkInterfaces,
    },
    networkInterfaceConfigs: {
      query: graphql.query.networkInterfaceConfigs,
    },
  },
}
</script>
