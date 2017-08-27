

// factories

angular.module('toDo')
  .factory('ConfRestangular', function(Restangular){
      return Restangular.withConfig(function(RestangularConfigurer){
          RestangularConfigurer.setRestangularFields({

          });
      });
  })
  .factory('Todo', function(ConfRestangular){
      return ConfRestangular.service('todos');
  })
  .factory('Project', function(ConfRestangular){
      return ConfRestangular.service('projects');
  })
  .factory('Task', function(ConfRestangular){
      return ConfRestangular.service('tasks');
});
