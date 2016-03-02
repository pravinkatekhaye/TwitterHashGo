/**
 * Created by pravin.katekhaye on 2/24/2016.
 *description :
                Following controller maintains the show favorite Hashtags and retrives the tweets releated to them */
(function () {

    angular.module('twitterApp')
        .controller('FavoriteHashTagController',['$scope','$q','$location','$route','twitterService','favoriteHashtagservice',
            function($scope,$q,$location,$route,twitterService,favoriteHashtagservice) {

                $scope.relatedtweets = [];      //array of related tweets
                $scope.userprofilepic = [];     //array of user profile pic url
                $scope.userscreen_name = [];    //array of user screen name
                $scope.favoriteHashTag = [];    //array of favorite hashtag
                $scope.retweetcount = [];       //array of retweet count
                $scope.likedtweetcount = [];    //array of like tweets
                $scope.tweets = [];              //array of top trends hashtag
                $scope.tweetsId = [];           //array of tweetsId
                $scope.citiesList = [];         //arr of citiesList
                $scope.completeHasTaglist=[];    // array of complete favorite hashtag list
                
				
				twitterService.initialize();
                $scope.response = 1;   //flag to check resopnse
                $scope.favoriteHashTag = favoriteHashtagservice.favriteHashTagList;   //containe favorite hashtag list comes from localstorage
                 //containe favorite hashtag list comes from top trendcontroller
                $scope.completeHasTaglist = $scope.favoriteHashTag;
                /**
                 * @name getHashTagDetail
                 * @desc retrives tweets detail accoording inputed keyword
                 * @param hashtag
                 * @returns
                 */
                $scope.getHashTagDetail = function (hashtag) {
                      $scope.selectedahashtag = hashtag;
                      $scope.relatedtweets.splice(0, $scope.relatedtweets.length);
                      $scope.userprofilepic.splice(0, $scope.userprofilepic.length);
                      $scope.userscreen_name.splice(0, $scope.userscreen_name);
                      $scope.retweetcount.splice(0, $scope.retweetcount);
                      $scope.likedtweetcount.splice(0, $scope.likedtweetcount);
                      $scope.tweetsId.splice(0, $scope.tweetsId);
					  
                      twitterService.getRelatedTweetsOfHashtag(hashtag).then(function (data) {
                         $scope.response = 1;
                         if(data.statuses.length===0)
                         {
                             $scope.response = 0;
                         }
                         else{
                             $scope.response = 1;
                         }
                            for (var i = 0; i < data.statuses.length; i++) {
                             $scope.relatedtweets[i] = data.statuses[i].text;
                             $scope.userprofilepic[i] = data.statuses[i].user.profile_image_url;
                             $scope.userscreen_name[i] = data.statuses[i].user.screen_name;
                             $scope.retweetcount[i] = data.statuses[i].retweet_count;
                             $scope.likedtweetcount[i] = data.statuses[i].favorite_count;
                             $scope.tweetsId[i] = data.statuses[i].id;
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
                        console.log("request for like sucessfully submitted");
                });
             }
                /**
                 * @name getTweetsDetail
                 * @desc gettweets detail by inputing selectedhashtag
                 * @param hashtag
                 * @returns
                 */
                    $scope.getTweetsDetail = function() {
                       if($scope.location){
                        $scope.getHashTagDetail($scope.location);
                }    else{
                      Scope.response = 0;
                }
            }


            $scope.redirectToHome = function(){
                $location.path("/home");
            }

            $scope.redirectToTopTrend = function () {
                $location.path("/trend");
            }

            $scope.redirectToFavoriteHashtag = function () {
                $location.path("/favoritehashtag");
            }
			
        }]);
    })();
