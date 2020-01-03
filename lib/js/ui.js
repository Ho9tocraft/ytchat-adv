"use strict";
// UI
// ------------------------------
// 入力欄拡張
autosize(document.querySelectorAll('.autosize'));
function autosize (elm){
  autosizeSet(elm.length ? elm : [elm]);
}
function autosizeSet (elm){
  elm.forEach(function(obj) {
    obj.addEventListener("input",function(e){ autosizeResize([e.srcElement]); });
  });
}
function autosizeUpdate (elm){
  autosizeResize(elm.length ? elm : [elm]);
}
function autosizeResize (elm){
  elm.forEach(function(obj) {
    if(obj.offsetHeight > obj.scrollHeight){
      obj.style.height = "auto";
    }
    if(obj.offsetHeight < obj.scrollHeight){
      obj.style.height = obj.scrollHeight + "px";
    }
  });
}

// チャットログを最下部まで
function scrollBottom(tabId){
  const tab = document.getElementById('chat-logs-tab'+tabId);
  const tabname = document.querySelector('#chat-tab'+tabId+' > h2 .tab-name');
  const notice  = document.querySelector('#chat-tab'+tabId+' > .notice-unread');
  tab.scrollTop = tab.scrollHeight;
  tabname.dataset.unread = 0;
  notice.dataset.unread = 0;
}
// ログのスクロール位置を確認
function scrollCheck(tabId){
  if(window.matchMedia('(max-width:600px)').matches && tabId != mainTab){
    return 0;
  }
  if(!document.getElementById('chat-tab'+tabId).classList.contains('close')){
    const obj = document.getElementById('chat-logs-tab'+tabId);
    const bottom = obj.scrollHeight - obj.clientHeight;
    if (bottom - 100 <= obj.scrollTop) {
      return 1;
    }
  }
}

// ミュートボタン
let muteOn = 0;
function muteToggle(){
  const obj = document.getElementById('mute-button');
  if(muteOn){
    obj.classList.remove('mute-on');
    muteOn = 0;
  }
  else {
    obj.classList.add('mute-on');
    muteOn = 1;
  }
}

// フォントサイズ
$(function($){
  $(document).on("input", '.option-fontsize-tab', function(e) {
    const num = e.target.closest('.chat').dataset.tab;
    const lines = document.querySelectorAll('#chat-logs-tab'+num);
    lines.forEach(function(line) {
      line.style.fontSize = e.target.value+'%';
    });
  });
});

// ボックス透過率
const optionBoxOpacity = document.getElementById('option-box-opacity');
optionBoxOpacity.oninput = function (){
  const boxes = document.getElementsByClassName('box');
  for(let i=0; i<boxes.length; i++){
    boxes[i].style.backgroundColor =  'rgba(0,0,0,'+ optionBoxOpacity.value +')';
  }
};

// フォント明暗
const optionFontBrightness = document.getElementById('option-font-brightness');
optionFontBrightness.oninput = function (){
  const color = Number(optionFontBrightness.value).toString(16);
  const logs = document.getElementsByClassName('logs-font');
  for(let i=0; i<logs.length; i++){
    logs[i].style.color = '#'+color+color+color;
  }
};

//フォント変更
function fontFamilyChange(font){
  const elm = document.querySelectorAll('.logs-font, .form-comm');
  fontFamilySet(font,elm);
  fontFamily = font;
  localStorage.setItem('fontFamily', fontFamily);
}
function fontFamilySet(font,elm){
  elm.forEach(function(obj) {
    obj.style.fontFamily = '"Lato",'+font+',"UD Digi Kyokasho NP-R","Meiryo","YuKyokasho Yoko"';
  });
}

