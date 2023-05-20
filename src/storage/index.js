class Store{
  constructor(){
    this.store = indexedDB.open("database")
    this.store.onsuccess = (ev)=>{
    }
  }
}
export {
  Store
}
localStorage.setItem("red",{})