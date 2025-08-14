const db = require('../../config/firebase');

const getAllMessages = async (req, res) => {
  try {
    const { lastVisible } = req.query;
    let query = db.collection('messages').orderBy('timestamp', 'desc');

    if (lastVisible) {
      query = query.startAfter(new Date(lastVisible));
    }
    query = query.limit(10);
    const snapshot = await query.get();

    const messages = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate().toISOString()
      });
    });

    return res.status(200).send(messages);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return res.status(500).send({ error: 'Erro interno no servidor' });
  }
};

const postMessage = async (req, res) => {
  try {
    const { text, timestamp } = req.body;
    if (!text) {
      return res.status(400).send({ error: 'Campo texto ausente' });
    }
    const newMessage = { text, timestamp: new Date(timestamp), senderId: 'Segredo'};
    const docRef = await db.collection('messages').add(newMessage);

    return res.status(201).send({ id: docRef.id, ...newMessage });
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    return res.status(500).send({ error: 'Erro interno no servidor' });
  }
};

module.exports = {
  getAllMessages,
  postMessage,
};