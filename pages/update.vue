<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card color="blue-grey lighten-5">
          <v-card-text
            ><v-btn color="primary" block @click="deployUpdate">update</v-btn>
            <v-progress-linear class="mt-3" color="accent" :value="progress" />
            <v-expand-transition>
              <div
                v-if="lastUpdateAt && progress === 100"
                class="mt-3 text-center"
              >
                <v-icon color="green">mdi-check</v-icon>
                <strong>Last Update:</strong> {{ lastUpdateAt }}
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import format from 'date-fns/format'
import graphql from '~/graphql'

export default {
  async asyncData({ app }) {
    const provider = app.apolloProvider
    const client = provider.clients.deploy
    let error = null
    const deployUpdateStatus = await client
      .query({
        query: graphql.query.deployUpdateStatus,
      })
      .then(({ data: { deployUpdateStatus } }) => {
        return deployUpdateStatus
      })
      .catch((e) => {
        error = e
      })
    return {
      deployUpdateStatus,
      error,
    }
  },
  computed: {
    lastUpdateAt() {
      return this.deployUpdateStatus.lastUpdateAt
        ? format(
            new Date(this.deployUpdateStatus.lastUpdateAt),
            'MMM d, yyyy h:mm:ss a'
          )
        : null
    },
    progress() {
      return this.deployUpdateStatus.progress
    },
  },
  methods: {
    deployUpdate() {
      this.$apollo.mutate({
        mutation: graphql.mutation.deployUpdate,
      })
    },
  },
  apollo: {
    $client: 'deploy',
    deployUpdateStatus: {
      query: graphql.query.deployUpdateStatus,
      subscribeToMore: {
        document: graphql.subscription.deployUpdateStatus,
        updateQuery: (
          previousResult,
          {
            subscriptionData: {
              data: { deployUpdateStatus },
            },
          }
        ) => {
          return {
            deployUpdateStatus,
          }
        },
      },
    },
  },
}
</script>
