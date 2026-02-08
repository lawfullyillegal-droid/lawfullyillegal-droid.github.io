// Text Encoder/Decoder Functions
function encodeBase64() {
    const input = document.getElementById('textInput').value;
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('textOutput').value = encoded;
    } catch (e) {
        alert('Error encoding text: ' + e.message);
    }
}

function decodeBase64() {
    const input = document.getElementById('textInput').value;
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('textOutput').value = decoded;
    } catch (e) {
        alert('Error decoding text: Invalid Base64 string');
    }
}

function encodeURL() {
    const input = document.getElementById('textInput').value;
    const encoded = encodeURIComponent(input);
    document.getElementById('textOutput').value = encoded;
}

function decodeURL() {
    const input = document.getElementById('textInput').value;
    try {
        const decoded = decodeURIComponent(input);
        document.getElementById('textOutput').value = decoded;
    } catch (e) {
        alert('Error decoding URL: Invalid URL-encoded string');
    }
}

// JSON Formatter Functions
function formatJSON() {
    const input = document.getElementById('jsonInput').value;
    const statusDiv = document.getElementById('jsonStatus');
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        document.getElementById('jsonOutput').value = formatted;
        showStatus('Valid JSON formatted successfully!', 'success');
    } catch (e) {
        showStatus('Invalid JSON: ' + e.message, 'error');
    }
}

function minifyJSON() {
    const input = document.getElementById('jsonInput').value;
    const statusDiv = document.getElementById('jsonStatus');
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        document.getElementById('jsonOutput').value = minified;
        showStatus('JSON minified successfully!', 'success');
    } catch (e) {
        showStatus('Invalid JSON: ' + e.message, 'error');
    }
}

function validateJSON() {
    const input = document.getElementById('jsonInput').value;
    
    try {
        JSON.parse(input);
        showStatus('✓ Valid JSON!', 'success');
    } catch (e) {
        showStatus('✗ Invalid JSON: ' + e.message, 'error');
    }
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('jsonStatus');
    statusDiv.textContent = message;
    statusDiv.className = 'status-message ' + type;
    
    setTimeout(() => {
        statusDiv.className = 'status-message';
    }, 5000);
}

// Color Picker Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function updateColorValues() {
    const colorPicker = document.getElementById('colorPicker');
    const hex = colorPicker.value;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    document.getElementById('colorDisplay').style.backgroundColor = hex;
    document.getElementById('hexValue').value = hex.toUpperCase();
    document.getElementById('rgbValue').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('hslValue').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function copyColorValue(elementId) {
    const input = document.getElementById(elementId);
    input.select();
    document.execCommand('copy');
    
    const button = input.nextElementSibling;
    const originalText = button.textContent;
    button.textContent = '✓';
    setTimeout(() => {
        button.textContent = originalText;
    }, 1000);
}

// Timestamp Converter Functions
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const timestamp = Math.floor(now.getTime() / 1000);
    
    document.getElementById('currentTime').textContent = timeString;
    document.getElementById('currentTimestamp').textContent = `Unix Timestamp: ${timestamp}`;
}

function convertTimestamp() {
    const timestamp = document.getElementById('timestampInput').value;
    
    if (!timestamp) {
        alert('Please enter a timestamp');
        return;
    }
    
    const date = new Date(parseInt(timestamp) * 1000);
    const formatted = date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
    
    document.getElementById('timestampResult').textContent = formatted;
}

function convertToTimestamp() {
    const dateInput = document.getElementById('dateInput').value;
    
    if (!dateInput) {
        alert('Please select a date and time');
        return;
    }
    
    const date = new Date(dateInput);
    const timestamp = Math.floor(date.getTime() / 1000);
    
    document.getElementById('dateResult').textContent = `Unix Timestamp: ${timestamp}`;
}

// Password Generator Functions
function updateLength() {
    const length = document.getElementById('passwordLength').value;
    document.getElementById('lengthValue').textContent = length;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Please select at least one character type');
        return;
    }
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    document.getElementById('generatedPassword').value = password;
}

// Copy to Clipboard Function
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    
    // Visual feedback
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = '#d4edda';
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
    }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize color picker
    updateColorValues();
    document.getElementById('colorPicker').addEventListener('input', updateColorValues);
    
    // Start updating current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Set default datetime-local value to now
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('dateInput').value = now.toISOString().slice(0, 16);
});
