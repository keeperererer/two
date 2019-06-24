<style lang="scss" scoped>
  .indoor-case {
    padding: 1vw;
  }
</style>

<template lang="pug">
  .indoor-case
    information(v-for="val,key in case_data" :dialogue="val")
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import information from '../../components/information'
  export default {
    name: "indoor-case",
    props: ["case_data"],
    data() {
      return {}
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),

    },
    methods: {
      ...mapMutations([]),

    },
    created() {

    },
    mounted() {

    },
    components: {
      information
    }
  }
</script>

