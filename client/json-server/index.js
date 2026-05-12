import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

function readDb() {
    return JSON.parse(fs.readFileSync(resolve(__dirname, 'db.json'), 'UTF-8'));
}

function writeDb(db) {
    fs.writeFileSync(resolve(__dirname, 'db.json'), JSON.stringify(db, null, 2));
}

// Login by email
server.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const { users = [] } = readDb();
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            const { password: _, ...safe } = user;
            return res.json(safe);
        }
        return res.status(403).json({ message: 'Неверный email или пароль' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// Register by email — also creates a profile entry
server.post('/register', (req, res) => {
    try {
        const { username, email, password } = req.body;
        const db = readDb();
        const users = db.users ?? [];
        const profiles = db.profile ?? [];

        if (users.find((u) => u.email === email)) {
            return res.status(400).json({ message: 'Email уже зарегистрирован' });
        }

        const id = String(Date.now());
        const createdAt = new Date().toLocaleDateString('ru-RU');

        const newUser = {
            id,
            username,
            email,
            password,
            token: `token_${id}`,
            createdAt,
        };

        const newProfile = {
            id,
            firstName: username,
            lastName: '',
            avatarUrl: '',
            createdAt,
        };

        writeDb({ ...db, users: [...users, newUser], profile: [...profiles, newProfile] });

        const { password: _, ...safe } = newUser;
        return res.json(safe);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// Public - get quiz session by invite token or quizId (no auth required)
server.get('/public/quiz/:token', (req, res) => {
    try {
        const { token } = req.params;
        const db = readDb();
        const inviteLinks = db.inviteLinks ?? [];

        // Try by token first, then fall back to quizId for convenience links
        let link = inviteLinks.find((l) => l.token === token && l.isActive);
        if (!link) {
            link = inviteLinks.find((l) => l.quizId === token && l.isActive);
        }

        if (!link) return res.status(404).json({ message: 'Ссылка не найдена или недействительна' });
        if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
            return res.status(410).json({ message: 'Срок действия ссылки истёк' });
        }
        if (link.maxUses !== null && link.usedCount >= link.maxUses) {
            return res.status(410).json({ message: 'Ссылка исчерпала лимит использований' });
        }

        const quiz = (db.quizzes ?? []).find((q) => q.id === link.quizId);
        if (!quiz || !quiz.isPublished) {
            return res.status(404).json({ message: 'Тест не найден или не опубликован' });
        }

        const questions = (db.questions ?? [])
            .filter((q) => q.quizId === link.quizId)
            .sort((a, b) => a.order - b.order);

        return res.json({ inviteLink: link, quiz, questions });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// Public - submit attempt (no auth required)
server.post('/public/attempts', (req, res) => {
    try {
        const db = readDb();
        const attempt = {
            ...req.body,
            id: String(Date.now()),
            createdAt: new Date().toISOString(),
        };

        const inviteLinks = db.inviteLinks ?? [];
        const linkIdx = inviteLinks.findIndex((l) => l.token === attempt.inviteLinkToken);
        if (linkIdx !== -1) {
            inviteLinks[linkIdx] = { ...inviteLinks[linkIdx], usedCount: inviteLinks[linkIdx].usedCount + 1 };
        }

        const quizzes = db.quizzes ?? [];
        const quizIdx = quizzes.findIndex((q) => q.id === attempt.quizId);
        if (quizIdx !== -1) {
            quizzes[quizIdx] = { ...quizzes[quizIdx], attemptsCount: (quizzes[quizIdx].attemptsCount ?? 0) + 1 };
        }

        const attempts = [...(db.attempts ?? []), attempt];
        writeDb({ ...db, attempts, inviteLinks, quizzes });

        return res.json(attempt);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// Public - get attempt by id (no auth required)
server.get('/public/attempts/:id', (req, res) => {
    try {
        const { id } = req.params;
        const db = readDb();
        const attempt = (db.attempts ?? []).find((a) => a.id === id);
        if (!attempt) return res.status(404).json({ message: 'Попытка не найдена' });
        return res.json(attempt);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// Auth guard for all other routes
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }
    next();
});

server.use(router);

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