//レイアウト変更
function layoutChange(layout){
  const base      = document.getElementById('base');
  const sidebar   = document.getElementById('sidebar');
  const sheet     = document.getElementById('sheet-area');
  const topicEdit = document.getElementById('edit-topic');
  if(layout === 'CLStop'){
    base.style.gridTemplateColumns = '1fr 11em max-content';
    base.style.gridTemplateAreas   = `
      " menu  menu sheet"
      "topic  side sheet"
      "close  side sheet"
      " chat  side sheet"
      " form  form  form"
      " foot  foot  foot"`;
    sheet.classList.remove('left');
  }
  else if(layout === 'SCLtop'){
    base.style.gridTemplateColumns = 'max-content 1fr 11em';
    base.style.gridTemplateAreas   = `
      "sheet  menu  menu"
      "sheet topic  side"
      "sheet close  side"
      "sheet  chat  side"
      " form  form  form"
      " foot  foot  foot"`;
    sheet.classList.add('left');
  }
  else if(layout === 'SLCtop'){
    base.style.gridTemplateColumns = 'max-content 11em 1fr';
    base.style.gridTemplateAreas   = `
      "sheet  menu  menu"
      "sheet  side topic"
      "sheet  side close"
      "sheet  side  chat"
      " form  form  form"
      " foot  foot  foot"`;
    sheet.classList.add('left');
  }
  else if(layout === 'CLSbottom'){
    base.style.gridTemplateColumns = '1fr 11em max-content';
    base.style.gridTemplateAreas   = `
      " menu  menu sheet"
      "close  side sheet"
      " chat  side sheet"
      "topic  side sheet"
      " form  form  form"
      " foot  foot  foot"`;
    sheet.classList.remove('left');
  }
  else if(layout === 'SCLbottom'){
    base.style.gridTemplateColumns = 'max-content 1fr 11em';
    base.style.gridTemplateAreas   = `
      "sheet  menu  menu"
      "sheet close  side"
      "sheet  chat  side"
      "sheet topic  side"
      " form  form  form"
      " foot  foot  foot"`;
    sheet.classList.add('left');
  }
  else if(layout === 'SLCbottom'){
    base.style.gridTemplateColumns = 'max-content 11em 1fr';
    base.style.gridTemplateAreas   = `
      "sheet  menu  menu"
      "sheet  side close"
      "sheet  side  chat"
      "sheet  side topic"
      " form  form  form"
      " foot  foot  foot"`;
    sheet.classList.add('left');
  }
  else if(layout === 'CShighL'){
    base.style.gridTemplateColumns = '1fr max-content';
    base.style.gridTemplateAreas   = `
      " menu  sheet"
      " side  sheet"
      "topic  sheet"
      "close  sheet"
      " chat  sheet"
      " form   form"
      " foot   foot"`;
    sheet.classList.remove('left');
  }
  else if(layout === 'SChighL'){
    base.style.gridTemplateColumns = 'max-content 1fr';
    base.style.gridTemplateAreas   = `
      "sheet   menu"
      "sheet   side"
      "sheet  topic"
      "sheet  close"
      "sheet   chat"
      " form   form"
      " foot   foot"`;
    sheet.classList.add('left');
  }
  else if(layout === 'CSshallowL'){
    base.style.gridTemplateColumns = '1fr max-content';
    base.style.gridTemplateAreas   = `
      " menu  sheet"
      "close  sheet"
      " chat  sheet"
      "topic  sheet"
      " side   side"
      " form   form"
      " foot   foot"`;
    sheet.classList.remove('left');
  }
  else if(layout === 'SCshallowL'){
    base.style.gridTemplateColumns = 'max-content 1fr';
    base.style.gridTemplateAreas   = `
      "sheet   menu"
      "sheet  close"
      "sheet   chat"
      "sheet  topic"
      " side   side"
      " form   form"
      " foot   foot"`;
    sheet.classList.add('left');
  }
  else if(layout === 'CSdeepL'){
    base.style.gridTemplateColumns = '1fr max-content';
    base.style.gridTemplateAreas   = `
      " menu  sheet"
      "close  sheet"
      " chat  sheet"
      "topic  sheet"
      " form   form"
      " side   side"
      " foot   foot"`;
    sheet.classList.remove('left');
  }
  else if(layout === 'SCdeepL'){
    base.style.gridTemplateColumns = 'max-content 1fr';
    base.style.gridTemplateAreas   = `
      "sheet   menu"
      "sheet  close"
      "sheet   chat"
      "sheet  topic"
      " form   form"
      " side   side"
      " foot   foot"`;
    sheet.classList.add('left');
  }
  
  if(layout.match(/top/)){
    base.style.gridTemplateRows = '2em max-content max-content 1fr max-content max-content';
    topicEdit.style.top = '5em';
    topicEdit.style.bottom = 'auto';
    sidebar.dataset.layout = "";
  }
  else if(layout.match(/bottom/)){
    base.style.gridTemplateRows = '2em max-content 1fr max-content max-content max-content';
    topicEdit.style.top = 'auto';
    topicEdit.style.bottom = '12em';
    sidebar.dataset.layout = "bottom";
  }
  else if(layout.match(/high/)){
    base.style.gridTemplateRows = '2em max-content max-content max-content 1fr max-content max-content';
    topicEdit.style.top = '5em';
    topicEdit.style.bottom = 'auto';
    sidebar.dataset.layout = "row";
  }
  else if(layout.match(/shallow|deep/)){
    base.style.gridTemplateRows = '2em max-content 1fr max-content max-content max-content max-content';
    topicEdit.style.top = 'auto';
    topicEdit.style.bottom = '12em';
    sidebar.dataset.layout = "row";
  }
  
  localStorage.setItem('layout', layout);
}


// ボックス開閉
function boxOpen(id){
  const obj = document.getElementById(id);
  if(obj.style.opacity == 1){
    boxClose(id);
  }
  else {
    obj.style.transform = 'none';
    obj.style.opacity = 1;
  }
}
function boxClose(id){
  document.getElementById(id).style.transform = 'scaleY(0)';
  document.getElementById(id).style.opacity = 0;
}
// トピックを開く
function topicOpen(){
  boxOpen('edit-topic');
  let topicValue = document.getElementById('topic-value').innerHTML;
  topicValue = topicValue.replace(/<br>/g, '\n');
  topicValue = topicValue.replace(/&lt;/g, '<');
  topicValue = topicValue.replace(/&gt;/g, '>');
  document.getElementById('edit-topic-value').value = topicValue;
  autosizeUpdate(document.getElementById('edit-topic-value'));
}
// NPCの開閉・保存
  //開く
function npcOpen(){
  boxOpen('edit-npc');
  let npcValue = '';
  for(let i in nameList){
    if (i == 0) continue;
    npcValue += nameList[i]['name']+(nameList[i]['color']?nameList[i]['color']:'')+"\n";
  }
  document.getElementById('edit-npc-value').value = npcValue;
  autosizeUpdate(document.getElementById('edit-npc-value'));
}
  //保存
