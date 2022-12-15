<?php
/**
 * Project:	The Simple functions for working with MySQL in PHP
 * File:	mysql.functions.php
 * @copyright 2008 at Den's Home PC
 * @author Denis Igorevich Vinevcev
 */

/* ------------------------------------------------------------------------- */
// Set The parameters of connections
define ('DBHOST', 'localhost');
define ('DBUSER', 'root');
define ('DBPASS', 'bboytronik');
define ('DBNAME', 'onlines');
$dbcnx = @mysql_connect (DBHOST, DBUSER, DBPASS);
if (!$dbcnx)
	exit ("<p>MySQL Server is not available now!</p>");
if (!mysql_select_db (DBNAME))
	exit ("Database ".DBNAME." is not available now!");
set_encoding();
// mysql_close ($dbcnx)
/* ------------------------------------------------------------------------- */

/**
 * Set the encoding for the correct display of russian symbols 
 * @param string $default The encoding table
 * @return void
 */
function set_encoding ($default = 'cp1251') {
	$demo_version = mysql_get_server_info();
	list($first_version, $demo_version) = explode (".", $demo_version);
    $combine = 10*$first_version + $demo_version;
	if($combine >= 41) {
		mysql_query ("SET character_set_client='".$default."'");
		mysql_query ("SET character_set_results='".$default."'");
		mysql_query ("SET collation_connection='".$default."_general_ci'");
  	}
}

/**
 * Test whether the record is single
 * @param string $query The query to data base
 * @return boolean true if a record is single, false in else case
 */
function is_single_record ($query) {
	$ath = @mysql_query ($query);
	if (!$ath) {
		echo "<p>".mysql_error ()." : ".mysql_errno ()."</p>";
		return false;
	}
	if (mysql_num_rows ($ath) == 1)
		return true;
	else
		return false;
}

/**
 * This function works up the query to be sure in saving sending
 * Use with sprintf - function as a specificator
 * @param string/numeric $value the variable (may be post/get/cookie data) to be worked up
 * @param boolean $con if true then allows for connection, false then connection isn't need
 * @return numeric/string
 */
function quote_smart ($value, $con = true) {
	if (get_magic_quotes_gpc ()) {
		$value = stripslashes ($value);
	}
	if (!is_numeric ($value)) {
		if ($con)
			$value = "'".mysql_real_escape_string ($value)."'";
		else
			$value = "'".mysql_escape_string ($value)."'";
	}
	return $value;
}

/**
 * Insert the one record and fetch the last insert auto incremental field
 * @param string $query The insert-query to be sended
 * @param boolean $type if true then return auto value as big integer, if false - as integer
 * @return integer/big integer
 */ 
function last_insert_id ($query, $type = true) {
	if (strtolower (substr ($query, 0, 6)) == 'insert') {
		$man = @mysql_query ($query);
		if (!$man) {
			echo "<p>".mysql_error ()." : ".mysql_errno ()."</p>";
			return false;
		}
		if ($type) {
			$sql = "SELECT last_insert_id()";
			$result = @mysql_query ($sql);
			return mysql_result ($result, 0);
		}
		else
			return ($autoinc = mysql_insert_id ()) ? $autoinc : false;
	}
	else
		return false;
}

/**
 * Returns data base list which is available on the server now
 * @return Array
 */
function db_list() {
	$databases = array ();
	$db_list = mysql_list_dbs ();
	while ($row = mysql_fetch_object ($db_list))
		$databases[] = $row->Database;
	return $databases;
}

/**
 * Returns a list of fields in specified data base and table
 * @param string $dbname the name of a data base
 * @param string $tblname the name of a table
 * @return array
 */
function field_list ($dbname, $tblname) {
	$tbl_flds = array();
	$res = @mysql_list_fields ($dbname, $tblname);
	if (!$res) {
		echo "<p>".mysql_error ()." : ".mysql_errno ()."</p>";
		return false;
	}
	$columns = mysql_num_fields ($res);
	$i = 0;
	for (; $i < $columns; )
		$tbl_flds[] = mysql_field_name ($res, $i++);
	return $tbl_flds;
}

/** 
 * Returns the id of the current thread if you are not ping
 * @return integer (auto incremental)
 */
function threads_number () {
	if (mysql_ping ())
		return mysql_thread_id ();
	else
		return false;
}

