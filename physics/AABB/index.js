class AABB{
  static bodiesColliding(body1,body2){
    return boundingBoxesColliding(body1.boundingBox,body2.boundingBox)
  }
  static boundingBoxesColliding(box1,box2){
    
    if(AABB.boxesRelativeCollide(box1,box2)|| AABB.boxesRelativeCollide(box2,box1)) return true
    return false
  }
  static boxesRelativeCollide(box1,box2){
    if(AABB.boxCollideOnAxis(box1.x,box2.x,box1.w,box2.w) && AABB.boxCollideOnAxis(box1.y,box2.y,box1.h,box2.h)) return true
  }
  static boxCollideOnAxis(a1,a2,d1,d2){
    if(a1 + d1/2 > a2-d2/2&& a1 + d1/2 < a2+d2/2)return true
    return false
  }
}

export{
  AABB
}