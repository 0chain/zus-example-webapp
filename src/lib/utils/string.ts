export const bytesToString = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  bytes = bytes?.toPrecision()

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  if (i < 0) return `${bytes} bytes`

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const getParentPath = path => {
  if (!path) {
    path = '/'
  }
  if (path.endsWith('/')) {
    path = path.slice(0, -1)
  }

  const items = path.split('/')
  //remove last element
  items.pop()

  return '/' + items.join('/')
}

export const normalizedPath = path => path?.replace(/\/+/g, '/')

export const generateRandomString = (length = 5) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export function hexStringToByte(str) {
  if (!str) return new Uint8Array()

  const a = []
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16))
  }

  return new Uint8Array(a)
}
