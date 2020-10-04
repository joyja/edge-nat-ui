<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card color="blue-grey lighten-5">
        <v-img
          class="ma-5"
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
            v-for="(iface, index) in networkInterfaces"
            :key="iface.id"
            :class="index > 0 ? 'mt-3' : null"
            flat
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">{{
                    iface.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    'mtu: ' + iface.mtu
                  }}</v-list-item-subtitle>
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
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import graphql from '~/graphql'
export default {
  methods: {
    getStatusIcon(status) {
      if (status === 'UP') {
        return 'mdi-lan-check'
      } else {
        return 'mdi-lan-disconnect'
      }
    },
  },
  apollo: {
    networkInterfaces: {
      query: graphql.query.networkInterfaces,
    },
  },
}
</script>
