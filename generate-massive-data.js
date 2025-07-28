/**
 * 大量サンプルデータ生成スクリプト（100-1000件）
 * 大部分はきれいなデータ、一部（20-30%）を意図的に汚くする
 */

// データ汚し用のヘルパー関数
const dataCorruptor = {
    // 汚くする確率（20-30%）
    corruptionRate: 0.25,
    
    // ランダムに空白を追加
    addRandomSpaces: (str) => {
        const spaces = ['', ' ', '　', '  ', '\t', ' \t '];
        const prefix = Math.random() < 0.5 ? spaces[Math.floor(Math.random() * spaces.length)] : '';
        const suffix = Math.random() < 0.5 ? spaces[Math.floor(Math.random() * spaces.length)] : '';
        return prefix + str + suffix;
    },
    
    // ランダムに大文字・小文字を混在
    randomizeCase: (str) => {
        const rand = Math.random();
        if (rand < 0.3) return str.toUpperCase();
        if (rand < 0.6) return str.toLowerCase();
        if (rand < 0.8) {
            // 一部だけ大文字
            return str.split('').map(char => 
                Math.random() < 0.4 ? char.toUpperCase() : char.toLowerCase()
            ).join('');
        }
        return str;
    },
    
    // ランダムに特殊文字を混入
    addSpecialChars: (str) => {
        const specials = ['<', '>', '"', '&', '\\', '/', '?', '#', '@', '!', '★', '※', '♪', '◆'];
        if (Math.random() < 0.15) {
            const special = specials[Math.floor(Math.random() * specials.length)];
            const pos = Math.floor(Math.random() * str.length);
            return str.slice(0, pos) + special + str.slice(pos);
        }
        return str;
    },
    
    // NULL値やemptyをランダムに混入
    randomNull: (str) => {
        const nulls = ['', 'NULL', 'null', 'N/A', '-', '未入力', '不明', 'none'];
        if (Math.random() < 0.12) {
            return nulls[Math.floor(Math.random() * nulls.length)];
        }
        return str;
    },
    
    // データを汚すかどうかの判定と適用
    maybeCorrupt: (str) => {
        if (typeof str !== 'string' || Math.random() > dataCorruptor.corruptionRate) {
            return str; // 汚さない（70-80%）
        }
        
        // 汚す処理を適用（20-30%）
        let result = str;
        if (Math.random() < 0.7) result = dataCorruptor.addRandomSpaces(result);
        if (Math.random() < 0.4) result = dataCorruptor.randomizeCase(result);
        if (Math.random() < 0.2) result = dataCorruptor.addSpecialChars(result);
        if (Math.random() < 0.1) result = dataCorruptor.randomNull(result);
        return result;
    }
};

// 基本データセット
const firstNames = [
    '太郎', '花子', '一郎', '美咲', '次郎', '智子', '三郎', '由美', '四郎', '恵子',
    '五郎', '真理', '六郎', '裕子', '七郎', '康子', '八郎', '典子', '九郎', '明美',
    '健太', '優子', '大輔', '直美', '翔太', '久美子', '拓也', '加奈子', '雄大', '理恵',
    'ケンタ', 'ユウコ', 'タクヤ', 'アキラ', 'ミカ', 'サトミ', 'ヒロシ', 'ナオコ',
    '学', '舞', '誠', '愛', '良', '香', '進', '春菜', '博', '綾乃'
];

const lastNames = [
    '田中', '佐藤', '鈴木', '高橋', '渡辺', '伊藤', '山本', '中村', '小林', '加藤',
    '吉田', '山田', '松本', '井上', '木村', '林', '清水', '山崎', '森', '池田',
    '橋本', '斎藤', '竹内', '石川', '中島', '前田', '福田', '小川', '後藤', '岡田',
    '長谷川', '村上', '近藤', '石田', '上田', '原田', '浜田', '武田', '内田', '和田'
];

