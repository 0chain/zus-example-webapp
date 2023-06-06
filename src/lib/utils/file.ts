export const openSaveFileDialog = file => {
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'

  a.href = file.url
  a.download = file.fileName
  a.click()
  window.URL.revokeObjectURL(file.url)
  document.body.removeChild(a)
}

export const checkBlobUrl = async url => {
  try {
    const res = await fetch(url)
    return res.status === 200
  } catch (e) {
    console.log(e)
    return false
  }
}
