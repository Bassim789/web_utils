<?php
function include_files($path)
{
	$res = '';
	foreach (glob($path.'/*') as $key => $file)
	{
		if (is_dir($file))
		{
			$res .= include_files($file);
		}
		else
		{
			if (substr($file, 0, 2) == 'js')
			{
				$res .= '<script src="'.$file.'"></script>';
			}
			else if (substr($file, 0, 3) == 'css')
			{
				$res .= '<link rel="stylesheet" href="'.$file.'">';
			}
			else if (substr($file, 0, 4) == 'html')
			{
				$res .= file_get_contents($file);
			}
			$res .= "\n";
		}
	}
	return $res;
}
?>