const addresses = [
    '東京都渋谷区', '大阪府大阪市', '愛知県名古屋市', '神奈川県横浜市', '福岡県福岡市',
    '北海道札幌市', '宮城県仙台市', '埼玉県さいたま市', '千葉県千葉市', '兵庫県神戸市',
    '京都府京都市', '広島県広島市', '静岡県静岡市', '茨城県水戸市', '栃木県宇都宮市',
    '群馬県前橋市', '新潟県新潟市', '富山県富山市', '石川県金沢市', '福井県福井市'
];

const products = [
    'ノートPC', 'デスクトップPC', 'タブレット', 'スマートフォン', 'マウス', 'キーボード', 
    '液晶モニター', 'プリンター', 'スキャナー', 'SSD', 'HDD', 'メモリ', 'グラフィックカード',
    'Webカメラ', 'マイク', 'スピーカー', 'ヘッドホン', 'イヤホン', '充電器', 'USBケーブル',
    'LANケーブル', 'WiFiルーター', 'モデム', 'ハブ', 'スイッチ', 'ファイアウォール'
];

const categories = [
    'コンピュータ', 'コンピューター', 'PC周辺機器', 'ストレージ', 'ネットワーク機器',
    'オーディオ機器', '映像機器', 'モバイル機器', 'ケーブル類', 'アクセサリ'
];

