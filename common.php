<?php
define('_MMS_',true);
header("Content-Type: text/html; charset=UTF-8");

function mms_path()
{

	$result['path'] = str_replace('\\', '/', dirname(__FILE__));
	$tilde_remove = preg_replace('/^\/\~[^\/]+(.*)$/', '$1', $_SERVER['SCRIPT_NAME']);
	$document_root = str_replace($tilde_remove, '', $_SERVER['SCRIPT_FILENAME']);
	$root = str_replace($document_root, '', $result['path']);
	$port = $_SERVER['SERVER_PORT'] != 80 ? ':'.$_SERVER['SERVER_PORT'] : '';
	$http = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on') ? 's' : '') . '://';
	$user = str_replace(str_replace($document_root, '', $_SERVER['SCRIPT_FILENAME']), '', $_SERVER['SCRIPT_NAME']);
	$result['url'] = $http.$_SERVER['HTTP_HOST'].$port.$user.$root;
	return $result;
}
$mms_path = mms_path();


// URL 은 브라우저상에서의 경로 (도메인으로 부터의)
if (DOMAIN) {
	define('URL', DOMAIN);
} else {
	if (isset($mms_path['url']))
		define('URL', $mms_path['url']);
	else
		define('URL', '');
}

if (isset($mms_path['path'])) {
	define('M_PATH', $mms_path['path']);
} else {
	define('M_PATH', '');
}
unset($mms_path);

define('SRC_PATH',M_PATH.'/resources');
define('TEMP_PATH',SRC_PATH.'/temp');


include_once(SRC_PATH.'/dbconfig.php');
include_once(SRC_PATH."/lib/Snoopy.class.php");


//==============================================================================
// SESSION 설정
//------------------------------------------------------------------------------
@ini_set("session.use_trans_sid", 0);	// PHPSESSID를 자동으로 넘기지 않음
@ini_set("url_rewriter.tags",""); // 링크에 PHPSESSID가 따라다니는것을 무력화함

session_save_path(M_PATH.'/session');

if (isset($SESSION_CACHE_LIMITER))
	@session_cache_limiter($SESSION_CACHE_LIMITER);
else
	@session_cache_limiter("no-cache, must-revalidate");

ini_set("session.cache_expire", 180); // 세션 캐쉬 보관시간 (분)
ini_set("session.gc_maxlifetime", 10800); // session data의 garbage collection 존재 기간을 지정 (초)
ini_set("session.gc_probability", 1); // session.gc_probability는 session.gc_divisor와 연계하여 gc(쓰레기 수거) 루틴의 시작 확률을 관리합니다. 기본값은 1입니다. 자세한 내용은 session.gc_divisor를 참고하십시오.
ini_set("session.gc_divisor", 100); // session.gc_divisor는 session.gc_probability와 결합하여 각 세션 초기화 시에 gc(쓰레기 수거) 프로세스를 시작할 확률을 정의합니다. 확률은 gc_probability/gc_divisor를 사용하여 계산합니다. 즉, 1/100은 각 요청시에 GC 프로세스를 시작할 확률이 1%입니다. session.gc_divisor의 기본값은 100입니다.

session_set_cookie_params(0, '/');
ini_set("session.cookie_domain", '');

session_start();

$sqli = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB);





function 공백문자삭제($텍스트) {
	$결과 = preg_replace('/\t|\s/','',$텍스트);
	return $결과;
}

function 개행문자삭제($텍스트) {
	$결과 = preg_replace('/\r\n|\r|\n/','',$텍스트);
	return $결과;
}

function jsonDecode($DATA) {
	/*
	 * JSON DECODE 관련 이슈
	 * 1. 상품명에 " OR ' 가 포함 되있는경우 디코딩 실패 str_replace로 변환필요
	 * 2. 넘겨받은 JSON텍스트 ICONV로 변환필요
	 * 3. STRIPSLASH
	 * */

	$JSON소스 = stripslashes( str_replace('\"','"', iconv('euc-kr', 'utf-8',  $DATA) ) );
	return json_decode($JSON소스,true);
}


