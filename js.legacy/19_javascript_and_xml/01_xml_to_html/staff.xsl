<?xml version='1.0' encoding="windows-1251" ?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		
		<html>
		<head>
			<title>������ ��������</title>
		</head>
		<body>
		
		<h1 align="center">�������� DemoCompany</h1>
		<hr />
		<table width="100%">
			<tr>
				<th>���</th>
				<th>���������</th>
				<th>�������</th>
				<th>����� ����������� �����</th>
			</tr>
			
			<xsl:for-each select="directory/employee">
				<tr>
					<td><xsl:value-of select="name"/></td>
					<td><xsl:value-of select="title"/></td>
					<td><xsl:value-of select="phone"/></td>
					<td><xsl:value-of select="email"/></td>
				</tr>
			</xsl:for-each>
			
		</table>
		
		</body>
		</html>
		
	</xsl:template>
</xsl:stylesheet>