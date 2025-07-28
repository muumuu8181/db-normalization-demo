/**
 * 生成した大量データをHTML埋め込み形式に変換
 */

const fs = require('fs');

// generate-massive-data.jsを実行して結果を取得
const { execSync } = require('child_process');
const output = execSync('node generate-massive-data.js', { encoding: 'utf8' });

// 大量データを生成
const massiveDataScript = require('./generate-massive-data.js');

// HTMLテンプレート（データベース定義部分のみ）
const generateDatabasesCode = (data) => {
    return `
        // データベース定義（大量データ：合計1000+件）
        const databases = {
            retail: {
                name: "小売業データベース",
                description: "EC・店舗販売のための顧客・商品・注文管理システム",
                tables: {
                    customers: {
                        name: "customers (顧客)",
                        columns: ["customer_id", "name", "email", "phone", "address"],
                        data: ${JSON.stringify(data.retail.customers.data, null, 12)}
                    },
                    categories: {
                        name: "categories (カテゴリ)",
                        columns: ["category_id", "name"],
                        data: ${JSON.stringify(data.retail.categories.data, null, 12)}
                    },
                    products: {
                        name: "products (商品)",
                        columns: ["product_id", "name", "category_id", "price", "stock"],
                        data: ${JSON.stringify(data.retail.products.data, null, 12)}
                    },
                    orders: {
                        name: "orders (注文)",
                        columns: ["order_id", "customer_id", "order_date", "total_amount"],
                        data: ${JSON.stringify(data.retail.orders.data, null, 12)}
                    }
                }
            },
            finance: {
                name: "金融業データベース", 
                description: "銀行・金融機関の顧客・口座・取引管理システム",
                tables: {
                    customers: {
                        name: "customers (顧客)",
                        columns: ["customer_id", "name", "birth_date", "ssn", "phone", "address"],
                        data: ${JSON.stringify(data.finance.customers.data, null, 12)}
                    },
                    branches: {
                        name: "branches (支店)",
                        columns: ["branch_id", "name", "address", "phone"],
                        data: ${JSON.stringify(data.finance.branches.data, null, 12)}
                    },
                    accounts: {
                        name: "accounts (口座)",
                        columns: ["account_id", "customer_id", "account_type", "balance", "open_date"],
                        data: ${JSON.stringify(data.finance.accounts.data, null, 12)}
                    },
                    transactions: {
                        name: "transactions (取引)",
                        columns: ["transaction_id", "account_id", "transaction_type", "amount", "transaction_date", "description"],
                        data: ${JSON.stringify(data.finance.transactions.data, null, 12)}
                    }
                }
            },
            realestate: {
                name: "不動産業データベース",
                description: "不動産売買・賃貸仲介のための物件・顧客・契約管理システム", 
                tables: {
                    properties: {
                        name: "properties (物件)",
                        columns: ["property_id", "address", "property_type", "bedrooms", "bathrooms", "square_feet", "price"],
                        data: ${JSON.stringify(data.realestate.properties.data, null, 12)}
                    },
                    agents: {
                        name: "agents (営業担当)",
                        columns: ["agent_id", "name", "phone", "email", "commission_rate"],
                        data: ${JSON.stringify(data.realestate.agents.data, null, 12)}
                    },
                    clients: {
                        name: "clients (顧客)",
                        columns: ["client_id", "name", "phone", "email", "budget_min", "budget_max"],
                        data: ${JSON.stringify(data.realestate.clients.data, null, 12)}
                    },
                    viewings: {
                        name: "viewings (内見)",
                        columns: ["viewing_id", "property_id", "client_id", "agent_id", "viewing_date", "notes"],
                        data: ${JSON.stringify(data.realestate.viewings.data, null, 12)}
                    }
                }
            }
        };`;
};

console.log('大量データをHTML形式に変換中...');

// 現在のindex.htmlを読み込み
const currentHTML = fs.readFileSync('index.html', 'utf8');

// データベース定義部分を新しい大量データに置き換え
const newDatabasesCode = generateDatabasesCode(massiveDataScript);

// 既存のデータベース定義を探して置き換え
const startMarker = '        // データベース定義（汚いサンプルデータ込み）';
const endMarker = '        };';

const startIndex = currentHTML.indexOf(startMarker);
const endIndex = currentHTML.indexOf(endMarker, startIndex) + endMarker.length;

if (startIndex === -1 || endIndex === -1) {
    console.error('データベース定義部分が見つかりません');
    process.exit(1);
}

const newHTML = currentHTML.substring(0, startIndex) + newDatabasesCode + currentHTML.substring(endIndex);

// 新しいHTMLファイルを保存
fs.writeFileSync('index.html', newHTML, 'utf8');

console.log(`
✅ HTML更新完了！

📊 統計:
- 小売業: ${massiveDataScript.retail.customers.data.length + massiveDataScript.retail.categories.data.length + massiveDataScript.retail.products.data.length + massiveDataScript.retail.orders.data.length}件
- 金融業: ${massiveDataScript.finance.customers.data.length + massiveDataScript.finance.branches.data.length + massiveDataScript.finance.accounts.data.length + massiveDataScript.finance.transactions.data.length}件  
- 不動産業: ${massiveDataScript.realestate.properties.data.length + massiveDataScript.realestate.agents.data.length + massiveDataScript.realestate.clients.data.length + massiveDataScript.realestate.viewings.data.length}件

🗑️ 汚いデータ混入率: 約25%
💾 ファイルサイズ: ${Math.round(newHTML.length / 1024)}KB

これで大量の汚いデータでリアルなデータクリーニング体験ができます！
`);