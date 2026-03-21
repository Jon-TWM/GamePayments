# Phase 3 切版交接筆記

## 本次新增 / 異動摘要

### 新增頁面
| 檔案 | 說明 |
|------|------|
| `login.html` | 會員帳號登入（含遊客登入提醒、隱私權政策、會員服務條款彈窗） |
| `bind.html` | 會員帳號綁定（台灣大哥大 / Facebook / Google / Apple ID，含已綁定狀態） |
| `popup-msg.html` | 通用訊息彈窗展示（成功 / 失敗警示 / 一般訊息，三種並排展示） |

### 新增檔案
| 檔案 | 說明 |
|------|------|
| `.gitignore` | 排除 `.claude/worktrees/` |

### 新增圖片
| 檔案 | 說明 |
|------|------|
| `src/images/icon-login-twm.svg` | TWM 登入 icon |
| `src/images/icon-login-facebook.svg` | Facebook 登入 icon |
| `src/images/icon-login-google.svg` | Google 登入 icon |
| `src/images/icon-login-apple.svg` | Apple 登入 icon |

### 刪除圖片
| 檔案 | 原因 |
|------|------|
| `src/images/icon-social-apple.svg` | 已改用 `icon-login-*` 系列 |
| `src/images/icon-social-facebook.svg` | 同上 |
| `src/images/icon-social-google.svg` | 同上 |
| `src/images/icon-popup-error.svg` | 未使用，popup-msg 改用 `icon-result-*` |
| `src/images/icon-popup-success.svg` | 同上 |
| `src/images/icon-login-google-1.svg` | 備用檔，未使用 |

---

## RD 需覆蓋的檔案清單

### HTML
| 檔案 | 異動說明 |
|------|---------|
| `login.html` | 新增。TWM 登入用 `.btn-text-card--fill`，社群登入用 `.btn--square` |
| `bind.html` | 新增。icon 統一為 `icon-login-*` |
| `popup-msg.html` | 新增。icon 用 `icon-result-*` |
| `src/components.html` | 色票合併、新增品牌色/btn--square/btn-text-card--fill 展示 |

### CSS（RD 覆蓋這些即可，不需要 SCSS）
| CSS 檔案 | 對應 SCSS | 異動說明 |
|----------|-----------|---------|
| `css/style.css` | `scss/style.scss`（含所有 components） | 按鈕重構、品牌色、btn--square、btn-text-card--fill、popup 共用樣式 |
| `css/login.css` | `scss/pages/login.scss` | 清除舊 `.login-social__btn`，改用共用元件 |
| `css/bind.css` | `scss/pages/bind.scss` | 清除舊 `#bind-popup` |
| `css/confirm.css` | `scss/pages/confirm.scss` | 移除重複 popup 樣式 |
| `css/invoice.css` | `scss/pages/invoice.scss` | 同上 |
| `css/popup-msg.css` | `scss/pages/popup-msg.scss` | 新增頁面層 padding |
| `css/home.css` | `scss/pages/home.scss` | layout 背景色改用變數（微調） |
| `css/result.css` | `scss/pages/result.scss` | 重新編譯（無邏輯變更） |

### 圖片
- 新增 4 個：`icon-login-twm/facebook/google/apple.svg`
- 刪除 6 個：見上方「刪除圖片」

---

## ⚠️ 元件層異動（影響所有頁面）

以下異動寫在共用 `css/style.css` 裡，會影響所有引用它的頁面。

### 1. `_variables.scss` — 新增品牌色 token
```scss
$color-brand-facebook: #0866FF;
$color-brand-facebook-dark: #0033AA;  // hover
$color-brand-google: #F2F2F2;
$color-brand-google-dark: #E5E5E5;   // hover
$color-brand-apple: #000000;
$color-brand-apple-dark: #444444;     // hover
$color-brand-guest-dark: #6B7685;     // hover
```

### 2. `_button.scss` — 按鈕系統重構

#### `.btn` 基礎（統一入口）
所有按鈕以 `.btn` 為基礎，透過修飾符組合功能：

