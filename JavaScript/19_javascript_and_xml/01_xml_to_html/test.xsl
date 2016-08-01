<?xml version='1.0' encoding="windows-1251" ?>
<!-- version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform" -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">
	<xsl:template match="/">
		<html>
		<head>
			<title>Тестирование XSL</title>
		</head>
		<body>
			<xsl:for-each select="example/demo">
				<h1><xsl:value-of select="." /></h1>
			</xsl:for-each>
		</body>
		</html>
	</xsl:template>
</xsl:stylesheet>