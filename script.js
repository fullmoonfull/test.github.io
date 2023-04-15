// DOM要素を取得
const clickerButton = document.getElementById("clicker");
const resetButton = document.getElementById("reset");
const clicksCount = document.getElementById("clicks");
const clickPowerDisplay = document.getElementById("clickPower");
const sigusiguPowerDisplay = document.getElementById("sigusiguPower");


const buyItemButtons = [
  document.getElementById("buyItem1"),
  document.getElementById("buyItem2"),
  document.getElementById("buyItem3"),
  document.getElementById("buyItem4"),
];

const buysigusiguButtons = [
  document.getElementById("buyhuman1"),
];

const itemCounts = [
  document.getElementById("item1Count"),
  document.getElementById("item2Count"),
  document.getElementById("item3Count"),
  document.getElementById("item4Count"),
  document.getElementById("human1Count"),
];

const itemCosts = [
  document.getElementById("item1Cost"),
  document.getElementById("item2Cost"),
  document.getElementById("item3Cost"),
  document.getElementById("item4Cost"),
  document.getElementById("human1Cost"),
];

const sigusiguCosts = [
  document.getElementById("human1Cost"),
];


// localStorageから保存されたゲームの状態をロードするか、デフォルト値を設定
let clicks = parseInt(localStorage.getItem("clicks")) ||0;
let clickPower =  parseInt(localStorage.getItem("clickPower")) ||1;
let sigusiguPower =  parseInt(localStorage.getItem("sigusiguPower")) ||0;
let itemLevels =  JSON.parse(localStorage.getItem("itemLevels")) ||[0, 0, 0, 0, 0];
let itemPrices =  JSON.parse(localStorage.getItem("itemPrices")) ||[10, 100, 1000, 10000];
let sigusiguPrices =  JSON.parse(localStorage.getItem("sigusiguPrices")) ||[100];
let itemPowerUps = parseInt(localStorage.getItem("itemPowerUps")) ||[5, 50, 500, 5000];
let sigusiguPowerUps = parseInt(localStorage.getItem("sigusiguPowerUps")) ||[1];

// ゲームの状態を保存する関数
function saveGameState() {
  localStorage.setItem("clicks", clicks);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("sigusiguPower", sigusiguPower);
  localStorage.setItem("itemLevels", JSON.stringify(itemLevels));
  localStorage.setItem("itemPrices", JSON.stringify(itemPrices));
  localStorage.setItem("sigusiguPrices", JSON.stringify(sigusiguPrices));
}

// クリックボタンのイベントリスナー
clickerButton.addEventListener("click", () => {
  clicks += clickPower;
  clicksCount.innerText = clicks;
  se1.play();  
  updateButtonStates();
  saveGameState();
});

// しぐしぐ生産のイベントリスナー　パワーと価格情報の更新も
function sigu() {
  clicks += sigusiguPower;
  clicksCount.innerText = clicks;
  clickPowerDisplay.innerText = clickPower;
  sigusiguPowerDisplay.innerText = sigusiguPower;
  sigusiguPowerDisplay.innerText = sigusiguPower;
  updateButtonStates();
  saveGameState();
}

window.setInterval(sigu, 1000);

setInterval(function() {
  var itemPrices = JSON.parse(localStorage.getItem("itemPrices"));
  document.getElementById("item1Cost").innerHTML = itemPrices[0]; 
  document.getElementById("item2Cost").innerHTML = itemPrices[1]; 
  document.getElementById("item3Cost").innerHTML = itemPrices[2]; 
  document.getElementById("item4Cost").innerHTML = itemPrices[3]; 
  document.getElementById("human1Cost").innerHTML = sigusiguPrices[0]; 
}, 100); // 0.1秒ごとに数値を更新する


// 各アイテム購入ボタンのイベントリスナー
buyItemButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (clicks >= itemPrices[index]) {
      clicks -= itemPrices[index];
      itemLevels[index]++;
      itemPrices[index] = Math.ceil(itemPrices[index] * 1.25);
      clickPower += itemPowerUps[index];

      itemCounts[index].innerText = itemLevels[index];
      itemCosts[index].innerText = itemPrices[index];
      clicksCount.innerText = clicks;
      clickPowerDisplay.innerText = clickPower;
      updateButtonStates();
      saveGameState();
    }
  });
});

