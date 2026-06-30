"use client";

export interface CampaignStage {
  title: string;
  description: string;
  log: string;
  status: "evaded" | "blocked" | "alerted";
  severity: "low" | "medium" | "high" | "critical";
}

export interface StoredCampaign {
  id: string;
  timestamp: string;
  threatActor: string;
  industry: string;
  attackType: string;
  riskScore: number;
  status: "Blocked" | "Successful";
  securityLevel: string;
  primaryTarget: string;
  stages: CampaignStage[];
}

export interface SaveCampaignInput {
  id?: string;
  timestamp?: string;
  threatActor: string;
  industry: string;
  attackType: string;
  riskFactor?: number;
  securityLevel?: string;
  primaryTarget?: string;
  stages?: CampaignStage[];
}

// Helpers to resolve names from IDs
export const getActorName = (id: string, includeTechnical: boolean = false): string => {
  const map: Record<string, string> = {
    APT29: "Data Spy",
    Lazarus: "Financial Criminal",
    LockBit: "Ransomware Operator",
    Anonymous: "Hacktivist",
    FIN7: "Insider Threat",
  };
  const emojiMap: Record<string, string> = {
    APT29: "🎭",
    Lazarus: "💰",
    LockBit: "🔒",
    Anonymous: "📢",
    FIN7: "🕵",
  };
  const techMap: Record<string, string> = {
    APT29: "APT29",
    Lazarus: "Lazarus Group",
    LockBit: "LockBit 3.0",
    Anonymous: "Anonymous",
    FIN7: "FIN7",
  };
  const emoji = emojiMap[id] || "";
  const name = map[id] || id;
  const tech = techMap[id] || "";
  
  if (includeTechnical && tech) {
    return `${emoji} ${name} (${tech})`;
  }
  return emoji ? `${emoji} ${name}` : name;
};

export const getAttackName = (id: string, includeTechnical: boolean = false): string => {
  const map: Record<string, string> = {
    Phishing: "Fake Email Scam",
    Ransomware: "File Encryption Attack",
    DDoS: "Traffic Overload Attack",
    "Supply Chain": "Malicious Software Installation",
    "SQL Injection": "Database Attack",
  };
  const emojiMap: Record<string, string> = {
    Phishing: "📧",
    Ransomware: "🔒",
    DDoS: "🌐",
    "Supply Chain": "🧩",
    "SQL Injection": "💉",
  };
  const techMap: Record<string, string> = {
    Phishing: "MITRE T1566.002",
    Ransomware: "MITRE T1486",
    DDoS: "MITRE T1498",
    "Supply Chain": "MITRE T1195.002",
    "SQL Injection": "MITRE T1190",
  };
  const emoji = emojiMap[id] || "";
  const name = map[id] || id;
  const tech = techMap[id] || "";
  
  if (includeTechnical && tech) {
    return `${emoji} ${name} (${tech})`;
  }
  return emoji ? `${emoji} ${name}` : name;
};

export const getFriendlySimulationName = (attackType: string): string => {
  const map: Record<string, string> = {
    Phishing: "Fake Email Scam Simulation",
    Ransomware: "File Encryption Attack Simulation",
    DDoS: "Traffic Overload Attack Simulation",
    "Supply Chain": "Malicious Software Installation Simulation",
    "SQL Injection": "Database Attack Simulation",
  };
  return map[attackType] || `${attackType} Simulation`;
};

export const getIndustryName = (id: string): string => {
  const map: Record<string, string> = {
    Healthcare: "🏥 Hospital System",
    Banking: "🏦 Online Banking Platform",
    Government: "🏛 Government Portal",
    University: "🎓 University Network",
    Startup: "🚀 Startup Infrastructure",
  };
  return map[id] || id;
};

