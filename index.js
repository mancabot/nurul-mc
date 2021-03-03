/*
* Tambahin nama author lah
* Author MhankBarBar, Nurul, FxSx, FadliXploit
* Tambahin ya Cape Gan ngefix² Yg Ga work
* Jan numpang nama doank ya sayang

- What's New?
* New Features
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require("@adiwajshing/baileys")

const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./aebot/help')
const { rules } = require('./aebot/rules')
const { bahasa } = require('./aebot/bahasa')
const { donasi } = require('./aebot/donasi')
const { limits } = require('./aebot/limit')
const { asupan } = require('./aebot/asupan')

const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const imgbb = require('imgbb-uploader')
const google = require('google-it')
const get = require('got')
const emojiUnicode = require('emoji-unicode')
const imageToBase64 = require('image-to-base64')
const speed = require('performance-now')
const { removeBackgroundFromImageFile } = require('remove.bg')
const brainly = require('brainly-scraper')
const cd = 4.32e+7
const lolis = require('lolis.life')
const loli = new lolis()

const { BarBarApi, ZeksApi, TechApi, TobzApi, ItsApi, VthearApi } = JSON.parse(fs.readFileSync('./database/json/apikey.json'))
const { prefix, name, instagram, yt, replySet, rdaftar, groupLimit, memberLimit } = JSON.parse(fs.readFileSync('./database/json/setting.json'))
const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/json/nsfw.json'))
const _limit = JSON.parse(fs.readFileSync('./database/json/limit.json'))
const samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const bucinrandom = JSON.parse(fs.readFileSync('./database/json/bucin.json'))
const adminNumber = JSON.parse(fs.readFileSync('./database/json/admin.json'))
const anime = JSON.parse(fs.readFileSync('./database/json/anime.json'))
const blocked = JSON.parse(fs.readFileSync('./database/json/blocked.json'))
const anlink = JSON.parse(fs.readFileSync('./database/json/antilink.json'))

const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Nurul\n'
            + 'ORG:Creator Manca-Bot;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6283815956151:+62 838-1595-6151\n'
            + 'END:VCARD'

limitt = '1000'

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./aebot.json') && client.loadAuthInfo('./aebot.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./aebot.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
			if (!mek.hasNewMessage) return
              mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const AzizAE = ["6283815956151@s.whatsapp.net"]
			const aziz = mek.message.conversation
			const insom = from.endsWith('@g.us')
			const nameReq = insom ? mek.participant : mek.key.remoteJid
			pushname2 = client.contacts[nameReq] != undefined ? client.contacts[nameReq].vname || client.contacts[nameReq].notify : undefined
            
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')

			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const Far = args.join(' ')
			const isCmd = body.startsWith(prefix)
			client.chatRead (from)
			

			mess = {
				wait: '*⏳ 𝚆𝙰𝙸𝚃 𝚃𝙰𝙽𝙶𝙶𝚄𝙰𝙽 𝙺𝙴𝙳𝙴𝙽𝙶...*',
				success: '*𝚂𝚄𝙺𝚂𝙴𝚂 𝚃𝙰𝙷 𝙰𝙰...*',
				error: {
					stick: ' *𝚃𝙴𝙱𝙸𝚂𝙰, 𝙰𝚈𝙰 𝙰𝙽𝚄 𝚂𝙰𝙻𝙰𝙷 𝙶𝙰𝙼𝙱𝙰𝚁 𝙺𝙰 𝚂𝚃𝙸𝙲𝙺𝙴𝚁*',
					Iv: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙻𝙸𝙽𝙺 𝙽𝙰 𝚃𝙴𝙱𝙸𝚂𝙰!!*'
				},
				only: {
					group: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙴𝚃𝙰 𝙱𝙸𝚂𝙰 𝙽𝙰 𝚃𝙸𝙽𝙰 𝙶𝚁𝚄𝙿!!*',
					benned: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙽𝙾 𝙼𝙰𝙽𝙴𝙷 𝙺𝙰 𝙱𝙰𝙽𝙽𝙴𝙳 𝙷𝚄𝙱𝚄𝙽𝙶𝙸 𝙷𝙴𝙻𝙰 𝙾𝚆𝙽𝙴𝚁 𝙿𝙰𝙽𝙶 𝙳𝙸 𝙱𝚄𝙺𝙰 𝙺𝙴𝙽*',
					ownerG: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙴𝚃𝙰 𝙲𝚄𝙼𝙰 𝙱𝙸𝚂𝙰 𝙺𝚄 𝙾𝚆𝙽𝙴𝚁 𝙶𝚁𝚄𝙿!!*',
					ownerB: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙴𝚃𝙰 𝙲𝚄𝙼𝙰 𝙾𝚆𝙽𝙴𝚁 𝙱𝙾𝚃 𝙰𝙽𝚄 𝙱𝙸𝚂𝙰!!* ',
					premium: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙴𝚃𝙰 𝙲𝚄𝙼𝙰 𝙱𝙸𝚂𝙰 𝙺𝚄 𝙿𝚁𝙴𝙼𝙸𝚄𝙼!!*',
					userB: `ʜᴀɪ *${pushname2}* ᴋᴀᴍᴜ ʙᴇʟᴜᴍ ᴍᴇɴᴊᴀᴅɪ ᴛᴇᴍᴀɴ ${name} \nꜱɪʟᴀʜᴋᴀɴ ᴅᴀꜰᴛᴀʀ ᴅᴜʟᴜ yᴀᴀ ᴅᴇɴɢᴀɴ ᴄᴀʀᴀ\n\n ᴋᴇᴛɪᴋ ${prefix}ᴅᴀꜰᴛᴀʀ ${pushname2}/17/ᴋᴏᴛᴀ`,
					admin: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙴𝚃𝙰 𝙲𝚄𝙼𝙰 𝙱𝙸𝚂𝙰 𝙺𝚄 𝙰𝙳𝙼𝙸𝙽 𝙶𝚁𝚄𝙿!!*',
					Badmin: '*𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙴𝚃𝙰 𝙲𝚄𝙼𝙰 𝙱𝙾𝚃 𝙹𝙰𝙳𝙸 𝙰𝙳𝙼𝙸𝙽!!*'
				}
			}
			
			ban = [
			
			]
			const ownerNumber = [
			"6283815956151@s.whatsapp.net"
			]
			premium = [
			"6283815956151@s.whatsapp.net"
			]
			
			const apakahh = [
            fs.readFileSync('./assets/iya.mp3');
            fs.readFileSync('./assets/mungkin iya.mp3');
            fs.readFileSync('./assets/mungkin tidak.mp3');
            fs.readFileSync('./assets/ferguso.mp3');
            fs.readFileSync('./assets/tidak.mp3');
            ]
            const bisakahh = [
            'Bisa','Tidak Bisa','Ga tau'
            ]
            const kapankahh = [
            '1 Minggu lagi','1 Bulan lagi','1 Tahun lagi','100 tahun lagi','gatau','2030','1 Jam lagi','1 Menit lagi' 
            ]
            
            const hob =[
            'Memasak','Membantu Atok','Mabar','Nobar','Sosmed an','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri' 
            ]
            const wa =[
            'penyayang','pemurah','Pemarah','Pemaaf','Penurut','Baik','baperan','Baik Hati','penyabar','Uwu','top deh, pokoknya','Suka Membantu' 
            ] 
            var rate = [
            `100%`,`95%`,`90%`,`85%`,`80%`,`75%`,`70%`,`65%`,`60%`,`55%`,`50%`,`45%`,`40%`,`35%`,`30%`,`25%`,`20%`,`15%`,`10%`,`5%`
            ]
            var persengayy = [
            `*4%*\n\n*Tobat Ngegay Gan:v*`,`*9%*\n\n*OTW Tobat Gan:v*`,`*17%*\n\n*Kang Coli*`,`*28%*\n\n*Buset Dah Gay🤦*`,`*34%*\n\n *Korban Tusbol*`,`*48%*\n\n*Kang Hunter Bool:v*`,`*59%*\n\n *Bahaya Ni Orang Gan*`,`*62%*\n\n*Hati" Sama Ni Orang Beneran Dah*`,`*74%*\n\n*Astagfirullah Kabur Gan🏃🌬️*`,`83%\n\n Yaallah Nak🤦`,`97%\n\nAstagfirullah🤦`,`100%\n\nKabur ae Gan Daripada Ditusbol Bool lu🏃`,`29%\n\n amann:v`,`94%\n\n Yaallah🏃`,`75%\n\nHadehh Gay🤦`,`82%\n\nMending Lu Tobat Dah🏃`,`41%\n\nSering Cari Bool Diperempatan`,`39%\n\nSering Tusbol Bool Topan🏃`
            ]
            var persenbucin = [
            `4%\n\nHadehh🤦`,`9%\n\nMasih Kecil Dah Bucin Ae`,`17%\n\nNakk Masih Kecil`,`28%\n\nYoalahh hmm`,`34%\n\nMayan Lah`,`48%\n\nGatau`,`59%\n\nBiasa Kang Bucin`,`62%\n\n Hadehhh🏃`,`74%\n\n bucen Teroosss`,`83%\n\n Sekali" kek Ga bucin Gitu`,`97%\n\nHadehh Pakboi"`,`100%\n\nHadehhh Ini Bukan Bucin Tapi Pakboi`,`29%\n\nKasian Mana Masih Muda`,`94%\n\n Dasar Pakboi`,`75%\n\n Ya Ampun`
            ]

			const botNumber = client.user.jid
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const totalchat = await client.chats.all()
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false 
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isAnime = isGroup ? anime.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false 
			const isOwner = ownerNumber.includes(sender)
			const antilink = anlink.includes(sender)
			const isUser = user.includes(sender)
			const isBanned = ban.includes(sender)
			const isPrem = premium.includes(sender)
			
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const costum = (pesan, tipe, target, target2) => {
			client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			const checkLimit = (sender) => {
                let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            limitCounts = limitt - lmt.limit
                            if (limitCounts <= 0) return client.sendMessage(from,`Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, text,{ quoted: mek})
                            client.sendMessage(from, limits.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 1 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/json/limit.json', JSON.stringify(_limit))
                        client.sendMessage(from, limits.limitcount(limitCounts), text, { quoted : mek})
                    }
                                }

           const isLimit = (sender) =>{
                      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
                let limits = i.limit
              if (limits >= limitt ) {
                  position = true
                    client.sendMessage(from, limits.limitend(pushname2), text, {quoted: mek})
                    return true
              } else {
                _limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
                const obj = { id: sender, limit: 1 }
                _limit.push(obj)
                fs.writeFileSync('./database/json/limit.json',JSON.stringify(_limit))
           return false
       }
     }
     const bayarLimit = (sender, amount) => {
                let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit -= amount
                fs.writeFileSync('./database/json/limit.json', JSON.stringify(_limit))
            }
        } 
        
        const limitAdd = (sender) => {
             let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit += 1
                fs.writeFileSync('./database/json/limit.json', JSON.stringify(_limit))
            }
        }
     
     		if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			if (antilink && isGroup && isBotGroupAdmins){
            if (args.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await mek.inviteInfo(aziz);
                if (!check) {
                    return
                } else {
                    reply('*[GROUP LINK DETECTOR!]*\n𝙼𝙰𝙽𝙴𝙷 𝙺𝙰𝙽𝚈𝙰𝙷𝙾𝙰𝙽 𝙽𝙶𝙸𝚁𝙸𝙼 𝙻𝙸𝙽𝙺 𝙶𝚁𝚄𝙿, 𝙼𝙰𝙽𝙴𝙷 𝙺𝚄𝙰𝙸𝙽𝙶 𝙺𝙸𝙲𝙺 𝚈𝙰𝙺.').then(() => {
                        client.groupRemove()
                    })
                }
            }
         }
			switch(command) {
				case 'iri':
const irimp3 = fs.readFileSync('./assets/iri.mp3');
client.sendMessage(from, irimp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
			   case 'pale':
const pa = fs.readFileSync('assets/pale.mp3')
client.sendMessage(from, pa, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound':
const soun = fs.readFileSync('assets/sound.mp3')
client.sendMessage(from, soun, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break 
case 'sound1':
satu = fs.readFileSync('./assets/sound1.mp3');
client.sendMessage(from, satu, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound2':
dua = fs.readFileSync('./assets/sound2.mp3');
client.sendMessage(from, dua, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound3':
tiga = fs.readFileSync('./assets/sound3.mp3');
client.sendMessage(from, tiga, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound4':
empat = fs.readFileSync('./assets/sound4.mp3');
client.sendMessage(from, empat, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound5':
lima = fs.readFileSync('./assets/sound5.mp3');
client.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound6':
enam = fs.readFileSync('./assets/sound6.mp3');
client.sendMessage(from, enam, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound7':
tujuh = fs.readFileSync('./assets/sound7.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound8':
delapan = fs.readFileSync('./assets/sound8.mp3');
client.sendMessage(from, delapan, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sound9':
sembilan = fs.readFileSync('./assets/sound9.mp3');
client.sendMessage(from, sembilan, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'bernyanyi':
const bernyanyi = fs.readFileSync('./assets/bernyanyi.mp3');
client.sendMessage(from, bernyanyi, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'kebenaran':
const kebenaran = fs.readFileSync('./assets/kebenaran.mp3');
client.sendMessage(from, kebenaran, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sad':
const sad = fs.readFileSync('./assets/sad.mp3');
client.sendMessage(from, sad, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'sad1':
const sad1 = fs.readFileSync('./assets/sad1.mp3');
client.sendMessage(from, sad1, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'bass':                 
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				
				case 'slow':
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'gemuk':
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'tupai':
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
					case 'toptt':
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
						client.sendMessage(from, topt, audio, {mimetype: 'audio/mp4', quoted: mek, ptt:true})
						})
						break
						case 'yamete':
const yamete = fs.readFileSync('./assets/Yamete Kudasai Sound Effect (Original).mp3');
client.sendMessage(from, yamete, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
			
		case 'join':
					if (args.length == 0) return reply(from, `maaf ,bot ini hanya bisa dimasukkan ke grup `, text)
					let linkgrup = `${body.slice(6)}`
					let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
					let chekgrup = await client.inviteInfo(linkgrup)
					if (!islink) return reply(from, '𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙻𝙸𝙽𝙺 𝙶𝚁𝚄𝙿𝙽𝙰 𝚂𝙰𝙻𝙰𝙷 ', id)
					if (isOwnerBot) {
					  await client.joinGroupViaLink(linkgrup)
					    .then(async () => {
					      client.sendMessage(from, 'Berhasil join grup via link!', text)
					    })
					} else {
					  let cgrup = await client.getAllGroups()
					  if (cgrup.length > groupLimit) return client.reply(from, `Sorry, the groups is not valid `, id)
					  if (cgrup.size < memberLimit) return client.reply(from, `Sorry, Bot wil not join if the group members do not exceed ${memberLimit} people`, id)
					  await client.joinGroupViaLink(linkgrup)
					    .then(async () => {
					      reply('Berhasil join grup via link!')
					    })
					    .catch(() => {
					      reply('Gagal!')
					    })
					}
					break 
					
					case 'setreply':
					if (!isOwner) return reply(mess.only.ownerB)
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					replySet = body.slice(10)
					reply(`reply berhasil di ubah menjadi : ${replySet}`)
				break 
				
				case 'grouplist':
				case 'gruplist':
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)
					client.updatePresence(from, Presence.composing) 
					teks = `\`\`\`Ini adalah list group ${name} :\n\n\`\`\``
					no = 0
					for (let hehehe of groupId) {
						no += 1
						teks += `\`\`\`[${no.toString()}]\`\`\` @${hehehe.split('@')[0]}\n`
					}
					teks += `\n\`\`\`Total grup : ${groupId.length}\`\`\``
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek})
				break 
				
			case 'brainly':
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)
					if (isLimit(sender)) return reply(limits.limitend(pushname2))
                    brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '❉───────────────────────❉\n'
					for (let Y of res.data) {
						teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉───────────────────────❉\n`
					}
					client.sendMessage(from, teks, text, {quoted: mek, detectLinks: false})
                        console.log(res)
                    })
                await limitAdd(sender)
				break 
			
		case 'antilink':
					client.updatePresence(from, Presence.composing) 
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)   
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('pilih on atau off!!')
					if (args[0] == 'on') {
						if (isSimi) return reply('Mode antilink sudah aktif')
						anlink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(anlink))
						reply(`Sukses mengaktifkan mode antilink`)
					} else if (args[0] == 'off') {
						anlink.splice(from, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(anlink))
						reply('Sukes menonaktifkan mode antilink️')
					} else {
						reply('pilih on atau off kak?')
					}
					break 
			case 'chatlist':
					client.updatePresence(from, Presence.composing)
					var chat = await client.chats.all()
					teks = 'This is list of chat number :\n'
					for (let all of chat) {
						teks += `~> @${all}\n`
					}
					teks += `Total : ${chat.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": chat}})
					break
				case 'totaluser':
					client.updatePresence(from, Presence.composing) 
					if (!isUser) return reply(mess.only.userB)
					if (!isOwner) return reply(mess.only.ownerB)    
					teks = `╭────「 *TOTAL USER ${name}* 」\n`
					no = 0
					for (let hehehe of user) {
						no += 1
						teks += `[${no.toString()}] @${hehehe.split('@')[0]}\n`
					}
					teks += `│+ Total Pengguna : ${user.length}\n╰──────*⎿ *${name}* ⏋*────`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": user}})
					break
		case 'daftar':
					client.updatePresence(from, Presence.composing)
					if (isUser) return reply('kamu sudah terdaftar')
					if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return reply(`Parameter Salah\nCommand : ${prefix}daftar nama/umur\nContoh : ${prefix}daftar Nurul/15/banten`)
					reg = `${body.slice(8)}`
					jeneng = reg.split("/")[0];
					umure = reg.split("/")[1];
					asal = reg.split("/")[2];
						user.push(sender)
						fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
						await costum(`\`\`\`Pendaftaran berhasil dengan SN: TM08GK8PPHBSJDH10J\`\`\`\n\n\`\`\`Pada ${date} ${time}\`\`\`\n\`\`\`[Nama]: ${jeneng}\`\`\`\n\`\`\`[Nomor]: wa.me/${sender.split("@")[0]}\`\`\`\n\`\`\`[Umur]: ${umure} Tahun\`\`\`\n\`\`\`[Asal]: ${asal}\`\`\`\n\`\`\`Untuk menggunakan bot\`\`\`\n\`\`\`silahkan\`\`\`\n\`\`\`kirim ${prefix}help/menu\`\`\`\n\`\`\`\nTotal Pengguna: ${user.length} Orang\`\`\``, text, AzizAE, rdaftar)
					break 
			case 'help':
			case 'menu':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				uptime = process.uptime()
				user.push(sender)
				myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
                myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
                var tgl = new Date();
                var day = tgl.getDate()
                  bulan = tgl.getMonth()
                var thisDay = tgl.getDay(),
                thisDay = myDays[thisDay];
                var yy = tgl.getYear()
                var year = (yy < 1000) ? yy + 1900 : yy;
                const tanggal = `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
                setTimeout( () => {
					costum(help(prefix, instagram, yt, name, pushname2, user, limitt), text, AzizAE, replySet)
					}, 0)
					

				case 'bahasa':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				client.sendMessage(from, bahasa(), text, {quoted: mek})
				break
				case 'donasi':
				case 'donate':
					client.sendMessage(from, donasi(instagram, name), text, {quoted: mek})
					break
				case 'info':
					me = client.user
					user.push(sender)
					uptime = process.uptime()
					teks = `⟩➢ *Nama Bot* : ${me.name}\n⟩➢ *Nomer Bot* : @${me.jid.split('@')[0]}\n⟩➢ *prefix* : | ${prefix} |\n⟩➢ *Total Block* : ${blocked.length}\n⟩➢ *Aktif Sejak* : ${kyun(uptime)}\n\n⟩➢ Total Pengguna: *${user.length}* User\n⟩➢ *Instagram* : https://www.instagram.com/thenay_xploit_\n⟩➢ *Special Thanks To* :\n⟩➢ Allah SWT \n⟩➢ MahankBarBar \n⟩➢ Nurul \n⟩➢ FxSx \n⟩➢ FadliXploit`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
					teks = 'List Block :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break 
				case 'banlist':
				ben = '```List Banned``` :\n'
					for (let banned of ban) {
						ben += `~> @${banned.split('@')[0]}\n`
					}
					ben += `Total : ${ban.length}`
					client.sendMessage(from, ben.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": ban}})
					break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja gan')
					}
					await limitAdd(sender) 
					break 
				case 'gifstiker':
				case 'stiker':
				case 'sticker':
				case 's':
						if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						if (isLimit(sender)) return reply(limits.limitend(pushname2))
						reply(mess.wait)
						const ran= getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						const ran= getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`\`\`\`Gagal, pada saat mengkonversi ${tipe} ke stiker\`\`\``)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								client.sendMessage(from, buff, sticker, {quoted: mek})
							})
						})
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					await limitAdd(sender) 
					break 
					
				case 'img2url':
           if (!isUser) return reply(mess.only.userB)
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
					reply(mess.wait)
             var imgbb = require('imgbb-uploader')
            var encmedia  = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
            var media = await  client.downloadAndSaveMediaMessage(encmedia)
            
            imgbb('727e7e43f6cda1dfb85d888522fd4ce1', media)
                .then(data => {
                    var caps = `「 *IMAGE TO URL* 」\n\n*╠➥  ID :* ${data.id}\n*╠➥  MimeType :* ${data.image.mime}\n*╠➥  Extension :* ${data.image.extension}\n\n*╠➥  URL :* ${data.display_url}`
                    ibb = fs.readFileSync(media)
                     client.sendMessage(from, ibb, image, { quoted: mek, caption: caps })
                })
                .catch(err => {
                    throw err
                })
            await limitAdd(sender) 	
            break  

					case 'trigger':
                        if (!isUser) return reply(mess.only.userB)
                        if (isBanned) return reply (mess.only.benned)
                        if (isLimit(sender)) return reply(limits.limitend(pushname2))
                        var imgbb = require('imgbb-uploader')
                         if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                         ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                         reply(mess.wait)
                         owgi = await  client.downloadAndSaveMediaMessage(ger)
                         anu = await imgbb("727e7e43f6cda1dfb85d888522fd4ce1", owgi)
                        teks = `${anu.display_url}`
                        ranp = getRandom('.gif')
                        rano = getRandom('.webp')
                        anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
                         exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                                fs.unlinkSync(ranp)
                                if (err) return reply(mess.error.stick)
                                nobg = fs.readFileSync(rano)
                                 client.sendMessage(from, nobg, sticker, {quoted: mek})
                                fs.unlinkSync(rano)
                        })
                    
                             } else {
                                 reply('Gunakan foto!')
                          }
                          await limitAdd(sender) 
                          break  
                   case 'wasted':
                                        if (!isUser) return reply(mess.only.userB)
                                        if (isBanned) return reply(mess.only.benned)
                                        if (isLimit(sender)) return reply(limits.limitend(pushname2))
                                        var imgbb = require('imgbb-uploader')
                                         if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                                         reply(mess.wait)
                                         owgi = await  client.downloadAndSaveMediaMessage(ger)
                                         anu = await imgbb("727e7e43f6cda1dfb85d888522fd4ce1", owgi)
                                        teks = `${anu.display_url}`
                                        ranp = getRandom('.png')
                                        rano = getRandom('.webp')
                                        anu1 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
                                         exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                                                fs.unlinkSync(ranp)
                                                if (err) return reply(mess.error.stick)
                                                nobg = fs.readFileSync(rano)
                                                 client.sendMessage(from, nobg, sticker, {quoted: mek})
                                                fs.unlinkSync(rano)
                                        })
                                    
                                             } else {
                                                 reply('Gunakan foto!')
                                          }
                                          await limitAdd(sender) 
                                          break  
                        
                 case 'kalkulator':
					if (isBanned) return reply(mess.only.benned)    
				   if (!isUser) return reply(mess.only.userB)
				   if (isLimit(sender)) return reply(limits.limitend(pushname2))
				     if (args.length < 1) return reply(`[❗] Kirim perintah *${prefix}kalkulator [ Angka ]*\nContoh : ${prefix}kalkulator 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`)
				    mtk = `${body.slice(12)}`
				    anu = await fetchJson(`https://api.vhtear.com/calculator?value=${mtk}&apikey=${VthearApi}`, {method: 'get'})
				    client.sendMessage(from, `*${anu.result.data}*`, text, {quoted: mek})
				    await limitAdd(sender) 	
				    break 
				case 'owner':
                 client.sendMessage(from, {displayname: "aebot", vcard: vcard}, MessageType.contact, { quoted: mek})
                 client.sendMessage(from, '𝙳𝙴𝙺 𝙳𝙸 𝚂𝙰𝚅𝙴 𝚃𝙰𝙷?',text, { quoted: mek} )
                 tod = await getBuffer(`https://i.ibb.co/DQbWvnV/026d4893040839ffe3d43e76bcffa970.jpg`)
                 client.sendMessage(from, tod, image, { quoted: mek, caption: '*Ini waifu owner saya,mau kalian ambil,yok gelud*'})
                 break
                 case 'fitnah':	
				case 'fake':          
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
                    if (!isGroup) return reply(mess.only.group)
                    arg = body.substring(body.indexOf(' ') + 1)
				    isi = arg.split('/')[0] 
			        pesan = arg.split('/')[1] 
				    pesan2 = arg.split('/')[2] 
                    costum(pesan, isi, pesan2)
                    await limitAdd(sender) 
                    break 

				case 'infogc':
				case 'groupinfo':
				case 'infogrup':
				case 'grupinfo':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                client.updatePresence(from, Presence.composing)
                if (!isGroup) return reply(mess.only.group)
                ppUrl = await client.getProfilePicture(from)
                reply(mess.wait) // leave empty to get your own
			    buffer = await getBuffer(ppUrl)
		        client.sendMessage(from, buffer, image, {quoted: mek, caption: `*NAME* : ${groupName}\n*MEMBER* : ${groupMembers.length}\n*ADMIN* : ${groupAdmins.length}\n*DESK* : ${groupDesc}`})
                break
				case 'trendtwit':
					client.updatePresence(from, Presence.composing) 
                     if (!isUser) return reply(mess.only.daftarB)
                     if (isLimit(sender)) return reply(limits.limitend(pushname2))
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/trendingtwitter`, {method: 'get'})
					reply(mess.wait)
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Hastag* : ${i.hastag}\n*link* : ${i.link}\n*rank* : ${i.rank}\n*Tweet* : ${i.tweet}\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender) 
					break 
				case 'testime':
					setTimeout( () => {
					client.sendMessage(from, 'Waktu habis:v', text, {quoted: mek}) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '5 Detik lagi', text, {quoted: mek}) // ur cods
					}, 5000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '10 Detik lagi', text, {quoted: mek}) // ur cods
					}, 0) // 1000 = 1s,
					break 
				case 'animecry':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/cry?apikey=${TobzApi}`, {method: 'get'})
                   if (!isUser) return reply(mess.only.userB)
                   if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
                   if (!isGroup) return reply(mess.only.group)
					if (anu.error) return reply(anu.error)
					reply (mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'neonime':
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/neonime_lastest`, {method: 'get'})
                    if (!isUser) return reply(mess.only.userB)
                    if (isLimit(sender)) return reply(limits.limitend(pushname2))
                    if (isBanned) return reply(mess.only.benned)
                    if (!isGroup) return reply(mess.only.group)
                    reply(mess.wait)
					teks = '################\n'
					for (let i of data.result) {
						teks += `*Title* : ${i.judul}\n*link* : ${i.link}\n*rilis* : ${i.rilis}\n###############\n`
					}
					reply(teks.trim())
					await limitAdd(sender) 
					break   
				case 'wink':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://api.i-tech.id/tools/wink?key=${TechApi}`, {method: 'get'})
                   if (!isUser) return reply(mess.only.userB)
                   if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
                   if (!isGroup) return reply(mess.only.group)
					if (anu.error) return reply(anu.error)
					reply (mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'imoji':
					if (args.length < 1) return reply('emojinya mana gan?')
                    if (!isUser) return reply(mess.only.userB)
                    if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = emojiUnicode(Far).trim()
					anu = await fetchJson(`https://mhankbarbars.tech/api/emoji2png?emoji=${teks}&apikey=${BarBarApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker)
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
					
					case 'animehug':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hug?apikey=${TobzApi}`, {method: 'get'})
                   if (!isUser) return reply(mess.only.userB)
                   if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
                   if (!isGroup) return reply(mess.only.group)
					if (anu.error) return reply(anu.error)
					reply(mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'linkgroup':
				case 'linkgrup':
				case 'linkgc':
				case 'gruplink':
				case 'grouplink':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				    if (!isGroup) return reply(mess.only.group)
				    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        break
				case 'hidetag':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
				case 'gantengcek':
				case 'cekganteng':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					ganteng = body.slice(12)
					const gan =['10%','30%','20%','40%','50%','60%','70%','62%','74%','83%','97%','100%','29%','94%','75%','82%','41%','39%']
					const teng = gan[Math.floor(Math.random() * gan.length)]
					client.sendMessage(from, 'Pertanyaan : Cek Ganteng Bang *'+ganteng+'*\n\nJawaban : '+ teng +'', text, { quoted: mek })
					break
				case 'cantikcek':
				case 'cekcantik':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					cantik = body.slice(11)
					if (args.length < 1) return reply('Yg Mau dicek Siapa Kak??')
					const can =['10% banyak" perawatan ya kak:v\nCanda Perawatan:v','30% Semangat Kaka Merawat Dirinya><','20% Semangat Ya Kaka👍','40% Wahh Kaka><','50% kaka cantik deh><','60% Hai Cantik🐊','70% Hai Ukhty🐊','62% Kakak Cantik><','74% Kakak ni cantik deh><','83% Love You Kakak><','97% Assalamualaikum Ukhty🐊','100% Kakak Pake Susuk ya??:v','29% Semangat Kakak:)','94% Hai Cantik><','75% Hai Kakak Cantik','82% wihh Kakak Pasti Sering Perawatan kan??','41% Semangat:)','39% Lebih Semangat🐊']
					const tik = can[Math.floor(Math.random() * can.length)]
					client.sendMessage(from, 'Pertanyaan : Cantik Cek Kakak *'+cantik+'*\n\nPersen Kecantikan : '+ tik +'', text, { quoted: mek })
					break
				case 'ban':
					client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
			        ban = mentioned
					reply(`berhasil banned : ${ban}`)
					break
				case 'addprem':
					client.updatePresence(from, Presence.composing)
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					addpremi = mek.message.extendedTextMessage.contextInfo.mentionedJid
					addpremium = addpremi
					reply(`*ʙᴇʀʜᴀꜱɪʟ ᴍᴇɴᴀᴍʙᴀʜᴋᴀɴ ${addpremium} ᴋᴇ ᴜꜱᴇʀ ᴩʀᴇᴍɪᴜᴍ*\n\nꜱᴇʟᴀᴍᴀᴛ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ꜰɪᴛᴜʀ ᴩʀᴇᴍɪᴜᴍ:)`)
					break
				case 'removeprem':
					if (!isOwner) return reply(mess.only.ownerB)
					rprem = body.slice(13)
					premium.splice(`${rprem}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/json/premium.json', JSON.stringify(premium))
					reply(`Berhasil Remove wa.me/${rprem} Dari User Premium`)
					break
				case 'unban':
					if (!isOwner)return reply(mess.only.ownerB)
					bnnd = body.slice(8)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/json/banned.json', JSON.stringify(ban))
					reply(`Nomor wa.me/${bnnd} telah di unban!`)
					break
				case 'block':
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
				case 'unblock':
                    if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `perintah Diterima, membuka blokir ${body.slice(9)}@c.us`, text)
				    break
				    
				  case 'ownergrup':
				  case 'ownergroup':
               client.updatePresence(from, Presence.composing) 
              options = {
          text: `Owner Group ini adalah : wa.me/${from.split("-")[0]}`,
          contextInfo: { mentionedJid: [from] }
           }
           client.sendMessage(from, options, text, { quoted: mek } )
				break
				case 'leave': 
				    if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
			    	anu = await client.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
	                break
	            case 'getses':
                    if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                    const sesPic = await client.getSnapshot()
                    client.sendFile(from, sesPic, 'session.png', 'Neh...', id)
                    break
				case 'setname':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, `\`\`\`✓Sukses Mengganti Nama Group Menjadi\`\`\` *${body.slice(9)}*`, text, {quoted: mek})
                break
                case 'setdesc':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, `\`\`\`✓Sukses Mengganti Deskripsi Group\`\`\` *${groupMetadata.subject}* Menjadi: *${body.slice(9)}*`, text, {quoted: mek})
                break
				case 'tts':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana gan?\n Kalo Gatau Kode Bahasanya Apa Aja Ketik Saja *${prefix}bahasa*', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana gan?', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan gan')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal gan:(')
							reply(mess.wait)
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					await limitAdd(sender) 
					break  
				case 'translate':
				case 'translete':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				    if (args.length < 1) return client.sendMessage(from, 'Kode Bahasanya???', text, {quoted: mek})
				    if (args.length < 2) return client.sendMessage(from, 'Text Yg Mau Di translate??', text, {quoted: mek})
				    ts = body.slice(11)
				    kode = ts.split("/")[0]
				    teks = ts.split("/")[1]
				    anu = await fetchJson(`https://api.arugaz.my.id/api/edu/translate?lang=${kode}&text=${teks}`)
				    reply(mess.wait)
				    translate = `Text Asli: *${body.slice(11)}*\n\nHasil: *${anu.text}*`
				    client.sendMessage(from, translate, text, {quoted: mek})
				   await limitAdd(sender)
				   break 
				case 'ts':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				    if (args.length < 1) return client.sendMessage(from, 'Kode Bahasanya???', text, {quoted: mek})
				    if (args.length < 2) return client.sendMessage(from, 'Text Yg Mau Di translate??', text, {quoted: mek})
				    ts = body.slice(4)
				    kode = ts.split("/")[0]
				    teks = ts.split("/")[1]
				    anu = await fetchJson(`https://api.arugaz.my.id/api/edu/translate?lang=${kode}&text=${teks}`)
				    reply(mess.wait)
				    ts = `Text Asli: *${body.slice(7)}*\n\nHasil: *${anu.text}*`
				    client.sendMessage(from, ts, text, {quoted: mek})
				   await limitAdd(sender)
				   break 
	            case 'setpp':
	            if (isBanned) return reply(mess.only.benned)    
	            if (!isUser) return reply(mess.only.userB)
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    media = await client.downloadAndSaveMediaMessage(mek)
                    await client.updateProfilePicture (from, media)
                    reply(mess.wait)
                    reply(`\`\`\`✓Sukses Mengganti Profil Group\`\`\` *${groupMetadata.subject}*`)
                    break
                case 'apakah':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					apakah = body.slice(1)
					const apa = apakahh
					const kah = apa[Math.floor(Math.random() * apa.length)]
					client.sendMessage(from, kah, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                    break
				case 'rate':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					rate = body.slice(1)
					const te = rate[Math.floor(Math.random() * rate.length)]
					client.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'', text, { quoted: mek })
					await limitAdd(sender)
					break 
				case 'watak':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					watak = body.slice(1)
					const tak = wa[Math.floor(Math.random() * wa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: mek })
					await limitAdd(sender)
					break 
				case 'hobby':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					hobby = body.slice(1)
					const by = hob[Math.floor(Math.random() * hob.length)]
					client.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: mek })
					await limitAdd(sender)
					break 
				case 'bisakah':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					bisakah = body.slice(1)
					const bisa = bisakahh
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: mek })
					await limitAdd(sender)
					break 
				case 'kapankah':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					kapankah = body.slice(1)
					const kapan = kapankahh
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: mek })
					await limitAdd(sender) 
					break 
				case 'truth':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?truth&apikey=xptn`, {method: 'get'})
					ttrth = `${anu.Dare}`
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: mek })
					await limitAdd(sender) 
					break 
				case 'dare':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?dare&apikey=xptn`, {method: 'get'})
					der = `${anu.Dare}`
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '*Dare*\n\n'+ der })
					await limitAdd(sender) 
					break 
                case 'speed':
                case 'ping':
                const timestamp = speed();
                const latensi = speed() - timestamp 
                client.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, text, { quoted: mek})
                    break
                case 'tagme':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
					var nom = mek.participant
					const tag = {
					text: `@${nom.split("@s.whatsapp.net")[0]} tag!`,
					contextInfo: { mentionedJid: [nom] }
					}
					client.sendMessage(from, tag, text, {quoted: mek})
					break
         case 'lirik':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                reply(mess.wait)
					teks = body.slice(7)
					anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${teks}`, {method: 'get'})
					reply('Lirik dari lagu '+teks+' adalah :\n\n'+anu.result.lirik)
					await limitAdd(sender) 
					break 

                case 'report':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                     const pesan = body.slice(8)
                      if (pesan.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, {quoted: mek})
                        var nomor = mek.participant
                       const teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`

                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('6283815956151@s.whatsapp.net', options, text, {quoted: mek})
                    reply('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
                    break
                case 'request':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                     const cfrr = body.slice(8)
                      if (cfrr.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, {quoted: mek})
                        var nomor = mek.participant
                       const ress = `*[REQUEST VITUR]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${cfrr}`

                      var options = {
                         text: ress,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('6283815956151@s.whatsapp.net', options, text, {quoted: mek})
                    reply('REQUEST ANDA TELAH SAMPAI ke owner BOT, Requests palsu/main2 tidak akan ditanggapi.')
                    break
				case 'meme':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					await limitAdd(sender)
					break 
				case 'memeindo':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					memein = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=${ZeksApi}`)
					buffer = await getBuffer(memein.result)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					await limitAdd(sender)
					break 
				case 'ssweb':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Urlnya mana gan?')
					teks = `${body.slice(7)}`
					reply(mess.wait)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${teks}`)
					ssweb = await getBuffer(anu.gambar)
					client.sendMessage(from, ssweb, image, {quoted: mek})
					await limitAdd(sender)
					break 
				case 'nsfwloli':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender)
					break 
			    case 'nsfwblowjob':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender)
					break 
			    case 'nsfwneko':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
				case 'nsfwtrap':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
				case 'hentai':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
				case 'hilih':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					if (args.length < 1) return reply('Teksnya mana gan?')
					anu = await fetchJson(`https://api.i-tech.id/tools/hilih?key=${TechApi}&kata=${body.slice(7)}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'chord':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					if (args.length < 1) return reply('Mau Nyari Chord Lagu Apa??')
					tels = body.slice(7)
					anu = await fetchJson(`https://api.i-tech.id/tools/chord?key=${TechApi}&query=${tels}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break 
               case 'infogempa':
               if (isBanned) return reply(mess.only.benned)    
               if (!isUser) return reply(mess.only.userB)
               if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infogempa`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   buff = await getBuffer(anu.map)
                   reply(mess.wait)
                   gempa = `•Lokasi *${anu.lokasi}*\n• Saran: *${anu.waktu}* \n• Potensi: *${anu.potensi}*\n• Magnitude: *${anu.magnitude}*\n• Kedalaman: *${anu.kedalaman}*\n• Koordinat: *${anu.koordinat}*`
                   client.sendMessage(from, buff, image, {quoted: mek, caption: gempa})
                   await limitAdd(sender) 
                   break 
                case 'kucing':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=kucing`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(anu));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek , caption: 'meong🐈'})
					await limitAdd(sender) 
					break 


// only grup fitur anime
              case 'anime':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=${TobzApi}`, {method: 'get'})
					reply(mess.wait)
					pok = await getBuffer(anu.result)
					client.sendMessage(from, pok, image, { quoted: mek , caption: 'Subscribe:https://youtube.com/channel/UCal0HWOurq6GIF4_z0N2B6Q'})
					await limitAdd(sender) 
					break  
				case 'animekiss':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					anp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss?apikey=${TobzApi}`, {method: 'get'})
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'naruto':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Naruto`, {method: 'get'})
					naru = JSON.parse(JSON.stringify(anu));
					to =  naru[Math.floor(Math.random() * naru.length)];
					nye = await getBuffer(to)
					client.sendMessage(from, nye, image, { caption: 'naruto!!', quoted: mek })
					await limitAdd(sender)
					break 
				case 'minato':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Minato`, {method: 'get'})
					min = JSON.parse(JSON.stringify(anu));
					ato =  min[Math.floor(Math.random() * min.length)];
					nye = await getBuffer(ato)
					client.sendMessage(from, nye, image, { caption: 'minato!!', quoted: mek })
					await limitAdd(sender)
					break 
				case 'boruto':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Boruto`, {method: 'get'})
					bor = JSON.parse(JSON.stringify(anu));
					uto =  bor[Math.floor(Math.random() * bor.length)];
					nye = await getBuffer(uto)
					client.sendMessage(from, nye, image, { caption: 'boruto!!', quoted: mek })
					await limitAdd(sender)
					break 
				case 'hinata':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Hinata`, {method: 'get'})
					hina = JSON.parse(JSON.stringify(anu));
					ta =  hina[Math.floor(Math.random() * hina.length)];
					nye = await getBuffer(ta)
					client.sendMessage(from, nye, image, { caption: '*HINATA HYOUGA*', quoted: mek })
					await limitAdd(sender)
					break  
				case 'sasuke':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=sasuke`, {method: 'get'})
					sasu = JSON.parse(JSON.stringify(anu));
					ke =  sasu[Math.floor(Math.random() * sasu.length)];
					nye = await getBuffer(ke)
					client.sendMessage(from, nye, image, { caption: 'sasuke!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'sakura':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=sakura`, {method: 'get'})
					sak = JSON.parse(JSON.stringify(anu));
					kura =  sak[Math.floor(Math.random() * sak.length)];
					nye = await getBuffer(kura)
					client.sendMessage(from, nye, image, { caption: 'sakura!!', quoted: mek })
					await limitAdd(sender) 
					break 

				case 'kaneki':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Kaneki-ken`, {method: 'get'})
					sasu = JSON.parse(JSON.stringify(anu));
					ke =  sasu[Math.floor(Math.random() * sasu.length)];
					nye = await getBuffer(ke)
					client.sendMessage(from, nye, image, { caption: 'Pyschopet kata Ilham', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'toukachan':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+touka`, {method: 'get'})
					tou = JSON.parse(JSON.stringify(anu));
					ka =  tou[Math.floor(Math.random() * tou.length)];
					nye = await getBuffer(ka)
					client.sendMessage(from, nye, image, { caption: 'toukachan!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'rize':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+rize`, {method: 'get'})
					ri = JSON.parse(JSON.stringify(anu));
					ze =  ri[Math.floor(Math.random() * ri.length)];
					nye = await getBuffer(ze)
					client.sendMessage(from, nye, image, { caption: 'rize chan!!', quoted: mek })
					await limitAdd(sender) 	
					break 
				case 'akira':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+akira`, {method: 'get'})
					ak = JSON.parse(JSON.stringify(anu));
					ara =  ak[Math.floor(Math.random() * ak.length)];
					nye = await getBuffer(ara)
					client.sendMessage(from, nye, image, { caption: 'akira chan!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'itori':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+itori`, {method: 'get'})
					it = JSON.parse(JSON.stringify(anu));
					ori =  it[Math.floor(Math.random() * it.length)];
					nye = await getBuffer(ori)
					client.sendMessage(from, nye, image, { caption: 'itori chan!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'kurumi':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+karumi`, {method: 'get'})
					kur = JSON.parse(JSON.stringify(anu));
					imi =  kur[Math.floor(Math.random() * kur.length)];
					nye = await getBuffer(imi)
					client.sendMessage(from, nye, image, { caption: 'kurumi chan!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'miku':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+miku`, {method: 'get'})
					mi = JSON.parse(JSON.stringify(anu));
					ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					client.sendMessage(from, nye, image, { caption: 'miku chan!!', quoted: mek })
					await limitAdd(sender) 
					break
					case 'chika':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=FujiwaraChika`, {method: 'get'})
					sasu = JSON.parse(JSON.stringify(anu));
					ke =  sasu[Math.floor(Math.random() * sasu.length)];
					nye = await getBuffer(ke)
					client.sendMessage(from, nye, image, { caption: 'chika waifu partner', quoted: mek })
					await limitAdd(sender) 
					break
					case 'rem':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=rem`, {method: 'get'})
					sasu = JSON.parse(JSON.stringify(anu));
					ke =  sasu[Math.floor(Math.random() * sasu.length)];
					nye = await getBuffer(ke)
					client.sendMessage(from, nye, image, { caption: 'rem waifu owner', quoted: mek })
					await limitAdd(sender) 
					break
					case 'rikka':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=KataradaRikka`, {method: 'get'})
					sasu = JSON.parse(JSON.stringify(anu));
					ke =  sasu[Math.floor(Math.random() * sasu.length)];
					nye = await getBuffer(ke)
					client.sendMessage(from, nye, image, { caption: 'Puja Paha Rikka >//<', quoted: mek })
					await limitAdd(sender) 
					break
					case 'waifu':

					  if (isBanned) return reply(mess.only.benned)    

				if (!isUser) return reply(mess.only.userB)

				if (isLimit(sender)) return reply(limits.limitend(pushname2))

					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')

					reply(mess.wait)

					anu = await fetchJson(`https://arugaz.herokuapp.com/api/waifu`)

				   buffer = await getBuffer(anu.image)

				   texs = ` *anime name* : ${anu.name} \n*deskripsi* : ${anu.desc} \n*source* : ${anu.source}`

				   client.sendMessage(from, buffer, image, { quoted: mek, caption: `${texs}` })

				break
				case 'husbu':

				if (isBanned) return reply(mess.only.benned)    



				if (!isUser) return reply(mess.only.userB)



				if (isLimit(sender)) return reply(limits.limitend(pushname2))

					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')

					reply(mess.wait)

					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu2?apikey=BotWeA`, {method: 'get'})

					buffer = await getBuffer(anu.result)

					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'cintailah husbumu'})
					break
					case 'husbu2':

				if (isBanned) return reply(mess.only.benned)    



				if (!isUser) return reply(mess.only.userB)



				if (isLimit(sender)) return reply(limits.limitend(pushname2))

					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')

					reply(mess.wait)

					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu2?apikey=BotWeA`, {method: 'get'})

					buffer = await getBuffer(anu.result)

					client.sendMessage(from, buffer, image, {quoted: mek})

					break
					case 'shota':

						try{

						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomshota?apikey=BotWeA`, {method: 'get'})

						buffer = await getBuffer(res.result)

              if (isBanned) return reply(mess.only.benned)    





				if (!isUser) return reply(mess.only.userB)



				if (isLimit(sender)) return reply(limits.limitend(pushname2))  

                



                reply(mess.wait)

						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nich'})

					} catch (e) {

						console.log(`Error :`, color(e,'red'))

						reply('❰❗❱ *ERROR* ❰❗❱')

					}

					break
// akhir fitur anime

				case 'anjing':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(anu));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					await limitAdd(sender) 
					break 
					case 'dadu':

					  if (isBanned) return reply(mess.only.benned)    



				if (!isUser) return reply(mess.only.userB)



				if (isLimit(sender)) return reply(limits.limitend(pushname2))

				ranp = getRandom('.png')

			rano = getRandom('.webp')

		        random = `${Math.floor(Math.random() * 6)}`

                    hasil = 'https://www.random.org/dice/dice' + random + '.png'

			exec(`wget ${hasil} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {

			fs.unlinkSync(ranp)

			if (err) return reply(mess.error.stick)

			buffer = fs.readFileSync(rano)

			client.sendMessage(from, buffer, sticker, {quoted: mek})

			fs.unlinkSync(rano)

			})

			break
					case 'jadian':

					if (isBanned) return reply(mess.only.benned)   

					if (!isUser) return reply(mess.only.userB)

					jds = []

					const jdii = groupMembers

					const koss = groupMembers

					const akuu = jdii[Math.floor(Math.random() * jdii.length)]

					const diaa = koss[Math.floor(Math.random() * koss.length)]

					teks = `Ciee.. yang lagi jadian @${akuu.jid.split('@')[0]} ♥️ @${diaa.jid.split('@')[0]} `

					jds.push(akuu.jid)

					jds.push(diaa.jid)

					mentions(teks, jds, true)

					break
					case 'ganteng':
					if (isBanned) return reply(mess.only.benned)   
					if (!isUser) return reply(mess.only.userB)
					membr = []
					const nus = groupMembers
					const msl = groupMembers
					const siapss = nus[Math.floor(Math.random() * nus.length)]
					const sipss = pushname2[Math.floor(Math.random() * msl.length)]
					teks = `Yang paling Ganteng disini Adalah : @${siapss.jid.split('@')[0]}`
					membr.push(siapss.jid)
					mentions(teks, membr, true)
					break
					case 'beban':
					if (isBanned) return reply(mess.only.benned)   
					if (!isUser) return reply(mess.only.userB)
					membr = []
					const met = groupMembers
					const msd = groupMembers
					const siapsa = met[Math.floor(Math.random() * met.length)]
					const sipsd = pushname2[Math.floor(Math.random() * msd.length)]
					teks = `Yang paling Beban disini Adalah : @${siapsa.jid.split('@')[0]}`
					membr.push(siapsa.jid)
					mentions(teks, membr, true)
					break
					case 'cantik':
					if (isBanned) return reply(mess.only.benned)   
					if (!isUser) return reply(mess.only.userB)
					membr = []
					const meo = groupMembers
					const msk = groupMembers
					const siaps = meo[Math.floor(Math.random() * meo.length)]
					const sips = pushname2[Math.floor(Math.random() * msk.length)]
					teks = `Yang paling Cantik disini Adalah : @${siaps.jid.split('@')[0]}`
					membr.push(siaps.jid)
					mentions(teks, membr, true)
					break
					case 'ewe':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di ewe!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					var nom = mek.participant
					if (mentioned.length > 1) {
						teks = 'ewe terus sama dia, sampe hamil'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
							teks += `@${nom.split("@s.whatsapp.net")[0]} \n`
						}
						mentions(teks, mentioned, true)
						contextInfo: { mentionedJid: [nom] }
						client.sendMessage(from, mentioned)
					} else {
						mentions(`@${nom.split("@s.whatsapp.net")[0]} ewe terus sama dia, sampe hamil @${mentioned[0].split('@')[0]}`, mentioned, true)
					client.sendMessage(from, mentioned)
					}
				    break
                case 'resepmasakan':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                reply(mess.wait)
                   anu = await fetchJson(`https://api.vhtear.com/resepmasakan?query=${body.slice(12)}&apikey=${VthearApi}`, {method: 'get'})
                   buff = await getBuffer(anu.result.image)
                   resep = `*${anu.result.title}*\n${anu.result.desc}\n\n*BAHAN² YG DIPERLUKAN*\n${anu.result.bahan}\n\n*CARA MASAKNYA*\n${anu.result.cara}`
                   client.sendMessage(from, buff, image, {quoted: mek, caption: resep})
                   await limitAdd(sender) 
                   break 
               case 'cersex':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   anu = await fetchJson(`https://api.vhtear.com/cerita_sex&apikey=${VthearApi}`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   sex = await getBuffer(anu.result.image)
                   reply (mess.wait)
                   cerita = `• *Judul:* ${anu.result.judul}\n\n${anu.result.cerita}`
                   client.sendMessage(from, sex, image, {quoted: mek, caption: cerita})
                   await limitAdd(sender) 
                   break    
               case 'pornhub':
			   if (isBanned) return reply(mess.only.benned)    
			   if (!isUser) return reply(mess.only.userB)
			   if (isLimit(sender)) return reply(limits.limitend(pushname2))
			   reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    teks = body.slice(9)
                    anu = await fetchJson(`https://api.arugaz.my.id/api/media/pornhub/search?query=${teks}`, {method: 'get'})
                    teks = `===============\n`
                    for (let bokep of anu.result) {
                    teks += `Title: ${bokep.title}\nAktor: ${bokep.author}\nViewers: *${bokep.views}*\nDurasi: ${bokep.duration}\nLink: ${bokep.link}\n===============\n`
                    }
                    reply(teks.trim())
			     	await limitAdd(sender) 
			     	break  
			     	
			     case 'xxx':
			   if (isBanned) return reply(mess.only.benned)    
			   if (!isUser) return reply(mess.only.userB)
			   if (isLimit(sender)) return reply(limits.limitend(pushname2))
			   reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    teks = body.slice(5)
                    anu = await fetchJson(`https://api.vhtear.com/xxxsearch?query=${teks}&apikey=${VthearApi}`, {method: 'get'})
                    teks = `===============\n`
                    for (let bokep of anu.result) {
                    teks += `• Title: ${bokep.data.title}\n• Durasi: ${bokep.data.durasi}\n• Link: ${bokep.data.url}\n===============\n`
                    }
                    reply(teks.trim())
			     	await limitAdd(sender) 
			     	break 

				case 'fb':
				  client.updatePresence(from, Presence.composing)
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('www.facebook.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/epbe?url=${args[0]}&apiKey=${BarBarApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					client.sendMessage(from, '[ WAIT ] Sedang Diproses\n\nLinknya Only Google Gan Biar Bisa Didownload', text, {quoted: mek})
					efbe = `Title: *${anu.title}*\nSize: *${anu.filesize}\nDipublikasikan Pada: *${anu.published}*`
					tefbe = await getBuffer(anu.thumb)
					client.sendMessage(from, tefbe, image, {quoted: mek, caption: efbe})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', quoted: mek, caption: 'Nih Gan'})
					await limitAdd(sender) 
					break 
			
			case 'insta':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com')) return reply(mess.error.lv)
				    anu = await fetchJson(`https://api.i-tech.id/dl/igdl?key=${TechApi}&link=${args[0]}`, {method: 'get'})
				    insta = getBuffer(anu.result.url)
				    reply(mess.wait)
				    client.sendMessage(from, insta, {quoted: mek})
				    await limitAdd(sender) 
				    break  
				    
				case 'instastory':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				instor = `${body.slice(12)}`
				anu = await fetchJson(`https://api.i-tech.id/dl/story?key=${TechApi}&username=${instor}`, {method: 'get'})
				buff = await getBuffer(anu.result.url)
				client.sendMessage(from, buff, image, {quoted: mek})
				await limitAdd(sender)
				break
			case 'hekerbucin':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`http://itsmeikygans.my.id/bacotanhacker?apikey=${ItsApi}`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break 

				case 'ytsearch':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Yang mau di cari apa?')
					reply(mess.wait)
					anu = await fetchJson(`https://api.arugaz.my.id/api/media/ytsearch?query=${body.slice(10)}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result) {
						teks += `\`\`\`Title\`\`\` : *${i.title}*\n\`\`\`Link\`\`\` : *https://youtu.be/${i.id}*\n\`\`\`Published\`\`\` : *${i.uploadDate}*\n\`\`\`Duration\`\`\` : *${i.duration}*\n\`\`\`Viewers: \`\`\`*${h2k(i.viewCount)}*\n\`\`\`Channel:\`\`\` *${i.channel.name}*\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender) 
					break 
				case 'film':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Mau Cari Film Apa?')
					reply(mess.wait)
				anu = await fetchJson(`https://api.vhtear.com/downloadfilm?judul=${body.slice(6)}&apikey=${VthearApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					film = `• Judul: *${anu.result.judul}*\n• Resolusi: *${anu.result.resolusi}*\n• Link Download: *${anu.result.urlDownload}*\n`
					client.sendMessage(from, film, text, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'tiktok':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('vt')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/tiktokdl?link=${args[0]}&apikey=${VthearApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result.video)
					client.sendMessage(from, buffer, video, {quoted: mek})
					await limitAdd(sender)
					break 
				case 'tiktokstalk':
					try {
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (args.length < 1) return client.sendMessage(from, 'Usernamenya mana gan?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Kemungkinan username tidak valid')
					}
					await limitAdd(sender) 
					break  
				case 'wp':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (args.length < 1) return reply('teks nya mana om')
					teksj = body.slice(4)
					reply(mess.wait)
					anwu = await fetchJson(`https://api.vhtear.com/walpaper?query=${teksj}&apikey=Jsieu8287362jshre82`, {method: 'get'})
					bufferx = await getBuffer(anwu.result.LinkImg)
					client.sendMessage(from, bufferx, image, {quoted: mek})
					break
//creator
				case 'nulis':
				case 'tulis':
				  client.updatePresence(from, Presence.composing)
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (args.length < 1) return reply(`${name} Harus Nulis Apa Kak??`)
			reply(mess.wait)
					tulis = body.slice(7)
				  nama = tulis.split("/")[0];
					kelas = tulis.split("/")[1];
					isi = tulis.split("/")[2];
					nulis = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${isi}&tinta=4`, {method: 'get'})
					client.sendMessage(from, nulis, image, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'ttp':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('*Textnya mana om?*')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(5).trim()
					anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${BarBarApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					reply(mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						bufferhgf = fs.readFileSync(rano)
						client.sendMessage(from, bufferhgf, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break  
					
				case 'slide':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('*Textnya mana gan?*')
					teks = `${body.slice(7)}`
					atytyd = await getBuffer(`https://api.vhtear.com/slidingtext?text=${teks}&apikey=${VthearApi}`, {method: 'get'})
					reply(mess.wait)
					client.sendMessage(from, atytyd, video, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'cparty':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					part = body.slice(8)
					reply(mess.wait)
					bufferu = await getBuffer(`https://api.vhtear.com/partytext?text=${part}&apikey=${VthearApi}`, {method: 'get'})
					client.sendMessage(from, bufferu, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cshadow':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					shad = body.slice(9)
					reply(mess.wait)
					ssha = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/photooxy/shadowtext?text=${shad}`)
					client.sendMessage(from, ssha, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cminion':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					minio = body.slice(9)
					reply(mess.wait)
					minn = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/miniontext?text=${minio}`)
					client.sendMessage(from, minn, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cneon':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					nneoo = body.slice(7)
					reply(mess.wait)
					nooe = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/neontext?text=${nneoo}`)
					client.sendMessage(from, nooe, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cneongreen':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					grre = body.slice(12)
					reply(mess.wait)
					gree = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/greenneontext?text=${grre}`)
					client.sendMessage(from, gree, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cneon2':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					duadua = body.slice(8)
					reply(mess.wait)
					duaa = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/neonwithgalaxytext?text=${duadua}`)
					client.sendMessage(from, duaa, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
				case 'c3d':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					dimen = body.slice(5)
					reply(mess.wait)
					tigaa = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/3dgradientstext?text=${dimen}`)
					client.sendMessage(from, tigaa, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
					case 'croman':
                if (!isUser) return reply(mess.only.userB)
                if (isBanned) return reply(mess.only.benned)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                roman = `${body.slice(8)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.vhtear.com/romancetext?text=${roman}&apikey=${VthearApi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek})
                  await limitAdd(sender) 
                  break 
					case 'clove':
					  if (!isUser) return reply(mess.only.userB)
					  if (isBanned) return reply(mess.only.benned)
					  if (isLimit(sender)) return reply(limits.limitend(pushname2))
					  if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					 love = `${body.slice(7)}`
					 buff = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${love}&apikey=${VthearApi}`, {method: 'get'})
					 client.sendMessage(from, buff, image, {quoted: mek})
					 await limitAdd(sender)
					 break 
				case 'cmwolf':
					  if (!isUser) return reply(mess.only.userB)
					  if (isBanned) return reply(mess.only.benned)
					  if (isLimit(sender)) return reply(limits.limitend(pushname2))
					  if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					 mwolf = `${body.slice(8)}`
					 anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wolf_metal&text=${mwolf}&apikey=${TobzApi}`, {method: 'get'})
					 cmwolf = await getBuffer(anu.result)
					 client.sendMessage(from, cmwolf, image, {quoted: mek})
					 await limitAdd(sender)
					 break  
				case 'cml':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					cml = `${body.slice(5)}`
					cml1 = cml.split("/")[0];
					cml2 = cml.split("/")[1];
					buffer = await getBuffer(`https://api.vhtear.com/logoml?hero=${cml1}&text=${cml2}&apikey=${VthearApi}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'cpubg':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					cpubg = `${body.slice(7)}`
					cpubg1 = cpubg.split("/")[0];
					cpubg2 = cpubg.split("/")[1];
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=pubg&text1=${cpubg1}&text2=${cpubg2}&apikey=${TobzApi}`, {method: 'get'})
					cpubg = await getBuffer(anu.result)
					client.sendMessage(from, cpubg, image, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'csky':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					sky = `${body.slice(6)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/skytext?text=${sky}&apikey=${ZeksApi}`, {method: 'get'})
					gools7 = await getBuffer(anu.result)
					client.sendMessage(from, gools7, image, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cwooden':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					wood = `${body.slice(9)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/woodentext?text=${wood}&apikey=${ZeksApi}`, {method: 'get'})
					gools6 = await getBuffer(anu.result)
					client.sendMessage(from, gools6, image, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'ccrossfire':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					cf = `${body.slice(12)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/crosslogo?text=${cf}&apikey=${ZeksApi}`, {method: 'get'})
					gools5 = await getBuffer(anu.result)
					client.sendMessage(from, gools5, image, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cflower':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					flower = `${body.slice(9)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/flowertext?text=${flower}&apikey=${ZeksApi}`, {method: 'get'})
					gools3 = await getBuffer(anu.result)
					client.sendMessage(from, gools3, image, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'cnaruto':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					naruto = `${body.slice(9)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/naruto?text=${naruto}&apikey=${ZeksApi}`, {method: 'get'})
					gools4 = await getBuffer(anu.result)
					client.sendMessage(from, gools4, image, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'tahta':
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (isBanned) return reply(mess.only.benned)
                tahta = `${body.slice(7)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.zeks.xyz/api/hartatahta?text=${tahta}&apikey=${ZeksApi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                 case 'cbpink':
                if (!isUser) return reply(mess.only.userB)
                if (isBanned) return reply(mess.only.benned)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                bpink = `${body.slice(8)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.vhtear.com/blackpinkicon?text=${bpink}&apikey=${VthearApi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek})
                  await limitAdd(sender)
                  break  
                  case 'cthunder':
                if (!isUser) return reply(mess.only.userB)
                if (isBanned) return reply(mess.only.benned)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                thunder = `${body.slice(10)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.vhtear.com/thundertext?text=${thunder}&apikey=${VthearApi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek})
                  await limitAdd(sender) 
                  break 

			    case 'quotemaker':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					gh = `${body.slice(12)}`
					quote = gh.split("/")[0];
					wm = gh.split("/")[1];
					bg = gh.split("/")[2];
					const pref = `Usage: \n${prefix}quotemaker teks/watermark/theme\n\nEx :\n${prefix}quotemaker ini contoh/bicit/random`
					if (args.length < 1) return reply(pref)
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=${bg}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'cglitch':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    hm = `${body.slice(8)}`
                    text1 = hm.split("/")[0];
                    text2 = hm.split("/")[1];                    
                    glitch = await getBuffer(`https://api.vhtear.com/glitchtext?text1=${text1}&text2=${text2}&apikey=${VthearApi}`, {method: 'get'})
                    client.sendMessage(from, glitch, image, {quoted: mek, caption: 'nih gan'})
			     	await limitAdd(sender) 
			     	break 
                case 'cphlogo':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					gh = `${body.slice(9)}`
					gbl1 = gh.split("/")[0];
					gbl2 = gh.split("/")[1];
					if (args.length < 1) return reply('Teksnya mana gan?')
					buffer = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${gbl1}&text2=${gbl2}&apikey=${VthearApi}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break 

//akhir kreator
			    case 'jarak':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    jarak = `${body.slice(7)}`
			    ja = jarak.split("/")[0];
			    rak = jarak.split("/")[1];
			    anu = await fetchJson(`https://api.vhtear.com/distance?from=${ja}&to=${rak}&apikey=${VthearApi}`, {method: 'get'})
			    client.sendMessage(from, `${anu.result.data}`, text, {quoted: mek})
			    await limitAdd(sender) 
			    break  
			    case 'infoalamat':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://api.vhtear.com/infoalamat?query=${body.slice(12)}&apikey=${VthearApi}`, {method: 'get'})
			        client.sendMessage(from, `${anu.result.data}`, text, {quoted: mek})
			        await limitAdd(sender) 
			        break 
			    case 'tinyurl':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/tinyurl?url=${body.slice(9)}&apikey=${TobzApi}`)
			        tinyurl = `${anu.result}`
			        reply(tinyurl)
			        await limitAdd(sender) 
			        break 
			    case 'infonomor':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(10)}`)
			        infonomor = `*nomor* \n${anu.nomor} *international* \n${anu.international}`
			        reply(infonomor)
			        await limitAdd(sender) 
			        break 
			   case 'igstalk':
                    if (isBanned) return reply(mess.only.benned)    
   					if (!isUser) return reply(mess.only.userB)
   					if (isLimit(sender)) return reply(limits.limitend(pushname2))
                        anu = await fetchJson(`https://mhankbarbar.tech/api/stalk?username=${body.slice(9)}&apiKey=${BarBarApi}`, {method: 'get'})
                     buffer = await getBuffer(anu.Profile_pic)
                     reply(mess.wait)
                     hasil = `「 *INSTAGRAM STALKER* 」\n\n• Link: https://www.instagram.com/${anu.Username}\n• Fullname : ${anu.Name}\n• Following : ${anu.Jumlah_Followers}\n• Followers : ${anu.Jumlah_Following}\n• Jumlah Postingan: ${anu.Jumlah_Post}\n• Bio : ${anu.Biodata}`
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
                    await limitAdd(sender) 
                    break 
			    case 'mimpi':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
			    reply(mess.wait)
			        anu = await fetchJson(`https://api.arugaz.my.id/api/primbon/tafsirmimpi?mimpi=${body.slice(7)}`, {method: 'get'})
			        mimpi = `Arti Mimpi *${body.slice(7)}* Adalah:\n${anu.result.hasil}`
			        client.sendMessage(from, mimpi, text, {quoted: mek})
			        await limitAdd(sender) 
			       	break 
				case 'quotes':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/quotes`, {method: 'get'})
					quotes = `Quotes Dari: *${anu.result.by}*\n\n\n*${anu.result.quote}*`
					client.sendMessage(from, quotes, text, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'fakta':
				if (isBanned) return reply(mess.only.benned)   
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/faktaunik`, {method: 'get'})
					fakta = `Faktanya: *${anu.result}*`
					client.sendMessage(from, fakta, text, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'katabijak':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/katabijak`, {method: 'get'})
					katabijak = `Kata Bijak: *${anu.result}*`
					client.sendMessage(from, katabijak, text, {quoted: mek})
					await limitAdd(sender) 
					break 

			case 'profiltiktok':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${body.slice(14)}`)
			        tiktok = await getBuffer(anu.result)
              client.sendMessage(from, tiktok, image, {quoted: mek})
			        await limitAdd(sender) 
			        break 
		    case 'darkjokes':
				client.updatePresence(from, Presence.composing) 
				 if (isBanned) return reply(mess.only.benned)    
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUser) return reply(mess.only.userB)
				reply(mess.wait)
				 data = fs.readFileSync('./aebot/drak.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 darkjokes = await getBuffer(randKey.result)
                 client.sendMessage(from, darkjokes, image, {quoted: mek, caption: '\`\`\`DARK JOKES\`\`\`'})
				await limitAdd(sender) 
				break  
				case 'katakata':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					qute = await getBuffer(`https://i.ibb.co/tMnTJ4b/proses-1.jpg`)
					client.sendMessage(from, qute, image, { quoted: mek, caption: '*Nih kak*' })
					break
			case 'katailham':
				 if (isBanned) return reply(mess.only.benned) 
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))				    
				if (!isUser) return reply(mess.only.userB)
				reply(mess.wait)

				quotes = body.slice(1)

				const kta =['Lebih baik mengerti sedikit daripada salah mengerti.','Hampir semua pria memang mampu bertahan menghadapi kesulitan. Namun, jika Anda ingin menguji karakter sejati pria, beri dia kekuasaan.','Bila tekad seseorang kuat dan teguh, Tuhan akan bergabung dalam usahanya.','Penderitaan adalah pelajaran.','Ilmu pengetahuan tanpa agama adalah pincang.','Hidup itu seperti sebuah sepeda, agar tetap seimbang kita harus tetap bergerak.','Perbedaan masa lalu, sekarang, dan masa depan tak lebih dari ilusi yang keras kepala.','Sebuah meja, sebuah kursi, semangkuk buah, dan sebuah biola; apa lagi yang dibutuhkan agar seseorang bisa merasa bahagia?','Belas kasihanlah terhadap sesama, bersikap keraslah terhadap diri sendiri.','Cara paling baik untuk menggerakkan diri Anda ialah memberi tugas kepada diri sendiri.','Kita tidak boleh kehilangan semangat. Semangat adalah stimulan terkuat untuk mencintai, berkreasi dan berkeinginan untuk hidup lebih lama.','Manusia akan bahagia selama ia memilih untuk bahagia.','Saya tidak berharap menjadi segalanya bagi setiap orang. Saya hanya ingin menjadi sesuatu untuk seseorang.','Apabila sempurna akal seseorang, maka sedikit perkataannya.','Bahagialah orang yang dapat menjadi tuan untuk dirinya, menjadi kusir untuk nafsunya dan menjadi kapten untuk bahtera hidupnya.','Sahabat yang jujur lebih besar harganya daripada harta benda yang diwarisi dari nenek moyang.','Yang paling melelahkan dalam hidup adalah menjadi orang yang tidak tulus.','Terbuka untuk Anda, begitulah Tuhan memberi kita jalan untuk berusaha. Jangan pernah berfikir jalan sudah tertutup.','Penundaan adalah kuburan dimana peluang dikuburkan.','Cinta bukan saling menatap mata, namun melihat ke arah yang sama bersama-sama.','Kita adalah apa yang kita kerjakan berulang kali. Dengan demikian, kecemerlangan bukan tindakan, tetapi kebiasaan.','Jangan pernah mencoba menjadikan putra atau putri Anda menjadi seperti Anda. Diri Anda hanya cukup satu saja.','Jika Anda bisa membuat orang lain tertawa, maka Anda akan mendapatkan semua cinta yang Anda inginkan.','Masalah akan datang cepat atau lambat. Jika masalah datang, sambut dengan sebaik mungkin. Semakin ramah Anda menyapanya, semakin cepat ia pergi.','Kita tak bisa melakukan apapun untuk mengubah masa lalu. Tapi apapun yang kita lakukan bisa mengubah masa depan.','Kesabaran adalah teman dari kebijaksanaan.','Orang-orang kreatif termotivasi oleh keinginan untuk maju, bukan oleh keinginan untuk mengalahkan orang lain.','Dimanapun engkau berada selalulah menjadi yang terbaik dan berikan yang terbaik dari yang bisa kita berikan.','Kebencian seperti halnya cinta, berkobar karena hal-hal kecil.','Anda tidak perlu harus berhasil pada kali pertama.','Satu jam yang intensif, jauh lebih baik dan menguntungkan daripada bertahun-tahun bermimpi dan merenung-renung.','Hal terbaik yang bisa Anda lakukan untuk orang lain bukanlah membagikan kekayaan Anda, tetapi membantu dia untuk memiliki kekayaannya sendiri.','Tidak ada jaminan keberhasilan, tetapi tidak berusaha adalah jaminan kegagalan.','Aku tidak tahu kunci sukses itu apa, tapi kunci menuju kegagalan adalah mencoba membuat semua orang senang.']

				const su = kta[Math.floor(Math.random() * kta.length)]

				client.sendMessage(from, ''+su+'\n\n_-Ilham._', text, { quoted: mek })

				break
            
          case 'toxic':
              if (isBanned) return reply(mess.only.benned) 
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))				    
				if (!isUser) return reply(mess.only.userB)
				reply(mess.wait) 
				const toxic =['anjing','babi lu','anak anjing','udah tolol nub Lagi','muka lo kek monyet','udah jomblo sendirian lagi dirumah tolol','so so an mau punya pacar muka aja kek monyet lepass dari kandang','ganteng doang di toxic aja dibilang baperan','pantek kau','bangsat kau','ku entod kalian nangis kau','memek lu semua','lihat anak anjing lagi baca','ganteng doang jemput cewe dipanggang','kamu cantik beb bullshit anjing cowo buaya','anak dajjal','puki lu','anjing ngajak gelud','sama hantu takut cupu ngentod','cupu cupu aja gausah bacot','kontol lu semua','bocah lu semua kontol','3 Hari Lagi']
					const ole = toxic[Math.floor(Math.random() * toxic.length)]
					client.sendMessage(from, ole, text, { quoted: mek })
					break
				
			case 'katacinta':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/katacinta`, {method: 'get'})
				katacin = `*${anu.result}*`
				client.sendMessage(from, katacin, text, {quoted: mek})
				await limitAdd(sender) 
				break  
				
			case 'pasangan':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				pa = `${body.slice(10)}`
				sa = pa.split("/")[0];
				ngan = pa.split("/")[1];
				anu = await fetchJson(`https://api.vhtear.com/primbonjodoh?nama=${sa}&pasangan=${ngan}&apikey=${VthearApi}`, {method: 'get'})
				client.sendMessage(from, `${anu.result.hasil}`, {quoted: mek})
			await limitAdd(sender) 
			break 

			case 'persengay':
			case 'gaypersen':
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('tag temanmu!')
				rate = body.slice(11)
				const kl = persengayy[Math.floor(Math.random() * persengayy.length)]
				client.sendMessage(from, 'Persen Gay: *'+rate+'*\n\nJawaban : '+kl+'', text, { quoted: mek })
				await limitAdd(sender) 
				break  

			case 'pbucin':
			case 'persenbucin':
			case 'bucinpersen':
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('Mana Nama?')
				rate = body.slice(8)
				const pbucin = persenbucin[Math.floor(Math.random() * persenbucin.length)]
				client.sendMessage(from, 'Persen Bucin Kak: *'+rate+'*\n\nJawaban : '+ pbucin +'', text, { quoted: mek })
				await limitAdd(sender) 
				break 
		    case 'map':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
                buffer = await getBuffer(anu.gambar)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
				await limitAdd(sender) 
				break 
				case 'url2img':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('Tipenya apa gan?')
					if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')
					if (args.length < 2) return reply('Urlnya mana gan?')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${BarBarApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					url2img = await getBuffer(anu.result)
					client.sendMessage(from, url2img, image, {quoted: mek})
					await limitAdd(sender)
					break 
			    case 'tagall':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]} wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(`╔═══✪ Tag By *${pushname2}* ✪══`+ teks +'╚═══〘 𝙈𝘼𝙉𝘾𝘼-𝘽𝙊𝙏 〙══', members_id, true)
					break
			    case 'mentionall':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = '\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(`╔══〘  *${body.slice(12)}*  〙✪══`+teks+'╚═〘 𝙈𝘼𝙉𝘾𝘼-𝘽𝙊𝙏 〙', members_id, true)
					break
			    case 'kbbi':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
					if (args.length < 1) return reply('Apa yang mau dicari gan?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					reply('Menurut Kbbi:\n\n'+anu.result)
					await limitAdd(sender)
					break 
					case 'grup':
					case 'gc':
					case 'group':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					    reply(`\`\`\`✓Sukses Membuka Group\`\`\` *${groupMetadata.subject}*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`\`\`\`✓Sukses Menutup Group\`\`\` *${groupMetadata.subject}*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
				case 'say':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://anuz.herokuapp.com/api/bapakfont?kata=${body.slice(6)}`, {method: 'get'})
					reply(anu.result)
					await limitAdd(sender) 
					break 
				case 'artinama':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Apa yang mau dicari gan?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(6)}`, {method: 'get'})
					reply('Menurut nama:\n\n'+anu.result)
					await limitAdd(sender) 
					break 
				case 'clearall':
					if (!isOwner) return reply('Kamu siapa?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply(`\`\`\`Sukses delete all chat AE\`\`\``)
					break
                                case 'bcgc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						bcgc = await client.downloadMediaMessage(encmedia)
						for (let _ of groupMembers) {
							client.sendMessage(_.jid, bcgc, image, {caption: `*「 BROADCAST GROUP 」*\n*Group* : ${groupName}\n\n${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of groupMembers) {
							sendMess(_.jid, `*「 BROADCAST GROUP 」*\n*Group* : ${groupName}\n\n${body.slice(6)}`)
						}
						reply('Suksess broadcast group')
					}
					break
				case 'bc':
					if (!isOwner) return reply('Kamu siapa?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						bc = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, bc, image, {caption: `[ Izin Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('Suksess broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ *MANCA BROADCAST* ]\n\n${body.slice(4)}`)
						}
						reply('Suksess broadcast')
					}
					break
				case 'add':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('𝙳𝙴𝙺 𝙰𝙳𝙳 𝚂𝙰𝙷𝙰?')
					if (args[0].startsWith('08')) return reply('𝙶𝚄𝙽𝙰𝙺𝙴𝙽 𝙺𝙾𝙳𝙴 𝙽𝙴𝙶𝙰𝚁𝙰 𝙰𝚃𝚄𝙷')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('𝚃𝙴 𝙱𝙸𝚂𝙰 𝙽𝙰𝙼𝙱𝙰𝙷𝙺𝙴𝙽 𝙼𝙰𝙽𝙴𝙷 𝙽𝙰, 𝙺𝙰𝚁𝙽𝙰 𝙿𝚁𝙸𝚅𝙰𝚃𝙴')
					}
					break
			    case 'kick':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙰𝙸𝙽𝙶 𝚃𝙴𝚁𝙸𝙼𝙰, 𝙰𝙺𝙷𝙸𝚁𝙽𝚈𝙰 𝙱𝙸𝚂𝙰 𝙺𝙸𝙲𝙺 𝙰𝙻𝙷𝙰𝙼𝙳𝚄𝙻𝙸𝙻𝙻𝙰𝙷 :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'edotense':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, di edotense :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, di edotense : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'promote':
				case 'pm':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙰𝙸𝙽𝙶 𝚃𝙴𝚁𝙸𝙼𝙰, 𝙼𝙰𝙽𝙴𝙷 𝙹𝙰𝙳𝙸 𝙰𝙳𝙼𝙸𝙽, 𝙰𝚃𝚄𝚁 𝙶𝚁𝚄𝙿 𝚈𝙶 𝙱𝙴𝙽𝙴𝚁 𝙾𝙺𝙴 :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'delete':
					case 'del':
					case 'd':
					if (!isGroup)return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
			    case 'demote':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '𝙿𝙴𝚁𝙸𝙽𝚃𝙰𝙷 𝙰𝙸𝙽𝙶 𝚃𝙴𝚁𝙸𝙼𝙰, 𝙼𝙰𝙽𝙴𝙷 𝙻𝙰𝙸𝙽 𝙰𝙳𝙼𝙸𝙽 𝙳𝙴𝙸 :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, Menurunka : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'listadmins':
				case 'listadmin':
				case 'adminlist':
				case 'adminslist':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'toimg':
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isQuotedSticker) return reply(' reply stickernya atuh')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran= getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(' 𝚃𝙴𝙱𝙸𝚂𝙰, 𝚂𝚃𝙸𝙺𝙴𝚁 𝙺𝙴 𝙶𝙰𝙼𝙱𝙰𝚁 ')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Follow:https://www.instagram.com/thenay_xploit_'})
						fs.unlinkSync(ran)
					})
					await limitAdd(sender) 
					break 
				case 'simi':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Textnya mana kak?')
					teks = `{$body.slice(6)}`
					anu = await fetchJson(`https://api.i-tech.id/tools/simi?key=${TechApi}&lang=id&kata=${teks}`, {method: 'get'})
					if (anu.error) return reply('Simi ga tau kak')
					simii = `*${anu.result}`
					client.sendMessage(from, simii, text, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'simih':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isSimi) return reply('Mode simi sudah aktif')
						samih.push(from)
						fs.writeFileSync('./database/json/simi.json', JSON.stringify(samih))
						reply(`\`\`\`Sukses mengaktifkan mode simi di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						samih.splice(from, 1)
						fs.writeFileSync('./database/json/simi.json', JSON.stringify(samih))
						reply(`\`\`\`✓Sukes menonaktifkan mode simi di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break
			    case 'nsfw':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isNsfw) return reply('Mode nsfw sudah aktif')
						nsfw.push(from)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply(`\`\`\`✓Sukses mengaktifkan mode nsfw di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply(`\`\`\`✓Sukes menonaktifkan mode nsfw di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break
				case 'modeanime':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isAnime) return reply('Mode anime sudah aktif')
						anime.push(from)
						fs.writeFileSync('./database/json/anime.json', JSON.stringify(anime))
						reply(`\`\`\`✓Sukses mengaktifkan mode anime di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						anime.splice(from, 1)
						fs.writeFileSync('./database/json/anime.json', JSON.stringify(anime))
						reply(`\`\`\`✓Sukes menonaktifkan mode anime di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break
				case 'welcome':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isWelkom) return reply('Udah aktif gan')
						welkom.push(from)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply(`\`\`\`✓Sukses mengaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply(`\`\`\`✓Sukses menonaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break 
				case 'caklontong':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.vhtear.com/funkuis&apikey=${VthearApi}`, {method: 'get'})
					caklontong = `*${anu.result.soal}*`
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban+ '\n\n• Penjelasan: *'+ anu.result.desk+'*', text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, caklontong, text, {quoted: mek}) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break 
				case 'tebakgambar':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://videfikri.com/api/tebakgambar`, {method: 'get'})
					bufferkkk = await getBuffer(anu.result.soal_gbr)
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, bufferkkk, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break  
				case 'family100':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.vhtear.com/family100&apikey=${VthearApi}`, {method: 'get'})
					family = `*${anu.result.soal}*`
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, family, text, {quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break 
				case 'tafsir':
					if (isBanned) return reply(mess.only.benned)
					if (!isUser) return reply(mess.only.userB)
					if (isLimit(sender)) return reply(limits.limitend(pushname2))
					tafsir = `${body.slice(8)}`
					taf = tafsir.split("/")[0];
					sir = tafsir.split("/")[1];
					anu = await fetchJson(`https://api.quran.sutanlab.id/surah/${taf}/${sir}`, {method: 'get'})
					const {ta} = `${anu.data}`
					tafsi = `Tafsir Q.S. ${ta.surah.name.transliteration.id} : ${sir}\n\n${ta.text.arab}\n\n_${ta.text.translation.id}\n\n${ta.tafsir.id.long}`
					client.sendMessage(from, tafsi, text, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'clone':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag gan')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal om')
					}
					break
				case 'setprefix':
				case 'setpref':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
					break
				case 'wait':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto aja mas')
					}
					await limitAdd(sender) 
					break 
					
			case 'quran':
			 if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
					quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
					client.sendMessage(from, quran, text, {quoted: mek})
					await limitAdd(sender) 
					break 
	case 'infocuaca':
	 if (isBanned) return reply(mess.only.benned)    
     if (!isUser) return reply(mess.only.userB)
     if (isLimit(sender)) return reply(limits.limitend(pushname2))
     if (args.length < 1) return reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca Banten', text)
     reply(mess.wait)
            tempat = `${body.slice(11)}`
            weather = await fetchJson('https://videfikri.com/api/cuaca/?daerah='+ tempat, {method: 'get'})
            if (weather.error) {
             reply(from, weather.error, text)
            } else {
             client.sendMessage(from, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desc}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, text, {quoted: mek})
            }
            await limitAdd(sender)
            break 

         case 'pinterest':
         if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Mau Nyari Foto Apa???')
					pinte = body.slice(11)
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*nih*`})
					break 
					
		case 'jadwalsholat':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Masukan nama daerah!!')
					sholat = `${body.slice(14)}`
					anu = await fetchJson(`https://mhankbarbar.tech/api/jadwalshalat?daerah=${sholat}&apiKey=${BarBarApi}`, {method: 'get'})
					reply(mess.wait)
					if (anu.result) return reply(anu.result)
					jsol = `Jadwal sholat di *${sholat}* hari ini adalah\n\n➸ *Subuh :* ${anu.Subuh} WIB\n*➸ Dzuhur :* ${anu.Dzuhur} WIB\n*➸ Ashar :* ${anu.Ashar} WIB\n*➸ Maghrib :* ${anu.Maghrib} WIB\n*➸ Isya :* ${anu.Isya} WIB`
					client.sendMessage(from, jsol, text, {quoted: mek})
					await limitAdd(sender) 
					break 
            case 'jadwaltv':
                if (isBanned) return reply(mess.wait.benned)
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (args.length < 1)return reply('Nama Channelnya??')
                reply(mess.wait)
                jadwaltv = `${body.slice(10)}`
                anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/jadwaltv?ch=${jadwaltv}`, {method: 'get'})
                jtv = `${anu.result}`
                client.sendMessage(from, jtv, text, {quoted: mek})
                await limitAdd(sender)
               	break  
                
           case 'jadwaltvnow':
                if (isBanned) return reply(mess.wait.benned)
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/jadwaltvnow`, {method: 'get'})
                tvnow = `Jadwal Tv Sekarang Pada Jam : *${anu.result.jam}* Adalah: \n *${anu.result.jadwalTV}`
                client.sendMessage(from, tvnow, text, {quoted: mek})
                await limitAdd(sender) 
                break 

// premium user
         case 'joox':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPrem) return reply(mess.only.premium)
                anu = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=${TobzApi}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 infomp3 = `「 *JOOX* 」\n\n*• Judul* : ${anu.result.judul}\n*• Album* : ${anu.result.album}\n*• Dipublikasi* : ${anu.result.dipublikasi}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                bufferddd = await getBuffer(anu.result.thumb)
                 reply(mess.wait)
                buff = await getBuffer(anu.result.mp3)
                client.sendMessage(from, bufferddd, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek})
                await limitAdd(sender) 
                break  
                
          case 'snack':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPrem) return reply(mess.only.premium)
				if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('sck')) return reply(mess.error.Iv)
                anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/sckdown?url=${args[0]}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 sck = `「 *SNACK VIDEO DOWNLOADER* 」\n\n*• Format:* ${anu.format}\n*• Size:* ${anu.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                bufferddd = await getBuffer('https://raw.githubusercontent.com/mancabot/nurul-mc/main/src/glitchtext.png')
                 reply(mess.wait)
                buff = await getBuffer(anu.result)
                client.sendMessage(from, bufferddd, image, {quoted: mek, caption: sck})
                client.sendMessage(from, buff, video, {mimetype: 'video/mp4', filename: `${anu.format}.mp4`, quoted: mek})
                await limitAdd(sender) 
                break  
                case 'indo1':

					if (isBanned) return reply(mess.only.benned)    



				if (!isPrem) return reply(mess.only.premium)



				if (!isUser) return reply(mess.only.userB)

                reply(mess.wait)

					qute = await getBuffer(`https://i.ibb.co/LvCvdP3/IMG-20210107-WA1487.png`)

					client.sendMessage(from, qute, image, { quoted: mek, caption: '*SANGEAN AOWKWKO*\nNih Link Bro Download Sendiri Jing\n\nhttps://www.mediafire.com/file/h2nygxbyb6n9cyo/VID-20210107-WA1468.mp4/file' })

					break
					case 'indo2':
					if (isBanned) return reply(mess.only.benned)    



				if (!isPrem) return reply(mess.only.premium)



				if (!isUser) return reply(mess.only.userB)

                reply(mess.wait)
					qute = await getBuffer(`https://i.ibb.co/LvCvdP3/IMG-20210107-WA1487.png`)
					client.sendMessage(from, qute, image, { quoted: mek, caption: '*SANGEAN AOWKWKO*\nNih Link Bro Download Sendiri Jing\n\nhttps://www.mediafire.com/file/pk8hozohzdc076c/VID-20210107-WA1466.mp4/file' })
					break
                case 'indo3':
					if (isBanned) return reply(mess.only.benned)    



				if (!isPrem) return reply(mess.only.premium)



				if (!isUser) return reply(mess.only.userB)

                reply(mess.wait)
					qute = await getBuffer(`https://i.ibb.co/LvCvdP3/IMG-20210107-WA1487.png`)
					client.sendMessage(from, qute, image, { quoted: mek, caption: '*SANGEAN AOWKWKO*\nNih Link Bro Download Sendiri Jing\n\nhttps://www.mediafire.com/file/112q3u286tnvzjo/VID-20210107-WA1467.3gp/file' })
					break
					case 'indo4':
					if (isBanned) return reply(mess.only.benned)    



				if (!isPrem) return reply(mess.only.premium)



				if (!isUser) return reply(mess.only.userB)

                reply(mess.wait)
					qute = await getBuffer(`https://i.ibb.co/LvCvdP3/IMG-20210107-WA1487.png`)
					client.sendMessage(from, qute, image, { quoted: mek, caption: '*SANGEAN AOWKWKO*\nNih Link Bro Download Sendiri Jing\n\nhttps://www.mediafire.com/file/arpphhxsv94ak0r/VID-20210107-WA1462.mp4/file' })
					break
					case 'indo5':
					if (isBanned) return reply(mess.only.benned)    



				if (!isPrem) return reply(mess.only.premium)



				if (!isUser) return reply(mess.only.userB)

                reply(mess.wait)
					qute = await getBuffer(`https://i.ibb.co/LvCvdP3/IMG-20210107-WA1487.png`)
					client.sendMessage(from, qute, image, { quoted: mek, caption: '*SANGEAN AOWKWKO*\nNih Link Bro Download Sendiri Jing\n\nhttps://www.mediafire.com/file/us3f4j62emftbrf/VID-20210107-WA1463.mp4/file' })
					break
					case 'indo6':
					if (isBanned) return reply(mess.only.benned)    



				if (!isPrem) return reply(mess.only.premium)



				if (!isUser) return reply(mess.only.userB)

                reply(mess.wait)
					qute = await getBuffer(`https://i.ibb.co/LvCvdP3/IMG-20210107-WA1487.png`)
					client.sendMessage(from, qute, image, { quoted: mek, caption: '*SANGEAN AOWKWKO*\nNih Link Bro Download Sendiri Jing\n\nhttps://www.mediafire.com/file/v4033tkl16hgf2b/VID-20210107-WA1459.mp4/file' })
					break
					case 'indo7':
					if (isBanned) return reply(mess.only.benned)    



				if (!isPrem) return reply(mess.only.premium)



				if (!isUser) return reply(mess.only.userB)

                reply(mess.wait)
					qute = await getBuffer(`https://i.ibb.co/LvCvdP3/IMG-20210107-WA1487.png`)
					client.sendMessage(from, qute, image, { quoted: mek, caption: '*SANGEAN AOWKWKO*\nNih Link Bro Download Sendiri Jing\n\nhttps://www.mediafire.com/file/3scnim6d1x4b8ie/VID-20210107-WA1461.mp4/file' })
					break
                
            
               case 'ytmp4':
    				if (isBanned) return reply(mess.only.benned)    
    				if (!isPrem) return reply(mess.only.premium)
    				if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('youtu.be')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break


           case 'playmp3':
                if (isBanned) return reply(mess.only.benned)    
				if (!isPrem) return reply(mess.only.premium)
				if (!isUser) return reply(mess.only.userB)
                reply(mess.wait)
                play = body.slice(9)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `「 *PLAY MP3* 」\n*• Judul:* ${anu.result.title}\n*• Source:* ${anu.result.source}\n*• Ukuran:* ${anu.result.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                await limitAdd(sender) 
                break 

          case 'asupan';
               client.updatePresence(from, Presence.composing) 
				if (isBanned) return reply(mess.only.benned)    
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.publikG)
				reply(mess.wait)
				 data = fs.readFileSync('./aebot/asupan.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 asupan = await getBuffer(randKey.result)
                 client.sendMessage(from, asupan, video, {quoted: mek, caption: '\`\`\`ASUPAN NYA TUH KAK\`\`\`'})
				await limitAdd(sender) 
				break

// Akhir Fitur Premium 

				case 'wiki':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
                    if (args.length < 1) return reply('teks nya mana om?')
                    reply(mess.wait)
                   wiki = `${body.slice(6)}`
                    anu = await fetchJson(`http://itsmeikygans.my.id/wiki?apikey=${ItsApi}&q=${wiki}`, {method: 'get'})
                    if (anu.error) return reply(anu.error)
                    wikii = `${anu.result}`
                    client.sendMessage(from, wikii, text, {quoted: mek})
                   await limitAdd(sender) 
                   break  
                   
               case 'pastebin':
                   if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
				paste = `${body.slice(10)}`
                   anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/pastebin?text=${paste}`, {method: 'get'})
                   client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
                   await limitAdd(sender) 				
                   break 
	       case 'smule':
	       if (isBanned) return reply(mess.only.benned)
	       if (!isPrem) return reply(mess.only.premium)
				if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('c-ash.smule')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/smule?link=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n\n Tunggu Sebentar 1 menit Mungkun Agak Lama Karna Mendownload Video`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek, caption: 'Nih Gan'})
					await limitAdd(sender) 	
					break  
		case 'bpfont':
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (!isUser) return reply(mess.only.userB)
			bp = `${body.slice(8)}`
			anu = await fetchJson(`https://api.terhambar.com/bpk?kata=${bp}`, {method: 'get'})
			reply (anu.text)
			await limitAdd(sender) 
			break  
		case 'spamsms':
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (!isUser) return reply(mess.only.userB)
			sms = `${body.slice(9)}`
			nomer = sms.split("/")[0];
			jumlah = sms.split("/")[1];
			anu = await fetchJson(`http://itsmeikygans.my.id/spamsms?apikey=${ItsApi}&no=${body.slice(10)}&jum=${jumlah}`, {method: 'get'})
			client.sendMessage(from, `${anu.logs}`, text, {quoted: mek})
			await limitAdd(sender) 
			break  
		case 'spamcall':
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (!isUser) return reply(mess.only.userB)
			call = `${body.slice(11)}`
			anu = await fetchJson(`https://videfikri.com/api/call/?nohp=${call}`, {method: 'get'})
			client.sendMessage(from, `${anu.result.logs}`, text, {quoted: mek})
			await limitAdd(sender) 
			break  
		case 'spamgmail':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			spam = `${body.slice(10)}`
			anu = await fetchJson(`https://videfikri.com/api/spamemail/?email=${spam}&subjek=PT.PLN&pesan=Silahkan%20bayar%20tagihan%20listrik%20Anda`, {method: 'get'})
			client.sendMessage(from, `${anu.result.log_lengkap}`, text, {quoted: mek})
			await limitAdd(sender) 
			break  
		case 'quransurah':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			reply(mess.wait)
			surah = `${body.slice(12)}`
			anu = await fetchJson(`https://api.zeks.xyz/api/quran?no=${surah}&apikey=${ZeksApi}`)
			quran = `Surah Al-Qur\`an Nomer: *${surah}*\nSurah: *${anu.surah}*\nDiturunkan Dikota: *${anu.type}*\nJumlah Ayat: *${anu.jumlah_ayat}*\n\n*${anu.ket}\n=============================\n`
			for (let surah of anu.ayat) {
			quran += `${surah.number}\n${surah.text}\n${surah.translation_id}\n=====================\n`
			}
			reply(quran.trim())
			await limitAdd(sender) 
			break 
		case 'bitly':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			link = `${body.slice(7)}`
			anu = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${link}&apikey=${TobzApi}`, {method: 'get'})
			bitly = `${bitlyy.result}`
			client.sendMessage(from, anu, text, {quoted: mek})
			await limitAdd(sender) 
			break  
			case 'textstyle':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			reply(mess.wait)
			style = `${body.slice(11)}`
			anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/fancytext?text=${style}`, {method: 'get'})
			reply (anu.result)
			await limitAdd(sender) 
			break  
			case 'pantun':
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/pantun`, {method: 'get'})
			client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
			await limitAdd(sender) 
			break  
			
		case 'jamdunia':
		if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			reply(mess.wait)
		 jamdunia = `${body.slice(10)}`
			anu = await fetchJson(`https://api.i-tech.id/tools/jam?key=${TechApi}&kota=${jamdunia}`, {method: 'get'})
			wtime = `*${anu.timezone}*\n*${anu.date}*\n*${anu.time}*`
			client.sendMessage(from, wtime, text, {quoted: mek})
			await limitAdd(sender) 
			break  
			
		 case 'tomp3':
                if (isBanned) return reply(mess.only.benned)    
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUser) return reply(mess.only.userB)
                	client.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return reply('_*Reply Video nya Gan!*_')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal, pada saat mengkonversi video ke mp3')
						bufferlkj = fs.readFileSync(ran)
						client.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					await limitAdd(sender) 
					break 

				case 'setppbot':
					if (!isOwner) return reply(mess.only.owner)
				    client.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya🙂')
					break

// Fitur Defacer

				case 'dorking':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
				dork = `${body.slice(9)}`
					anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${dork}`, {method: 'get'})
					hasil = `${anu.result}`
					client.sendMessage(from, hasil, text, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'encode64':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encode64 = `${body.slice(10)}`
				anu = await fetchJson(`https://api.i-tech.id/hash/bs64?key=${TechApi}&type=encode&string=${encode64}`, {method: 'get'})
				client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break 
				case 'decode64':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decode64 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs64?key=${TechApi}&type=decode&string=${decode64}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'decode32':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decode32 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs32?key=${TechApi}&type=decode&string=${decode32}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'encode32':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encode32 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs32?key=${TechApi}&type=decode&string=${encode32}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'encbinary':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encbinary = `${body.slice(11)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/binary/?encode=${encbinary}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'decbinary':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decbin = `${body.slice(11)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/binary/?decode=${decbin}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'encoctal':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encoc = `${body.slice(10)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/base64/?decode=${encoc}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender)
					break  
				case 'decoctal':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decoc = `${body.slice(10)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/base64/?encode=${decoc}`, {method: 'get'})
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'becrypt':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				becry = `${body.slice(10)}`
				anu = await fetchJson(`https://api.i-tech.id/hash/bcrypt?key=${TechApi}&string=${becry}`, {method: 'get'})
				client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
				await limitAdd(sender) 
				break 
					case 'hashidentifier':
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					  hash = `${body.slice(16)}`
					  anu = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/hash-identifier?hash=${hash}`)
					  hasilhash = `Tipe: *${anu.hash_type}*\nChar Tipe: *${anu.char_type}*`
					  client.sendMessage(from, hasilhash, text, {quoted: mek})
					  await limitAdd(sender)
					  break 
// akhir encrypt & decrypt Fitur

			case 'google':
                const googleQuery = body.slice(8)
               if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if(googleQuery == undefined || googleQuery == ' ') return reply(`*Hasil Pencarian : ${googleQuery}* tidak ditemukan`)
                google({ 'query': googleQuery }).then(results => {
                let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
                for (let i = 0; i < results.length; i++) {
                    vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                }
                    reply(vars)
                }).catch(e => {
                    console.log(e)
                    client.sendMessage(from, 'Google Error : ' + e);
                })
                await limitAdd(sender) 
                break 
                
                case 'addbucin':
                    if (!isOwner) return reply(mess.only.owner)
				    huu = body.slice(10)
						bucinrandom.push(huu)
						fs.writeFileSync('./database/json/bucin.json', JSON.stringify(bucinrandom))
						reply(`Sukses, Kata \n*${huu}*\n Telah Ditambahkan ke database`)
						break
                    case 'bucin':
                    case 'quotebucin':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    hasil = bucinrandom[Math.floor(Math.random() * (bucinrandom.length))]
                    client.sendMessage(from, '"'+hasil+'*', text, {quoted: mek})
                    await limitAdd(sender)
                    break

				default:
					if (body.startsWith(`${prefix}${command}`)) {
                  reply(`𝙷𝙰𝙼𝙿𝚄𝚁𝙰 𝙰𝙰 𝚃𝙴𝚃𝙴𝙷 *${pushname2}*, Command *${prefix}${command}* 𝚃𝙴 𝙰𝚈𝙰 𝚃𝙸𝙽𝙰 *${prefix}menu*`)
                  
                  }
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[MANCA-BOT]','red'), 'Command Tidak Terdaftar', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
