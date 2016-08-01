<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WorkingWithForms.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <meta name="description" content="The description of my page" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <form id="form1" runat="server">        
        <ol>
            <asp:Repeater runat="server" ItemType="System.String" SelectMethod="GetHtmlLinks">
                <ItemTemplate>
                    <li><a href="<%# Item %>" target="blank"><%# GetItemName(Item) %></a></li>
                </ItemTemplate>
            </asp:Repeater>
        </ol>
    </form>
</body>
</html>