export const getSecurityLevelName = (level: string): string => {
  const map: Record<string, string> = {
    Low: "Basic Protection",
    Medium: "Standard Protection",
    High: "Advanced Protection",
    Enterprise: "Enterprise Security",
  };
  const emojiMap: Record<string, string> = {
    Low: "🟥",
    Medium: "🟨",
    High: "🟩",
    Enterprise: "💎",
  };
  const emoji = emojiMap[level] || "";
  const name = map[level] || level;
  return emoji ? `${emoji} ${name}` : name;
};

// Seed initial history if empty
const getMockCampaigns = (): StoredCampaign[] => {
  const now = new Date();

  const createPastDate = (hoursAgo: number) => {
    const d = new Date(now);
    d.setHours(d.getHours() - hoursAgo);
    return d.toISOString();
  };

  const rawMocks: StoredCampaign[] = [
    {
      id: "SIM-8492",
      timestamp: createPastDate(2),
      threatActor: "Lazarus",
      industry: "Banking",
      attackType: "SQL Injection",
      riskScore: 15,
      status: "Blocked",
      securityLevel: "High",
      primaryTarget: "Swift-Transfer-Core",
      stages: [
        {
          title: "Reconnaissance & Port Scan",
          description: "Attacker Lazarus Group initiated active reconnaissance scans mapping the target subnets for Banking.",
          log: "[RECON] Mapping subnets on segment 10.0.4.x. Found open ports: 443, 8080. EDR status: BLOCKED",
          status: "blocked",
          severity: "low",
        },
        {
          title: "Initial Access Foothold",
          description: "Foothold vector established using Blind SQL Injection to bypass gateway filtering.",
          log: "[INGRESS] Exploit payload dispatched. Channel established with target client. EDR status: BLOCKED",
          status: "blocked",
          severity: "medium",
        },
        {
          title: "Credential Swipe",
          description: "Searching local memory dumps and active directory tables for active session tokens and admin keys.",
          log: "[CREDENTIALS] LSASS memory dump initiated / credential extraction requested. EDR status: EVADED",
          status: "evaded",
          severity: "medium",
        },
        {
          title: "Lateral Subnet Propagation",
          description: "Pivoting from compromised host endpoints to jump servers. Internal target segment reached: Swift-Transfer-Core.",
          log: "[LATERAL] Remote session hijacked to cross network subnets. Target node reached: Swift-Transfer-Core. EDR status: BLOCKED",
          status: "blocked",
          severity: "high",
        },
        {
          title: "Privilege Domain Escalation",
          description: "Attempting admin privilege elevation via token impersonation on Active Directory controller nodes.",
          log: "[ESCALATION] Token impersonation executed. Root credentials retrieved. EDR status: BLOCKED",
          status: "blocked",
          severity: "high",
        },
        {
          title: "Data Exfiltration & Impact",
          description: "Executing final payload actions on database target Swift-Transfer-Core. Archiving core customer tables.",
          log: "[EXFILTRATION] Compressing database files. Transmitting out of band over port 443. EDR status: BLOCKED",
          status: "blocked",
          severity: "critical",
        },
      ],
    },
    {
      id: "SIM-7301",
      timestamp: createPastDate(6),
      threatActor: "LockBit",
      industry: "Healthcare",
      attackType: "Ransomware",
      riskScore: 85,
      status: "Successful",
      securityLevel: "Low",
      primaryTarget: "EMR-Patient-DB",
      stages: [
        {
          title: "Reconnaissance & Port Scan",
          description: "Attacker LockBit 3.0 initiated active reconnaissance scans mapping the target subnets for Healthcare.",
          log: "[RECON] Mapping subnets on segment 10.0.4.x. Found open ports: 443, 8080. EDR status: EVADED",
          status: "evaded",
          severity: "low",
        },
        {
          title: "Initial Access Foothold",
          description: "Foothold vector established using Data Encrypted to bypass gateway filtering.",
          log: "[INGRESS] Exploit payload dispatched. Channel established with target client. EDR status: EVADED",
          status: "evaded",
          severity: "medium",
        },
        {
          title: "Credential Swipe",
          description: "Searching local memory dumps and active directory tables for active session tokens and admin keys.",
          log: "[CREDENTIALS] LSASS memory dump initiated / credential extraction requested. EDR status: EVADED",
          status: "evaded",
          severity: "medium",
        },
        {
          title: "Lateral Subnet Propagation",
          description: "Pivoting from compromised host endpoints to jump servers. Internal target segment reached: EMR-Patient-DB.",
          log: "[LATERAL] Remote session hijacked to cross network subnets. Target node reached: EMR-Patient-DB. EDR status: EVADED",
          status: "evaded",
          severity: "high",
        },
        {
          title: "Privilege Domain Escalation",
          description: "Attempting admin privilege elevation via token impersonation on Active Directory controller nodes.",
          log: "[ESCALATION] Token impersonation executed. Root credentials retrieved. EDR status: EVADED",
          status: "evaded",
          severity: "high",
        },
        {
          title: "Data Exfiltration & Impact",
          description: "Executing final payload actions on database target EMR-Patient-DB. Archiving core customer tables.",
          log: "[EXFILTRATION] Compressing database files. Transmitting out of band over port 443. EDR status: EVADED",
          status: "evaded",
          severity: "critical",
        },
      ],
    },
    {
      id: "SIM-5291",
      timestamp: createPastDate(20),
      threatActor: "APT29",
      industry: "Government",
      attackType: "Phishing",
      riskScore: 30,
      status: "Blocked",
      securityLevel: "High",
      primaryTarget: "Fed-Registry-SRV",
      stages: [
        {
          title: "Reconnaissance & Port Scan",
          description: "Attacker APT29 initiated active reconnaissance scans mapping the target subnets for Government.",
          log: "[RECON] Mapping subnets on segment 10.0.4.x. Found open ports: 443, 8080. EDR status: BLOCKED",
          status: "blocked",
          severity: "low",
        },
        {
          title: "Initial Access Foothold",
          description: "Foothold vector established using Phishing to bypass gateway filtering.",
          log: "[INGRESS] Exploit payload dispatched. Channel established with target client. EDR status: BLOCKED",
          status: "blocked",
          severity: "medium",
        },
        {
          title: "Credential Swipe",
          description: "Searching local memory dumps and active directory tables for active session tokens and admin keys.",
          log: "[CREDENTIALS] LSASS memory dump initiated / credential extraction requested. EDR status: EVADED",
          status: "evaded",
          severity: "medium",
        },
        {
          title: "Lateral Subnet Propagation",
          description: "Pivoting from compromised host endpoints to jump servers. Internal target segment reached: Fed-Registry-SRV.",
          log: "[LATERAL] Remote session hijacked to cross network subnets. Target node reached: Fed-Registry-SRV. EDR status: BLOCKED",
          status: "blocked",
          severity: "high",
        },
        {
          title: "Privilege Domain Escalation",
          description: "Attempting admin privilege elevation via token impersonation on Active Directory controller nodes.",
          log: "[ESCALATION] Token impersonation executed. Root credentials retrieved. EDR status: BLOCKED",
          status: "blocked",
          severity: "high",
        },
        {
          title: "Data Exfiltration & Impact",
          description: "Executing final payload actions on database target Fed-Registry-SRV. Archiving core customer tables.",
          log: "[EXFILTRATION] Compressing database files. Transmitting out of band over port 443. EDR status: BLOCKED",
          status: "blocked",
          severity: "critical",
        },
      ],
    },
    {
      id: "SIM-4220",
      timestamp: createPastDate(30),
      threatActor: "Anonymous",
      industry: "University",
      attackType: "DDoS",
      riskScore: 55,
      status: "Successful",
      securityLevel: "Medium",
      primaryTarget: "Research-NAS-Share",
      stages: [
        {
          title: "Reconnaissance & Port Scan",
          description: "Attacker Anonymous initiated active reconnaissance scans mapping the target subnets for University.",
          log: "[RECON] Mapping subnets on segment 10.0.4.x. Found open ports: 443, 8080. EDR status: BLOCKED",
          status: "blocked",
          severity: "low",
        },
        {
          title: "Initial Access Foothold",
          description: "Foothold vector established using Volumetric Exhaustion to bypass gateway filtering.",
          log: "[INGRESS] Exploit payload dispatched. Channel established with target client. EDR status: EVADED",
          status: "evaded",
          severity: "medium",
        },
        {
          title: "Credential Swipe",
          description: "Searching local memory dumps and active directory tables for active session tokens and admin keys.",
          log: "[CREDENTIALS] LSASS memory dump initiated / credential extraction requested. EDR status: BLOCKED",
          status: "blocked",
          severity: "medium",
        },
        {
          title: "Lateral Subnet Propagation",
          description: "Pivoting from compromised host endpoints to jump servers. Internal target segment reached: Research-NAS-Share.",
          log: "[LATERAL] Remote session hijacked to cross network subnets. Target node reached: Research-NAS-Share. EDR status: EVADED",
          status: "evaded",
          severity: "high",
        },
        {
          title: "Privilege Domain Escalation",
          description: "Attempting admin privilege elevation via token impersonation on Active Directory controller nodes.",
          log: "[ESCALATION] Token impersonation executed. Root credentials retrieved. EDR status: EVADED",
          status: "evaded",
          severity: "high",
        },
        {
          title: "Data Exfiltration & Impact",
          description: "Executing final payload actions on database target Research-NAS-Share. Archiving core customer tables.",
          log: "[EXFILTRATION] Compressing database files. Transmitting out of band over port 443. EDR status: EVADED",
          status: "evaded",
          severity: "critical",
        },
      ],
    },
    {
      id: "SIM-3105",
      timestamp: createPastDate(48),
      threatActor: "FIN7",
      industry: "Startup",
      attackType: "Phishing",
      riskScore: 12,
      status: "Blocked",
      securityLevel: "Enterprise",
      primaryTarget: "Kube-Master-Prod",
      stages: [
        {
          title: "Reconnaissance & Port Scan",
          description: "Attacker FIN7 initiated active reconnaissance scans mapping the target subnets for Startup.",
          log: "[RECON] Mapping subnets on segment 10.0.4.x. Found open ports: 443, 8080. EDR status: BLOCKED",
          status: "blocked",
          severity: "low",
        },
        {
          title: "Initial Access Foothold",
          description: "Foothold vector established using Spearphishing Link to bypass gateway filtering.",
          log: "[INGRESS] Exploit payload dispatched. Channel established with target client. EDR status: BLOCKED",
          status: "blocked",
          severity: "medium",
        },
        {
          title: "Credential Swipe",
          description: "Searching local memory dumps and active directory tables for active session tokens and admin keys.",
          log: "[CREDENTIALS] LSASS memory dump initiated / credential extraction requested. EDR status: BLOCKED",
          status: "blocked",
          severity: "medium",
        },
        {
          title: "Lateral Subnet Propagation",
          description: "Pivoting from compromised host endpoints to jump servers. Internal target segment reached: Kube-Master-Prod.",
          log: "[LATERAL] Remote session hijacked to cross network subnets. Target node reached: Kube-Master-Prod. EDR status: BLOCKED",
          status: "blocked",
          severity: "high",
        },
        {
          title: "Privilege Domain Escalation",
          description: "Attempting admin privilege elevation via token impersonation on Active Directory controller nodes.",
          log: "[ESCALATION] Token impersonation executed. Root credentials retrieved. EDR status: BLOCKED",
          status: "blocked",
          severity: "high",
        },
        {
          title: "Data Exfiltration & Impact",
          description: "Executing final payload actions on database target Kube-Master-Prod. Archiving core customer tables.",
          log: "[EXFILTRATION] Compressing database files. Transmitting out of band over port 443. EDR status: BLOCKED",
          status: "blocked",
          severity: "critical",
        },
      ],
    },
    {
      id: "SIM-2101",
      timestamp: createPastDate(72),
      threatActor: "Lazarus",
      industry: "Banking",
      attackType: "Supply Chain",
      riskScore: 55,
      status: "Successful",
      securityLevel: "Medium",
      primaryTarget: "Swift-Transfer-Core",
      stages: [
        {
          title: "Reconnaissance & Port Scan",
          description: "Attacker Lazarus Group initiated active reconnaissance scans mapping the target subnets for Banking.",
          log: "[RECON] Mapping subnets on segment 10.0.4.x. Found open ports: 443, 8080. EDR status: BLOCKED",
          status: "blocked",
          severity: "low",
        },
        {
          title: "Initial Access Foothold",
          description: "Foothold vector established using Supply Chain (T1195.002) to bypass gateway filtering.",
          log: "[INGRESS] Exploit payload dispatched. Channel established with target client. EDR status: BLOCKED",
          status: "blocked",
          severity: "medium",
        },
        {
          title: "Credential Swipe",
          description: "Searching local memory dumps and active directory tables for active session tokens and admin keys.",
          log: "[CREDENTIALS] LSASS memory dump initiated / credential extraction requested. EDR status: EVADED",
          status: "evaded",
          severity: "medium",
        },
        {
          title: "Lateral Subnet Propagation",
          description: "Pivoting from compromised host endpoints to jump servers. Internal target segment reached: Swift-Transfer-Core.",
          log: "[LATERAL] Remote session hijacked to cross network subnets. Target node reached: Swift-Transfer-Core. EDR status: BLOCKED",
          status: "blocked",
          severity: "high",
        },
        {
          title: "Privilege Domain Escalation",
          description: "Attempting admin privilege elevation via token impersonation on Active Directory controller nodes.",
          log: "[ESCALATION] Token impersonation executed. Root credentials retrieved. EDR status: EVADED",
          status: "evaded",
          severity: "high",
        },
        {
          title: "Data Exfiltration & Impact",
          description: "Executing final payload actions on database target Swift-Transfer-Core. Archiving core customer tables.",
          log: "[EXFILTRATION] Compressing database files. Transmitting out of band over port 443. EDR status: EVADED",
          status: "evaded",
          severity: "critical",
        },
      ],
    },
  ];

  return rawMocks.map(c => ({
    ...c,
    stages: c.stages.map((stage, idx) => {
      const mappedStage = { ...stage };
      const statusText = stage.status.toUpperCase();
      if (idx === 0) {
        mappedStage.title = "Looking for Weak Points (Reconnaissance)";
        mappedStage.description = `Attacker scanned the network to find active computers and open ports.`;
        mappedStage.log = `[RECON] Scan complete. Found open ports: 443, 8080. Status: ${statusText}`;
      } else if (idx === 1) {
        mappedStage.title = "Trying to Get In (Initial Access)";
        mappedStage.description = `Attacker established a foothold in the network, bypassing outer defenses.`;
        mappedStage.log = `[INGRESS] Entry payload executed. Connection established with target device. Status: ${statusText}`;
      } else if (idx === 2) {
        mappedStage.title = "Trying to Steal Passwords (Credential Access)";
        mappedStage.description = `Attacker searched computer memory and tables to find login passwords and session tokens.`;
        mappedStage.log = `[CREDENTIALS] Stole administrative credentials and login keys from memory. Status: ${statusText}`;
      } else if (idx === 3) {
        mappedStage.title = "Moving Through the Network (Lateral Movement)";
        mappedStage.description = `Attacker moved from the first compromised computer to a server deeper in the network.`;
        mappedStage.log = `[LATERAL] Moved to server node segment containing ${c.primaryTarget}. Status: ${statusText}`;
      } else if (idx === 4) {
        mappedStage.title = "Taking Control (Privilege Escalation)";
        mappedStage.description = `Attacker elevated their access level to become a network administrator.`;
        mappedStage.log = `[ESCALATION] Root credentials retrieved. Gained administrator rights. Status: ${statusText}`;
      } else if (idx === 5) {
        mappedStage.title = "Attempting to Steal Data (Data Exfiltration)";
        mappedStage.description = `Attacker copied sensitive files out of the network and started encrypting systems.`;
        mappedStage.log = `[EXFILTRATION] Copied customer database tables and encrypted database files. Status: ${statusText}`;
      }
      return mappedStage;
    })
  }));
};

