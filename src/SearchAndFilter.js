class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits, keyword) {
    let filtered = []
    if(minimumCredits === "")
      minimumCredits = 1;
    if(maximumCredits === "")
      maximumCredits = 5;
    if(subject !== "All"){
      for(let i = 0; i < courses.length; i++){
        if(courses[i].subject === subject){
          filtered.push(courses[i])
        }
      }
    } else {
      filtered = courses;
    }
    if(minimumCredits !== "" || maximumCredits !== ""){
      let creditFilter = []
      for(let i = 0; i < filtered.length; i++){
        let credits = filtered[i].credits
        if(credits >= minimumCredits && credits <= maximumCredits){
          creditFilter.push(filtered[i])
        }
      }
      filtered = creditFilter
    }
    if(search !== ""){
      let searchFilter = []
      for(let i = 0; i < filtered.length; i++){
        for(let n = 0; n < filtered[i].keywords.length; n++){
          if(filtered[i].keywords[n].includes(search)){
            searchFilter.push(filtered[i])
            break;
          }
        }
      }
      filtered = searchFilter
    }
    if(keyword !== "All"){
      let keywordFiltered = []
      for(let i = 0; i < filtered.length; i++){
        if(filtered[i].keywords.indexOf(keyword) !== -1){
          keywordFiltered.push(filtered[i])
        }
      }
      filtered = keywordFiltered;
    }
    return filtered;
  }
}

export default SearchAndFilter;
