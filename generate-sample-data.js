/**
 * サンプルデータ生成スクリプト
 * 汚い品質のリアルなテストデータを大量生成
 */

// データ汚し用のヘルパー関数
const dataCorruptor = {
    // ランダムに空白を追加
    addRandomSpaces: (str) => {
        const spaces = ['', ' ', '　', '  ', '\t', ' \t '];
        const prefix = Math.random() < 0.3 ? spaces[Math.floor(Math.random() * spaces.length)] : '';
        const suffix = Math.random() < 0.3 ? spaces[Math.floor(Math.random() * spaces.length)] : '';
        return prefix + str + suffix;
    },
    
    // ランダムに大文字・小文字を混在
    randomizeCase: (str) => {
        if (Math.random() < 0.2) {
            return str.toUpperCase();
        } else if (Math.random() < 0.2) {
            return str.toLowerCase();
        } else if (Math.random() < 0.3) {
            // 一部だけ大文字
            return str.split('').map(char => 
                Math.random() < 0.3 ? char.toUpperCase() : char.toLowerCase()
            ).join('');
        }
        return str;
    },
    
    // ランダムに特殊文字を混入
    addSpecialChars: (str) => {
        const specials = ['<', '>', '"', '&', '\\', '/', '?', '#', '@', '!', '★', '※'];
        if (Math.random() < 0.1) {
            const special = specials[Math.floor(Math.random() * specials.length)];
            const pos = Math.floor(Math.random() * str.length);
            return str.slice(0, pos) + special + str.slice(pos);
        }
        return str;
    },
    
    // NULL値やemptyをランダムに混入
    randomNull: (str) => {
        const nulls = ['', 'NULL', 'null', 'N/A', '-', '未入力'];
        if (Math.random() < 0.08) {
            return nulls[Math.floor(Math.random() * nulls.length)];
        }
        return str;
    },
    
    // 全ての汚し処理を適用
    corrupt: (str) => {
        if (typeof str !== 'string') return str;
        let result = str;
        result = dataCorruptor.addRandomSpaces(result);
        result = dataCorruptor.randomizeCase(result);
        result = dataCorruptor.addSpecialChars(result);
        result = dataCorruptor.randomNull(result);
        return result;
    }
};

// 日本人の名前リスト
const firstNames = [
    '太郎', '花子', '一郎', '美咲', '次郎', '智子', '三郎', '由美', '四郎', '恵子',
    '五郎', '真理', '六郎', '裕子', '七郎', '康子', '八郎', '典子', '九郎', '明美',
    '健太', '優子', '大輔', '直美', '翔太', '久美子', '拓也', '加奈子', '雄大', '理恵',
    'ケンタ', 'ユウコ', 'タクヤ', 'アキラ', 'ミカ', 'サトミ', 'ヒロシ', 'ナオコ'
];

const lastNames = [
    '田中', '佐藤', '鈴木', '高橋', '渡辺', '伊藤', '山本', '中村', '小林', '加藤',
    '吉田', '山田', '松本', '井上', '木村', '林', '清水', '山崎', '森', '池田',
    '橋本', '斎藤', '竹内', '石川', '中島', '前田', '福田', '小川', '後藤', '岡田',
    'TANAKA', 'SATO', 'SUZUKI', 'TAKAHASHI', 'Yamamoto'
];

// 住所リスト
const addresses = [
    '東京都渋谷区', '大阪府大阪市', '愛知県名古屋市', '神奈川県横浜市', '福岡県福岡市',
    '北海道札幌市', '宮城県仙台市', '埼玉県さいたま市', '千葉県千葉市', '兵庫県神戸市',
    '京都府京都市', '広島県広島市', '静岡県静岡市', '茨城県水戸市', '栃木県宇都宮市',
    '群馬県前橋市', '新潟県新潟市', '富山県富山市', '石川県金沢市', '福井県福井市'
];