export const getCampaignHistory = (): StoredCampaign[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("sentinel_campaign_history");
  if (!stored) {
    const mocks = getMockCampaigns();
    localStorage.setItem("sentinel_campaign_history", JSON.stringify(mocks));
    return mocks;
  }
  try {
    return JSON.parse(stored);
  } catch {
    const mocks = getMockCampaigns();
    localStorage.setItem("sentinel_campaign_history", JSON.stringify(mocks));
    return mocks;
  }
};

export const saveCampaignToHistory = (campaign: SaveCampaignInput): StoredCampaign => {
  const history = getCampaignHistory();

  // Determine if this campaign is already saved (by timestamp or matching config details)
  const isAlreadySaved = history.some(
    (c) => c.timestamp === campaign.timestamp && c.industry === campaign.industry && c.threatActor === campaign.threatActor
  );

  if (isAlreadySaved) {
    return history.find(
      (c) => c.timestamp === campaign.timestamp && c.industry === campaign.industry && c.threatActor === campaign.threatActor
    )!;
  }

  // Derive Status: if last stage is "blocked", then overall is Blocked. Otherwise Successful.
  const finalStage = campaign.stages && campaign.stages.length > 0
    ? campaign.stages[campaign.stages.length - 1]
    : null;
  const status = finalStage && finalStage.status === "blocked" ? "Blocked" : "Successful";

  // Generate ID if missing
  const id = campaign.id || `SIM-${Math.floor(1000 + Math.random() * 9000)}`;

  const newRecord: StoredCampaign = {
    id,
    timestamp: campaign.timestamp || new Date().toISOString(),
    threatActor: campaign.threatActor,
    industry: campaign.industry,
    attackType: campaign.attackType,
    riskScore: campaign.riskFactor !== undefined ? campaign.riskFactor : 50,
    status,
    securityLevel: campaign.securityLevel || "Medium",
    primaryTarget: campaign.primaryTarget || "Unknown-Target",
    stages: campaign.stages || [],
  };

  const updated = [newRecord, ...history];
  localStorage.setItem("sentinel_campaign_history", JSON.stringify(updated));
  return newRecord;
};

