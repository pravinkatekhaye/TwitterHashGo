/*description :This factory  the retrive the favorite hashtags array*/
angular.module("twitterApp").factory('favoriteHashtagservice', function () {
    var favHashTagList = [];
    if (typeof(Storage) !== "undefined") {
        favHashTagList = localStorage.getItem("favTagList");        //favTagList is a key to get array from localstorage
        if(favHashTagList === 'undefined' ||favHashTagList === null) {
            favHashTagList=[];
        }
        else {
            favHashTagList = favHashTagList.split(",");
        }
    }
    return { favriteHashTagList:favHashTagList };      //return array of favorite  hashtag List
});
