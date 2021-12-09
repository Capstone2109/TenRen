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
    console.log("\u001b[1;31m Live News update is disabled (server/index.js Line 18) \u001b[0m")
    //handleDBupdates()
  } catch (ex) {
    console.log(ex)
  }
}


async function handleDBupdates() {

  console.log("checking if anything needs to be updated in DB...")

  //checks if it has been 24 hours since live news has been updated, if so update live news
  if(await getHoursPastSinceNewsUpdate() >= 24){
    console.log("Updating news...")
    await refreshLiveNews()
  }

  //Set timer for 10 minutes, to check if anything needs to be updated
  setTimeout( ()=>{
    handleDBupdates()
  },600000)
  
}

init()
