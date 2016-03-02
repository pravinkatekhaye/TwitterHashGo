//HomeController.js

//This controllers brigs you the top trending hashtags and also enables filtering based on cities
(function () {

    angular.module('twitterApp')
        .controller('TopTrendController',['$scope','$q','$location','$route','twitterService','favoriteHashtagservice',
            function ($scope,$q,$location,$route,twitterService,favoriteHashtagservice) {

            $scope.tweets = [];
            $scope.relatedtweets = [];      //array of related tweets
            $scope.userprofilepic = [];     //array of user profile pic url
            $scope.userscreen_name = [];    //array of user screen name
            $scope.favoriteHashTag = [];    //array of favorite hashtag
            $scope.retweetcount = [];       //array of retweet count
            $scope.likedtweetcount = [];    //array of like tweets
            $scope.tweetsId = [];           //array of tweetsId
            $scope.citiesList = [];         //arr of citiesList

            twitterService.initialize();

            $scope.changedplaceValue = "World";
            $scope.response = 1;
            $scope.loaderflag = 0;
            $scope.errorflag = 0;
			$scope.errorflagforplace = 0;

                /**
                 * @name refreshTimeline
                 * @desc getting top trend by inputing woeid of city
                 * @param woeid
                 * @returns
                 */
                $scope.refreshTimeline = function (woeid) {
                $scope.tweets.splice(0,$scope.tweets.length);
                twitterService.getLatestTrends(woeid).then(function (data) {
                    $scope.loaderflag = 1;
                    for (i = 0; i <data[0].trends.length;i++) {
                        $scope.tweets[i] = data[0].trends[i].name;
                    }
                }).catch(function (e) {
                   $scope.errorflag = 1;
                })

            }
            
			$scope.favoriteHashTag = favoriteHashtagservice.favriteHashTagList;
            for(var i = 0;i<favoriteHashtagservice.favriteHashTagList.length;i++){
            }
                /**
                 * @name homePageTimeline
                 * @desc retrives the time line components such as likes,related tweets,also no of likes and user ids which comments on a particular tweets
                 * @param
                 * @returns
                 */
            $scope.homePageTimeline = function () {
                $scope.selectedahashtag="Tweets";
                $scope.relatedtweets.splice(0, $scope.relatedtweets.length);
                $scope.userprofilepic.splice(0,$scope.userprofilepic.length);
                $scope.userscreen_name.splice(0,$scope.userscreen_name);
                $scope.retweetcount.splice(0,$scope.retweetcount);
                $scope.likedtweetcount.splice(0,$scope.likedtweetcount);
                $scope.tweetsId.splice(0, $scope.tweetsId);
                twitterService.getHomeTimelineTweets().then(function (data) {
                    for(var i = 0;i<data.length;i++){
                        $scope.relatedtweets[i] = data[i].text;
                        $scope.userprofilepic[i] = data[i].user.profile_image_url;
                        $scope.userscreen_name[i] = data[i].user.screen_name;
                        $scope.retweetcount[i] = data[i].retweet_count;
                        $scope.likedtweetcount[i] = data[i].favorite_count;
                        $scope.tweetsId[i] = data[i].id_str;
                    }

                });
            }
                /**
                 * @name requestForLike
                 * @desc to like particular tweets by inputing tweets id
                 * @param id
                 * @returns
                 */
            $scope.requestForLike = function (id) {
                twitterService.requestForLikeTweet(id).then(function (data) {
                   $route.reload("/trend");
                });
            }
                /**
                 * @name changemodel
                 * @desc open popup page to change the trend location
                 * @param id
                 * @returns
                 */
            $scope.changemodel = function (location) {
                $scope.location = location;

            }

                /**
                 * @name changeTrendLocation
                 * @desc Filters the display of top trends based on cities of india
                 * @param id
                 * @returns
                 */
            $scope.changeTrendLocation = function (location) {
                var flag = 0;
                    if (location) {
						var changelocation = location.substring (0,1).toUpperCase()+location.substring(1);
						twitterService.getwoeidOfPlace(changelocation).then(function (data) {
                            for (var i = 300; i < 400; i++) {
                                if (data[i].name.trim() === changelocation.trim()) {
                                    $scope.changedplaceValue=changelocation.trim();
                                    $scope.refreshTimeline(data[i].woeid);
                                    flag=1;
                                    break;
                                }
                            }
                            if(!flag)
                            {
                              $scope.errorflagforplace=1;
                            }
                        });
                    }
                    else{
                        $scope.errorflagforplace=1;
                    }
            };
                /**
                 * @name getHashTagDetail
                 * @desc retrives tweets detail accoording inputed keyword
                 * @param hashtag
                 * @returns
                 */
            $scope.getHashTagDetail = function (hashtag) {
                $scope.relatedtweets.splice(0, $scope.relatedtweets.length);
                $scope.userprofilepic.splice(0,$scope.userprofilepic.length);
                $scope.userscreen_name.splice(0,$scope.userscreen_name);
                $scope.retweetcount.splice(0,$scope.retweetcount);
                $scope.likedtweetcount.splice(0,$scope.likedtweetcount);
                $scope.tweetsId.splice(0, $scope.tweetsId);


                $scope.selectedahashtag = hashtag;
                     $scope.response = 1;
                     twitterService.getRelatedTweetsOfHashtag(hashtag).then(function (data) {
                         if (data.statuses.length === 0) {
                             $scope.response = 0;
                         }
                         else {
                             $scope.response = 1;
                         }
                         for (var i = 0; i < data.statuses.length; i++) {
                             $scope.relatedtweets[i] = data.statuses[i].text;
                             $scope.userprofilepic[i] = data.statuses[i].user.profile_image_url;
                             $scope.userscreen_name[i] = data.statuses[i].user.screen_name;
                             $scope.retweetcount[i] = data.statuses[i].retweet_count;
                             $scope.likedtweetcount[i] = data.statuses[i].favorite_count;
                             $scope.tweetsId[i] = data.statuses[i].id_str;
                         }
                     });
                 }

                /**
                 * @name getTweetsDetail
                 * @desc gettweets detail by inputing selectedhashtag
                 * @param hashtag
                 * @returns
                 */
                 $scope.getTweetsDetail = function (trendlocation) {
                    if(trendlocation) {
                        $scope.response = 1;
                        $scope.getHashTagDetail(trendlocation);
                    }else{
                        $scope.response = 0;
                    }
                }
                    /**
                 * @name getCityName
                 * @desc get cities name from india through twitter available trends api
                 * @param hashtag
                 * @returns
                 */
                $scope.getCityName = function () {
                twitterService.getwoeidOfPlace(location).then(function(data) {
                    for(var i = 300;i<400;i++) {
                        $scope.citiesList[i] = data[i].name.trim();
                    }
                });
            }
                var List=[];
                List=favoriteHashtagservice.favriteHashTagList;
                /**
                 * @name setFavoriteHashTagList
                 * @desc store selected favorite hashtag in localstorage
                 * @param hashtag
                 * @returns
                 */
                $scope.setFavoriteHashTagList=function(hashtag){
                    var flag=true;
                    List.push(hashtag);
                    localStorage.setItem("favTagList",List);
                }
                /**
                 * @name appliedClass
                 * @desc return class name if particular hashtag alredy mark as favorite then it will retun selectedFavTag class for them
                 * @param trends name
                 * @returns class
                 */
                $scope.appliedClass= function(trends) {
                    for (i = 0; i < 15; i++) {
                        if (trends.trim() == List[i]) {
                            return 'selectedFavTag';
                        }
                    }
                }
                /**
                 * @name changePlace
                 * @desc function helps to open model popup box
                 * @param
                 * @returns
                 */
            $scope.changePlace = function () {
                $("#myModal").modal('show');
            }

            $scope.favoritehashtag = function () {
                $location.path("/favoritehashtag");
            }

             $scope.redirectToHome = function () {
                $location.path("/home");
            }

            $scope.redirectToTopTrend = function(){
                $location.path("/trend");
            }
            $scope.redirectToFavoriteHashtag = function () {
                $location.path("/favoritehashtag");
            }
            $ ( document ).ready(function () {
                $scope.refreshTimeline ();
                $scope.homePageTimeline ();
                $scope.getCityName ();
            });
        }])
})();