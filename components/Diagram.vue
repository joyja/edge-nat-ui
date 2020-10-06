<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 167.19 48.547"
  >
    <g transform="translate(-1.983 -1.65)">
      <path
        d="M100.523 2.492a2.788 2.788 0 00-2.794 2.795V17.5a2.788 2.788 0 002.794 2.794h26.287V2.492z"
        fill="#e6e6e6"
      />
      <text
        y="9.273"
        x="123"
        style="line-height: 1.25"
        font-weight="400"
        font-size="4.183"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
        text-anchor="end"
      >
        <tspan y="9.273" x="123">
          {{ incomingInterface === 'eth2' ? 'Destination' : 'Source' }}
        </tspan>
      </text>
      <text
        style="line-height: 1.25"
        x="123"
        y="16.696"
        font-weight="400"
        font-size="4.233"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
        text-anchor="end"
        width="60.62"
      >
        <tspan x="123" y="16.696">
          {{ incomingInterface === 'eth2' ? 'Source' : 'Destination' }}
        </tspan>
      </text>
      <path
        d="M5.175 2.492A2.788 2.788 0 002.38 5.286v12.215a2.788 2.788 0 002.795 2.794H31.46V2.492z"
        fill="#e6e6e6"
      />
      <image
        y="-91.856"
        x="1.651"
        width="48.547"
        height="11.29"
        preserveAspectRatio="none"
        href="/gnat-hardware.png"
        transform="rotate(90)"
        stroke-width="1.8"
      />
      <path
        d="M82.67 36.956H5.557"
        fill="#2c89a0"
        stroke="#2c89a0"
        stroke-width="1.406"
      />
      <circle
        cx="84.665"
        cy="36.734"
        fill="#2c89a0"
        stroke="#2c89a0"
        stroke-width="1.323"
        stroke-linecap="square"
        r="1.323"
      />
      <path
        d="M85.215 43.922h79.79"
        fill="#2c89a0"
        stroke="#2c89a0"
        stroke-width="1.331"
      />
      <circle
        cy="43.799"
        cx="-84.665"
        transform="scale(-1 1)"
        r="1.323"
        fill="#2c89a0"
        stroke="#2c89a0"
        stroke-width="1.323"
        stroke-linecap="square"
      />
      <path
        d="M5.174 2.492A2.788 2.788 0 002.38 5.287V17.5a2.788 2.788 0 002.794 2.794h39.97l4.069 16.24.137-16.24h21.087a2.788 2.788 0 002.794-2.794V5.287a2.788 2.788 0 00-2.794-2.795z"
        fill="none"
        stroke="#b3b3b3"
        stroke-width=".794"
        stroke-linecap="square"
      />
      <text
        style="line-height: 1.25"
        x="27"
        y="9.273"
        transform="scale(1.01197 .98817)"
        font-weight="400"
        font-size="4.183"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
        text-anchor="end"
      >
        <tspan x="27" y="9.273">
          {{ incomingInterface === 'eth2' ? 'Destination' : 'Source' }}
        </tspan>
      </text>
      <text
        y="16.696"
        x="27"
        style="line-height: 1.25"
        font-weight="400"
        font-size="4.233"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
        text-anchor="end"
      >
        <tspan y="16.696" x="27">
          {{ incomingInterface === 'eth2' ? 'Source' : 'Destination' }}
        </tspan>
      </text>
      <path
        v-if="incomingInterface === 'eth1'"
        d="M7.027 36.956l-1.926 1.112-1.927 1.113v-4.45l1.927 1.113zM167.85 43.922l-1.926 1.112-1.927 1.113v-4.45l1.927 1.113z"
        fill="#2c89a0"
        stroke="#2c89a0"
        stroke-width="1.323"
        stroke-linecap="square"
      />
      <path
        v-if="incomingInterface === 'eth2'"
        d="M3.835 36.956l1.927 1.112 1.927 1.113v-4.45l-1.927 1.113zM164.659 43.922l1.927 1.112 1.926 1.113v-4.45l-1.926 1.113z"
        fill="#2c89a0"
        stroke="#2c89a0"
        stroke-width="1.323"
        stroke-linecap="square"
      />
      <text
        y="9.273"
        x="33.584"
        style="line-height: 1.25"
        transform="scale(1.01197 .98817)"
        font-weight="400"
        font-size="4.183"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
      >
        <tspan y="9.273" x="33.584">{{ eth1ExtAddress }}</tspan>
      </text>
      <text
        style="line-height: 1.25"
        x="33.982"
        y="16.622"
        font-weight="400"
        font-size="4.233"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
      >
        <tspan x="33.982" y="16.622">{{ eth1IntAddress }}</tspan>
      </text>
      <path
        d="M165.72 2.492a2.788 2.788 0 012.795 2.795V17.5a2.788 2.788 0 01-2.794 2.794h-33.585l-4.877 23.388-.45-23.388h-26.35a2.788 2.788 0 01-2.794-2.794V5.287a2.788 2.788 0 012.794-2.795z"
        fill="none"
        stroke="#b3b3b3"
        stroke-width=".794"
        stroke-linecap="square"
      />
      <text
        style="line-height: 1.25"
        x="1129.232"
        y="9.273"
        font-weight="400"
        font-size="4.183"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
      >
        <tspan x="129.232" y="9.273">{{ eth2ExtAddress }}</tspan>
      </text>
      <text
        y="16.622"
        x="129.232"
        style="line-height: 1.25"
        font-weight="400"
        font-size="4.233"
        font-family="sans-serif"
        letter-spacing="0"
        word-spacing="0"
        stroke-width=".265"
      >
        <tspan y="16.622" x="129.232">{{ eth2IntAddress }}</tspan>
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    eth1ExtAddress: {
      type: String,
      required: false,
      default: 'not selected',
    },
    eth1IntAddress: {
      type: String,
      required: false,
      default: 'not selected',
    },
    eth2ExtAddress: {
      type: String,
      required: false,
      default: 'not selected',
    },
    eth2IntAddress: {
      type: String,
      required: false,
      default: 'not selected',
    },
    incomingInterface: {
      type: String,
      required: true,
    },
  },
}
</script>
