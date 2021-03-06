const sql = require("../services/mysql");
const path = require("path");

// Just to setup the DB
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
var mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
});
const promisePool = pool.promise();

(async (_) => {
  try {
    await promisePool.query(`DROP DATABASE IF EXISTS VisaCurbside;`);
    await promisePool.query(`CREATE DATABASE VisaCurbside;`);
    // DB is setup now, so we can connect to it directly
    await sql.query(`DROP TABLE IF EXISTS Users;`);
    await sql.query(`
      CREATE TABLE Users(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `);
    await sql.query(`
      CREATE TABLE Stores(
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        merchantID VARCHAR(255),
        merchantName VARCHAR(255),
        description MEDIUMTEXT NOT NULL,
        location MEDIUMTEXT NOT NULL,
        imageURL MEDIUMTEXT,
        logoURL MEDIUMTEXT,
        openTime TIME,
        closeTime TIME,
        parkingDetails MEDIUMTEXT
      );
    `);

    await sql.query(`
      INSERT INTO Stores(id, name, merchantID, merchantName, description, location, openTime, closeTime, parkingDetails, imageURL) 
      VALUES(1, "Publix in Tampa", "asd87870dd", "Publix", "this store sells food", "123 Publix Tampa Dr, USA", "08:00", "21:30", "There is a parking garage behind the store. The 2nd floor is for customer use with a 30 minute free parking limit", "https://media2.fdncms.com/orlando/imager/u/original/27243881/publix-1000-b.jpg");
    `);
    await sql.query(`
      INSERT INTO Stores(id, name, merchantID, merchantName, description, location, imageURL) 
      VALUES(2, "Target Atlantic Station", "SID1", "Target", "food and home stuff", "Atlantic Station Dr, Atlanta, GA", "https://media2.fdncms.com/orlando/imager/u/original/27243881/publix-1000-b.jpg");
    `);
    await sql.query(`
    INSERT INTO Stores(id, name, merchantID, merchantName, description, location, openTime, closeTime, parkingDetails, imageURL, logoURL) 
    VALUES(3, "Uncle Ray's Hardware Store", "0001", "Uncle Ray's Hardware Store", "Corner hardware store", "450 State st, Atlanta, GA", "08:00", "21:30", "There is parking behind the store", "https://media2.fdncms.com/orlando/imager/u/original/27243881/publix-1000-b.jpg", "https://firebasestorage.googleapis.com/v0/b/visa-curbside.appspot.com/o/logos%2FhardwareStore.png?alt=media&token=a7492029-8ad0-4158-bbd9-38147092a68b");
  `);
  await sql.query(`
    INSERT INTO Stores(id, name, merchantID, merchantName, description, location, openTime, closeTime, parkingDetails, imageURL, logoURL) 
    VALUES(4, "Bloom Flower Store", "0002", "Bloom Flower Store", "Traditional flower arrangements", "120 Hemphill Av, Atlanta, GA", "08:00", "21:30", "There is parking behind the store", "https://media2.fdncms.com/orlando/imager/u/original/27243881/publix-1000-b.jpg", "https://firebasestorage.googleapis.com/v0/b/visa-curbside.appspot.com/o/logos%2FflowerStore.png?alt=media&token=8692b73b-50f7-4c2b-a8c6-7e5100006009");
  `);
    await sql.query(`
      CREATE TABLE Items(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        price DOUBLE NOT NULL,
        description MEDIUMTEXT NOT NULL,
        imageURL MEDIUMTEXT,
        storeID INT NOT NULL,
        FOREIGN KEY (storeID) REFERENCES Stores(id)
      );
    `);
    await sql.query(`
      INSERT INTO Items(name, price, description, imageURL, storeID)
      VALUES("Ketchup", 2.99, "32 oz glass bottle", "https://images-na.ssl-images-amazon.com/images/I/8199Xb1cVdL._SL1500_.jpg", 1);
    `);
    await sql.query(`
      INSERT INTO Items(name, price, description, imageURL, storeID)
      VALUES("Mayo", 1.99, "24 oz plastic bottle", "https://images.heb.com/is/image/HEBGrocery/000143819", 1);
    `);
    await sql.query(`
      INSERT INTO Items(name, price, description, imageURL, storeID)
      VALUES("Mustard", 3.99, "6 oz metal bottle", "https://target.scene7.com/is/image/Target/GUEST_2ce6d6ff-cb12-4f89-b433-35dd2079d3ba?wid=488&hei=488&fmt=pjpeg", 1);
    `);
    await sql.query(`
    INSERT INTO Items(name, price, description, imageURL, storeID) VALUE("Tuna", 0.99, "Blue fin tuna can", "https://i5.walmartimages.com/asr/8876b816-9bfe-44dc-9219-8e76239ecacc_2.3f053cfbc39f59ba5b88fc406c9c7e20.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff", 2);
    `);
    await sql.query(`
    INSERT INTO Items(name, price, description, imageURL, storeID) VALUE("Coca Cola", 0.99, "Soda Bottle", "https://www.mancunianfoods.com/wp-content/uploads/2019/04/1.25-coke-bottle.jpg", 2);
    `);
    await sql.query(`
    INSERT INTO Items(name, price, description, imageURL, storeID) VALUE("Tuna", 0.99, "Blue fin tuna can", "https://i5.walmartimages.com/asr/8876b816-9bfe-44dc-9219-8e76239ecacc_2.3f053cfbc39f59ba5b88fc406c9c7e20.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff", 1);
    `);
    await sql.query(`
    INSERT INTO Items(name, price, description, imageURL, storeID) VALUE("Coca Cola", 0.99, "Soda Can", "https://www.mancunianfoods.com/wp-content/uploads/2019/04/1.25-coke-bottle.jpg", 1);
    `);
    await sql.query(`
    INSERT INTO Items(name, price, description, imageURL, storeID) VALUE("Corn", 1.29, "Yellow Corn", "https://target.scene7.com/is/image/Target/GUEST_ca829045-cb99-4481-b4fe-89b8ca0d61b7?wid=488&hei=488&fmt=pjpeg", 1);
    `);
    await sql.query(`
    INSERT INTO Items(name, price, description, imageURL, storeID) VALUE("Gum", 0.99, "Chewing Gum", "https://miro.medium.com/max/1024/1*oVqRbwsUDBgV8c6NF965gw.jpeg", 1);
    `);
    
    
    await sql.query(`
      CREATE TABLE Orders(
        id INT PRIMARY KEY AUTO_INCREMENT,
        shopperID VARCHAR(255) NOT NULL,
        storeID VARCHAR(255) NOT NULL,
        isPending BOOL NOT NULL,
        isReadyForPickup BOOL NOT NULL, 
        time TIMESTAMP NOT NULL,
        FOREIGN KEY (shopperID) REFERENCES Users(id),
        coordinates VARCHAR(255)
      );
    `);
    await sql.query(`
      CREATE TABLE OrderedItems(
        id INT PRIMARY KEY AUTO_INCREMENT,
        itemID INT NOT NULL,
        orderID INT NOT NULL,
        shopperID VARCHAR(255) NOT NULL,
        FOREIGN KEY (orderID) REFERENCES Orders(id),
        FOREIGN KEY (shopperID) REFERENCES Users(id)
      );
    `);
  } catch (e) {
    console.log(e);
  } finally {
    process.exit(0);
  }
})();
