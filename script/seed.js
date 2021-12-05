const { db, User, News } = require("../server/db/index");
const getNewsFromApi = require("../server/db/rapidApi/currentNews");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables`
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody@gmail.com",
      password: "123",
      isAdmin: true,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "murphy@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/50.jpg",
    }),
    User.create({
      username: "Mathilde@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/65.jpg",
    }),
    User.create({
      username: "Jaleel@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/55.jpg",
    }),
    User.create({
      username: "Jarrett@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/60.jpg",
    }),
    User.create({
      username: "Asia@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/60.jpg",
    }),
    User.create({
      username: "Helene@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/70.jpg",
    }),
    User.create({
      username: "Krystina@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/40.jpg",
    }),
    User.create({
      username: "Bernard@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/30.jpg",
    }),
    User.create({
      username: "Destiney@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/72.jpg",
    }),
    User.create({
      username: "Alvah@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/73.jpg",
    }),
    User.create({
      username: "Myriam@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/43.jpg",
    }),
  ]);


  
  const apiData = await getNewsFromApi();

  await News.create({
    category: "AllNews",
    data: JSON.stringify(apiData),
    testField: "Test"
  });

}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
    Execute the `seed` function, IF we ran this module directly (`node seed`).
    `Async` functions always return a promise, so we can use `catch` to handle
    any errors that might occur inside of `seed`.
  */
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
