import { spawn } from "child_process";
import * as readline from "readline";

interface WindowsInfo {
  Caption: string;
  Version: string;
  BuildNumber: string;
  SerialNumber: string;
  RegisteredUser: string;
  InstallDate: string;
  OSArchitecture: string;
  CSName: string;
  LastBootOn: string;
}

const getWindowsInfo = async (): Promise<WindowsInfo> => {
  return new Promise((resolve, reject) => {
    let stderr: string[] = [];
    let res: string[] = [];
    let result: WindowsInfo = {
      Caption: "",
      Version: "",
      BuildNumber: "",
      SerialNumber: "",
      RegisteredUser: "",
      InstallDate: "",
      OSArchitecture: "",
      CSName: "",
      LastBootOn: ""
    };
    let max_char_before:number = 17;
    const child = spawn("powershell.exe", [
      "gcim win32_OperatingSystem | select Caption , Version , BuildNumber , SerialNumber , RegisteredUser , InstallDate , OSArchitecture , CSName , LastBootUpTime",
    ]);
    child.stderr.on("data", (data:string) => stderr.push(data));
    child.stdin.end(); 
    child.on("exit", async (code:number | null) => {
      const reader: any = readline.createInterface({
        input: child.stdout,
      });
      //max chars before actual value = 17
      for await (let line of reader){
        if (line !== "") {
          res.push(line.substring(max_char_before));
          // See order above
          if (line.startsWith("Caption")) {
            result.Caption = line.substring(max_char_before);
          } else if (line.startsWith("Version")) {
            result.Version = line.substring(max_char_before);
          } else if (line.startsWith("BuildNumber")) {
            result.BuildNumber = line.substring(max_char_before);
          } else if (line.startsWith("SerialNumber")) {
            result.SerialNumber = line.substring(max_char_before);
          } else if (line.startsWith("RegisteredUser")) {
            result.RegisteredUser = line.substring(max_char_before);
          } else if (line.startsWith("InstallDate")) {
            result.InstallDate = line.substring(max_char_before);
          } else if (line.startsWith("OSArchitecture")) {
            result.OSArchitecture = line.substring(max_char_before);
          } else if (line.startsWith("CSName")) {
            result.CSName = line.substring(max_char_before);
          } else if (line.startsWith("LastBootUpTime")) {
            result.LastBootOn = line.substring(max_char_before);
          }
        }
      }

      if (typeof code ==="number" && code === 0) {
        return resolve(result);
      } else {
        return reject(stderr);
      }
    });
  });
};

export { getWindowsInfo };
