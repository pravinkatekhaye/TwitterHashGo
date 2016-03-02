
/**
 * @name connectTwitter
 * @desc connect with twitter account.
 * @param
 * @returns
 */

(function () {

    angular.module('twitterApp')
        .controller('LoginController',['$scope','twitterService', function ($scope,twitterService ) {
            twitterService.initialize();
            //when the user clicks the connect twitter button, the popup authorization window opens populate for
            $scope.connectToTwitter = function () {

                twitterService.connectTwitter().then(function (data) {
                    if (twitterService.isReady()) {

                        $scope.connectedTwitter = true;
                    }
                });
            }

        }]);
})();