function npcSave(){
  const lines = document.getElementById('edit-npc-value').value.split(/\n/g);
  let newList = [
    { 'name': nameList[0]['name'], 'color': nameList[0]['color'] }
  ];
  for(let i=0; i<lines.length; i++){
    let color = "#" + randomColor();
    const name = lines[i].replace(/[#＃]([0-9a-zA-Z]{6})$/, () => { color = '#'+RegExp.$1; return '' });
    if(!name){ continue }
    newList[i+1] = {};
    newList[i+1]['name'] = name;
    newList[i+1]['color'] = color;
  }
  nameList = newList;
  npcBoxSet();
  localStorage.setItem(roomId+'-name', JSON.stringify(nameList));
}
// ランダムカラー
function randomColor(){
  const l = 6;
  const c = "0123456789abcdef";
  const cl = c.length;
  let r = "";
  for(var i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  }
  return r;
}
// セレクトボックスにセット
function npcBoxSet(){
  const select = document.getElementById('form-name');
  const nowSelectName = select.options[select.selectedIndex].text;
  let nowSelectValue = 0;
  while (0 < select.childNodes.length) {
    select.removeChild(select.childNodes[0]);
  }
  let n = 0;
  for(let i in nameList){
    let op = document.createElement("option");
    op.text = nameList[i]['name'];
    op.value = i;
    op.style.color = nameList[i]['color'];
    select.appendChild(op);
    if(nowSelectName === nameList[i]['name']) nowSelectValue = i;
    n++;
  }
  $("#form-name").val(nowSelectValue);
  
  //高さ
  if(window.matchMedia('(max-width:600px)').matches){ select.size = 1; }
  else { select.size = (n < 2) ? 2 : (n > 10) ? 10 : n; }
}
// 名前変更
$("#form-name").change(function(e){
  nameChange(e.target.value);
});
function nameChange(num){
  document.getElementById('main-name1').innerHTML   = nameList[num]['name'];
  document.getElementById('main-name1').style.color = nameList[num]['color'];
  document.getElementById('form-color').value      = nameList[num]['color'];
  document.getElementById('form-color-text').value = nameList[num]['color'];
  $("#form-color").spectrum("set", nameList[num]['color']);
}
// 色変更
const colorPalette = [
  ["#ffffff","#eeeeee","#cccccc","#aaaaaa","#888888","#666666","#444444","#222222","#000000"],
  
  ["#56002b","#812b56","#81002b","#ab002b","#ab0056","#ab2b56","#ab5681","#d581ab","#d55681","#d52b56","#d52b81","#d5002b","#d50056","#ff002b"],
  ["#ff0056","#ff0081","#ff2b56","#ff2b81","#ff5681","#ff56ab","#ff81ab","#ffabd5","#ffd5d5","#ffabab","#ff8181","#ffab81","#ff5656","#ff8156"],
  ["#ff2b2b","#ff562b","#ff812b","#ff0000","#ff2b00","#ff5600","#d50000","#d52b00","#d55600","#d52b2b","#d5562b","#d55656","#d58156","#d58181"],
  ["#d5abab","#ab8181","#ab5656","#ab2b2b","#ab562b","#ab0000","#ab2b00","#810000","#812b00","#812b2b","#815656","#562b2b","#560000","#2b0000"],
  ["#562b00","#81562b","#815600","#ab8100","#ab5600","#ab812b","#ab8156","#d5ab81","#d5ab56","#d5ab2b","#d5812b","#d5ab00","#d58100","#ffd500"],
  ["#ffab00","#ff8100","#ffd52b","#ffab2b","#ffd556","#ffab56","#ffd581","#ffd5ab","#ffffd5","#ffffab","#ffff81","#d5ff81","#ffff56","#d5ff56"],
  ["#ffff2b","#d5ff2b","#abff2b","#ffff00","#d5ff00","#abff00","#d5d500","#abd500","#81d500","#d5d52b","#abd52b","#d5d556","#abd556","#d5d581"],
  ["#d5d5ab","#abab81","#abab56","#abab2b","#81ab2b","#abab00","#81ab00","#818100","#568100","#81812b","#818156","#56562b","#565600","#2b2b00"],
  ["#2b5600","#56812b","#2b8100","#2bab00","#56ab00","#56ab2b","#81ab56","#abd581","#81d556","#56d52b","#81d52b","#2bd500","#56d500","#2bff00"],
  ["#56ff00","#81ff00","#56ff2b","#81ff2b","#81ff56","#abff56","#abff81","#d5ffab","#d5ffd5","#abffab","#81ff81","#81ffab","#56ff56","#56ff81"],
  ["#2bff2b","#2bff56","#2bff81","#00ff00","#00ff2b","#00ff56","#00d500","#00d52b","#00d556","#2bd52b","#2bd556","#56d556","#56d581","#abd5ab"],
  ["#81ab81","#56ab56","#56ab81","#2bab2b","#2bab56","#00ab00","#00ab2b","#008100","#00812b","#2b812b","#568156","#2b562b","#005600","#002b00"],
  ["#00562b","#2b8156","#008156","#00ab81","#00ab56","#2bab81","#81d5ab","#81d581","#56d5ab","#2bd5ab","#2bd581","#00d5ab","#00d581","#00ffd5"],
  ["#00ffab","#00ff81","#2bffd5","#2bffab","#56ffd5","#56ffab","#81ffd5","#abffd5","#d5ffff","#abffff","#81ffff","#81d5ff","#56ffff","#56d5ff"],
  ["#2bffff","#2bd5ff","#2babff","#00ffff","#00d5ff","#00abff","#00d5d5","#00abd5","#0081d5","#2bd5d5","#2babd5","#56d5d5","#56abd5","#81d5d5"],
  ["#abd5d5","#81abab","#56abab","#2babab","#2b81ab","#00abab","#0081ab","#008181","#005681","#2b8181","#568181","#2b5656","#005656","#002b2b"],
  ["#002b56","#2b5681","#002b81","#002bab","#0056ab","#2b56ab","#5681ab","#81abd5","#5681d5","#2b56d5","#2b81d5","#002bd5","#0056d5","#002bff"],
  ["#0056ff","#0081ff","#2b56ff","#2b81ff","#5681ff","#56abff","#81abff","#abd5ff","#d5d5ff","#ababff","#8181ff","#ab81ff","#5656ff","#8156ff"],
  ["#2b2bff","#562bff","#812bff","#0000ff","#2b00ff","#5600ff","#0000d5","#2b00d5","#5600d5","#2b2bd5","#562bd5","#5656d5","#8156d5","#8181d5"],
  ["#ababd5","#8181ab","#5656ab","#2b2bab","#562bab","#0000ab","#2b00ab","#000081","#2b0081","#2b2b81","#565681","#2b2b56","#000056","#00002b"],
  ["#2b0056","#562b81","#560081","#5600ab","#8100ab","#812bab","#8156ab","#ab81d5","#ab56d5","#812bd5","#ab2bd5","#8100d5","#ab00d5","#8100ff"],
  ["#ab00ff","#d500ff","#ab2bff","#d52bff","#ab56ff","#d556ff","#d581ff","#d5abff","#ffd5ff","#ffabff","#ff81ff","#ff81d5","#ff56ff","#ff56d5"],
  ["#ff2bff","#ff2bd5","#ff2bab","#ff00ff","#ff00d5","#ff00ab","#d500d5","#d500ab","#d50081","#d52bd5","#d52bab","#d556d5","#d556ab","#d581d5"],
  ["#d5abd5","#ab81ab","#ab56ab","#ab2bab","#ab2b81","#ab00ab","#ab0081","#810081","#810056","#812b81","#815681","#562b56","#560056","#2b002b"],
];
$("#form-color").spectrum({
  preferredFormat: "hex",
  chooseText: "OK",
  showInitial: true,
  showPalette: true,
  palette: colorPalette,
  change: function(color){ nameColorChange(color.toHexString()) },
  hide: function(color){ nameColorChange(color.toHexString()) },
});
//
$(".selectcolor-main").change(function(){
  const color = $(this).val();
  nameColorChange(color);
  $("#form-color").spectrum("set", color);
});
function nameColorChange(color){
  const num = document.getElementById('form-name').value;
  nameList[num]['color'] = color;
  $("#form-name option[value="+num+"]").css('color', color);
  localStorage.setItem(roomId+'-name', JSON.stringify(nameList));
  document.getElementById('main-name1').style.color = color;
  document.getElementById('form-color').value = color;
  document.getElementById('form-color-text').value = color;
}
// ユニット作成の色変更
$("#new-unit-color-value").spectrum({
  preferredFormat: "hex",
  chooseText: "OK",
  showInitial: true,
  showPalette: true,
  palette: colorPalette,
  change: function(color){ document.getElementById('new-unit-color-value-text').value = color; },
  hide: function(color){ document.getElementById('new-unit-color-value-text').value = color; },
});
$(".selectcolor-unit").change(function(){
  const color = $(this).val();
  document.getElementById('new-unit-color-value').value = color;
  document.getElementById('new-unit-color-value-text').value = color;
  $("#new-unit-color-value").spectrum("set", color);
});
// 入室時の色変更
$("#in-color").spectrum({
  preferredFormat: "hex",
  chooseText: "OK",
  showInitial: true,
  showPalette: true,
  palette: colorPalette,
  change: function(color){ document.getElementById('in-color-text').value = color; },
  hide: function(color){ document.getElementById('in-color-text').value = color; },
});
$(".selectcolor-in").change(function(){
  const color = $(this).val();
  document.getElementById('in-color').value = color;
  document.getElementById('in-color-text').value = color;
  $("#in-color").spectrum("set", color);
});
// 送信先選択フォーム
function addressUpdate(){
  const select = document.getElementById('form-address');
  const nowSelect = select.options[select.selectedIndex].value;
  while (0 < select.childNodes.length) {
    select.removeChild(select.childNodes[0]);
  }
  let op0 = document.createElement("option");
  op0.value = '';  op0.text = '全員';
  select.appendChild(op0);
  let op1 = document.createElement("option");
  op1.value = userId;  op1.text = '自分';
  select.appendChild(op1);
  for(let i in memberList){
    if(i === userId) continue;
    let op = document.createElement("option");
    op.value = i;  op.text = memberList[i];
    select.appendChild(op);
  }
  $(select).val(nowSelect);
  
  document.getElementById('member-num').innerHTML = Object.keys(memberList).length+'人';
  const memberListView = document.getElementById('member-list-view');
  memberListView.innerHTML = '';
  for(let i in memberList){
    memberListView.innerHTML += memberList[i]+'<br>';
  }
}
$("#form-address, #secret-openlater").change(function(){
  const obj = document.querySelector('#main-form > .input-form');
  const address = document.getElementById('form-address').value;
  const logopen = document.getElementById('secret-openlater').checked;
  
  if(address){ obj.classList.add('secret'); }
  else    { obj.classList.remove('secret'); }
  
  if(logopen){ obj.classList.add('openlater'); }
  else    { obj.classList.remove('openlater'); }
});

// メインフォームのダイス追加
let diceForms = [];
function diceAdd(){
  let n = 0;
  while (document.getElementById('dice-button-'+n)){
    n++;
  }
  let newOutline = document.createElement('div');
  let newDice = document.createElement('div');
  newDice.classList.add('dice-button');
  newDice.innerHTML = `<textarea class="form-comm" id="dice-button-${n}" data-lock="dice" data-num="${n}" rows="1"></textarea><i onclick="lockTypeChange(${n});"></i><button onclick="formSubmit('dice-button-${n}');"></button></div>`;
  newOutline.appendChild(newDice);
  document.querySelector("#main-form .form-dice").appendChild(newOutline);
  
  autosize(document.getElementById('dice-button-'+n));
  fontFamilySet(fontFamily, [document.getElementById('dice-button-'+n)]);
  if(!diceForms[n]){ diceForms.push({"type":"dice","value":"2d6"}); }
  diceSave();
}
function diceDel(){
  const mainDiceArea = document.querySelector("#main-form .form-dice");
  const target = mainDiceArea.lastElementChild;
  if(mainDiceArea.childElementCount <= 2) return;
  mainDiceArea.removeChild(target);
  diceForms.pop();
  diceSave();
}
let diceColumn = 2;
function diceScale(){
  diceColumn = diceColumn <= 1 ? 5 : diceColumn-1;
  document.querySelector("#main-form .form-dice").style.gridTemplateColumns = `repeat(${diceColumn}, 1fr)`;
  autosizeUpdate(document.querySelectorAll('#main-form .dice-button textarea'));
}
//
function lockTypeChange(num){
  const obj = document.getElementById('dice-button-'+num);
  let type = obj.dataset.lock;
  if     (type === 'full'){ type = 'dice'; }
  else if(type === 'dice'){ type = 'name'; }
  else if(type === 'name'){ type = 'off';  }
  else if(type === 'off' ){ type = 'memo'; }
  else                    { type = 'full'; }
  obj.dataset.lock = type;
  diceForms[num]['type'] = type;
  diceSave();
}
//
function diceSave(){
  localStorage.setItem(roomId+'-diceForm', JSON.stringify(diceForms));
}
function diceLoad(){
  for(let num in diceForms){
    const obj = document.getElementById("dice-button-"+num);
    obj.value        = diceForms[num]['value'];
    obj.dataset.lock = diceForms[num]['type'];
    autosizeUpdate(obj);
  }
}
$(function($){
  $(document).on("change", ".dice-button textarea", function(e) {
    diceForms[e.target.dataset.num]['value'] = e.target.value;
    diceSave();
  });
});

function unitSubRemoconAdd(unitId){
  const unitName = unitIdToName[unitId];
  const unitNameEscaped = unitName.replace(/'/g, "&#x27;").replace(/"/g, '&quot;');
  let n = 1;
  while (document.getElementById('edit-stt-'+unitId+'-'+n)){ n++; }
  let newUl = document.createElement('ul');
  newUl.setAttribute("id",'edit-stt-'+unitId+'-'+n);
  let statusRemoconArea = `<li><i onclick="unitSubRemoconToggle('${unitId}-${n}')">▼</i><input type="text" id="edit-stt-${unitId}-${n}-name" placeholder="名前"></li>`;
  for (let i in setStatus){
    statusRemoconArea += `
            <li class="dice-button">
              <button onclick="formSubmit('edit-stt-${unitId}-${n}-${setStatus[i]}-value','${unitNameEscaped}');">${setStatus[i]}</button>
              <input type="text" class="form-comm" name="stt-${setStatus[i]}" id="edit-stt-${unitId}-${n}-${setStatus[i]}-value" data-comm-pre="@${setStatus[i]}" data-part="${unitId}-${n}" data-palette-target='${unitNameEscaped}'>
            </li>`;
  }
  statusRemoconArea += `
            <li class="dice-button">
              <button onclick="unitCommandSubmit('check'  ,'${unitId}',${n});">✔</button>
              <button onclick="unitCommandSubmit('uncheck','${unitId}',${n});">×</button>
              <button onclick="unitCommandSubmit('delete' ,'${unitId}',${n});">削除</button>
            </li>`;
  newUl.innerHTML = statusRemoconArea;
  document.getElementById("status-remocon-sub-area-"+unitId).appendChild(newUl);
}
function unitSubRemoconDel(unitId){
  const obj = document.getElementById("status-remocon-sub-area-"+unitId);
  if(obj.childElementCount <= 0) return;
  const target = obj.lastElementChild;
  obj.removeChild(target);
}
function unitSubRemoconToggle(id){
  document.getElementById('edit-stt-'+id).classList.toggle('close');
}


// ユニット追加
let unitIdToName = {};
function unitAdd(unitName){
  const unitId = randomId(8);
  unitList[unitName]['id'] = unitId;
  unitIdToName[unitId] = unitName;
  let newUnit = document.createElement('dl');
  newUnit.setAttribute("id",'stt-unit-'+unitId);
  newUnit.innerHTML = '<dt onclick="sheetSelect(\''+unitId+'\');sheetOpen();" style="color:'+unitList[unitName]['color']+';">'+unitName+'</dt>';
  if(unitList[unitName]['status'] === undefined) { unitList[unitName]['status'] = {}; }
  for(let i in setStatus) {
    newUnit.innerHTML += `<dd id="stt-${unitId}-${setStatus[i]}" style="display:${unitList[unitName]['status'][setStatus[i]] ? 'block' : 'none'}"><dl><dt>${setStatus[i]}</dt><dd id="stt-${unitId}-${setStatus[i]}-value" class="num-font"><span class="value"></span><div class="gauge"><i style="width:0%"></i></div></dd></dl></dd>`;
  }
  document.getElementById("status-body").appendChild(newUnit);
  
  const unitNameEscaped = unitName.replace(/'/g, "&#x27;").replace(/"/g, '&quot;');
  
  let paletteDefault = String.raw`チャットパレット入力例：
2d6+{冒険者}+{知力}
r18+{追加D} ダメージ！
//冒険者=3
//ファイター=3
//知力=2
//筋力=3
//追加D={ファイター}+{筋力}
クリックで↓の入力欄にコピー
ダブルクリックで即送信`;
  if(chatPalettes[unitName]) { paletteDefault = chatPalettes[unitName]; }
  
  let statusRemoconArea = ``;
  for (let i in setStatus){
    statusRemoconArea += `
            <li class="dice-button">
              <button onclick="formSubmit('edit-stt-${unitId}-${setStatus[i]}-value','${unitNameEscaped}');">${setStatus[i]}</button>
              <input type="text" class="form-comm" name="stt-${setStatus[i]}" id="edit-stt-${unitId}-${setStatus[i]}-value" data-comm-pre="@${setStatus[i]}" data-palette-target='${unitNameEscaped}' placeholder="Enterで送信">
            </li>`;
  }

  let newSheet = document.createElement('div');
  newSheet.setAttribute("id",'sheet-unit-'+unitId);
  newSheet.classList.add('box','sheet');
  if(!sheetOpenCheck){ newSheet.classList.add('closed'); }
  if(selectedSheet !== unitId){ newSheet.style.visibility = 'hidden'; }
  newSheet.innerHTML = `
      <h2 style="color:${unitList[unitName]['color']}">${unitName}</h2>
      <div class="sheet-body">
        <div class="status-remocon-area">
          <h3>ステータスリモコン<span class="add button" onclick="unitSubRemoconAdd('${unitId}')">+</span><span class="edit button" onclick="unitSubRemoconDel('${unitId}')">－</span></h3>
          <select>
          <option id="stt-calc-on-${unitId}">入力内容によって計算/部分更新する</option>
          <option>入力内容そのままで更新する</option>
          </select>
          <ul>${statusRemoconArea}
            <li class="dice-button mini"><button onclick="unitCommandSubmit('check'  ,'${unitId}');">✔</button></li>
            <li class="dice-button mini"><button onclick="unitCommandSubmit('uncheck','${unitId}');">×</button></li>
            <li class="dice-button mini"><button onclick="unitCommandSubmit('delete' ,'${unitId}');">削除</button></li>
          </ul>
          <div class="status-remocon-sub" id="status-remocon-sub-area-${unitId}"></div>
        </div>
        <div class="chat-palette-area">
          <h3>チャットパレット</h3>
          <div class="chat-palette-palette-area">
            <select id="chat-palette-unit-${unitId}" class="chat-palette" data-name='${unitNameEscaped}' size="5"></select>
            <textarea id="chat-palette-edit-unit-${unitId}" class="chat-palette" style="display:none">${paletteDefault}</textarea>
            <span class="edit button" id="chat-palette-button-open-unit-${unitId}" onclick="paletteEditOpen('${unitId}')">🖋編集</span>
            <span class="edit button" id="chat-palette-button-save-unit-${unitId}" onclick="paletteEditSave('${unitId}')" style="display:none">✔確定</span>
          </div>
          <div class="comm-area">
            <textarea id="chat-palette-comm-unit-${unitId}" class="form-comm autosize" rows="1" data-palette-target='${unitNameEscaped}'></textarea>
            <button onclick="formSubmit('chat-palette-comm-unit-${unitId}','${unitNameEscaped}');">送信</button>
          </div>
        </div>
      <div class="sheet-footer">
        <textarea id="memo-unit-${unitId}" class="autosize" placeholder="個人メモ" rows="2" onchange="sheetMemoSave(this,'${unitNameEscaped}');">${sheetMemos[unitName]?sheetMemos[unitName]:''}</textarea>
      </div>
      <span class="close button" onclick="sheetClose();">×</span>
      <div class="close-area" onclick="sheetOpen();"></div>
    </div>`;
  console.log(`#sheet-unit-${unitId} .form-comm`)
  document.getElementById("sheet-area").appendChild(newSheet);
  fontFamilySet(fontFamily, document.querySelectorAll(`#sheet-unit-${unitId} .form-comm`));
  paletteEditSave(unitId);
  autosize(document.getElementById('chat-palette-comm-unit-'+unitId));
  autosize(document.getElementById('memo-unit-'+unitId));
}
// シート開閉
let sheetOpenCheck = 1;
function sheetOpen(){
  const sheet = document.querySelectorAll('.sheet');
  for(let i=0; i<sheet.length; i++){
    sheet[i].classList.remove('closed');
  }
  sheetOpenCheck = 1;
}
function sheetClose(){
  const sheet = document.querySelectorAll('.sheet');
  for(let i=0; i<sheet.length; i++){
    sheet[i].classList.add('closed');
  }
  sheetOpenCheck = 0;
}
function sheetSelect(id){
  const sheet = document.querySelectorAll('.sheet[id^=sheet]');
  for(let i=0; i<sheet.length; i++){
    sheet[i].style.visibility = 'hidden';
  }
  document.getElementById('sheet-unit-'+id).style.visibility = 'visible';
  selectedSheet = id;
}
// チャットパレット編集
function paletteEditOpen(id){ // 編集画面を開く
  document.getElementById('chat-palette-unit-'+id).style.display = 'none';
  document.getElementById('chat-palette-edit-unit-'+id).style.display = 'block';
  document.getElementById('chat-palette-button-open-unit-'+id).style.display = 'none';
  document.getElementById('chat-palette-button-save-unit-'+id).style.display = 'block';
  
  const select = document.getElementById('chat-palette-unit-'+id);
  let paletteText = '';
  for(let i=0; i<select.options.length; i++){
    const op = select.options[i].value;
    paletteText += (op === ''?'':op) + "\n";
  }
  paletteText = paletteText.replace(/\n+$/g,'');
  document.getElementById('chat-palette-edit-unit-'+id).value = paletteText;
}
function paletteEditSave(id){ // 編集画面を閉じて保存
  document.getElementById('chat-palette-unit-'+id).style.display = 'block';
  document.getElementById('chat-palette-edit-unit-'+id).style.display = 'none';
  document.getElementById('chat-palette-button-open-unit-'+id).style.display = 'block';
  document.getElementById('chat-palette-button-save-unit-'+id).style.display = 'none';
  
  let textData = document.getElementById('chat-palette-edit-unit-'+id).value;
  chatPalettes[unitIdToName[id]] = textData;
  localStorage.setItem(roomId+'-palette', JSON.stringify(chatPalettes));
  
  const lines = textData.split(/\n/g);
  const select = document.getElementById('chat-palette-unit-'+id);
  while (0 < select.childNodes.length) {
    select.removeChild(select.childNodes[0]);
  }
  for(let i=0; i<lines.length; i++){
    let op = document.createElement("option");
    op.text = lines[i]?lines[i]:'　';
    op.value = lines[i];
    select.appendChild(op);
  }
}
// 個人メモ保存
function sheetMemoSave(obj, name){
  sheetMemos[name] = obj.value;
  localStorage.setItem(roomId+'-sheetMemo', JSON.stringify(sheetMemos));
}

// 共有メモ追加
function memoUpdate(){
  //const title = (shareMemo[num].split(/<br>/g))[0];
  //let newMemo = document.createElement('dt');
  //newMemo.innerHTML = title;
  //newMemo.setAttribute("onclick","memoSelect("+num+");");
  //document.getElementById("memo-body").appendChild(newMemo);
  document.getElementById("memo-list").innerHTML = '';
  for (let i in shareMemo) {
    let newMemo = document.createElement('li');
    newMemo.innerHTML = (shareMemo[i].split(/\n/g))[0];
    newMemo.setAttribute("onclick","memoSelect("+i+");");
    document.getElementById("memo-list").appendChild(newMemo);
  }
}
// 共有メモ選択
let selectedMemo = '';
function memoSelect(num){
  const memoValue = document.getElementById("sheet-memo-value");
  memoValue.value = shareMemo[num] ? shareMemo[num] : '';
  autosizeUpdate(memoValue);
  sheetSelect('memo');
  selectedMemo = num;
  sheetOpen();
}

// タブ追加
function tabAdd(tabNum){
  let newTab = document.createElement('div');
  newTab.setAttribute("id",'chat-tab'+tabNum);
  newTab.classList.add('box','chat');
  if(mainTab == tabNum){ newTab.classList.add('main'); } else { newTab.classList.add('sub'); }
  newTab.dataset.tab = tabNum;
  newTab.innerHTML = `
    <h2><label><input type="radio" id="check-maintab-tab${tabNum}" name="check-maintab" value="${tabNum}" ${(mainTab == tabNum ? 'checked':'')}><span class="tab-name" data-unread="0">${tabList[tabNum]}</span></label></h2>
    <div class="logs logs-font" id="chat-logs-tab${tabNum}" data-unread="0"></div>
    <div class="input-form"><div class="comm-area">
    <textarea type="text" class="form-comm autosize" id="form-comm-tab${tabNum}" rows="1" placeholder="Shift+Enterで改行"></textarea>
    <button onclick="formSubmit('form-comm-tab${tabNum}');">送信</button>
    </div></div>
    <div class="option"><input class="option-fontsize-tab" type="range" min="80" max="120" step="1" value="100"></div>
    <div class="notice-unread" onclick="scrollBottom('${tabNum}');" data-unread="0">▼新着発言</div>
    <span class="close button">×</span>`;
  document.getElementById("chat-area").appendChild(newTab);
  autosize(document.getElementById('form-comm-tab'+tabNum));
  fontFamilySet(fontFamily, document.querySelectorAll(`#chat-logs-tab${tabNum}, #form-comm-tab${tabNum}`));
}
// メインタブの切り替え
function mainTabChange(num){
  const thisTab = document.getElementById('chat-tab'+num);
  const tabs = document.querySelectorAll('.box.chat');
  
  if(thisTab.classList.contains('close')) {
    $("#chat-area").append($(thisTab));
      thisTab.classList.remove('close');
      if(mainTab){
        thisTab.classList.add('sub');
        document.getElementById('check-maintab-tab'+num).checked = false;
        document.getElementById('check-maintab-tab'+mainTab).checked = true;
      }
      else {
        thisTab.classList.add('main');
        document.getElementById('check-maintab-tab'+num).checked = true;
        mainTab = num;
      }
    scrollBottom(thisTab.dataset.tab);
  }
  else {
    for(let i=0; i<tabs.length; i++){
      tabs[i].classList.remove('main');
      tabs[i].classList.add('sub');
    }
    thisTab.classList.add('main');
    thisTab.classList.remove('sub','close');
    document.getElementById('check-maintab-tab'+num).checked = true;
    
    mainTab = num;
  }
  
  for(let i=0; i<tabs.length; i++){
    scrollBottom(tabs[i].dataset.tab);
  }
}
function tabToggle(num){
  document.getElementById('chat-tab'+num).classList.add('close');
  document.getElementById('chat-tab'+num).classList.remove('main','sub');
  document.getElementById('check-maintab-tab'+num).checked = false;
  $("#chat-closes-area").append($("#chat-tab"+num));

  if(mainTab == num && !document.getElementById('check-maintab-tab'+num).checked){
    const openedTab = document.querySelector('#chat-area .box.chat');
    if(openedTab){ mainTabChange(Number(openedTab.dataset.tab)); }
    else { mainTab = 0; }
  }
}
// タブ開閉
$(function($){
  $(document).on("change", 'input[name="check-maintab"]:radio', function(e) {
    const num = e.target.value;
    mainTabChange(num);
  });
  
  $(document).on("click", '.chat .close.button', function(e) {
    const num = e.target.closest('.chat').dataset.tab;
    tabToggle(num);
  });
});

// 強調ワード
function markListChange(){
  const obj = document.getElementById('mark-list-value');
  markList = obj.value.split("\n");
  localStorage.setItem('markList', JSON.stringify(markList));
}

// タグ挿入
const formCommMain = document.getElementById('form-comm-main');
$(".insert-ruby").click(function(){
  const selText = $('#form-comm-main').selection();
  $("#form-comm-main")
    .selection("insert", {text: "<ruby>"+selText+"<rt>", mode: "before"})
    .selection('replace', {text: ''})
    .selection("insert", {text: "</rt></ruby>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-em").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<em>", mode: "before"})
    .selection("insert", {text: "</em>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-hide").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<hide>", mode: "before"})
    .selection("insert", {text: "</hide>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-bold").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<b>", mode: "before"})
    .selection("insert", {text: "</b>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-oblique").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<i>", mode: "before"})
    .selection("insert", {text: "</i>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-strike").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<s>", mode: "before"})
    .selection("insert", {text: "</s>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-under").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<u>", mode: "before"})
    .selection("insert", {text: "</u>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-color").click(function(){
  const selText = $('#form-comm-main').selection();
  $("#form-comm-main")
    .selection("insert", {text: "<c:orange", mode: "before"})
    .selection('replace', {text: ''})
    .selection("insert", {text: ">"+selText+"</c>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-big").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<big>", mode: "before"})
    .selection("insert", {text: "</big>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-small").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<small>", mode: "before"})
    .selection("insert", {text: "</small>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-horizon").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<hr>", mode: "before"});
  autosizeUpdate(formCommMain);
});
$(".insert-left").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<left>", mode: "before"})
    .selection("insert", {text: "</left>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-center").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<center>", mode: "before"})
    .selection("insert", {text: "</center>", mode: "after"});
  autosizeUpdate(formCommMain);
});
$(".insert-right").click(function(){
  $("#form-comm-main")
    .selection("insert", {text: "<right>", mode: "before"})
    .selection("insert", {text: "</right>", mode: "after"});
  autosizeUpdate(formCommMain);
});

// 音量調節
function volumeSet(){
  for (let v of ['chat','mark','ready']){
    const id = 'volume-' + v;
    const volumeValue = localStorage.getItem(id);
    document.getElementById(id).value             = (volumeValue ? volumeValue : 100);
    document.getElementById(id+'-view').innerHTML = (volumeValue ? volumeValue : 100) + '%';
  }
  const volumeValue = localStorage.getItem('volume-master');
  document.getElementById('volume-master').value          = (volumeValue ? volumeValue : 80);
  document.getElementById('volume-master-view').innerHTML = (volumeValue ? volumeValue : 80) + '%';
}
$(function($){
  $(document).on("change", '#config-sound input[type="range"]', function(e) {
    const obj = e.target;
    document.getElementById(obj.id+'-view').innerHTML = obj.value+'%';
    if(obj.id !== 'volume-master') {
      let se;
      if     (obj.id === 'volume-chat') { se = chatSE; }
      else if(obj.id === 'volume-mark') { se = markSE; }
      else if(obj.id === 'volume-ready'){ se = readySE; }
      else { se = chatSE; }
      se.volume = (obj.value / 100) * (document.getElementById("volume-master").value / 100);
      se.currentTime = 0;
      se.play();
    }
    localStorage.setItem(obj.id, obj.value);
  });
});

// ヘルプ開閉
$(function($){
  $(document).on("click", '#help-window h3, #help-window h4', function(e) {
    e.target.nextElementSibling.classList.toggle('open');
  });
});

// キー動作
document.onkeydown = function(e){
  if (e.ctrlKey) {
    // 名前↑
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const obj = document.getElementById("form-name");
      let num = obj.selectedIndex;
      num = (num > 0) ? num-1 : obj.length-1;
      obj.selectedIndex = num;
      nameChange(num);
    }
    // 名前↓
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const obj = document.getElementById("form-name");
      let num = obj.selectedIndex;
      num = (num < obj.length-1) ? num+1 : 0;
      obj.selectedIndex = num;
      nameChange(num);
    }
    // タブ←
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if(mainTab){
        const num = (mainTab > 1) ? mainTab-1 : Object.keys(tabList).length;
        mainTabChange(num);
      }
      else { mainTabChange(1); }
    }
    // タブ→
    else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if(mainTab){
        const num = (mainTab < Object.keys(tabList).length) ? mainTab+1 : 1;
        mainTabChange(num);
      }
      else { mainTabChange(1); }
    }
  }
  // フォーム上のキー動作
  if(e.srcElement.classList.contains('form-comm')){
    // Enterで送信
    if (e.key === 'Enter') {
      if (e.shiftKey || e.target.dataset.lock === 'memo') {
        // 
      }
      else if (e.target.value.replace(/\r?\n/g, "").length <= 0) {
        e.preventDefault();
      }
      else {
        e.preventDefault();
        formSubmit(e.target.id, e.target.dataset.paletteTarget);
      }
    }
    // 前回送信した発言を取得
    else if (e.key === 'ArrowUp') {
      if(!e.target.value && beforeComm[e.target.id] && !e.ctrlKey) {
        e.preventDefault();
        e.target.value = beforeComm[e.target.id];
        autosizeUpdate(e.target);
      }
    }
  }
}
// 発言欄行増加時スクロール
//let boxHeight = {};
//$(document).on("keyup", "#main-form .form-comm, .chat .form-comm", function(e) {
//  let tab = 0;
//  if(e.target.closest('[data-tab]')){ tab = e.target.closest('[data-tab]').dataset.tab; }
//  else { tab = mainTab; }
//  if(boxHeight[e.target.id] !== e.target.style.height) {
//    if(scrollCheck(tab)){
//      scrollBottom(tab);
//      boxHeight[e.target.id] = e.target.style.height;
//    }
//  }
//});

// スマホ用
$(window).resize(function(){
  if(window.matchMedia('(max-width:600px)').matches){ scrollBottom(mainTab); }
});

// jquery ui
$(function(){
  // ソート
  $('#status-body').sortable({handle:'>dt'});
  $('#memo-list').sortable();
  $('#chat-area').sortable({handle:'h2'});
  // ドラッグ移動
  //$('.float-box').draggable();
});
