<style lang="scss" scoped>
  $radius: 3vw;
  $box_width: 70vw;
  .user_content {
    padding: 4vw;
    display: inline-block;
    color: #fff;
    border-radius: $radius;
  }
  .bian {
    margin: 0 4vw 4vw 0;
  }
  .row_reverse {
    display: flex;
    flex-direction: row-reverse;
  }
  [class^="information_"]{
    font-size: 4vw;
    padding: 1.5vw;
    margin-bottom: 4vw;
    .record {
      span {
        vertical-align: top;
        display: inline-block;
        &.userName {
          max-width: 20vw;
        }
      }
    }
  }
  .information_my,.information_others{
    .record {
      .time {
        color: #a0a0a0;
      }
    }
    .content {
      max-width: $box_width;
    }
  }
  //系统
  .information_system {
    background: rgba(0,0,0,.6);
    font-size: 3vw;
    color: #fff;
    width: $box_width;
    text-align: center;
    border-radius: $radius;
    margin-right: auto;
    margin-left: auto;
    .userName {
      margin-right: 2vw;
    }
  }
  //我
  .information_my {
    @extend .row_reverse;
    .inf_box {
      .record {
        @extend .row_reverse;
        .time {
          @extend .bian;
        }
      }
      .content {
        @extend .row_reverse;
        span {
          @extend .user_content;
          background: #4ee800;
        }
      }
    }
  }
  //其他人
  .information_others {
    .userName {
      @extend .bian;
    }
    .content {
      @extend .user_content;
      background: #14d7e8;
    }
  }

</style>

<template lang="pug">
  div(:class="`information_${InformationType}`")
    .inf_box
      .record
        span.userName.ellipsis {{dialogue.userName}}
        span.time.ellipsis {{dialogue.createAt}}
      .content
        span {{dialogue.content}}
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "information",
    props:["dialogue"],
    data() {
      return {}
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
      InformationType () {
        switch(this.dialogue.id)
        {
          case undefined:
            return 'system';
          case this.$socket.id:
            return 'my'
          default:
            return 'others'
        }
      }
    },
    methods: {
      ...mapMutations([]),

    },
    created() {

    },
    mounted() {

    }
  }
</script>