/**
 * Return The list of hash tables which specified all threads 
 * Count of the List of hash tables - Count of threads to MySQL server
 * Each hash table describes an individual thread
 * @return 2D Array (Array of associative arrays)
 */
function process_list () {
	$proces = array ();
	$res = mysql_list_processes ();
	while ($row = mysql_fetch_assoc ($res))
		$proces[] = $row;
	return $proces;
}

/**
 * Return a description of an active thread
 * @return Array (HashTable)
 */
function active_process () {
	$processes = process_list ();
	$size = sizeof ($processes);
	$i = 0;
	for(; $i < $size; $i++) {
		if ($processes[$i]['Command'] == 'Processlist')
			return $processes[$i];
		else continue;
	}
}

/**
 * Test whether the current connection keeps alive, not disconnect
 * Need in large enougth scripts
 * @return boolean true if current connection still keeps alive, or try connect again in else case
 */
function test_connection () {
	if (mysql_ping ())
		return true;
	else {
		mysql_connect ();
		return false;
	}
}

/**
 * Return hash table of the current system status in mysql
 * @param boolean $detail if true then return full status information, only some info in else case
 * @return Array (associative)
 */
function current_status ($detail = false) {
	$finish = array ();
	if ($detail) {
		$stat = mysql_query ("SHOW STATUS");
		while ($line = mysql_fetch_assoc ($stat))
			$finish[$line['Variable_name']] = $line['Value'];
	}
	else {
		$status = explode ("  ", mysql_stat ());
		$i = 0;
		$count = sizeof ($status);
		for (; $i < $count; $i++) {
			$key = substr ($status[$i], 0, strpos ($status[$i], ':'));
			$value = substr ($status[$i], strpos ($status[$i], ':') + 2);
			$finish[$key] = $value;
		}
	}

	return $finish;
}

/**
 * Return A list of the tables in specified data base
 * @param string $dbname The name of a data base
 * @return array
 */
function tables_list ($dbname) {
	$tables = array ();
	$res = mysql_list_tables ($dbname);
	if (!$res) {
		echo "<p>".mysql_error ()." : ".mysql_errno ()."</p>";
		return false;
	}
	$rows = mysql_num_rows ($res);
	$i = 0;
	for(; $i < $rows; $i++)
		$tables[] = mysql_tablename ($res, $i);
	return $tables;
}

/**
 * Return a pointer on specified result of a query without fetch it to mysql query buffer
 * You had better use it immediately
 * @param string $sql The sql-query to mysql
 * @return resource (pointer)
 */
function sql_res_unbuffer ($sql) {
	$res = @mysql_unbuffered_query ($sql);
	if (!$res) {
		echo "<p>".mysql_error ()." : ".mysql_errno ()."</p>";
		return false;
	}
	else
		return $res;
}

/**
 * Return a reference on a pointer of specified result of a query with fetch it to mysql query buffer
 * @param string $sql The sql-query to mysql
 * @return reference on resource
 */
function &sql_res_buffer ($sql) {
	$res = @mysql_query ($sql);
	if (!$res) {
		echo "<p>".mysql_error ()." : ".mysql_errno ()."</p>";
		return false;
	}
	else
		return $res;
}

/**
 * Return detail information about fetched result as an array
 * particularly table name, field type, field name, field length, field flags
 * @param resource &$res The reference on a result pointer of an executed query
 * @param boolean $flush if true then resource is cleaning up, not in else case
 * @return 2D Array
 */
function fields_info (&$res, $flush = false) {
	$info = array ();
	if (!is_resource ($res) || $res === false)
		return false;
	$fields = mysql_num_fields ($res);
	for ($i = 0; $i < $fields; $i++) {
		$info[$i]['table'] = mysql_field_table ($res, $i);
		$info[$i]['type'] = mysql_field_type ($res, $i);
		$info[$i]['name'] = mysql_field_name($res, $i);
		$info[$i]['len'] = mysql_field_len ($res, $i);
		$flags = mysql_field_flags ($res, $i);
		if (empty ($flags))
			$flags = "none";
		$info[$i]['flags'] = $flags;
	}
	if ($flush)
		mysql_free_result ($res);
	return $info;
}

