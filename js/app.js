$(document).ready(function(){
    $('#account_name').hide();
    $('#logout').hide();
    $('#login').click(function(){
        $('#login_error').hide();
    });
    $('#account_name').show(
        function() {

        }
    );

});
var app = angular.module("my_app",['ngSanitize','xeditable','ngFileUpload','ui.select']);
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});
app.controller("my_controller", function($scope, $http){
    $http({
        method: 'GET',
        url: 'database/data.json'
    }).success(function(data, status, headers, config){
        $scope.database = data;
    }).error(function(data, status, headers, config){
        alert('Lỗi không nhận được dữ liệu từ JSON!');
    });
    $scope.is_login = false;
    $scope.login = function()
    {
        if($scope.txtUsername == $scope.database.username && $scope.txtPassword == $scope.database.password)
        {
            $scope.account_name = $scope.txtUsername;
            $('#login_modal').modal('hide');
            $('#logout').show();
            $('#login').hide();
        }
        else
        {
            $('#login_error').show();
        }
    };

    $scope.logout = function()
    {
        $('#account_name').hide();
        $('#logout').hide();
        $('#login').show();
    };

    $scope.languages = ['C++', 'C#', 'PHP'];

    $scope.delete_obj = function(item){
        delete item;
    };

    $scope.init_experience = function()
    {
        $scope.experience = {
            "position": "",
            "company_name": "",
            "company_icon": "",
            "working_time": {
                "from": "",
                "to": ""
            },
            "description": ""
        }
    }

    $scope.add_experience = function(item){
        item.company_icon = item.company_icon.$ngfBlobUrl;
        item.working_time.from = $('#from_experience_add').val();
        item.working_time.to = $('#to_experience_add').val();
        $scope.database.panels[0].panel_content[1].post_content.push(item);
        delete item;
        $('#experience_modal').modal('hide');
    };

    $scope.remove_experience = function(index){
        delete $scope.database.panels[0].panel_content[1].post_content[index]['position'];
        delete $scope.database.panels[0].panel_content[1].post_content[index]['company_name'];
        delete $scope.database.panels[0].panel_content[1].post_content[index]['company_icon'];
        delete $scope.database.panels[0].panel_content[1].post_content[index]['working_time'];
        delete $scope.database.panels[0].panel_content[1].post_content[index]['description'];
    };

    $scope.init_project = function()
    {
        $scope.project = {
            "project_name": "",
            "working_time": "",
            "description": "",
            "link_github": "",
            "language": "C++"
        }
    };

    $scope.add_project = function(item){
        item.working_time = $('#time_project_add').val();
        $scope.database.panels[0].panel_content[2].post_content.push(item);
        delete item;
        $('#project_modal').modal('hide');
    };

    $scope.remove_project = function(index){
        delete $scope.database.panels[0].panel_content[2].post_content[index]['project_name'];
        delete $scope.database.panels[0].panel_content[2].post_content[index]['working_time'];
        delete $scope.database.panels[0].panel_content[2].post_content[index]['description'];
        delete $scope.database.panels[0].panel_content[2].post_content[index]['link_github'];
        delete $scope.database.panels[0].panel_content[2].post_content[index]['language'];
    };

    $scope.init_skill = function()
    {
        $scope.skill = {
            "skill_name": "",
            "level": 50
        }
    };

    $scope.add_skill = function(item){
        $scope.database.panels[0].panel_content[3].post_content.push(item);
        delete item;
        $('#skill_modal').modal('hide');
    }

    $scope.remove_skill = function(index){
        delete $scope.database.panels[0].panel_content[3].post_content[index]['skill_name'];
        delete $scope.database.panels[0].panel_content[3].post_content[index]['level'];
    };

    $scope.init_education = function()
    {
        $scope.education = {
            "school_name": "",
            "certificates": "",
            "studying_time": {
                "from": "",
                "to": ""
            },
            "school_icon": "",
            "school_address": ""
        }
    }

    $scope.add_education = function(item){
        item.school_icon = item.school_icon.$ngfBlobUrl;
        item.studying_time.from = $('#from_education_add').val();
        item.studying_time.to = $('#to_education_add').val();
        $scope.database.panels[0].panel_content[4].post_content.push(item);
        delete item;
        $('#education_modal').modal('hide');
    };

    $scope.remove_school = function(index){
        delete $scope.database.panels[0].panel_content[4].post_content[index]['school_name'];
        delete $scope.database.panels[0].panel_content[4].post_content[index]['certificates'];
        delete $scope.database.panels[0].panel_content[4].post_content[index]['studying_time'];
        delete $scope.database.panels[0].panel_content[4].post_content[index]['school_icon'];
        delete $scope.database.panels[0].panel_content[4].post_content[index]['school_address'];
    };
});