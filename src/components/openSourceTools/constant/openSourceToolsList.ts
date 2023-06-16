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
    category: ["antibot", "incapsula", "ast", "control-flow"],
  },
  {
    projectName: "Reverse Engineering Tiktok's VM Obfuscation",
    projectUrl: ["https://www.nullpt.rs/reverse-engineering-tiktok-vm-1"],
    imageUrl: "/website/ReverseEngineeringTiktokVMObfuscation.png",
    description: "",
    category: ["vm", "tiktok", "ast"],
  },

  {
    projectName:
      "How do websites identify bots? Akamai Bot Manager 2.0 deobfuscation",
    projectUrl: ["https://habr.com/ru/articles/720588/"],
    imageUrl:
      "/website/Как сайтыопределяютботов_ ДеобфускацияAkamaiBotManager2.0 _ Хабр.png",
    description: "",
    category: ["akamai", "ast", "antibot"],
  },
  {
    projectName: "Taking a look at the first part of the Incapsula antibot",
    projectUrl: [
      "https://nerodesu017.github.io/antibots/programming/2021/05/07/antibots-part-3.html",
      "https://nerodesu017.github.io/antibots/programming/2021/05/07/antibots-part-4.html",
      "https://nerodesu017.github.io/antibots/programming/2021/05/08/antibots-part-5.html",
      "https://nerodesu017.github.io/antibots/programming/2021/05/09/antibots-part-6.html",
      "https://nerodesu017.github.io/antibots/programming/2021/05/11/antibots-part-7.html",
    ],
    imageUrl:
      "/website/TakingalookatthefirstpartoftheIncapsulaantibot _ Nero’s Blog.png",
    description: "",
    category: ["antibot", "incapsula", "ast", "control-flow"],
  },
];

export { OpenSourceTools };
