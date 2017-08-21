<?php
    header('Content-Type: text/cache-manifest');
    function rglob($pattern, $flags = 0) {
		$files = glob($pattern, $flags);
		foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
			$files = array_merge($files, rglob($dir.'/'.basename($pattern), $flags));
		}
		return $files; 
    }
	$exlude = array();
	array_push($exlude, 'twitterimg.php');
	array_push($exlude, 'cache.php');
    $filesToCache = rglob("*.*");
?>
CACHE MANIFEST

CACHE:
<?php
	$hashes = '';
	$index = 'index.html';
	echo $index . PHP_EOL;
	$hashes .= md5_file($index);
	foreach($filesToCache as $file) {
		if (!in_array($file, $exlude)) {
			echo $file . PHP_EOL;
			$hashes .= md5_file($file);
		}
	}
?>

NETWORK:
*

# <?php echo md5($hashes); ?>