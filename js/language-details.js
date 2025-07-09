// 言語詳細ページの機能拡張
class LanguageDetailsEnhancer {
  constructor() {
    this.currentLanguage = localStorage.getItem("preferredLanguage") || "ja";
    this.init();
  }

  init() {
    this.addCodeCopyButtons();
    this.addCodeExecutionLinks();
    this.setupInteractiveFeatures();
    this.setupLanguageSwitching();
    this.applyCurrentLanguage();
    this.fixJavaScriptInteractivity();
  }

  addCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll(".code-block pre");

    codeBlocks.forEach((codeBlock) => {
      const copyButton = document.createElement("button");
      copyButton.className = "copy-code-btn";
      copyButton.innerHTML = "📋 コピー";
      copyButton.dataset.ja = "📋 コピー";
      copyButton.dataset.en = "📋 Copy";
      copyButton.style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                padding: 0.5rem 1rem;
                background: rgba(0, 255, 65, 0.1);
                border: 2px solid #00ff41;
                color: #00ff41;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.8rem;
                transition: all 0.3s ease;
                box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
                z-index: 10;
            `;

      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          copyButton.innerHTML =
            this.currentLanguage === "ja" ? "✅ コピー完了" : "✅ Copied";
          copyButton.style.color = "#00ff00";
          copyButton.style.borderColor = "#00ff00";

          setTimeout(() => {
            copyButton.innerHTML =
              this.currentLanguage === "ja" ? "📋 コピー" : "📋 Copy";
            copyButton.style.color = "#00ff41";
            copyButton.style.borderColor = "#00ff41";
          }, 2000);
        });
      });

      copyButton.addEventListener("mouseenter", () => {
        copyButton.style.background = "rgba(0, 255, 65, 0.2)";
        copyButton.style.boxShadow = "0 0 20px rgba(0, 255, 65, 0.5)";
        copyButton.style.transform = "scale(1.05)";
      });

      copyButton.addEventListener("mouseleave", () => {
        copyButton.style.background = "rgba(0, 255, 65, 0.1)";
        copyButton.style.boxShadow = "0 0 10px rgba(0, 255, 65, 0.3)";
        copyButton.style.transform = "scale(1)";
      });

      const codeContainer = codeBlock.closest(".code-block");
      if (codeContainer) {
        codeContainer.style.position = "relative";
        codeContainer.appendChild(copyButton);
      }
    });
  }

  addCodeExecutionLinks() {
    const languageMap = {
      java: "java",
      javascript: "javascript",
      python: "python3",
      c: "c",
      cpp: "cpp",
      csharp: "csharp",
      php: "php",
      ruby: "ruby",
      go: "go",
      kotlin: "kotlin",
      swift: "swift",
      rust: "rust",
      typescript: "typescript",
      cobol: "cobol",
      visualbasic: "vb",
      sql: "mysql",
    };

    // ページのURLから言語を判定
    const currentPage = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "");
    const paizaLanguage = languageMap[currentPage];

    if (paizaLanguage) {
      const paizaSection = document.createElement("div");
      paizaSection.className = "detail-section";
      paizaSection.innerHTML = `
                <h2 data-ja="オンライン実行環境" data-en="Online Execution Environment">オンライン実行環境</h2>
                <p style="color: #00cc33; margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace;" data-ja="paiza.ioでサンプルコードを実際に実行してみましょう。" data-en="Try running the sample code on paiza.io.">
                    paiza.ioでサンプルコードを実際に実行してみましょう。
                </p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="https://paiza.io/ja/projects/new?language=${paizaLanguage}" 
                       target="_blank" 
                       class="paiza-link"
                       style="display: inline-block; padding: 1rem 2rem; background: rgba(0, 255, 65, 0.1); border: 2px solid #00ff41; color: #00ff41; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 0 15px rgba(0, 255, 65, 0.3); font-family: 'JetBrains Mono', monospace;"
                       data-ja="🚀 paiza.ioで実行" data-en="🚀 Run on paiza.io">
                        🚀 paiza.ioで実行
                    </a>
                    <button id="copy-sample-code" 
                            class="paiza-link"
                            style="padding: 1rem 2rem; background: rgba(255, 255, 0, 0.1); border: 2px solid #ffff00; color: #ffff00; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 0 15px rgba(255, 255, 0, 0.3); font-family: 'JetBrains Mono', monospace;"
                            data-ja="📋 サンプルコードをコピー" data-en="📋 Copy Sample Code">
                        📋 サンプルコードをコピー
                    </button>
                </div>
            `;

      // サンプルコードセクションの後に挿入
      const codeSection = document.querySelector(
        ".detail-section:has(.code-block)"
      );
      if (codeSection && codeSection.nextElementSibling) {
        codeSection.parentNode.insertBefore(
          paizaSection,
          codeSection.nextElementSibling
        );
      } else if (codeSection) {
        codeSection.parentNode.appendChild(paizaSection);
      }

      // サンプルコードコピー機能
      const copySampleBtn = document.getElementById("copy-sample-code");
      if (copySampleBtn) {
        copySampleBtn.addEventListener("click", () => {
          const codeBlock = document.querySelector(".code-block pre");
          if (codeBlock) {
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
              copySampleBtn.innerHTML =
                this.currentLanguage === "ja" ? "✅ コピー完了" : "✅ Copied";
              copySampleBtn.style.color = "#00ff00";
              copySampleBtn.style.borderColor = "#00ff00";

              setTimeout(() => {
                copySampleBtn.innerHTML =
                  this.currentLanguage === "ja"
                    ? "📋 サンプルコードをコピー"
                    : "📋 Copy Sample Code";
                copySampleBtn.style.color = "#ffff00";
                copySampleBtn.style.borderColor = "#ffff00";
              }, 2000);
            });
          }
        });
      }

      // ホバーエフェクト
      const paizaLinks = document.querySelectorAll(".paiza-link");
      paizaLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          link.style.transform = "scale(1.05)";
          if (link.style.borderColor === "rgb(0, 255, 65)") {
            link.style.background = "rgba(0, 255, 65, 0.2)";
            link.style.boxShadow = "0 0 25px rgba(0, 255, 65, 0.5)";
          } else {
            link.style.background = "rgba(255, 255, 0, 0.2)";
            link.style.boxShadow = "0 0 25px rgba(255, 255, 0, 0.5)";
          }
        });

        link.addEventListener("mouseleave", () => {
          link.style.transform = "scale(1)";
          if (link.style.borderColor === "rgb(0, 255, 65)") {
            link.style.background = "rgba(0, 255, 65, 0.1)";
            link.style.boxShadow = "0 0 15px rgba(0, 255, 65, 0.3)";
          } else {
            link.style.background = "rgba(255, 255, 0, 0.1)";
            link.style.boxShadow = "0 0 15px rgba(255, 255, 0, 0.3)";
          }
        });
      });
    }
  }

  setupInteractiveFeatures() {
    // 公式規格ページと採用企業情報を追加
    this.addOfficialInfo();
  }

  addOfficialInfo() {
    const currentPage = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "");

    const languageInfo = {
      java: {
        official: "https://www.oracle.com/java/",
        companies: [
          "Oracle",
          "Google",
          "Netflix",
          "Uber",
          "Airbnb",
          "LinkedIn",
        ],
        projects: [
          "Android OS",
          "Minecraft",
          "Eclipse IDE",
          "Apache Tomcat",
          "Spring Framework",
        ],
      },
      javascript: {
        official: "https://developer.mozilla.org/ja/docs/Web/JavaScript",
        companies: [
          "Google",
          "Facebook",
          "Netflix",
          "Airbnb",
          "Uber",
          "PayPal",
        ],
        projects: ["React", "Node.js", "Angular", "Vue.js", "Express.js"],
      },
      python: {
        official: "https://www.python.org/",
        companies: [
          "Google",
          "Instagram",
          "Spotify",
          "Dropbox",
          "Pinterest",
          "Reddit",
        ],
        projects: ["Django", "Flask", "TensorFlow", "PyTorch", "Pandas"],
      },
      c: {
        official: "https://en.cppreference.com/w/c",
        companies: [
          "Microsoft",
          "Apple",
          "Linux Foundation",
          "Oracle",
          "Intel",
          "Samsung",
        ],
        projects: ["Linux Kernel", "Windows Kernel", "Git", "SQLite", "Redis"],
      },
      cpp: {
        official: "https://isocpp.org/",
        companies: [
          "Google",
          "Microsoft",
          "Adobe",
          "Electronic Arts",
          "Blizzard",
          "Unreal",
        ],
        projects: ["Chrome", "Windows", "Unreal Engine", "MySQL", "MongoDB"],
      },
      csharp: {
        official: "https://docs.microsoft.com/en-us/dotnet/csharp/",
        companies: [
          "Microsoft",
          "Unity Technologies",
          "Stack Overflow",
          "JetBrains",
          "Xamarin",
        ],
        projects: [
          ".NET Framework",
          "Unity",
          "Visual Studio",
          "Xamarin",
          "ASP.NET",
        ],
      },
      php: {
        official: "https://www.php.net/",
        companies: ["Facebook", "WordPress", "Wikipedia", "Slack", "Etsy"],
        projects: ["WordPress", "Laravel", "Symfony", "Drupal", "Magento"],
      },
      ruby: {
        official: "https://www.ruby-lang.org/",
        companies: ["GitHub", "Airbnb", "Shopify", "Twitter", "Hulu"],
        projects: [
          "Ruby on Rails",
          "Sinatra",
          "Jekyll",
          "Metasploit",
          "Homebrew",
        ],
      },
      go: {
        official: "https://golang.org/",
        companies: ["Google", "Uber", "Twitch", "Dropbox", "Docker"],
        projects: ["Docker", "Kubernetes", "Terraform", "Prometheus", "Caddy"],
      },
      kotlin: {
        official: "https://kotlinlang.org/",
        companies: ["Google", "JetBrains", "Pinterest", "Coursera", "Evernote"],
        projects: [
          "Android Development",
          "Spring Boot",
          "Ktor",
          "Exposed",
          "KotlinNative",
        ],
      },
      swift: {
        official: "https://swift.org/",
        companies: ["Apple", "Lyft", "LinkedIn", "Airbnb", "Slack"],
        projects: [
          "iOS Apps",
          "macOS Apps",
          "watchOS Apps",
          "tvOS Apps",
          "Server-side Swift",
        ],
      },
      rust: {
        official: "https://www.rust-lang.org/",
        companies: ["Mozilla", "Dropbox", "Discord", "Cloudflare", "Microsoft"],
        projects: ["Firefox", "Servo", "Deno", "Redox OS", "Firecracker"],
      },
      typescript: {
        official: "https://www.typescriptlang.org/",
        companies: ["Microsoft", "Slack", "Airbnb", "Asana", "Lyft"],
        projects: ["Angular", "VS Code", "Deno", "NestJS", "TypeORM"],
      },
      sql: {
        official: "https://www.iso.org/standard/63555.html",
        companies: ["Oracle", "Microsoft", "IBM", "SAP", "Amazon"],
        projects: [
          "MySQL",
          "PostgreSQL",
          "SQL Server",
          "Oracle Database",
          "SQLite",
        ],
      },
      cobol: {
        official: "https://www.iso.org/standard/51416.html",
        companies: [
          "IBM",
          "Bank of America",
          "Citibank",
          "IRS",
          "Social Security Administration",
        ],
        projects: [
          "Banking Systems",
          "Insurance Systems",
          "Government Systems",
          "Legacy Enterprise Systems",
        ],
      },
      visualbasic: {
        official: "https://docs.microsoft.com/en-us/dotnet/visual-basic/",
        companies: ["Microsoft", "IBM", "HP", "Dell", "Intel"],
        projects: [
          "Windows Applications",
          "Office Macros",
          "Legacy Enterprise Systems",
          "Educational Software",
        ],
      },
    };

    const info = languageInfo[currentPage];
    if (info) {
      const officialSection = document.createElement("div");
      officialSection.className = "detail-section";
      officialSection.innerHTML = `
                <h2 data-ja="公式情報・採用例" data-en="Official Info & Adoption">公式情報・採用例</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label" data-ja="公式サイト" data-en="Official Website">公式サイト</div>
                        <div class="info-value">
                            <a href="${
                              info.official
                            }" target="_blank" style="color: #00ff41; text-decoration: none;">
                                ${info.official}
                            </a>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label" data-ja="主な採用企業" data-en="Major Companies">主な採用企業</div>
                        <div class="info-value">${info.companies.join(
                          ", "
                        )}</div>
                    </div>
                </div>
                <div style="margin-top: 2rem;">
                    <h3 style="color: #00ff41; margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace;" data-ja="主要プロジェクト・フレームワーク" data-en="Major Projects & Frameworks">主要プロジェクト・フレームワーク</h3>
                    <div class="uses-grid">
                        ${info.projects
                          .map(
                            (project) =>
                              `<div class="use-item">${project}</div>`
                          )
                          .join("")}
                    </div>
                </div>
            `;

      // 人気度セクションの後に挿入
      const popularitySection = document.querySelector(
        ".detail-section:last-of-type"
      );
      if (popularitySection) {
        popularitySection.parentNode.insertBefore(
          officialSection,
          popularitySection.nextElementSibling
        );
      }
    }
  }

  setupLanguageSwitching() {
    // 言語切り替えボタン
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      langToggle.textContent =
        this.currentLanguage === "ja" ? "🌐 EN" : "🌐 JP";
      langToggle.addEventListener("click", () => {
        this.toggleLanguage();
      });
    }

    // メインページ言語との同期
    window.addEventListener("storage", (event) => {
      if (event.key === "preferredLanguage") {
        this.currentLanguage = event.newValue;
        this.applyCurrentLanguage();
        if (langToggle) {
          langToggle.textContent =
            this.currentLanguage === "ja" ? "🌐 EN" : "🌐 JP";
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
        this.currentLanguage === "ja" ? "🌐 EN" : "🌐 JP";
    }

    this.applyCurrentLanguage();
  }

  applyCurrentLanguage() {
    // data-jaとdata-en属性を持つ全ての要素を更新
    document.querySelectorAll("[data-ja][data-en]").forEach((element) => {
      element.textContent =
        this.currentLanguage === "ja" ? element.dataset.ja : element.dataset.en;
    });

    // ナビゲーションメニューを更新
    this.updateNavigationMenu();

    // 検索プレースホルダーを更新
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.placeholder =
        this.currentLanguage === "ja" ? "言語を検索..." : "Search languages...";
    }

    // ヘッダーテキストを更新
    const headerTitle = document.querySelector(".logo-text h1");
    if (headerTitle) {
      headerTitle.textContent =
        this.currentLanguage === "ja"
          ? "プログラミング言語図鑑"
          : "Programming Language Encyclopedia";
    }
  }

  updateNavigationMenu() {
    // メニュータイトルを更新
    const navHeader = document.querySelector(".nav-header h2");
    if (navHeader) {
      navHeader.textContent =
        this.currentLanguage === "ja" ? "メニュー" : "Menu";
    }

    // ナビゲーションリンクを更新
    document.querySelectorAll(".nav-links a").forEach((link) => {
      if (
        link.textContent.includes("ホーム") ||
        link.textContent.includes("Home")
      ) {
        link.textContent =
          this.currentLanguage === "ja" ? "🏠 ホーム" : "🏠 Home";
      }
      if (
        link.textContent.includes("カテゴリ") ||
        link.textContent.includes("Categories")
      ) {
        link.textContent =
          this.currentLanguage === "ja" ? "📂 カテゴリ" : "📂 Categories";
      }
      if (
        link.textContent.includes("ハッカー体験") ||
        link.textContent.includes("Hacker Experience")
      ) {
        link.textContent =
          this.currentLanguage === "ja"
            ? "💀 ハッカー体験"
            : "💀 Hacker Experience";
      }
      if (
        link.textContent.includes("このサイト") ||
        link.textContent.includes("About")
      ) {
        link.textContent =
          this.currentLanguage === "ja" ? "ℹ️ このサイトについて" : "ℹ️ About";
      }
      if (
        link.textContent.includes("言語図鑑に戻る") ||
        link.textContent.includes("Back to Encyclopedia")
      ) {
        link.textContent =
          this.currentLanguage === "ja"
            ? "🏠 言語図鑑に戻る"
            : "🏠 Back to Encyclopedia";
      }
    });

    // カテゴリナビゲーションを更新
    const navCategoriesHeader = document.querySelector(".nav-categories h3");
    if (navCategoriesHeader) {
      navCategoriesHeader.textContent =
        this.currentLanguage === "ja"
          ? "カテゴリ別に探索"
          : "Explore by Category";
    }

    // カテゴリリンクを更新
    const categoryTitles = {
      "app-development":
        this.currentLanguage === "ja" ? "アプリ開発" : "App Development",
      "server-side":
        this.currentLanguage === "ja" ? "サーバーサイド" : "Server-side",
      "web-development":
        this.currentLanguage === "ja" ? "Web開発" : "Web Development",
      system: this.currentLanguage === "ja" ? "システム" : "System",
      database: this.currentLanguage === "ja" ? "データベース" : "Database",
    };

    document.querySelectorAll(".category-links a").forEach((link) => {
      const category = link.dataset.category;
      if (category) {
        const icon = link.textContent.split(" ")[0];
        link.textContent = `${icon} ${categoryTitles[category]}`;
      }
    });
  }

  fixJavaScriptInteractivity() {
    // JavaScript色変更機能を修正
    const currentPage = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "");

    if (currentPage === "javascript") {
      // インタラクティブデモボタンのイベントリスナーを追加
      const showAlertBtn = document.querySelector(
        'button[onclick="showAlert()"]'
      );
      const changeColorBtn = document.querySelector(
        'button[onclick="changeColor()"]'
      );
      const getTimeBtn = document.querySelector(
        'button[onclick="getCurrentTime()"]'
      );

      if (showAlertBtn) {
        showAlertBtn.onclick = function () {
          alert(
            this.currentLanguage === "ja"
              ? "JavaScriptが動作しています！"
              : "JavaScript is working!"
          );
        }.bind(this);
      }

      if (changeColorBtn) {
        changeColorBtn.onclick = function () {
          const colors = [
            "#00ff41",
            "#ff0040",
            "#ffff00",
            "#00ffff",
            "#ff00ff",
          ];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          document.body.style.color = randomColor;
          const demoOutput = document.getElementById("demo-output");
          if (demoOutput) {
            demoOutput.textContent =
              this.currentLanguage === "ja"
                ? `色を ${randomColor} に変更しました！`
                : `Changed color to ${randomColor}!`;
          }
        }.bind(this);
      }

      if (getTimeBtn) {
        getTimeBtn.onclick = function () {
          const now = new Date();
          const timeString = now.toLocaleString(
            this.currentLanguage === "ja" ? "ja-JP" : "en-US"
          );
          const demoOutput = document.getElementById("demo-output");
          if (demoOutput) {
            demoOutput.textContent =
              this.currentLanguage === "ja"
                ? `現在時刻: ${timeString}`
                : `Current time: ${timeString}`;
          }
        }.bind(this);
      }
    }
  }
}

// ページ読み込み時に初期化
document.addEventListener("DOMContentLoaded", () => {
  new LanguageDetailsEnhancer();
});
