<script>
  export default {
    created: function () {
      const socket = require('socket.io-client')(window.location.href)
      socket.on('log', function (data) {
        window.bus.$emit('log', data)
      })
      socket.on('error', function (data) {
        window.bus.$emit('error', data)
      })
      socket.on('performance', function (data) {
        window.bus.$emit('performance', data)
      })
    },
    render: () => {}
  }
</script>