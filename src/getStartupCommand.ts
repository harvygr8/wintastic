import { spawn } from "child_process";
import * as readline from "readline";

interface StartupCommand {
  command: string,
  user: string,
  caption: string
};

const getStartupCommand = async (): Promise<StartupCommand[] | string[]> => {
  return new Promise((resolve, reject) => {
    let stderr: string[] = [];
    let res: StartupCommand[] = [];
    let inconsistent_res : string[] = [];
    let captions: string[] = [];
    let cmds: string[] = [];
    let user: string[] = [];
    const max_char_before : number = 10;
    const child = spawn("powershell.exe", [
      "gcim Win32_StartupCommand | select Caption , Command , User | format-list *",
    ]);
    child.stderr.on("data", (data:string) => stderr.push(data));
    child.stdin.end();
    child.on("exit", async (code:number|null) => {
      const reader: any = readline.createInterface({
        input: child.stdout,
      });
      //max chars before value = 10 , Caption
      for await (let line of reader) {
        if (line !== "") {
          if (line.startsWith("Caption")) {
            captions.push(line.substring(max_char_before));
          } else if (line.startsWith("Command")) {
            cmds.push(line.substring(max_char_before));
          } else if (line.startsWith("User")) {
            user.push(line.substring(max_char_before));
          }
          inconsistent_res.push(line);
        }
      }

      for (let i = 0; i < captions.length; i++) {
        let command: StartupCommand = {
          caption: captions[i],
          command: cmds[i],
          user: user[i],
        };

        res.push(command);
      }

      if (typeof code === "number" && code === 0) {
        if(captions.length === cmds.length && captions.length === user.length){
            return resolve(res);
        }
        else{
            return resolve(inconsistent_res);
        }
      } else {
        return reject(stderr);
      }
    });
  });
};

export { getStartupCommand };
