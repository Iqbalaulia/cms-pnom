function convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

function handleValidasiImage (url) {
  let element = document.createElement('IMG')
  element.src = url
  element.onerror = function () {
      return false
  }
  element.onload = function () {
      return true
  }

  return true
}

export {
    convertDate,
    handleValidasiImage
}