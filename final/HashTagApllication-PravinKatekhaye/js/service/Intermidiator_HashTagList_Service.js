/**
 * Created by pravin.katekhaye on 2/29/2016.
 */



angular.module("twitterApp").factory('Intermidiator_HashTagList_Service', function () {
    var favriteHashTagList = [];

    var getFavriteHashTagList=function(){

        return favriteHashTagList;
    };

    var setFavriteHashTagList=function(tagList){
        favriteHashTagList = tagList;
    };

    return{
        getFavriteHashTagList : getFavriteHashTagList,
        setFavriteHashTagList : setFavriteHashTagList
    }

 //return array of favorite  hashtag List
});


