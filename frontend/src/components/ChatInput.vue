<template>
  <div class="input-area">
    <input
      type="text"
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type a message"
    />
    <button @click="sendMessage">➤</button>
  </div>
</template>

<script>
export default {
  name: 'ChatInput',
  data() {
    return {
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.$emit('send-message', this.newMessage);
        this.newMessage = '';
      }
    }
  }
}
</script>

<style scoped>
.input-area {
  display: flex;
  padding: 10px;
  background-color: #202c33;
}

input {
  flex-grow: 1;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #2a3942;
  color: #e9edef;
  font-size: 1rem;
}

input:focus {
  outline: none;
}

button {
  border: none;
  background-color: #00a884;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  margin-left: 10px;
  cursor: pointer;
}
</style>