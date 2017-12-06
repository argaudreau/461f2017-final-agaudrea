app.factory('saveFormService', function () {
  var userData = {};

  return {
      getData: function () {
          return userData;
      },
      setData: function (newUserData) {
          userData = newUserData
      },
      resetData: function () {
          userData = {};
      }
  };
});