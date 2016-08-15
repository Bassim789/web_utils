<?php
class Cssvar
{
	function get_css_var($css)
	{
		$css_var_array = [];
		$start_css_var = strpos($css, '$cssvar{') + 9;
		$end_css_var = strpos($css, '}');
		$len_css_var = $end_css_var - $start_css_var;
		$css_vars_str  = substr($css, $start_css_var , $len_css_var);
		$css_vars = explode(";", $css_vars_str);
		foreach ($css_vars as $key => $cssvar)
		{
			if (strpos($cssvar, ':') !== false)
			{
				$cssvar = trim($cssvar);
				$two_part = explode(":", $cssvar);
				$var = trim($two_part[0]);
				$val = trim($two_part[1]);
				$css_var_array[$var] = $val;
			}
		}
		return $css_var_array;
	}

	function replace_val($css_line, $var, $val)
	{
		$var = '/*'.$var.'*/';
		$cursor = strpos($css_line, $var);
		while ($css_line[$cursor] != ' ')
		{
			$cursor -= 1;
		}
		$before = substr($css_line, 0, $cursor + 1);
		$after = explode($var, $css_line)[1];
		$css_line = $before.$val.$var.$after;
		return $css_line;
	}

	function replace_each_var($css_line, $css_var_array)
	{
		foreach ($css_var_array as $var => $val)
		{
			if (strpos($css_line, '/*'.$var.'*/') !== false)
			{
				$css_line = self::replace_val($css_line, $var, $val);
			}
		}
		return $css_line;
	}

	function translate_css($css, $css_var_array)
	{
		$css_lines = explode("\n", $css);
		$css = '';
		foreach ($css_lines as $key => $css_line)
		{
			if (strpos($css_line, '/*') !== false)
			{
				$css_line = self::replace_each_var($css_line, $css_var_array);
			}
			$css .= $css_line."\n";		
		}
		$css = trim($css, "\n");
		return $css;
	}

	function process_file($filename)
	{
		$css = file_get_contents($filename);
		if (strpos($css, '$cssvar') !== false)
		{
			$css_var_array = self::get_css_var($css);
			$css = self::translate_css($css, $css_var_array);
			file_put_contents($filename, $css);
		}
	}

	function process_all($path)
	{
		foreach (glob($path.'/*') as $key => $file)
		{
			if (is_dir($file))
			{
				self::process_all($file);
			}
			else if (substr($file, 0, 3) == 'css')
			{
				self::process_file($file);
			}
		}
	}
}
?>