// PHP 5.4 미만의 경우 json_encode 의 한글이 유니코드값으로 변경되는 현상을 해결하기 위한 대체 함수
function json_encode_unicode($data) {
	switch (gettype($data)) {
		case 'boolean':
			return $data?'true':'false';
		case 'integer':
		case 'double':
			return $data;
		case 'string':
			return '"'.strtr($data, array('\\'=>'\\\\','"'=>'\\"')).'"';
		case 'array':
			$rel = false; // relative array?
			$key = array_keys($data);
			foreach ($key as $v) {
				if (!is_int($v)) {
					$rel = true;
					break;
				}
			}

			$arr = array();
			foreach ($data as $k=>$v) {
				$arr[] = ($rel?'"'.strtr($k, array('\\'=>'\\\\','"'=>'\\"')).'":':'').json_encode_unicode($v);
			}

			return $rel?'{'.join(',', $arr).'}':'['.join(',', $arr).']';
		default:
			return '""';
	}
}

function _microtime() { return array_sum(explode(' ',microtime())); }


/* snoopy를 이용한 웹페이지 긁어오기 */
function get_httpRequest($긁어올URL, $proxy_ip='', $port='') {
	$snoopy = new Snoopy;

	if($proxy_ip && $port) {
		$snoopy->proxy_host = $proxy_ip;
		$snoopy->proxy_port = $port;
	}

	$snoopy->fetch($긁어올URL);

	return $snoopy->results;
}


/* 병렬처리 URL 긁어오기 */
function fetch_multi_url( array $url_list, $timeout=0 ) {
	$mh = curl_multi_init();

	foreach ($url_list as $i => $url) {
		$conn[$i] = curl_init($url);
		curl_setopt($conn[$i],CURLOPT_RETURNTRANSFER,1);
		curl_setopt($conn[$i],CURLOPT_FAILONERROR,1);
//		curl_setopt($conn[$i],CURLOPT_FOLLOWLOCATION,1);
		curl_setopt($conn[$i],CURLOPT_MAXREDIRS,3);

		//SSL증명서 무시
		curl_setopt($conn[$i],CURLOPT_SSL_VERIFYPEER,false);
		curl_setopt($conn[$i],CURLOPT_SSL_VERIFYHOST,false);

		//타임아웃
		if ($timeout){
			curl_setopt($conn[$i],CURLOPT_TIMEOUT,$timeout);
		}

		curl_multi_add_handle($mh,$conn[$i]);
	}

	$active = null;
	do {
		$mrc = curl_multi_exec($mh,$active);
	} while ($mrc == CURLM_CALL_MULTI_PERFORM);

	while ($active and $mrc == CURLM_OK) {
		if (curl_multi_select($mh) != -1) {
			do {
				$mrc = curl_multi_exec($mh,$active);
			} while ($mrc == CURLM_CALL_MULTI_PERFORM);
		}
	}

	if ($mrc != CURLM_OK) {
		echo '읽기 에러가 발생:'.$mrc;
	}

	//결과 취득
	$res = array();
	foreach ($url_list as $i => $url) {
		if (($err = curl_error($conn[$i])) == '') {
			$res[$i] = curl_multi_getcontent($conn[$i]);
		} else {
			echo '취득실패:'.$url_list[$i].'<br />';
		}
		curl_multi_remove_handle($mh,$conn[$i]);
		curl_close($conn[$i]);
	}
	curl_multi_close($mh);

	return $res;
}


function checkLogin() {
	//MB_ID가 있고 2글자 이상이면 index.html로, 없으면 로그인페이지로 
	if( !$_SESSION['mb_id'] || strlen($_SESSION['mb_id']) < 2 ) {
		echo "<script>
			document.location.href = 'login.php';
		</script>
		";
	}
}


// 세션변수 생성
function set_session($session_name, $value)
{
	if (PHP_VERSION < '5.3.0')
		session_register($session_name);
	// PHP 버전별 차이를 없애기 위한 방법
	$session_name = $_SESSION[$session_name] = $value;
}


// 세션변수값 얻음
function get_session($session_name)
{
	return isset($_SESSION[$session_name]) ? $_SESSION[$session_name] : '';
}


// 쿠키변수 생성
function set_cookie($cookie_name, $value, $expire)
{
	global $g5;

	setcookie(md5($cookie_name), base64_encode($value), G5_SERVER_TIME + $expire, '/', G5_COOKIE_DOMAIN);
}


// 쿠키변수값 얻음
function get_cookie($cookie_name)
{
	$cookie = md5($cookie_name);
	if (array_key_exists($cookie, $_COOKIE))
		return base64_decode($_COOKIE[md5($cookie_name)]);
	else
		return "";
}


function gotoUrl($url) {
	echo "<script>
			document.location.href = '$url';
		</script>
		";
}

// 경고메세지를 경고창으로
function alert($msg='', $url='', $error=true, $post=false)
{
	echo "<script>
			alert('$msg');
			document.location.href = '$url';
		</script>
		";
}


?>