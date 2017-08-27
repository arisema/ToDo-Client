
// COntroller for project schema
'use strict';

angular.module('toDo')
      .controller('secondController', function($scope, Project, Task){
      $scope.newProject = {};
      $scope.newTask = {};
  // == GET ITEM ====
      $scope.projects = Project.getList().$object;
      $scope.tasks = Task.getList().$object
  // == ========== ==

      $scope.projectAdd = function() {
          Project.post($scope.newProject).then(function(){
              $scope.projects = Project.getList().$object;
              $scope.newProject = {};
          });
      }

      $scope.taskAdd = function($project) {
        $scope.newTask.projectId = $project.id;
        $scope.newTask.done = true;
        Task.post($scope.newTask).then(function(){
            $scope.tasks = Task.getList().$object;
            $scope.newTask = {};
        });
      }
      $scope.taskEdit = function($task){
        $scope.edit = !$scope.edit;
        $task.taskTitle = $task.taskTitle;
        $task.put().then(function(){
            $scope.tasks = Task.getList().$object;
        });
      }
      $scope.taskDone = function($task){
          alert($task.done);
          $task.done = !$task.done;
          $task.put().then(function(){
              $scope.tasks = Task.getList().$object;
          });
          alert($task.done);
      }
      $scope.taskDelete = function($task){
          $task.remove().then(function(){
              $scope.tasks = Task.getList().$object;
          });

      }
      $scope.projectDelete = function($project){
          $project.remove().then(function(){
              $scope.projects = Project.getList().$object;
          });

      }

  });
