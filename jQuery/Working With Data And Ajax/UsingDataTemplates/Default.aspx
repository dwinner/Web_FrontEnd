<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="UsingDataTemplates.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">        
        <ul>
            <asp:Repeater runat="server" ItemType="System.String" SelectMethod="GetHtmlLinks">
                <ItemTemplate>
                    <li><a href="<%# Item %>" target="blank"><%# GetItemName(Item) %></a></li>
                </ItemTemplate>
            </asp:Repeater>
        </ul>
    </form>
</body>
</html>
