$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.image-section-url').hide();

    $('.loader').hide();
    $('#result').hide();
    $('#result-url').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result :  ' + data);
                console.log('Success!');
            },
        });
    });

    // Predict From Url
    $('#btn-predict-url').click(function () { 

        var form_data = new FormData($('#predict-url')[0]);

        $(this).hide();
        $('.loader').show();

        $('.image-section-url').show();
        $('#result-url').text('');
        $('#result-url').hide();

        $('#imagePreview-url').css('background-image', 'url(' + $("#url").val() + ')');
        $('#imagePreview-url').hide();
        $('#imagePreview-url').fadeIn(650);

        $.ajax({
            type: 'POST',
            url: '/predict-url',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result-url').fadeIn(600);
                $('#result-url').text(' Result :  ' + data);
                console.log('Success!');
                $('#btn-predict-url').show();
            },
        });
    });

});
