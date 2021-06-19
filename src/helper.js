export function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function tableFieldsCreator(tableSize, additionalProps) {
  const result = []
  let currentRow = 1
  let currentCol = 1
  while (currentRow <= tableSize) {
    result.push({
      row: currentRow,
      col: currentCol,
      ...additionalProps,
    })
    if (currentCol === tableSize) {
      currentRow++
      currentCol = 1
    } else {
      currentCol++
    }
  }
  return result
}

export function serverDataPrettier(obj) {
  return Object.keys(obj).map((key) => {
    return {
      name: camelCaseToText(key),
      value: obj[key].field,
    }
  })
}

function camelCaseToText(str) {
  return str
    .split('')
    .map((letter, idx) => {
      if (letter.toUpperCase() === letter) {
        return `${idx !== 0 ? ' ' : ''}${letter.toLowerCase()}`
      } else return letter
    })
    .join('')
}
