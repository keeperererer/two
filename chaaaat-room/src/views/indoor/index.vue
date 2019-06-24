<style lang="scss" scoped>
  .indoor-index {
    height: 100vh;
    display: flex;
    flex-direction: column;
    & > .header, & > .footer{
      height: 12vw;
      background: #428eee;
    }
    .header {

    }
    .section {
      height: 100%;
      overflow-y: auto;
    }
    .footer {
      padding: 1.5vw;
      font-size: 3vw;
      display: flex;
      input {
        width: 100%;
        padding: .2vw 2vw;
        margin-right: 2vw;
      }
      button {
        width: 15vw;
        background: #88c4e1;
      }
    }
  }
</style>

<template lang="pug">
  .indoor-index()
    header.header
    section.section(ref="section")
      indoor_case(:case_data="case_data" ref="indoor")
    footer.footer
      input(v-model="content" @keyup.enter="message")
      button.btn_default(@click="message") 发送
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import indoor_case from './case'
  export default {
    name: "indoor-index",
    data() {
      return {
        content: '',
        case_data: [],
      }
    },
    sockets: {
      //不能改,j建立连接自动调用connect
      connect (msg) {
        //与socket.io连接后回调
        console.log(msg);
      },
      message (msg) {
        this.case_data.push(msg);
        this.$nextTick(() => {
          const refs = this.$refs;
          refs.section.scrollTop = refs.indoor.$el.scrollHeight;
        })
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      message (userName) {
        if(this.content === '' && typeof userName == 'object') return;
        this.$socket.emit('message',{
          userName,
          content: this.content,
        })
        this.content = ''
      }
    },
    created() {
      this.message(sessionStorage.getItem('userName'));
    },
    mounted() {

    },
    components: {
      indoor_case
    }
  }
</script>

