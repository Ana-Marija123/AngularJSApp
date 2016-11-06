app.controller("myCtrl", function ($http, $scope) {
    $scope.c = 1;
    $scope.topMovies = [];
    $scope.showTable = false;
    $scope.stars = [];
    $scope.voteStars;
    $scope.actors = [];
    $scope.showButton = false;
    $scope.genres = [];
    $scope.genreMovies = [];
    $scope.hideTable1 = true;
    $scope.movietable = false;
    $scope.genresTable = false;


    $scope.nextPage = (function () { //closure za c da se inkrementira - dvoen scopes
        return function () {
            return $scope.c++;
        }
    })();


    $scope.showGenres = function () {
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/genre/movie/list",
            params: {
                api_key: "6e44c855f8bb700398820bc37a01ff6c",
            }
        }).then(function success(response) {
            // $scope.hideTable1=false;
            $scope.garnesTable = true;
            $scope.showButton = false;
            $scope.genres = response.data.genres;
        }, function error(response) {
            console.log("error");
        });
    }

    $scope.showMoviesByGenre = function (g) {

        $scope.hideTable1 = false;
        $scope.genreMovies = [];
        for (var i = 0; i < $scope.topMovies.length; i++) {
            if ($scope.topMovies[i].genre_ids.indexOf(g.id) != -1) {
                $scope.genreMovies.push($scope.topMovies[i]);
            }
        }
        $scope.genresTable = true;
    }


    $scope.showTopMovies = function () {
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/now_playing",
            params: {
                api_key: "6e44c855f8bb700398820bc37a01ff6c",
                page: $scope.c
            }
        }).then(function success(response) {

            $scope.genresTable = false;

            console.log(response.data.results);
            $scope.hideTable1 = true;
            $scope.showButton = true;
            if ($scope.topMovies.length != 0) {
                $scope.topMovies = $scope.topMovies.concat(response.data.results);
            } else if ($scope.topMovies.length == 0) {
                $scope.topMovies = response.data.results;
            }

        }, function error(response) {
            console.log("error");
        });
    }


    $scope.showActors = function (movieActors) {
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/" + movieActors.id + "/credits",
            params: {
                api_key: "6e44c855f8bb700398820bc37a01ff6c"
            }
        }).then(function success(response) {
            $scope.hideTable1 = true;
            $scope.actors = response.data.cast;
        }, function error(response) {
            console.log("error")
        })
    }


});


app.directive("stars", function () {
    return {
        restrict: 'E',
        templateUrl: 'directive-stars.html',
        link: function (scope) {
            scope.voteStars = parseInt(scope.m.vote_average);
            scope.stars = [];
            for (var i = 0; i < scope.voteStars; i++) {
                scope.stars.push(true);
            }
            for (var i = scope.voteStars; i < 10; i++) {
                scope.stars.push(false);
            }

        }
    }
});

