<template>
  <div class="message-wrapper" :class="{ 'sent': sent }">
    <div class="message-bubble">
      <p class="message-content">{{ message.text }}</p>
      <span class="message-time">{{ message.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    message: Object,
    sent: Boolean
  }
}
</script>

<style scoped>
.message-wrapper {
  display: flex;
  margin-bottom: 10px;
}

.message-wrapper.sent {
  justify-content: flex-end;
}

.message-bubble {
  background-color: #202c33;
  color: #e9edef;
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 70%;
  position: relative;
}

.message-wrapper.sent .message-bubble {
  background-color: #005c4b;
}

.message-content {
  margin: 0;
  padding-right: 50px; /* Espaço para o horário */
}

.message-time {
  font-size: 0.75em;
  color: #aebac1;
  position: absolute;
  bottom: 5px;
  right: 10px;
}
</style>