// プログラミング言語図鑑 メインJavaScript
class ProgrammingLanguageEncyclopedia {
    constructor() {
        this.languages = [
            {
                id: 'javascript',
                name: 'JavaScript',
                category: 'web-development',
                logo: 'assets/logos/javascript.png',
                difficulty: 'medium',
                description: 'Webブラウザで動作する動的なプログラミング言語。現代のWeb開発に不可欠',
                description_en: 'A dynamic programming language that runs in web browsers. Essential for modern web development',
                uses: ['Webアプリケーション', 'モバイルアプリ', 'デスクトップアプリ', 'サーバーサイド'],
                uses_en: ['Web Applications', 'Mobile Apps', 'Desktop Apps', 'Server-side'],
                paradigms: ['オブジェクト指向', '関数型', '命令型'],
                paradigms_en: ['Object-oriented', 'Functional', 'Imperative'],
                popularity: { domestic: 5, global: 5 },
                year: 1995,
                creator: 'Brendan Eich',
                detailPage: 'pages/javascript.html'
            },
            {
                id: 'python',
                name: 'Python',
                category: 'server-side',
                logo: 'assets/logos/python.png',
                difficulty: 'easy',
                description: 'シンプルで読みやすい構文を持つ汎用プログラミング言語。AI・機械学習分野で特に人気',
                description_en: 'A general-purpose programming language with simple, readable syntax. Especially popular in AI and machine learning',
                uses: ['AI・機械学習', 'データ分析', 'Webアプリケーション', '自動化'],
                uses_en: ['AI & Machine Learning', 'Data Analysis', 'Web Applications', 'Automation'],
                paradigms: ['オブジェクト指向', '命令型', '関数型'],
                paradigms_en: ['Object-oriented', 'Imperative', 'Functional'],
                popularity: { domestic: 5, global: 5 },
                year: 1991,
                creator: 'Guido van Rossum',
                detailPage: 'pages/python.html'
            },
            {
                id: 'java',
                name: 'Java',
                category: 'app-development',
                logo: 'assets/logos/Java.png',
                difficulty: 'medium',
                description: '企業システムからモバイルアプリまで幅広く使用される、オブジェクト指向プログラミング言語',
                description_en: 'An object-oriented programming language widely used from enterprise systems to mobile apps',
                uses: ['Androidアプリ', 'Webアプリケーション', '企業システム', 'デスクトップアプリ'],
                uses_en: ['Android Apps', 'Web Applications', 'Enterprise Systems', 'Desktop Apps'],
                paradigms: ['オブジェクト指向', '命令型', 'ジェネリック'],
                paradigms_en: ['Object-oriented', 'Imperative', 'Generic'],
                popularity: { domestic: 5, global: 5 },
                year: 1995,
                creator: 'Sun Microsystems',
                detailPage: 'pages/java.html'
            },
            {
                id: 'go',
                name: 'Go',
                category: 'server-side',
                logo: 'assets/logos/Go.png',
                difficulty: 'medium',
                description: 'Googleが開発した高速でシンプルなプログラミング言語。並行処理とクラウド開発に最適',
                description_en: 'A fast and simple programming language developed by Google. Ideal for concurrent processing and cloud development',
                uses: ['Webサーバー', 'マイクロサービス', 'クラウドアプリ', 'CLI ツール'],
                uses_en: ['Web Servers', 'Microservices', 'Cloud Apps', 'CLI Tools'],
                paradigms: ['命令型', '並行処理'],
                paradigms_en: ['Imperative', 'Concurrent'],
                popularity: { domestic: 4, global: 5 },
                year: 2009,
                creator: 'Google',
                detailPage: 'pages/go.html'
            },
            {
                id: 'html',
                name: 'HTML',
                category: 'web-development',
                logo: 'assets/logos/html.png',
                difficulty: 'easy',
                description: 'Webページの構造を定義するマークアップ言語。すべてのWebサイトの基盤',
                description_en: 'A markup language that defines the structure of web pages. The foundation of all websites',
                uses: ['Webページ', 'Webアプリ', 'メール', 'ドキュメント'],
                uses_en: ['Web Pages', 'Web Apps', 'Email', 'Documents'],
                paradigms: ['マークアップ言語'],
                paradigms_en: ['Markup Language'],
                popularity: { domestic: 5, global: 5 },
                year: 1993,
                creator: 'Tim Berners-Lee',
                detailPage: 'pages/html.html'
            },
            {
                id: 'firebase',
                name: 'Firebase',
                category: 'database',
                logo: 'assets/logos/Firebase.png',
                difficulty: 'medium',
                description: 'Googleが提供するモバイル・Webアプリ開発プラットフォーム。バックエンド機能を簡単に実装',
                description_en: 'A mobile and web application development platform provided by Google. Easy implementation of backend features',
                uses: ['モバイルアプリ', 'Webアプリ', 'リアルタイムアプリ', 'チャットアプリ'],
                uses_en: ['Mobile Apps', 'Web Apps', 'Real-time Apps', 'Chat Apps'],
                paradigms: ['BaaS (Backend as a Service)'],
                paradigms_en: ['BaaS (Backend as a Service)'],
                popularity: { domestic: 4, global: 5 },
                year: 2011,
                creator: 'Google',
                detailPage: 'pages/firebase.html'
            },
            {
                id: 'c',
                name: 'C',
                category: 'system',
                logo: 'assets/logos/C.png',
                difficulty: 'hard',
                description: 'システムプログラミングの基盤となる低レベルプログラミング言語',
                description_en: 'A low-level programming language that forms the foundation of system programming',
                uses: ['OS開発', '組み込みシステム', 'ドライバ', 'ゲームエンジン'],
                uses_en: ['OS Development', 'Embedded Systems', 'Drivers', 'Game Engines'],
                paradigms: ['手続き型', '構造化'],
                paradigms_en: ['Procedural', 'Structured'],
                popularity: { domestic: 4, global: 4 },
                year: 1972,
                creator: 'Dennis Ritchie',
                detailPage: 'pages/c.html'
            },
            {
                id: 'cpp',
                name: 'C++',
                category: 'system',
                logo: 'assets/logos/Cpp.png',
                difficulty: 'hard',
                description: 'C言語を拡張したオブジェクト指向プログラミング言語。高性能アプリケーション開発に使用',
                description_en: 'An object-oriented programming language that extends C. Used for high-performance application development',
                uses: ['ゲーム開発', 'システムソフトウェア', '組み込みシステム', 'デスクトップアプリ'],
                uses_en: ['Game Development', 'System Software', 'Embedded Systems', 'Desktop Apps'],
                paradigms: ['オブジェクト指向', '手続き型', 'ジェネリック'],
                paradigms_en: ['Object-oriented', 'Procedural', 'Generic'],
                popularity: { domestic: 4, global: 4 },
                year: 1985,
                creator: 'Bjarne Stroustrup',
                detailPage: 'pages/cpp.html'
            },
            {
                id: 'csharp',
                name: 'C#',
                category: 'app-development',
                logo: 'assets/logos/Csharp.png',
                difficulty: 'medium',
                description: 'Microsoftが開発したオブジェクト指向プログラミング言語。.NET環境で動作',
                description_en: 'An object-oriented programming language developed by Microsoft. Runs in the .NET environment',
                uses: ['Windowsアプリ', 'Webアプリケーション', 'ゲーム開発', 'モバイルアプリ'],
                uses_en: ['Windows Apps', 'Web Applications', 'Game Development', 'Mobile Apps'],
                paradigms: ['オブジェクト指向', '命令型', 'ジェネリック'],
                paradigms_en: ['Object-oriented', 'Imperative', 'Generic'],
                popularity: { domestic: 4, global: 4 },
                year: 2000,
                creator: 'Microsoft',
                detailPage: 'pages/csharp.html'
            },
            {
                id: 'php',
                name: 'PHP',
                category: 'server-side',
                logo: 'assets/logos/php.png',
                difficulty: 'easy',
                description: 'Web開発に特化したサーバーサイドスクリプト言語。WordPressなどで広く使用',
                description_en: 'A server-side scripting language specialized for web development. Widely used in WordPress and other platforms',
                uses: ['Webアプリケーション', 'CMS', 'API開発', 'Eコマース'],
                uses_en: ['Web Applications', 'CMS', 'API Development', 'E-commerce'],
                paradigms: ['命令型', 'オブジェクト指向', '関数型'],
                paradigms_en: ['Imperative', 'Object-oriented', 'Functional'],
                popularity: { domestic: 3, global: 4 },
                year: 1995,
                creator: 'Rasmus Lerdorf',
                detailPage: 'pages/php.html'
            },
            {
                id: 'ruby',
                name: 'Ruby',
                category: 'web-development',
                logo: 'assets/logos/ruby.png',
                difficulty: 'easy',
                description: '日本発のプログラミング言語。Ruby on Railsフレームワークで有名',
                description_en: 'A programming language from Japan. Famous for the Ruby on Rails framework',
                uses: ['Webアプリケーション', 'スクリプト', 'プロトタイピング', 'API開発'],
                uses_en: ['Web Applications', 'Scripts', 'Prototyping', 'API Development'],
                paradigms: ['オブジェクト指向', '命令型', '関数型'],
                paradigms_en: ['Object-oriented', 'Imperative', 'Functional'],
                popularity: { domestic: 4, global: 3 },
                year: 1995,
                creator: 'まつもとゆきひろ',
                detailPage: 'pages/ruby.html'
            },
            {
                id: 'swift',
                name: 'Swift',
                category: 'app-development',
                logo: 'assets/logos/Swift.png',
                difficulty: 'medium',
                description: 'AppleがiOS/macOSアプリ開発のために開発したモダンなプログラミング言語',
                description_en: 'A modern programming language developed by Apple for iOS/macOS app development',
                uses: ['iOSアプリ', 'macOSアプリ', 'watchOSアプリ', 'tvOSアプリ'],
                uses_en: ['iOS Apps', 'macOS Apps', 'watchOS Apps', 'tvOS Apps'],
                paradigms: ['オブジェクト指向', '関数型', 'プロトコル指向'],
                paradigms_en: ['Object-oriented', 'Functional', 'Protocol-oriented'],
                popularity: { domestic: 3, global: 4 },
                year: 2014,
                creator: 'Apple',
                detailPage: 'pages/swift.html'
            },
            {
                id: 'kotlin',
                name: 'Kotlin',
                category: 'app-development',
                logo: 'assets/logos/Kotlin.png',
                difficulty: 'medium',
                description: 'JetBrainsが開発したJVM言語。AndroidアプリのGoogle公式言語',
                description_en: 'A JVM language developed by JetBrains. Google\'s official language for Android apps',
                uses: ['Androidアプリ', 'サーバーサイド', 'デスクトップアプリ', 'マルチプラットフォーム'],
                uses_en: ['Android Apps', 'Server-side', 'Desktop Apps', 'Multiplatform'],
                paradigms: ['オブジェクト指向', '関数型'],
                paradigms_en: ['Object-oriented', 'Functional'],
                popularity: { domestic: 3, global: 4 },
                year: 2011,
                creator: 'JetBrains',
                detailPage: 'pages/kotlin.html'
            },
            {
                id: 'rust',
                name: 'Rust',
                category: 'system',
                logo: 'assets/logos/rust.png',
                difficulty: 'hard',
                description: 'メモリ安全性を重視したシステムプログラミング言語。高性能と安全性を両立',
                description_en: 'A system programming language focused on memory safety. Combines high performance and safety',
                uses: ['システムプログラミング', 'WebAssembly', 'ブロックチェーン', 'ゲームエンジン'],
                uses_en: ['System Programming', 'WebAssembly', 'Blockchain', 'Game Engines'],
                paradigms: ['関数型', '命令型', '並行処理'],
                paradigms_en: ['Functional', 'Imperative', 'Concurrent'],
                popularity: { domestic: 3, global: 4 },
                year: 2010,
                creator: 'Mozilla',
                detailPage: 'pages/rust.html'
            },
            {
                id: 'typescript',
                name: 'TypeScript',
                category: 'web-development',
                logo: 'assets/logos/typescript.png',
                difficulty: 'medium',
                description: 'Microsoftが開発したJavaScriptに型システムを追加した言語',
                description_en: 'A language developed by Microsoft that adds a type system to JavaScript',
                uses: ['Webアプリケーション', 'Node.js', 'React/Angular', 'デスクトップアプリ'],
                uses_en: ['Web Applications', 'Node.js', 'React/Angular', 'Desktop Apps'],
                paradigms: ['オブジェクト指向', '関数型', '命令型'],
                paradigms_en: ['Object-oriented', 'Functional', 'Imperative'],
                popularity: { domestic: 4, global: 5 },
                year: 2012,
                creator: 'Microsoft',
                detailPage: 'pages/typescript.html'
            },
            {
                id: 'sql',
                name: 'SQL',
                category: 'database',
                logo: 'assets/logos/sql.png',
                difficulty: 'easy',
                description: 'データベース操作のための標準的なクエリ言語',
                description_en: 'A standard query language for database operations',
                uses: ['データベース操作', 'データ分析', 'レポート作成', 'データマイニング'],
                uses_en: ['Database Operations', 'Data Analysis', 'Report Generation', 'Data Mining'],
                paradigms: ['宣言型'],
                paradigms_en: ['Declarative'],
                popularity: { domestic: 5, global: 5 },
                year: 1974,
                creator: 'IBM',
                detailPage: 'pages/sql.html'
            },
            {
                id: 'css',
                name: 'CSS',
                category: 'web-development',
                logo: 'assets/logos/css.png',
                difficulty: 'easy',
                description: 'Webページのスタイルとレイアウトを定義するスタイルシート言語',
                description_en: 'A style sheet language that defines the style and layout of web pages',
                uses: ['Webデザイン', 'レスポンシブデザイン', 'アニメーション', 'UI/UX'],
                uses_en: ['Web Design', 'Responsive Design', 'Animation', 'UI/UX'],
                paradigms: ['宣言型'],
                paradigms_en: ['Declarative'],
                popularity: { domestic: 5, global: 5 },
                year: 1996,
                creator: 'W3C',
                detailPage: 'pages/css.html'
            },
            {
                id: 'mongodb',
                name: 'MongoDB',
                category: 'database',
                logo: 'assets/logos/MongoDB.png',
                difficulty: 'medium',
                description: 'ドキュメント指向のNoSQLデータベース。JSONライクなデータ構造',
                description_en: 'A document-oriented NoSQL database. JSON-like data structure',
                uses: ['Webアプリケーション', 'ビッグデータ', 'リアルタイムアプリ', 'コンテンツ管理'],
                uses_en: ['Web Applications', 'Big Data', 'Real-time Apps', 'Content Management'],
                paradigms: ['ドキュメント指向', 'NoSQL'],
                paradigms_en: ['Document-oriented', 'NoSQL'],
                popularity: { domestic: 4, global: 4 },
                year: 2009,
                creator: 'MongoDB Inc.',
                detailPage: 'pages/mongodb.html'
            },
            {
                id: 'cobol',
                name: 'COBOL',
                category: 'system',
                logo: 'assets/logos/cobol.png',
                difficulty: 'medium',
                description: 'ビジネス用途に特化した古典的なプログラミング言語。金融システムで現在も使用',
                description_en: 'A classic programming language specialized for business use. Still used in financial systems',
                uses: ['金融システム', '基幹システム', '政府システム', 'レガシーシステム'],
                uses_en: ['Financial Systems', 'Core Systems', 'Government Systems', 'Legacy Systems'],
                paradigms: ['手続き型', '構造化'],
                paradigms_en: ['Procedural', 'Structured'],
                popularity: { domestic: 2, global: 2 },
                year: 1959,
                creator: 'CODASYL',
                detailPage: 'pages/cobol.html'
            },
            {
                id: 'visualbasic',
                name: 'Visual Basic',
                category: 'app-development',
                logo: 'assets/logos/visualbasic.png',
                difficulty: 'easy',
                description: 'Microsoftが開発した初心者向けプログラミング言語。RAD開発に最適',
                description_en: 'A beginner-friendly programming language developed by Microsoft. Ideal for RAD development',
                uses: ['Windowsアプリ', 'オフィス自動化', 'データベースアプリ', 'プロトタイピング'],
                uses_en: ['Windows Apps', 'Office Automation', 'Database Apps', 'Prototyping'],
                paradigms: ['オブジェクト指向', 'イベント駆動'],
                paradigms_en: ['Object-oriented', 'Event-driven'],
                popularity: { domestic: 2, global: 2 },
                year: 1991,
                creator: 'Microsoft',
                detailPage: 'pages/visualbasic.html'
            }
        ];

        this.currentLanguage = 'ja';
        this.filteredLanguages = [...this.languages];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCursor();
        this.showLoadingScreen();
        this.renderLanguages();
        this.setupSearch();
        this.setupNavigation();
        this.disableRightAndMiddleClick();
    }

    setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navClose = document.getElementById('nav-close');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.add('open');
            });
        }

        if (navClose && navMenu) {
            navClose.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        }

        // Language toggle
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Category links
        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;
                this.filterByCategory(category);
                
                // Update active state
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close menu on mobile
                if (navMenu) {
                    navMenu.classList.remove('open');
                }
            });
        });

        // Modal functionality
        const modal = document.getElementById('language-modal');
        const modalClose = document.getElementById('modal-close');

        if (modalClose && modal) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('open');
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                }
            });
        }
    }

    setupCursor() {
        const cursor = document.getElementById('cursor');
        const cursorTrail = document.getElementById('cursor-trail');
        const cursorGlow = document.getElementById('cursor-glow');
        const cursorParticles = document.getElementById('cursor-particles');

        if (!cursor || !cursorTrail || !cursorGlow || !cursorParticles) return;

        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            
            // Create particles occasionally
            if (Math.random() < 0.1) {
                this.createCursorParticle(mouseX, mouseY);
            }
        });

        // Smooth trail animation
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            glowX += (mouseX - glowX) * 0.05;
            glowY += (mouseY - glowY) * 0.05;
            
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            
            requestAnimationFrame(animateTrail);
        };
        animateTrail();

        // Hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, .language-card, .nav-link, .hacker-btn, a')) {
                cursor.classList.add('hover');
                cursorTrail.classList.add('hover');
                cursorGlow.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('button, .language-card, .nav-link, .hacker-btn, a')) {
                cursor.classList.remove('hover');
                cursorTrail.classList.remove('hover');
                cursorGlow.classList.remove('hover');
            }
        });

        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
    }

    createCursorParticle(x, y) {
        const cursorParticles = document.getElementById('cursor-particles');
        if (!cursorParticles) return;

        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random offset
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        cursorParticles.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 2000);
        }
    }

    renderLanguages() {
        const container = document.getElementById('languages-container');
        if (!container) return;

        // Group languages by category
        const categories = {
            'app-development': { title: 'アプリ開発', title_en: 'App Development', icon: '📱' },
            'server-side': { title: 'サーバーサイド', title_en: 'Server-side', icon: '🖥️' },
            'web-development': { title: 'Web開発', title_en: 'Web Development', icon: '🌐' },
            'system': { title: 'システム', title_en: 'System', icon: '⚙️' },
            'database': { title: 'データベース', title_en: 'Database', icon: '🗃️' }
        };

        container.innerHTML = '';

        Object.keys(categories).forEach(categoryId => {
            const categoryLanguages = this.filteredLanguages.filter(lang => lang.category === categoryId);
            if (categoryLanguages.length === 0) return;

            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            categorySection.id = categoryId;

            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            
            const categoryTitle = this.currentLanguage === 'ja' ? categories[categoryId].title : categories[categoryId].title_en;
            
            categoryHeader.innerHTML = `
                <div class="category-icon">${categories[categoryId].icon}</div>
                <h2 class="category-title">${categoryTitle}</h2>
                <div class="category-count">${categoryLanguages.length}</div>
            `;

            const languagesGrid = document.createElement('div');
            languagesGrid.className = 'languages-grid';

            categoryLanguages.forEach(language => {
                const card = this.createLanguageCard(language);
                languagesGrid.appendChild(card);
            });

            categorySection.appendChild(categoryHeader);
            categorySection.appendChild(languagesGrid);
            container.appendChild(categorySection);
        });
    }

    createLanguageCard(language) {
        const card = document.createElement('div');
        card.className = 'language-card';
        card.dataset.language = language.id;

        const difficultyClass = `difficulty-${language.difficulty}`;
        const difficultyText = this.currentLanguage === 'ja' ? 
            {
                'easy': '簡単',
                'medium': '普通',
                'hard': '難しい'
            }[language.difficulty] :
            {
                'easy': 'Easy',
                'medium': 'Medium',
                'hard': 'Hard'
            }[language.difficulty];

        const description = this.currentLanguage === 'ja' ? language.description : language.description_en;
        const uses = this.currentLanguage === 'ja' ? language.uses : language.uses_en;
        const paradigms = this.currentLanguage === 'ja' ? language.paradigms : language.paradigms_en;
        
        const domesticLabel = this.currentLanguage === 'ja' ? '国内人気度' : 'Domestic Popularity';
        const globalLabel = this.currentLanguage === 'ja' ? '世界人気度' : 'Global Popularity';
        const yearLabel = this.currentLanguage === 'ja' ? '作成年' : 'Year';
        const creatorLabel = this.currentLanguage === 'ja' ? '作成者' : 'Creator';

        card.innerHTML = `
            <div class="card-header">
                <div class="card-logo">
                    <div class="language-logo">
                        <img src="${language.logo}" alt="${language.name}" style="width: 100%; height: 100%; object-fit: contain;" />
                    </div>
                    <div class="language-name">${language.name}</div>
                </div>
                <div class="difficulty-badge ${difficultyClass}">${difficultyText}</div>
            </div>
            <div class="card-description">${description}</div>
            <div class="card-uses">
                <div class="uses-list">
                    ${uses.map(use => `<span class="use-tag">${use}</span>`).join('')}
                </div>
            </div>
            <div class="card-popularity">
                <div class="popularity-item">
                    <span class="popularity-label">${domesticLabel}</span>
                    <div class="stars">
                        ${this.generateStars(language.popularity.domestic)}
                    </div>
                </div>
                <div class="popularity-item">
                    <span class="popularity-label">${globalLabel}</span>
                    <div class="stars">
                        ${this.generateStars(language.popularity.global)}
                    </div>
                </div>
            </div>
            <div class="card-info">
                <span>${yearLabel}: ${language.year}</span>
                <span>${creatorLabel}: ${language.creator}</span>
            </div>
        `;

        // Add click event for modal or detail page
        card.addEventListener('click', () => {
            if (language.detailPage) {
                window.location.href = language.detailPage;
            } else {
                this.openLanguageModal(language);
            }
        });

        return card;
    }

    generateStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(`<span class="star ${i <= rating ? '' : 'empty'}">★</span>`);
        }
        return stars.join('');
    }

    openLanguageModal(language) {
        const modal = document.getElementById('language-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalBody) return;

        const description = this.currentLanguage === 'ja' ? language.description : language.description_en;
        const uses = this.currentLanguage === 'ja' ? language.uses : language.uses_en;
        const paradigms = this.currentLanguage === 'ja' ? language.paradigms : language.paradigms_en;
        
        const categoryName = this.currentLanguage === 'ja' ? 
            this.getCategoryName(language.category) : 
            this.getCategoryNameEn(language.category);
        
        const yearLabel = this.currentLanguage === 'ja' ? '作成年' : 'Year';
        const creatorLabel = this.currentLanguage === 'ja' ? '作成者' : 'Creator';
        const domesticLabel = this.currentLanguage === 'ja' ? '国内人気度' : 'Domestic Popularity';
        const globalLabel = this.currentLanguage === 'ja' ? '世界人気度' : 'Global Popularity';
        const detailsLabel = this.currentLanguage === 'ja' ? '詳細ページを見る' : 'View Details';

        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-logo">
                    <div class="language-logo">
                        <img src="${language.logo}" alt="${language.name}" style="width: 100%; height: 100%; object-fit: contain;" />
                    </div>
                </div>
                <div>
                    <h1 class="modal-title">${language.name}</h1>
                    <p class="modal-category">${categoryName}</p>
                    <p class="modal-description">${description}</p>
                </div>
            </div>
            
            <div class="modal-section">
                <h3>${this.currentLanguage === 'ja' ? '主な用途' : 'Main Uses'}</h3>
                <div class="modal-uses">
                    ${uses.map(use => `<div class="modal-use">${use}</div>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>${this.currentLanguage === 'ja' ? 'プログラミングパラダイム' : 'Programming Paradigms'}</h3>
                <div class="modal-paradigms">
                    ${paradigms.map(paradigm => `<span class="paradigm-tag">${paradigm}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>${this.currentLanguage === 'ja' ? '統計情報' : 'Statistics'}</h3>
                <div class="modal-stats">
                    <div class="stat-item">
                        <div class="stat-label">${yearLabel}</div>
                        <div class="stat-value">${language.year}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">${creatorLabel}</div>
                        <div class="stat-value">${language.creator}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">${domesticLabel}</div>
                        <div class="stat-value">${'★'.repeat(language.popularity.domestic)}${'☆'.repeat(5-language.popularity.domestic)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">${globalLabel}</div>
                        <div class="stat-value">${'★'.repeat(language.popularity.global)}${'☆'.repeat(5-language.popularity.global)}</div>
                    </div>
                </div>
            </div>
            
            ${language.detailPage ? `
                <div class="modal-section">
                    <a href="${language.detailPage}" class="detail-link">${detailsLabel} →</a>
                </div>
            ` : ''}
        `;

        modal.classList.add('open');
    }

    getCategoryName(categoryId) {
        const categories = {
            'app-development': 'アプリ開発',
            'server-side': 'サーバーサイド',
            'web-development': 'Web開発',
            'system': 'システム',
            'database': 'データベース'
        };
        return categories[categoryId] || categoryId;
    }
    
    getCategoryNameEn(categoryId) {
        const categories = {
            'app-development': 'App Development',
            'server-side': 'Server-side',
            'web-development': 'Web Development',
            'system': 'System',
            'database': 'Database'
        };
        return categories[categoryId] || categoryId;
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            this.filterLanguages(query);
        });
    }

    filterLanguages(query) {
        if (!query) {
            this.filteredLanguages = [...this.languages];
        } else {
            this.filteredLanguages = this.languages.filter(language => {
                const description = this.currentLanguage === 'ja' ? language.description : language.description_en;
                const uses = this.currentLanguage === 'ja' ? language.uses : language.uses_en;
                const paradigms = this.currentLanguage === 'ja' ? language.paradigms : language.paradigms_en;
                
                return language.name.toLowerCase().includes(query) ||
                    description.toLowerCase().includes(query) ||
                    uses.some(use => use.toLowerCase().includes(query)) ||
                    paradigms.some(paradigm => paradigm.toLowerCase().includes(query));
            });
        }
        this.renderLanguages();
    }

    filterByCategory(categoryId) {
        this.filteredLanguages = this.languages.filter(language => language.category === categoryId);
        this.renderLanguages();
        
        // Scroll to category
        const categoryElement = document.getElementById(categoryId);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Close mobile menu
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) {
                    navMenu.classList.remove('open');
                }
            });
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ja' ? 'en' : 'ja';
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = this.currentLanguage === 'ja' ? '🌐 EN' : '🌐 JP';
        }
        
        // Update UI based on language
        if (this.currentLanguage === 'ja') {
            this.updateUIToJapanese();
        } else {
            this.updateUIToEnglish();
        }
        
        // Re-render language cards with updated language
        this.renderLanguages();
    }
    
    updateUIToJapanese() {
        // Update navigation menu
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.textContent.includes('Home')) link.textContent = '🏠 ホーム';
            if (link.textContent.includes('Categories')) link.textContent = '📂 カテゴリ';
            if (link.textContent.includes('Hacker')) link.textContent = '💀 ハッカー体験';
            if (link.textContent.includes('About')) link.textContent = 'ℹ️ このサイトについて';
        });
        
        // Update category titles
        const categoryTitles = {
            'app-development': 'アプリ開発',
            'server-side': 'サーバーサイド',
            'web-development': 'Web開発',
            'system': 'システム',
            'database': 'データベース'
        };
        
        document.querySelectorAll('.category-title').forEach(title => {
            const categoryId = title.closest('.category-section')?.id;
            if (categoryId && categoryTitles[categoryId]) {
                title.textContent = categoryTitles[categoryId];
            }
        });
        
        // Update difficulty labels
        document.querySelectorAll('.difficulty-badge').forEach(badge => {
            if (badge.textContent === 'Easy') badge.textContent = '簡単';
            if (badge.textContent === 'Medium') badge.textContent = '普通';
            if (badge.textContent === 'Hard') badge.textContent = '難しい';
        });
        
        // Update search placeholder
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.placeholder = '言語を検索...';
        }
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.textContent = 'プログラミング言語図鑑';
        }
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = '19種類のプログラミング言語を探索しよう';
        }
        
        // Update about section
        const aboutTitle = document.querySelector('.about-content h2');
        if (aboutTitle) {
            aboutTitle.textContent = 'このサイトについて';
        }
        
        const aboutText = document.querySelector('.about-content p');
        if (aboutText) {
            aboutText.textContent = 'このサイトは、現代のプログラミング言語を美しく、インタラクティブに紹介する図鑑です。初心者から上級者まで、あらゆるレベルの開発者が言語の特徴や用途を理解できるよう設計されています。';
        }
        
        // Update category links
        document.querySelectorAll('.category-links a').forEach(link => {
            const category = link.dataset.category;
            if (category && categoryTitles[category]) {
                const icon = link.textContent.split(' ')[0];
                link.textContent = `${icon} ${categoryTitles[category]}`;
            }
        });
        
        // Update card info labels
        document.querySelectorAll('.card-info span').forEach(span => {
            if (span.textContent.startsWith('Year:')) {
                span.textContent = span.textContent.replace('Year:', '作成年:');
            }
            if (span.textContent.startsWith('Creator:')) {
                span.textContent = span.textContent.replace('Creator:', '作成者:');
            }
        });
        
        // Update popularity labels
        document.querySelectorAll('.popularity-label').forEach(label => {
            if (label.textContent === 'Domestic Popularity') {
                label.textContent = '国内人気度';
            }
            if (label.textContent === 'Global Popularity') {
                label.textContent = '世界人気度';
            }
        });
        
        // Update header text
        const headerTitle = document.querySelector('.logo-text h1');
        if (headerTitle) {
            headerTitle.textContent = 'プログラミング言語図鑑';
        }
        
        const headerSubtitle = document.querySelector('.logo-text p');
        if (headerSubtitle) {
            headerSubtitle.textContent = 'Programming Language Encyclopedia';
        }
        
        // Update nav header
        const navHeader = document.querySelector('.nav-header h2');
        if (navHeader) {
            navHeader.textContent = 'メニュー';
        }
        
        // Update nav categories header
        const navCategoriesHeader = document.querySelector('.nav-categories h3');
        if (navCategoriesHeader) {
            navCategoriesHeader.textContent = 'カテゴリ別に探索';
        }
    }
    
    updateUIToEnglish() {
        // Update navigation menu
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.textContent.includes('ホーム')) link.textContent = '🏠 Home';
            if (link.textContent.includes('カテゴリ')) link.textContent = '📂 Categories';
            if (link.textContent.includes('ハッカー体験')) link.textContent = '💀 Hacker Experience';
            if (link.textContent.includes('このサイト')) link.textContent = 'ℹ️ About';
        });
        
        // Update category titles
        const categoryTitles = {
            'app-development': 'App Development',
            'server-side': 'Server Side',
            'web-development': 'Web Development',
            'system': 'System',
            'database': 'Database'
        };
        
        document.querySelectorAll('.category-title').forEach(title => {
            const categoryId = title.closest('.category-section')?.id;
            if (categoryId && categoryTitles[categoryId]) {
                title.textContent = categoryTitles[categoryId];
            }
        });
        
        // Update difficulty labels
        document.querySelectorAll('.difficulty-badge').forEach(badge => {
            if (badge.textContent === '簡単') badge.textContent = 'Easy';
            if (badge.textContent === '普通') badge.textContent = 'Medium';
            if (badge.textContent === '難しい') badge.textContent = 'Hard';
        });
        
        // Update search placeholder
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.placeholder = 'Search languages...';
        }
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.textContent = 'Programming Language Encyclopedia';
        }
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = 'Explore 19 programming languages';
        }
        
        // Update about section
        const aboutTitle = document.querySelector('.about-content h2');
        if (aboutTitle) {
            aboutTitle.textContent = 'About This Site';
        }
        
        const aboutText = document.querySelector('.about-content p');
        if (aboutText) {
            aboutText.textContent = 'This site is an encyclopedia that beautifully and interactively introduces modern programming languages. It is designed to help developers of all levels, from beginners to experts, understand the features and uses of various languages.';
        }
        
        // Update category links
        document.querySelectorAll('.category-links a').forEach(link => {
            const category = link.dataset.category;
            if (category && categoryTitles[category]) {
                const icon = link.textContent.split(' ')[0];
                link.textContent = `${icon} ${categoryTitles[category]}`;
            }
        });
        
        // Update card info labels
        document.querySelectorAll('.card-info span').forEach(span => {
            if (span.textContent.startsWith('作成年:')) {
                span.textContent = span.textContent.replace('作成年:', 'Year:');
            }
            if (span.textContent.startsWith('作成者:')) {
                span.textContent = span.textContent.replace('作成者:', 'Creator:');
            }
        });
        
        // Update popularity labels
        document.querySelectorAll('.popularity-label').forEach(label => {
            if (label.textContent === '国内人気度') {
                label.textContent = 'Domestic Popularity';
            }
            if (label.textContent === '世界人気度') {
                label.textContent = 'Global Popularity';
            }
        });
        
        // Update header text
        const headerTitle = document.querySelector('.logo-text h1');
        if (headerTitle) {
            headerTitle.textContent = 'Programming Language Encyclopedia';
        }
        
        const headerSubtitle = document.querySelector('.logo-text p');
        if (headerSubtitle) {
            headerSubtitle.textContent = 'プログラミング言語図鑑';
        }
        
        // Update nav header
        const navHeader = document.querySelector('.nav-header h2');
        if (navHeader) {
            navHeader.textContent = 'Menu';
        }
        
        // Update nav categories header
        const navCategoriesHeader = document.querySelector('.nav-categories h3');
        if (navCategoriesHeader) {
            navCategoriesHeader.textContent = 'Explore by Category';
        }
    }
    
    disableRightAndMiddleClick() {
        // Disable right click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Disable middle click
        document.addEventListener('mousedown', (e) => {
            if (e.button === 1) { // Middle button
                e.preventDefault();
                return false;
            }
        });
        
        // Disable middle click scroll
        document.addEventListener('auxclick', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                return false;
            }
        });
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProgrammingLanguageEncyclopedia();
});