import { exec } from 'child_process';
import fs from 'fs';
import os from 'os';

const filePath = 'activityMonitor.log';
const command =
  os.platform() === 'win32'
    ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
    : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

const logCPUInfo = () => {
  console.clear();
  exec(command, (error, stdout) => {
    console.info('CPU usage:', stdout);
    if (error !== null) console.log(`Error when logCPUInfo: ${error}`);
  });
};

const writeCPUInfo = () => {
  exec(command, (error, stdout) => {
    const timeStmp = Math.floor(new Date().getTime() / 1000);
    fs.appendFile(filePath, `${timeStmp} : ${stdout}`, (err) => {
      if (err) throw err;
    });

    if (error !== null) console.log(`Error when writeCPUinfo: ${error}`);
  });
};

setInterval(logCPUInfo, 100);
setInterval(writeCPUInfo, 1000 * 60);
