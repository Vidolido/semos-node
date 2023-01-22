const fs = require("fs");

// funkcija za chitanje na datoteka
const fileRead = (filename) => {
    return new Promise((success, fail) => { // resolve, reject
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                return fail(err);
            }

            return success(data);
        });
    });
};

(async () => {
    try {
        // vchituvanje na datoteka studenti.json
        let dataString = await fileRead("studenti.json");

        // konverzija od string vo JSObject
        let studenti = JSON.parse(dataString);

        // log
        console.log(studenti);

        // Math.max(arg1, arg2, ..., argN);
        // Object.assign(dest, sr1, ..., srcN)

        // ...

        // primer za rest
        const f1 = (a, b) => {
            return a + b;
        };
        console.log(f1(3, 4/*, 6, 7, 8*/));

        // da gi vklucime kako arg na funkcijata
        const f1All = (a, b, ...args) => {
            return a + b;
        };
        console.log(f1All(3, 4, 6, 7, 8));

        // ili
        const f1All1 = (...args) => {
            let sum = 0;
            for (let arg of args) {
                sum += arg;
            }
            return sum;
        };
        console.log(f1All1(3, 4, 6, 7, 8));

        function argObj() {
            console.log(arguments[0]);
            console.log(arguments[1]);
            console.log(arguments[2]);
            console.log(arguments[3]); // undefined
        }
        argObj(1, 2, "test");

        // primer za spread
        console.log(Math.max(3, 7, 1));

        // niza od parametri
        let ar = [3, 7, 5];
        console.log(Math.max(...ar));

        // mozhe da se isprata povekje nizi
        let ar1 = [2, 4, 10];
        console.log(Math.max(...ar, ...ar1));

        // mozhe da se kombinira so povekje vrednosti
        console.log(Math.max(1, ...ar, ...ar1, 11));

        // mozhe da se koristi za da spoime povekje nizi
        let armerge = [ar, ar1];
        console.log(armerge);
        let armerge1 = [...ar, ...ar1];
        console.log(armerge1);

        // konverzija na string vo niza od karakteri
        let s1 = "Zdravo!";
        console.log([...s1]);

        // kopiranje na niza
        let arOrig = [1, 2, 3];
        let arCopy = [...arOrig];
        console.log(JSON.stringify(arOrig) === JSON.stringify(arCopy)); // true
        console.log(arOrig === arCopy); // false

        // kopiranje na objekti
        let obOrig = { a: 1, b: 2, c: 3 };
        let obCopy = { ...obOrig };
        console.log(JSON.stringify(obOrig) === JSON.stringify(obCopy)); // true
        console.log(obOrig === obCopy); // false

        // metodi za operacii so nizi

        // metodi za dodavanje/brishenje elementi
        // pop, shift, push, unshift, splice, slice, concat

        // prebaruvanje na elementi
        // indexOf, lastIndexOf, includes, find, filter, findIndex

        // iteracija 
        // forEach

        // transformacija
        // map, sort, reverse, slit, join, reduce

        let sortProsek = [...studenti.sort((a, b) => {
            if (a.prosek > b.prosek) {
                return -1;
            }
            else if (a.prosek < b.prosek) {
                return 1;
            }
            return 0;
        })];

        let sortIme = [...studenti.sort((a, b) => {
            if (a.ime < b.ime) {
                return -1;
            }
            else if (a.ime > b.ime) {
                return 1;
            }
            return 0;
        })];

        // najvisok prosek
        let najvisokProsek = sortProsek[0];

        // najniskiot prosek
        let najnizokProsek = sortProsek[sortProsek.length - 1];

        // reduce
        let sredenProsek = studenti.reduce((acc, mom) => {
            return acc + mom.prosek;
        }, 0);

        let gradovi = {}; // {"Los Angeles" : 8.2, "New York": 9.1}

        for (let s of studenti) {
            if (!gradovi[s.grad]) {
                gradovi[s.grad] = s.prosek;
            }
            else {
                gradovi[s.grad] = (gradovi[s.grad] + s.prosek) / 2;
            }
        }

        let gradoviNiza = []; // [{grad: "Los Angeles", prosek: 8.2}, {...}, {...}]

        for (let c in gradovi) {
            gradoviNiza.push({
                grad: c,
                prosek: gradovi[c]
            });
        }

        // sort na gradovi po prosk
        gradoviNiza.sort((a, b) => {
            if (a.prosek > b.prosek) {
                return -1;
            }
            else if (a.prosek < b.prosek) {
                return 1;
            }
            return 0;
        });

        // rezultati
        console.log(sortProsek);
        console.log(sortIme);
        console.log(najvisokProsek);
        console.log(najnizokProsek);
        console.log(sredenProsek / studenti.length);
        console.log(gradoviNiza);
        console.log(gradoviNiza[0]);
        console.log(gradoviNiza[gradoviNiza.length - 1]);

    } catch (err) {
        console.log(err);
    }
})();

// Zadacha za doma
// 1. Iskoristete go kodot vo client.js skriptata za da gi prevzemete podatocite koi vi se potrebni za rabota, i:
// * presmetajte kolku objavi ima sekoj korisnik poedinechno i zapishete go rezultatot sortiran vo opagjachki redosled vo datoteka statistika.txt vo format: "
                                                                                                            // Korisnik: idKorisnik1 | Broj na objavi: brojNaObjavi1
                                                                                                            // Korisnik: idKorisnik2 | Broj na objavi: brojNaObjavi2
                                                                                                            // Korisnik: idKorisnik3 | Broj na objavi: brojNaObjavi3
                                                                                                                            // ...
                                                                                                                            // ...
                                                                                                                            // ...
                                                                                                                            // Korisnik: idKorisnikN | Broj na objavi: brojNaObjaviN
                                                                                                                            // "
// * pronajdete go korisnikot koj ima najmnogu objavi i zapishete go rezultatot vo datoteka najmnogu.txt vo format: "Korisnik so najmnogu objavi: idKorisnik"
// * pronajdete go korisnikot koj ima najmalku objavi i zapishete go rezultatot vo datoteka najmalku.txt vo format: "Korisnik so najmalku objavi: idKorisnik"
// * pronajdete go korisnikot koj ima najdolga objava i zapishete go rezultatot vo datoteka najdolga.txt vo format: "Korisnik so najdolga objava: idKorisnik | Sodzhina na objavata: sodzhinaNaObjavata"
// * pronajdete go korisnikot koj ima najkratka objava i zapishete go rezultatot vo datoteka najkratka.txt vo format: "Korisnik so najkratka objava: idKorisnik | Sodzhina na objavata: sodzhinaNaObjavata"
// * presmetajte go vkupniot broj na objavi i zapishete go rezultatot vo datoteka vkupno.txt vo format: "Vkupen broj na objavi: brojNaObjavi"
// * ispechatete ja vo konzola sodrzhinata na datotekata statistika.txt
//
// ZABELESHKA:
// * Site operacii za chitanje/zapishuvanje/presmetuvanje treba da se izvrshuvaat asinhrono.