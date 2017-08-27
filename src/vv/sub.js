const sub = (v1, v2, i=0, res=List()) => {
  if (i >= v1.size) {
    return res;
  } else {
    const update = res.push(v1.get(i).sub(v2.get(i)))
    return sub(v1, v2, i+1, update)
  }
}
