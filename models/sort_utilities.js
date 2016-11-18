function getSmallestPerType(objects, key){
  hash = {};
  filteredObjects = [];
  for(let obj of objects){
    let attrKey = obj[key];
    if(hash[attrKey]){
      if(obj.size < hash[attrKey].size){
        hash[attrKey] = obj;
      }
    }else{
      hash[attrKey] = obj;
    }
  }

  for(obj in hash){
    filteredObjects.push(hash[obj]);
  }

  return filteredObjects;
}

module.exports = getSmallestPerType;
