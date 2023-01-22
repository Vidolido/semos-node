
module.exports = statistika = (blogPosts) => {
    let countedNames = blogPosts.reduce((allNames, name) => {
        if (name.userId in allNames) {
          allNames[name.userId]++
        }
        else {
          allNames[name.userId] = 1
        }
        return allNames
      }, {});
      return countedNames

}
