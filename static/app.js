$(function(){


    var getImageSuccess = function(data){
        console.log("okay we have image data.");
        console.log(data);
        $("#imageID").attr("src", "/currentimage");
    };
    var getImageFailure = function(data){
        console.log("no image data.  sorry!!!");
    };

    var successResult = function(data){
        // Good, time to get the latest image.
        var req = {
            url: "/currentimage",
            method: "get"
        };

        var promise = $.ajax(req)
        promise.then(getImageSuccess, getImageFailure);
    };
    var failureResult = function(data){
        alert("that didn't work out so good");
    };

    var fileChange = function(evt){
        var fileOb = $("#fileField")[0].files[0];
        var formData = new FormData();
        formData.append("picfile", fileOb);

        var req = {
            url: "/handlepic",
            method: "post",
            processData: false,
            contentType: false,
            data: formData
        };

        var promise = $.ajax(req);
        promise.then(successResult, failureResult);
    };

    // $("#submitButton").click(sendPic);
    $("#fileField").change(fileChange);
});