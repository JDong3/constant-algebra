const ns = {
  f1: () => {
    console.log('hi');
    this.f2()
  },

  f2: () => {
    console.log('mom');
  }
}

const ns2 = {
  f1: () => {
    console.log('its ur boy');
  }
}

ns.f1()