#### `.btn--square`（新增）
```html
<button class="btn btn--square btn--facebook">
  <img src="icon-login-facebook.svg" alt="" />
</button>
```
- 方形按鈕（44×44px），可放圖片或文字
- 文字 12px 自動換行
- 品牌色直接沿用 `--facebook` / `--google` / `--apple` / `--guest`

#### `.btn--guest`（新增）
- 品牌色修飾符：灰底 `#838D9C`、白字

#### `.btn--facebook` / `--google` / `--apple`（更新色碼）
- Facebook: `#0866FF`（原 `#1877F2`）
- Google: `#F2F2F2` 底 + `#000` 字（原灰底灰字）
- Apple: `#000000`（原 `#2D3033`）
- 所有品牌色 `disabled` 統一變灰（`#E9EBEF` 底 + `#A8AEB8` 字）

#### `.btn--block`（新增）
```html
<button class="btn btn--block">永遠 100% 寬</button>
```
- 所有斷點 `width: 100%`，適用於需要撐滿容器的按鈕（如 bind.html 綁定選項）

### 3. `_button.scss` — btn-text-card--fill（新增）
```html
<button class="btn-text-card btn-text-card--fill">
  Fill 文字按鈕
  <div class="arrow"><img src="icon-btn-text-card-arrow.svg" alt="" /></div>
</button>
```
- 主色填底（`#FF6700`）、白字版本
- 適用於需要強調的入口按鈕（如「台灣大哥大會員登入」）

### 4. `_card.scss` — popup 元件統一

#### `.popup .content-block` 共用佈局
```css
display: grid;
gap: 24px;
h4 { text-align: center; }
```

#### `.popup .text-wrap` 共用捲軸
```css
max-height: 56vh;
overflow-y: auto;
```

#### `.popup .btn-wrap` 共用間距
```css
display: flex;
flex-direction: column;
gap: 16px;
@media (min-width: 768px) { flex-direction: row; }
```
- popup 單顆按鈕時，中網以上自動 `width: auto` 並置中（`:only-child`）

---

## ⚠️ 既有頁面 HTML 異動

### popup 按鈕 class
所有 popup 內單顆按鈕維持 `btn btn--block-mobile`（小網 100%、中網以上 auto 置中），與頁面主按鈕一致，無異動。

### login.html 元件替換
| 元素 | 舊寫法 | 新寫法 |
|------|--------|--------|
| 台灣大哥大會員登入 | `btn-text-card btn--block-mobile` | `btn-text-card btn-text-card--fill` |
| 社群登入按鈕 | `login-social__btn` | `btn btn--square btn--apple/google/facebook` |
| 遊客登入 | `login-social__btn--guest` | `btn btn--square btn--guest` |

### bind.html icon 統一
disabled 組 icon 從 `icon-social-*` 改為 `icon-login-*`（與正常組一致）。

---

## 未異動頁面
| 頁面 | 說明 |
|------|------|
| `index.html` | 無異動 |
| `confirm.html` | HTML 無異動（CSS 移除重複 popup 樣式） |
| `invoice.html` | HTML 無異動（CSS 移除重複 popup 樣式） |
| `result.html` | 無異動（CSS 重新編譯但無邏輯變更） |

---

## RD 接手注意事項

### Disabled 狀態處理
- 按鈕加 `disabled` 屬性即可，CSS 自動處理灰色底 + 灰字
- `.btn--icon` 的 icon 在 disabled 時由 CSS 自動隱藏（`bind.scss` 的 `.bind-grid .btn[disabled] .icon { display: none; }`）
- 品牌色 disabled 統一外觀，不需額外處理

### 按鈕組合規則
```
.btn                          → 基礎膠囊按鈕（橘底白字）
.btn .btn--square             → 方形按鈕
.btn .btn--block              → 寬度永遠 100%
.btn .btn--block-mobile       → 小網 100%、中網以上 auto
.btn .btn--icon               → 帶 icon
.btn .btn--facebook/google/apple/guest  → 品牌色（可與上述任意組合）
.btn .btn--outline            → 外框按鈕
.btn-text-card                → 卡片式按鈕（白底）
.btn-text-card .btn-text-card--fill  → 卡片式按鈕（主色填底）
```
