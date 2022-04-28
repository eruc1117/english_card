# 單字卡

![image](picture/indexpage.png)
***

## 使用者

* 登入後可以建立、修改及刪除字卡
* 可以用單字的前段來進行搜尋
* 可以建立測驗，題數為 1 ~ 10
* 連續答對五次會有皇冠提示

***

## 在本機運行伺服器

<br>

環境要求

* [npm](https://www.npmjs.com/)
* [node.js](https://nodejs.org/en/)
* [mongodb](https://www.mongodb.com/)
* [python 3](https://www.python.org/)(非必要)
<br>

1. 下載專案<br>
```$ git clone https://github.com/eruc1117/english_card.git```
<br>
2. 安裝 Node package<br>
```$ cd english_card```<br>
```$ npm install```<br>
<br>
3. 生成環境檔案 .env <br>
參照 .example.env 檔案提示<br>
<br>
4. 產生種子資料(可選)
```python3 seedJson.js```<br>

>可以設定使用者信箱及密碼一組，指定數量的假資料<br>
<br>

5. 執行<br>
```npm run dev```
