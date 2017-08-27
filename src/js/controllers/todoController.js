// Controller for app with todo schema
'use strict';
var toDoModule = angular.module('toDo')
    .controller('firstController', function($scope, Todo, $routeParams){
        $scope.formData = {};
    // == GET ITEM ====
        $scope.todos = Todo.getList().$object;
    // == ========== ==

        $scope.addItem = function() {

            Todo.post($scope.formData).then(function(){
                $scope.todos = Todo.getList().$object;
                $scope.formData = {};
            });

        }
        $scope.editItem = function($item){
            $scope.edit = !$scope.edit;
            $item.title = $item.title;
            $item.put().then(function(){
                $scope.todos = Todo.getList().$object;
            });
        }
        $scope.taskDone = function($item){
            alert($item.done);
            $item.done = !$item.done;
            $item.put().then(function(){
                $scope.todos = Todo.getList().$object;
            });
        }
        $scope.deleteItem = function($item){
            $item.remove().then(function(){
                $scope.todos = Todo.getList().$object;
            });

        }

    });
module.exports('toDo');