/**
 * Return full detail information about fetched result as an array
 * particularly field name, field table, max length of a field, not null flag,
 * PK flag, unique flag, multiply key flag, numeric flag, blob flag, field type,
 * unsigned flag, zerofill flag
 * 
 * @param resource &$res The reference on a result pointer of an executed query
 * @param boolean $flush if true then resource is cleaning up, not in else case
 * @return 2D Array
 */
function detail_fields_info (&$res, $flush = false) {
	$info = array();
	if (!is_resource ($res) || $res === false)
		return false;
	$numf = mysql_num_fields ($res);
	$i = 0;
	while ($i < $numf) {
		$meta = mysql_fetch_field ($res, $i);
		foreach ($meta as $key => $value)
			$info[$i][$key] = $value;
		$i++;
	}
    if ($flush)
    	mysql_free_result ($res);
	return $info;
}

/**
 * Execute the DML-query and return a number of affected rows in PHP case
 * @param string $sql - The string of a dml query
 * @return integer
 */
function dml_execute ($query) {
	$dml = array ('insert', 'update', 'delete');
	if (in_array (strtolower (substr($query, 0, 6)), $dml)) {
		$change = @mysql_unbuffered_query ($query);
		if (!$change) {
			echo "<p>".mysql_error ()." : ".mysql_errno ()."</p>";
			return false;
		}
		$affected = @mysql_affected_rows ();
		if ($affected > 0)
			return $affected;
		else
			return false;
	}
	else
		return false;
}

/**
 * Return fetched result of a query like an array of associative arrays
 * @param resource $res The pointer on a query result
 * @return 2D Array
 */ 
function fetch_assoc_arr ($res) {
	if (mysql_num_rows ($res) == 0)
		return NULL;
	$fetch = array ();
	$i = 0;
	while ($line = mysql_fetch_assoc ($res)) {
		foreach ($line as $key => $value)
			$fetch[$i][$key] = $value;
		$i++;
	}
	return $fetch;
}

/**
 * Execute and return fetched result of a query like an array of associative arrays
 * @param string $sql The string of a may be 'sql' (select type) query
 * @param boolean $flush if true then the memory which was allocated by a resource result will be cleaned up
 * @return 2D Array
 */
function exec_fetch_assoc_arr ($sql, $flush = false) {
	$res =& sql_res_buffer ($sql);
	if (!is_resource ($res) || $res === false)
		return false;
	$fetch = fetch_assoc_arr ($res);
	if ($flush)
		mysql_free_result ($res);
	return $fetch;
}

/**
 * Return fetched result of a query like an array of number arrays
 * @param resource $res The pointer on a query result
 * @return 2D Array
 */
function fetch_num_arr ($res) {
	$nfld = mysql_num_fields ($res);
	$rows = mysql_num_rows ($res);
	$fetch = array ();
	if ($rows == 0) return NULL;
	$i = 0;
	for (; $i < $rows; $i++) {
		$j = 0;
		for (; $j < $nfld; $j++)
			$fetch[$i][$j] = mysql_result ($res, $i, $j);
	}
	return $fetch;
}

/**
 * Execute and return fetched result of a query like an array of number arrays
 * @param string $sql The string of a may be 'sql' (select type) query
 * @param boolean $flush if true then the memory which was allocated by a resource result will be cleaned up
 * @return 2D Array
 */
function exec_fetch_num_arr ($sql, $flush = false) {
	$res =& sql_res_buffer ($sql);
	if (!is_resource ($res) || $res === false)
		return false;
	$fetch = fetch_num_arr ($res);
	if ($flush)
		mysql_free_result ($res);
	return $fetch;
}

/**
 * Return fetched result of a query like an associative array, 
 * It's expected that the resource contents only one row (recommended)
 * @param resource $res The pointer on a query result
 * @return Array (Hash table)
 */
function fetch_assoc_record ($res) {
	$record = array ();
	$nfld = mysql_num_fields ($res);
	$rows = mysql_num_rows ($res);
	if ($rows == 0)
		return NULL;
	else if ($rows == 1) {
		for ($i = 0; $i < $nfld; $i++) {
			$key = mysql_field_name ($res, $i);
			$value = mysql_result ($res, 0, $i);
			$record[$key] = $value;
		}
	}
	else if ($nfld == 1) {
		$j = 0;
		for (; $j < $rows; $j++)
			$record[] = mysql_result ($res, $j, 0);
	}
	else
		return fetch_assoc_arr ($res);
    return $record;
}

