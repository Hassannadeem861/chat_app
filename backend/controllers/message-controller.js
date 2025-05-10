import { Message } from '../models/message-model.js';
import { Conversation } from '../models/conversaction-model.js';


export const sendMessage = async (req, res) => {
    try {

        const senderId = req.id;
        const { receiverId } = req.params
        const { message } = req.body;
        
        if (!receiverId || !message) {
            return res.status(400).json({ message: "Please provide receiverId and message" });
        }


        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!gotConversation) {

            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            gotConversation.messages.push(newMessage._id)
        }

        await gotConversation.save()

        return res.status(201).json({
            message: "Message sent successfully",
            newMessage
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error sending message', error: error.message });
    }
}

export const getMessages = async (req, res) => {
    try {

        const { receiverId } = req.params
        const senderId = req.id;

        if (!receiverId) {
            return res.status(400).json({ message: "Please provide receiverId" });
        }


        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("participants").populate("messages")

        return res.status(201).json({
            message: "Message fetched successfully",
            gotConversation
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error getting message', error: error.message });
    }
}