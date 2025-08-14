<template>
  <div id="app-container">
    <div class="chat-header">
      <h3>Meu Bloco de Notas</h3>
    </div>
    <div class="chat-window">
      <div v-if="isLoadingMore" class="loading-indicator">
        <p>Carregando...</p>
      </div>

      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
        :sent="true"
      />
      <div v-if="messages.length === 0 && !isLoadingMore" class="welcome-message">
        <p>Nenhuma mensagem ainda. Envie sua primeira nota!</p>
      </div>
    </div>
    <ChatInput @send-message="handleSendMessage" />
  </div>
</template>

<script>
import axios from 'axios';
import ChatMessage from './components/ChatMessage.vue';
import ChatInput from './components/ChatInput.vue';

export default {
  name: 'App',
  components: {
    ChatMessage,
    ChatInput
  },
  data() {
    return {
      messages: [],
      isLoadingMore: false,
      allMessagesLoaded: false
    };
  },

  mounted() {
    this.loadMoreMessages(true);
    const chatWindow = this.$el.querySelector('.chat-window');
    chatWindow.addEventListener('wheel', this.handleWheel);
  },

  beforeUnmount() {
    const chatWindow = this.$el.querySelector('.chat-window');
    chatWindow.removeEventListener('wheel', this.handleWheel);
  },

  methods: {
    handleWheel(event) {
      if (this.isLoadingMore || this.allMessagesLoaded) return;

      const target = event.currentTarget;

      if (event.deltaY < 0 && target.scrollTop === 0) {
        event.preventDefault();
        this.loadMoreMessages(false);
      }
    },

    async loadMoreMessages(isInitialLoad = false) {
      if (this.isLoadingMore || this.allMessagesLoaded || this.messages.length >= 100) {
        if (this.messages.length >= 100) this.allMessagesLoaded = true;
        return;
      }
      this.isLoadingMore = true;

      let url = 'api/message';
      const chatWindow = this.$el.querySelector('.chat-window');
      const oldScrollHeight = chatWindow.scrollHeight;

      if (!isInitialLoad && this.messages.length > 0) {
        const oldestMessage = this.messages[0];
        if (oldestMessage && oldestMessage.timestamp) {
          url += `?lastVisible=${oldestMessage.timestamp}`;
        }
      }

      try {
        const response = await axios.get(url);
        const newMessages = response.data;

        if (newMessages.length > 0) {
          this.messages.unshift(...newMessages.reverse());
          await this.$nextTick();
          if (isInitialLoad) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
          } else {
            chatWindow.scrollTop = chatWindow.scrollHeight - oldScrollHeight;
          }
        } else {
          this.allMessagesLoaded = true;
        }
      } catch (error) {
        console.error("Erro ao carregar mais mensagens:", error);
      } finally {
        this.isLoadingMore = false;
      }
    },

    async handleSendMessage(messageText) {
      const tempId = Date.now();
      const newMessage = { id: tempId, text: messageText, timestamp: new Date().toISOString(), sent: true };
      this.messages.push(newMessage);
      this.$nextTick(() => { this.$el.querySelector('.chat-window').scrollTop = this.$el.querySelector('.chat-window').scrollHeight; });
      try {
        const response = await axios.post('api/message', { text: newMessage.text, timestamp: newMessage.timestamp });
        const messageIndex = this.messages.findIndex(msg => msg.id === tempId);
        if (messageIndex !== -1) this.messages[messageIndex].id = response.data.id;
      } catch (error) {
        console.error('Erro ao salvar a mensagem:', error);
        this.messages = this.messages.filter(msg => msg.id !== tempId);
      }
    }
  }
}
</script>

<style>
.chat-window {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

.loading-indicator {
  padding: 15px;
  text-align: center;
  color: #aebac1;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #0b141a;
}

#app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-color: #0b141a;
}

.chat-header {
  background-color: #202c33;
  color: #e9edef;
  padding: 10px 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.chat-header h3 {
  margin: 0;
}



.welcome-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.welcome-message p {
  background-color: #1a2831;
  color: #aebac1;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 0.9em;
}

.chat-window::-webkit-scrollbar {
  width: 6px;
}

.chat-window::-webkit-scrollbar-track {
  background: transparent;
}

.chat-window::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
</style>