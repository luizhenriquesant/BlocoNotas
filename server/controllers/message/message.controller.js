const db = require('../../config/firebase');

const postMessage = async (req, res) => {
    try {
        const { text, timestamp } = req.body;
        if (!text) return res.code(400).send({ error: 'Campo obrigatorio ausente' });

        const newMessage = {
            text,
            senderId: 'Segredo',
            timestamp: timestamp ? new Date(timestamp) : new Date()
        };
        const docRef = await db.collection('messages').add(newMessage);
        res.code(201).send({ id: docRef.id, ...newMessage });
    } catch (err) {
        return res.code(500).send({ error: 'Erro interno', details: err.message });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const { lastVisible } = req.query;
        let query = db.collection('messages').orderBy('timestamp', 'desc');

        if (lastVisible && typeof lastVisible === 'string') {
            const lastVisibleDate = new Date(lastVisible);
            if (!isNaN(lastVisibleDate.getTime())) {
                query = query.startAfter(lastVisibleDate);
            }
        }

        query = query.limit(10);
        const snapshot = await query.get();

        if (snapshot.empty) {
            return res.code(200).send([]);
        }

        const messages = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            messages.push({
                id: doc.id,
                text: data.text,
                senderId: data.senderId,
                timestamp: data.timestamp.toDate().toISOString()
            });
        });

        return res.code(200).send(messages);

    } catch (err) {
        return res.code(500).send({
            error: 'Erro interno ao buscar mensagens',
            details: err.message
        });
    }
};

module.exports = {
  getAllMessages,
  postMessage,
};