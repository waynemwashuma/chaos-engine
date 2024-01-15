export function getURLName(url){
  return url.split("/").pop().split(".")[0]
}
export function getURLExtension(url){
  return url.split(".").pop()
}