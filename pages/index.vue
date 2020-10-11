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
            <v-list>
              <v-list-item>
                <v-list-item-content class="text-uppercase">
                  <v-list-item-title class="headline">{{
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
                      <v-list-item-title>{{ address }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-dialog
                v-if="configs[iface.config]"
                v-model="configs[iface.config].showDialog"
                max-width="500px"
              >
                <v-form>
                  <v-card>
                    <v-card-title>{{ iface.name }} Configuration</v-card-title>
                    <v-card-text>
                      <v-checkbox
                        v-model="configs[iface.config].dhcp4"
                        label="DHCP"
                      ></v-checkbox>
                      <v-expand-transition>
                        <div v-if="!configs[iface.config].dhcp4">
                          <v-card flat dense class="mb-3">
                            <v-list color="blue-grey lighten-4" dense>
                              <v-subheader>Addresses</v-subheader>
                              <v-list-item
                                v-for="(address, addressIndex) in configs[
                                  iface.config
                                ].addresses"
                                :key="addressIndex"
                              >
                                <v-list-item-content>{{
                                  address
                                }}</v-list-item-content>
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
                            </v-list>
                          </v-card>
                          <div class="d-flex align-center">
                            <v-text-field
                              v-model="configs[iface.config].addAddress"
                              label="New Address"
                            ></v-text-field>
                            <v-btn
                              color="primary"
                              icon
                              @click="
                                configs[iface.config].addresses.push(
                                  configs[iface.config].addAddress
                                )
                              "
                              ><v-icon>mdi-plus</v-icon></v-btn
                            >
                          </div>
                          <v-text-field
                            v-model="configs[iface.config].gateway4"
                            label="Gateway"
                          />
                        </div>
                      </v-expand-transition>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        class="flex-grow-1"
                        color="primary"
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
