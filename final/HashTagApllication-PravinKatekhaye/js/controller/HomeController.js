//HomeController.js

/* this getter syntax makes code more readable.
   This controller MAintains the home page,get latest tweets from your timeLines and also looks after the routing from home to other tabs */

(function () {

    angular.module('twitterApp')
        .controller('HomeController',['$scope','$location','$route','twitterService',function ($scope,$location,$route,twitterService) {
            $scope.profilepic = "";   //
			$scope.username = "";         //
            $scope.relatedtweets = [];      //array of related tweets
            $scope.userprofilepic = [];     //array of user profile pic url
            $scope.userscreen_name = [];    //array of user screen name
            $scope.favoriteHashTag = [];    //array of favorite hashtag
            $scope.retweetcount = [];       //array of retweet count
            $scope.tweets = [];            //array of trending hashtag
            $scope.likedtweetcount = [];    //array of like tweets count
            $scope.tweetsId = [];           //array of unique tweetsId helpfull to like particular tweet
            $scope.citiesList = [];         //array of citiesList given by twitter woeid available place/trend api
            $scope.response = 1;           //set flag to to check response if response is null then it helpfull to give error message based on response

            twitterService.initialize();  //initialize twitter

            $scope.loaderflag = 1;
            $scope.errorflag = 0;


            /**
             * @name homePageTimeline
             * @desc retrives the time line components such as likes,related tweets,also no of likes and user ids and also the comments related to particular tweets
             * @param
             * @returns
             */
            $scope.homePageTimeline = function () {
                        $scope.selectedahashtag =" Timeline Tweets";   ///to show which search string on bar
                        $scope.relatedtweets.splice(0, $scope.relatedtweets.length);
                        $scope.userprofilepic.splice(0,$scope.userprofilepic.length);
                        $scope.userscreen_name.splice(0,$scope.userscreen_name);
                        $scope.retweetcount.splice(0,$scope.retweetcount);
                        $scope.likedtweetcount.splice(0,$scope.likedtweetcount);
                        $scope.tweetsId.splice(0, $scope.tweetsId);

                twitterService.getHomeTimelineTweets().then(function (data) {
                      $scope.loaderflag = 0;
                     for(var i = 0;i<data.length;i++){
                        $scope.relatedtweets[i] = data[i].text;
                        $scope.userprofilepic[i] = data[i].user.profile_image_url;
                        $scope.userscreen_name[i] = data[i].user.screen_name;
                        $scope.retweetcount[i] = data[i].retweet_count;
                        $scope.likedtweetcount[i] = data[i].favorite_count;
                        $scope.tweetsId[i] = data[i].id_str;
                    }
                }).catch(function (e) {
                        $scope.errorflag = 1;
                        $scope.loaderflag = 0;
                });
              }

            /**
             * @name getHashTagDetail
             * @desc retrives tweets detail according to input keywords
             * @param hashtag
             * @returns
             */
			  $scope.getHashTagDetail = function (hashtag) {
                        $scope.selectedahashtag = hashtag;
                        $scope.relatedtweets.splice(0, $scope.relatedtweets.length);
                        $scope.userprofilepic.splice(0,$scope.userprofilepic.length);
                        $scope.userscreen_name.splice(0,$scope.userscreen_name);
                        $scope.retweetcount.splice(0,$scope.retweetcount);
                        $scope.likedtweetcount.splice(0,$scope.likedtweetcount);
                        $scope.tweetsId.splice(0, $scope.tweetsId);

                        twitterService.getRelatedTweetsOfHashtag(hashtag).then(function (data) {
                            for(var i = 0;i<data.statuses.length;i++){
                            if(data.statuses.length===0)
                            {
                                $scope.response = 0;
                            }
                            else{
                                $scope.response = 1;
                            }
                            $scope.errorflag = 0;
                        $scope.relatedtweets[i] = data.statuses[i].text;
                        $scope.userprofilepic[i] = data.statuses[i].user.profile_image_url;
                        $scope.userscreen_name[i] = data.statuses[i].user.screen_name;
                        $scope.retweetcount[i] = data.statuses[i].retweet_count;
                        $scope.likedtweetcount[i] = data.statuses[i].favorite_count;
                        $scope.tweetsId[i] = data.statuses[i].id;
                        }
                       }).catch(function (e) {
                           console.log("Exception occure while fetching home timeline............");
                           $scope.errorflag = 1;
                        });
                   }

            /**
             * @name getTweetsDetail
             * @desc get tweets details by inputing selected hashtag
             * @param hashtag
             * @returns
             */
            $scope.getTweetsDetail = function (hashtag) {
                if(hashtag) {
                    $scope.response = 1;
                    $scope.getHashTagDetail(hashtag);
                } else {
                    $scope.response = 0;
                }
            }

            /**
             * @name requestForLike
             * @desc to like particular tweets by inputing tweets id
             * @param id
             * @returns
             */
            $scope.requestForLike = function (id) {
                twitterService.requestForLikeTweet (id).then(function (data) {
                    $route.reload ();
                });   
             }

            /**
             * @name getuserProfileDetail
             * @desc to get profile details like user name and profile picture.
             * @param
             * @returns
             */
            $scope.getUserProfileDetail = function () {
                twitterService.getuserProfileDetail().then(function (data) {
                    $scope.profilepic = data.profile_image_url;
                    $scope.username = data.name;
				});
             }
            /**
             * @name redirectToHome
             * @desc
             * @param
             * @returns
             */
            $scope.redirectToHome = function () {
                $location.path ("/home");
             }
            /**
             * @name redirectToTopTrend
             * @desc
             * @param
             * @returns
             */

            $scope.redirectToTopTrend = function () {
                $location.path ("/trend");
            }
            /**
             * @name redirectToFavoriteHashtag
             * @desc
             * @param
             * @returns
             */
            $scope.redirectToFavoriteHashtag = function () {
                $location.path ("/favoritehashtag");
            }
          /* on document load it call homepagetimeline  */
            $( document ).ready(function () {
                $scope.homePageTimeline ();
                $scope.getUserProfileDetail ();
            });

        }]);
})();