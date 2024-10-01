// Vueのプラグインや設定をここでインポート・設定する

if (typeof TextDecoder === 'undefined') {
    global.TextDecoder = require('util').TextDecoder;
  }
  
  if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
  }
  