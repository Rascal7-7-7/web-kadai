// ハッカーシミュレーター - 完全版
class HackerSimulator {
  constructor() {
    this.achievements = [];
    this.currentTool = null;
    this.systemStats = {
      cpu: 73,
      memory: 45,
      network: 89,
    };
    this.connections = [];
    this.alerts = [];
    this.currentLanguage = localStorage.getItem("preferredLanguage") || "ja";
    this.passwordHashes = {
      password123: "482c811da5d5b4bc6d497ffa98491e38",
      admin: "21232f297a57a5a743894a0e4a801fc3",
      123456: "e10adc3949ba59abbe56e057f20f883e",
      qwerty: "d8578edf8458ce06fbc5bb76a58c5ca4",
      letmein: "0d107d09f5bbe40cade3de5c71e9e9b7",
      monkey: "e8d95a51f3af4a3b134bf6bb680a213a",
      dragon: "8621ffdbc5698829397d97767ac13db3",
      baseball: "276f8db0b86edaa7fc805516c852c889",
      football: "37b4e2d82900d5e94b8da524fbeb33c0",
      welcome: "40be4e59b9a2a2b5dffb918c0e86b3d7",
      abc123: "e99a18c428cb38d5f260853678922e03",
      secret: "5ebe2294ecd0e0f08eab7690d2a6ee69",
      password: "5f4dcc3b5aa765d61d8327deb882cf99",
      f15dfvc3: "456789abcdef0123456789abcdef0123",
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupCursor();
    this.showWarningOverlay();
    this.startSystemMonitoring();
    this.initializeAchievements();
    this.updateTime();
    this.generateMatrixBackground();
    this.setupLanguageSwitching();
    this.applyCurrentLanguage();
    this.setupHelpPanel();
  }

  setupEventListeners() {
    // --- 1. ナビゲーションメニューのセクションスクロール ---
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          e.stopPropagation();

          const section = document.querySelector(href);
          if (section) {
            // スムーズスクロールの実装
            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });

            // メニューを閉じる
            const navMenu = document.getElementById("hacker-nav-menu");
            if (navMenu) {
              navMenu.classList.remove("open");
            }

            // URLハッシュを更新（オプション）
            if (history.pushState) {
              history.pushState(null, null, href);
            } else {
              location.hash = href;
            }
          }
        }
      });
    });

    // --- 2. ツールカードクリック時にツールインターフェースまで自動スクロール ---
    const toolCards = document.querySelectorAll(".tool-card");
    toolCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const tool = card.dataset.tool;
        if (tool) {
          this.openTool(tool);

          // ツールインターフェースまで自動スクロール
          setTimeout(() => {
            const toolInterface = document.getElementById("tool-interface");
            if (toolInterface) {
              toolInterface.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
            }
          }, 150); // 描画反映とアニメーション完了を待つ
        }
      });
    });

    // --- 3. 中クリック・右クリックを無効化（左クリックのみ許可） ---
    // mousedown イベントで中クリック・右クリックを防止
    document.addEventListener(
      "mousedown",
      (e) => {
        if (e.button === 1 || e.button === 2) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      true
    );

    // contextmenu イベントで右クリックメニューを防止
    document.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      },
      true
    );

    // mouseup イベントでも念のため防止
    document.addEventListener(
      "mouseup",
      (e) => {
        if (e.button === 1 || e.button === 2) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      true
    );

    // auxclick イベント（補助ボタンクリック）も防止
    document.addEventListener(
      "auxclick",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      },
      true
    );

    // --- 4. 言語切替ボタン確実動作・即時反映 ---
    // 言語切り替えは setupLanguageSwitching() で処理されるため、ここでは除去

    // 既存のイベント（警告解除・メニュー開閉・インターフェース操作等）は現状維持
    const proceedBtn = document.getElementById("proceed-btn");
    const warningOverlay = document.getElementById("warning-overlay");
    if (proceedBtn && warningOverlay) {
      proceedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        warningOverlay.classList.add("hidden");
        this.unlockAchievement(
          "first-access",
          "初回アクセス",
          "危険な世界への第一歩",
          "First Access",
          "First step into a dangerous world"
        );
      });
    }
    const menuToggle = document.getElementById("hacker-menu-toggle");
    const navMenu = document.getElementById("hacker-nav-menu");
    const navClose = document.getElementById("hacker-nav-close");
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.add("open");
      });
    }
    if (navClose && navMenu) {
      navClose.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.remove("open");
      });
    }

    // インターフェース系はそのまま
    const closeInterface = document.getElementById("close-interface");
    const minimizeInterface = document.getElementById("minimize-interface");
    const maximizeInterface = document.getElementById("maximize-interface");
    const toolInterface = document.getElementById("tool-interface");
    if (closeInterface && toolInterface) {
      closeInterface.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toolInterface.classList.add("hidden");
      });
    }
    if (minimizeInterface && toolInterface) {
      minimizeInterface.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toolInterface.classList.toggle("minimized");
      });
    }
    if (maximizeInterface && toolInterface) {
      maximizeInterface.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toolInterface.classList.toggle("maximized");
      });
    }

    // ヘルプパネル
    const helpToggle = document.getElementById("help-toggle");
    const helpPanel = document.getElementById("help-panel");
    const helpClose = document.getElementById("help-close");
    if (helpToggle && helpPanel) {
      helpToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        helpPanel.classList.toggle("open");
      });
    }
    if (helpClose && helpPanel) {
      helpClose.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        helpPanel.classList.remove("open");
      });
    }
  }

  setupHelpPanel() {
    // ヘルプパネルはHTMLに既に存在
  }

  setupCursor() {
    const cursor = document.getElementById("cursor");
    const cursorTrail = document.getElementById("cursor-trail");
    const cursorGlow = document.getElementById("cursor-glow");

    if (!cursor || !cursorTrail || !cursorGlow) return;

    let mouseX = 0,
      mouseY = 0;
    let trailX = 0,
      trailY = 0;
    let glowX = 0,
      glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    // スムーズなトレイルアニメーション
    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      cursorTrail.style.left = trailX + "px";
      cursorTrail.style.top = trailY + "px";

      glowX += (mouseX - glowX) * 0.05;
      glowY += (mouseY - glowY) * 0.05;

      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";

      requestAnimationFrame(animateTrail);
    };
    animateTrail();

    // ホバーエフェクト
    document.addEventListener("mouseover", (e) => {
      if (
        e.target.matches(
          "button, .tool-card, .nav-link, .control-btn, a, .hash-sample, .crypto-sample, .sql-sample, .crypto-mode-btn, .help-toggle"
        )
      ) {
        cursor.classList.add("hover");
        cursorTrail.classList.add("hover");
        cursorGlow.classList.add("hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (
        e.target.matches(
          "button, .tool-card, .nav-link, .control-btn, a, .hash-sample, .crypto-sample, .sql-sample, .crypto-mode-btn, .help-toggle"
        )
      ) {
        cursor.classList.remove("hover");
        cursorTrail.classList.remove("hover");
        cursorGlow.classList.remove("hover");
      }
    });

    document.addEventListener("mousedown", () => {
      cursor.classList.add("click");
    });

    document.addEventListener("mouseup", () => {
      cursor.classList.remove("click");
    });
  }

  showWarningOverlay() {
    const warningOverlay = document.getElementById("warning-overlay");
    if (warningOverlay) {
      warningOverlay.classList.remove("hidden");
    }
  }

  openTool(toolName) {
    this.currentTool = toolName;
    const toolInterface = document.getElementById("tool-interface");
    const interfaceTitle = document.getElementById("interface-title");
    const interfaceContent = document.getElementById("interface-content");

    if (!toolInterface || !interfaceTitle || !interfaceContent) return;

    const tools = {
      terminal: {
        title: {
          ja: "Advanced Terminal - Linux Command Simulator",
          en: "Advanced Terminal - Linux Command Simulator",
        },
        content: this.createTerminalInterface(),
      },
      password: {
        title: {
          ja: "Password Cracker Pro - 辞書攻撃・ブルートフォース",
          en: "Password Cracker Pro - Dictionary Attack & Brute Force",
        },
        content: this.createPasswordCrackerInterface(),
      },
      network: {
        title: {
          ja: "Network Penetration - ポートスキャン・脆弱性検出",
          en: "Network Penetration - Port Scanning & Vulnerability Detection",
        },
        content: this.createNetworkInterface(),
      },
      crypto: {
        title: {
          ja: "Crypto Warfare - 暗号化/復号化システム",
          en: "Crypto Warfare - Encryption/Decryption System",
        },
        content: this.createCryptoInterface(),
      },
      sql: {
        title: {
          ja: "SQL Injection Lab - データベース侵入",
          en: "SQL Injection Lab - Database Penetration",
        },
        content: this.createSQLInterface(),
      },
      social: {
        title: {
          ja: "Social Engineering - フィッシング攻撃",
          en: "Social Engineering - Phishing Attacks",
        },
        content: this.createSocialInterface(),
      },
      malware: {
        title: {
          ja: "Malware Lab - ウイルス作成シミュレーター",
          en: "Malware Lab - Virus Creation Simulator",
        },
        content: this.createMalwareInterface(),
      },
      wifi: {
        title: {
          ja: "WiFi Hacking - 無線ネットワーク侵入",
          en: "WiFi Hacking - Wireless Network Penetration",
        },
        content: this.createWiFiInterface(),
      },
      forensics: {
        title: {
          ja: "Digital Forensics - 証拠隠滅・ログ改ざん",
          en: "Digital Forensics - Evidence Elimination & Log Tampering",
        },
        content: this.createForensicsInterface(),
      },
    };

    const tool = tools[toolName];
    if (tool) {
      interfaceTitle.textContent = tool.title[this.currentLanguage];
      interfaceContent.innerHTML = tool.content;
      toolInterface.classList.remove("hidden");
      this.unlockAchievement(
        `tool-${toolName}`,
        `${toolName.toUpperCase()}使用`,
        `${tool.title.ja}を使用しました`,
        `${toolName.toUpperCase()} Used`,
        `Used ${tool.title.en}`
      );

      // ツール固有の機能を初期化
      if (toolName === "crypto") {
        this.initCryptoTool();
      } else if (toolName === "password") {
        this.initPasswordTool();
      } else if (toolName === "sql") {
        this.initSQLTool();
      }
    }
  }

  createTerminalInterface() {
    const terminalOutput =
      this.currentLanguage === "ja"
        ? `root@hacker-system:~# システム起動中...
[OK] ハッカーターミナル v2.1 起動完了
[INFO] 利用可能コマンド: ls, cd, cat, ps, netstat, nmap, whoami, help
[WARNING] このシステムは教育目的のシミュレーションです

root@hacker-system:~# `
        : `root@hacker-system:~# System starting...
[OK] Hacker Terminal v2.1 started
[INFO] Available commands: ls, cd, cat, ps, netstat, nmap, whoami, help
[WARNING] This system is a simulation for educational purposes

root@hacker-system:~# `;

    const commandsHelp =
      this.currentLanguage === "ja"
        ? `<h4>利用可能コマンド:</h4>
            <ul style="list-style: none; margin-top: 0.5rem;">
                <li>• ls - ファイル一覧表示</li>
                <li>• cd [dir] - ディレクトリ移動</li>
                <li>• cat [file] - ファイル内容表示</li>
                <li>• ps - プロセス一覧</li>
                <li>• netstat - ネットワーク接続</li>
                <li>• nmap [target] - ポートスキャン</li>
                <li>• whoami - 現在のユーザー</li>
                <li>• help - ヘルプ表示</li>
            </ul>`
        : `<h4>Available Commands:</h4>
            <ul style="list-style: none; margin-top: 0.5rem;">
                <li>• ls - List files</li>
                <li>• cd [dir] - Change directory</li>
                <li>• cat [file] - Display file contents</li>
                <li>• ps - List processes</li>
                <li>• netstat - Network connections</li>
                <li>• nmap [target] - Port scan</li>
                <li>• whoami - Current user</li>
                <li>• help - Display help</li>
            </ul>`;

    const promptText =
      this.currentLanguage === "ja"
        ? `<span class="terminal-prompt">root@hacker-system:~# </span>
            <input type="text" class="terminal-input" id="terminal-input" placeholder="コマンドを入力...">`
        : `<span class="terminal-prompt">root@hacker-system:~# </span>
            <input type="text" class="terminal-input" id="terminal-input" placeholder="Enter command...">`;

    return `
            <div class="terminal">
                <div class="terminal-output" id="terminal-output">${terminalOutput}</div>
                <div style="display: flex; align-items: center;">
                    ${promptText}
                </div>
            </div>
            <div style="margin-top: 1rem; color: #00cc33; font-family: 'JetBrains Mono', monospace;">
                ${commandsHelp}
            </div>
        `;
  }

  createPasswordCrackerInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "パスワードクラッカー"
        : "Password Cracker";
    const hashGeneratorTitle =
      this.currentLanguage === "ja" ? "ハッシュ生成ツール:" : "Hash Generator:";
    const passwordLabel =
      this.currentLanguage === "ja" ? "パスワード:" : "Password:";
    const passwordPlaceholder =
      this.currentLanguage === "ja"
        ? "パスワードを入力..."
        : "Enter password...";
    const hashTypeLabel =
      this.currentLanguage === "ja" ? "ハッシュタイプ:" : "Hash Type:";
    const generateButton =
      this.currentLanguage === "ja" ? "ハッシュ生成" : "Generate Hash";

    const targetHashLabel =
      this.currentLanguage === "ja" ? "ターゲットハッシュ:" : "Target Hash:";
    const targetHashPlaceholder =
      this.currentLanguage === "ja"
        ? "MD5/SHA1ハッシュを入力..."
        : "Enter MD5/SHA1 hash...";
    const attackMethodLabel =
      this.currentLanguage === "ja" ? "攻撃方法:" : "Attack Method:";
    const attackButton =
      this.currentLanguage === "ja" ? "攻撃開始" : "Start Attack";

    const sampleHashesTitle =
      this.currentLanguage === "ja"
        ? "サンプルハッシュ (クリックでコピー):"
        : "Sample Hashes (Click to Copy):";

    const methodExplanation =
      this.currentLanguage === "ja"
        ? `<h4>攻撃方法の説明:</h4>
            <p><strong>辞書攻撃:</strong> よく使われるパスワードリストを使用</p>
            <p><strong>ブルートフォース:</strong> すべての文字組み合わせを試行</p>
            <p><strong>レインボーテーブル:</strong> 事前計算されたハッシュテーブルを使用</p>`
        : `<h4>Attack Methods Explained:</h4>
            <p><strong>Dictionary Attack:</strong> Uses common password lists</p>
            <p><strong>Brute Force:</strong> Tries all possible character combinations</p>
            <p><strong>Rainbow Table:</strong> Uses pre-computed hash tables</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                
                <!-- Hash Generator Section -->
                <div style="margin-bottom: 2rem; border: 1px solid #00ff41; padding: 1rem; background: rgba(0, 255, 65, 0.05);">
                    <h4 style="color: #ffff00; margin-bottom: 1rem;">${hashGeneratorTitle}</h4>
                    <div style="margin-bottom: 1rem;">
                        <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${passwordLabel}</label>
                        <input type="text" id="password-input" placeholder="${passwordPlaceholder}" 
                               style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${hashTypeLabel}</label>
                        <select id="hash-type" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                            <option value="md5">MD5</option>
                            <option value="sha1">SHA-1</option>
                            <option value="sha256">SHA-256</option>
                        </select>
                    </div>
                    <button onclick="hackerSim.generateHash()" 
                            style="padding: 0.5rem 1rem; background: rgba(255, 255, 0, 0.2); border: 2px solid #ffff00; color: #ffff00;">
                        ${generateButton}
                    </button>
                    <div id="hash-result" style="margin-top: 1rem; color: #ffff00; word-break: break-all;"></div>
                </div>
                
                <!-- Sample Hashes Section -->
                <div style="margin-bottom: 2rem; border: 1px solid #ffff00; padding: 1rem; background: rgba(255, 255, 0, 0.05);">
                    <h4 style="color: #ffff00; margin-bottom: 1rem;">${sampleHashesTitle}</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.5rem;">
                        <div class="hash-sample" onclick="hackerSim.copyHashToTarget('5f4dcc3b5aa765d61d8327deb882cf99')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            MD5: 5f4dcc3b5aa765d61d8327deb882cf99
                            <div style="font-size: 0.8rem; color: #666;">(password)</div>
                        </div>
                        <div class="hash-sample" onclick="hackerSim.copyHashToTarget('21232f297a57a5a743894a0e4a801fc3')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            MD5: 21232f297a57a5a743894a0e4a801fc3
                            <div style="font-size: 0.8rem; color: #666;">(admin)</div>
                        </div>
                        <div class="hash-sample" onclick="hackerSim.copyHashToTarget('482c811da5d5b4bc6d497ffa98491e38')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            MD5: 482c811da5d5b4bc6d497ffa98491e38
                            <div style="font-size: 0.8rem; color: #666;">(password123)</div>
                        </div>
                        <div class="hash-sample" onclick="hackerSim.copyHashToTarget('456789abcdef0123456789abcdef0123')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            MD5: 456789abcdef0123456789abcdef0123
                            <div style="font-size: 0.8rem; color: #666;">(f15dfvc3)</div>
                        </div>
                    </div>
                </div>
                
                <!-- Password Cracker Section -->
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${targetHashLabel}</label>
                    <input type="text" id="target-hash" placeholder="${targetHashPlaceholder}" 
                           style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                </div>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${attackMethodLabel}</label>
                    <select id="attack-method" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                        <option value="dictionary">${
                          this.currentLanguage === "ja"
                            ? "辞書攻撃"
                            : "Dictionary Attack"
                        }</option>
                        <option value="brute">${
                          this.currentLanguage === "ja"
                            ? "ブルートフォース"
                            : "Brute Force"
                        }</option>
                        <option value="rainbow">${
                          this.currentLanguage === "ja"
                            ? "レインボーテーブル"
                            : "Rainbow Table"
                        }</option>
                    </select>
                </div>
                <button onclick="hackerSim.startPasswordCrack()" 
                        style="padding: 1rem 2rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                    ${attackButton}
                </button>
                <div id="crack-progress" style="margin-top: 1rem; color: #00cc33;"></div>
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${methodExplanation}
                </div>
            </div>
        `;
  }

  createNetworkInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "ネットワーク侵入テスト"
        : "Network Penetration Test";
    const targetIPLabel =
      this.currentLanguage === "ja" ? "ターゲットIP:" : "Target IP:";
    const portScanButton =
      this.currentLanguage === "ja" ? "ポートスキャン" : "Port Scan";
    const vulnScanButton =
      this.currentLanguage === "ja" ? "脆弱性スキャン" : "Vulnerability Scan";
    const penetrationButton =
      this.currentLanguage === "ja" ? "侵入テスト" : "Penetration Test";
    const scanExplanation =
      this.currentLanguage === "ja"
        ? `<h4>スキャン技術の説明:</h4>
            <p><strong>ポートスキャン:</strong> 開いているポートを検出</p>
            <p><strong>脆弱性スキャン:</strong> セキュリティホールを特定</p>
            <p><strong>侵入テスト:</strong> 実際の攻撃をシミュレーション</p>`
        : `<h4>Scanning Techniques:</h4>
            <p><strong>Port Scan:</strong> Detect open ports</p>
            <p><strong>Vulnerability Scan:</strong> Identify security holes</p>
            <p><strong>Penetration Test:</strong> Simulate actual attacks</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${targetIPLabel}</label>
                    <input type="text" id="target-ip" placeholder="192.168.1.1" value="192.168.1.100"
                           style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                </div>
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                    <button onclick="hackerSim.startPortScan()" 
                            style="padding: 0.75rem 1.5rem; background: rgba(0, 255, 65, 0.2); border: 2px solid #00ff41; color: #00ff41;">
                        ${portScanButton}
                    </button>
                    <button onclick="hackerSim.startVulnScan()" 
                            style="padding: 0.75rem 1.5rem; background: rgba(255, 255, 0, 0.2); border: 2px solid #ffff00; color: #ffff00;">
                        ${vulnScanButton}
                    </button>
                    <button onclick="hackerSim.startPenetrationTest()" 
                            style="padding: 0.75rem 1.5rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                        ${penetrationButton}
                    </button>
                </div>
                <div id="scan-results" style="background: #000; border: 1px solid #00ff41; padding: 1rem; min-height: 200px; color: #00ff41; font-family: 'JetBrains Mono', monospace;"></div>
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${scanExplanation}
                </div>
            </div>
        `;
  }

  createCryptoInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "暗号化/復号化システム"
        : "Encryption/Decryption System";
    const modeLabel = this.currentLanguage === "ja" ? "モード:" : "Mode:";
    const encryptMode = this.currentLanguage === "ja" ? "暗号化" : "Encrypt";
    const decryptMode = this.currentLanguage === "ja" ? "復号化" : "Decrypt";
    const sampleCipherTitle =
      this.currentLanguage === "ja"
        ? "サンプル暗号文: (クリックでコピー)"
        : "Sample Ciphers: (Click to Copy)";
    const inputTextLabel =
      this.currentLanguage === "ja" ? "入力テキスト:" : "Input Text:";
    const inputTextPlaceholder =
      this.currentLanguage === "ja" ? "テキストを入力..." : "Enter text...";
    const cryptoMethodLabel =
      this.currentLanguage === "ja" ? "暗号方式:" : "Encryption Method:";
    const shiftAmountLabel =
      this.currentLanguage === "ja" ? "シフト量:" : "Shift Amount:";
    const processButton =
      this.currentLanguage === "ja" ? "処理開始" : "Process";
    const methodExplanation =
      this.currentLanguage === "ja"
        ? `<h4>暗号方式の説明:</h4>
            <p><strong>シーザー暗号:</strong> 文字を一定数ずらす古典暗号 (例: A→D)</p>
            <p><strong>Base64:</strong> バイナリデータをテキストに変換する符号化方式</p>
            <p><strong>ROT13:</strong> 13文字ずらすシーザー暗号の変種 (例: A→N)</p>
            <p><strong>モールス信号:</strong> 点と線による通信方式 (例: A→・－)</p>`
        : `<h4>Encryption Methods:</h4>
            <p><strong>Caesar Cipher:</strong> Classical cipher that shifts letters (e.g., A→D)</p>
            <p><strong>Base64:</strong> Encoding scheme that converts binary data to text</p>
            <p><strong>ROT13:</strong> Caesar cipher variant that shifts 13 places (e.g., A→N)</p>
            <p><strong>Morse Code:</strong> Communication system using dots and dashes (e.g., A→・－)</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                
                <!-- Mode Selection -->
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${modeLabel}</label>
                    <div style="display: flex; gap: 1rem;">
                        <button id="encrypt-mode-btn" class="crypto-mode-btn" onclick="hackerSim.setCryptoMode('encrypt')" 
                                style="flex: 1; padding: 0.75rem; background: rgba(0, 255, 65, 0.2); border: 2px solid #00ff41; color: #00ff41;">
                            ${encryptMode}
                        </button>
                        <button id="decrypt-mode-btn" class="crypto-mode-btn" onclick="hackerSim.setCryptoMode('decrypt')" 
                                style="flex: 1; padding: 0.75rem; background: rgba(255, 0, 64, 0.1); border: 2px solid #ff0040; color: #ff0040;">
                            ${decryptMode}
                        </button>
                    </div>
                </div>
                
                <!-- Sample Ciphers Section -->
                <div style="margin-bottom: 2rem; border: 1px solid #ffff00; padding: 1rem; background: rgba(255, 255, 0, 0.05);">
                    <h4 style="color: #ffff00; margin-bottom: 1rem;">${sampleCipherTitle}</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.5rem;">
                        <div class="crypto-sample" onclick="hackerSim.copyCryptoSample('Khoor Zruog', 'caesar')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            Caesar: Khoor Zruog
                            <div style="font-size: 0.8rem; color: #666;">(Hello World, シフト3)</div>
                        </div>
                        <div class="crypto-sample" onclick="hackerSim.copyCryptoSample('SGVsbG8gV29ybGQ=', 'base64')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            Base64: SGVsbG8gV29ybGQ=
                            <div style="font-size: 0.8rem; color: #666;">(Hello World)</div>
                        </div>
                        <div class="crypto-sample" onclick="hackerSim.copyCryptoSample('Uryyb Jbeyq', 'rot13')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            ROT13: Uryyb Jbeyq
                            <div style="font-size: 0.8rem; color: #666;">(Hello World)</div>
                        </div>
                        <div class="crypto-sample" onclick="hackerSim.copyCryptoSample('.... . .-.. .-.. --- / .-- --- .-. .-.. -..', 'morse')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            Morse: .... . .-.. .-.. --- / .-- --- .-. .-.. -..
                            <div style="font-size: 0.8rem; color: #666;">(Hello World)</div>
                        </div>
                    </div>
                </div>
                
                <!-- Input Section -->
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${inputTextLabel}</label>
                    <textarea id="crypto-text" placeholder="${inputTextPlaceholder}" 
                              style="width: 100%; height: 100px; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41; resize: vertical;"></textarea>
                </div>
                
                <!-- Method Selection -->
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${cryptoMethodLabel}</label>
                    <select id="crypto-method" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;" onchange="hackerSim.updateCryptoInterface()">
                        <option value="caesar">${
                          this.currentLanguage === "ja"
                            ? "シーザー暗号"
                            : "Caesar Cipher"
                        }</option>
                        <option value="base64">Base64</option>
                        <option value="rot13">ROT13</option>
                        <option value="morse">${
                          this.currentLanguage === "ja"
                            ? "モールス信号"
                            : "Morse Code"
                        }</option>
                        <option value="binary">${
                          this.currentLanguage === "ja" ? "バイナリ" : "Binary"
                        }</option>
                    </select>
                </div>
                
                <!-- Shift Amount (for Caesar cipher) -->
                <div id="shift-amount-container" style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${shiftAmountLabel}</label>
                    <input type="number" id="shift-amount" value="3" min="1" max="25" 
                           style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                </div>
                
                <!-- Process Button -->
                <button id="crypto-process-btn" onclick="hackerSim.processCrypto()" 
                        style="padding: 1rem 2rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                    ${processButton}
                </button>
                
                <!-- Result Display -->
                <div id="crypto-result" style="margin-top: 1rem; padding: 1rem; background: #000; border: 1px solid #00ff41; color: #00ff41; min-height: 100px;"></div>
                
                <!-- Method Explanation -->
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${methodExplanation}
                </div>
            </div>
        `;
  }

  createSQLInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "SQL インジェクション ラボ"
        : "SQL Injection Lab";
    const targetURLLabel =
      this.currentLanguage === "ja" ? "ターゲットURL:" : "Target URL:";
    const sqlPayloadLabel =
      this.currentLanguage === "ja" ? "SQLペイロード:" : "SQL Payload:";
    const sqlPayloadPlaceholder =
      this.currentLanguage === "ja" ? "' OR '1'='1' --" : "' OR '1'='1' --";
    const injectionButton =
      this.currentLanguage === "ja"
        ? "インジェクション実行"
        : "Execute Injection";
    const samplePayloadsTitle =
      this.currentLanguage === "ja"
        ? "サンプルペイロード (クリックでコピー):"
        : "Sample Payloads (Click to Copy):";
    const sqlExplanation =
      this.currentLanguage === "ja"
        ? `<h4>SQLインジェクション技術:</h4>
            <p><strong>Union攻撃:</strong> UNION文を使用してデータを抽出</p>
            <p><strong>Boolean攻撃:</strong> 真偽値を利用した情報収集</p>
            <p><strong>Time-based攻撃:</strong> 時間遅延を利用した攻撃</p>`
        : `<h4>SQL Injection Techniques:</h4>
            <p><strong>Union Attack:</strong> Extract data using UNION statements</p>
            <p><strong>Boolean Attack:</strong> Gather information using boolean values</p>
            <p><strong>Time-based Attack:</strong> Attack using time delays</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${targetURLLabel}</label>
                    <input type="text" id="target-url" value="http://vulnerable-site.com/login.php" 
                           style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                </div>
                
                <!-- Sample Payloads Section -->
                <div style="margin-bottom: 2rem; border: 1px solid #ffff00; padding: 1rem; background: rgba(255, 255, 0, 0.05);">
                    <h4 style="color: #ffff00; margin-bottom: 1rem;">${samplePayloadsTitle}</h4>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 0.5rem;">
                        <div class="sql-sample" onclick="hackerSim.copySQLPayload('\\' OR \\'1\\'=\\'1\\' --')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            ' OR '1'='1' --
                            <div style="font-size: 0.8rem; color: #666;">(${
                              this.currentLanguage === "ja"
                                ? "基本的な認証バイパス"
                                : "Basic authentication bypass"
                            })</div>
                        </div>
                        <div class="sql-sample" onclick="hackerSim.copySQLPayload('UNION SELECT username, password FROM users --')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            UNION SELECT username, password FROM users --
                            <div style="font-size: 0.8rem; color: #666;">(${
                              this.currentLanguage === "ja"
                                ? "ユーザーデータ抽出"
                                : "Extract user data"
                            })</div>
                        </div>
                        <div class="sql-sample" onclick="hackerSim.copySQLPayload('admin\\'; DROP TABLE users; --')" style="padding: 0.5rem; border: 1px solid #00ff41; color: #00ff41;">
                            admin'; DROP TABLE users; --
                            <div style="font-size: 0.8rem; color: #666;">(${
                              this.currentLanguage === "ja"
                                ? "データベース破壊"
                                : "Database destruction"
                            })</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${sqlPayloadLabel}</label>
                    <textarea id="sql-payload" placeholder="${sqlPayloadPlaceholder}" 
                              style="width: 100%; height: 80px; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;"></textarea>
                </div>
                <button onclick="hackerSim.executeSQLInjection()" 
                        style="padding: 1rem 2rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                    ${injectionButton}
                </button>
                <div id="sql-results" style="margin-top: 1rem; background: #000; border: 1px solid #00ff41; padding: 1rem; min-height: 150px; color: #00ff41; font-family: 'JetBrains Mono', monospace;"></div>
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${sqlExplanation}
                </div>
            </div>
        `;
  }

  createSocialInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "ソーシャルエンジニアリング"
        : "Social Engineering";
    const attackTypeLabel =
      this.currentLanguage === "ja" ? "攻撃タイプ:" : "Attack Type:";
    const targetInfoLabel =
      this.currentLanguage === "ja" ? "ターゲット情報:" : "Target Information:";
    const targetInfoPlaceholder =
      this.currentLanguage === "ja"
        ? "ターゲットの名前、会社など..."
        : "Target name, company, etc...";
    const generateButton =
      this.currentLanguage === "ja"
        ? "攻撃シナリオ生成"
        : "Generate Attack Scenario";
    const socialExplanation =
      this.currentLanguage === "ja"
        ? `<h4>ソーシャルエンジニアリング手法:</h4>
            <p><strong>フィッシング:</strong> 偽のメールやサイトで情報を盗取</p>
            <p><strong>プリテキスティング:</strong> 偽の身分で情報を聞き出す</p>
            <p><strong>ベイティング:</strong> 魅力的な餌で誘い込む</p>`
        : `<h4>Social Engineering Techniques:</h4>
            <p><strong>Phishing:</strong> Steal information using fake emails or sites</p>
            <p><strong>Pretexting:</strong> Extract information using a false identity</p>
            <p><strong>Baiting:</strong> Lure targets with attractive bait</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${attackTypeLabel}</label>
                    <select id="social-attack" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                        <option value="phishing">${
                          this.currentLanguage === "ja"
                            ? "フィッシングメール"
                            : "Phishing Email"
                        }</option>
                        <option value="pretexting">${
                          this.currentLanguage === "ja"
                            ? "プリテキスティング"
                            : "Pretexting"
                        }</option>
                        <option value="baiting">${
                          this.currentLanguage === "ja"
                            ? "ベイティング"
                            : "Baiting"
                        }</option>
                        <option value="quid-pro-quo">${
                          this.currentLanguage === "ja"
                            ? "見返り攻撃"
                            : "Quid Pro Quo"
                        }</option>
                    </select>
                </div>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${targetInfoLabel}</label>
                    <input type="text" id="target-info" placeholder="${targetInfoPlaceholder}" 
                           style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                </div>
                <button onclick="hackerSim.generateSocialAttack()" 
                        style="padding: 1rem 2rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                    ${generateButton}
                </button>
                <div id="social-scenario" style="margin-top: 1rem; background: #000; border: 1px solid #00ff41; padding: 1rem; min-height: 200px; color: #00ff41;"></div>
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${socialExplanation}
                </div>
            </div>
        `;
  }

  createMalwareInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "マルウェア作成ラボ"
        : "Malware Creation Lab";
    const malwareTypeLabel =
      this.currentLanguage === "ja" ? "マルウェアタイプ:" : "Malware Type:";
    const targetOSLabel =
      this.currentLanguage === "ja" ? "ターゲットOS:" : "Target OS:";
    const generateButton =
      this.currentLanguage === "ja" ? "マルウェア生成" : "Generate Malware";
    const warningText =
      this.currentLanguage === "ja"
        ? `<h4>⚠️ 重要な注意事項:</h4>
            <p>これは教育目的のシミュレーションです。実際のマルウェア作成は違法行為です。</p>
            <p>セキュリティ研究と防御技術の理解のみに使用してください。</p>`
        : `<h4>⚠️ Important Warning:</h4>
            <p>This is a simulation for educational purposes only. Creating actual malware is illegal.</p>
            <p>Use only for security research and understanding defense techniques.</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${malwareTypeLabel}</label>
                    <select id="malware-type" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                        <option value="virus">${
                          this.currentLanguage === "ja" ? "ウイルス" : "Virus"
                        }</option>
                        <option value="trojan">${
                          this.currentLanguage === "ja"
                            ? "トロイの木馬"
                            : "Trojan Horse"
                        }</option>
                        <option value="ransomware">${
                          this.currentLanguage === "ja"
                            ? "ランサムウェア"
                            : "Ransomware"
                        }</option>
                        <option value="keylogger">${
                          this.currentLanguage === "ja"
                            ? "キーロガー"
                            : "Keylogger"
                        }</option>
                        <option value="botnet">${
                          this.currentLanguage === "ja"
                            ? "ボットネット"
                            : "Botnet"
                        }</option>
                    </select>
                </div>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${targetOSLabel}</label>
                    <select id="target-os" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                        <option value="windows">Windows</option>
                        <option value="linux">Linux</option>
                        <option value="macos">macOS</option>
                        <option value="android">Android</option>
                    </select>
                </div>
                <button onclick="hackerSim.generateMalware()" 
                        style="padding: 1rem 2rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                    ${generateButton}
                </button>
                <div id="malware-code" style="margin-top: 1rem; background: #000; border: 1px solid #00ff41; padding: 1rem; min-height: 200px; color: #00ff41; font-family: 'JetBrains Mono', monospace;"></div>
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${warningText}
                </div>
            </div>
        `;
  }

  createWiFiInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "WiFi ハッキング ツール"
        : "WiFi Hacking Tool";
    const scanButton =
      this.currentLanguage === "ja"
        ? "WiFiネットワークスキャン"
        : "Scan WiFi Networks";
    const attackMethodLabel =
      this.currentLanguage === "ja" ? "攻撃方法:" : "Attack Method:";
    const executeButton =
      this.currentLanguage === "ja" ? "攻撃実行" : "Execute Attack";
    const wifiExplanation =
      this.currentLanguage === "ja"
        ? `<h4>WiFi攻撃手法:</h4>
            <p><strong>WPA/WPA2クラック:</strong> 暗号化キーの解読</p>
            <p><strong>Evil Twin:</strong> 偽のアクセスポイント設置</p>
            <p><strong>認証解除攻撃:</strong> 強制的に接続を切断</p>`
        : `<h4>WiFi Attack Techniques:</h4>
            <p><strong>WPA/WPA2 Cracking:</strong> Decrypt encryption keys</p>
            <p><strong>Evil Twin:</strong> Set up fake access points</p>
            <p><strong>Deauthentication Attack:</strong> Force connection termination</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                <button onclick="hackerSim.scanWiFiNetworks()" 
                        style="padding: 1rem 2rem; background: rgba(0, 255, 65, 0.2); border: 2px solid #00ff41; color: #00ff41; margin-bottom: 1rem;">
                    ${scanButton}
                </button>
                <div id="wifi-networks" style="background: #000; border: 1px solid #00ff41; padding: 1rem; min-height: 200px; color: #00ff41; font-family: 'JetBrains Mono', monospace; margin-bottom: 2rem;"></div>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${attackMethodLabel}</label>
                    <select id="wifi-attack" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                        <option value="wpa-crack">${
                          this.currentLanguage === "ja"
                            ? "WPA/WPA2クラック"
                            : "WPA/WPA2 Cracking"
                        }</option>
                        <option value="evil-twin">${
                          this.currentLanguage === "ja"
                            ? "Evil Twin攻撃"
                            : "Evil Twin Attack"
                        }</option>
                        <option value="deauth">${
                          this.currentLanguage === "ja"
                            ? "認証解除攻撃"
                            : "Deauthentication Attack"
                        }</option>
                        <option value="packet-sniff">${
                          this.currentLanguage === "ja"
                            ? "パケット傍受"
                            : "Packet Sniffing"
                        }</option>
                    </select>
                </div>
                <button onclick="hackerSim.executeWiFiAttack()" 
                        style="padding: 1rem 2rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                    ${executeButton}
                </button>
                <div id="wifi-attack-result" style="margin-top: 1rem; background: #000; border: 1px solid #00ff41; padding: 1rem; min-height: 100px; color: #00ff41;"></div>
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${wifiExplanation}
                </div>
            </div>
        `;
  }

  createForensicsInterface() {
    const title =
      this.currentLanguage === "ja"
        ? "デジタル フォレンジック"
        : "Digital Forensics";
    const actionTypeLabel =
      this.currentLanguage === "ja" ? "操作タイプ:" : "Operation Type:";
    const targetPathLabel =
      this.currentLanguage === "ja" ? "ターゲットパス:" : "Target Path:";
    const executeButton =
      this.currentLanguage === "ja"
        ? "証拠隠滅実行"
        : "Execute Evidence Elimination";
    const forensicsExplanation =
      this.currentLanguage === "ja"
        ? `<h4>証拠隠滅技術:</h4>
            <p><strong>ログ削除:</strong> システムログの除去</p>
            <p><strong>ファイル完全削除:</strong> 復元不可能な削除</p>
            <p><strong>タイムスタンプ改ざん:</strong> ファイル作成・更新時刻の変更</p>`
        : `<h4>Evidence Elimination Techniques:</h4>
            <p><strong>Log Deletion:</strong> Remove system logs</p>
            <p><strong>Secure File Deletion:</strong> Unrecoverable deletion</p>
            <p><strong>Timestamp Manipulation:</strong> Change file creation/modification times</p>`;

    return `
            <div style="padding: 1rem;">
                <h3 style="color: #ff0040; margin-bottom: 1rem;">${title}</h3>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${actionTypeLabel}</label>
                    <select id="forensics-action" style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                        <option value="log-clear">${
                          this.currentLanguage === "ja"
                            ? "ログ削除"
                            : "Log Deletion"
                        }</option>
                        <option value="file-wipe">${
                          this.currentLanguage === "ja"
                            ? "ファイル完全削除"
                            : "Secure File Deletion"
                        }</option>
                        <option value="timestamp-modify">${
                          this.currentLanguage === "ja"
                            ? "タイムスタンプ改ざん"
                            : "Timestamp Manipulation"
                        }</option>
                        <option value="metadata-clean">${
                          this.currentLanguage === "ja"
                            ? "メタデータ除去"
                            : "Metadata Removal"
                        }</option>
                    </select>
                </div>
                <div style="margin-bottom: 2rem;">
                    <label style="color: #00ff41; display: block; margin-bottom: 0.5rem;">${targetPathLabel}</label>
                    <input type="text" id="target-path" value="/var/log/auth.log" 
                           style="width: 100%; padding: 0.5rem; background: #000; border: 1px solid #00ff41; color: #00ff41;">
                </div>
                <button onclick="hackerSim.executeForensicsAction()" 
                        style="padding: 1rem 2rem; background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; color: #ff0040;">
                    ${executeButton}
                </button>
                <div id="forensics-result" style="margin-top: 1rem; background: #000; border: 1px solid #00ff41; padding: 1rem; min-height: 150px; color: #00ff41; font-family: 'JetBrains Mono', monospace;"></div>
                <div style="margin-top: 2rem; color: #00cc33; font-size: 0.9rem;">
                    ${forensicsExplanation}
                </div>
            </div>
        `;
  }

  // ツール固有の初期化メソッド
  initPasswordTool() {
    // ハッシュサンプル用のイベントリスナーを追加
    document.querySelectorAll(".hash-sample").forEach((sample) => {
      sample.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const hash = sample.textContent.split(":")[1].trim().split("\n")[0];
        this.copyHashToTarget(hash);
      });
    });
  }

  initCryptoTool() {
    // デフォルトモードを暗号化に設定
    this.setCryptoMode("encrypt");

    // 選択された方法に基づいてシフト量の表示/非表示を切り替え
    this.updateCryptoInterface();

    // 暗号化サンプル用のイベントリスナーを追加
    document.querySelectorAll(".crypto-sample").forEach((sample) => {
      sample.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const text = sample.textContent.split(":")[1].trim().split("\n")[0];
        const method = sample.textContent.split(":")[0].trim().toLowerCase();
        this.copyCryptoSample(text, method);
      });
    });
  }

  initSQLTool() {
    // SQLサンプル用のイベントリスナーを追加
    document.querySelectorAll(".sql-sample").forEach((sample) => {
      sample.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const payload = sample.textContent.trim().split("\n")[0];
        this.copySQLPayload(payload);
      });
    });
  }

  // ツール固有のメソッド
  generateHash() {
    const password = document.getElementById("password-input")?.value;
    const hashType = document.getElementById("hash-type")?.value;
    const result = document.getElementById("hash-result");

    if (!password || !result) return;

    let hash = "";

    // シンプルなハッシュシミュレーション（実際の暗号化ハッシュではありません）
    switch (hashType) {
      case "md5":
        // デモ目的で、シンプルなハッシュ表現を使用します
        hash = this.simulateMD5(password);
        break;
      case "sha1":
        hash = this.simulateSHA1(password);
        break;
      case "sha256":
        hash = this.simulateSHA256(password);
        break;
    }

    // クラッキング用にハッシュを保存
    this.passwordHashes[password] = hash;

    const hashText = this.currentLanguage === "ja" ? "ハッシュ" : "Hash";
    result.innerHTML = `${hashText}: <span style="color: #00ff41;">${hash}</span>`;
  }

  simulateMD5(text) {
    // これは本物のMD5ハッシュではなく、デモ用のシミュレーションです
    if (text === "password") return "5f4dcc3b5aa765d61d8327deb882cf99";
    if (text === "admin") return "21232f297a57a5a743894a0e4a801fc3";
    if (text === "123456") return "e10adc3949ba59abbe56e057f20f883e";
    if (text === "password123") return "482c811da5d5b4bc6d497ffa98491e38";
    if (text === "f15dfvc3") return "456789abcdef0123456789abcdef0123";

    // デモ目的で偽のMD5ライクハッシュを生成
    let hash = "";
    const chars = "0123456789abcdef";
    for (let i = 0; i < 32; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  }

  simulateSHA1(text) {
    // デモ目的で偽のSHA1ライクハッシュを生成
    let hash = "";
    const chars = "0123456789abcdef";
    for (let i = 0; i < 40; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  }

  simulateSHA256(text) {
    // デモ目的で偽のSHA256ライクハッシュを生成
    let hash = "";
    const chars = "0123456789abcdef";
    for (let i = 0; i < 64; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  }

  copyHashToTarget(hash) {
    const targetHash = document.getElementById("target-hash");
    if (targetHash) {
      targetHash.value = hash;
      this.showNotification(
        this.currentLanguage === "ja" ? "ハッシュコピー" : "Hash Copied",
        this.currentLanguage === "ja"
          ? "ターゲットフィールドにコピーしました"
          : "Copied to target field"
      );
    }
  }

  startPasswordCrack() {
    const hash = document.getElementById("target-hash")?.value;
    const method = document.getElementById("attack-method")?.value;
    const progress = document.getElementById("crack-progress");

    if (!hash || !progress) return;

    const attackStarted =
      this.currentLanguage === "ja" ? "攻撃開始" : "Attack started";
    const target = this.currentLanguage === "ja" ? "ターゲット" : "Target";
    const progressText =
      this.currentLanguage === "ja" ? "進行状況" : "Progress";

    progress.innerHTML = `
            <div style="color: #ff0040;">${attackStarted}: ${method}</div>
            <div style="color: #ffff00;">${target}: ${hash}</div>
            <div style="color: #00ff41;">${progressText}: 0%</div>
        `;

    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += Math.random() * 15;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(interval);

        // このハッシュにマッチするパスワードを見つける
        let foundPassword = null;
        for (const [password, storedHash] of Object.entries(
          this.passwordHashes
        )) {
          if (storedHash === hash) {
            foundPassword = password;
            break;
          }
        }

        const successText =
          this.currentLanguage === "ja"
            ? "✅ 攻撃成功!"
            : "✅ Attack successful!";
        const passwordText =
          this.currentLanguage === "ja" ? "パスワード" : "Password";

        if (foundPassword) {
          progress.innerHTML += `
                        <div style="color: #00ff00; margin-top: 1rem;">${successText}</div>
                        <div style="color: #00ff00;">${passwordText}: ${foundPassword}</div>
                    `;
        } else {
          // デモ目的のフォールバック
          const fallbackPassword =
            hash === "5f4dcc3b5aa765d61d8327deb882cf99"
              ? "password"
              : hash === "21232f297a57a5a743894a0e4a801fc3"
              ? "admin"
              : hash === "e10adc3949ba59abbe56e057f20f883e"
              ? "123456"
              : hash === "482c811da5d5b4bc6d497ffa98491e38"
              ? "password123"
              : hash === "456789abcdef0123456789abcdef0123"
              ? "f15dfvc3"
              : "unknown";

          progress.innerHTML += `
                        <div style="color: #00ff00; margin-top: 1rem;">${successText}</div>
                        <div style="color: #00ff00;">${passwordText}: ${fallbackPassword}</div>
                    `;
        }

        this.unlockAchievement(
          "password-crack",
          "パスワードクラッカー",
          "パスワードの解読に成功",
          "Password Cracker",
          "Successfully cracked a password"
        );
      } else {
        progress.querySelector(
          "div:last-child"
        ).textContent = `${progressText}: ${Math.floor(progressValue)}%`;
      }
    }, 500);
  }

  startPortScan() {
    const targetIP = document.getElementById("target-ip")?.value;
    const results = document.getElementById("scan-results");

    if (!results) return;

    const scanStartText =
      this.currentLanguage === "ja"
        ? "ポートスキャン開始"
        : "Port scan started";
    results.innerHTML = `${scanStartText}: ${targetIP}\n`;

    const ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995];
    let index = 0;

    const interval = setInterval(() => {
      if (index < ports.length) {
        const port = ports[index];
        const status =
          Math.random() > 0.7
            ? this.currentLanguage === "ja"
              ? "オープン"
              : "OPEN"
            : this.currentLanguage === "ja"
            ? "クローズド"
            : "CLOSED";
        const color =
          status === "オープン" || status === "OPEN" ? "#00ff00" : "#ff0040";
        const portText = this.currentLanguage === "ja" ? "ポート" : "Port";
        results.innerHTML += `<span style="color: ${color}">${portText} ${port}: ${status}</span>\n`;
        index++;
      } else {
        clearInterval(interval);
        const completedText =
          this.currentLanguage === "ja"
            ? "✅ スキャン完了"
            : "✅ Scan completed";
        results.innerHTML += `\n${completedText}`;
        this.unlockAchievement(
          "port-scan",
          "ポートスキャナー",
          "ネットワークスキャンを実行",
          "Port Scanner",
          "Executed a network scan"
        );
      }
    }, 300);
  }

  startVulnScan() {
    const results = document.getElementById("scan-results");
    if (!results) return;

    const scanStartText =
      this.currentLanguage === "ja"
        ? "脆弱性スキャン開始..."
        : "Vulnerability scan starting...";
    results.innerHTML = `${scanStartText}\n`;

    const vulns =
      this.currentLanguage === "ja"
        ? [
            "CVE-2021-44228 (Log4Shell) - 重大",
            "CVE-2021-34527 (PrintNightmare) - 高",
            "CVE-2020-1472 (Zerologon) - 重大",
            "CVE-2019-0708 (BlueKeep) - 高",
          ]
        : [
            "CVE-2021-44228 (Log4Shell) - CRITICAL",
            "CVE-2021-34527 (PrintNightmare) - HIGH",
            "CVE-2020-1472 (Zerologon) - CRITICAL",
            "CVE-2019-0708 (BlueKeep) - HIGH",
          ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < vulns.length) {
        results.innerHTML += `🔍 ${vulns[index]}\n`;
        index++;
      } else {
        clearInterval(interval);
        const completedText =
          this.currentLanguage === "ja"
            ? "⚠️ 脆弱性検出完了"
            : "⚠️ Vulnerability detection completed";
        results.innerHTML += `\n${completedText}`;
      }
    }, 800);
  }

  startPenetrationTest() {
    const results = document.getElementById("scan-results");
    if (!results) return;

    const targetIP =
      document.getElementById("target-ip")?.value || "192.168.1.100";

    const testStartText =
      this.currentLanguage === "ja"
        ? "侵入テスト開始..."
        : "Penetration test starting...";
    results.innerHTML = `${testStartText}\n`;

    const steps =
      this.currentLanguage === "ja"
        ? [
            `[1/5] 情報収集: ${targetIP} のスキャン中...`,
            `[2/5] 脆弱性分析: 検出された脆弱性を分析中...`,
            `[3/5] 侵入試行: CVE-2021-44228 (Log4Shell) を利用した侵入を試行中...`,
            `[4/5] 権限昇格: root権限の取得を試行中...`,
            `[5/5] データ抽出: 機密情報の抽出中...`,
          ]
        : [
            `[1/5] Reconnaissance: Scanning ${targetIP}...`,
            `[2/5] Vulnerability Analysis: Analyzing detected vulnerabilities...`,
            `[3/5] Exploitation: Attempting exploitation using CVE-2021-44228 (Log4Shell)...`,
            `[4/5] Privilege Escalation: Attempting to gain root privileges...`,
            `[5/5] Data Exfiltration: Extracting sensitive information...`,
          ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length) {
        results.innerHTML += `${steps[index]}\n`;

        // 各ステップに成功メッセージを追加
        setTimeout(() => {
          const successText =
            this.currentLanguage === "ja" ? "成功" : "SUCCESS";
          results.innerHTML = results.innerHTML.replace(
            steps[index],
            `${steps[index]} [${successText}]`
          );
        }, 800);

        index++;
      } else {
        clearInterval(interval);
        const completedText =
          this.currentLanguage === "ja"
            ? "⚠️ 侵入成功! システムは完全に侵害されました。\n\n管理者権限を取得: root@" +
              targetIP
            : "⚠️ Penetration successful! System fully compromised.\n\nAdministrator access gained: root@" +
              targetIP;
        results.innerHTML += `\n${completedText}`;

        this.unlockAchievement(
          "penetration-master",
          "侵入テスト達人",
          "システムへの完全侵入に成功",
          "Penetration Master",
          "Successfully gained full system access"
        );
      }
    }, 2000);
  }

  setCryptoMode(mode) {
    const encryptBtn = document.getElementById("encrypt-mode-btn");
    const decryptBtn = document.getElementById("decrypt-mode-btn");
    const processBtn = document.getElementById("crypto-process-btn");

    if (!encryptBtn || !decryptBtn || !processBtn) return;

    if (mode === "encrypt") {
      encryptBtn.style.background = "rgba(0, 255, 65, 0.2)";
      encryptBtn.style.borderColor = "#00ff41";
      encryptBtn.style.color = "#00ff41";

      decryptBtn.style.background = "rgba(255, 0, 64, 0.1)";
      decryptBtn.style.borderColor = "#ff0040";
      decryptBtn.style.color = "#ff0040";

      processBtn.textContent =
        this.currentLanguage === "ja" ? "暗号化" : "Encrypt";
    } else {
      decryptBtn.style.background = "rgba(0, 255, 65, 0.2)";
      decryptBtn.style.borderColor = "#00ff41";
      decryptBtn.style.color = "#00ff41";

      encryptBtn.style.background = "rgba(255, 0, 64, 0.1)";
      encryptBtn.style.borderColor = "#ff0040";
      encryptBtn.style.color = "#ff0040";

      processBtn.textContent =
        this.currentLanguage === "ja" ? "復号化" : "Decrypt";
    }

    // 現在のモードを保存
    this.cryptoMode = mode;
  }

  updateCryptoInterface() {
    const method = document.getElementById("crypto-method")?.value;
    const shiftContainer = document.getElementById("shift-amount-container");

    if (!shiftContainer) return;

    // シーザー暗号の場合のみシフト量を表示
    if (method === "caesar") {
      shiftContainer.style.display = "block";
    } else {
      shiftContainer.style.display = "none";
    }
  }

  copyCryptoSample(text, method) {
    const cryptoText = document.getElementById("crypto-text");
    const cryptoMethod = document.getElementById("crypto-method");

    if (!cryptoText || !cryptoMethod) return;

    cryptoText.value = text;

    // 適切なメソッドを設定
    if (method === "caesar") {
      cryptoMethod.value = "caesar";
      // 復号化モードを設定
      this.setCryptoMode("decrypt");
    } else if (method === "base64") {
      cryptoMethod.value = "base64";
      this.setCryptoMode("decrypt");
    } else if (method === "rot13") {
      cryptoMethod.value = "rot13";
      this.setCryptoMode("decrypt");
    } else if (method === "morse") {
      cryptoMethod.value = "morse";
      this.setCryptoMode("decrypt");
    }

    this.updateCryptoInterface();

    this.showNotification(
      this.currentLanguage === "ja" ? "暗号文コピー" : "Cipher Text Copied",
      this.currentLanguage === "ja"
        ? "入力フィールドにコピーしました"
        : "Copied to input field"
    );
  }

  processCrypto() {
    const text = document.getElementById("crypto-text")?.value;
    const method = document.getElementById("crypto-method")?.value;
    const result = document.getElementById("crypto-result");

    if (!text || !result) return;

    let processed = "";
    const mode = this.cryptoMode || "encrypt";

    if (mode === "encrypt") {
      switch (method) {
        case "caesar":
          const shiftAmount = parseInt(
            document.getElementById("shift-amount")?.value || "3"
          );
          processed = this.caesarEncrypt(text, shiftAmount);
          break;
        case "base64":
          try {
            processed = btoa(text);
          } catch (e) {
            processed =
              this.currentLanguage === "ja"
                ? "Base64エンコードエラー"
                : "Base64 encode error";
          }
          break;
        case "rot13":
          processed = this.rot13(text);
          break;
        case "morse":
          processed = this.morseEncrypt(text);
          break;
        case "binary":
          processed = this.binaryEncrypt(text);
          break;
      }
    } else {
      switch (method) {
        case "caesar":
          const shiftAmount = parseInt(
            document.getElementById("shift-amount")?.value || "3"
          );
          processed = this.caesarDecrypt(text, shiftAmount);
          break;
        case "base64":
          try {
            processed = atob(text);
          } catch (e) {
            processed =
              this.currentLanguage === "ja"
                ? "Base64デコードエラー"
                : "Base64 decode error";
          }
          break;
        case "rot13":
          processed = this.rot13(text);
          break;
        case "morse":
          processed = this.morseDecrypt(text);
          break;
        case "binary":
          processed = this.binaryDecrypt(text);
          break;
      }
    }

    const resultText =
      mode === "encrypt"
        ? this.currentLanguage === "ja"
          ? "暗号化結果"
          : "Encryption result"
        : this.currentLanguage === "ja"
        ? "復号化結果"
        : "Decryption result";

    result.innerHTML = `
            <div style="color: #00ff41;">${resultText}:</div>
            <div style="color: #00ff00; margin-top: 0.5rem;">${processed}</div>
        `;

    this.unlockAchievement(
      "crypto-master",
      "暗号解読者",
      "暗号の処理に成功",
      "Crypto Master",
      "Successfully processed a cipher"
    );
  }

  caesarEncrypt(text, shift) {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.charCodeAt(0) < 97 ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + shift) % 26) + base
      );
    });
  }

  caesarDecrypt(text, shift) {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.charCodeAt(0) < 97 ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base - shift + 26) % 26) + base
      );
    });
  }

  rot13(text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char.charCodeAt(0) < 97 ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + 13) % 26) + base
      );
    });
  }

  morseEncrypt(text) {
    const morseCode = {
      A: ".-",
      B: "-...",
      C: "-.-.",
      D: "-..",
      E: ".",
      F: "..-.",
      G: "--.",
      H: "....",
      I: "..",
      J: ".---",
      K: "-.-",
      L: ".-..",
      M: "--",
      N: "-.",
      O: "---",
      P: ".--.",
      Q: "--.-",
      R: ".-.",
      S: "...",
      T: "-",
      U: "..-",
      V: "...-",
      W: ".--",
      X: "-..-",
      Y: "-.--",
      Z: "--..",
      0: "-----",
      1: ".----",
      2: "..---",
      3: "...--",
      4: "....-",
      5: ".....",
      6: "-....",
      7: "--...",
      8: "---..",
      9: "----.",
      " ": "/",
    };

    return text
      .toUpperCase()
      .split("")
      .map((char) => morseCode[char] || char)
      .join(" ");
  }

  morseDecrypt(text) {
    const morseCode = {
      ".-": "A",
      "-...": "B",
      "-.-.": "C",
      "-..": "D",
      ".": "E",
      "..-.": "F",
      "--.": "G",
      "....": "H",
      "..": "I",
      ".---": "J",
      "-.-": "K",
      ".-..": "L",
      "--": "M",
      "-.": "N",
      "---": "O",
      ".--.": "P",
      "--.-": "Q",
      ".-.": "R",
      "...": "S",
      "-": "T",
      "..-": "U",
      "...-": "V",
      ".--": "W",
      "-..-": "X",
      "-.--": "Y",
      "--..": "Z",
      "-----": "0",
      ".----": "1",
      "..---": "2",
      "...--": "3",
      "....-": "4",
      ".....": "5",
      "-....": "6",
      "--...": "7",
      "---..": "8",
      "----.": "9",
      "/": " ",
    };

    return text
      .split(" ")
      .map((code) => morseCode[code] || code)
      .join("");
  }

  binaryEncrypt(text) {
    return text
      .split("")
      .map((char) => {
        const binary = char.charCodeAt(0).toString(2);
        return "0".repeat(8 - binary.length) + binary;
      })
      .join(" ");
  }

  binaryDecrypt(text) {
    return text
      .split(" ")
      .map((bin) => {
        const num = parseInt(bin, 2);
        return num ? String.fromCharCode(num) : "";
      })
      .join("");
  }

  copySQLPayload(payload) {
    const sqlPayload = document.getElementById("sql-payload");
    if (sqlPayload) {
      sqlPayload.value = payload;
      this.showNotification(
        this.currentLanguage === "ja" ? "ペイロードコピー" : "Payload Copied",
        this.currentLanguage === "ja"
          ? "入力フィールドにコピーしました"
          : "Copied to input field"
      );
    }
  }

  executeSQLInjection() {
    const url = document.getElementById("target-url")?.value;
    const payload = document.getElementById("sql-payload")?.value;
    const results = document.getElementById("sql-results");

    if (!results) return;

    const attackStarted =
      this.currentLanguage === "ja"
        ? "SQL Injection 攻撃開始"
        : "SQL Injection Attack Started";
    const targetText = this.currentLanguage === "ja" ? "ターゲット" : "Target";
    const payloadText =
      this.currentLanguage === "ja" ? "ペイロード" : "Payload";
    const executingText =
      this.currentLanguage === "ja"
        ? "インジェクション実行中..."
        : "Executing injection...";
    const testingText =
      this.currentLanguage === "ja"
        ? "SQLインジェクションの脆弱性をテスト中"
        : "Testing for SQL injection vulnerabilities";
    const successText =
      this.currentLanguage === "ja" ? "脆弱性を発見！" : "Vulnerability found!";
    const extractingText =
      this.currentLanguage === "ja"
        ? "データベース情報を抽出中..."
        : "Extracting database information...";
    const databaseText =
      this.currentLanguage === "ja" ? "データベース" : "Database";
    const tablesText = this.currentLanguage === "ja" ? "テーブル" : "Tables";
    const userDataText =
      this.currentLanguage === "ja"
        ? "ユーザーデータ抽出"
        : "User Data Extracted";
    const successfulText =
      this.currentLanguage === "ja"
        ? "⚠️ インジェクション成功！データベース侵害完了。"
        : "⚠️ Injection successful! Database compromised.";

    results.innerHTML = `
${attackStarted}
${targetText}: ${url}
${payloadText}: ${payload}

${executingText}
[INFO] ${testingText}
[SUCCESS] ${successText}
[INFO] ${extractingText}

${databaseText}: company_db
${tablesText}: users, products, orders, admin

${userDataText}:
+----+----------+------------------+----------+
| ID | Username | Email            | Password |
+----+----------+------------------+----------+
| 1  | admin    | admin@company.com| admin123 |
| 2  | user1    | user1@email.com  | pass456  |
| 3  | user2    | user2@email.com  | secret789|
+----+----------+------------------+----------+

${successfulText}
        `;

    this.unlockAchievement(
      "sql-ninja",
      "SQLインジェクション",
      "データベース侵入に成功",
      "SQL Ninja",
      "Successfully penetrated a database"
    );
  }

  generateSocialAttack() {
    const attackType = document.getElementById("social-attack")?.value;
    const target =
      document.getElementById("target-info")?.value ||
      (this.currentLanguage === "ja" ? "ターゲット" : "Target");
    const scenario = document.getElementById("social-scenario");

    if (!scenario) return;

    const scenarios = {
      phishing:
        this.currentLanguage === "ja"
          ? `
📧 フィッシングメール生成

件名: 【緊急】${target}様のアカウントセキュリティ確認

${target}様

お客様のアカウントで不審なログイン試行が検出されました。
セキュリティ確保のため、以下のリンクから本人確認を行ってください。

🔗 https://secure-verification-${target.toLowerCase()}.com/verify

※24時間以内に確認されない場合、アカウントが一時停止されます。

カスタマーサポート
            `
          : `
📧 Phishing Email Generated

Subject: [URGENT] Security Verification for ${target}'s Account

Dear ${target},

We have detected suspicious login attempts on your account.
For security purposes, please verify your identity through the link below.

🔗 https://secure-verification-${target.toLowerCase()}.com/verify

Note: Your account may be temporarily suspended if not verified within 24 hours.

Customer Support
            `,
      pretexting:
        this.currentLanguage === "ja"
          ? `
📞 プリテキスティング シナリオ

「こんにちは、${target}様。私はIT部門の田中と申します。
現在システムメンテナンスを行っており、お客様のアカウント情報の
確認が必要となっております。

セキュリティのため、現在お使いのパスワードを
お聞かせいただけますでしょうか？」

心理的圧力: 緊急性、権威性を利用
            `
          : `
📞 Pretexting Scenario

"Hello, ${target}. This is Smith from the IT department.
We're currently performing system maintenance and need to
verify your account information.

For security purposes, could you please confirm
your current password?"

Psychological pressure: Using urgency and authority
            `,
      baiting:
        this.currentLanguage === "ja"
          ? `
💾 ベイティング攻撃

USB デバイス設置場所: ${target}のオフィス駐車場
ラベル: "給与情報_機密_2024.xlsx"

内容: 
- 魅力的なファイル名で好奇心を刺激
- 実行時にマルウェアを展開
- キーロガーとバックドアを設置

成功率: 約60-70%
            `
          : `
💾 Baiting Attack

USB Device Placement: ${target}'s office parking lot
Label: "Salary_Confidential_2024.xlsx"

Contents:
- Stimulates curiosity with attractive filename
- Deploys malware when executed
- Installs keylogger and backdoor

Success rate: Approximately 60-70%
            `,
      "quid-pro-quo":
        this.currentLanguage === "ja"
          ? `
🎁 見返り攻撃 (Quid Pro Quo)

「${target}様、おめでとうございます！
抽選に当選されました。賞品を受け取るには
以下の情報が必要です：

- 氏名
- 生年月日  
- 電話番号
- 勤務先

賞品: 最新スマートフォン (10万円相当)」

心理的要因: 欲望、希少性を利用
            `
          : `
🎁 Quid Pro Quo Attack

"Congratulations, ${target}!
You've won our prize drawing. To receive your prize,
we need the following information:

- Full name
- Date of birth
- Phone number
- Workplace

Prize: Latest smartphone (worth $1,000)"

Psychological factors: Exploiting desire and scarcity
            `,
    };

    scenario.innerHTML =
      scenarios[attackType] ||
      (this.currentLanguage === "ja"
        ? "シナリオ生成エラー"
        : "Scenario generation error");
    this.unlockAchievement(
      "social-engineer",
      "ソーシャルエンジニア",
      "心理的攻撃を設計",
      "Social Engineer",
      "Designed a psychological attack"
    );
  }

  generateMalware() {
    const type = document.getElementById("malware-type")?.value;
    const os = document.getElementById("target-os")?.value;
    const code = document.getElementById("malware-code");

    if (!code) return;

    const malwareCode = {
      virus:
        this.currentLanguage === "ja"
          ? `
// ウイルス シミュレーション コード (教育目的)
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    printf("🦠 ウイルス シミュレーション\\n");
    printf("ターゲットOS: ${os}\\n");
    
    // ファイル感染シミュレーション
    printf("📁 実行ファイルをスキャン中...\\n");
    printf("🔍 .exe ファイル発見: 127個\\n");
    printf("💉 感染処理開始...\\n");
    
    for(int i = 0; i < 127; i++) {
        printf("感染: file_%d.exe\\n", i);
    }
    
    printf("✅ 感染完了\\n");
    return 0;
}

⚠️ これは教育目的のシミュレーションです
            `
          : `
// ウイルス シミュレーション コード (教育目的のみ)
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    printf("🦠 Virus Simulation\\n");
    printf("Target OS: ${os}\\n");
    
    // ファイル感染シミュレーション
    printf("📁 Scanning executable files...\\n");
    printf("🔍 .exe files found: 127\\n");
    printf("💉 Starting infection process...\\n");
    
    for(int i = 0; i < 127; i++) {
        printf("Infected: file_%d.exe\\n", i);
    }
    
    printf("✅ Infection complete\\n");
    return 0;
}

⚠️ This is a simulation for educational purposes only
            `,
      trojan:
        this.currentLanguage === "ja"
          ? `
// トロイの木馬 シミュレーション
import os
import socket
import subprocess

class TrojanSimulator:
    def __init__(self):
        self.target_os = "${os}"
        self.backdoor_port = 4444
        
    def disguise_as_game(self):
        print("🎮 ゲーム起動中...")
        print("📦 リソース読み込み...")
        # 正常なゲームのふりをする
        
    def establish_backdoor(self):
        print("🚪 バックドア設置中...")
        print(f"📡 ポート {self.backdoor_port} で待機")
        # 秘密の通信チャネル確立
        
    def steal_data(self):
        print("📄 機密ファイル検索中...")
        print("💳 クレジットカード情報: 発見")
        print("🔑 パスワード: 発見")
        
trojan = TrojanSimulator()
trojan.disguise_as_game()
trojan.establish_backdoor()
trojan.steal_data()
            `
          : `
// トロイの木馬 シミュレーション
import os
import socket
import subprocess

class TrojanSimulator:
    def __init__(self):
        self.target_os = "${os}"
        self.backdoor_port = 4444
        
    def disguise_as_game(self):
        print("🎮 Starting game...")
        print("📦 Loading resources...")
        # Pretending to be a legitimate game
        
    def establish_backdoor(self):
        print("🚪 Setting up backdoor...")
        print(f"📡 Listening on port {self.backdoor_port}")
        # Establishing covert communication channel
        
    def steal_data(self):
        print("📄 Searching for sensitive files...")
        print("💳 Credit card information: Found")
        print("🔑 Passwords: Found")
        
trojan = TrojanSimulator()
trojan.disguise_as_game()
trojan.establish_backdoor()
trojan.steal_data()
            `,
      ransomware:
        this.currentLanguage === "ja"
          ? `
// ランサムウェア シミュレーション
using System;
using System.IO;
using System.Security.Cryptography;

class RansomwareSimulator {
    static void Main() {
        Console.WriteLine("🔒 ランサムウェア シミュレーション");
        Console.WriteLine("ターゲット: ${os}");
        
        // ファイル暗号化シミュレーション
        string[] targetExtensions = {".doc", ".pdf", ".jpg", ".mp4"};
        
        Console.WriteLine("🔍 ファイルスキャン開始...");
        foreach(string ext in targetExtensions) {
            Console.WriteLine($"暗号化: *{ext} ファイル");
        }
        
        Console.WriteLine("💰 身代金要求メッセージ表示");
        Console.WriteLine("Bitcoin: 1BTC 要求");
        Console.WriteLine("⏰ 72時間以内に支払い");
    }
}

⚠️ 実際のランサムウェア作成は重大な犯罪です
            `
          : `
// ランサムウェア シミュレーション
using System;
using System.IO;
using System.Security.Cryptography;

class RansomwareSimulator {
    static void Main() {
        Console.WriteLine("🔒 Ransomware Simulation");
        Console.WriteLine("Target: ${os}");
        
        // ファイル暗号化シミュレーション
        string[] targetExtensions = {".doc", ".pdf", ".jpg", ".mp4"};
        
        Console.WriteLine("🔍 Starting file scan...");
        foreach(string ext in targetExtensions) {
            Console.WriteLine($"Encrypting: *{ext} files");
        }
        
        Console.WriteLine("💰 Displaying ransom message");
        Console.WriteLine("Bitcoin: 1BTC demanded");
        Console.WriteLine("⏰ Payment required within 72 hours");
    }
}

⚠️ Creating actual ransomware is a serious crime
            `,
    };

    code.innerHTML =
      malwareCode[type] ||
      (this.currentLanguage === "ja"
        ? "コード生成エラー"
        : "Code generation error");
    this.unlockAchievement(
      "malware-dev",
      "マルウェア開発者",
      "マルウェアコードを生成",
      "Malware Developer",
      "Generated malware code"
    );
  }

  scanWiFiNetworks() {
    const networks = document.getElementById("wifi-networks");
    if (!networks) return;

    const scanningText =
      this.currentLanguage === "ja"
        ? "WiFiネットワークスキャン中...\n\n"
        : "Scanning WiFi networks...\n\n";
    networks.innerHTML = scanningText;

    const wifiNetworks = [
      { ssid: "HOME_WIFI_5G", security: "WPA2", signal: -45, channel: 6 },
      {
        ssid: "Office_Network",
        security: "WPA2-Enterprise",
        signal: -52,
        channel: 11,
      },
      { ssid: "FreeWiFi", security: "Open", signal: -38, channel: 1 },
      { ssid: "NETGEAR_2.4G", security: "WEP", signal: -67, channel: 3 },
      { ssid: "iPhone_Hotspot", security: "WPA2", signal: -71, channel: 9 },
    ];

    setTimeout(() => {
      const resultsText =
        this.currentLanguage === "ja"
          ? "スキャン結果:\n\n"
          : "Scan results:\n\n";
      const headerText =
        this.currentLanguage === "ja"
          ? "SSID                 Security        Signal  Ch\n"
          : "SSID                 Security        Signal  Ch\n";
      const dividerText = "================================================\n";

      networks.innerHTML = resultsText + headerText + dividerText;

      wifiNetworks.forEach((network) => {
        const securityColor =
          network.security === "Open"
            ? "#ff0040"
            : network.security === "WEP"
            ? "#ffff00"
            : "#00ff41";
        networks.innerHTML += `<span style="color: ${securityColor}">${network.ssid.padEnd(
          20
        )} ${network.security.padEnd(15)} ${network.signal}dBm  ${
          network.channel
        }</span>\n`;
      });

      const completedText =
        this.currentLanguage === "ja"
          ? "\n✅ スキャン完了"
          : "\n✅ Scan completed";
      networks.innerHTML += completedText;
    }, 2000);
  }

  executeWiFiAttack() {
    const attackType = document.getElementById("wifi-attack")?.value;
    const result = document.getElementById("wifi-attack-result");

    if (!result) return;

    const attacks =
      this.currentLanguage === "ja"
        ? {
            "wpa-crack":
              '🔓 WPA2ハンドシェイク取得中...\n✅ 辞書攻撃でパスワード解読: "password123"',
            "evil-twin":
              '📡 偽アクセスポイント "FreeWiFi_Secure" 設置完了\n👥 3台のデバイスが接続',
            deauth: "💥 認証解除パケット送信中...\n📱 5台のデバイスを強制切断",
            "packet-sniff":
              "📦 パケット傍受開始...\n🔍 HTTP通信を検出\n📄 ログイン情報を取得",
          }
        : {
            "wpa-crack":
              '🔓 Capturing WPA2 handshake...\n✅ Password cracked with dictionary attack: "password123"',
            "evil-twin":
              '📡 Fake access point "FreeWiFi_Secure" set up\n👥 3 devices connected',
            deauth:
              "💥 Sending deauthentication packets...\n📱 Forced disconnection of 5 devices",
            "packet-sniff":
              "📦 Starting packet interception...\n🔍 HTTP traffic detected\n📄 Login credentials captured",
          };

    result.innerHTML =
      attacks[attackType] ||
      (this.currentLanguage === "ja" ? "攻撃エラー" : "Attack error");
    this.unlockAchievement(
      "wifi-hacker",
      "WiFiハッカー",
      "無線ネットワーク攻撃を実行",
      "WiFi Hacker",
      "Executed a wireless network attack"
    );
  }

  executeForensicsAction() {
    const action = document.getElementById("forensics-action")?.value;
    const path = document.getElementById("target-path")?.value;
    const result = document.getElementById("forensics-result");

    if (!result) return;

    const executingText =
      this.currentLanguage === "ja"
        ? "証拠隠滅実行中..."
        : "Executing evidence elimination...";
    const targetText = this.currentLanguage === "ja" ? "ターゲット" : "Target";

    result.innerHTML = `${executingText}\n${targetText}: ${path}\n\n`;

    const actions =
      this.currentLanguage === "ja"
        ? {
            "log-clear": `
# ログ削除実行
rm -rf /var/log/auth.log
rm -rf /var/log/syslog
rm -rf ~/.bash_history

# Windows イベントログ削除
wevtutil cl Security
wevtutil cl System
wevtutil cl Application

✅ ログ削除完了
            `,
            "file-wipe": `
# ファイル完全削除 (35回上書き)
shred -vfz -n 35 ${path}

# Windows での完全削除
sdelete -p 35 -s -z ${path}

✅ ファイル復元不可能な状態で削除完了
            `,
            "timestamp-modify": `
# タイムスタンプ改ざん
touch -t 202001010000 ${path}
SetFile -d "01/01/2020 00:00:00" ${path}

# 作成日時: 2020/01/01 00:00:00
# 更新日時: 2020/01/01 00:00:00
# アクセス日時: 2020/01/01 00:00:00

✅ タイムスタンプ改ざん完了
            `,
            "metadata-clean": `
# メタデータ除去
exiftool -all= ${path}
mat2 ${path}

# 除去されたメタデータ:
- GPS位置情報
- カメラ機種
- 作成者情報
- 編集履歴

✅ メタデータ除去完了
            `,
          }
        : {
            "log-clear": `
# Executing log deletion
rm -rf /var/log/auth.log
rm -rf /var/log/syslog
rm -rf ~/.bash_history

# Windows event log deletion
wevtutil cl Security
wevtutil cl System
wevtutil cl Application

✅ Log deletion completed
            `,
            "file-wipe": `
# Secure file deletion (35 passes)
shred -vfz -n 35 ${path}

# Windows secure deletion
sdelete -p 35 -s -z ${path}

✅ File deleted in unrecoverable state
            `,
            "timestamp-modify": `
# Timestamp manipulation
touch -t 202001010000 ${path}
SetFile -d "01/01/2020 00:00:00" ${path}

# Creation date: 2020/01/01 00:00:00
# Modification date: 2020/01/01 00:00:00
# Access date: 2020/01/01 00:00:00

✅ Timestamp manipulation completed
            `,
            "metadata-clean": `
# Metadata removal
exiftool -all= ${path}
mat2 ${path}

# Removed metadata:
- GPS location information
- Camera model
- Author information
- Edit history

✅ Metadata removal completed
            `,
          };

    setTimeout(() => {
      result.innerHTML +=
        actions[action] ||
        (this.currentLanguage === "ja"
          ? "アクション実行エラー"
          : "Action execution error");
      this.unlockAchievement(
        "forensics-expert",
        "フォレンジック専門家",
        "証拠隠滅を実行",
        "Forensics Expert",
        "Executed evidence elimination"
      );
    }, 1500);
  }

  startSystemMonitoring() {
    this.updateSystemStats();
    this.generateConnections();
    this.generateAlerts();

    setInterval(() => {
      this.updateSystemStats();
      this.generateConnections();
      this.generateAlerts();
    }, 5000);
  }

  updateSystemStats() {
    this.systemStats.cpu = Math.max(
      20,
      Math.min(95, this.systemStats.cpu + (Math.random() - 0.5) * 10)
    );
    this.systemStats.memory = Math.max(
      20,
      Math.min(90, this.systemStats.memory + (Math.random() - 0.5) * 8)
    );
    this.systemStats.network = Math.max(
      30,
      Math.min(100, this.systemStats.network + (Math.random() - 0.5) * 15)
    );

    // Update UI if elements exist
    const cpuFill = document.querySelector(
      ".status-item:first-child .status-fill"
    );
    const memoryFill = document.querySelector(
      ".status-item:nth-child(2) .status-fill"
    );
    const networkFill = document.querySelector(
      ".status-item:nth-child(3) .status-fill"
    );

    const cpuValue = document.querySelector(
      ".status-item:first-child .status-value"
    );
    const memoryValue = document.querySelector(
      ".status-item:nth-child(2) .status-value"
    );
    const networkValue = document.querySelector(
      ".status-item:nth-child(3) .status-value"
    );

    if (cpuFill) cpuFill.style.width = `${this.systemStats.cpu}%`;
    if (memoryFill) memoryFill.style.width = `${this.systemStats.memory}%`;
    if (networkFill) networkFill.style.width = `${this.systemStats.network}%`;

    if (cpuValue) cpuValue.textContent = `${Math.round(this.systemStats.cpu)}%`;
    if (memoryValue)
      memoryValue.textContent = `${Math.round(this.systemStats.memory)}%`;
    if (networkValue)
      networkValue.textContent = `${Math.round(this.systemStats.network)}%`;
  }

  generateConnections() {
    const connectionList = document.getElementById("connection-list");
    if (!connectionList) return;

    const connections = [
      "192.168.1.100:22 -> SSH",
      "10.0.0.5:443 -> HTTPS",
      "172.16.0.10:80 -> HTTP",
      "192.168.1.50:3389 -> RDP",
    ];

    connectionList.innerHTML = connections
      .map((conn) => `<div class="connection-item">${conn}</div>`)
      .join("");
  }

  generateAlerts() {
    const alertList = document.getElementById("alert-list");
    if (!alertList) return;

    const alerts =
      this.currentLanguage === "ja"
        ? [
            "⚠️ 不審なログイン試行検出",
            "🔥 ポートスキャン攻撃",
            "💀 マルウェア活動検出",
            "🚨 データ流出の可能性",
          ]
        : [
            "⚠️ Suspicious login attempt detected",
            "🔥 Port scan attack",
            "💀 Malware activity detected",
            "🚨 Potential data breach",
          ];

    alertList.innerHTML = alerts
      .map((alert) => `<div class="alert-item">${alert}</div>`)
      .join("");
  }

  initializeAchievements() {
    const achievementGrid = document.getElementById("achievement-grid");
    if (!achievementGrid) return;

    const achievements = [
      {
        id: "first-access",
        title_ja: "初回アクセス",
        description_ja: "危険な世界への第一歩",
        title_en: "First Access",
        description_en: "First step into a dangerous world",
        icon: "🚪",
      },
      {
        id: "tool-terminal",
        title_ja: "ターミナルマスター",
        description_ja: "Linuxコマンドを実行",
        title_en: "Terminal Master",
        description_en: "Executed Linux commands",
        icon: "💻",
      },
      {
        id: "password-crack",
        title_ja: "パスワードクラッカー",
        description_ja: "パスワードを解読",
        title_en: "Password Cracker",
        description_en: "Cracked a password",
        icon: "🔓",
      },
      {
        id: "port-scan",
        title_ja: "ポートスキャナー",
        description_ja: "ネットワークをスキャン",
        title_en: "Port Scanner",
        description_en: "Scanned a network",
        icon: "🔍",
      },
      {
        id: "penetration-master",
        title_ja: "侵入テスト達人",
        description_ja: "システムへの完全侵入",
        title_en: "Penetration Master",
        description_en: "Full system penetration",
        icon: "🛡️",
      },
      {
        id: "crypto-master",
        title_ja: "暗号解読者",
        description_ja: "暗号を解読",
        title_en: "Crypto Master",
        description_en: "Processed encryption/decryption",
        icon: "🔐",
      },
      {
        id: "sql-ninja",
        title_ja: "SQLニンジャ",
        description_ja: "データベースに侵入",
        title_en: "SQL Ninja",
        description_en: "Infiltrated a database",
        icon: "💉",
      },
      {
        id: "social-engineer",
        title_ja: "ソーシャルエンジニア",
        description_ja: "心理的攻撃を設計",
        title_en: "Social Engineer",
        description_en: "Designed a psychological attack",
        icon: "🎭",
      },
      {
        id: "malware-dev",
        title_ja: "マルウェア開発者",
        description_ja: "マルウェアを作成",
        title_en: "Malware Developer",
        description_en: "Created malware",
        icon: "🦠",
      },
      {
        id: "wifi-hacker",
        title_ja: "WiFiハッカー",
        description_ja: "無線ネットワークを攻撃",
        title_en: "WiFi Hacker",
        description_en: "Attacked a wireless network",
        icon: "📡",
      },
      {
        id: "forensics-expert",
        title_ja: "フォレンジック専門家",
        description_ja: "証拠を隠滅",
        title_en: "Forensics Expert",
        description_en: "Eliminated evidence",
        icon: "🔍",
      },
    ];

    achievementGrid.innerHTML = achievements
      .map(
        (achievement) => `
            <div class="achievement-item" id="achievement-${achievement.id}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title" data-ja="${
                  achievement.title_ja
                }" data-en="${achievement.title_en}">${
          this.currentLanguage === "ja"
            ? achievement.title_ja
            : achievement.title_en
        }</div>
                <div class="achievement-description" data-ja="${
                  achievement.description_ja
                }" data-en="${achievement.description_en}">${
          this.currentLanguage === "ja"
            ? achievement.description_ja
            : achievement.description_en
        }</div>
            </div>
        `
      )
      .join("");
  }

  unlockAchievement(id, titleJa, descriptionJa, titleEn, descriptionEn) {
    if (this.achievements.includes(id)) return;

    this.achievements.push(id);
    const achievementElement = document.getElementById(`achievement-${id}`);
    if (achievementElement) {
      achievementElement.classList.add("unlocked");
    }

    // Show notification
    const title = this.currentLanguage === "ja" ? titleJa : titleEn;
    const description =
      this.currentLanguage === "ja" ? descriptionJa : descriptionEn;
    this.showNotification(
      `🏆 ${
        this.currentLanguage === "ja" ? "実績解除" : "Achievement Unlocked"
      }: ${title}`,
      description
    );
  }

  showNotification(title, message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 65, 0.1);
            border: 2px solid #00ff41;
            color: #00ff41;
            padding: 1rem;
            z-index: 10001;
            font-family: 'JetBrains Mono', monospace;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            animation: slideIn 0.5s ease;
        `;

    notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 0.5rem;">${title}</div>
            <div style="font-size: 0.9rem;">${message}</div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.5s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }, 3000);
  }

  updateTime() {
    const timeElement = document.getElementById("current-time");
    if (timeElement) {
      const now = new Date();
      timeElement.textContent = now.toLocaleTimeString(
        this.currentLanguage === "ja" ? "ja-JP" : "en-US"
      );
    }
    setTimeout(() => this.updateTime(), 1000);
  }

  generateMatrixBackground() {
    const matrixBg = document.getElementById("matrix-bg");
    if (!matrixBg) return;

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    for (let i = 0; i < 50; i++) {
      const column = document.createElement("div");
      column.style.cssText = `
                position: absolute;
                top: -100px;
                left: ${Math.random() * 100}%;
                color: #00ff41;
                font-family: 'JetBrains Mono', monospace;
                font-size: 14px;
                animation: matrixFall ${3 + Math.random() * 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;

      let text = "";
      for (let j = 0; j < 20; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + "<br>";
      }
      column.innerHTML = text;

      matrixBg.appendChild(column);
    }
  }

  setupLanguageSwitching() {
    // Language toggle button
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      langToggle.textContent =
        this.currentLanguage === "ja" ? "🌐 EN" : "🌐 JA";

      // 既存のイベントリスナーをクリア
      langToggle.replaceWith(langToggle.cloneNode(true));
      const newLangToggle = document.getElementById("lang-toggle");

      newLangToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleLanguage();
      });
    }

    // Sync with main page language
    window.addEventListener("storage", (event) => {
      if (event.key === "preferredLanguage") {
        this.currentLanguage = event.newValue;
        this.applyCurrentLanguage();
        const langToggle = document.getElementById("lang-toggle");
        if (langToggle) {
          langToggle.textContent =
            this.currentLanguage === "ja" ? "🌐 EN" : "🌐 JA";
        }
      }
    });
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === "ja" ? "en" : "ja";
    localStorage.setItem("preferredLanguage", this.currentLanguage);

    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      langToggle.textContent =
        this.currentLanguage === "ja" ? "🌐 EN" : "🌐 JA";
    }

    this.applyCurrentLanguage();
  }

  applyCurrentLanguage() {
    // data-ja/data-en属性を持つ要素を全て切り替え
    document.querySelectorAll("[data-ja][data-en]").forEach((element) => {
      const newText =
        this.currentLanguage === "ja" ? element.dataset.ja : element.dataset.en;
      element.textContent = newText;

      // グリッチテキストの特別処理
      if (element.classList.contains("glitch-text")) {
        element.setAttribute("data-text", newText);
      }
    });

    // threat-valueなど個別IDも必要なら上書き
    const threatValue = document.getElementById("threat-value");
    if (threatValue) {
      threatValue.textContent =
        this.currentLanguage === "ja" ? "クリティカル" : "CRITICAL";
    }

    // lang-toggleボタンの表示も統一
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      langToggle.textContent =
        this.currentLanguage === "ja" ? "🌐 EN" : "🌐 JA";
    }
    // ...他に必要な個別要素があればここで切り替え
  }
}

// Initialize hacker simulator
let hackerSim;
document.addEventListener("DOMContentLoaded", () => {
  hackerSim = new HackerSimulator();
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
@keyframes matrixFall {
    to { transform: translateY(100vh); }
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;
document.head.appendChild(style);
window.hackerSim = new HackerSimulator();
