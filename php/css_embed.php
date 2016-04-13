<?
class CSS_Embed
{
  protected $_path;
  protected $_glob;

  public function __construct( $css_path = 'css/', $glob = '/*.min.css')
  {
    $this->_path = $css_path;
    $this->_glob = $glob;
  }

  protected function _get_css_path()
  {
    $path = realpath( $_SERVER['DOCUMENT_ROOT'] . '/' . $this->_path);
    return $path;
  }

  protected function _get_css_files()
  {
    $path = $this->_get_css_path();

    $files = glob( $path . $this->_glob );

      return $path ? 
        glob( $path . $this->_glob) : false;
  }

  protected function _get_combined_css()
  {
    $css = '';
    $files = $this->_get_css_files();
    if ( ! $files ) return NULL;

    foreach( $files  as $file)
    {
      $css .= "\n" . file_get_contents( $file );
    }
    return strlen( trim($css) ) > 0 ? $css : NULL;
  }

  public function __toString()
  {
    $css = $this->_get_combined_css();

    if ( $css && strlen( $css ) > 0 )
    {
      return sprintf( "<style>%s</style>", $css);
    }
    return '';
  }
}
