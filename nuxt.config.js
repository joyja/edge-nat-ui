import colors from 'vuetify/es5/util/colors'

export default {
  telemetry: true,
  env: {
    eth1name: process.env.ETH1NAME,
    eth2name: process.env.ETH2NAME,
    edgenatServerSecure: process.env.EDGENAT_SERVER_SECURE || false,
    edgenatServerHost: process.env.EDGENAT_SERVER_HOST,
    edgenatServerPort: process.env.EDGENAT_SERVER_PORT || 4000,
    edgenatServerUrl: process.env.EDGENAT_SERVER_URL,
    edgenatClientSecure: process.env.EDGENAT_CLIENT_SECURE || false,
    edgenatClientHost: process.env.EDGENAT_CLIENT_HOST,
    edgenatClientPort: process.env.EDGENAT_CLIENT_PORT,
    edgenatClientUrl: process.env.EDGENAT_CLIENT_URL,
    edgenatDeployServerSecure:
      process.env.EDGENAT_DEPLOY_SERVER_SECURE || false,
    edgenatDeployServerHost: process.env.EDGENAT_DEPLOY_SERVER_HOST,
    edgenatDeployServerPort: process.env.EDGENAT_DEPLOY_SERVER_PORT || 4001,
    edgenatDeployServerUrl: process.env.EDGENAT_DEPLOY_SERVER_URL,
    edgenatDeployClientSecure:
      process.env.EDGENAT_DEPLOY_CLIENT_SECURE || false,
    edgenatDeployClientHost: process.env.EDGENAT_DEPLOY_CLIENT_HOST,
    edgenatDeployClientPort: process.env.EDGENAT_DEPLOY_CLIENT_PORT,
    edgenatDeployClientUrl: process.env.EDGENAT_DEPLOY_CLIENT_URL,
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - edge-nat-ui',
    title: 'edge-nat-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/apollo'],

  /*
   ** apollo module configuration
   ** https://github.com/nuxt-community/apollo-module
   */
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
      deploy: '~/plugins/apollo-config-deploy.js',
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: colors.blueGrey.base,
          //       accent: colors.grey.darken3,
          //       secondary: colors.amber.darken3,
          //       info: colors.teal.lighten1,
          //       warning: colors.amber.base,
          //       error: colors.deepOrange.accent4,
          //       success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    splitChunks: {
      pages: false,
    },
  },
}
