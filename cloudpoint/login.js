// Funkcja logowania
function login() {
    const email = document.getElementById("emailInput").value;
    fetch("allowedEmails.json")
        .then(response => response.json())
        .then(data => {
            if (data.allowedEmails.includes(email)) {
                sessionStorage.setItem("loggedInUser", email);
                window.location.href = "index.html"; // Przekierowanie po zalogowaniu
            } else {
                document.getElementById("errorMessage").style.display = "block"; // Pokazuje komunikat o błędzie
            }
        })
        .catch(error => console.error("Błąd wczytywania pliku JSON", error));
}

// Funkcja wylogowania
function logout() {
    sessionStorage.removeItem("loggedInUser"); // Usuwa dane o użytkowniku z sessionStorage
    window.location.href = "login.html"; // Przekierowanie do strony logowania
}

// Funkcja sprawdzająca, czy użytkownik jest zalogowany
function checkLoginStatus() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        // Jeśli użytkownik jest zalogowany, możesz zmienić widok na jego imię lub coś innego
        document.getElementById("welcomeMessage").innerText = `Witaj, ${loggedInUser}!`;
    } else {
        // Jeśli użytkownik nie jest zalogowany, przekierowanie do strony logowania
        window.location.href = "login.html";
    }
}
