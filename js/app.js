$(document).ready(function(){
    $('#account_name').hide();
    $('.alert-info').hide();
    $('#login').click(function(){
        $('#login_error').hide();
    });
    $('#nav_search').show();
    $('#nav_update').hide();
});
var app = angular.module("my_app",['ngSanitize','xeditable','ngFileUpload','ui.select']);
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});
app.controller("my_controller", function($scope, $http, Upload){
    var count_experience = 0;
    var count_education = 0;
    $http({
        method: 'GET',
        url: 'database/data_edit.json'
    }).success(function(data, status, headers, config){
        $scope.database = data;
        count_experience = $scope.database.panels[0].panel_content[1].post_content.length;
        count_education = $scope.database.panels[0].panel_content[4].post_content.length;
    }).error(function(data, status, headers, config){
        alert('Lỗi không nhận được dữ liệu từ JSON!');
    });

    $scope.is_login = false;

    $scope.login = function()
    {
        if($scope.txtUsername == $scope.database.username && $scope.txtPassword == $scope.database.password)
        {
            $scope.is_login = true;
            $scope.account_name = $scope.txtUsername;
            $('#login_modal').modal('hide');
            $('#login').hide();
            $('#account_name').show();
            $('#nav_search').hide();
            $('#nav_update').show();
        }
        else
        {
            $('#login_error').show();
        }
    };

    $scope.uploadPic = function(file,name) {
        file.upload = Upload.http({
            url: 'services/write_image.php?name='+name,
            method: 'POST',
            headers: {
                'Content-Type': file.type
            },
            data: file
        });
    };

    $scope.reset_information = function(){
        $http({
            method: 'GET',
            url: 'database/data_default.json'
        }).success(function(data, status, headers, config){
            $scope.database = data;
            $('.alert-info').show();
        }).error(function(data, status, headers, config){
            alert('Lỗi không nhận được dữ liệu từ JSON!');
        });
    };

    $scope.update_date = function(){
        var $_experience_from = document.getElementsByClassName('experience_from');
        var $_experience_to = document.getElementsByClassName('experience_to');
        var $_project_time = document.getElementsByClassName('project_time');
        var $_education_from = document.getElementsByClassName('education_from');
        var $_education_to = document.getElementsByClassName('education_to');
        for(var i = 0; i < $_experience_from.length; i++)
        {
            $scope.database.panels[0].panel_content[1].post_content[i].working_time.from = $_experience_from[i].value;
            $scope.database.panels[0].panel_content[1].post_content[i].working_time.to = $_experience_to[i].value;
        }
        for(var j = 0; j < $_project_time.length; j++)
        {
            $scope.database.panels[0].panel_content[2].post_content[j].working_time = $_project_time[j].value;
        }
        for(var k = 0; k < $_education_from.length; k++)
        {
            $scope.database.panels[0].panel_content[4].post_content[k].studying_time.from = $_education_from[k].value;
            $scope.database.panels[0].panel_content[4].post_content[k].studying_time.to = $_education_to[k].value;
        }
    };

    var avatar_changed = false;
    var wall_changed = false;
    var arr_experience_change = Array();
    var arr_education_change = Array();


    $scope.image_is_changed = function(name, index)
    {
        if(name === 'avatar')
        {
            avatar_changed = true;
        }
        if(name === 'wall')
        {
            wall_changed = true;
        }
        if(name == 'experience')
        {
            arr_experience_change[index] = true;
        }
        if(name == 'education')
        {
            arr_education_change[index] = true;
        }
    };

    $scope.update_images = function() {
        if ($scope.database.avatar != 'images/avatar.png' && avatar_changed == true) {
            $scope.uploadPic($scope.database.avatar, 'my_avatar');
            var ext = $scope.database.avatar.type;
            if (ext == 'image/jpeg') {
                $scope.database.avatar = "images/my_avatar.jpeg";
            }
            if (ext == 'image/png') {
                $scope.database.avatar = "images/my_avatar.png";
            }
        }
        if ($scope.database.wall != 'images/wall.jpg' && wall_changed == true) {
            $scope.uploadPic($scope.database.wall, 'my_wall');
            var ext = $scope.database.wall.type;
            if (ext == 'image/jpeg') {
                $scope.database.wall = "images/my_wall.jpeg";
            }
            if (ext == 'image/png') {
                $scope.database.wall = "images/my_wall.png";
            }
        }
        if ($scope.database.panels[0].panel_content[1].post_content.length < count_experience) {
            for (var i = 0; i < $scope.database.panels[0].panel_content[1].post_content.length; i++) {
                $scope.uploadPic($scope.database.panels[0].panel_content[1].post_content[i].company_icon, 'company_icon' + i.toString());
                var ext = $scope.database.panels[0].panel_content[1].post_content[i].company_icon.type;
                if (ext == 'image/jpeg') {
                    $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".jpeg";
                }
                if (ext == 'image/png') {
                    $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".png";
                }
            }
        }
        else if ($scope.database.panels[0].panel_content[1].post_content.length == count_experience) {
            for (var i = 0; i < $scope.database.panels[0].panel_content[1].post_content.length; i++) {
                if (arr_experience_change[i] == true && $scope.database.panels[0].panel_content[1].post_content[i].company_icon != 'images/icon_company.png') {
                    $scope.uploadPic($scope.database.panels[0].panel_content[1].post_content[i].company_icon, 'company_icon' + i.toString());
                    var ext = $scope.database.panels[0].panel_content[1].post_content[i].company_icon.type;
                    if (ext == 'image/jpeg') {
                        $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".jpeg";
                    }
                    if (ext == 'image/png') {
                        $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".png";
                    }
                }
            }
        }
        else {
            for (var i = 0; i < count_experience; i++) {
                if(arr_experience_change[i] == true && $scope.database.panels[0].panel_content[1].post_content[i].company_icon != 'images/icon_company.png') {
                    $scope.uploadPic($scope.database.panels[0].panel_content[1].post_content[i].company_icon, 'company_icon' + i.toString());
                    var ext = $scope.database.panels[0].panel_content[1].post_content[i].company_icon.type;
                    if (ext == 'image/jpeg') {
                        $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".jpeg";
                    }
                    if (ext == 'image/png') {
                        $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".png";
                    }
                }
            }
            for (var i = count_experience; i < $scope.database.panels[0].panel_content[1].post_content.length; i++) {
                $scope.uploadPic($scope.database.panels[0].panel_content[1].post_content[i].company_icon, 'company_icon' + i.toString());
                var ext = $scope.database.panels[0].panel_content[1].post_content[i].company_icon.type;
                if (ext == 'image/jpeg') {
                    $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".jpeg";
                }
                if (ext == 'image/png') {
                    $scope.database.panels[0].panel_content[1].post_content[i].company_icon = "images/company_icon" + i.toString() + ".png";
                }
            }
        }
        if ($scope.database.panels[0].panel_content[4].post_content.length < count_education) {
            for (var i = 0; i < $scope.database.panels[0].panel_content[4].post_content.length; i++) {
                $scope.uploadPic($scope.database.panels[0].panel_content[4].post_content[i].school_icon, 'school_icon' + i.toString());
                var ext = $scope.database.panels[0].panel_content[4].post_content[i].school_icon.type;
                if (ext == 'image/jpeg') {
                    $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/company_icon" + i.toString() + ".jpeg";
                }
                if (ext == 'image/png') {
                    $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/company_icon" + i.toString() + ".png";
                }
            }
        }
        else if ($scope.database.panels[0].panel_content[4].post_content.length == count_education) {
            for (var i = 0; i < $scope.database.panels[0].panel_content[4].post_content.length; i++) {
                if (arr_education_change[i] == true
                    && $scope.database.panels[0].panel_content[4].post_content[i].school_icon != 'images/icon_NTH.png'
                    && $scope.database.panels[0].panel_content[4].post_content[i].school_icon != 'images/icon_KHTN.png') {
                    $scope.uploadPic($scope.database.panels[0].panel_content[4].post_content[i].school_icon, 'school_icon' + i.toString());
                    var ext = $scope.database.panels[0].panel_content[4].post_content[i].school_icon.type;
                    if (ext == 'image/jpeg') {
                        $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/school_icon" + i.toString() + ".jpeg";
                    }
                    if (ext == 'image/png') {
                        $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/school_icon" + i.toString() + ".png";
                    }
                }
            }
        }
        else {
            for (var i = 0; i < count_education; i++) {
                if (arr_education_change[i] == true
                    && $scope.database.panels[0].panel_content[4].post_content[i].school_icon != 'images/icon_NTH.png'
                    && $scope.database.panels[0].panel_content[4].post_content[i].school_icon != 'images/icon_KHTN.png')  {
                    $scope.uploadPic($scope.database.panels[0].panel_content[4].post_content[i].school_icon, 'school_icon' + i.toString());
                    var ext = $scope.database.panels[0].panel_content[4].post_content[i].school_icon.type;
                    if (ext == 'image/jpeg') {
                        $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/school_icon" + i.toString() + ".jpeg";
                    }
                    if (ext == 'image/png') {
                        $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/school_icon" + i.toString() + ".png";
                    }
                }
            }
            for (var i = count_education; i < $scope.database.panels[0].panel_content[4].post_content.length; i++) {
                $scope.uploadPic($scope.database.panels[0].panel_content[4].post_content[i].school_icon, 'school_icon' + i.toString());
                var ext = $scope.database.panels[0].panel_content[4].post_content[i].school_icon.type;
                if (ext == 'image/jpeg') {
                    $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/school_icon" + i.toString() + ".jpeg";
                }
                if (ext == 'image/png') {
                    $scope.database.panels[0].panel_content[4].post_content[i].school_icon = "images/school_icon" + i.toString() + ".png";
                }
            }
        }
    };

    $scope.update_data = function()
    {
        $http({
            url: 'services/write_data.php',
            method: "POST",
            data: $scope.database,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $('.alert-info').hide();
        }).error(function (data, status, headers, config) {
            alert("Lỗi không thể thực hiện service!");
        });
    };

    $scope.save_update = function(){
        $scope.update_images();
        $scope.update_date();
        $scope.update_data();
        location.reload();
    };

    $scope.languages = ['C++', 'C#', 'PHP', 'Java', 'Ruby', 'Javascript', 'Python'];

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
        item.working_time.from = $('#from_experience_add').val();
        item.working_time.to = $('#to_experience_add').val();
        $scope.database.panels[0].panel_content[1].post_content.push(item);
        delete item;
        $('#experience_modal').modal('hide');
    };

    $scope.remove_experience = function(index){
        if($scope.database.panels[0].panel_content[1].post_content.length != 1) {
            delete $scope.database.panels[0].panel_content[1].post_content[index]['position'];
            delete $scope.database.panels[0].panel_content[1].post_content[index]['company_name'];
            delete $scope.database.panels[0].panel_content[1].post_content[index]['company_icon'];
            delete $scope.database.panels[0].panel_content[1].post_content[index]['working_time'];
            delete $scope.database.panels[0].panel_content[1].post_content[index]['description'];
        }
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
        if($scope.database.panels[0].panel_content[2].post_content.length != 1) {
            delete $scope.database.panels[0].panel_content[2].post_content[index]['project_name'];
            delete $scope.database.panels[0].panel_content[2].post_content[index]['working_time'];
            delete $scope.database.panels[0].panel_content[2].post_content[index]['description'];
            delete $scope.database.panels[0].panel_content[2].post_content[index]['link_github'];
            delete $scope.database.panels[0].panel_content[2].post_content[index]['language'];
        }
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
        if($scope.database.panels[0].panel_content[3].post_content.length != 1) {
            delete $scope.database.panels[0].panel_content[3].post_content[index]['skill_name'];
            delete $scope.database.panels[0].panel_content[3].post_content[index]['level'];
        }
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
        item.studying_time.from = $('#from_education_add').val();
        item.studying_time.to = $('#to_education_add').val();
        $scope.database.panels[0].panel_content[4].post_content.push(item);
        delete item;
        $('#education_modal').modal('hide');
    };

    $scope.remove_school = function(index){
        if($scope.database.panels[0].panel_content[4].post_content.length != 1) {
            delete $scope.database.panels[0].panel_content[4].post_content[index]['school_name'];
            delete $scope.database.panels[0].panel_content[4].post_content[index]['certificates'];
            delete $scope.database.panels[0].panel_content[4].post_content[index]['studying_time'];
            delete $scope.database.panels[0].panel_content[4].post_content[index]['school_icon'];
            delete $scope.database.panels[0].panel_content[4].post_content[index]['school_address'];
        }
    };
});