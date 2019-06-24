<style lang="scss" scoped>
  $mar_b: 10vw;
  .login {
    height: 100vh;
    background: #f361ad;
    box-sizing: border-box;
    padding-top: 25vh;
    .box{
      text-align: center;
      h2 {
        margin: 0 0 $mar_b;
        position: relative;
        text-align: center;
        color: #fff;
        font-size: 8vw;
        & > span{
          margin-right: 1vw;
        }
      }
      input {
        border-radius: 5vw;
        width: 80%;
        height: 10vw;
        padding: .5vw 4vw;
        margin-bottom: $mar_b;
        text-align: center;
      }
      button {
        width: 45%;
        height: 10vw;
        background: #9e3785;
      }
    }
  }
</style>

<template lang="pug">
  .login
    div.box
      h2
        span hi
        span 你
        span 好
        span 呀
      input(placeholder="请输入昵称，或者直接确定默认生成",v-model="userName")
      button.btn_default(@click="GetInto") 进入

</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        userName: ''
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),

    },
    methods: {
      ...mapMutations([]),
      GetInto() {
        if(this.userName === '') this.userName = this.randomName(3);
        console.log(this.userName);
        sessionStorage.setItem('userName',this.userName)
        this.$router.push('/indoor')
      },
      randomName(individual) {
        let names = [];
        while(individual > names.length + 1) {
          names.push(unescape('%u' + (Math.round(Math.random() * 20901) + 19968).toString(16)))
        }
        return names.join('');
      }
    },
    created() {
      // console.log(io);
    },
    mounted() {

    }
  }
</script>

