<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "WebApplication",
  "applicationCategory": "Calculator",
  "applicationSubCategory": "Automobile costs calculator",
  "operatingSystem": "Windows, Linux, OSX, Android",
  "countriesSupported": "<?php echo $GLOBALS["country"]=="UK" ? "GB" : $GLOBALS["country"]; ?>",
  "about" : {
    "@type": "Thing",
    "description": "<?php echo meta_description($INITIAL_TEXT); ?>",
    "image": "<?php if ($is_logo){ 
                        echo "http://autocosts.info/images/logos/".get_logo_file_name($is_logo, $currency_logo);}
                    else{
                        echo "http://autocosts.info/images/logos/autocosts_dollar.png";} ?>",
    "name": "<?php echo adapt_title($WEB_PAGE_TITLE); ?>",
    "url": "autocosts.info/<?php echo $GLOBALS["country"]; ?>"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "car owners"
  },
  "author": "Autocosts Org",
  "inLanguage": "<?php echo $LANGUAGE_CODE; ?>",
  "isAccessibleForFree": "True",
  "isFamilyFriendly": "True",
  "keywords": "<?php echo get_keywords($WEB_PAGE_TITLE, $FIXED_COSTS, $RUNNING_COSTS); ?>",
  "text": "<?php echo strip_tags($INITIAL_TEXT); ?>"  
}
</script>
