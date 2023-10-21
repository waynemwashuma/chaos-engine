function Rlerp(...v,t,arr =[]) {
  arr.length = 0
  for (let i = 1; i < v.length; i++) {
    arr.push(Vector.lerp(v[i-1],v[i],t))
  }
  if(arr.length== 1) return a[0]
  return Rlerp(t,...a,arr)
}
function Bezier(p1,p2,p3,p4,t) {
  return Rlerp(p1,p2,p3,p4,t)
}

export{
  Bezier
}