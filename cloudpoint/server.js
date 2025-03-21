const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Używamy body-parser do odczytu danych z formularza
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serwowanie statycznych plików

// Wczytanie listy dozwolonych e-maili
const allowedEmails = JSON.parse(fs.readFileSync(path.join(__dirname, 'allowedEmails.json'))).allowedEmails;

// Endpoint do logowania
app.post('/login', (req, res) => {
    const { email } = req.body;

    if (allowedEmails.includes(email)) {
        // Jeżeli email jest na liście dozwolonych, zwrócimy status 200
        res.json({ success: true });
    } else {
        // Jeżeli email nie jest dozwolony, zwrócimy błąd
        res.status(400).json({ success: false, message: 'Invalid email' });
    }
});

// Endpoint do wylogowywania
app.get('/logout', (req, res) => {
    // Usuwamy sesję użytkownika (jeśli używasz sesji)
    res.json({ success: true });
});

// Strona logowania
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Strona główna (po zalogowaniu)
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
