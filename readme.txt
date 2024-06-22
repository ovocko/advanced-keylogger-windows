Running the Keylogger

    Open a terminal in that directory.

    Run the Node.js script:

    node keylogger.js

This setup avoids using ffi-napi and directly uses PowerShell to capture key events, then processes and logs them using Node.js.

