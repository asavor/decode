interface user {
  projectName: string;
  projectUrl: string[];
  imageUrl: string;
  description: string;
  category: string[];
}

const OpenSourceTools = [
  {
    projectName: "TrackMe",
    projectUrl: ["https://tls.peet.ws/"],
    imageUrl: "/website/trackme.png",
    description: "",
    category: ["tls"],
  },
  {
    projectName: "ReverseJS",
    projectUrl: ["https://steakenthusiast.github.io/"],
    imageUrl: "/website/reversejs.png",
    description: "",
    category: ["ast"],
  },
  {
    projectName: "Devirtualizing Nike.com's Bot Protection",
    projectUrl: [
      "https://www.nullpt.rs/devirtualizing-nike-vm-1",
      "https://www.nullpt.rs/devirtualizing-nike-vm-2",
    ],
    imageUrl: "/website/DevirtualizingNike.com'sBotProtection.png",
    description: "",
    category: ["vm", "ast"],
  },
  {
    projectName: "Deobfuscating Imperva's utmvc Anti-Bot Script",
    projectUrl: [
      "https://yoghurtbot.github.io/2023/03/04/Deobfuscating-Incapsula-s-UTMVC-Anti-Bot/",
      "https://yoghurtbot.github.io/2023/03/04/Deobfuscating-Incapsula-s-UTMVC-Anti-Bot-Part-2/",
    ],
    imageUrl: "/website/DeobfuscatingImpervasutmvcAntiBotScript.png",
    description: "",
    category: ["antibot", "incapsula", "ast"],
  },
];

export { OpenSourceTools };
