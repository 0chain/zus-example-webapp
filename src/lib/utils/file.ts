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
