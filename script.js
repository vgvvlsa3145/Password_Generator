// DOM Elements
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

// Update length value on input
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

// Generate button
generateButton.addEventListener("click", makePassword);

// On page load
window.addEventListener("DOMContentLoaded", makePassword);

// Main password generation
function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    alert("Please select at least one character type.");
    return;
  }

  const newPassword = createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
}

// Strength meter update
function updateStrengthMeter(password) {
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?/]/.test(password);

  let score = Math.min(length * 2, 40);
  if (hasUppercase) score += 15;
  if (hasLowercase) score += 15;
  if (hasNumbers) score += 15;
  if (hasSymbols) score += 15;

  if (length < 8) {
    score = Math.min(score, 40);
  }

  const safeScore = Math.max(5, Math.min(score, 100));
  strengthBar.style.width = `${safeScore}%`;

  let label = "";
  let color = "";

  if (score < 40) {
    label = "Weak";
    color = "#fc8181";
  } else if (score < 70) {
    label = "Medium";
    color = "#fbd38d";
  } else {
    label = "Strong";
    color = "#68d391";
  }

  strengthLabel.textContent = label;
  strengthBar.style.backgroundColor = color;
}

// Generate random password
function createRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
  let characters = "";
  if (includeUppercase) characters += uppercaseLetters;
  if (includeLowercase) characters += lowercaseLetters;
  if (includeNumbers) characters += numberCharacters;
  if (includeSymbols) characters += symbolCharacters;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

// Copy to clipboard
copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch((error) => console.log("Copy failed:", error));
});

// Copy animation
function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#48bb78";

  // Subtle bounce animation
  copyButton.style.transform = "scale(1.3)";
  copyButton.style.transition = "transform 0.3s ease";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
    copyButton.style.transform = "scale(1)";
  }, 1500);
}
