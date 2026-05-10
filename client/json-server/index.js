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

server.use(async (req, res, next) => {
    await new Promise((res) => setTimeout(res, 300));
    next();
});

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
