import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

interface VoteRecord {
  id: string;
  vote: 'sim' | 'nao';
  timestamp: string; // ISO string
  device: string;
  ip?: string;
  userAgent?: string;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to persistent data file
const DATA_DIR = path.join(process.cwd(), 'data');
const VOTES_FILE = path.join(DATA_DIR, 'votes.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(VOTES_FILE)) {
    fs.writeFileSync(VOTES_FILE, JSON.stringify([]), 'utf-8');
  }
}

function getStoredVotes(): VoteRecord[] {
  try {
    ensureDataFile();
    const content = fs.readFileSync(VOTES_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading votes file:', err);
    return [];
  }
}

function saveVotes(votes: VoteRecord[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(VOTES_FILE, JSON.stringify(votes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing votes file:', err);
  }
}

function parseDevice(userAgent: string = ''): string {
  if (/iPhone/i.test(userAgent)) return '📱 iPhone (iOS)';
  if (/iPad/i.test(userAgent)) return '📱 iPad (iPadOS)';
  if (/Android/i.test(userAgent)) return '📱 Android';
  if (/Macintosh|Mac OS/i.test(userAgent)) return '💻 Mac / Apple';
  if (/Windows/i.test(userAgent)) return '💻 Windows PC';
  if (/Linux/i.test(userAgent)) return '💻 Linux';
  return '📱 Celular / Web';
}

// API Routes

app.get('/api/votes', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const votes = getStoredVotes();
  // Return newest first
  const sorted = [...votes].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  res.json({
    success: true,
    total: sorted.length,
    simCount: sorted.filter((v) => v.vote === 'sim').length,
    naoCount: sorted.filter((v) => v.vote === 'nao').length,
    votes: sorted,
  });
});

app.post('/api/votes', (req, res) => {
  const { vote, clientTime } = req.body;
  if (vote !== 'sim' && vote !== 'nao') {
    return res.status(400).json({ success: false, error: 'Voto inválido' });
  }

  const userAgent = req.headers['user-agent'] || '';
  const rawIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
  const ip = rawIp.split(',')[0].trim();
  const device = parseDevice(userAgent);

  const newVote: VoteRecord = {
    id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    vote,
    timestamp: clientTime || new Date().toISOString(),
    device,
    ip: ip ? `${ip.substring(0, 7)}***` : undefined,
    userAgent: userAgent.substring(0, 150),
  };

  const currentVotes = getStoredVotes();
  currentVotes.unshift(newVote);
  saveVotes(currentVotes);

  res.json({ success: true, vote: newVote });
});

async function startServer() {
  // Explicitly serve static files from public directory
  app.use(express.static(path.join(process.cwd(), 'public')));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
