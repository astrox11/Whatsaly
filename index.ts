import MAIN_LOGGER from 'pino'
import NodeCache from '@cacheable/node-cache'
import readline from 'readline'
import makeWASocket, { delay, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, proto, useMultiFileAuthState, } from 'baileys'
import type { AnyMessageContent, CacheStore, WAMessageContent, WAMessageKey } from 'baileys'
import { log } from './lib'

log.info('Starting WhatsApp Client...')

const logger = MAIN_LOGGER({ level: "silent" })
const msgRetryCounterCache = new NodeCache() as CacheStore
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text: string) => new Promise<string>((resolve) => rl.question(text, resolve))

const startSock = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')
    const { version, isLatest } = await fetchLatestBaileysVersion()
    log.info(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const sock = makeWASocket({
        version,
        logger,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        getMessage
    })

    if (!sock.authState.creds.registered) {
        const phoneNumber = await question('Please enter your phone number:\n')
        const code = await sock.requestPairingCode(phoneNumber)
        log.info(`Pair Code: ${code.slice(0, 4)}-${code.slice(4)}`)
    }

    const sendMessageWTyping = async (msg: AnyMessageContent, jid: string) => {
        await sock.presenceSubscribe(jid)
        await delay(500)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(2000)

        await sock.sendPresenceUpdate('paused', jid)

        await sock.sendMessage(jid, msg)
    }

    sock.ev.process(
        async (events) => {
            if (events['connection.update']) {
                const update = events['connection.update']
                const { connection, lastDisconnect } = update
                if (connection === 'close') {
                    if ((lastDisconnect?.error as { output: { statusCode: number } })?.output?.statusCode !== DisconnectReason.loggedOut) {
                        startSock()
                    } else {
                        log.error('Connection closed. You are logged out.')
                    }
                }
                connection === 'open' ? log.info(`Bridge Connected to WhatsApp`) : undefined
            }
            if (events['creds.update']) {
                await saveCreds()
            }


            // if (events['messaging-history.set']) {
            //     const { chats, contacts, messages, isLatest, progress, syncType } = events['messaging-history.set']
            //     if (syncType === proto.HistorySync.HistorySyncType.ON_DEMAND) {
            //         console.log('received on-demand history sync, messages=', messages)
            //     }
            //     console.log(`recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest}, progress: ${progress}%), type: ${syncType}`)
            // }

            // received a new message
            if (events['messages.upsert']) {
                const upsert = events['messages.upsert']
                log.info('recv messages ', JSON.stringify(upsert, undefined, 2))
            }
        }
    )

    return sock

    async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
        return proto.Message.create({ conversation: 'test' })
    }
}

startSock()