// しぐしぐ購入ボタンのイベントリスナー
buysigusiguButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (clicks >= sigusiguPrices[index]) {
      clicks -= sigusiguPrices[index];
      itemLevels[index]++;
      sigusiguPrices[index] = Math.ceil(sigusiguPrices[index] * 1.25);
      sigusiguPower += sigusiguPowerUps[index];

      itemCounts[index].innerText = itemLevels[index];
      sigusiguCosts[index].innerText = sigusiguPrices[index];
      clicksCount.innerText = clicks;
      sigusiguPowerDisplay.innerText = sigusiguPower;
      updateButtonStates();
      saveGameState();
    }
  });
});

// 購入ボタンの状態を更新する関数
function updateButtonStates() {
  buyItemButtons.forEach((button, index) => {
    button.disabled = clicks < itemPrices[index];
  });

  buysigusiguButtons.forEach((button, index) => {
    button.disabled = clicks < sigusiguPrices[index];
  });
}

//BGM ONOFF
const bgm = new Audio('audio/bgm.mp3'); 
bgm.loop = true;
const bgmButton = document.getElementById('bgmButton');



bgmButton.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play(); // BGMを再生する
   bgmButton.textContent = 'OFFにする';
  } else {
  bgm.pause(); // BGMを停止する
    bgmButton.textContent = 'ONにする';
  }
});



//SEを出す
const sound1 = new Audio('audio/btn_audio.mp3');
const clickbutton = document.getElementById('clicker');
clickbutton.addEventListener('click', () => {
  sound1.currentTime = 0;
  sound1.play();
});

const sound2 = new Audio('audio/buy_audio.mp3');
const buybutton = document.querySelectorAll('#buyItem1, #buyItem2, #buyItem3, #buyItem4, #buyhuman1');
buybutton.forEach((button) => {
  button.addEventListener('click', () => {
    sound2.currentTime = 0;
    sound2.play();
  });
});

// BGMボリューム設定
let belem_volume = document.getElementById("bgm_volume");
let belem_range = document.getElementById("bgm_vol_range");

bgm.volume = belem_volume.value;

belem_volume.addEventListener("change", function(){
	bgm.volume = belem_volume.value;
	belem_range.textContent = belem_volume.value;
}, false);

// SEボリューム設定
let elem_volume = document.getElementById("se_volume");
let elem_range = document.getElementById("se_vol_range");

sound1.volume = elem_volume.value;
sound2.volume = elem_volume.value;

elem_volume.addEventListener("change", function(){
	sound1.volume = elem_volume.value;
  sound2.volume = elem_volume.value;
	elem_range.textContent = elem_volume.value;
}, false);

//リセット処理 絶対もっと短くできるよ
resetButton.addEventListener("click", () => {
  localStorage.removeItem("clicks");
  localStorage.removeItem("clickPower");
  localStorage.removeItem("sigusiguPower");
  localStorage.removeItem("itemLevels");
  localStorage.removeItem("itemPrices");
  localStorage.removeItem("sigusiguPrices");
  clicks = 0;
  clickPower =  1;
  sigusiguPower =  0;
  itemLevels =  [0, 0, 0, 0, 0];
  itemPrices =  [10, 100, 1000, 10000];
  sigusiguPrices = [100];
  itemPowerUps = [5, 50, 500, 5000];
  sigusiguPowerUps = [1];
  document.getElementById("item1Cost").innerText = "10";
  document.getElementById("item2Cost").innerText = "100";
  document.getElementById("item3Cost").innerText = "1000";
  document.getElementById("item4Cost").innerText = "10000";
  document.getElementById("human1Cost").innerText = "100";
  document.getElementById("item1Count").innerText = "0";
  document.getElementById("item2Count").innerText = "0";
  document.getElementById("item3Count").innerText = "0";
  document.getElementById("item4Count").innerText = "0";
  document.getElementById("human1Count").innerText = "0";
  updateButtonStates();
  saveGameState();
});


// 初期状態の更新
clicksCount.innerText = clicks;
clickPowerDisplay.innerText = clickPower;
sigusiguPowerDisplay.innerText = sigusiguPower;
itemCounts.forEach((itemCount, index) => {
  itemCount.innerText = itemLevels[index];
});
itemCosts.forEach((itemCost, index) => {
  itemCost.innerText = itemPrices[index];
});
updateButtonStates();

