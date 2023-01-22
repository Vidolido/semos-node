const statistika = require("./functions");

const fs = require("fs");

(async () => {
    try {
        let blogRes = await fetch('https://jsonplaceholder.typicode.com/posts');
        let blogData = await blogRes.json();

        // podatocite koi vi se potrebni za rabota se smesteni vo blogData
        const stats = statistika(blogData);

        const allSame = (users) => {
            let firstUser = users[0][1];
            // console.log(firstUser)
            return !users.find(user => user[1] !== firstUser) && true;
        }
        console.log('Check if all users have same amount of posts: ', allSame(Object.entries(stats)));

        console.log(Object.entries(stats).sort(function(a, b){return a[0] - b[0]})[0], 'Lowest value'); // ovdeka izbrav da se sortiraat po key za da vidam dali raboti sort funkcijata 
        console.log(Object.entries(stats).sort(function(a, b){return b[0] - a[0]})[0], 'Highest value');


        // Wrighting to files
        fs.writeFile('statistika.txt',JSON.stringify(stats), (err) => {
            if (err) {
                console.log("ERROR: ", err);
            }
        });

    } catch (err) {
        console.log(err);
    }
})();