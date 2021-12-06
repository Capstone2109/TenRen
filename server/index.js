const { db } = require('./db')
const PORT = process.env.PORT || 3000
const app = require('./app')
const seed = require('../script/seed');
const { getHoursPastSinceNewsUpdate, refreshLiveNews } = require('./db/rapidApi/currentNews');

const init = async () => {
  try {
    if(process.env.SEED === 'true') {
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    handleDBupdates()
  } catch (ex) {
    console.log(ex)
  }
}


async function handleDBupdates() {
  console.log("checking if anything needs to be updated in DB...")
  if(await getHoursPastSinceNewsUpdate() >= 24){
    console.log("Updating news...")
    await refreshLiveNews()
  }

  setTimeout( ()=>{
    handleDBupdates()
  },600000)
  
}

init()
