const rules = (name, uptime, tanggal, jam, prefix) => {
return `
⛔*PERATURAN*${name}⛔
*AKTIF* : ${kyun(uptime)}
*JAM* : ${jam} *WIB*
*TANGGAL* : *${tanggal}*
*VERSION* : *6.5.0 TERMUX*

☣ *NOTE* ${name} ☣
╔═════════════════➪
║⸨𝐑𝐮𝐥𝐞𝐬 - 𝐒𝐢𝐦𝐩𝐥𝒆⸩
║▬▭▬▭▬▭▬▭▬▭
║⧐ ⸨ *Spam : Auto Block!* ⸩
║⧐ ⸨ *Beri Jeda 10detik!* ⸩
║⧐ ⸨ *Error Harap Cht Owner!* ⸩
║⧐ ⸨ *Jangan Bandingkan Bot* ⸩
║⧐ ⸨ *Ketik #help/menu* ⸩
║⧐ ⸨ *Jangan Vc/Call!* ⸩
║⧐ ⸨ *Gunakan Dengan Ramah* ⸩
║▬▭▬▭▬▭▬▭▬▭
╠═════════════════➪
║⸨ *_𝙈𝘼𝙉𝘾𝘼-𝘽𝙊𝙏_* ⸩
╚═════════════════➪


`
}
exports.rules = rules
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `*${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik*`
}