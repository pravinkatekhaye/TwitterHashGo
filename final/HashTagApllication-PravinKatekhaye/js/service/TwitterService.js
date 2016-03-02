//Twitter service.js
(function(){
  angular.module('twitterApp.services', [])
      .factory('twitterService',['$q','$http','$location', function($q, $http, $location) {
       var authorizationResult = false;
    return {
        initialize: function () {

            //initialize OAuth.io with public key of the application
            OAuth.initialize('5pE3BgzmblTswXo5jc_F74iUaLA', {cache: true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');

        },

        isReady: function () {
            return (authorizationResult);

        },

        connectTwitter: function () {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache: true}, function (error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    $location.path('/home');
                } else {
                    //do something if there's an error
                    alert("Problem in connect Twitter")
                }
            });
            return deferred.promise;
        },

        clearCache: function () {

            OAuth.clearCache('twitter');
            authorizationResult = false;

        },
        /**
         * @name getLatestTrends
         * @desc  according to woeid it gives latest Trends and hashtags
         * @param woeid
         * @returns
         */

        getLatestTrends: function (woeid) {
            var deferred = $q.defer();
            if(woeid)
            {
              var url='/1.1/trends/place.json?id='+woeid;
            }
            else{
                var url = "/1.1/trends/place.json?id=1";
            }
            var promise = authorizationResult.get(url).done(function (data) {
                console.log(data);
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },
        /**
         * @name getRelatedTweetsOfHashtag
         * @desc  This function get the related tweets according to input keyword
         * @param hashtags
         * @returns
         */
        getRelatedTweetsOfHashtag: function (hashtag) {
            var encodedhashtag = hashtag.replace("#", "%28%23");
            var deferred = $q.defer();
            var url = '/1.1/search/tweets.json?q=' + encodedhashtag + '&src=typd&result_type=recent';
            var promise = authorizationResult.get(url).done(function (data) {
                console.log(data);
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        /**
         * @name requestForLikeTweet
         * @desc  This function takes request for liking the tweets.
         * @param tweet id
         * @returns response
         */
        requestForLikeTweet: function (id) {

            var deferred = $q.defer();
            var url = '/1.1/favorites/create.json?id=' + id;
            var promise = authorizationResult.post(url).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        /**
         * @name getHomeTimelineTweets
         * @desc  This function gives the the home timline tweets.
         * @param
         * @returns
         */

        getHomeTimelineTweets: function () {
            var deferred = $q.defer();
            var url = '/1.1/statuses/home_timeline.json';

            var promise = authorizationResult.get(url).done(function (data) {
                console.log(data);
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);

            });
            return deferred.promise;
        },
        /**
         * @name getwoeidOfPlace
         * @desc  This function gives the woeid related to input place name.
         * @param placename
         * @returns woeid
         */

        getwoeidOfPlace: function (placename) {
            var deferred = $q.defer();
            var url='/1.1/trends/available.json';
            var promise = authorizationResult.get(url).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
           },

        /**
         * @name getuserProfileDetail
         * @desc  This function gives user profile details.
         * @param
         * @returns
         */
		    getuserProfileDetail: function () {
            var deferred = $q.defer();
            var url='/1.1/account/verify_credentials.json';
            var promise = authorizationResult.get(url).done(function (data) {
                console.log(data);
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

           }
		   
		   
         }
     }]);
})();