// ヘルパー関数
const generatePhone = () => {
    const formats = [
        () => `090-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        () => `080-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        () => `070-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        () => `090${Math.floor(Math.random() * 90000000 + 10000000)}`, // ハイフンなし
        () => `03-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`, // 固定電話
    ];
    return formats[Math.floor(Math.random() * formats.length)]();
};

const generateDate = () => {
    const year = 2024;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    
    const formats = [
        () => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        () => `${String(year).slice(2)}/${month}/${day}`,
        () => `${year}/${month}/${day}`,
        () => `${month}/${day}/${year}`,
        () => `${year}年${month}月${day}日`,
    ];
    return formats[Math.floor(Math.random() * formats.length)]();
};

const generatePrice = () => {
    const base = Math.floor(Math.random() * 100000) + 1000;
    const formats = [
        () => String(base),
        () => String(base) + '.0',
        () => String(base) + '.00',
        () => '¥' + String(base),
        () => String(base) + '円',
        () => '', // 空値（少数）
    ];
    return formats[Math.floor(Math.random() * formats.length)]();
};

// 小売業データベース生成（合計約500件）
const generateRetailDatabase = () => {
    const customers = [];
    const categories_data = [];
    const products_data = [];
    const orders = [];
    
    // 顧客データ (150件)
    for (let i = 1; i <= 150; i++) {
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const fullName = dataCorruptor.maybeCorrupt(`${lastName}${firstName}`);
        const email = dataCorruptor.maybeCorrupt(`${lastName.toLowerCase()}${i}@email.com`);
        const phone = dataCorruptor.maybeCorrupt(generatePhone());
        const address = dataCorruptor.maybeCorrupt(addresses[Math.floor(Math.random() * addresses.length)]);
        
        customers.push([i, fullName, email, phone, address]);
    }
    
    // カテゴリデータ (12件)
    categories.forEach((cat, i) => {
        categories_data.push([i + 1, dataCorruptor.maybeCorrupt(cat)]);
    });
    
    // 商品データ (120件)
    for (let i = 1; i <= 120; i++) {
        const productName = dataCorruptor.maybeCorrupt(products[Math.floor(Math.random() * products.length)]);
        const categoryId = Math.floor(Math.random() * categories.length) + 1;
        const price = dataCorruptor.maybeCorrupt(generatePrice());
        const stock = Math.floor(Math.random() * 1000);
        
        products_data.push([i, productName, categoryId, price, stock]);
    }
    
    // 注文データ (200件)
    for (let i = 1; i <= 200; i++) {
        const customerId = Math.floor(Math.random() * 150) + 1;
        const orderDate = dataCorruptor.maybeCorrupt(generateDate());
        const totalAmount = dataCorruptor.maybeCorrupt(generatePrice());
        
        orders.push([i, customerId, orderDate, totalAmount]);
    }
    
    return { customers, categories_data, products_data, orders };
};

// 金融業データベース生成（合計約300件）
const generateFinanceDatabase = () => {
    const customers = [];
    const branches = [];
    const accounts = [];
    const transactions = [];
    
    // 顧客データ (80件)
    for (let i = 1; i <= 80; i++) {
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const fullName = dataCorruptor.maybeCorrupt(`${lastName}${firstName}`);
        const birthYear = Math.floor(Math.random() * 40) + 1960;
        const birthMonth = Math.floor(Math.random() * 12) + 1;
        const birthDay = Math.floor(Math.random() * 28) + 1;
        const birthDate = dataCorruptor.maybeCorrupt(`${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`);
        const ssn = dataCorruptor.maybeCorrupt(`${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 9000 + 1000)}`);
        const phone = dataCorruptor.maybeCorrupt(generatePhone());
        const address = dataCorruptor.maybeCorrupt(addresses[Math.floor(Math.random() * addresses.length)]);
        
        customers.push([i, fullName, birthDate, ssn, phone, address]);
    }
    
    // 支店データ (12件)
    const branchNames = ['本店', '渋谷支店', '新宿支店', '大阪支店', '名古屋支店', '福岡支店', '札幌支店', '仙台支店', '横浜支店', '神戸支店', '広島支店', '静岡支店'];
    branchNames.forEach((name, i) => {
        const branchName = dataCorruptor.maybeCorrupt(name);
        const branchAddress = dataCorruptor.maybeCorrupt(addresses[Math.floor(Math.random() * addresses.length)] + `${i+1}-${i+1}-${i+1}`);
        const branchPhone = dataCorruptor.maybeCorrupt(`0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`);
        
        branches.push([i + 1, branchName, branchAddress, branchPhone]);
    });
    
    // 口座データ (100件)
    for (let i = 1; i <= 100; i++) {
        const accountId = 1000 + i;
        const customerId = Math.floor(Math.random() * 80) + 1;
        const accountType = dataCorruptor.maybeCorrupt(['普通', '定期', '当座'][Math.floor(Math.random() * 3)]);
        const balance = dataCorruptor.maybeCorrupt(String(Math.floor(Math.random() * 10000000)));
        const openDate = dataCorruptor.maybeCorrupt(generateDate());
        
        accounts.push([accountId, customerId, accountType, balance, openDate]);
    }
    
    // 取引データ (120件)
    for (let i = 1; i <= 120; i++) {
        const accountId = 1000 + Math.floor(Math.random() * 100) + 1;
        const transactionType = dataCorruptor.maybeCorrupt(['入金', '出金', '振込', '利息'][Math.floor(Math.random() * 4)]);
        const amount = dataCorruptor.maybeCorrupt(String(Math.floor(Math.random() * 1000000)));
        const transactionDate = dataCorruptor.maybeCorrupt(generateDate());
        const description = dataCorruptor.maybeCorrupt(['ATM出金', '給与振込', '振込', '利息'][Math.floor(Math.random() * 4)]);
        
        transactions.push([i, accountId, transactionType, amount, transactionDate, description]);
    }
    
    return { customers, branches, accounts, transactions };
};

// 不動産業データベース生成（合計約200件）
const generateRealestateDatabase = () => {
    const properties = [];
    const agents = [];
    const clients = [];
    const viewings = [];
    
    // 物件データ (60件)
    for (let i = 1; i <= 60; i++) {
        const address = dataCorruptor.maybeCorrupt(addresses[Math.floor(Math.random() * addresses.length)] + `${i}-${i}-${i}`);
        const propertyType = dataCorruptor.maybeCorrupt(['マンション', 'アパート', '一戸建て', 'コンドミニアム'][Math.floor(Math.random() * 4)]);
        const bedrooms = String(Math.floor(Math.random() * 5) + 1);
        const bathrooms = String(Math.floor(Math.random() * 3) + 1);
        const squareFeet = String((Math.random() * 100 + 50).toFixed(1));
        const price = dataCorruptor.maybeCorrupt(String(Math.floor(Math.random() * 100000000) + 20000000));
        
        properties.push([i, address, propertyType, bedrooms, bathrooms, squareFeet, price]);
    }
    
    // 営業担当データ (20件)
    for (let i = 1; i <= 20; i++) {
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const fullName = dataCorruptor.maybeCorrupt(`${lastName}${firstName}`);
        const phone = dataCorruptor.maybeCorrupt(generatePhone());
        const email = dataCorruptor.maybeCorrupt(`${lastName.toLowerCase()}${i}@realestate.com`);
        const commissionRate = dataCorruptor.maybeCorrupt((Math.random() * 0.05 + 0.02).toFixed(3));
        
        agents.push([i, fullName, phone, email, commissionRate]);
    }
    
    // 顧客データ (70件)
    for (let i = 1; i <= 70; i++) {
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const fullName = dataCorruptor.maybeCorrupt(`${lastName}${firstName}`);
        const phone = dataCorruptor.maybeCorrupt(generatePhone());
        const email = dataCorruptor.maybeCorrupt(`${lastName.toLowerCase()}${i}@email.com`);
        const budgetMin = dataCorruptor.maybeCorrupt(String(Math.floor(Math.random() * 50000000) + 20000000));
        const budgetMax = dataCorruptor.maybeCorrupt(String(Math.floor(Math.random() * 50000000) + 50000000));
        
        clients.push([i, fullName, phone, email, budgetMin, budgetMax]);
    }
    
    // 内見データ (80件)
    for (let i = 1; i <= 80; i++) {
        const propertyId = Math.floor(Math.random() * 60) + 1;
        const clientId = Math.floor(Math.random() * 70) + 1;
        const agentId = Math.floor(Math.random() * 20) + 1;
        const viewingDate = dataCorruptor.maybeCorrupt(generateDate());
        const notes = dataCorruptor.maybeCorrupt(['良好な立地', '価格要相談', 'リフォーム必要', '眺望良好', '駅近で便利'][Math.floor(Math.random() * 5)]);
        
        viewings.push([i, propertyId, clientId, agentId, viewingDate, notes]);
    }
    
    return { properties, agents, clients, viewings };
};

// メイン実行
console.log('大量データ生成開始...');

const retail = generateRetailDatabase();
const finance = generateFinanceDatabase();
const realestate = generateRealestateDatabase();

console.log(`
生成完了:

小売業データベース (${retail.customers.length + retail.categories_data.length + retail.products_data.length + retail.orders.length}件):
- 顧客: ${retail.customers.length}件
- カテゴリ: ${retail.categories_data.length}件  
- 商品: ${retail.products_data.length}件
- 注文: ${retail.orders.length}件

金融業データベース (${finance.customers.length + finance.branches.length + finance.accounts.length + finance.transactions.length}件):
- 顧客: ${finance.customers.length}件
- 支店: ${finance.branches.length}件
- 口座: ${finance.accounts.length}件
- 取引: ${finance.transactions.length}件

不動産業データベース (${realestate.properties.length + realestate.agents.length + realestate.clients.length + realestate.viewings.length}件):
- 物件: ${realestate.properties.length}件
- 営業: ${realestate.agents.length}件
- 顧客: ${realestate.clients.length}件
- 内見: ${realestate.viewings.length}件

総計: ${retail.customers.length + retail.categories_data.length + retail.products_data.length + retail.orders.length + 
         finance.customers.length + finance.branches.length + finance.accounts.length + finance.transactions.length +
         realestate.properties.length + realestate.agents.length + realestate.clients.length + realestate.viewings.length}件

汚いデータ混入率: 約25%
`);

// データ出力用
const output = {
    retail: {
        customers: { data: retail.customers },
        categories: { data: retail.categories_data },
        products: { data: retail.products_data },
        orders: { data: retail.orders }
    },
    finance: {
        customers: { data: finance.customers },
        branches: { data: finance.branches },
        accounts: { data: finance.accounts },
        transactions: { data: finance.transactions }
    },
    realestate: {
        properties: { data: realestate.properties },
        agents: { data: realestate.agents },
        clients: { data: realestate.clients },
        viewings: { data: realestate.viewings }
    }
};

// Node.js環境での実行に対応
if (typeof module !== 'undefined' && module.exports) {
    module.exports = output;
}

// ブラウザ環境での実行に対応
if (typeof window !== 'undefined') {
    window.massiveData = output;
}