/**
 * Execute and return fetched result of a query like an associative array, 
 * It's expected that the resource contents only one row (recommended)
 * @param string $sql The string of a may be 'sql' (select type) query
 * @param boolean $flush if true then the memory which was allocated by a resource result will be cleaned up
 * @return Array (Hash table)
 */
function exec_fetch_assoc_record ($sql, $flush = false) {
	$res =& sql_res_buffer ($sql);
	if (!is_resource ($res) || $res === false)
		return false;
	$record = fetch_assoc_record ($res);
    if ($flush)
    	mysql_free_result ($res);
    return $record;
}

/**
 * Return fetched result of a query like a number array, 
 * It's expected that the resource contents only one row (recommended)
 * @param resource $res The pointer on a query result
 * @return Array
 */
function fetch_num_record ($res) {
	$record = array ();
	$nfld = mysql_num_fields ($res);
	$rows = mysql_num_rows ($res);
	if ($rows == 0) return NULL;
	if ($rows == 1) {
		$i = 0;
		for (; $i < $nfld; $i++)
			$record[] = mysql_result ($res, 0, $i);
	}
	else if ($nfld == 1) {
		$j = 0;
		for (; $j < $rows; $j++)
			$record[] = mysql_result ($res, $j, 0);
	}
	else
		return fetch_num_arr ($res);
	return $record;
}

/**
 * Execute and return fetched result of a query like a number array, 
 * It's expected that the resource contents only one row (recommended)
 * @param string $sql The string of a may be 'sql' (select type) query
 * @param boolean $flush if true then the memory which was allocated by a resource result will be cleaned up
 * @return Array
 */
function exec_fetch_num_record ($sql, $flush = false) {
	$res =& sql_res_buffer ($sql);
	if (!is_resource ($res) || $res === false)
		return false;
	$record = fetch_num_record ($res);
	if ($flush)
		mysql_free_result ($res);
	return $record;
}

/**
 * Return fetched result of a query like a string, 
 * It's expected that the resource contents only one record (recommended)
 * @param resource $res The pointer on a query result
 * @return string
 */
function fetch_single ($res) {
	$nfld = mysql_num_fields ($res);
	$rows = mysql_num_rows ($res);
	if ($rows == 0) return NULL;
	if ($nfld == 1 && $rows == 1)
		return mysql_result ($res, 0, 0);
	else
		return NULL;
}

/**
 * Execute and return fetched result of a query like a string, 
 * It's expected that the resource contents only one record (recommended)
 * @param string $sql The string of a may be 'sql' (select type) query
 * @param boolean $flush if true then the memory which was allocated by a resource result will be cleaned up
 * @return string
 */
function exec_fetch_single ($sql, $flush = false) {
	$res =& sql_res_buffer ($sql);
	if (!is_resource ($res) || $res === false)
		return false;
	$one = fetch_single ($res);
	if ($flush)
		mysql_free_result ($res);
	return $one;
}

/**
 * Fetch array ("fetch record" => "fetch length of record")... From a resource result
 * @param resource $res The pointer on a query result
 * @return array
 */
function fetch_field_len_as_value ($res) {
	$result = array ();
	$rows = mysql_num_rows ($res);
	$flds = mysql_num_fields ($res);
	if ($rows == 0)
		return NULL;
	$i = 0;
	for (; $i < $rows; $i++) {
		$j = 0;
		for (; $j < $flds; $j++) {
			$key = mysql_result ($res, $i, $j);
			$value = strlen ($key);
			$result[$i][$key] = $value;
		}
	}
	return $result;
}

/**
 * Fetch number array of field types from a resource result
 * @param resource $res The pointer on a query result
 * @return array
 */
function fetch_field_type_as_value ($res) {
	$result = array();
	$rows = mysql_num_rows ($res);
	if ($rows == 0)
		return NULL;
	$flds = mysql_num_fields ($res);
	$j = 0;
	for (; $j < $flds; $j++)
		$result[] = mysql_field_type ($res, $j);
	return $result;
}

/**
 * Fetch the current system date from mysql server
 * @return string
 */
function mysql_current_date () {
	$res = mysql_query ("SELECT NOW()");
	return mysql_result ($res, 0);
}
?>