// 商品名リスト
const products = [
    'ノートPC', 'マウス', 'キーボード', '液晶モニター', 'SSD', 'HDD', 'メモリ',
    'プリンター', 'スキャナー', 'Webカメラ', 'マイク', 'スピーカー', 'ヘッドホン',
    'タブレット', 'スマートフォン', '充電器', 'USBケーブル', 'LANケーブル',
    'WiFiルーター', 'モデム', 'ハブ', 'スイッチ', 'ファイアウォール'
];

// カテゴリリスト
const categories = [
    'コンピュータ', 'コンピューター', 'PC周辺機器', 'ストレージ', 'ネットワーク機器',
    'audio機器', '映像機器', 'モバイル機器', 'ケーブル類', 'アクセサリ'
];

// 電話番号生成
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

// 日付生成
const generateDate = () => {
    const formats = [
        () => `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        () => `24/${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}`,
        () => `2024/${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}`,
        () => `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/2024`,
        () => `2024年${Math.floor(Math.random() * 12) + 1}月${Math.floor(Math.random() * 28) + 1}日`,
    ];
    return formats[Math.floor(Math.random() * formats.length)]();
};

// 価格生成
const generatePrice = () => {
    const base = Math.floor(Math.random() * 100000) + 1000;
    const formats = [
        () => String(base),
        () => String(base) + '.0',
        () => String(base) + '.00',
        () => '¥' + String(base),
        () => String(base) + '円',
        () => '', // 空値
    ];
    return formats[Math.floor(Math.random() * formats.length)]();
};

// 小売業データベース生成
const generateRetailData = () => {
    const customers = [];
    const categories_data = [];
    const products_data = [];
    const orders = [];
    
    // 顧客データ (200件)
    for (let i = 1; i <= 200; i++) {
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const fullName = dataCorruptor.corrupt(`${lastName}${firstName}`);
        const email = dataCorruptor.corrupt(`${lastName.toLowerCase()}${i}@email.com`);
        const phone = dataCorruptor.corrupt(generatePhone());
        const address = dataCorruptor.corrupt(addresses[Math.floor(Math.random() * addresses.length)]);
        
        customers.push([i, fullName, email, phone, address]);
    }
    
    // カテゴリデータ (15件)
    categories.forEach((cat, i) => {
        categories_data.push([i + 1, dataCorruptor.corrupt(cat)]);
    });
    
    // 商品データ (150件)
    for (let i = 1; i <= 150; i++) {
        const productName = dataCorruptor.corrupt(products[Math.floor(Math.random() * products.length)]);
        const categoryId = Math.floor(Math.random() * categories.length) + 1;
        const price = dataCorruptor.corrupt(generatePrice());
        const stock = Math.floor(Math.random() * 1000);
        
        products_data.push([i, productName, categoryId, price, stock]);
    }
    
    // 注文データ (300件)
    for (let i = 1; i <= 300; i++) {
        const customerId = Math.floor(Math.random() * 200) + 1;
        const orderDate = dataCorruptor.corrupt(generateDate());
        const totalAmount = dataCorruptor.corrupt(generatePrice());
        
        orders.push([i, customerId, orderDate, totalAmount]);
    }
    
    return {
        customers: { data: customers },
        categories: { data: categories_data },
        products: { data: products_data },
        orders: { data: orders }
    };
};

// メイン実行
console.log('大量サンプルデータ生成中...');
const retailData = generateRetailData();

console.log(`生成完了:
- 顧客: ${retailData.customers.data.length}件
- カテゴリ: ${retailData.categories.data.length}件  
- 商品: ${retailData.products.data.length}件
- 注文: ${retailData.orders.data.length}件`);

// サンプル表示
console.log('\n=== サンプルデータ (最初の5件) ===');
console.log('顧客:', retailData.customers.data.slice(0, 5));
console.log('商品:', retailData.products.data.slice(0, 5));
console.log('注文:', retailData.orders.data.slice(0, 5));

// JSONファイルとして出力するためのexport
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateRetailData };
}