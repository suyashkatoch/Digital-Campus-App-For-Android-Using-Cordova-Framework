var myApp = angular.module("main_module",['LocalStorageModule','ngFileUpload']);

        /*Service For Middle Level Category*/
myApp.factory('from_firslt_level',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

        /*Service For Lower Level Category*/
myApp.factory('lower_service',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

        /*Service To Display Main Contents*/
myApp.factory('main_con',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

        /*Service For Lower Level Category*/
myApp.factory('middle_content_wo_category',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

        /*Service For Middle Level Content*/
myApp.factory('mid_content_service',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
    this.data = data;
    $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

        /*Service For Specific Content*/
myApp.factory('spec_content_service',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

        /*Verify User*/
myApp.factory('user_verification',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

        /*Service For Adding Admin*/
myApp.factory('add_admin',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

            /*Controller For Home/Main Page*/
myApp.controller('user_page', function ($scope,from_firslt_level,middle_content_wo_category,$http,localStorageService,$window) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }
    $.mobile.loading('show',{text:'Loading. Please Wait',textVisible:true,theme:'b'});
    $http.get("http://meacinephilia.com/user/show_cat_img/show")
    .then(function (response)
    {
        $scope.img = response.data;
        $.mobile.loading('hide');
    },function (response) {
        document.getElementById('image_error').innerHTML="<font color='red'>Couldn\'t Fetch Data. Please check Your Network and Try Again</font><br />";
        $.mobile.loading('hide');
    });
    $scope.display_id = function(image_data) {
        /*Middle Level Category With Lower Level category*/
       $http.get("http://meacinephilia.com/user/show_cat_img/sub_menu_contents/"+image_data.id)
        .then(function (response)
        {
            $scope.img_data = response.data;
            from_firslt_level.sendData($scope.img_data);
        });
        /*Middle Level Content Without Lower Level category*/
        $http.get("http://meacinephilia.com/user/show_cat_img/mid_menu_contents/"+image_data.id)
        .then(function (response)
        {
            $scope.img_data = response.data;
            middle_content_wo_category.sendData($scope.img_data);
        });
    }
});
        /*Controller For Middle Level Category*/
myApp.controller('middle_menu', function ($scope,from_firslt_level,middle_content_wo_category,mid_content_service,lower_service,$http,main_con, localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.$on('data_shared',function(){
        $.mobile.loading('show',{text:'Loading Content. Please Wait',textVisible:true,theme:'b'});
        var middle_cat_data =  from_firslt_level.getData();
        $scope.mid_menu = middle_cat_data;
        setTimeout(function() {
            $.mobile.loading('hide');
        },2000)
    });

    $scope.main_content = function(id) {
        $http.get("http://meacinephilia.com/user/show_content/main_content_low/"+id.id)
        .then(function (response) {
            $scope.main_data = response.data;
            main_con.sendData($scope.main_data);
        });
    }
    $scope.low_content = function(mid_data) {
        $http.get("http://meacinephilia.com/user/show_cat_img/low_menu_content/"+mid_data.id)
        .then(function (response) {
            $scope.low_menu_data = response.data;
            lower_service.sendData($scope.low_menu_data);
        });
    }
    $scope.$on('data_shared',function(){
        var middle_cat_dat =  middle_content_wo_category.getData();
        $scope.mid_menu_c = middle_cat_dat;
    });

    $scope.mid_content = function(id) {
        $http.get("http://meacinephilia.com/user/show_content/mid_menu_content/"+id.id)
        .then(function (response) {
            $scope.low_menu_data = response.data;
            mid_content_service.sendData($scope.low_menu_data);
        });
    }
});

    /*Controller For Lower Level Category*/
myApp.controller('mid_content_wo_c', function ($scope,mid_content_service,main_con,$http,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    } 
    $scope.$on('data_shared',function(){
        var mid_cat_data =  mid_content_service.getData();
        $scope.mid_data = mid_cat_data;
    });
});

    /*Controller For Lower Level Category*/
myApp.controller('low_contents', function ($scope,lower_service,main_con,$http,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.$on('data_shared',function(){
        var lower_cat_data =  lower_service.getData();
        $scope.lower_data = lower_cat_data;
    });
    $scope.main_content = function(low_data) {
        $http.get("http://meacinephilia.com/user/show_content/main_content/"+low_data.id)
        .then(function (response) {
            $scope.main_data = response.data;
            main_con.sendData($scope.main_data);
        });
    }
});

    /*Controller For Lower Level Category*/
myApp.controller('main_contents', function ($scope,main_con,spec_content_service,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.$on('data_shared',function(){
        var main_data =  main_con.getData();
        $scope.main_data = main_data;
    });
    $scope.spec_content = function (spec_data) {
        $scope.spec_data = spec_data;
        spec_content_service.sendData($scope.spec_data);
    }
});
    /*Controller For Specific Content Data*/
myApp.controller('spec_contents', function ($scope,$http,spec_content_service,$window,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.$on('data_shared',function(){
        var sp_data =  spec_content_service.getData();
        $scope.spec_data = sp_data;
        if(typeof sp_data=="object")
            $window.map_info(sp_data);
    });
});

        /*Controller For Adding Main Category*/
myApp.controller('add_main', function ($http,$scope,Upload, $timeout,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.add_main_category = function(main) {
        $.mobile.loading('show',{text:'Adding Category',textVisible:true,theme:'b'});
        $("#main_button").prop('disabled', true);
        if(typeof main=='undefined')
        {
            document.getElementById('err_category').innerHTML="<font color='red'>Please Enter Category</font><br />";
            $("#main_button").prop('disabled', false);
            $.mobile.loading('hide');
            return false;
        }
        if(typeof main.c5=='undefined' || typeof main.c6=='undefined')
        {
            document.getElementById('err_category').innerHTML="<font color='red'>Please Choose Images</font><br />";
            $("#main_button").prop('disabled', false);
            $.mobile.loading('hide');
            return false;
        }

        var add_t = main.c1;
        var add_m = main.c2;
        var add_l = main.c4;
        var icon = main.c5;
        var icon1 = main.c6;
        if(typeof add_t=='undefined')
        {
            document.getElementById('err_category').innerHTML="<font color='red'>Please Enter Top Category</font><br />";
            $("#main_button").prop('disabled', false);
            $.mobile.loading('hide');
            return false;
        }
        if(typeof add_m=='undefined')
        {
            document.getElementById('err_category').innerHTML="<font color='red'>Please Enter Middle Category</font><br />";
            $("#main_button").prop('disabled', false);
            $.mobile.loading('hide');
            return false;
        }
        if(main.c3) {
            if(typeof main.c7=='undefined')
            {
                document.getElementById('err_category').innerHTML="<font color='red'>Please Choose Images</font><br />";
                $("#main_button").prop('disabled', false);
                $.mobile.loading('hide');
                return false;
            }
            var icon2 = main.c7;
            if(typeof add_l=='undefined')
            {
                document.getElementById('err_category').innerHTML="<font color='red'>Please Enter Lower Category</font><br />";
                $("#main_button").prop('disabled', false);
                $.mobile.loading('hide');
                return false;
            }
            else {
                $http.get("http://meacinephilia.com/admin/add_cat/check_cat/"+add_t)
                .then(function (response) 
                {
                    if(response.data!=0) {
                        document.getElementById('err_category').innerHTML="<font color='red'>Category Already Exists</font><br />";
                        $("#main_button").prop('disabled', false);
                        $.mobile.loading('hide');
                        return false;
                    }
                    else {
                        icon.upload = Upload.upload({
                        url: "http://meacinephilia.com/admin/add_cat/add/"+add_t+"/"+add_m+'/'+add_l,
                        method: 'POST',
                        file: {icon:main.c5,icon1:main.c6,icon2:main.c7},
                        sendFieldsAs: 'form'
                        });
                        icon.upload.then(function (response) {
                            if(response.data!=0) {
                                document.getElementById('err_category').innerHTML="<font color='red'>Category Added Successfully</font><br />";
                                $("#main_button").prop('disabled', false);
                                $.mobile.loading('hide');
                            }
                            else
                            {
                                document.getElementById("err_category").innerHTML="<font color='red'>Something Went Wrong. Please Try Again</font>";
                                $("#main_button").prop('disabled', false);
                                $.mobile.loading('hide');
                            }
                            $timeout(function () {
                                icon.result = response.data;
                            });
                        });
                        return false;
                    }
                });
            }
        }
        else {
            $http.get("http://meacinephilia.com/admin/add_cat/check_cat/"+add_t)
            .then(function (response) 
            {
                if(response.data!=0) {
                    document.getElementById('err_category').innerHTML="<font color='red'>Category Already Exists</font><br />";
                    $("#main_button").prop('disabled', false);
                    $.mobile.loading('hide');
                    return false;
                }
                else {
                    icon.upload = Upload.upload({
                        url: 'http://meacinephilia.com/admin/add_cat/add/'+add_t+'/'+add_m,
                        method: 'POST',
                        file: {icon:main.c5,icon1:main.c6},
                        sendFieldsAs: 'form'
                    });
                    icon.upload.then(function (response) {
                        if(response.data!=0) {
                            document.getElementById('err_category').innerHTML="<font color='red'>Category Added Successfully</font><br />";
                            $("#main_button").prop('disabled', false);
                            $.mobile.loading('hide');
                        }
                        else
                        {
                            document.getElementById("err_category").innerHTML="<font color='red'>Something Went Wrong. Please Try Again</font>";
                            $("#main_button").prop('disabled', false);
                            $.mobile.loading('hide');
                        }
                        $timeout(function () {
                            icon.result = response.data;
                        });
                    });
                    return false;
                }
            });
        }
        document.getElementById('err_category').innerHTML="";
    }
});

        /*Controller For Adding Sub Categories*/
myApp.controller('add_cat', function ($scope, $http,$window,Upload, $timeout,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $http.get("http://meacinephilia.com/admin/list_category")
    .then(function (response) 
    {
        $scope.names = response.data.categories;
    });
    $scope.categor = function(name,id)
    {
        $http.get("http://meacinephilia.com/admin/list_category/specific_category/"+id)
        .then(function (response1)
        {
            $scope.sub_categories = response1.data.sub_categories1;
        });
    }
    $scope.sub_cat = function(main_cat,sub_cat)
    {
        $scope.main_cat_id = sub_cat;
        $scope.sub_cat_id = main_cat;

    }
    $scope.add_c = function(det)
    {
        $.mobile.loading('show',{text:'Adding Sub Category',textVisible:true,theme:'b'});
        var sub_cat_id = $scope.sub_cat_id;
        if(typeof det=='undefined')
        {
            document.getElementById('tex').innerHTML="<font color='red'>Please Choose Category</font><br />";
            $.mobile.loading('hide');
            return false;
        }
        if(typeof det.r1=='undefined')
        {
            document.getElementById('tex').innerHTML="<font color='red'>Please Choose Category</font><br />";
            $.mobile.loading('hide');
        }
        else if(typeof det.r1!='undefined')
        {
            var caat_id = det.r1.name;
            document.getElementById('tex').innerHTML="";
        }
        if(det.r2)
        {
            if(typeof det.r4=='undefined')
            {
                document.getElementById('tex').innerHTML="<font color='red'>Please Choose Image</font><br />";
                $.mobile.loading('hide');
                return false;
            }
            var icon1 = det.r4;
            var t = document.getElementById('another_cat').value;
            if(t.length==0 || t.length=="0")
            {
                document.getElementById('tex').innerHTML="<font color='red'>Please Enter Category Name</font>";
                $.mobile.loading('hide');
            }
            else
            {
                document.getElementById('tex').innerHTML="";
                icon1.upload = Upload.upload({
                    url: 'http://meacinephilia.com/admin/add_cat/add/'+caat_id+'/'+t,
                    method: 'POST',
                    file: {icon1:det.r4},
                    sendFieldsAs: 'form'
                });
                icon1.upload.then(function (response) {
                    if(response.data!=0) {
                        document.getElementById('tex').innerHTML="<font color='red'>Category Added Successfully</font><br />";
                        $.mobile.loading('hide');
                    }
                    else
                    {
                        document.getElementById("tex").innerHTML="<font color='red'>Something Went Wrong. Please Try Again</font>";
                        $.mobile.loading('hide');
                    }
                    $timeout(function () {
                        icon1.result = response.data;
                    });
                });
                return false;
            }
        }
        else
        {
            if(typeof det.r5=='undefined')
            {
                document.getElementById('tex').innerHTML="<font color='red'>Please Choose Image</font><br />";
                $.mobile.loading('hide');
                return false;
            }
            var icon2 = det.r5;
            if(typeof det.r3=='undefined')
            {
                document.getElementById('tex').innerHTML="<font color='red'>Please Choose Sub Category</font><br />";
                $.mobile.loading('hide');
            }
            else if(typeof det.r3!='undefined')
            {
                var u = document.getElementById('another_cat_2').value;
                if(u.length==0)
                {
                    document.getElementById('tex').innerHTML="<font color='red'>Please Enter Sub Category Name</font><br />";
                }
                else
                {
                    var sub_cat_id = det.r3.name;
                        icon2.upload = Upload.upload({
                        url: 'http://meacinephilia.com/admin/add_cat/add/'+caat_id+'/'+sub_cat_id+'/'+u,
                        method: 'POST',
                        file: {icon2:det.r5},
                        sendFieldsAs: 'form'
                    });
                    icon2.upload.then(function (response) {
                        if(response.data!=0) {
                            document.getElementById('tex').innerHTML="<font color='red'>Category Added Successfully</font><br />";
                            $.mobile.loading('hide');
                        }
                        else
                        {
                            document.getElementById("tex").innerHTML="<font color='red'>Something Went Wrong. Please Try Again</font>";
                            $.mobile.loading('hide');
                        }
                        $timeout(function () {
                            icon2.result = response.data;
                        });
                    });
                    return false;
                }
            }
        }
        $.mobile.loading('hide');
    }
});
        /*Controller For Deleting Categories*/
myApp.controller('delete_cat', function ($scope,$http,$window,Upload, $timeout,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
   $http.get("http://meacinephilia.com/admin/list_category")
    .then(function (response) 
    {
        $scope.cat_names = response.data.categories;
    });
    $scope.times = [{id:'0',name:'00'},{id:'1',name:'01'},{id:'2',name:'02'},{id:'3',name:'03'},{id:'4',name:'04'},{id:'5',name:'05'},
                    {id:'6',name:'06'},{id:'7',name:'07'},{id:'8',name:'08'},{id:'9',name:'09'},{id:'10',name:'10'},
                    {id:'11',name:'11'},{id:'12',name:'12'},{id:'13',name:'13'},{id:'14',name:'14'},{id:'15',name:'15'},
                    {id:'16',name:'16'},{id:'17',name:'17'},{id:'18',name:'18'},{id:'19',name:'19'},{id:'20',name:'20'},
                    {id:'20',name:'20'},{id:'21',name:'21'},{id:'22',name:'22'},{id:'23',name:'23'}];

    $scope.time_h = [{id:'00',name:'00'},{id:'01',name:'01'},{id:'02',name:'02'},{id:'03',name:'03'},{id:'04',name:'04'},
                    {id:'05',name:'06'},{id:'07',name:'07'},{id:'08',name:'08'},{id:'09',name:'09'},{id:'10',name:'10'},
                    {id:'11',name:'11'},{id:'12',name:'12'},{id:'13',name:'13'},{id:'14',name:'14'},{id:'15',name:'15'},
                    {id:'16',name:'16'},{id:'17',name:'17'},{id:'18',name:'18'},{id:'19',name:'19'},{id:'20',name:'20'},
                    {id:'21',name:'21'},{id:'22',name:'22'},{id:'23',name:'23'},{id:'24',name:'24'},{id:'25',name:'25'},
                    {id:'26',name:'26'},{id:'27',name:'27'},{id:'28',name:'28'},{id:'29',name:'29'},{id:'30',name:'30'},
                    {id:'31',name:'31'},{id:'32',name:'32'},{id:'33',name:'33'},{id:'34',name:'34'},{id:'35',name:'35'},
                    {id:'36',name:'36'},{id:'37',name:'37'},{id:'38',name:'38'},{id:'39',name:'39'},{id:'40',name:'40'},
                    {id:'41',name:'41'},{id:'42',name:'42'},{id:'43',name:'43'},{id:'44',name:'44'},{id:'45',name:'45'},
                    {id:'46',name:'46'},{id:'47',name:'47'},{id:'48',name:'48'},{id:'49',name:'49'},{id:'50',name:'50'},
                    {id:'51',name:'51'},{id:'52',name:'52'},{id:'53',name:'53'},{id:'54',name:'54'},{id:'55',name:'55'},
                    {id:'56',name:'56'},{id:'57',name:'57'},{id:'58',name:'58'},{id:'59',name:'59'}];
    $scope.list_sub1 = function(sub) {
        $scope.sub_c = sub;
        var id = $scope.sub_c.id
        $http.get("http://meacinephilia.com/admin/list_category/specific_delete/"+id)
        .then(function (response1)
        {
            $scope.list_sub2 = response1.data.lower1;
        });
    }
    $scope.list_main = function(name,id)
    {
        $http.get("http://meacinephilia.com/admin/list_category/specific_category/"+id)
        .then(function (response1)
        {
            $scope.list_sub = response1.data.sub_categories1;
        });
    }

    $scope.dele = function(contents) {
        $.mobile.loading('show',{text:'Deleting Category',textVisible:true,theme:'b'});
        if(typeof contents=='undefined') {
            document.getElementById('texe').innerHTML="<font color='red'>Please Choose Category</font><br />";
            $.mobile.loading('hide');
            return false;
        }
        var top_cat = contents.r1;
        var mid_cat = contents.r3;
        var low_cat = contents.r5;
        if(!contents.r2 && !contents.r4) {
            if(typeof contents.r1=='undefined') {
                document.getElementById('texe').innerHTML="<font color='red'>Please Choose Category</font><br />";
                $.mobile.loading('hide');
                return false;
            }
            else if(typeof contents.r1!='undefined') {
                $http.get('http://meacinephilia.com/admin/delete_cat/delete/'+top_cat.id)
                .then(function (top)
                {
                    if(top.data=="1")
                    {
                        document.getElementById('texe').innerHTML="<font color='red'>Category Deleted Successfully</font><br />";
                        $.mobile.loading('hide');
                        return false;
                    }
                    else
                    {
                        document.getElementById('texe').innerHTML="<font color='red'>Sorry. Couldn\'t Delete</font><br />";
                        $.mobile.loading('hide');
                        return false;
                    }
                });
            }
        }
        if(contents.r2 && !contents.r4) {
            if(typeof contents.r1=='undefined') {
                document.getElementById('texe').innerHTML="<font color='red'>Please Choose Both Categories</font><br />";
                $.mobile.loading('hide');
                return false;
            }
            if(typeof contents.r3=='undefined') {
                document.getElementById('texe').innerHTML="<font color='red'>Please Choose Middle Category</font><br />";
                $.mobile.loading('hide');
                return false;
            }
            if(typeof contents.r1!='undefined' && typeof contents.r3!='undefined') {
                $http.get('http://meacinephilia.com/admin/delete_cat/delete_mid/'+mid_cat.id)
                .then(function (middle)
                {
                    if(middle.data=="1")
                    {
                        document.getElementById('texe').innerHTML="<font color='red'>Category Deleted Successfully</font><br />";
                        $.mobile.loading('hide');
                        return false;
                    }
                    else
                    {
                        document.getElementById('texe').innerHTML="<font color='red'>Sorry. Couldn\'t Delete</font><br />";
                        $.mobile.loading('hide');
                        return false;
                    }
                });
            }
        }
        if(contents.r4) {
            if(typeof contents.r5=='undefined') {
                document.getElementById('texe').innerHTML="<font color='red'>Please Choose Lower Category</font><br />";
                $.mobile.loading('hide');
                return false;
            }
            else if(typeof contents.r5!='undefined') {
                $http.get('http://meacinephilia.com/admin/delete_cat/delete_low/'+low_cat.id)
                .then(function (low)
                {
                    if(low.data=="1")
                    {
                        document.getElementById('texe').innerHTML="<font color='red'>Category Deleted Successfully</font><br />";
                        $.mobile.loading('hide');
                        return false;
                    }
                    else
                    {
                        document.getElementById('texe').innerHTML="<font color='red'>Sorry. Couldn\'t Delete</font><br />";
                        $.mobile.loading('hide');
                        return false;
                    }
                });
            }
        }
        $.mobile.loading('hide');
    }
    $scope.add_cont = function(con) {

        if(typeof con=='undefined') {
            document.getElementById('con_err').innerHTML="<font color='red'>Choose Category</font>";
            return false;
        }
        var a_top_cat = con.r1;
        var a_mid_cat = con.r2;
        var a_low_cat = con.r4;
        var a_name = document.getElementById('content_name').value;
        var a_num = document.getElementById('content_num').value;
        var a_email = document.getElementById('content_email').value;
        var a_desc = document.getElementById('content_desc').value;
        var a_lat = document.getElementById("s_lat").innerText;
        var a_long = document.getElementById("s_lon").innerText;
        if(con.r5) {
            var a_time_h = con.r6.id;
            var a_time_m = con.r7.id;
            var e_time_h = con.r8.id;
            var e_time_m = con.r9.id;
        }
        else {
            var a_time_h = a_time_m = e_time_h = e_time_m = 0;
        }
        if(e_time_h<a_time_h || (a_time_h==e_time_h && e_time_m<a_time_m)) {
            document.getElementById('con_err').innerHTML="<font color='red'>Start Time Shoul Be Less Than End Time</font>";
            return false;
        }
        var atpos = a_email.indexOf("@");
        var dotps = a_email.indexOf(".");

        if(typeof con.r2=='undefined')
        {
            document.getElementById('con_err').innerHTML="<font color='red'>Choose Middle Level Category</font>";
            return false;
        }
        if(con.r3 && typeof con.r4=='undefined') {
            document.getElementById('con_err').innerHTML="<font color='red'>Choose Low Level Category</font>";
            return false;
        }

        if(a_name.length==0 || a_num.length==0 || a_email.length==0 || a_desc.length==0) {
            document.getElementById('con_err').innerHTML="<font color='red'>Fill All The Fields</font>";
            return false;
        }
        if(typeof con.r10=='undefined') {
            document.getElementById('con_err').innerHTML="<font color='red'>Choose Image</font>";
            return false;
        }
        var icon = con.r10;
        if(a_num.length!=10) {
            document.getElementById('con_err').innerHTML="<font color='red'>Invalid Contact Number</font>";
            return false;
        }
        if(atpos<1 || dotps<atpos+2 || dotps+2>= a_email.length) {
            document.getElementById('con_err').innerHTML="<font color='red'>Invalid Email Address</font>";
            return false;
        }
        document.getElementById('con_err').innerHTML="<font color='red'>Adding Contents. Please Wait</font>";
        if(con.r3) {
            icon.upload = Upload.upload({
                url: 'http://meacinephilia.com/admin/add_content/add_c_l/'+a_top_cat.id+'/'+a_mid_cat.id+'/'+a_low_cat.id+'/'+a_name+'/'+a_num+'/'+a_email+'/'+a_desc+'/'+a_lat+'/'+a_long+'/'+a_time_h+'/'+a_time_m+'/'+e_time_h+'/'+e_time_m,
                method: 'POST',
                file: icon,
                sendFieldsAs: 'form'
            });
            icon.upload.then(function (response) {
                if(response.data=="1") {
                    document.getElementById('con_err').innerHTML="<font color='red'>Content Added Successfully</font><br />";
                }
                else
                    document.getElementById("con_err").innerHTML="<font color='red'>Something Went Wrong. Please Try Again</font>";
                $timeout(function () {
                    icon.result = response.data;
                });
            });
            return false;
        }
        else
        {
            icon.upload = Upload.upload({
                url: 'http://meacinephilia.com/admin/add_content/add_c_m/'+a_top_cat.id+'/'+a_mid_cat.id+'/'+a_name+'/'+a_num+'/'+a_email+'/'+a_desc+'/'+a_lat+'/'+a_long+'/'+a_time_h+'/'+a_time_m+'/'+e_time_h+'/'+e_time_m,
                method: 'POST',
                file: icon,
                sendFieldsAs: 'form'
            });
            icon.upload.then(function (response) {
                if(response.data=="1") {
                    document.getElementById('con_err').innerHTML="<font color='red'>Content Added Successfully</font><br />";
                }
                else
                    document.getElementById("con_err").innerHTML="<font color='red'>Something Went Wrong. Please Try Again</font>";
                $timeout(function () {
                    icon.result = response.data;
                });
            });
            return false;
        }
    }
});

        /*Controller For Registering User*/
myApp.controller('user_registration_controller', function ($scope,$http,$window,user_verification,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.register_user = function (c) {
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phone = document.getElementById("cnumber").value;
        var email = document.getElementById("email").value;
        var pass = document.getElementById("pass").value;
        var cpass = document.getElementById("cpass").value;
        if(fname.length==0 || lname.length==0 || phone.length==0 || email.length==0 || pass.length==0 || cpass.length==0) {
            document.getElementById("registration_error").innerHTML="Please Fill All Fields";
            return false;
        }
        else if(phone.length<10) {
            document.getElementById("registration_error").innerHTML="Enter Valid Mobile Number";
            return false;
        }
        else if(pass != cpass) {
            document.getElementById("registration_error").innerHTML="Passwords Mismatch";
            return false;
        }
        else if(pass.length <8) {
            document.getElementById("registration_error").innerHTML="Passwords Must be Minimum 8 hcracter Long";
            return false;
        }
        var key = CryptoJS.enc.Base64.parse("T7hxlzVfFWtGpH9ES1e6s/+odQdq1pWi/X3NL7DGywQ");
        var iv  = CryptoJS.enc.Base64.parse("n8oj3VyTKtw0MD5vWRjUY0UA5Dj2y1Bhwo5k+n3/uAs");
        var encrypted = CryptoJS.AES.encrypt(pass, key, {iv: iv});
        user_verification.sendData(phone);
        $http.get("http://meacinephilia.com/user/user_registration/register_user/"+fname+"/"+lname+"/"+phone+"/"+email+"/"+encrypted)
        .then(function (response)
        {
            if(response.data == "2")
                $window.location = "user_page.html#user_verify";
            else if(response.data == "1")
                document.getElementById("registration_error").innerHTML="Email or Phone Number Already Exists.";
            else
                document.getElementById("registration_error").innerHTML="Something Went Wrong. Please Try Later.";
        });

        document.getElementById("registration_error").innerHTML="";
    }
});

    /*Controller For Verifying User*/
myApp.controller('verify_user', function ($scope,$http,user_verification,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.$on('data_shared',function(){
        var mid_cat_data =  user_verification.getData();
        $scope.user_verify_otp = mid_cat_data;
    });
    $scope.verify_otp = function() {
        var phone = document.getElementById("vphone").value;
        var otp = document.getElementById("otp").value;
        if(otp.length==0) {
            document.getElementById("verification_error").innerHTML="Enter Valid OTP.";
            return false;
        }
        $http.get("http://meacinephilia.com/user/user_registration/verify_otp/"+phone+"/"+otp)
        .then(function (response)
        {
            if(response.data == "1") {
                document.getElementById("verification_error").innerHTML="Account Verified Successfully.";
            }
            else
                document.getElementById("verification_error").innerHTML="Couldn't Verify Account or Invalid OTP";
        });
    }
});

    /*Controler For Admin Login*/
myApp.controller("admin_panel_login", function ($scope,$http,$window,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $scope.login = function() {
        var admin_id = document.getElementById("admin_user_name").value;
        var admin_pass = document.getElementById("admin_pass").value;
        if(admin_id.length == 0 || admin_pass.length==0) {
            document.getElementById("login_error").innerHTML = "Please Fill Both Fields";
            return false;
        }
        else {
            var text = admin_pass;
            var key = CryptoJS.enc.Base64.parse("dUKyrIGkKvkHXCfF0c9MX4XOiW1KA27sAQE9x8qe2Yo=");
            var iv  = CryptoJS.enc.Base64.parse("fa5XXBwXsIb2h8+V7i2r2lrIzoNwu05Gbb9MgvSI6Ko=");
            var encrypted_pass = CryptoJS.AES.encrypt(text, key, {iv: iv});

            $http.get("http://meacinephilia.com/admin/admin_login/login/"+admin_id+"/"+encrypted_pass)
            .then(function (response) {
                if(response.data == "0") {
                    document.getElementById("login_error").innerHTML = "Invalid Credential";
                    return false;
                }
                else {
                    document.getElementById("login_error").innerHTML = "";
                    $http.get("http://meacinephilia.com/admin/admin_login/user_logged/"+admin_id+"/"+encrypted_pass)
                    .then(function (response_d) {
                        var admin_logged_id = response_d.data[0]["id"];
                        var admin_logged_name = response_d.data[0]["name"];
                        $scope.local1 = localStorageService.set("admin_logeedin",JSON.stringify([{'id':admin_logged_id,'name':admin_logged_name}]));
                        $window.location = "user_page.html";
                    });
                }
            });
        }
    }
});

    /*Controller FOr adding Admin*/
myApp.controller("admin_add", function ($scope,$window,$http,add_admin,localStorageService) {
    if(localStorageService.get("admin_logeedin") !== null)
        $scope.login_status = "admin";
    else
        $scope.login_status = "other";
    $scope.admin_logout = function() {
        $scope.admin_logeedin = localStorageService.clearAll();
        $window.location = "index.html";
    }    
    $http.get("http://meacinephilia.com/admin/add_admin/admin_last_id/")
    .then(function (response) {
        $scope.last_admin_id = response.data;
        add_admin.sendData($scope.last_admin_id);
    });
    $scope.$on('data_shared',function(){
        var data =  add_admin.getData();
        $scope.admin_new_id = data["new_id"];
    });
    $scope.add_admins = function() {
        var name = document.getElementById("admin_name").value;
        var pass = document.getElementById("admin_pas").value;
        var cpass = document.getElementById("admin_pas_c").value;
        var new_id = document.getElementById("admin_new").value;
        if(name.length == 0 || pass.length==0 || cpass.length==0) {
            document.getElementById("admin_add_error").innerHTML="Fill All Fields";
            return false;
        }
        else if(pass!=cpass) {
            document.getElementById("admin_add_error").innerHTML="Passwords Mismatch";
            return false;
        }
        else if(pass.length <8) {
            document.getElementById("admin_add_error").innerHTML="Passwords Must be Minimum 8 Chcracter Long";
            return false;
        }
        else {
            document.getElementById("admin_add_error").innerHTML="";
            var key = CryptoJS.enc.Base64.parse("dUKyrIGkKvkHXCfF0c9MX4XOiW1KA27sAQE9x8qe2Yo=");
            var iv  = CryptoJS.enc.Base64.parse("fa5XXBwXsIb2h8+V7i2r2lrIzoNwu05Gbb9MgvSI6Ko=");
            var encrypted = CryptoJS.AES.encrypt(pass, key, {iv: iv});

            $http.get("http://meacinephilia.com/admin/add_admin/admin_add_new/"+new_id+"/"+name+"/"+encrypted)
            .then(function(response) {
                if(response.data == "0") {
                    document.getElementById("admin_add_error").innerHTML="Admin ID Already Exists. Please Refresh Page";
                }
                else if(response.data == "1")
                    document.getElementById("admin_add_error").innerHTML="Admin Added Successfully. Admin ID Is <b>"+new_id+"</b>";
                else
                    document.getElementById("admin_add_error").innerHTML="Passwords Mismatch";
            });
        }
    }
});