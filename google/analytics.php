<script>
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

    ga('create', 'UA-3421546-6', 'auto');
    ga('send', 'pageview');

    //Tries to load Google Analytics JS file
    $.getScript("https://www.google-analytics.com/analytics.js")
        .done(function(){
            SERVICE_AVAILABILITY.g_analytics = true;
        })
        .fail(function(){
            SERVICE_AVAILABILITY.g_analytics = false;
    });
</script>