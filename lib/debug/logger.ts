export { }

const COLORS = {
    reset: "\x1b[0m",
    info: "\x1b[32m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    debug: "\x1b[34m"
}

function timestamp(): string {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const date = now.getDate().toString().padStart(2, "0")
    const month = (now.getMonth() + 1).toString().padStart(2, "0")
    const year = now.getFullYear().toString().slice(-2)

    return `${hours}:${minutes}, ${month}/${date}/${year}`
}

export const log = {
    info(...args: any[]) {
        console.log(`\x1b[1m${COLORS.info}${timestamp()} [INFO]`, ...args, COLORS.reset)
    },
    warn(...args: any[]) {
        console.warn(`\x1b[1m${COLORS.warn}${timestamp()} [WARN]`, ...args, COLORS.reset)
    },
    error(...args: any[]) {
        console.error(`\x1b[1m${COLORS.error}${timestamp()} [ERROR]`, ...args, COLORS.reset)
    },
    debug(...args: any[]) {
        console.log(`\x1b[1m${COLORS.debug}${timestamp()} [DEBUG]`, ...args, COLORS.reset)
    }
}
