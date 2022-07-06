import { spawn } from "child_process";
import * as readline from "readline";

interface UserAccount {
    Caption: string
    Description: string,
    LocalAccount: boolean,
    SID:string,
    PasswordRequired:boolean,
    Disabled:boolean,
};

const getUserAccount = async (): Promise<UserAccount[]> => {
  return new Promise((resolve, reject) => {
    let stderr: string[] = [];
    let res: UserAccount[] = [];
    let inconsistent_res : string[] = [];
    let captions: string[] = [];
    let desc: string[] = [];
    let isLocal: boolean[] = [];
    let sid:string[] = [];
    let hasPass:boolean[] = [];
    let id:string[] = [];
    let isDisabled:boolean[] = [];
    const max_char_before : number = 19;
    const child = spawn("powershell.exe", [
      "gcim Win32_UserAccount | select Caption , Description , LocalAccount , SID , PasswordRequired , Disabled , InstallDate | format-list *",
    ]);
    child.stderr.on("data", (data:string) => stderr.push(data));
    child.stdin.end();
    child.on("exit", async (code:number|null) => {
      const reader: any = readline.createInterface({
        input: child.stdout,
      });
      //max chars before value = 10 , Caption
      let line:string;
      for await (line of reader) {
        if (line !== "") {
          if (line.startsWith("Caption")) {
            captions.push(line.substring(max_char_before));
          } else if (line.startsWith("Description")) {
            desc.push(line.substring(max_char_before));
          } else if (line.startsWith("InstallDate")) {
            id.push(line.substring(max_char_before));
          } else if (line.startsWith("LocalAccount")) {
            line = line.substring(max_char_before);
            let bVal : boolean = (line.toLowerCase() === 'true');
            isLocal.push(bVal);
          } else if (line.startsWith("SID")) {
            sid.push(line.substring(max_char_before));
          } else if (line.startsWith("PasswordRequired")) {
            line = line.substring(max_char_before);
            let bVal : boolean = (line.toLowerCase() === 'true');
            hasPass.push(bVal);
          } else if (line.startsWith("Disabled")) {
            line = line.substring(max_char_before);
            let bVal : boolean = (line.toLowerCase() === 'true');
            isDisabled.push(bVal);
          }
          inconsistent_res.push(line);
        }
      }

      for (let i = 0; i < captions.length; i++) {
        let command: UserAccount = {
            Caption: captions[i],
            Description:desc[i],
            LocalAccount:isLocal[i],
            SID:sid[i],
            PasswordRequired:hasPass[i],
            Disabled:isDisabled[i],
        };

        res.push(command);
      }

      if (typeof code === "number" && code === 0) {
          return resolve(res);
      } else {
        return reject(stderr);
      }
    });
  });
};


export { getUserAccount };