// Local Fallback CTI Report Generator
export const generateCTIReport = (campaign: StoredCampaign) => {
  const actor = getActorName(campaign.threatActor);
  const vector = getAttackName(campaign.attackType);
  const industry = getIndustryName(campaign.industry);
  const target = campaign.primaryTarget;
  const isBlocked = campaign.status === "Blocked";

  // Executive Summary
  let execSummary = "";
  if (isBlocked) {
    execSummary = `A simulated attack emulating ${actor} was run against the ${industry} network target ${target}. The attacker attempted access via ${vector}. Under your current security strength (${campaign.securityLevel}), the platform's security rules successfully detected and stopped the attack. Defensive controls blocked the attacker from spreading through the network or copying files. Your target database remains safe, and defenses functioned as expected.`;
  } else {
    execSummary = `A security compromise was simulated representing a ${actor} attack against the ${industry} network. Using a ${vector} scenario, the attacker bypassed outer defenses, established a connection to the compromised device, and harvested active login credentials. The attacker then moved laterally across the network to access the target system ${target}, copying sensitive database tables and encrypting files. Local security rules failed to block these actions, highlighting a need for stronger security settings.`;
  }

  // Threat Actor Profile
  let actorProfile = "";
  if (campaign.threatActor === "APT29") {
    actorProfile = "APT29 (also known as CozyBear) is a state-sponsored advanced persistent threat group known for stealthy, long-term intelligence operations. They typically target government entities, foreign ministries, and critical research infrastructure. Their operational profile focuses heavily on defense evasion, utilizing spearphishing campaigns carrying weaponized attachments, API token hijacking, and custom backdoor loaders. APT29 prioritizes credential theft and lateral pivoting to establish persistent footholds while keeping log signatures minimal.";
  } else if (campaign.threatActor === "Lazarus") {
    actorProfile = "Lazarus Group is a state-sponsored cyber warfare actor famous for highly destructive attacks, financial cyber-heists, and cryptocurrency network infiltrations. Lazarus employs diverse, aggressive tactics, ranging from Blind SQL Injection on database services to weaponized supply chain dependencies. Their campaigns are characterized by rapid propagation, custom network evasion tunnels, and the deployment of wiper malware. Lazarus exhibits high operational flexibility and will pivot quickly to exfiltration or system ransom.";
  } else if (campaign.threatActor === "LockBit") {
    actorProfile = "LockBit 3.0 is one of the most prolific Ransomware-as-a-Service (RaaS) syndicate globally. Operating on a double-extortion model, they exfiltrate sensitive corporate databases before triggering local file encryption. LockBit targets commercial entities, municipal backbones, and healthcare infrastructures. They utilize automated network scanners, lateral service transfers, and memory dump scripts to steal administrative domain controller tokens. LockBit leverages aggressive double-extortion leak sites as leverage for payout.";
  } else if (campaign.threatActor === "FIN7") {
    actorProfile = "FIN7 is a highly organized, financially motivated cybercriminal syndicate specializing in targeting point-of-sale (POS) environments, corporate billing pipelines, and financial ledger services. FIN7 relies heavily on spearphishing campaigns with highly polished social engineering scripts. They deploy modular malware backdoors and memory scrapers to capture domain keys. FIN7 typically monitors compromised networks for weeks to map financial systems before executing final asset theft.";
  } else {
    actorProfile = "Anonymous is a decentralized, global hacktivist collective specializing in public-facing service disruptions, volumetric packet floods, and public data leaks. Their operational focus is ideological rather than financial, targeting public corporate portals and Registrar student backends. They utilize open-source stressor tools to execute volumetric DDoS packet floods and exploit SQL flaws on vulnerable web applications to leak customer lists. Anonymous actions are designed to cause maximum reputational damage.";
  }

  // Business Impact Assessment
  let financialLoss = "";
  let operationalImpact = "";
  let downtime = "";

  if (campaign.industry === "Banking") {
    financialLoss = isBlocked ? "$45,000 (Incident Response & Forensic Audit)" : "$6,800,000 (Direct ledger liabilities, SWIFT penalty fines, and compliance litigation)";
    operationalImpact = isBlocked ? "Negligible. Security Operations isolated target hosts within 15 minutes." : "Severe. SWIFT ledger operations suspended. Customer portals taken offline for 48 hours for data sanitization.";
    downtime = isBlocked ? "0 Hours" : "48 Hours";
  } else if (campaign.industry === "Healthcare") {
    financialLoss = isBlocked ? "$35,000 (SIEM log analysis and EDR updates)" : "$4,200,000 (HIPAA regulatory fines, medical class-action lawsuits, and forensic remediation)";
    operationalImpact = isBlocked ? "None. Patient databases remained isolated behind active EDR rules." : "Critical. Electronic Medical Record (EMR) systems locked. Telemedicine and scheduling nodes offline, forcing manual triage protocols.";
    downtime = isBlocked ? "0 Hours" : "24 Hours";
  } else if (campaign.industry === "Government") {
    financialLoss = isBlocked ? "$20,000 (Threat intelligence feeds and patching)" : "$9,500,000 (National security audit, backup server rebuilds, and identity recovery funding)";
    operationalImpact = isBlocked ? "Negligible. Gateway firewall rules dropped all C2 exfiltration attempts." : "High. Secure federal registry directories compromised. Government agency backup storage arrays corrupted.";
    downtime = isBlocked ? "0 Hours" : "72 Hours";
  } else if (campaign.industry === "University") {
    financialLoss = isBlocked ? "$15,000 (Infrastructure scan and token reset)" : "$1,800,000 (FERPA privacy violations, research patent litigation, and system recovery)";
    operationalImpact = isBlocked ? "None. Network micro-segmentation blocked access to registrar NAS arrays." : "Moderate. Registrar portal taken offline. Research file shares encrypted, disrupting ongoing scientific projects.";
    downtime = isBlocked ? "0 Hours" : "36 Hours";
  } else { // Startup
    financialLoss = isBlocked ? "$12,000 (Cloud security configuration review)" : "$1,500,000 (Production API key exposure, customer churn liabilities, and Kubernetes rebuilding costs)";
    operationalImpact = isBlocked ? "Negligible. API rate-limiting successfully contained the intrusion source." : "Critical. Kubernetes master cluster compromised. Production API tokens exposed, requiring immediate revocation of all client keys.";
    downtime = isBlocked ? "0 Hours" : "18 Hours";
  }

  // Recommended Defenses
  const mitigations = [];
  if (campaign.attackType === "Phishing") {
    mitigations.push("Enforce hardware multi-factor authentication (MFA) like security keys to stop attackers from using stolen credentials.");
    mitigations.push("Use email filtering rules to detect and block malicious phishing links before they reach users.");
    mitigations.push("Enable endpoint protection rules to block credential harvesting tools from scanning system memory.");
  } else if (campaign.attackType === "Ransomware") {
    mitigations.push("Set up offline, immutable backups so data can be restored easily without paying a ransom.");
    mitigations.push("Disable default administrative folders (like Admin$ and C$) on endpoints to block spreading.");
    mitigations.push("Deploy active endpoint rules to detect and stop rapid file encryption attempts.");
  } else if (campaign.attackType === "DDoS") {
    mitigations.push("Use traffic scrubbing and web gateways to filter out large surges of malicious traffic.");
    mitigations.push("Configure rate limits on border firewalls to throttle excessive connection requests.");
    mitigations.push("Enable content delivery networks (CDNs) and caching to protect application servers under load.");
  } else if (campaign.attackType === "Supply Chain") {
    mitigations.push("Validate package integrity (using SHA-256 checks) before importing third-party libraries.");
    mitigations.push("Use software scan tools to identify known security vulnerabilities in external code dependencies.");
    mitigations.push("Configure firewall rules to block build servers from initiating unauthorized outbound connections.");
  } else { // SQL Injection
    mitigations.push("Use parameterized queries (prepared statements) in code to ensure input parameters cannot run database commands.");
    mitigations.push("Deploy a Web Application Firewall (WAF) to intercept database injection entries.");
    mitigations.push("Apply the principle of least privilege by removing write and file access permissions for the database user account.");
  }

  // Risk Reduction metrics
  const currentRisk = isBlocked ? campaign.riskScore : Math.max(70, campaign.riskScore);
  const projectedRisk = 5;
  const riskReduction = Math.max(0, currentRisk - projectedRisk);

  return {
    id: campaign.id,
    timestamp: campaign.timestamp,
    actorName: actor,
    actorId: campaign.threatActor,
    vectorName: vector,
    vectorId: campaign.attackType,
    industryName: industry,
    targetName: target,
    status: campaign.status,
    securityLevel: campaign.securityLevel,
    executiveSummary: execSummary,
    actorProfile,
    financialLoss,
    operationalImpact,
    downtime,
    mitigations,
    currentRisk,
    projectedRisk,
    riskReduction,
    stages: campaign.stages,
    mitreMapping: undefined as { stageIndex: number; code: string; name: string }[] | undefined // local has no overrides
  };
};
