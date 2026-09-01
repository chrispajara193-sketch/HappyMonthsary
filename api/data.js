const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1544144774079062066/SWU7-SXUcFwXUpDmms-Z5uYZMHbPqj3nH-8mzbErHDz_32W8og6Z4Yw_Mt8UyIHka9Vr";

// Pre-configured relationship details
const defaultData = {
  config: {
    partnerOne: "My Love",
    partnerTwo: "Sweetheart",
    startDate: "2024-06-01:00:00.000Z", // Change this to your start date
    mainLetter: "Thank you for bringing so much happiness, comfort, and laughter into my life. Kahit lagi mo akong inaaway tsaka tinutusok yung tagiliran. Happy Monthsary! ❤️"
  },
  messages: [
    { id: 1, author: "Love", text: "I fall in love with you more and more every single day. 💕" },
    { id: 2, author: "Love", text: "You are my favorite place to go when my mind searches for peace. 🌸" },
    { id: 3, author: "Love", text: "Thank you for being my rock, my best friend, and my greatest love. ✨" }
  ]
};

// Global in-memory storage for the active serverless instance
let memoryMessages = [...defaultData.messages];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET: Fetch config and love notes
  if (req.method === 'GET') {
    return res.status(200).json({
      config: defaultData.config,
      messages: memoryMessages
    });
  }

  // POST: Add a new message / note
  if (req.method === 'POST') {
    const { author, text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const newMessage = {
      id: Date.now(),
      author: author && author.trim() ? author.trim() : 'Admirer',
      text: text.trim()
    };

    memoryMessages.push(newMessage);

    return res.status(201).json({
      success: true,
      message: newMessage
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}