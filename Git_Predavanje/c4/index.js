// fs filesystem module
const fs = require("fs");

// primer za zapishuvanje vo datoteka
fs.writeFile("iminja.txt", "Petko, Stanko", (err) => {
    if (err) {
        console.log("ERROR: ", err);
    }
});

let promiseExample = new Promise(function (resolve, reject) {
    // executor - kodot shto proizveduva nesto, "artistot"
});

// resolve(value)
// reject(error)

// interni svojstva na promise objektot
// - state (pending, fulfilled, rejected)
// - result (undefined, value, error)

let promise = new Promise(function (resolve, reject) {
    // se izvrshuva avtomatski
    console.log("executor zapochnuva so rabota...");
    setTimeout(() => {
        resolve("done");
        console.log("uspeshna operacija!");
    }, 3000);

    // setTimeout(() => {
    //     reject(new Error("GRESHHKA!"));
    //     console.log("neuspeshna operacija!");
    // }, 3000);
});

// .then()
// .catch()
// .finally()

let p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), 3000);
    // setTimeout(() => reject(new Error("GRESHKA!")), 3000);
});

// resolve
p.then((result) => { console.log("OK1"); });
// p.then((result) => { console.log("OK2"); });
// p.then((result) => { console.log("OK3"); });
// p.then((result) => { console.log("OK4"); });

// reject
// p.then(null, (err) => { console.log("err from then"); });
p.catch(err => { console.log("err"); });

// finally
// p.then(f, f);
p.finally();


const fileWrite = (filename, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

// promise chaining
fileWrite("ocenki.txt", "2, 4, 5, 1, 4, 3, 5, 4")
    .then(() => { // then == success
        console.log("success 1");
        return fileWrite("boi.txt", "bela, crna, zholta");
    }).then(() => {
        console.log("success 2");
        return fileWrite("boi2.txt", "crvena, zelena, plava");
    }).then(() => {
        console.log("success 3");
    }).catch(err => { // catch == fail
        console.log(err);
    });

// povekje habndleri za eden promise
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 3000);
});

p1.then((result) => {
    console.log(result)
    return result * 2;
});

p1.then((result) => {
    console.log(result)
    return result * 2;
});

p1.then((result) => {
    console.log(result)
    return result * 2;
});

// async/await

async function f() {
    return 1;
}

f().then(console.log("async f()"));

async function ff() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Result from async ff(): done!");
        }, 1000);
    });

    let result = await promise;

    console.log(result);
}

ff();

const main = async () => {
    try {
        await fileWrite("fajl1.txt", "file one!");
        await fileWrite("fajl12.txt", "file two!");
        await fileWrite("fajl3.txt", "file three!");
    } catch (err) {
        console.log(err);
    }
};
main();


const fileRead = (filename) => {
    return new Promise((success, fail) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                return fail(err)
            }
            return success(data);
        })
    });
};

(async () => {
    try {
        let boi = await fileRead("boi.txt");
        console.log("BOI: ", boi);
    } catch (err) {
        console.log(err)
    }
})();

let imenik = [
    { ime: "Pero Perovski", telefon: 123456 },
    { ime: "Janko Jankovski", telefon: 435216 },
    { ime: "Darko Darkovski", telefon: 5335674 },
];

(async () => {
    try {
        let imenikData = JSON.stringify(imenik);
        console.log(imenikData);
        await fileWrite("imenik.txt", imenikData);
        let dataString = await fileRead("imenik.txt");
        let data = JSON.parse(dataString);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})();