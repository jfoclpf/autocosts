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
    "description": "<?php echo meta_description($GLOBALS["WORDS"]["initial_text"]); ?>",
    "image": "<?php if ($is_logo){ 
                        echo "http://autocosts.info/images/logos/".get_logo_file_name($is_logo, $currency_logo);}
                    else{
                        echo "http://autocosts.info/images/logos/autocosts_dollar.png";} ?>",
    "name": "<?php echo adapt_title($GLOBALS["WORDS"]["initial_text"]); ?>",
    "url": "autocosts.info/<?php echo $GLOBALS["country"]; ?>"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "car owners"
  },
  "author": "Autocosts Org",
  "inLanguage": "<?php echo $GLOBALS['language']; ?>",
  "isAccessibleForFree": "True",
  "isFamilyFriendly": "True",
  "keywords": "<?php echo get_keywords($GLOBALS["WORDS"]["web_page_title"], $GLOBALS["WORDS"]["fixed_costs"], $GLOBALS["WORDS"]["running_costs"]); ?>",
  "text": "<?php echo strip_tags($GLOBALS["WORDS"]["initial_text"]); ?>"  
}
</script>
